import actions from 'src/modules/store/storeActions';

const initialData = {
  initLoading: false,
  saveLoading: false,
  store: null,
};

export default (state = initialData, { type, payload }) => {
  if (type === actions.INIT_STARTED) {
    return {
      ...state,
      initLoading: true,
    };
  }

  if (type === actions.INIT_SUCCESS) {
    return {
      ...state,
      store: payload,
      initLoading: false,
    };
  }

  if (type === actions.INIT_ERROR) {
    return {
      ...state,
      store: null,
      initLoading: false,
    };
  }

  if (type === actions.SUBMIT_STARTED) {
    return {
      ...state,
      saveLoading: true,
    };
  }

  if (type === actions.SUBMIT_SUCCESS) {
    return {
      ...state,
      store: payload,
      saveLoading: false,
    };
  }

  if (type === actions.SUBMIT_ERROR) {
    return {
      ...state,
      saveLoading: false,
    };
  }

  return state;
};
