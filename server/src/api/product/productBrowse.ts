import ApiResponseHandler from '../apiResponseHandler';
import ProductServices from '../../services/productService';

export default async (req, res, next) => {
  try {
    const payload = await new ProductServices(req).findAndCountAll(
      req.query,
    );

    await ApiResponseHandler.success(req, res, payload);
  } catch (error) {
    await ApiResponseHandler.error(req, res, error);
  }
};
