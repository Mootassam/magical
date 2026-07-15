import Errors from 'src/modules/shared/error/errors';
import StoreListingService from 'src/modules/storeListing/storeListingService';

const prefix = 'STORE_LISTING_STORES';

const storeListingStoresActions = {
  FETCH_STARTED: `${prefix}_FETCH_STARTED`,
  FETCH_SUCCESS: `${prefix}_FETCH_SUCCESS`,
  FETCH_ERROR: `${prefix}_FETCH_ERROR`,

  SEARCH_CHANGED: `${prefix}_SEARCH_CHANGED`,

  doSearch: (search) => async (dispatch) => {
    dispatch({
      type: storeListingStoresActions.SEARCH_CHANGED,
      payload: search,
    });

    dispatch(storeListingStoresActions.doFetch(search));
  },

  doFetch: (search) => async (dispatch) => {
    try {
      dispatch({
        type: storeListingStoresActions.FETCH_STARTED,
      });

      const rows = await StoreListingService.listStores(search);

      dispatch({
        type: storeListingStoresActions.FETCH_SUCCESS,
        payload: rows,
      });
    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: storeListingStoresActions.FETCH_ERROR,
      });
    }
  },
};

export default storeListingStoresActions;
