import { createSelector } from 'reselect';

const selectRaw = (state) => state.storeListing.stores;

const selectRows = createSelector(
  [selectRaw],
  (raw) => raw.rows,
);

const selectLoading = createSelector(
  [selectRaw],
  (raw) => Boolean(raw.loading),
);

const selectSearch = createSelector(
  [selectRaw],
  (raw) => raw.search,
);

const selectHasRows = createSelector(
  [selectRows],
  (rows) => rows.length > 0,
);

const storeListingStoresSelectors = {
  selectRows,
  selectLoading,
  selectSearch,
  selectHasRows,
};

export default storeListingStoresSelectors;
