import ApiResponseHandler from "../apiResponseHandler";
import CryptoPriceService from "../../services/cryptoPriceService";

export default async (req, res, next) => {
  try {
    const payload = await CryptoPriceService.getRates();

    await ApiResponseHandler.success(req, res, payload);
  } catch (error) {
    await ApiResponseHandler.error(req, res, error);
  }
};
