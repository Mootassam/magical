import Errors from 'src/modules/shared/error/errors';
import { getHistory } from 'src/modules/store';
import WalletSettingsService from 'src/modules/walletSettings/walletSettingsService';
import Message from 'src/view/shared/message';
import { i18n } from 'src/i18n';
import authSelectors from 'src/modules/auth/authSelectors';
import AuthCurrentTenant from 'src/modules/auth/authCurrentTenant';

const prefix = 'WALLET_SETTINGS';

const walletSettingsActions = {
  INIT_STARTED: `${prefix}_INIT_STARTED`,
  INIT_SUCCESS: `${prefix}_INIT_SUCCESS`,
  INIT_ERROR: `${prefix}_INIT_ERROR`,

  SAVE_STARTED: `${prefix}_SAVE_STARTED`,
  SAVE_SUCCESS: `${prefix}_SAVE_SUCCESS`,
  SAVE_ERROR: `${prefix}_SAVE_ERROR`,

  doInit: () => async (dispatch, getState) => {
    try {
      if (
        !authSelectors.selectSignedIn(getState()) ||
        !AuthCurrentTenant.get()
      ) {
        return;
      }

      dispatch({
        type: walletSettingsActions.INIT_STARTED,
      });

      const walletSettings = await WalletSettingsService.find();

      dispatch({
        type: walletSettingsActions.INIT_SUCCESS,
        payload: walletSettings,
      });
    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: walletSettingsActions.INIT_ERROR,
      });

      getHistory().push('/');
    }
  },

  doSave: (values) => async (dispatch, getState) => {
    try {
      dispatch({
        type: walletSettingsActions.SAVE_STARTED,
      });

      const walletSettings = await WalletSettingsService.save(values);

      dispatch({
        type: walletSettingsActions.SAVE_SUCCESS,
        payload: walletSettings,
      });

      Message.success(i18n('walletSettings.save.success'));
    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: walletSettingsActions.SAVE_ERROR,
      });
    }
  },
};

export default walletSettingsActions;
