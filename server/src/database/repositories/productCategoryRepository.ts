import MongooseRepository from "./mongooseRepository";
import ProductCategory from "../models/productCategory";
import MongooseQueryUtils from "../utils/mongooseQueryUtils";
import { IRepositoryOptions } from "./IRepositoryOptions";

export default class ProductCategoryRepository {
  static async findOrCreateByName(name, options: IRepositoryOptions) {
    const currentUser = MongooseRepository.getCurrentUser(options);
    const currentTenant = MongooseRepository.getCurrentTenant(options);

    const existing = await MongooseRepository.wrapWithSessionIfExists(
      ProductCategory(options.database).findOne({
        tenant: currentTenant.id,
        name: {
          $regex: `^${MongooseQueryUtils.escapeRegExp(name)}$`,
          $options: "i",
        },
      }),
      options
    );

    if (existing) {
      return { record: existing, created: false };
    }

    try {
      const [record] = await ProductCategory(options.database).create(
        [
          {
            name,
            tenant: currentTenant.id,
            createdBy: currentUser.id,
            updatedBy: currentUser.id,
          },
        ],
        options
      );

      return { record, created: true };
    } catch (error) {
      // Race between two rows resolving the same new category name at
      // once - fall back to the record the other write just created.
      if (error.code === 11000) {
        const record = await MongooseRepository.wrapWithSessionIfExists(
          ProductCategory(options.database).findOne({
            tenant: currentTenant.id,
            name: {
              $regex: `^${MongooseQueryUtils.escapeRegExp(name)}$`,
              $options: "i",
            },
          }),
          options
        );

        return { record, created: false };
      }

      throw error;
    }
  }

  static async destroy(id, options: IRepositoryOptions) {
    const currentTenant = MongooseRepository.getCurrentTenant(options);

    const record = await MongooseRepository.wrapWithSessionIfExists(
      ProductCategory(options.database).findById(id),
      options
    );

    if (!record || String(record.tenant) !== String(currentTenant.id)) {
      return;
    }

    await ProductCategory(options.database).deleteOne({ _id: id }, options);
  }

  static async findAndCountAll(
    { filter, limit = 0, offset = 0, orderBy = "" },
    options: IRepositoryOptions
  ) {
    const currentTenant = MongooseRepository.getCurrentTenant(options);

    let criteriaAnd: any = [{ tenant: currentTenant.id }];

    if (filter && filter.name) {
      criteriaAnd.push({
        name: {
          $regex: MongooseQueryUtils.escapeRegExp(filter.name),
          $options: "i",
        },
      });
    }

    const sort = MongooseQueryUtils.sort(orderBy || "createdAt_DESC");
    const skip = Number(offset || 0) || undefined;
    const limitEscaped = Number(limit || 0) || undefined;
    const criteria = { $and: criteriaAnd };

    const rows = await MongooseRepository.wrapWithSessionIfExists(
      ProductCategory(options.database)
        .find(criteria)
        .skip(skip)
        .limit(limitEscaped)
        .sort(sort),
      options
    );

    const count = await MongooseRepository.wrapWithSessionIfExists(
      ProductCategory(options.database).countDocuments(criteria),
      options
    );

    return { rows, count };
  }

  static async findAndCountAllPublic(
    { filter, limit = 0, offset = 0, orderBy = "" },
    options: IRepositoryOptions
  ) {
    let criteriaAnd: any = [];

    if (filter && filter.name) {
      criteriaAnd.push({
        name: {
          $regex: MongooseQueryUtils.escapeRegExp(filter.name),
          $options: "i",
        },
      });
    }

    const sort = MongooseQueryUtils.sort(orderBy || "createdAt_DESC");
    const skip = Number(offset || 0) || undefined;
    const limitEscaped = Number(limit || 0) || undefined;
    const criteria = criteriaAnd.length ? { $and: criteriaAnd } : {};

    const rows = await MongooseRepository.wrapWithSessionIfExists(
      ProductCategory(options.database)
        .find(criteria)
        .skip(skip)
        .limit(limitEscaped)
        .sort(sort),
      options
    );

    const count = await MongooseRepository.wrapWithSessionIfExists(
      ProductCategory(options.database).countDocuments(criteria),
      options
    );

    return { rows, count };
  }
}
