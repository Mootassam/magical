import MongooseRepository from "./mongooseRepository";
import OrderShipment from "../models/orderShipment";
import AutomatOrder from "../models/automatOrder";
import Store from "../models/store";
import User from "../models/user";
import AuditLogRepository from "./auditLogRepository";
import MongooseQueryUtils from "../utils/mongooseQueryUtils";
import Error400 from "../../errors/Error400";
import Error404 from "../../errors/Error404";
import { IRepositoryOptions } from "./IRepositoryOptions";

const WHOLESALE_DISCOUNT = 0.2;

function round2(value) {
  return Math.round((Number(value) || 0) * 100) / 100;
}

export default class OrderShipmentRepository {
  // Reseller clicks "Go to Shipment" on one of their pending automat
  // orders: verify balance, atomically deduct the wholesale amount, and
  // open a shipment request for admin review.
  static async createFromAutomatOrder(automatOrderId, options: IRepositoryOptions) {
    const currentUser = MongooseRepository.getCurrentUser(options);
    const currentTenant = MongooseRepository.getCurrentTenant(options);

    const store = await MongooseRepository.wrapWithSessionIfExists(
      Store(options.database).findOne({
        user: currentUser.id,
        tenant: currentTenant.id,
      }),
      options
    );

    if (!store || store.status !== "success") {
      throw new Error400(options.language, "orderShipment.errors.noApprovedStore");
    }

    if (store.frozen) {
      throw new Error400(options.language, "orderShipment.errors.storeFrozen");
    }

    const automatOrder = await MongooseRepository.wrapWithSessionIfExists(
      AutomatOrder(options.database)
        .findOne({ _id: automatOrderId, tenant: currentTenant.id })
        .populate("product"),
      options
    );

    if (!automatOrder) {
      throw new Error404();
    }

    if (String(automatOrder.store) !== String(store.id)) {
      throw new Error400(options.language, "orderShipment.errors.notYourOrder");
    }

    if (automatOrder.status !== "pending") {
      throw new Error400(options.language, "orderShipment.errors.notPending");
    }

    const existingShipment = await MongooseRepository.wrapWithSessionIfExists(
      OrderShipment(options.database).findOne({
        automatOrder: automatOrder.id,
        tenant: currentTenant.id,
      }),
      options
    );

    if (existingShipment) {
      throw new Error400(options.language, "orderShipment.errors.alreadyShipped");
    }

    const quantity = Number(automatOrder.quantity) || 1;
    const unitPrice = Number((automatOrder as any).product?.price) || 0;
    const wholesaleAmount = round2(unitPrice * (1 - WHOLESALE_DISCOUNT) * quantity);
    const profitAmount = round2(unitPrice * WHOLESALE_DISCOUNT * quantity);

    // Atomic check-and-deduct in a single query - avoids a race where two
    // concurrent shipment requests could both pass a separate balance
    // check before either deduction lands.
    const session = MongooseRepository.getSession(options);
    const updatedUser = await User(options.database).findOneAndUpdate(
      { _id: currentUser.id, balance: { $gte: wholesaleAmount } },
      { $inc: { balance: -wholesaleAmount } },
      { new: true, ...(session ? { session } : {}) }
    );

    if (!updatedUser) {
      throw new Error400(options.language, "orderShipment.errors.insufficientBalance");
    }

    const [record] = await OrderShipment(options.database).create(
      [
        {
          automatOrder: automatOrder.id,
          store: store.id,
          product: (automatOrder as any).product.id,
          user: currentUser.id,
          customerName: automatOrder.customerName,
          quantity,
          unitPrice,
          wholesaleAmount,
          profitAmount,
          status: "pending",
          tenant: currentTenant.id,
          createdBy: currentUser.id,
          updatedBy: currentUser.id,
        },
      ],
      options
    );

    await AuditLogRepository.log(
      {
        entityName: "orderShipment",
        entityId: record.id,
        action: AuditLogRepository.CREATE,
        values: { automatOrder: automatOrder.id, wholesaleAmount },
      },
      options
    );

    return record;
  }

  static async countPending(options: IRepositoryOptions) {
    const currentTenant = MongooseRepository.getCurrentTenant(options);

    return MongooseRepository.wrapWithSessionIfExists(
      OrderShipment(options.database).countDocuments({
        tenant: currentTenant.id,
        status: "pending",
      }),
      options
    );
  }

  static async findByUserStore(options: IRepositoryOptions) {
    const currentUser = MongooseRepository.getCurrentUser(options);
    const currentTenant = MongooseRepository.getCurrentTenant(options);

    const store = await MongooseRepository.wrapWithSessionIfExists(
      Store(options.database).findOne({
        user: currentUser.id,
        tenant: currentTenant.id,
      }),
      options
    );

    if (!store) {
      return [];
    }

    return MongooseRepository.wrapWithSessionIfExists(
      OrderShipment(options.database)
        .find({ store: store.id, tenant: currentTenant.id })
        .populate("product")
        .sort(MongooseQueryUtils.sort("createdAt_DESC")),
      options
    );
  }

  static async findAndCountAllAdmin(
    { filter, limit = 0, offset = 0, orderBy = "" },
    options: IRepositoryOptions
  ) {
    const currentTenant = MongooseRepository.getCurrentTenant(options);

    const criteriaAnd: any = [{ tenant: currentTenant.id }];

    if (filter) {
      if (filter.store) {
        criteriaAnd.push({ store: filter.store });
      }

      if (filter.status) {
        criteriaAnd.push({ status: filter.status });
      }
    }

    const sort = MongooseQueryUtils.sort(orderBy || "createdAt_DESC");
    const skip = Number(offset || 0) || undefined;
    const limitEscaped = Number(limit || 0) || undefined;
    const criteria = { $and: criteriaAnd };

    const rows = await MongooseRepository.wrapWithSessionIfExists(
      OrderShipment(options.database)
        .find(criteria)
        .skip(skip)
        .limit(limitEscaped)
        .sort(sort)
        .populate("store")
        .populate("product"),
      options
    );

    const count = await MongooseRepository.wrapWithSessionIfExists(
      OrderShipment(options.database).countDocuments(criteria),
      options
    );

    return { rows, count };
  }

  // Admin resolves a pending shipment request.
  //  - completed: the seller keeps their profit margin on top of the
  //    wholesale cost already paid. Can still be refunded afterwards.
  //  - refunded: final decision, no further transitions allowed.
  //    - from pending: the whole sale price (wholesale + profit) is
  //      returned, fully undoing the original deduction.
  //    - from completed: only the wholesale amount is returned, since the
  //      profit was already paid out when it was marked completed - this
  //      keeps the total payout equal to the sale price either way,
  //      instead of double-paying the profit.
  static async updateStatus(id, status, options: IRepositoryOptions) {
    const currentUser = MongooseRepository.getCurrentUser(options);
    const currentTenant = MongooseRepository.getCurrentTenant(options);

    if (!["completed", "refunded"].includes(status)) {
      throw new Error400(options.language, "orderShipment.errors.invalidStatus");
    }

    const record = await MongooseRepository.wrapWithSessionIfExists(
      OrderShipment(options.database).findOne({
        _id: id,
        tenant: currentTenant.id,
      }),
      options
    );

    if (!record) {
      throw new Error404();
    }

    if (record.status === "refunded") {
      throw new Error400(options.language, "orderShipment.errors.alreadyResolved");
    }

    if (status === "completed" && record.status !== "pending") {
      throw new Error400(options.language, "orderShipment.errors.alreadyResolved");
    }

    const payoutAmount =
      status === "completed"
        ? record.profitAmount
        : record.status === "completed"
        ? record.wholesaleAmount
        : record.wholesaleAmount + record.profitAmount;

    await User(options.database).updateOne(
      { _id: record.user },
      { $inc: { balance: payoutAmount } },
      MongooseRepository.getSession(options)
        ? { session: MongooseRepository.getSession(options) }
        : {}
    );

    await OrderShipment(options.database).updateOne(
      { _id: id },
      {
        status,
        updatedBy: currentUser.id,
      },
      MongooseRepository.getSession(options)
        ? { session: MongooseRepository.getSession(options) }
        : {}
    );

    await AuditLogRepository.log(
      {
        entityName: "orderShipment",
        entityId: id,
        action: AuditLogRepository.UPDATE,
        values: { status, payoutAmount },
      },
      options
    );

    return MongooseRepository.wrapWithSessionIfExists(
      OrderShipment(options.database)
        .findById(id)
        .populate("store")
        .populate("product"),
      options
    );
  }
}
