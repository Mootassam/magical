import authAxios from 'src/modules/shared/axios/authAxios';
import AuthCurrentTenant from 'src/modules/auth/authCurrentTenant';

export default class OrderShipmentService {
  static async create(automatOrderId) {
    const body = {
      data: { automatOrder: automatOrderId },
    };

    const tenantId = AuthCurrentTenant.get();

    const response = await authAxios.post(
      `/tenant/${tenantId}/order-shipment`,
      body,
    );

    return response.data;
  }

  static async findByUserStore() {
    const tenantId = AuthCurrentTenant.get();

    const response = await authAxios.get(
      `/tenant/${tenantId}/order-shipment/my`,
    );

    return response.data;
  }
}
