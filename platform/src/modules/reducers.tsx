/* eslint-disable react-refresh/only-export-components */
import { connectRouter } from "connected-react-router";
import auth from "src/modules/auth/authReducers";
import tenant from "src/modules/tenant/tenantReducers";
import user from "src/modules/user/userReducers";
import category from "src/modules/category/categoryReducers";
import company from "src/modules/company/companyReducers";
import vip from "src/modules/vip/vipReducers"
import record from 'src/modules/record/recordReducers'
import product from 'src/modules/product/list/productListReducers'
import transaction from 'src/modules/transaction/transactionReducers'
import notification from 'src/modules/notification/notificationReducers'
import walletSettings from 'src/modules/walletSettings/walletSettingsReducers'
import store from 'src/modules/store/storeReducers'
import deliveryAddress from 'src/modules/deliveryAddress/deliveryAddressReducers'
import shopCategory from 'src/modules/shop/shopCategoryReducers'
import shopProduct from 'src/modules/shop/shopProductReducers'
import cart from 'src/modules/cart/cartReducers'
import order from 'src/modules/order/orderReducers'
import storeListing from 'src/modules/storeListing/storeListingReducers'
import automatOrder from 'src/modules/automatOrder/automatOrderReducers'
import orderShipment from 'src/modules/orderShipment/orderShipmentReducers'
import { combineReducers } from "redux";

export default (history) =>
  combineReducers({
    router: connectRouter(history),
    auth,
    category,
    company,
    vip,
    transaction,
    product,
    record,
    tenant,
    user,
     notification,
    walletSettings,
    store,
    deliveryAddress,
    shopCategory,
    shopProduct,
    cart,
    order,
    storeListing,
    automatOrder,
    orderShipment,
  });
