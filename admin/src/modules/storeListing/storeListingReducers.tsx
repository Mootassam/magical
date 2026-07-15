import stores from 'src/modules/storeListing/stores/storeListingStoresReducers';
import products from 'src/modules/storeListing/products/storeListingProductsReducers';
import { combineReducers } from 'redux';

export default combineReducers({
  stores,
  products,
});
