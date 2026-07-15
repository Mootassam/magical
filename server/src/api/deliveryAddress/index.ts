export default (app) => {
  app.get(
    `/tenant/:tenantId/delivery-address/my`,
    require("./deliveryAddressFindByUser").default
  );

  app.post(
    `/tenant/:tenantId/delivery-address`,
    require("./deliveryAddressCreate").default
  );

  app.get(
    `/tenant/:tenantId/delivery-address`,
    require("./deliveryAddressList").default
  );

  app.put(
    `/tenant/:tenantId/delivery-address/:id`,
    require("./deliveryAddressUpdate").default
  );

  app.delete(
    `/tenant/:tenantId/delivery-address/:id`,
    require("./deliveryAddressDestroy").default
  );
};
