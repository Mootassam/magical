import { createSelector } from 'reselect';

const selectRaw = (state) => state.deliveryAddress;

const selectRows = createSelector(
  [selectRaw],
  (raw) => raw.rows,
);

const selectLoading = createSelector(
  [selectRaw],
  (raw) => Boolean(raw.loading),
);

const selectSaveLoading = createSelector(
  [selectRaw],
  (raw) => Boolean(raw.saveLoading),
);

const selectDestroyLoading = createSelector(
  [selectRaw],
  (raw) => Boolean(raw.destroyLoading),
);

const deliveryAddressSelectors = {
  selectRows,
  selectLoading,
  selectSaveLoading,
  selectDestroyLoading,
  selectRaw,
};

export default deliveryAddressSelectors;
