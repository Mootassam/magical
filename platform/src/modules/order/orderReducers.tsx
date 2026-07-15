import actions from 'src/modules/order/orderActions';

const initialData = {
  createLoading: false,
  lastOrder: null as any,
  rows: [] as Array<any>,
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
      rows: payload,
    };
  }

  if (type === actions.FETCH_ERROR) {
    return {
      ...state,
      loading: false,
    };
  }

  if (type === actions.CREATE_STARTED) {
    return {
      ...state,
      createLoading: true,
    };
  }

  if (type === actions.CREATE_SUCCESS) {
    return {
      ...state,
      createLoading: false,
      lastOrder: payload,
    };
  }

  if (type === actions.CREATE_ERROR) {
    return {
      ...state,
      createLoading: false,
    };
  }

  return state;
};
