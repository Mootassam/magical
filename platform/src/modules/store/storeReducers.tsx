import actions from 'src/modules/store/storeActions';

const initialData = {
  initLoading: false,
  saveLoading: false,
  store: null,
  dashboard: null,
  dashboardLoading: false,
  updateOwnLoading: false,
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

  if (type === actions.DASHBOARD_STARTED) {
    return {
      ...state,
      dashboardLoading: true,
    };
  }

  if (type === actions.DASHBOARD_SUCCESS) {
    return {
      ...state,
      dashboard: payload,
      dashboardLoading: false,
    };
  }

  if (type === actions.DASHBOARD_ERROR) {
    return {
      ...state,
      dashboard: null,
      dashboardLoading: false,
    };
  }

  if (type === actions.UPDATE_OWN_STARTED) {
    return {
      ...state,
      updateOwnLoading: true,
    };
  }

  if (type === actions.UPDATE_OWN_SUCCESS) {
    return {
      ...state,
      store: payload,
      updateOwnLoading: false,
    };
  }

  if (type === actions.UPDATE_OWN_ERROR) {
    return {
      ...state,
      updateOwnLoading: false,
    };
  }

  return state;
};
