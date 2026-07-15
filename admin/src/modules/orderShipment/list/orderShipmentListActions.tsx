import selectors from 'src/modules/orderShipment/list/orderShipmentListSelectors';
import Errors from 'src/modules/shared/error/errors';
import Message from 'src/view/shared/message';
import { i18n } from 'src/i18n';
import OrderShipmentService from 'src/modules/orderShipment/orderShipmentService';

const prefix = 'ORDER_SHIPMENT_LIST';

const orderShipmentListActions = {
  FETCH_STARTED: `${prefix}_FETCH_STARTED`,
  FETCH_SUCCESS: `${prefix}_FETCH_SUCCESS`,
  FETCH_ERROR: `${prefix}_FETCH_ERROR`,

  RESETED: `${prefix}_RESETED`,
  PAGINATION_CHANGED: `${prefix}_PAGINATION_CHANGED`,

  STATUS_UPDATE_STARTED: `${prefix}_STATUS_UPDATE_STARTED`,
  STATUS_UPDATE_SUCCESS: `${prefix}_STATUS_UPDATE_SUCCESS`,
  STATUS_UPDATE_ERROR: `${prefix}_STATUS_UPDATE_ERROR`,

  doReset: () => async (dispatch) => {
    dispatch({
      type: orderShipmentListActions.RESETED,
    });

    dispatch(orderShipmentListActions.doFetch());
  },

  doChangePagination:
    (pagination) => async (dispatch, getState) => {
      dispatch({
        type: orderShipmentListActions.PAGINATION_CHANGED,
        payload: pagination,
      });

      dispatch(orderShipmentListActions.doFetch(true));
    },

  doFetch:
    (keepPagination = false) =>
    async (dispatch, getState) => {
      try {
        dispatch({
          type: orderShipmentListActions.FETCH_STARTED,
          payload: { keepPagination },
        });

        const response = await OrderShipmentService.list(
          null,
          null,
          selectors.selectLimit(getState()),
          selectors.selectOffset(getState()),
        );

        dispatch({
          type: orderShipmentListActions.FETCH_SUCCESS,
          payload: {
            rows: response.rows,
            count: response.count,
          },
        });
      } catch (error) {
        Errors.handle(error);

        dispatch({
          type: orderShipmentListActions.FETCH_ERROR,
        });
      }
    },

  doComplete: (id) => async (dispatch) => {
    try {
      dispatch({
        type: orderShipmentListActions.STATUS_UPDATE_STARTED,
        payload: id,
      });

      await OrderShipmentService.complete(id);

      dispatch({
        type: orderShipmentListActions.STATUS_UPDATE_SUCCESS,
      });

      Message.success(i18n('entities.orderShipment.complete.success'));

      dispatch(orderShipmentListActions.doFetch(true));
    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: orderShipmentListActions.STATUS_UPDATE_ERROR,
      });
    }
  },

  doRefund: (id) => async (dispatch) => {
    try {
      dispatch({
        type: orderShipmentListActions.STATUS_UPDATE_STARTED,
        payload: id,
      });

      await OrderShipmentService.refund(id);

      dispatch({
        type: orderShipmentListActions.STATUS_UPDATE_SUCCESS,
      });

      Message.success(i18n('entities.orderShipment.refund.success'));

      dispatch(orderShipmentListActions.doFetch(true));
    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: orderShipmentListActions.STATUS_UPDATE_ERROR,
      });
    }
  },
};

export default orderShipmentListActions;
