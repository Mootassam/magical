import ApiResponseHandler from "../apiResponseHandler";
import DeliveryAddressService from "../../services/deliveryAddressService";

export default async (req, res, next) => {
  try {
    const payload = await DeliveryAddressService.findByUser(req);

    await ApiResponseHandler.success(req, res, payload);
  } catch (error) {
    await ApiResponseHandler.error(req, res, error);
  }
};
