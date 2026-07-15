import actions from 'src/modules/adminPendingCounts/adminPendingCountsActions';

const initialData = {
  counts: {
    deposit: 0,
    withdraw: 0,
    store: 0,
    orderShipment: 0,
  },
  initialized: false,
  loading: false,
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
      loading: false,
      initialized: true,
      counts: payload,
    };
  }

  if (type === actions.FETCH_ERROR) {
    return {
      ...state,
      loading: false,
    };
  }

  if (type === actions.COUNTS_RECEIVED) {
    return {
      ...state,
      initialized: true,
      counts: payload,
    };
  }

  return state;
};
