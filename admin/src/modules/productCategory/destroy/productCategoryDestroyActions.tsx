import listActions from 'src/modules/productCategory/list/productCategoryListActions';
import Errors from 'src/modules/shared/error/errors';
import { i18n } from 'src/i18n';
import Message from 'src/view/shared/message';
import ProductCategoryService from 'src/modules/productCategory/productCategoryService';

const prefix = 'PRODUCT_CATEGORY_DESTROY';

const productCategoryDestroyActions = {
  DESTROY_STARTED: `${prefix}_DESTROY_STARTED`,
  DESTROY_SUCCESS: `${prefix}_DESTROY_SUCCESS`,
  DESTROY_ERROR: `${prefix}_DESTROY_ERROR`,

  DESTROY_ALL_RECORDS_STARTED: `${prefix}_DESTROY_ALL_RECORDS_STARTED`,
  DESTROY_ALL_RECORDS_SUCCESS: `${prefix}_DESTROY_ALL_RECORDS_SUCCESS`,
  DESTROY_ALL_RECORDS_ERROR: `${prefix}_DESTROY_ALL_RECORDS_ERROR`,

  doDestroy: (id) => async (dispatch) => {
    try {
      dispatch({
        type: productCategoryDestroyActions.DESTROY_STARTED,
      });

      await ProductCategoryService.destroyAll([id]);

      dispatch({
        type: productCategoryDestroyActions.DESTROY_SUCCESS,
      });

      Message.success(
        i18n('entities.productCategory.destroy.success'),
      );

      dispatch(listActions.doFetchCurrentFilter());
    } catch (error) {
      Errors.handle(error);

      dispatch(listActions.doFetchCurrentFilter());

      dispatch({
        type: productCategoryDestroyActions.DESTROY_ERROR,
      });
    }
  },

  doDestroyAllRecords: () => async (dispatch) => {
    try {
      dispatch({
        type: productCategoryDestroyActions.DESTROY_ALL_RECORDS_STARTED,
      });

      await ProductCategoryService.destroyAllRecords();

      dispatch({
        type: productCategoryDestroyActions.DESTROY_ALL_RECORDS_SUCCESS,
      });

      dispatch(listActions.doFetchCurrentFilter());

      Message.success(
        i18n('entities.productCategory.destroyAllRecords.success'),
      );
    } catch (error) {
      Errors.handle(error);

      dispatch(listActions.doFetchCurrentFilter());

      dispatch({
        type: productCategoryDestroyActions.DESTROY_ALL_RECORDS_ERROR,
      });
    }
  },
};

export default productCategoryDestroyActions;
