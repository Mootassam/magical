import selectors from 'src/modules/store/list/storeListSelectors';
import Errors from 'src/modules/shared/error/errors';
import Message from 'src/view/shared/message';
import { i18n } from 'src/i18n';
import StoreService from 'src/modules/store/storeService';

const prefix = 'STORE_LIST';

const storeListActions = {
  FETCH_STARTED: `${prefix}_FETCH_STARTED`,
  FETCH_SUCCESS: `${prefix}_FETCH_SUCCESS`,
  FETCH_ERROR: `${prefix}_FETCH_ERROR`,

  RESETED: `${prefix}_RESETED`,

  PAGINATION_CHANGED: `${prefix}_PAGINATION_CHANGED`,
  SORTER_CHANGED: `${prefix}_SORTER_CHANGED`,

  STATUS_UPDATE_STARTED: `${prefix}_STATUS_UPDATE_STARTED`,
  STATUS_UPDATE_SUCCESS: `${prefix}_STATUS_UPDATE_SUCCESS`,
  STATUS_UPDATE_ERROR: `${prefix}_STATUS_UPDATE_ERROR`,

  doReset: () => async (dispatch) => {
    dispatch({
      type: storeListActions.RESETED,
    });

    dispatch(storeListActions.doFetch());
  },

  doChangePagination:
    (pagination) => async (dispatch) => {
      dispatch({
        type: storeListActions.PAGINATION_CHANGED,
        payload: pagination,
      });

      dispatch(storeListActions.doFetchCurrentFilter());
    },

  doChangeSort: (sorter) => async (dispatch) => {
    dispatch({
      type: storeListActions.SORTER_CHANGED,
      payload: sorter,
    });

    dispatch(storeListActions.doFetchCurrentFilter());
  },

  doFetchCurrentFilter:
    () => async (dispatch, getState) => {
      const filter = selectors.selectFilter(getState());
      const rawFilter = selectors.selectRawFilter(
        getState(),
      );
      dispatch(
        storeListActions.doFetch(filter, rawFilter, true),
      );
    },

  doFetch:
    (filter?, rawFilter?, keepPagination = false) =>
    async (dispatch, getState) => {
      try {
        dispatch({
          type: storeListActions.FETCH_STARTED,
          payload: { filter, rawFilter, keepPagination },
        });

        const response = await StoreService.list(
          filter,
          selectors.selectOrderBy(getState()),
          selectors.selectLimit(getState()),
          selectors.selectOffset(getState()),
        );

        dispatch({
          type: storeListActions.FETCH_SUCCESS,
          payload: {
            rows: response.rows,
            count: response.count,
          },
        });
      } catch (error) {
        Errors.handle(error);

        dispatch({
          type: storeListActions.FETCH_ERROR,
        });
      }
    },

  doUpdateStatus: (id, status) => async (dispatch) => {
    try {
      dispatch({
        type: storeListActions.STATUS_UPDATE_STARTED,
      });

      await StoreService.updateStatus(id, status);

      dispatch({
        type: storeListActions.STATUS_UPDATE_SUCCESS,
      });

      Message.success(i18n('entities.store.update.success'));

      dispatch(storeListActions.doFetchCurrentFilter());
    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: storeListActions.STATUS_UPDATE_ERROR,
      });
    }
  },
};

export default storeListActions;
