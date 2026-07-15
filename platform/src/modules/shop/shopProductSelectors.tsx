import { createSelector } from 'reselect';

const selectRaw = (state) => state.shopProduct;

const selectRows = createSelector(
  [selectRaw],
  (raw) => raw.rows,
);

const selectLoading = createSelector(
  [selectRaw],
  (raw) => Boolean(raw.loading),
);

const selectRecord = createSelector(
  [selectRaw],
  (raw) => raw.record,
);

const selectFindLoading = createSelector(
  [selectRaw],
  (raw) => Boolean(raw.findLoading),
);

const shopProductSelectors = {
  selectRows,
  selectLoading,
  selectRecord,
  selectFindLoading,
};

export default shopProductSelectors;
