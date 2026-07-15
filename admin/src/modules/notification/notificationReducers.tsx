import list from 'src/modules/notification/list/notificationListReducers';
import form from 'src/modules/notification/form/notificationFormReducers';
import destroy from 'src/modules/notification/destroy/notificationDestroyReducers';
import { combineReducers } from 'redux';

export default combineReducers({
  list,
  form,
  destroy,
});
