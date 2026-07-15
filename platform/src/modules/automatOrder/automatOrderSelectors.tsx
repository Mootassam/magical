import { createSelector } from 'reselect';

const selectRaw = (state) => state.automatOrder;

const selectRows = createSelector(
  [selectRaw],
  (raw) => raw.rows,
);

const selectLoading = createSelector(
  [selectRaw],
  (raw) => Boolean(raw.loading),
);

const automatOrderSelectors = {
  selectRows,
  selectLoading,
};

export default automatOrderSelectors;
