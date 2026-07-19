import MongooseRepository from "../database/repositories/mongooseRepository";
import ProductCategoryRepository from "../database/repositories/productCategoryRepository";

class ProductCategoryService {
  options: any;

  constructor(options) {
    this.options = options;
  }

  static async findAndCountAll(args, options) {
    return ProductCategoryRepository.findAndCountAll(args, options);
  }

  static async findAndCountAllPublic(args, options) {
    return ProductCategoryRepository.findAndCountAllPublic(args, options);
  }

  async destroyAll(ids) {
    const session = await MongooseRepository.createSession(
      this.options.database
    );

    try {
      for (const id of ids) {
        await ProductCategoryRepository.destroy(id, {
          ...this.options,
          session,
        });
      }

      await MongooseRepository.commitTransaction(session);
    } catch (error) {
      await MongooseRepository.abortTransaction(session);
      throw error;
    }
  }

  async destroyAllRecords() {
    const { rows } = await ProductCategoryRepository.findAndCountAll(
      { filter: null, limit: 0, offset: 0 },
      this.options
    );

    return this.destroyAll(rows.map((row) => row.id));
  }
}

export default ProductCategoryService;
