import ApiResponseHandler from "../apiResponseHandler";
import StoreService from "../../services/storeService";

export default async (req, res, next) => {
  try {
    const payload = await StoreService.updateOwn(req.body.data, req);

    await ApiResponseHandler.success(req, res, payload);
  } catch (error) {
    await ApiResponseHandler.error(req, res, error);
  }
};
