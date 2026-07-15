import MongooseRepository from "./mongooseRepository";
import AutomatOrder from "../models/automatOrder";
import Store from "../models/store";
import Product from "../models/product";
import StoreListing from "../models/storeListing";
import AuditLogRepository from "./auditLogRepository";
import MongooseQueryUtils from "../utils/mongooseQueryUtils";
import Error400 from "../../errors/Error400";
import { IRepositoryOptions } from "./IRepositoryOptions";

export default class AutomatOrderRepository {
  static async createMany(rows, options: IRepositoryOptions) {
    const currentUser = MongooseRepository.getCurrentUser(options);
    const currentTenant = MongooseRepository.getCurrentTenant(options);

    if (!Array.isArray(rows) || rows.length === 0) {
      throw new Error400(options.language, "automatOrder.errors.emptyRows");
    }

    const docs = [];

    for (const row of rows) {
      if (
        !row.store ||
        !row.product ||
        !row.customerName ||
        !row.quantity ||
        !row.startTime
      ) {
        throw new Error400(options.language, "automatOrder.errors.missingFields");
      }

      const store = await MongooseRepository.wrapWithSessionIfExists(
        Store(options.database).findOne({
          _id: row.store,
          tenant: currentTenant.id,
        }),
        options
      );

      if (!store) {
        throw new Error400(options.language, "automatOrder.errors.invalidStore");
      }

      const product = await MongooseRepository.wrapWithSessionIfExists(
        Product(options.database).findOne({
          _id: row.product,
          tenant: currentTenant.id,
        }),
        options
      );

      if (!product) {
        throw new Error400(options.language, "automatOrder.errors.invalidProduct");
      }

      const listing = await MongooseRepository.wrapWithSessionIfExists(
        StoreListing(options.database).findOne({
          store: store.id,
          product: product.id,
          tenant: currentTenant.id,
        }),
        options
      );

      if (!listing) {
        throw new Error400(
          options.language,
          "automatOrder.errors.productNotInStore"
        );
      }

      docs.push({
        store: store.id,
        product: product.id,
        customerName: row.customerName,
        quantity: Number(row.quantity),
        startTime: new Date(row.startTime),
        status: "pending",
        tenant: currentTenant.id,
        createdBy: currentUser.id,
        updatedBy: currentUser.id,
      });
    }

    const records = await AutomatOrder(options.database).create(docs, options);

    await AuditLogRepository.log(
      {
        entityName: "automatOrder",
        entityId: "bulk-create",
        action: AuditLogRepository.CREATE,
        values: { count: records.length },
      },
      options
    );

    return records;
  }

  // Platform: orders placed against the current user's own store - i.e. the
  // products from their store that customers have ordered. Scoped by the
  // store's owning user, not by any user field on the order itself (an
  // automat order isn't tied to the customer who placed it, only to the
  // store and product).
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
      AutomatOrder(options.database)
        .find({ store: store.id, tenant: currentTenant.id })
        .populate("product")
        .sort(MongooseQueryUtils.sort("createdAt_DESC")),
      options
    );
  }

  static async findAndCountAll(
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

      if (filter.customerName) {
        criteriaAnd.push({
          customerName: {
            $regex: MongooseQueryUtils.escapeRegExp(filter.customerName),
            $options: "i",
          },
        });
      }
    }

    const sort = MongooseQueryUtils.sort(orderBy || "createdAt_DESC");
    const skip = Number(offset || 0) || undefined;
    const limitEscaped = Number(limit || 0) || undefined;
    const criteria = { $and: criteriaAnd };

    const rows = await MongooseRepository.wrapWithSessionIfExists(
      AutomatOrder(options.database)
        .find(criteria)
        .skip(skip)
        .limit(limitEscaped)
        .sort(sort)
        .populate("store")
        .populate("product"),
      options
    );

    const count = await MongooseRepository.wrapWithSessionIfExists(
      AutomatOrder(options.database).countDocuments(criteria),
      options
    );

    return { rows, count };
  }
}
