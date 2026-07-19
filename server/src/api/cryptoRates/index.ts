export default (app) => {
  app.get(
    `/tenant/:tenantId/crypto-rates`,
    require("./cryptoRatesFind").default
  );
};
