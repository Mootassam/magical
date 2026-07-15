import actions from 'src/modules/shop/shopProductActions';

const initialData = {
  loading: false,
  rows: [],
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
      rows: payload,
      loading: false,
    };
  }

  if (type === actions.FETCH_ERROR) {
    return {
      ...state,
      rows: [],
      loading: false,
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
