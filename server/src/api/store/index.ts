export default (app) => {
  app.get(
    `/tenant/:tenantId/store/my`,
    require("./storeFindByUser").default
  );

  app.post(`/tenant/:tenantId/store`, require("./storeSubmit").default);

  app.get(`/tenant/:tenantId/store`, require("./storeList").default);

  app.put(
    `/tenant/:tenantId/store/:id/status`,
    require("./storeStatus").default
  );
};
