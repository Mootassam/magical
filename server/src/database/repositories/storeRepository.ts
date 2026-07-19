import mongoose from "mongoose";
import MongooseRepository from "./mongooseRepository";
import Store from "../models/store";
import AutomatOrder from "../models/automatOrder";
import OrderShipment from "../models/orderShipment";
import StoreListing from "../models/storeListing";
import User from "../models/user";
import AuditLogRepository from "./auditLogRepository";
import FileRepository from "./fileRepository";
import MongooseQueryUtils from "../utils/mongooseQueryUtils";
import Error400 from "../../errors/Error400";
import { IRepositoryOptions } from "./IRepositoryOptions";

function round2(value) {
  return Math.round((Number(value) || 0) * 100) / 100;
}

export default class StoreRepository {
  static async findByUser(options: IRepositoryOptions) {
    const currentUser = MongooseRepository.getCurrentUser(options);
    const currentTenant = MongooseRepository.getCurrentTenant(options);

    const record = await MongooseRepository.wrapWithSessionIfExists(
      Store(options.database).findOne({
        user: currentUser.id,
        tenant: currentTenant.id,
      }),
      options
    );

    return this._fillFileDownloadUrls(record);
  }

  static async submit(data, options: IRepositoryOptions) {
    const currentUser = MongooseRepository.getCurrentUser(options);
    const currentTenant = MongooseRepository.getCurrentTenant(options);

    const existing = await MongooseRepository.wrapWithSessionIfExists(
      Store(options.database).findOne({
        user: currentUser.id,
        tenant: currentTenant.id,
      }),
      options
    );

    const values = {
      storeName: data.storeName,
      contact: data.contact,
      idNumber: data.idNumber,
      mainBusiness: data.mainBusiness,
      address: data.address,
      storePhoto: data.storePhoto || [],
      idCardFront: data.idCardFront || [],
      idCardBack: data.idCardBack || [],
    };

    if (existing) {
      if (existing.status === "pending" || existing.status === "success") {
        throw new Error400(
          options.language,
          "store.errors.alreadySubmitted"
        );
      }

      await Store(options.database).updateOne(
        { _id: existing.id },
        {
          ...values,
          status: "pending",
          updatedBy: currentUser.id,
        },
        MongooseRepository.getSession(options)
          ? { session: MongooseRepository.getSession(options) }
          : {}
      );

      await AuditLogRepository.log(
        {
          entityName: "store",
          entityId: existing.id,
          action: AuditLogRepository.UPDATE,
          values,
        },
        options
      );

      return this.findByUser(options);
    }

    const [store] = await Store(options.database).create(
      [
        {
          ...values,
          status: "pending",
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
        entityName: "store",
        entityId: store.id,
        action: AuditLogRepository.CREATE,
        values,
      },
      options
    );

    return this._fillFileDownloadUrls(store);
  }

  // Seller: self-service edits to the store's public-facing profile (name,
  // description, logo, banner, contact phone) from the settings screen.
  // Deliberately separate from `submit` - it never touches `status`, so it
  // works regardless of approval state and doesn't re-trigger admin review.
  static async updateOwn(data, options: IRepositoryOptions) {
    const currentUser = MongooseRepository.getCurrentUser(options);
    const currentTenant = MongooseRepository.getCurrentTenant(options);

    const existing = await MongooseRepository.wrapWithSessionIfExists(
      Store(options.database).findOne({
        user: currentUser.id,
        tenant: currentTenant.id,
      }),
      options
    );

    if (!existing) {
      throw new Error400(options.language, "store.errors.notFound");
    }

    const values: any = {
      updatedBy: currentUser.id,
    };

    if (data.storeName !== undefined) {
      values.storeName = data.storeName;
    }

    if (data.description !== undefined) {
      values.description = data.description;
    }

    if (data.contact !== undefined) {
      values.contact = data.contact;
    }

    if (data.storePhoto !== undefined) {
      values.storePhoto = data.storePhoto;
    }

    if (data.storeBanner !== undefined) {
      values.storeBanner = data.storeBanner;
    }

    const session = MongooseRepository.getSession(options)
      ? { session: MongooseRepository.getSession(options) }
      : {};

    await Store(options.database).updateOne(
      { _id: existing.id },
      values,
      session
    );

    await AuditLogRepository.log(
      {
        entityName: "store",
        entityId: existing.id,
        action: AuditLogRepository.UPDATE,
        values,
      },
      options
    );

    return this.findByUser(options);
  }

  static async countPending(options: IRepositoryOptions) {
    const currentTenant = MongooseRepository.getCurrentTenant(options);

    return MongooseRepository.wrapWithSessionIfExists(
      Store(options.database).countDocuments({
        tenant: currentTenant.id,
        status: "pending",
      }),
      options
    );
  }

  static async findAndCountAll(
    { filter, limit = 0, offset = 0, orderBy = "" },
    options: IRepositoryOptions
  ) {
    const currentTenant = MongooseRepository.getCurrentTenant(options);

    let criteriaAnd: any = [{ tenant: currentTenant.id }];

    if (filter) {
      if (filter.status) {
        criteriaAnd.push({ status: filter.status });
      }

      if (filter.mainBusiness) {
        criteriaAnd.push({ mainBusiness: filter.mainBusiness });
      }
    }

    const sort = MongooseQueryUtils.sort(orderBy || "createdAt_DESC");
    const skip = Number(offset || 0) || undefined;
    const limitEscaped = Number(limit || 0) || undefined;
    const criteria = { $and: criteriaAnd };

    const rows = await MongooseRepository.wrapWithSessionIfExists(
      Store(options.database)
        .find(criteria)
        .skip(skip)
        .limit(limitEscaped)
        .sort(sort)
        .populate("user"),
      options
    );

    const count = await MongooseRepository.wrapWithSessionIfExists(
      Store(options.database).countDocuments(criteria),
      options
    );

    return {
      rows: await Promise.all(
        rows.map((row) => this._fillFileDownloadUrls(row))
      ),
      count,
    };
  }

  static async findById(id, options: IRepositoryOptions) {
    const record = await MongooseRepository.wrapWithSessionIfExists(
      Store(options.database).findById(id).populate("user"),
      options
    );

    return this._fillFileDownloadUrls(record);
  }

  static async updateStatus(id, status, options: IRepositoryOptions) {
    const currentUser = MongooseRepository.getCurrentUser(options);

    const record = await Store(options.database).findById(id);

    if (!record) {
      throw new Error400(options.language, "store.errors.notFound");
    }

    const session = MongooseRepository.getSession(options)
      ? { session: MongooseRepository.getSession(options) }
      : {};

    await Store(options.database).updateOne(
      { _id: id },
      {
        status,
        updatedBy: currentUser.id,
      },
      session
    );

    const User = options.database.model("user");

    await User.findByIdAndUpdate(record.user, { store: status === "success" }, session);

    await AuditLogRepository.log(
      {
        entityName: "store",
        entityId: id,
        action: AuditLogRepository.UPDATE,
        values: { status },
      },
      options
    );

    return this.findById(id, options);
  }

  // Admin: edit the merchant-facing stats shown on a store's profile
  // (rating, credit score, follower count). Only meaningful for approved
  // stores, but not restricted here - the UI gates when the action is shown.
  static async updateDetails(id, data, options: IRepositoryOptions) {
    const currentUser = MongooseRepository.getCurrentUser(options);

    const record = await Store(options.database).findById(id);

    if (!record) {
      throw new Error400(options.language, "store.errors.notFound");
    }

    const values: any = {
      updatedBy: currentUser.id,
    };

    if (data.storeRating !== undefined) {
      values.storeRating = data.storeRating;
    }

    if (data.creditScore !== undefined) {
      values.creditScore = data.creditScore;
    }

    if (data.numberOfFollowers !== undefined) {
      values.numberOfFollowers = data.numberOfFollowers;
    }

    const session = MongooseRepository.getSession(options)
      ? { session: MongooseRepository.getSession(options) }
      : {};

    await Store(options.database).updateOne({ _id: id }, values, session);

    await AuditLogRepository.log(
      {
        entityName: "store",
        entityId: id,
        action: AuditLogRepository.UPDATE,
        values,
      },
      options
    );

    return this.findById(id, options);
  }

  // Platform: single call backing the seller's "Shop Details" screen -
  // store profile plus every stat card on that page, computed from the
  // underlying order/listing/balance data instead of being stored
  // redundantly on the store itself.
  static async getDashboard(options: IRepositoryOptions) {
    const currentUser = MongooseRepository.getCurrentUser(options);
    const currentTenant = MongooseRepository.getCurrentTenant(options);

    const emptyStats = {
      waitingForDeliveryCount: 0,
      cumulativeOrderQty: 0,
      todayTotalSales: 0,
      totalSales: 0,
      todaySalesProfit: 0,
      salesProfit: 0,
    };

    const freshUser = await MongooseRepository.wrapWithSessionIfExists(
      User(options.database).findById(currentUser.id),
      options
    );
    const accountBalance = Number(freshUser?.balance) || 0;

    const store = await this.findByUser(options);

    if (!store) {
      return { store: null, accountBalance, ...emptyStats };
    }

    // A pending automat order counts as "waiting for delivery" only until a
    // shipment request has been opened for it - mirrors the platform's
    // "Waiting for delivery" tab (pending automat orders not yet shipped).
    const shippedAutomatOrderIds = await MongooseRepository.wrapWithSessionIfExists(
      OrderShipment(options.database)
        .find({ store: store.id, tenant: currentTenant.id })
        .distinct("automatOrder"),
      options
    );

    const waitingForDeliveryCount = await MongooseRepository.wrapWithSessionIfExists(
      AutomatOrder(options.database).countDocuments({
        store: store.id,
        tenant: currentTenant.id,
        status: "pending",
        _id: { $nin: shippedAutomatOrderIds },
      }),
      options
    );

    const cumulativeOrderQty = await MongooseRepository.wrapWithSessionIfExists(
      StoreListing(options.database).countDocuments({
        store: store.id,
        tenant: currentTenant.id,
      }),
      options
    );

    const startOfToday = new Date();
    startOfToday.setHours(0, 0, 0, 0);

    // Aggregation pipelines bypass Mongoose's automatic string->ObjectId
    // casting (unlike .find()), so $match needs real ObjectIds here.
    const storeObjectId = new mongoose.Types.ObjectId(store.id);
    const tenantObjectId = new mongoose.Types.ObjectId(currentTenant.id);

    const [refundedFacets] = await MongooseRepository.wrapWithSessionIfExists(
      OrderShipment(options.database).aggregate([
        {
          $match: {
            store: storeObjectId,
            tenant: tenantObjectId,
            status: "refunded",
          },
        },
        {
          $facet: {
            allTime: [
              {
                $group: {
                  _id: null,
                  totalSales: {
                    $sum: { $add: ["$wholesaleAmount", "$profitAmount"] },
                  },
                  salesProfit: { $sum: "$profitAmount" },
                },
              },
            ],
            today: [
              { $match: { updatedAt: { $gte: startOfToday } } },
              {
                $group: {
                  _id: null,
                  totalSales: {
                    $sum: { $add: ["$wholesaleAmount", "$profitAmount"] },
                  },
                  salesProfit: { $sum: "$profitAmount" },
                },
              },
            ],
          },
        },
      ]),
      options
    );

    const allTime = refundedFacets?.allTime?.[0] || {};
    const today = refundedFacets?.today?.[0] || {};

    return {
      store,
      accountBalance,
      waitingForDeliveryCount,
      cumulativeOrderQty,
      totalSales: round2(allTime.totalSales),
      salesProfit: round2(allTime.salesProfit),
      todayTotalSales: round2(today.totalSales),
      todaySalesProfit: round2(today.salesProfit),
    };
  }

  static async _fillFileDownloadUrls(record) {
    if (!record) {
      return null;
    }

    const output = record.toObject ? record.toObject() : record;

    output.storePhoto = await FileRepository.fillDownloadUrl(
      output.storePhoto
    );
    output.storeBanner = await FileRepository.fillDownloadUrl(
      output.storeBanner
    );
    output.idCardFront = await FileRepository.fillDownloadUrl(
      output.idCardFront
    );
    output.idCardBack = await FileRepository.fillDownloadUrl(
      output.idCardBack
    );

    return output;
  }
}
