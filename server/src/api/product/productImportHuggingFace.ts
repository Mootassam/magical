import PermissionChecker from "../../services/user/permissionChecker";
import ApiResponseHandler from "../apiResponseHandler";
import Permissions from "../../security/permissions";
import HuggingFaceImportService from "../../services/huggingFaceImportService";

export default async (req, res, next) => {
  try {
    new PermissionChecker(req).validateHas(
      Permissions.values.productImportHuggingFace
    );

    const payload = await HuggingFaceImportService.run(req);

    await ApiResponseHandler.success(req, res, payload);
  } catch (error) {
    await ApiResponseHandler.error(req, res, error);
  }
};
