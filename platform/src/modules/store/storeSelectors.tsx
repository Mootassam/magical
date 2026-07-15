import { createSelector } from 'reselect';

const selectRaw = (state) => state.store;

const selectStore = createSelector(
  [selectRaw],
  (raw) => raw.store,
);

const selectInitLoading = createSelector(
  [selectRaw],
  (raw) => Boolean(raw.initLoading),
);

const selectSaveLoading = createSelector(
  [selectRaw],
  (raw) => Boolean(raw.saveLoading),
);

const storeSelectors = {
  selectInitLoading,
  selectSaveLoading,
  selectStore,
  selectRaw,
};

export default storeSelectors;
