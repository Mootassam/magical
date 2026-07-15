import { createSelector } from 'reselect';

const selectRaw = (state) => state.orderShipment;

const selectRows = createSelector(
  [selectRaw],
  (raw) => raw.rows,
);

const selectLoading = createSelector(
  [selectRaw],
  (raw) => Boolean(raw.loading),
);

const selectShippingId = createSelector(
  [selectRaw],
  (raw) => raw.shippingId,
);

const orderShipmentSelectors = {
  selectRows,
  selectLoading,
  selectShippingId,
};

export default orderShipmentSelectors;
