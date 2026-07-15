import { createSelector } from 'reselect';

const selectRaw = (state) => state.walletSettings;

const selectWalletSettings = createSelector(
  [selectRaw],
  (raw) => raw.walletSettings,
);

const selectInitLoading = createSelector(
  [selectRaw],
  (raw) => Boolean(raw.initLoading),
);

const selectSaveLoading = createSelector(
  [selectRaw],
  (raw) => Boolean(raw.saveLoading),
);

const walletSettingsSelectors = {
  selectInitLoading,
  selectSaveLoading,
  selectWalletSettings,
  selectRaw,
};

export default walletSettingsSelectors;
