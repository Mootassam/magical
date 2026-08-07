import authAxios from 'src/modules/shared/axios/authAxios';
import AuthCurrentTenant from 'src/modules/auth/authCurrentTenant';

export default class ShopProductService {
  static async list(category, priceMin?, priceMax?, search?, limit?, offset?) {
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

    if (search !== undefined && search !== null && search !== "") {
      filter.title = search;
    }

    const response = await authAxios.get(
      `/tenant/${tenantId}/product/browse`,
      {
        params: {
          filter,
          limit,
          offset,
          // Highest-priced products first across the storefront's category
          // and search browsing.
          orderBy: "price_DESC",
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

  // Public browse - no tenant, no auth. Used by storefront pages that must
  // work for anonymous shoppers who have no tenant in local storage.
  static async listPublic(category, priceMin?, priceMax?, search?, limit?, offset?) {
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

    if (search !== undefined && search !== null && search !== "") {
      filter.title = search;
    }

    const response = await authAxios.get(
      `/product/browse-public`,
      {
        params: {
          filter,
          limit,
          offset,
          // Highest-priced products first across the storefront's category
          // and search browsing.
          orderBy: "price_DESC",
        },
      },
    );

    return response.data;
  }

  static async findPublic(id) {
    const response = await authAxios.get(
      `/product/browse-public/${id}`,
    );

    return response.data;
  }
}
