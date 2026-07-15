import actions from 'src/modules/storeListing/stores/storeListingStoresActions';

const initialData = {
  rows: [] as Array<any>,
  loading: false,
  search: '',
};

export default (state = initialData, { type, payload }) => {
  if (type === actions.SEARCH_CHANGED) {
    return {
      ...state,
      search: payload || '',
    };
  }

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
      rows: [],
    };
  }

  return state;
};
