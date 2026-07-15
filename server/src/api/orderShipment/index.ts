export default (app) => {
  app.post(
    `/tenant/:tenantId/order-shipment`,
    require("./orderShipmentCreate").default
  );

  app.get(
    `/tenant/:tenantId/order-shipment/my`,
    require("./orderShipmentFindByUserStore").default
  );

  app.get(
    `/tenant/:tenantId/order-shipment`,
    require("./orderShipmentList").default
  );

  app.put(
    `/tenant/:tenantId/order-shipment/:id/complete`,
    require("./orderShipmentComplete").default
  );

  app.put(
    `/tenant/:tenantId/order-shipment/:id/refund`,
    require("./orderShipmentRefund").default
  );
};
