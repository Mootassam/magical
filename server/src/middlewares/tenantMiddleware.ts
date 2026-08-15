import TenantService from '../services/tenantService';
import MongooseQueryUtils from '../database/utils/mongooseQueryUtils';

export async function tenantMiddleware(
  req,
  res,
  next,
  value,
  name,
) {
  try {
    // Clients occasionally hit tenant-scoped routes before they have a
    // tenant in local storage (e.g. "/tenant/null/..."), which isn't a
    // valid ObjectId. Sanitize it here so that case resolves to "no
    // tenant found" instead of an unhandled Mongoose CastError.
    const tenant = await new TenantService(req).findById(
      MongooseQueryUtils.uuid(value),
    );
    req.currentTenant = tenant;
    next();
  } catch (error) {
    next(error);
  }
}
