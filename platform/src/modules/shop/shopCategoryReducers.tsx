import actions from 'src/modules/shop/shopCategoryActions';

const initialData = {
  loading: false,
  rows: [],
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

  return state;
};
