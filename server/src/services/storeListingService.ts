import MongooseRepository from "../database/repositories/mongooseRepository";
import StoreListingRepository from "../database/repositories/storeListingRepository";

class StoreListingService {
  static async create(data, options) {
    const session = await MongooseRepository.createSession(options.database);

    try {
      const record = await StoreListingRepository.create(data, {
        ...options,
        session,
      });

      await MongooseRepository.commitTransaction(session);

      return record;
    } catch (error) {
      await MongooseRepository.abortTransaction(session);
      throw error;
    }
  }

  static async findByUser(options) {
    return StoreListingRepository.findByUser(options);
  }

  static async findStoresWithCounts(args, options) {
    return StoreListingRepository.findStoresWithCounts(args, options);
  }

  static async findAndCountAllAdmin(args, options) {
    return StoreListingRepository.findAndCountAllAdmin(args, options);
  }
}

export default StoreListingService;
