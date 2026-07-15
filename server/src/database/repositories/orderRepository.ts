import MongooseRepository from "./mongooseRepository";
import Order from "../models/order";
import Product from "../models/product";
import AuditLogRepository from "./auditLogRepository";
import MongooseQueryUtils from "../utils/mongooseQueryUtils";
import Error400 from "../../errors/Error400";
import Error404 from "../../errors/Error404";
import { IRepositoryOptions } from "./IRepositoryOptions";

export default class OrderRepository {
  static async create(data, options: IRepositoryOptions) {
    const currentUser = MongooseRepository.getCurrentUser(options);
    const currentTenant = MongooseRepository.getCurrentTenant(options);

    if (!Array.isArray(data.items) || data.items.length === 0) {
      throw new Error400(options.language, "validation.emptyCart");
    }

    if (
      !data.deliveryAddress ||
      !data.deliveryAddress.address ||
      !data.deliveryAddress.contact ||
      !data.deliveryAddress.contactNumber
    ) {
      throw new Error400(options.language, "validation.missingDeliveryAddress");
    }

    // Prices/titles/images are always re-read from the product records
    // server-side - never trusted from the client - so an order can't be
    // placed against a stale or tampered cart price.
    const items = [];
    let totalAmount = 0;

    for (const cartItem of data.items) {
      const qty = Number(cartItem.qty) || 0;

      if (qty < 1) {
        continue;
      }

      const product = await MongooseRepository.wrapWithSessionIfExists(
        Product(options.database).findById(cartItem.product),
        options
      );

      if (!product || String(product.tenant) !== String(currentTenant.id)) {
        continue;
      }

      const price = Number(product.price) || 0;

      items.push({
        product: product.id,
        title: product.title,
        image: product.image,
        price,
        qty,
      });

      totalAmount += price * qty;
    }

    if (items.length === 0) {
      throw new Error400(options.language, "validation.emptyCart");
    }

    const [record] = await Order(options.database).create(
      [
        {
          items,
          totalAmount: Math.round(totalAmount * 100) / 100,
          paymentMethod: "cod",
          status: "pending",
          deliveryAddress: {
            address: data.deliveryAddress.address,
            countryCode: data.deliveryAddress.countryCode || "+1",
            contactNumber: data.deliveryAddress.contactNumber,
            contact: data.deliveryAddress.contact,
          },
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
        entityName: "order",
        entityId: record.id,
        action: AuditLogRepository.CREATE,
        values: data,
      },
      options
    );

    return record;
  }

  static async findById(id, options: IRepositoryOptions) {
    const currentUser = MongooseRepository.getCurrentUser(options);
    const currentTenant = MongooseRepository.getCurrentTenant(options);

    const record = await MongooseRepository.wrapWithSessionIfExists(
      Order(options.database).findOne({
        _id: id,
        user: currentUser.id,
        tenant: currentTenant.id,
      }),
      options
    );

    if (!record) {
      throw new Error404();
    }

    return record;
  }

  static async findByUser(options: IRepositoryOptions) {
    const currentUser = MongooseRepository.getCurrentUser(options);
    const currentTenant = MongooseRepository.getCurrentTenant(options);

    return MongooseRepository.wrapWithSessionIfExists(
      Order(options.database)
        .find({ user: currentUser.id, tenant: currentTenant.id })
        .sort(MongooseQueryUtils.sort("createdAt_DESC")),
      options
    );
  }
}
