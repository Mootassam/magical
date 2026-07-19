export default (app) => {
  // Public browse endpoint: no :tenantId param and no auth required.
  app.get(
    `/product-category/browse-public`,
    require("./productCategoryBrowsePublic").default
  );
  app.get(
    `/tenant/:tenantId/product-category/browse`,
    require("./productCategoryBrowse").default
  );
  app.get(
    `/tenant/:tenantId/product-category`,
    require("./productCategoryList").default
  );
  app.delete(
    `/tenant/:tenantId/product-category`,
    require("./productCategoryDestroy").default
  );
  app.delete(
    `/tenant/:tenantId/product-category/deleteAll`,
    require("./productCategoryDestroyAllRecords").default
  );
};
