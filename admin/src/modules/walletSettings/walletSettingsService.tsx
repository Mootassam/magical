import authAxios from 'src/modules/shared/axios/authAxios';
import AuthCurrentTenant from 'src/modules/auth/authCurrentTenant';

export default class WalletSettingsService {
  static async find() {
    const tenantId = AuthCurrentTenant.get();

    const response = await authAxios.get(
      `/tenant/${tenantId}/wallet-settings`,
    );

    return response.data;
  }

  static async save(walletSettings) {
    const body = {
      walletSettings,
    };

    const tenantId = AuthCurrentTenant.get();
    const response = await authAxios.put(
      `/tenant/${tenantId}/wallet-settings`,
      body,
    );
    return response.data;
  }
}
