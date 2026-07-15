import Errors from 'src/modules/shared/error/errors';
import ShopCategoryService from 'src/modules/shop/shopCategoryService';

const prefix = 'SHOP_CATEGORY';

const shopCategoryActions = {
  FETCH_STARTED: `${prefix}_FETCH_STARTED`,
  FETCH_SUCCESS: `${prefix}_FETCH_SUCCESS`,
  FETCH_ERROR: `${prefix}_FETCH_ERROR`,

  doFetch: () => async (dispatch) => {
    try {
      dispatch({
        type: shopCategoryActions.FETCH_STARTED,
      });

      const response = await ShopCategoryService.list();

      dispatch({
        type: shopCategoryActions.FETCH_SUCCESS,
        payload: response.rows,
      });
    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: shopCategoryActions.FETCH_ERROR,
      });
    }
  },
};

export default shopCategoryActions;
