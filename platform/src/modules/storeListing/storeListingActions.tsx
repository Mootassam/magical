import Errors from 'src/modules/shared/error/errors';
import StoreListingService from 'src/modules/storeListing/storeListingService';

const prefix = 'STORE_LISTING';

const storeListingActions = {
  FETCH_STARTED: `${prefix}_FETCH_STARTED`,
  FETCH_SUCCESS: `${prefix}_FETCH_SUCCESS`,
  FETCH_ERROR: `${prefix}_FETCH_ERROR`,

  CREATE_STARTED: `${prefix}_CREATE_STARTED`,
  CREATE_SUCCESS: `${prefix}_CREATE_SUCCESS`,
  CREATE_ERROR: `${prefix}_CREATE_ERROR`,

  doFetchMine: () => async (dispatch) => {
    try {
      dispatch({
        type: storeListingActions.FETCH_STARTED,
      });

      const rows = await StoreListingService.findByUser();

      dispatch({
        type: storeListingActions.FETCH_SUCCESS,
        payload: rows,
      });
    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: storeListingActions.FETCH_ERROR,
      });
    }
  },

  doCreate: (product) => async (dispatch) => {
    try {
      dispatch({
        type: storeListingActions.CREATE_STARTED,
      });

      const record = await StoreListingService.create({ product });

      dispatch({
        type: storeListingActions.CREATE_SUCCESS,
        payload: record,
      });

      return record;
    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: storeListingActions.CREATE_ERROR,
      });

      return null;
    }
  },
};

export default storeListingActions;
