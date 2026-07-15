export default (app) => {
  app.post(
    `/tenant/:tenantId/store-listing`,
    require("./storeListingCreate").default
  );

  app.get(
    `/tenant/:tenantId/store-listing/my`,
    require("./storeListingFindByUser").default
  );

  app.get(
    `/tenant/:tenantId/store-listing/stores`,
    require("./storeListingStores").default
  );

  app.get(
    `/tenant/:tenantId/store-listing`,
    require("./storeListingList").default
  );
};
