import MongooseRepository from "../database/repositories/mongooseRepository";
import DeliveryAddressRepository from "../database/repositories/deliveryAddressRepository";

class DeliveryAddressService {
  static async create(data, options) {
    const session = await MongooseRepository.createSession(options.database);

    try {
      const record = await DeliveryAddressRepository.create(data, {
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

  static async update(id, data, options) {
    const session = await MongooseRepository.createSession(options.database);

    try {
      const record = await DeliveryAddressRepository.update(id, data, {
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

  static async destroy(id, options) {
    const session = await MongooseRepository.createSession(options.database);

    try {
      await DeliveryAddressRepository.destroy(id, {
        ...options,
        session,
      });

      await MongooseRepository.commitTransaction(session);
    } catch (error) {
      await MongooseRepository.abortTransaction(session);
      throw error;
    }
  }

  static async findByUser(options) {
    return DeliveryAddressRepository.findByUser(options);
  }

  static async findAndCountAll(args, options) {
    return DeliveryAddressRepository.findAndCountAll(args, options);
  }
}

export default DeliveryAddressService;
