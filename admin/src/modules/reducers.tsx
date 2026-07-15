import { connectRouter } from 'connected-react-router';
import layout from 'src/modules/layout/layoutReducers';
import auth from 'src/modules/auth/authReducers';
import tenant from 'src/modules/tenant/tenantReducers';
import user from 'src/modules/user/userReducers';
import auditLog from 'src/modules/auditLog/auditLogReducers';
import settings from 'src/modules/settings/settingsReducers';
import walletSettings from 'src/modules/walletSettings/walletSettingsReducers';
import store from 'src/modules/store/storeReducers';
import deliveryAddress from 'src/modules/deliveryAddress/deliveryAddressReducers';
import productCategory from 'src/modules/productCategory/productCategoryReducers';
import notification from 'src/modules/notification/notificationReducers';
import storeListing from 'src/modules/storeListing/storeListingReducers';
import automatOrder from 'src/modules/automatOrder/automatOrderReducers';
import orderShipment from 'src/modules/orderShipment/orderShipmentReducers';
import adminPendingCounts from 'src/modules/adminPendingCounts/adminPendingCountsReducers';
import numbers from 'src/modules/numbers/numberReducers';
import coupons from 'src/modules/coupons/couponsReducers';
import category from 'src/modules/category/categoryReducers';
import vip from 'src/modules/vip/vipReducers'
import transaction from 'src/modules/transaction/transactionReducers'
import product from 'src/modules/product/productReducers'
import record from 'src/modules/record/recordReducers'
import company from 'src/modules/company/companyReducers';
import worker from 'src/modules/worker/workerReducers';
import { combineReducers } from 'redux';
export default (history) =>
  combineReducers({
    router: connectRouter(history),
    layout,
    category,
    auth,
    coupons,
    vip,
    record,
    transaction,
    product,
    tenant,
    user,
    company,
    worker,
    auditLog,
    settings,
    walletSettings,
    store,
    deliveryAddress,
    productCategory,
    notification,
    storeListing,
    automatOrder,
    orderShipment,
    adminPendingCounts,
    numbers,

  });
