import Errors from 'src/modules/shared/error/errors';
import OrderShipmentService from 'src/modules/orderShipment/orderShipmentService';

const prefix = 'ORDER_SHIPMENT';

const orderShipmentActions = {
  FETCH_STARTED: `${prefix}_FETCH_STARTED`,
  FETCH_SUCCESS: `${prefix}_FETCH_SUCCESS`,
  FETCH_ERROR: `${prefix}_FETCH_ERROR`,

  CREATE_STARTED: `${prefix}_CREATE_STARTED`,
  CREATE_SUCCESS: `${prefix}_CREATE_SUCCESS`,
  CREATE_ERROR: `${prefix}_CREATE_ERROR`,

  doFetchMine: () => async (dispatch) => {
    try {
      dispatch({
        type: orderShipmentActions.FETCH_STARTED,
      });

      const rows = await OrderShipmentService.findByUserStore();

      dispatch({
        type: orderShipmentActions.FETCH_SUCCESS,
        payload: rows,
      });
    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: orderShipmentActions.FETCH_ERROR,
      });
    }
  },

  doShip: (automatOrderId) => async (dispatch) => {
    try {
      dispatch({
        type: orderShipmentActions.CREATE_STARTED,
        payload: automatOrderId,
      });

      const record = await OrderShipmentService.create(automatOrderId);

      dispatch({
        type: orderShipmentActions.CREATE_SUCCESS,
        payload: record,
      });

      dispatch(orderShipmentActions.doFetchMine());

      return record;
    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: orderShipmentActions.CREATE_ERROR,
        payload: automatOrderId,
      });

      return null;
    }
  },
};

export default orderShipmentActions;
