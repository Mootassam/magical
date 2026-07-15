import MongooseRepository from "../database/repositories/mongooseRepository";
import OrderRepository from "../database/repositories/orderRepository";

class OrderService {
  static async create(data, options) {
    const session = await MongooseRepository.createSession(options.database);

    try {
      const record = await OrderRepository.create(data, {
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

  static async findById(id, options) {
    return OrderRepository.findById(id, options);
  }

  static async findByUser(options) {
    return OrderRepository.findByUser(options);
  }
}

export default OrderService;
