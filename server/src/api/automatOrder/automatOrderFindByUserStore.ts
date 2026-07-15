import ApiResponseHandler from '../apiResponseHandler';
import AutomatOrderService from '../../services/automatOrderService';

export default async (req, res, next) => {
  try {
    const payload = await AutomatOrderService.findByUserStore(req);

    await ApiResponseHandler.success(req, res, payload);
  } catch (error) {
    await ApiResponseHandler.error(req, res, error);
  }
};
