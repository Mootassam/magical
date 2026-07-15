import ApiResponseHandler from "../apiResponseHandler";
import WalletSettingsService from "../../services/walletSettingsService";

export default async (req, res, next) => {
  try {
    const payload = await WalletSettingsService.findOrCreateDefault(req);

    await ApiResponseHandler.success(req, res, payload);
  } catch (error) {
    await ApiResponseHandler.error(req, res, error);
  }
};
