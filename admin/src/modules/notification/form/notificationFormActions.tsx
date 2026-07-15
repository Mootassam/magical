import Errors from 'src/modules/shared/error/errors';
import Message from 'src/view/shared/message';
import { getHistory } from 'src/modules/store';
import { i18n } from 'src/i18n';
import NotificationService from 'src/modules/notification/notificationService';

const prefix = 'NOTIFICATION_FORM';

const notificationFormActions = {
  INIT_STARTED: `${prefix}_INIT_STARTED`,
  INIT_SUCCESS: `${prefix}_INIT_SUCCESS`,
  INIT_ERROR: `${prefix}_INIT_ERROR`,

  CREATE_STARTED: `${prefix}_CREATE_STARTED`,
  CREATE_SUCCESS: `${prefix}_CREATE_SUCCESS`,
  CREATE_ERROR: `${prefix}_CREATE_ERROR`,

  doInit: (id) => async (dispatch) => {
    try {
      dispatch({
        type: notificationFormActions.INIT_STARTED,
      });

      let record = {};

      const isEdit = Boolean(id);

      if (isEdit) {
        record = await NotificationService.find(id);
      }

      dispatch({
        type: notificationFormActions.INIT_SUCCESS,
        payload: record,
      });
    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: notificationFormActions.INIT_ERROR,
      });

      getHistory().push('/notification');
    }
  },

  doCreate: (values) => async (dispatch) => {
    try {
      dispatch({
        type: notificationFormActions.CREATE_STARTED,
      });

      await NotificationService.create(values);

      dispatch({
        type: notificationFormActions.CREATE_SUCCESS,
      });

      Message.success(
        i18n('entities.notification.create.success'),
      );

      getHistory().push('/notification');
    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: notificationFormActions.CREATE_ERROR,
      });
    }
  },
};

export default notificationFormActions;
