import PermissionChecker from "../../services/user/permissionChecker";
import ApiResponseHandler from "../apiResponseHandler";
import Permissions from "../../security/permissions";
import StoreService from "../../services/storeService";

export default async (req, res, next) => {
  try {
    new PermissionChecker(req).validateHas(Permissions.values.storeEdit);

    const payload = await StoreService.unfreeze(req.params.id, req);

    await ApiResponseHandler.success(req, res, payload);
  } catch (error) {
    await ApiResponseHandler.error(req, res, error);
  }
};
