import actions from 'src/modules/deliveryAddress/deliveryAddressActions';

const initialData = {
  loading: false,
  saveLoading: false,
  destroyLoading: false,
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

  if (type === actions.CREATE_STARTED) {
    return {
      ...state,
      saveLoading: true,
    };
  }

  if (type === actions.CREATE_SUCCESS) {
    return {
      ...state,
      saveLoading: false,
    };
  }

  if (type === actions.CREATE_ERROR) {
    return {
      ...state,
      saveLoading: false,
    };
  }

  if (type === actions.UPDATE_STARTED) {
    return {
      ...state,
      saveLoading: true,
    };
  }

  if (type === actions.UPDATE_SUCCESS) {
    return {
      ...state,
      saveLoading: false,
    };
  }

  if (type === actions.UPDATE_ERROR) {
    return {
      ...state,
      saveLoading: false,
    };
  }

  if (type === actions.DESTROY_STARTED) {
    return {
      ...state,
      destroyLoading: true,
    };
  }

  if (type === actions.DESTROY_SUCCESS) {
    return {
      ...state,
      destroyLoading: false,
    };
  }

  if (type === actions.DESTROY_ERROR) {
    return {
      ...state,
      destroyLoading: false,
    };
  }

  return state;
};
