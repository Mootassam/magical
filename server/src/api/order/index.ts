export default (app) => {
  app.post(
    `/tenant/:tenantId/order`,
    require("./orderCreate").default
  );

  app.get(
    `/tenant/:tenantId/order/my`,
    require("./orderFindByUser").default
  );

  app.get(
    `/tenant/:tenantId/order/:id`,
    require("./orderFind").default
  );
};
