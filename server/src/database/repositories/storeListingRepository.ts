import mongoose from "mongoose";
import MongooseRepository from "./mongooseRepository";
import StoreListing from "../models/storeListing";
import Store from "../models/store";
import Product from "../models/product";
import AuditLogRepository from "./auditLogRepository";
import MongooseQueryUtils from "../utils/mongooseQueryUtils";
import Error400 from "../../errors/Error400";
import Error404 from "../../errors/Error404";
import { IRepositoryOptions } from "./IRepositoryOptions";

const WHOLESALE_DISCOUNT = 0.2;

export default class StoreListingRepository {
  static async create(data, options: IRepositoryOptions) {
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
      throw new Error400(options.language, "storeListing.errors.noApprovedStore");
    }

    const product = await MongooseRepository.wrapWithSessionIfExists(
      Product(options.database).findById(data.product),
      options
    );

    if (!product || String(product.tenant) !== String(currentTenant.id)) {
      throw new Error404();
    }

    const existing = await MongooseRepository.wrapWithSessionIfExists(
      StoreListing(options.database).findOne({
        store: store.id,
        product: product.id,
        tenant: currentTenant.id,
      }),
      options
    );

    if (existing) {
      return existing;
    }

    const salesPrice = Number(product.price) || 0;
    const wholesalePrice = Math.round(salesPrice * (1 - WHOLESALE_DISCOUNT) * 100) / 100;

    const [record] = await StoreListing(options.database).create(
      [
        {
          store: store.id,
          product: product.id,
          title: product.title,
          image: product.image,
          salesPrice,
          wholesalePrice,
          user: currentUser.id,
          tenant: currentTenant.id,
          createdBy: currentUser.id,
          updatedBy: currentUser.id,
        },
      ],
      options
    );

    await AuditLogRepository.log(
      {
        entityName: "storeListing",
        entityId: record.id,
        action: AuditLogRepository.CREATE,
        values: { product: product.id, store: store.id },
      },
      options
    );

    return record;
  }

  static async findByUser(options: IRepositoryOptions) {
    const currentUser = MongooseRepository.getCurrentUser(options);
    const currentTenant = MongooseRepository.getCurrentTenant(options);

    return MongooseRepository.wrapWithSessionIfExists(
      StoreListing(options.database)
        .find({ user: currentUser.id, tenant: currentTenant.id })
        .sort(MongooseQueryUtils.sort("createdAt_DESC")),
      options
    );
  }

  // Admin: stores that have at least a product listing capability (approved
  // stores), enriched with how many products each has listed. Aggregated
  // in a single query rather than N+1-ing countDocuments per store.
  static async findStoresWithCounts(
    { search }: { search?: string },
    options: IRepositoryOptions
  ) {
    const currentTenant = MongooseRepository.getCurrentTenant(options);

    // Aggregation pipelines bypass Mongoose's automatic string->ObjectId
    // casting (unlike .find()), so $match needs a real ObjectId here or
    // it silently matches nothing.
    const tenantObjectId = new mongoose.Types.ObjectId(currentTenant.id);

    const counts = await StoreListing(options.database).aggregate([
      { $match: { tenant: tenantObjectId } },
      { $group: { _id: "$store", count: { $sum: 1 } } },
    ]);

    const countByStore = new Map(
      counts.map((entry: any) => [String(entry._id), entry.count])
    );

    const criteriaAnd: any = [
      { tenant: currentTenant.id },
      { status: "success" },
    ];

    if (search) {
      criteriaAnd.push({
        storeName: {
          $regex: MongooseQueryUtils.escapeRegExp(search),
          $options: "i",
        },
      });
    }

    const stores = await MongooseRepository.wrapWithSessionIfExists(
      Store(options.database)
        .find({ $and: criteriaAnd })
        .populate("user")
        .sort({ storeName: 1 }),
      options
    );

    return stores.map((store: any) => {
      const output = store.toObject ? store.toObject() : store;

      return {
        ...output,
        productCount: countByStore.get(String(output.id)) || 0,
      };
    });
  }

  // Admin: products listed by a specific store.
  static async findAndCountAllAdmin(
    { filter, limit = 0, offset = 0, orderBy = "" },
    options: IRepositoryOptions
  ) {
    const currentTenant = MongooseRepository.getCurrentTenant(options);

    const criteriaAnd: any = [{ tenant: currentTenant.id }];

    if (filter && filter.store) {
      criteriaAnd.push({ store: filter.store });
    }

    const sort = MongooseQueryUtils.sort(orderBy || "createdAt_DESC");
    const skip = Number(offset || 0) || undefined;
    const limitEscaped = Number(limit || 0) || undefined;
    const criteria = { $and: criteriaAnd };

    const rows = await MongooseRepository.wrapWithSessionIfExists(
      StoreListing(options.database)
        .find(criteria)
        .skip(skip)
        .limit(limitEscaped)
        .sort(sort)
        .populate("store"),
      options
    );

    const count = await MongooseRepository.wrapWithSessionIfExists(
      StoreListing(options.database).countDocuments(criteria),
      options
    );

    return { rows, count };
  }
}
