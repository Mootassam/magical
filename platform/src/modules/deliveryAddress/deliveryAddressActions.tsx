import Errors from 'src/modules/shared/error/errors';
import DeliveryAddressService from 'src/modules/deliveryAddress/deliveryAddressService';
import Message from 'src/view/shared/message';
import { i18n } from '../../i18n';

const prefix = 'DELIVERY_ADDRESS';

const deliveryAddressActions = {
  FETCH_STARTED: `${prefix}_FETCH_STARTED`,
  FETCH_SUCCESS: `${prefix}_FETCH_SUCCESS`,
  FETCH_ERROR: `${prefix}_FETCH_ERROR`,

  CREATE_STARTED: `${prefix}_CREATE_STARTED`,
  CREATE_SUCCESS: `${prefix}_CREATE_SUCCESS`,
  CREATE_ERROR: `${prefix}_CREATE_ERROR`,

  UPDATE_STARTED: `${prefix}_UPDATE_STARTED`,
  UPDATE_SUCCESS: `${prefix}_UPDATE_SUCCESS`,
  UPDATE_ERROR: `${prefix}_UPDATE_ERROR`,

  DESTROY_STARTED: `${prefix}_DESTROY_STARTED`,
  DESTROY_SUCCESS: `${prefix}_DESTROY_SUCCESS`,
  DESTROY_ERROR: `${prefix}_DESTROY_ERROR`,

  doFetch: () => async (dispatch) => {
    try {
      dispatch({
        type: deliveryAddressActions.FETCH_STARTED,
      });

      const rows = await DeliveryAddressService.findByUser();

      dispatch({
        type: deliveryAddressActions.FETCH_SUCCESS,
        payload: rows,
      });
    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: deliveryAddressActions.FETCH_ERROR,
      });
    }
  },

  doCreate: (values) => async (dispatch) => {
    try {
      dispatch({
        type: deliveryAddressActions.CREATE_STARTED,
      });

      await DeliveryAddressService.create(values);

      dispatch({
        type: deliveryAddressActions.CREATE_SUCCESS,
      });

      Message.success(i18n('pages.deliveryAddress.createSuccess'));

      dispatch(deliveryAddressActions.doFetch());
    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: deliveryAddressActions.CREATE_ERROR,
      });
    }
  },

  doUpdate: (id, values) => async (dispatch) => {
    try {
      dispatch({
        type: deliveryAddressActions.UPDATE_STARTED,
      });

      await DeliveryAddressService.update(id, values);

      dispatch({
        type: deliveryAddressActions.UPDATE_SUCCESS,
      });

      Message.success(i18n('pages.deliveryAddress.updateSuccess'));

      dispatch(deliveryAddressActions.doFetch());
    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: deliveryAddressActions.UPDATE_ERROR,
      });
    }
  },

  doDestroy: (id) => async (dispatch) => {
    try {
      dispatch({
        type: deliveryAddressActions.DESTROY_STARTED,
      });

      await DeliveryAddressService.destroy(id);

      dispatch({
        type: deliveryAddressActions.DESTROY_SUCCESS,
      });

      Message.success(i18n('pages.deliveryAddress.destroySuccess'));

      dispatch(deliveryAddressActions.doFetch());
    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: deliveryAddressActions.DESTROY_ERROR,
      });
    }
  },
};

export default deliveryAddressActions;
