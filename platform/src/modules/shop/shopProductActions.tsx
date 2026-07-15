import Errors from 'src/modules/shared/error/errors';
import ShopProductService from 'src/modules/shop/shopProductService';

const prefix = 'SHOP_PRODUCT';

const shopProductActions = {
  FETCH_STARTED: `${prefix}_FETCH_STARTED`,
  FETCH_SUCCESS: `${prefix}_FETCH_SUCCESS`,
  FETCH_ERROR: `${prefix}_FETCH_ERROR`,

  FIND_STARTED: `${prefix}_FIND_STARTED`,
  FIND_SUCCESS: `${prefix}_FIND_SUCCESS`,
  FIND_ERROR: `${prefix}_FIND_ERROR`,

  doFetch: (category?, priceMin?, priceMax?) => async (dispatch) => {
    try {
      dispatch({
        type: shopProductActions.FETCH_STARTED,
      });

      const response = await ShopProductService.list(category, priceMin, priceMax);

      dispatch({
        type: shopProductActions.FETCH_SUCCESS,
        payload: response.rows,
      });
    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: shopProductActions.FETCH_ERROR,
      });
    }
  },

  doFind: (id) => async (dispatch) => {
    try {
      dispatch({
        type: shopProductActions.FIND_STARTED,
      });

      const record = await ShopProductService.find(id);

      dispatch({
        type: shopProductActions.FIND_SUCCESS,
        payload: record,
      });
    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: shopProductActions.FIND_ERROR,
      });
    }
  },
};

export default shopProductActions;
