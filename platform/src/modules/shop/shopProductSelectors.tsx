import { createSelector } from 'reselect';

const selectRaw = (state) => state.shopProduct;

const selectRows = createSelector(
  [selectRaw],
  (raw) => raw.rows,
);

const selectCount = createSelector(
  [selectRaw],
  (raw) => raw.count,
);

const selectLoading = createSelector(
  [selectRaw],
  (raw) => Boolean(raw.loading),
);

const selectLoadingMore = createSelector(
  [selectRaw],
  (raw) => Boolean(raw.loadingMore),
);

const selectHasMore = createSelector(
  [selectRaw],
  (raw) => Boolean(raw.hasMore),
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
  selectCount,
  selectLoading,
  selectLoadingMore,
  selectHasMore,
  selectRecord,
  selectFindLoading,
};

export default shopProductSelectors;
