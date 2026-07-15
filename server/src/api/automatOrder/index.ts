export default (app) => {
  app.post(
    `/tenant/:tenantId/automat-order`,
    require("./automatOrderCreate").default
  );

  app.get(
    `/tenant/:tenantId/automat-order/my`,
    require("./automatOrderFindByUserStore").default
  );

  app.get(
    `/tenant/:tenantId/automat-order`,
    require("./automatOrderList").default
  );
};
