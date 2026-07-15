import list from 'src/modules/productCategory/list/productCategoryListReducers';
import destroy from 'src/modules/productCategory/destroy/productCategoryDestroyReducers';
import { combineReducers } from 'redux';

export default combineReducers({
  list,
  destroy,
});
