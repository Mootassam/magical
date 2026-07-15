import { createSelector } from 'reselect';

const selectRaw = (state) => state.adminPendingCounts;

const selectCounts = createSelector(
  [selectRaw],
  (raw) => raw.counts,
);

const selectInitialized = createSelector(
  [selectRaw],
  (raw) => Boolean(raw.initialized),
);

const adminPendingCountsSelectors = {
  selectCounts,
  selectInitialized,
};

export default adminPendingCountsSelectors;
