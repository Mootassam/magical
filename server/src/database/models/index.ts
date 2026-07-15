const models = [
  require('./tenant').default,
  require('./auditLog').default,
  require('./settings').default,
  require('./user').default,
  require('./category').default,
  require('./productCategory').default,
  require('./transaction').default,
  require('./social').default,
  require('./vip').default,
  require('./product').default,
  require('./records').default,
  require('./order').default,
  require('./store').default,
  require('./storeListing').default,
  require('./automatOrder').default,
  require('./orderShipment').default,
  require("./company").default,
  require('./notification').default,
  require('./mouvements').default,
  require('./dons').default,
  require('./historiquePoints').default,
  require('./votes').default,
];

export default function init(database) {
  for (let model of models) {
    model(database);
  }

  return database;
}

export async function createCollections(database) {
  for (let model of models) {
    await model(database).createCollection();
  }

  return database;
}
