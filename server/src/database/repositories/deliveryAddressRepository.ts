import MongooseRepository from "./mongooseRepository";
import DeliveryAddress from "../models/deliveryAddress";
import AuditLogRepository from "./auditLogRepository";
import MongooseQueryUtils from "../utils/mongooseQueryUtils";
import Error404 from "../../errors/Error404";
import { IRepositoryOptions } from "./IRepositoryOptions";

export default class DeliveryAddressRepository {
  static async create(data, options: IRepositoryOptions) {
    const currentUser = MongooseRepository.getCurrentUser(options);
    const currentTenant = MongooseRepository.getCurrentTenant(options);

    const [record] = await DeliveryAddress(options.database).create(
      [
        {
          address: data.address,
          countryCode: data.countryCode || "+1",
          contactNumber: data.contactNumber,
          contact: data.contact,
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
        entityName: "deliveryAddress",
        entityId: record.id,
        action: AuditLogRepository.CREATE,
        values: data,
      },
      options
    );

    return record;
  }

  static async update(id, data, options: IRepositoryOptions) {
    const currentUser = MongooseRepository.getCurrentUser(options);
    const currentTenant = MongooseRepository.getCurrentTenant(options);

    const record = await DeliveryAddress(options.database).findOne({
      _id: id,
      user: currentUser.id,
      tenant: currentTenant.id,
    });

    if (!record) {
      throw new Error404();
    }

    await DeliveryAddress(options.database).updateOne(
      { _id: id },
      {
        address: data.address,
        countryCode: data.countryCode || "+1",
        contactNumber: data.contactNumber,
        contact: data.contact,
        updatedBy: currentUser.id,
      },
      MongooseRepository.getSession(options)
        ? { session: MongooseRepository.getSession(options) }
        : {}
    );

    await AuditLogRepository.log(
      {
        entityName: "deliveryAddress",
        entityId: id,
        action: AuditLogRepository.UPDATE,
        values: data,
      },
      options
    );

    return MongooseRepository.wrapWithSessionIfExists(
      DeliveryAddress(options.database).findById(id),
      options
    );
  }

  static async destroy(id, options: IRepositoryOptions) {
    const currentUser = MongooseRepository.getCurrentUser(options);
    const currentTenant = MongooseRepository.getCurrentTenant(options);

    const record = await DeliveryAddress(options.database).findOne({
      _id: id,
      user: currentUser.id,
      tenant: currentTenant.id,
    });

    if (!record) {
      throw new Error404();
    }

    await DeliveryAddress(options.database).deleteOne({ _id: id });

    await AuditLogRepository.log(
      {
        entityName: "deliveryAddress",
        entityId: id,
        action: AuditLogRepository.DELETE,
        values: {},
      },
      options
    );
  }

  static async findByUser(options: IRepositoryOptions) {
    const currentUser = MongooseRepository.getCurrentUser(options);
    const currentTenant = MongooseRepository.getCurrentTenant(options);

    const rows = await MongooseRepository.wrapWithSessionIfExists(
      DeliveryAddress(options.database)
        .find({ user: currentUser.id, tenant: currentTenant.id })
        .sort(MongooseQueryUtils.sort("createdAt_DESC")),
      options
    );

    return rows;
  }

  static async findAndCountAll(
    { filter, limit = 0, offset = 0, orderBy = "" },
    options: IRepositoryOptions
  ) {
    const currentTenant = MongooseRepository.getCurrentTenant(options);

    let criteriaAnd: any = [{ tenant: currentTenant.id }];

    if (filter && filter.user) {
      criteriaAnd.push({ user: filter.user });
    }

    const sort = MongooseQueryUtils.sort(orderBy || "createdAt_DESC");
    const skip = Number(offset || 0) || undefined;
    const limitEscaped = Number(limit || 0) || undefined;
    const criteria = { $and: criteriaAnd };

    const rows = await MongooseRepository.wrapWithSessionIfExists(
      DeliveryAddress(options.database)
        .find(criteria)
        .skip(skip)
        .limit(limitEscaped)
        .sort(sort)
        .populate("user"),
      options
    );

    const count = await MongooseRepository.wrapWithSessionIfExists(
      DeliveryAddress(options.database).countDocuments(criteria),
      options
    );

    return { rows, count };
  }
}
