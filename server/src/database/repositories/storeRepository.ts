import MongooseRepository from "./mongooseRepository";
import Store from "../models/store";
import AuditLogRepository from "./auditLogRepository";
import FileRepository from "./fileRepository";
import MongooseQueryUtils from "../utils/mongooseQueryUtils";
import Error400 from "../../errors/Error400";
import { IRepositoryOptions } from "./IRepositoryOptions";

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

  static async _fillFileDownloadUrls(record) {
    if (!record) {
      return null;
    }

    const output = record.toObject ? record.toObject() : record;

    output.storePhoto = await FileRepository.fillDownloadUrl(
      output.storePhoto
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
