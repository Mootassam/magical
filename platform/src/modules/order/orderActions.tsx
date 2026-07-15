import Errors from 'src/modules/shared/error/errors';
import OrderService from 'src/modules/order/orderService';

const prefix = 'ORDER';

const orderActions = {
  CREATE_STARTED: `${prefix}_CREATE_STARTED`,
  CREATE_SUCCESS: `${prefix}_CREATE_SUCCESS`,
  CREATE_ERROR: `${prefix}_CREATE_ERROR`,

  FETCH_STARTED: `${prefix}_FETCH_STARTED`,
  FETCH_SUCCESS: `${prefix}_FETCH_SUCCESS`,
  FETCH_ERROR: `${prefix}_FETCH_ERROR`,

  doFetchMine: () => async (dispatch) => {
    try {
      dispatch({
        type: orderActions.FETCH_STARTED,
      });

      const rows = await OrderService.findByUser();

      dispatch({
        type: orderActions.FETCH_SUCCESS,
        payload: rows,
      });
    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: orderActions.FETCH_ERROR,
      });
    }
  },

  doCreate: (values) => async (dispatch) => {
    try {
      dispatch({
        type: orderActions.CREATE_STARTED,
      });

      const record = await OrderService.create(values);

      dispatch({
        type: orderActions.CREATE_SUCCESS,
        payload: record,
      });

      return record;
    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: orderActions.CREATE_ERROR,
      });

      return null;
    }
  },
};

export default orderActions;
