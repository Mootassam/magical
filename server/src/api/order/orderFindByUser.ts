import ApiResponseHandler from "../apiResponseHandler";
import OrderService from "../../services/orderService";

export default async (req, res, next) => {
  try {
    const payload = await OrderService.findByUser(req);

    await ApiResponseHandler.success(req, res, payload);
  } catch (error) {
    await ApiResponseHandler.error(req, res, error);
  }
};
