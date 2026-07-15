import actions from 'src/modules/walletSettings/walletSettingsActions';

const initialData = {
  initLoading: false,
  saveLoading: false,
  walletSettings: null,
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
      walletSettings: payload,
      initLoading: false,
    };
  }

  if (type === actions.INIT_ERROR) {
    return {
      ...state,
      walletSettings: null,
      initLoading: false,
    };
  }

  if (type === actions.SAVE_STARTED) {
    return {
      ...state,
      saveLoading: true,
    };
  }

  if (type === actions.SAVE_SUCCESS) {
    return {
      ...state,
      walletSettings: payload,
      saveLoading: false,
    };
  }

  if (type === actions.SAVE_ERROR) {
    return {
      ...state,
      saveLoading: false,
    };
  }

  return state;
};
