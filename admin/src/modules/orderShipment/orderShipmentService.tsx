import authAxios from 'src/modules/shared/axios/authAxios';
import AuthCurrentTenant from 'src/modules/auth/authCurrentTenant';

export default class OrderShipmentService {
  static async list(filter, orderBy, limit, offset) {
    const params = {
      filter,
      orderBy,
      limit,
      offset,
    };

    const tenantId = AuthCurrentTenant.get();

    const response = await authAxios.get(
      `/tenant/${tenantId}/order-shipment`,
      {
        params,
      },
    );

    return response.data;
  }

  static async complete(id) {
    const tenantId = AuthCurrentTenant.get();

    const response = await authAxios.put(
      `/tenant/${tenantId}/order-shipment/${id}/complete`,
    );

    return response.data;
  }

  static async refund(id) {
    const tenantId = AuthCurrentTenant.get();

    const response = await authAxios.put(
      `/tenant/${tenantId}/order-shipment/${id}/refund`,
    );

    return response.data;
  }
}
