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
};

export default storeActions;
