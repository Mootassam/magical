import authAxios from 'src/modules/shared/axios/authAxios';
import AuthCurrentTenant from 'src/modules/auth/authCurrentTenant';

export default class ShopCategoryService {
  static async list() {
    const tenantId = AuthCurrentTenant.get();

    const response = await authAxios.get(
      `/tenant/${tenantId}/product-category/browse`,
    );

    return response.data;
  }

  // Public browse - no tenant, no auth. Used by storefront pages that must
  // work for anonymous shoppers who have no tenant in local storage.
  static async listPublic() {
    const response = await authAxios.get(
      `/product-category/browse-public`,
    );

    return response.data;
  }
}
