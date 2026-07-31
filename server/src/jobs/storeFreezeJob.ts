import AutomatOrder from "../database/models/automatOrder";
import OrderShipment from "../database/models/orderShipment";
import Store from "../database/models/store";

// A store gets frozen once one of its automat orders sits in "Waiting for
// delivery" (pending + not yet shipped, same definition as
// storeRepository.getDashboard's waitingForDeliveryCount) for longer than
// this, without the seller clicking "Go to Shipment".
const FREEZE_THRESHOLD_MS = 24 * 60 * 60 * 1000;

// How often we re-scan for newly-overdue orders. 24h tolerance doesn't need
// tight polling.
const CHECK_INTERVAL_MS = 15 * 60 * 1000;

export async function checkAndFreezeStores(database) {
  const cutoff = new Date(Date.now() - FREEZE_THRESHOLD_MS);

  const shippedAutomatOrderIds = await OrderShipment(database).distinct(
    "automatOrder"
  );

  const overdueByStore = await AutomatOrder(database).aggregate([
    {
      $match: {
        status: "pending",
        startTime: { $lte: cutoff },
        _id: { $nin: shippedAutomatOrderIds },
      },
    },
    {
      $group: {
        _id: "$store",
        maxStartTime: { $max: "$startTime" },
      },
    },
  ]);

  if (!overdueByStore.length) {
    return;
  }

  const candidateStoreIds = overdueByStore.map((entry) => entry._id);

  const candidateStores = await Store(database).find({
    _id: { $in: candidateStoreIds },
    frozen: false,
  });

  const maxStartTimeByStore = new Map(
    overdueByStore.map((entry) => [String(entry._id), entry.maxStartTime])
  );

  // A manual unfreeze excuses whatever was overdue at the time - only an
  // order that started after the last unfreeze can re-trigger freezing.
  const idsToFreeze = candidateStores
    .filter((store) => {
      const maxStartTime = maxStartTimeByStore.get(String(store._id));
      return !store.unfrozenAt || maxStartTime > store.unfrozenAt;
    })
    .map((store) => store._id);

  if (!idsToFreeze.length) {
    return;
  }

  await Store(database).updateMany(
    { _id: { $in: idsToFreeze } },
    { frozen: true, frozenAt: new Date() }
  );
}

export function startStoreFreezeJob(database) {
  const run = () => {
    checkAndFreezeStores(database).catch((error) => {
      console.error("storeFreezeJob failed", error);
    });
  };

  run();
  setInterval(run, CHECK_INTERVAL_MS);
}
