import authAxios from 'src/modules/shared/axios/authAxios';
import AuthCurrentTenant from 'src/modules/auth/authCurrentTenant';

export default class ShopProductService {
  static async list(category, priceMin?, priceMax?) {
    const tenantId = AuthCurrentTenant.get();

    const filter: any = {};

    if (category) {
      filter.category = category;
    }

    if (priceMin !== undefined && priceMin !== null && priceMin !== "") {
      filter.priceMin = priceMin;
    }

    if (priceMax !== undefined && priceMax !== null && priceMax !== "") {
      filter.priceMax = priceMax;
    }

    const response = await authAxios.get(
      `/tenant/${tenantId}/product/browse`,
      {
        params: {
          filter,
        },
      },
    );

    return response.data;
  }

  static async find(id) {
    const tenantId = AuthCurrentTenant.get();

    const response = await authAxios.get(
      `/tenant/${tenantId}/product/browse/${id}`,
    );

    return response.data;
  }
}
