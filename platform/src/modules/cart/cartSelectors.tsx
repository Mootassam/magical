import { createSelector } from 'reselect';

const selectRaw = (state) => state.cart;

const selectItems = createSelector(
  [selectRaw],
  (raw) => raw.items,
);

const selectCount = createSelector(
  [selectItems],
  (items) => items.reduce((sum, item) => sum + item.qty, 0),
);

const selectTotal = createSelector(
  [selectItems],
  (items) =>
    items.reduce(
      (sum, item) => sum + (Number(item.price) || 0) * item.qty,
      0,
    ),
);

const cartSelectors = {
  selectItems,
  selectCount,
  selectTotal,
};

export default cartSelectors;
