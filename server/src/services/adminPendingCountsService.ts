import TransactionRepository from "../database/repositories/TransactionRepository";
import StoreRepository from "../database/repositories/storeRepository";
import OrderShipmentRepository from "../database/repositories/orderShipmentRepository";
import { emitToTenant } from "../socket";

class AdminPendingCountsService {
  static async compute(options) {
    const [deposit, withdraw, store, orderShipment] = await Promise.all([
      TransactionRepository.count({ status: "pending", type: "deposit" }, options),
      TransactionRepository.count({ status: "pending", type: "withdraw" }, options),
      StoreRepository.countPending(options),
      OrderShipmentRepository.countPending(options),
    ]);

    return { deposit, withdraw, store, orderShipment };
  }

  // Recomputes the pending counts for a tenant and pushes them to every
  // connected admin socket in that tenant's room. Callers that already
  // have a currentTenant/database in scope should fire this without
  // awaiting the result on the request's critical path.
  static async computeAndEmit(tenantId, database) {
    const counts = await this.compute({
      database,
      currentTenant: { id: tenantId },
    });

    emitToTenant(tenantId, "admin:pendingCounts", counts);

    return counts;
  }
}

export default AdminPendingCountsService;
