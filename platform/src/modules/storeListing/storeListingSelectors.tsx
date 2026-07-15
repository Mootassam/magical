import { createSelector } from 'reselect';

const selectRaw = (state) => state.storeListing;

const selectRows = createSelector(
  [selectRaw],
  (raw) => raw.rows,
);

const selectLoading = createSelector(
  [selectRaw],
  (raw) => Boolean(raw.loading),
);

const selectCreateLoading = createSelector(
  [selectRaw],
  (raw) => Boolean(raw.createLoading),
);

const selectListedProductIds = createSelector(
  [selectRows],
  (rows) => new Set(rows.map((row: any) => row.product)),
);

const storeListingSelectors = {
  selectRows,
  selectLoading,
  selectCreateLoading,
  selectListedProductIds,
};

export default storeListingSelectors;
