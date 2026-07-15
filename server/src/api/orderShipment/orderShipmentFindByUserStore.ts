import ApiResponseHandler from '../apiResponseHandler';
import OrderShipmentService from '../../services/orderShipmentService';

export default async (req, res, next) => {
  try {
    const payload = await OrderShipmentService.findByUserStore(req);

    await ApiResponseHandler.success(req, res, payload);
  } catch (error) {
    await ApiResponseHandler.error(req, res, error);
  }
};
