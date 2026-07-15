import { createSelector } from 'reselect';

const selectRaw = (state) => state.order;

const selectCreateLoading = createSelector(
  [selectRaw],
  (raw) => Boolean(raw.createLoading),
);

const selectLastOrder = createSelector(
  [selectRaw],
  (raw) => raw.lastOrder,
);

const selectRows = createSelector(
  [selectRaw],
  (raw) => raw.rows,
);

const selectLoading = createSelector(
  [selectRaw],
  (raw) => Boolean(raw.loading),
);

const orderSelectors = {
  selectCreateLoading,
  selectLastOrder,
  selectRows,
  selectLoading,
};

export default orderSelectors;
