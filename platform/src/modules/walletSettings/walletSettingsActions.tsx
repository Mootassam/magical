import Errors from 'src/modules/shared/error/errors';
import WalletSettingsService from 'src/modules/walletSettings/walletSettingsService';
import authSelectors from 'src/modules/auth/authSelectors';
import AuthCurrentTenant from 'src/modules/auth/authCurrentTenant';

const prefix = 'WALLET_SETTINGS';

const walletSettingsActions = {
  INIT_STARTED: `${prefix}_INIT_STARTED`,
  INIT_SUCCESS: `${prefix}_INIT_SUCCESS`,
  INIT_ERROR: `${prefix}_INIT_ERROR`,

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
    }
  },
};

export default walletSettingsActions;
