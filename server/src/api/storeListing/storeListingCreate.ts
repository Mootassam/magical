import ApiResponseHandler from '../apiResponseHandler';
import StoreListingService from '../../services/storeListingService';

export default async (req, res, next) => {
  try {
    const payload = await StoreListingService.create(req.body.data, req);

    await ApiResponseHandler.success(req, res, payload);
  } catch (error) {
    await ApiResponseHandler.error(req, res, error);
  }
};
