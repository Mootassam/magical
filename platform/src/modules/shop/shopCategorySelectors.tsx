import { createSelector } from 'reselect';

const selectRaw = (state) => state.shopCategory;

const selectRows = createSelector(
  [selectRaw],
  (raw) => raw.rows,
);

const selectLoading = createSelector(
  [selectRaw],
  (raw) => Boolean(raw.loading),
);

const shopCategorySelectors = {
  selectRows,
  selectLoading,
};

export default shopCategorySelectors;
