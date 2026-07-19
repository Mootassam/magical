export default (app) => {
  app.get(
    `/tenant/:tenantId/store/my`,
    require("./storeFindByUser").default
  );

  app.post(`/tenant/:tenantId/store`, require("./storeSubmit").default);

  app.get(`/tenant/:tenantId/store`, require("./storeList").default);

  app.get(
    `/tenant/:tenantId/store/my/dashboard`,
    require("./storeDashboard").default
  );

  app.put(
    `/tenant/:tenantId/store/my`,
    require("./storeUpdateOwn").default
  );

  app.put(
    `/tenant/:tenantId/store/:id/status`,
    require("./storeStatus").default
  );

  app.put(
    `/tenant/:tenantId/store/:id/details`,
    require("./storeUpdateDetails").default
  );
};
