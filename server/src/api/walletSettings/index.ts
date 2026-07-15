export default (app) => {
  app.put(
    `/tenant/:tenantId/wallet-settings`,
    require("./walletSettingsSave").default
  );
  app.get(
    `/tenant/:tenantId/wallet-settings`,
    require("./walletSettingsFind").default
  );
};
