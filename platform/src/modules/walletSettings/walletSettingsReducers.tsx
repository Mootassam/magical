import actions from 'src/modules/walletSettings/walletSettingsActions';

const initialData = {
  initLoading: false,
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

  return state;
};
