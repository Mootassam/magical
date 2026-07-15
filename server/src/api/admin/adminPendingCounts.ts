import ApiResponseHandler from '../apiResponseHandler';
import AdminPendingCountsService from '../../services/adminPendingCountsService';

export default async (req, res, next) => {
  try {
    const payload = await AdminPendingCountsService.compute(req);

    await ApiResponseHandler.success(req, res, payload);
  } catch (error) {
    await ApiResponseHandler.error(req, res, error);
  }
};
