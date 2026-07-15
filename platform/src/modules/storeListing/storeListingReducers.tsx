import actions from 'src/modules/storeListing/storeListingActions';

const initialData = {
  rows: [] as Array<any>,
  loading: false,
  createLoading: false,
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
    const alreadyExists = state.rows.some(
      (row) => row.id === payload.id,
    );

    return {
      ...state,
      createLoading: false,
      rows: alreadyExists ? state.rows : [payload, ...state.rows],
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
