import Errors from 'src/modules/shared/error/errors';
import { getHistory } from 'src/modules/store';
import StoreService from 'src/modules/store/storeService';
import Message from 'src/view/shared/message';
import { i18n } from '../../i18n';

const prefix = 'STORE';

const storeActions = {
  INIT_STARTED: `${prefix}_INIT_STARTED`,
  INIT_SUCCESS: `${prefix}_INIT_SUCCESS`,
  INIT_ERROR: `${prefix}_INIT_ERROR`,

  SUBMIT_STARTED: `${prefix}_SUBMIT_STARTED`,
  SUBMIT_SUCCESS: `${prefix}_SUBMIT_SUCCESS`,
  SUBMIT_ERROR: `${prefix}_SUBMIT_ERROR`,

  DASHBOARD_STARTED: `${prefix}_DASHBOARD_STARTED`,
  DASHBOARD_SUCCESS: `${prefix}_DASHBOARD_SUCCESS`,
  DASHBOARD_ERROR: `${prefix}_DASHBOARD_ERROR`,

  UPDATE_OWN_STARTED: `${prefix}_UPDATE_OWN_STARTED`,
  UPDATE_OWN_SUCCESS: `${prefix}_UPDATE_OWN_SUCCESS`,
  UPDATE_OWN_ERROR: `${prefix}_UPDATE_OWN_ERROR`,

  doInit: () => async (dispatch) => {
    try {
      dispatch({
        type: storeActions.INIT_STARTED,
      });

      const store = await StoreService.findByUser();

      dispatch({
        type: storeActions.INIT_SUCCESS,
        payload: store,
      });
    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: storeActions.INIT_ERROR,
      });
    }
  },

  doSubmit: (values) => async (dispatch) => {
    try {
      dispatch({
        type: storeActions.SUBMIT_STARTED,
      });

      const store = await StoreService.submit(values);

      dispatch({
        type: storeActions.SUBMIT_SUCCESS,
        payload: store,
      });

      Message.success(i18n('pages.applyMerchant.submitSuccess'));

      getHistory().push('/mine');
    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: storeActions.SUBMIT_ERROR,
      });
    }
  },

  doFetchDashboard: () => async (dispatch) => {
    try {
      dispatch({
        type: storeActions.DASHBOARD_STARTED,
      });

      const dashboard = await StoreService.getDashboard();

      dispatch({
        type: storeActions.DASHBOARD_SUCCESS,
        payload: dashboard,
      });
    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: storeActions.DASHBOARD_ERROR,
      });
    }
  },

  doUpdateOwn: (data) => async (dispatch) => {
    try {
      dispatch({
        type: storeActions.UPDATE_OWN_STARTED,
      });

      const store = await StoreService.updateOwn(data);

      dispatch({
        type: storeActions.UPDATE_OWN_SUCCESS,
        payload: store,
      });

      Message.success('Store settings saved successfully.');

      return true;
    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: storeActions.UPDATE_OWN_ERROR,
      });

      return false;
    }
  },
};

export default storeActions;
