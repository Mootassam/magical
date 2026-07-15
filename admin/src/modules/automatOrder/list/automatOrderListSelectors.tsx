import { createSelector } from 'reselect';

const selectRaw = (state) => state.automatOrder.list;

const selectLoading = createSelector(
  [selectRaw],
  (raw) => raw.loading,
);

const selectRows = createSelector(
  [selectRaw],
  (raw) => raw.rows,
);

const selectCount = createSelector(
  [selectRaw],
  (raw) => raw.count,
);

const selectHasRows = createSelector(
  [selectCount],
  (count) => count > 0,
);

const selectSorter = createSelector(
  [selectRaw],
  (raw) => raw.sorter || {},
);

const selectOrderBy = createSelector([selectRaw], (raw) => {
  const sorter = raw.sorter;

  if (!sorter || !sorter.field) {
    return null;
  }

  const direction = sorter.order === 'descend' ? 'DESC' : 'ASC';

  return `${sorter.field}_${direction}`;
});

const selectFilter = createSelector([selectRaw], (raw) => {
  return raw.filter;
});

const selectLimit = createSelector([selectRaw], (raw) => {
  const pagination = raw.pagination;
  return pagination.pageSize;
});

const selectOffset = createSelector([selectRaw], (raw) => {
  const pagination = raw.pagination;

  if (!pagination || !pagination.pageSize) {
    return 0;
  }

  const current = pagination.current || 1;

  return (current - 1) * pagination.pageSize;
});

const selectPagination = createSelector(
  [selectRaw, selectCount],
  (raw, count) => {
    return {
      ...raw.pagination,
      total: count,
    };
  },
);

const automatOrderListSelectors = {
  selectLoading,
  selectRows,
  selectCount,
  selectHasRows,
  selectSorter,
  selectOrderBy,
  selectFilter,
  selectLimit,
  selectOffset,
  selectPagination,
};

export default automatOrderListSelectors;
