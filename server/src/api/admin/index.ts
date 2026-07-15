export default (app) => {
  app.get(
    `/tenant/:tenantId/admin/pending-counts`,
    require("./adminPendingCounts").default
  );
};
