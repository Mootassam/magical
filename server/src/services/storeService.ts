import MongooseRepository from "../database/repositories/mongooseRepository";
import StoreRepository from "../database/repositories/storeRepository";
import AdminPendingCountsService from "./adminPendingCountsService";

function notifyPendingCountsChanged(options) {
  const currentTenant = MongooseRepository.getCurrentTenant(options);

  AdminPendingCountsService.computeAndEmit(
    currentTenant.id,
    options.database
  ).catch(() => {});
}

class StoreService {
  static async findByUser(options) {
    return StoreRepository.findByUser(options);
  }

  static async submit(data, options) {
    const session = await MongooseRepository.createSession(options.database);

    try {
      const store = await StoreRepository.submit(data, {
        ...options,
        session,
      });

      await MongooseRepository.commitTransaction(session);

      notifyPendingCountsChanged(options);

      return store;
    } catch (error) {
      await MongooseRepository.abortTransaction(session);
      throw error;
    }
  }

  static async findAndCountAll(args, options) {
    return StoreRepository.findAndCountAll(args, options);
  }

  static async updateStatus(id, status, options) {
    const session = await MongooseRepository.createSession(options.database);

    try {
      const store = await StoreRepository.updateStatus(id, status, {
        ...options,
        session,
      });

      await MongooseRepository.commitTransaction(session);

      notifyPendingCountsChanged(options);

      return store;
    } catch (error) {
      await MongooseRepository.abortTransaction(session);
      throw error;
    }
  }
}

export default StoreService;
