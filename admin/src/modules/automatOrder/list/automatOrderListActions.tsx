import selectors from 'src/modules/automatOrder/list/automatOrderListSelectors';
import Errors from 'src/modules/shared/error/errors';
import AutomatOrderService from 'src/modules/automatOrder/automatOrderService';

const prefix = 'AUTOMAT_ORDER_LIST';

const automatOrderListActions = {
  FETCH_STARTED: `${prefix}_FETCH_STARTED`,
  FETCH_SUCCESS: `${prefix}_FETCH_SUCCESS`,
  FETCH_ERROR: `${prefix}_FETCH_ERROR`,

  RESETED: `${prefix}_RESETED`,
  PAGINATION_CHANGED: `${prefix}_PAGINATION_CHANGED`,
  SORTER_CHANGED: `${prefix}_SORTER_CHANGED`,

  doReset: () => async (dispatch) => {
    dispatch({
      type: automatOrderListActions.RESETED,
    });

    dispatch(automatOrderListActions.doFetch());
  },

  doChangePagination:
    (pagination) => async (dispatch, getState) => {
      dispatch({
        type: automatOrderListActions.PAGINATION_CHANGED,
        payload: pagination,
      });

      dispatch(automatOrderListActions.doFetchCurrentFilter());
    },

  doChangeSort: (sorter) => async (dispatch, getState) => {
    dispatch({
      type: automatOrderListActions.SORTER_CHANGED,
      payload: sorter,
    });

    dispatch(automatOrderListActions.doFetchCurrentFilter());
  },

  doFetchCurrentFilter:
    () => async (dispatch, getState) => {
      const filter = selectors.selectFilter(getState());
      dispatch(automatOrderListActions.doFetch(filter, true));
    },

  doFetch:
    (filter?, keepPagination = false) =>
    async (dispatch, getState) => {
      try {
        dispatch({
          type: automatOrderListActions.FETCH_STARTED,
          payload: { filter, keepPagination },
        });

        const response = await AutomatOrderService.list(
          filter,
          selectors.selectOrderBy(getState()),
          selectors.selectLimit(getState()),
          selectors.selectOffset(getState()),
        );

        dispatch({
          type: automatOrderListActions.FETCH_SUCCESS,
          payload: {
            rows: response.rows,
            count: response.count,
          },
        });
      } catch (error) {
        Errors.handle(error);

        dispatch({
          type: automatOrderListActions.FETCH_ERROR,
        });
      }
    },
};

export default automatOrderListActions;
