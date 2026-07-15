import WalletSettingsService from "../../services/walletSettingsService";
import PermissionChecker from "../../services/user/permissionChecker";
import ApiResponseHandler from "../apiResponseHandler";
import Permissions from "../../security/permissions";

export default async (req, res, next) => {
  try {
    new PermissionChecker(req).validateHas(
      Permissions.values.walletSettingsEdit
    );

    const payload = await WalletSettingsService.save(
      req.body.walletSettings,
      req
    );

    await ApiResponseHandler.success(req, res, payload);
  } catch (error) {
    await ApiResponseHandler.error(req, res, error);
  }
};
