import MongooseRepository from "../database/repositories/mongooseRepository";
import AutomatOrderRepository from "../database/repositories/automatOrderRepository";

class AutomatOrderService {
  static async createMany(rows, options) {
    const session = await MongooseRepository.createSession(options.database);

    try {
      const records = await AutomatOrderRepository.createMany(rows, {
        ...options,
        session,
      });

      await MongooseRepository.commitTransaction(session);

      return records;
    } catch (error) {
      await MongooseRepository.abortTransaction(session);
      throw error;
    }
  }

  static async findAndCountAll(args, options) {
    return AutomatOrderRepository.findAndCountAll(args, options);
  }

  static async findByUserStore(options) {
    return AutomatOrderRepository.findByUserStore(options);
  }
}

export default AutomatOrderService;
