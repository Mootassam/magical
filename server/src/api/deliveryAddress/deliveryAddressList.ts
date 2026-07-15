import PermissionChecker from "../../services/user/permissionChecker";
import ApiResponseHandler from "../apiResponseHandler";
import Permissions from "../../security/permissions";
import DeliveryAddressService from "../../services/deliveryAddressService";

export default async (req, res, next) => {
  try {
    new PermissionChecker(req).validateHas(
      Permissions.values.deliveryAddressRead
    );

    const payload = await DeliveryAddressService.findAndCountAll(
      req.query,
      req
    );

    await ApiResponseHandler.success(req, res, payload);
  } catch (error) {
    await ApiResponseHandler.error(req, res, error);
  }
};
