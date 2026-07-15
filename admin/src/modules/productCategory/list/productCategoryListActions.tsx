import selectors from 'src/modules/productCategory/list/productCategoryListSelectors';
import Errors from 'src/modules/shared/error/errors';
import ProductCategoryService from 'src/modules/productCategory/productCategoryService';

const prefix = 'PRODUCT_CATEGORY_LIST';

const productCategoryListActions = {
  FETCH_STARTED: `${prefix}_FETCH_STARTED`,
  FETCH_SUCCESS: `${prefix}_FETCH_SUCCESS`,
  FETCH_ERROR: `${prefix}_FETCH_ERROR`,

  RESETED: `${prefix}_RESETED`,

  PAGINATION_CHANGED: `${prefix}_PAGINATION_CHANGED`,
  SORTER_CHANGED: `${prefix}_SORTER_CHANGED`,

  doReset: () => async (dispatch) => {
    dispatch({
      type: productCategoryListActions.RESETED,
    });

    dispatch(productCategoryListActions.doFetch());
  },

  doChangePagination:
    (pagination) => async (dispatch) => {
      dispatch({
        type: productCategoryListActions.PAGINATION_CHANGED,
        payload: pagination,
      });

      dispatch(
        productCategoryListActions.doFetchCurrentFilter(),
      );
    },

  doChangeSort: (sorter) => async (dispatch) => {
    dispatch({
      type: productCategoryListActions.SORTER_CHANGED,
      payload: sorter,
    });

    dispatch(productCategoryListActions.doFetchCurrentFilter());
  },

  doFetchCurrentFilter:
    () => async (dispatch, getState) => {
      const filter = selectors.selectFilter(getState());
      const rawFilter = selectors.selectRawFilter(
        getState(),
      );
      dispatch(
        productCategoryListActions.doFetch(
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
          type: productCategoryListActions.FETCH_STARTED,
          payload: { filter, rawFilter, keepPagination },
        });

        const response = await ProductCategoryService.list(
          filter,
          selectors.selectOrderBy(getState()),
          selectors.selectLimit(getState()),
          selectors.selectOffset(getState()),
        );

        dispatch({
          type: productCategoryListActions.FETCH_SUCCESS,
          payload: {
            rows: response.rows,
            count: response.count,
          },
        });
      } catch (error) {
        Errors.handle(error);

        dispatch({
          type: productCategoryListActions.FETCH_ERROR,
        });
      }
    },
};

export default productCategoryListActions;
