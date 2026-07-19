import actions from 'src/modules/shop/shopProductActions';

const initialData = {
  loading: false,
  loadingMore: false,
  rows: [],
  count: 0,
  hasMore: false,
  filters: { category: undefined, priceMin: undefined, priceMax: undefined, search: undefined, usePublic: undefined },
  findLoading: false,
  record: null,
};

export default (state = initialData, { type, payload }) => {
  if (type === actions.FETCH_STARTED) {
    return {
      ...state,
      loading: true,
    };
  }

  if (type === actions.FETCH_SUCCESS) {
    return {
      ...state,
      rows: payload.rows,
      count: payload.count,
      hasMore: payload.rows.length < payload.count,
      filters: payload.filters,
      loading: false,
    };
  }

  if (type === actions.FETCH_ERROR) {
    return {
      ...state,
      rows: [],
      count: 0,
      hasMore: false,
      loading: false,
    };
  }

  if (type === actions.FETCH_MORE_STARTED) {
    return {
      ...state,
      loadingMore: true,
    };
  }

  if (type === actions.FETCH_MORE_SUCCESS) {
    const rows = [...state.rows, ...payload.rows];

    return {
      ...state,
      rows,
      count: payload.count,
      hasMore: rows.length < payload.count,
      loadingMore: false,
    };
  }

  if (type === actions.FETCH_MORE_ERROR) {
    return {
      ...state,
      loadingMore: false,
    };
  }

  if (type === actions.FIND_STARTED) {
    return {
      ...state,
      findLoading: true,
      record: null,
    };
  }

  if (type === actions.FIND_SUCCESS) {
    return {
      ...state,
      record: payload,
      findLoading: false,
    };
  }

  if (type === actions.FIND_ERROR) {
    return {
      ...state,
      record: null,
      findLoading: false,
    };
  }

  return state;
};
