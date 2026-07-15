import MongooseRepository from "../database/repositories/mongooseRepository";
import OrderShipmentRepository from "../database/repositories/orderShipmentRepository";
import AdminPendingCountsService from "./adminPendingCountsService";

function notifyPendingCountsChanged(options) {
  const currentTenant = MongooseRepository.getCurrentTenant(options);

  AdminPendingCountsService.computeAndEmit(
    currentTenant.id,
    options.database
  ).catch(() => {});
}

class OrderShipmentService {
  static async createFromAutomatOrder(automatOrderId, options) {
    const session = await MongooseRepository.createSession(options.database);

    try {
      const record = await OrderShipmentRepository.createFromAutomatOrder(
        automatOrderId,
        { ...options, session }
      );

      await MongooseRepository.commitTransaction(session);

      notifyPendingCountsChanged(options);

      return record;
    } catch (error) {
      await MongooseRepository.abortTransaction(session);
      throw error;
    }
  }

  static async findByUserStore(options) {
    return OrderShipmentRepository.findByUserStore(options);
  }

  static async findAndCountAllAdmin(args, options) {
    return OrderShipmentRepository.findAndCountAllAdmin(args, options);
  }

  static async updateStatus(id, status, options) {
    const session = await MongooseRepository.createSession(options.database);

    try {
      const record = await OrderShipmentRepository.updateStatus(id, status, {
        ...options,
        session,
      });

      await MongooseRepository.commitTransaction(session);

      notifyPendingCountsChanged(options);

      return record;
    } catch (error) {
      await MongooseRepository.abortTransaction(session);
      throw error;
    }
  }
}

export default OrderShipmentService;
