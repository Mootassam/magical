export default (app) => {
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
