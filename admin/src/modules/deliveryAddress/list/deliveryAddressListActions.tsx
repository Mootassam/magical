import selectors from 'src/modules/deliveryAddress/list/deliveryAddressListSelectors';
import Errors from 'src/modules/shared/error/errors';
import DeliveryAddressService from 'src/modules/deliveryAddress/deliveryAddressService';

const prefix = 'DELIVERY_ADDRESS_LIST';

const deliveryAddressListActions = {
  FETCH_STARTED: `${prefix}_FETCH_STARTED`,
  FETCH_SUCCESS: `${prefix}_FETCH_SUCCESS`,
  FETCH_ERROR: `${prefix}_FETCH_ERROR`,

  RESETED: `${prefix}_RESETED`,

  PAGINATION_CHANGED: `${prefix}_PAGINATION_CHANGED`,
  SORTER_CHANGED: `${prefix}_SORTER_CHANGED`,

  doReset: () => async (dispatch) => {
    dispatch({
      type: deliveryAddressListActions.RESETED,
    });

    dispatch(deliveryAddressListActions.doFetch());
  },

  doChangePagination:
    (pagination) => async (dispatch) => {
      dispatch({
        type: deliveryAddressListActions.PAGINATION_CHANGED,
        payload: pagination,
      });

      dispatch(
        deliveryAddressListActions.doFetchCurrentFilter(),
      );
    },

  doChangeSort: (sorter) => async (dispatch) => {
    dispatch({
      type: deliveryAddressListActions.SORTER_CHANGED,
      payload: sorter,
    });

    dispatch(deliveryAddressListActions.doFetchCurrentFilter());
  },

  doFetchCurrentFilter:
    () => async (dispatch, getState) => {
      const filter = selectors.selectFilter(getState());
      const rawFilter = selectors.selectRawFilter(
        getState(),
      );
      dispatch(
        deliveryAddressListActions.doFetch(
          filter,
          rawFilter,
          true,
        ),
      );
    },

  doFetch:
    (filter?, rawFilter?, keepPagination = false) =>
    async (dispatch, getState) => {
      try {
        dispatch({
          type: deliveryAddressListActions.FETCH_STARTED,
          payload: { filter, rawFilter, keepPagination },
        });

        const response = await DeliveryAddressService.list(
          filter,
          selectors.selectOrderBy(getState()),
          selectors.selectLimit(getState()),
          selectors.selectOffset(getState()),
        );

        dispatch({
          type: deliveryAddressListActions.FETCH_SUCCESS,
          payload: {
            rows: response.rows,
            count: response.count,
          },
        });
      } catch (error) {
        Errors.handle(error);

        dispatch({
          type: deliveryAddressListActions.FETCH_ERROR,
        });
      }
    },
};

export default deliveryAddressListActions;
