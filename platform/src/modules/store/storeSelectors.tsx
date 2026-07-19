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

const selectDashboard = createSelector(
  [selectRaw],
  (raw) => raw.dashboard,
);

const selectDashboardLoading = createSelector(
  [selectRaw],
  (raw) => Boolean(raw.dashboardLoading),
);

const selectUpdateOwnLoading = createSelector(
  [selectRaw],
  (raw) => Boolean(raw.updateOwnLoading),
);

const storeSelectors = {
  selectInitLoading,
  selectSaveLoading,
  selectStore,
  selectDashboard,
  selectDashboardLoading,
  selectUpdateOwnLoading,
  selectRaw,
};

export default storeSelectors;
