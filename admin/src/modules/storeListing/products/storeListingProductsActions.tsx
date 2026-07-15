import selectors from 'src/modules/storeListing/products/storeListingProductsSelectors';
import Errors from 'src/modules/shared/error/errors';
import StoreListingService from 'src/modules/storeListing/storeListingService';

const prefix = 'STORE_LISTING_PRODUCTS';

const storeListingProductsActions = {
  FETCH_STARTED: `${prefix}_FETCH_STARTED`,
  FETCH_SUCCESS: `${prefix}_FETCH_SUCCESS`,
  FETCH_ERROR: `${prefix}_FETCH_ERROR`,

  RESETED: `${prefix}_RESETED`,
  PAGINATION_CHANGED: `${prefix}_PAGINATION_CHANGED`,

  doReset: () => (dispatch) => {
    dispatch({
      type: storeListingProductsActions.RESETED,
    });
  },

  doChangePagination:
    (storeId, pagination) => async (dispatch) => {
      dispatch({
        type: storeListingProductsActions.PAGINATION_CHANGED,
        payload: pagination,
      });

      dispatch(storeListingProductsActions.doFetch(storeId, true));
    },

  doFetch:
    (storeId, keepPagination = false) =>
    async (dispatch, getState) => {
      try {
        dispatch({
          type: storeListingProductsActions.FETCH_STARTED,
          payload: { keepPagination },
        });

        const response = await StoreListingService.listByStore(
          storeId,
          null,
          selectors.selectLimit(getState()),
          selectors.selectOffset(getState()),
        );

        dispatch({
          type: storeListingProductsActions.FETCH_SUCCESS,
          payload: {
            rows: response.rows,
            count: response.count,
          },
        });
      } catch (error) {
        Errors.handle(error);

        dispatch({
          type: storeListingProductsActions.FETCH_ERROR,
        });
      }
    },
};

export default storeListingProductsActions;
