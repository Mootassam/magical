import MongooseRepository from "./mongooseRepository";
import WalletSettings from "../models/walletSettings";
import AuditLogRepository from "./auditLogRepository";
import { IRepositoryOptions } from "./IRepositoryOptions";

export default class WalletSettingsRepository {
  static async find(options: IRepositoryOptions) {
    const currentTenant = MongooseRepository.getCurrentTenant(options);

    return MongooseRepository.wrapWithSessionIfExists(
      WalletSettings(options.database).findOne({
        tenant: currentTenant.id,
      }),
      options
    );
  }

  static async findOrCreateDefault(defaults, options: IRepositoryOptions) {
    const currentTenant = MongooseRepository.getCurrentTenant(options);

    const first = await MongooseRepository.wrapWithSessionIfExists(
      WalletSettings(options.database).findOne({
        tenant: currentTenant.id,
      }),
      options
    );

    if (first) {
      return first;
    }

    const [walletSettings] = await WalletSettings(options.database).create(
      [
        {
          ...defaults,
          tenant: currentTenant.id,
          createdBy: MongooseRepository.getCurrentUser(options)
            ? MongooseRepository.getCurrentUser(options).id
            : null,
        },
      ],
      options
    );

    return walletSettings;
  }

  static async save(data, options: IRepositoryOptions) {
    const currentTenant = MongooseRepository.getCurrentTenant(options);

    const record = await MongooseRepository.wrapWithSessionIfExists(
      WalletSettings(options.database).findOne({
        tenant: currentTenant.id,
      }),
      options
    );

    await WalletSettings(options.database).updateOne(
      { _id: record.id },
      { ...data, tenant: currentTenant.id },
      options
    );

    await AuditLogRepository.log(
      {
        entityName: "walletSettings",
        entityId: record.id,
        action: AuditLogRepository.UPDATE,
        values: data,
      },
      options
    );

    return MongooseRepository.wrapWithSessionIfExists(
      WalletSettings(options.database).findById(record.id),
      options
    );
  }
}
