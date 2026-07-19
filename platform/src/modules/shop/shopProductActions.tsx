import Errors from 'src/modules/shared/error/errors';
import ShopProductService from 'src/modules/shop/shopProductService';

const prefix = 'SHOP_PRODUCT';

// Products are paginated in pages of this size, both for the first load and
// every subsequent "load more" (infinite scroll) fetch.
const PAGE_SIZE = 10;

const shopProductActions = {
  PAGE_SIZE,

  FETCH_STARTED: `${prefix}_FETCH_STARTED`,
  FETCH_SUCCESS: `${prefix}_FETCH_SUCCESS`,
  FETCH_ERROR: `${prefix}_FETCH_ERROR`,

  FETCH_MORE_STARTED: `${prefix}_FETCH_MORE_STARTED`,
  FETCH_MORE_SUCCESS: `${prefix}_FETCH_MORE_SUCCESS`,
  FETCH_MORE_ERROR: `${prefix}_FETCH_MORE_ERROR`,

  FIND_STARTED: `${prefix}_FIND_STARTED`,
  FIND_SUCCESS: `${prefix}_FIND_SUCCESS`,
  FIND_ERROR: `${prefix}_FIND_ERROR`,

  // Fetches the first page for a given category/price/search filter,
  // replacing whatever product list is currently loaded. Pass usePublic to
  // hit the public browse endpoint (no tenant, no auth) instead of the
  // tenant-scoped one - needed for storefront pages reachable by anonymous
  // shoppers, who have no tenant saved in local storage.
  doFetch: (category?, priceMin?, priceMax?, search?, usePublic?: boolean) => async (dispatch) => {
    try {
      dispatch({
        type: shopProductActions.FETCH_STARTED,
      });

      const response = usePublic
        ? await ShopProductService.listPublic(
            category,
            priceMin,
            priceMax,
            search,
            PAGE_SIZE,
            0,
          )
        : await ShopProductService.list(
            category,
            priceMin,
            priceMax,
            search,
            PAGE_SIZE,
            0,
          );

      dispatch({
        type: shopProductActions.FETCH_SUCCESS,
        payload: {
          rows: response.rows,
          count: response.count,
          filters: { category, priceMin, priceMax, search, usePublic },
        },
      });
    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: shopProductActions.FETCH_ERROR,
      });
    }
  },

  // Fetches the next page for the filters used by the last doFetch call and
  // appends it to what's already loaded (infinite scroll).
  doFetchMore: () => async (dispatch, getState) => {
    const state = getState().shopProduct;

    if (state.loading || state.loadingMore || !state.hasMore) {
      return;
    }

    try {
      dispatch({
        type: shopProductActions.FETCH_MORE_STARTED,
      });

      const { category, priceMin, priceMax, search, usePublic } = state.filters;

      const response = usePublic
        ? await ShopProductService.listPublic(
            category,
            priceMin,
            priceMax,
            search,
            PAGE_SIZE,
            state.rows.length,
          )
        : await ShopProductService.list(
            category,
            priceMin,
            priceMax,
            search,
            PAGE_SIZE,
            state.rows.length,
          );

      dispatch({
        type: shopProductActions.FETCH_MORE_SUCCESS,
        payload: {
          rows: response.rows,
          count: response.count,
        },
      });
    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: shopProductActions.FETCH_MORE_ERROR,
      });
    }
  },

  doFind: (id, usePublic?: boolean) => async (dispatch) => {
    try {
      dispatch({
        type: shopProductActions.FIND_STARTED,
      });

      const record = usePublic
        ? await ShopProductService.findPublic(id)
        : await ShopProductService.find(id);

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
