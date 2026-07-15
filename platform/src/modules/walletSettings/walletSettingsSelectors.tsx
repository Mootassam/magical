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

const walletSettingsSelectors = {
  selectInitLoading,
  selectWalletSettings,
  selectRaw,
};

export default walletSettingsSelectors;
