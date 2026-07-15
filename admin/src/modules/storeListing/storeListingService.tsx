import authAxios from 'src/modules/shared/axios/authAxios';
import AuthCurrentTenant from 'src/modules/auth/authCurrentTenant';

export default class StoreListingService {
  static async listStores(search) {
    const tenantId = AuthCurrentTenant.get();

    const response = await authAxios.get(
      `/tenant/${tenantId}/store-listing/stores`,
      {
        params: { search },
      },
    );

    return response.data;
  }

  static async listByStore(storeId, orderBy, limit, offset) {
    const tenantId = AuthCurrentTenant.get();

    const response = await authAxios.get(
      `/tenant/${tenantId}/store-listing`,
      {
        params: {
          filter: { store: storeId },
          orderBy,
          limit,
          offset,
        },
      },
    );

    return response.data;
  }
}
