import actions from 'src/modules/orderShipment/list/orderShipmentListActions';

const INITIAL_PAGE_SIZE = 10;

const initialData = {
  rows: [] as Array<any>,
  count: 0,
  loading: false,
  statusUpdateLoading: false,
  pagination: {
    current: 1,
    pageSize: INITIAL_PAGE_SIZE,
  },
};

export default (state = initialData, { type, payload }) => {
  if (type === actions.RESETED) {
    return {
      ...initialData,
    };
  }

  if (type === actions.PAGINATION_CHANGED) {
    return {
      ...state,
      pagination: payload || {
        current: 1,
        pageSize: INITIAL_PAGE_SIZE,
      },
    };
  }

  if (type === actions.FETCH_STARTED) {
    return {
      ...state,
      loading: true,
      pagination:
        payload && payload.keepPagination
          ? state.pagination
          : {
              current: 1,
              pageSize: INITIAL_PAGE_SIZE,
            },
    };
  }

  if (type === actions.FETCH_SUCCESS) {
    return {
      ...state,
      loading: false,
      rows: payload.rows,
      count: payload.count,
    };
  }

  if (type === actions.FETCH_ERROR) {
    return {
      ...state,
      loading: false,
      rows: [],
      count: 0,
    };
  }

  if (type === actions.STATUS_UPDATE_STARTED) {
    return {
      ...state,
      statusUpdateLoading: true,
    };
  }

  if (type === actions.STATUS_UPDATE_SUCCESS) {
    return {
      ...state,
      statusUpdateLoading: false,
    };
  }

  if (type === actions.STATUS_UPDATE_ERROR) {
    return {
      ...state,
      statusUpdateLoading: false,
    };
  }

  return state;
};
