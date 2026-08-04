
import Permissions from "src/security/permissions";
const permissions = Permissions.values;

const privateRoutes = [

  {
    path: "/balance",
    loader: () => import("src/view/pages/Estore/Balance"),
  },
  {
    path: "/mine",
    loader: () => import("src/view/pages/Estore/Mine"),
    exact: true,
    withTabNav: true,
  },
  {
    path: "/mine-buyer",
    loader: () => import("src/view/pages/Estore/MineBuyer"),
  },
  {
    path: "/mine-seller",
    loader: () => import("src/view/pages/Estore/MineSeller"),
    withTabNav: true,
  },
  {
    path: "/my-account",
    loader: () => import("src/view/pages/Estore/MyAccount"),
  },
  {
    path: "/phone-number",
    loader: () => import("src/view/pages/Estore/PhoneNumber"),
  },
  {
    path: "/my-order",
    loader: () => import("src/view/pages/Estore/MyOrder"),
  },
  {
    path: "/shop-details",
    loader: () => import("src/view/pages/Estore/ShopDetails"),
  },
  {
    path: "/site-message",
    loader: () => import("src/view/pages/Estore/SiteMessage"),
  },
  {
    path: "/customer-service",
    loader: () => import("src/view/pages/Estore/CustomerService"),
  },
  {
    path: "/topup",
    loader: () => import("src/view/pages/Estore/Topup"),
  },
  {
    path: "/withdrawal",
    loader: () => import("src/view/pages/Estore/Withdrawal"),
  },
  {
    path: "/withdrawal-record",
    loader: () => import("src/view/pages/Estore/WithdrawalRecord"),
  },
  {
    path: "/deposit-record",
    loader: () => import("src/view/pages/Estore/DepositRecord"),
  },
  {
    path: "/apply-merchant",
    loader: () => import("src/view/pages/Estore/ApplyMerchant"),
  },
  {
    path: "/product-management",
    loader: () => import("src/view/pages/Estore/ProductManagement"),
  },
  {
    path: "/wholesale-management",
    loader: () => import("src/view/pages/Estore/WholesaleManagement"),
  },
  {
    path: "/orders",
    loader: () => import("src/view/pages/Estore/MyOrder"),
  },
  {
    path: "/my-collection",
    loader: () => import("src/view/pages/Estore/MyCollection"),
  },
  {
    path: "/shop-collection",
    loader: () => import("src/view/pages/Estore/ShopCollection"),
  },
  {
    path: "/my-browse",
    loader: () => import("src/view/pages/Estore/MyBrowse"),
  },
  {
    path: "/delivery-address",
    loader: () => import("src/view/pages/Estore/DeliveryAddress"),
  },
  {
    path: "/wallet-management",
    loader: () => import("src/view/pages/Estore/WalletManagement"),
  },
  {
    path: "/recharge-record",
    loader: () => import("src/view/pages/Estore/RechargeRecord"),
  },
  {
    path: "/bank-card-management",
    loader: () => import("src/view/pages/Estore/BankCardManagement"),
  },
  {
    path: "/login-password",
    loader: () => import("src/view/pages/Estore/LoginPassword"),
  },
  {
    path: "/payment-password",
    loader: () => import("src/view/pages/Estore/PaymentPassword"),
  },
  {
    path: "/set-up",
    loader: () => import("src/view/pages/Estore/SetUp"),
  },
  {
    path: "/seller/set-up",
    loader: () => import("src/view/pages/Estore/SellerSetUp"),
  },
];

const screenRoutes = [
  {
    path: "/currency",
    loader: () => import("src/view/pages/Currency/CurrecnyPage"),
    permissionRequired: permissions.categoryRead,
  },

  {
    path: "/events",
    loader: () => import("src/view/pages/Events/Events"),
    permissionRequired: permissions.categoryRead,
  },
  {
    path: "/invitation",
    loader: () => import("src/view/pages/Invitation/Invitation"),
    permissionRequired: permissions.categoryRead,
    exact: true,
  },
  {
    path: "/company",
    loader: () => import("src/view/pages/Company/Company"),
    permissionRequired: permissions.categoryRead,
    exact: true,
  },
  {
    path: "/faqs",
    loader: () => import("src/view/pages/Faqs/Faqs"),
    permissionRequired: permissions.categoryRead,
    exact: true,
  },
  {
    path: "/tc",
    loader: () => import("src/view/pages/T&C/Tc"),
    permissionRequired: permissions.categoryRead,
    exact: true,
  },
  {
    path: "/Online",
    loader: () => import("src/view/pages/Online/Online"),
    permissionRequired: permissions.categoryRead,
    exact: true,
  },


  {
    path: "/LiveChat",
    loader: () => import("src/view/pages/Online/Livechat"),
  },
  {
    path: "/Certificate",
    loader: () => import("src/view/pages/Certificate/Certificate"),
    permissionRequired: permissions.categoryRead,
    exact: true,
  },

  {
    path: "/tasks",
    loader: () => import("src/view/pages/Tasks/Tasks"),
    permissionRequired: permissions.categoryRead,
    exact: true,
  },
  {
    path: "/myprofile",
    loader: () => import("src/view/pages/Team/Team"),
    permissionRequired: permissions.categoryRead,
    exact: true,
  },
  {
    path: "/withdraw",
    loader: () => import("src/view/pages/withdraw/Withdraw"),
    permissionRequired: permissions.categoryRead,
    exact: true,
  },
  {
    path: "/security",
    loader: () => import("src/view/pages/Auth/ChangePassword"),
    permissionRequired: permissions.categoryRead,
    exact: true,
  },
  {
    path: "/transacation",
    loader: () => import("src/view/pages/Transactions/Transaction"),
    permissionRequired: permissions.categoryRead,
    exact: true,
  },
  {
    path: "/wallet",
    loader: () => import("src/view/pages/wallet/Wallet"),
    permissionRequired: permissions.categoryRead,
    exact: true,
  },


  {
    path: "/notifications",
    loader: () => import("src/view/pages/notification/Notification"),
    permissionRequired: permissions.categoryRead,
    exact: true,
  },

  {
    path: "/languages",
    loader: () => import("src/view/pages/language/Language"),
    permissionRequired: permissions.categoryRead,
    exact: true,
  },



];
const publicRoutes = [
  {
    path: "/impersonate",
    loader: () => import("src/view/pages/Auth/ImpersonatePage"),
  },

  {
    path: "/auth/signin",
    loader: () => import("src/view/pages/Estore/Login"),
  },

  {
    path: "/auth/signup",
    loader: () => import("src/view/pages/Estore/Register"),
  },
  {
    path: "/Chat",
    loader: () => import("src/view/pages/Online/Livechat"),
  },
];
const simpleRoutes = [
  {
    path: "/403",
    loader: () => import("src/view/shared/errors/Error403Page"),
  },

  {
    path: "/500",
    loader: () => import("src/view/shared/errors/Error500Page"),
  },
  {
    path: "**",
    loader: () => import("src/view/shared/errors/Error404Page"),
  },
].filter(Boolean);

const emptyPermissionsRoutes = [
  {
    path: "/auth/empty-permissions",
    loader: () => import("src/view/pages/Auth/EmptyPermissionsPage"),
  },
].filter(Boolean);

const estoreRoutes = [
  {
    path: "/",
    loader: () => import("src/view/pages/Estore/Home"),
    exact: true,
  },
  {
    path: "/cart",
    loader: () => import("src/view/pages/Estore/Cart"),
    exact: true,
  },
  {
    path: "/checkout",
    loader: () => import("src/view/pages/Estore/Checkout"),
    exact: true,
  },
  {
    path: "/classification",
    loader: () => import("src/view/pages/Estore/Classification"),
    exact: true,
  },
  {
    path: "/product/:id",
    loader: () => import("src/view/pages/Estore/ProductDetails"),
    exact: true,
  },

].filter(Boolean);

const pcRoutes = [
  {
    path: "/pc",
    loader: () => import("src/view/pages/PC/Home"),
    exact: true,
  },
  {
    path: "/pc/classification",
    loader: () => import("src/view/pages/PC/Classification"),
    exact: true,
  },
  {
    path: "/pc/product/:id",
    loader: () => import("src/view/pages/PC/ProductDetails"),
    exact: true,
  },
  {
    path: "/pc/cart",
    loader: () => import("src/view/pages/PC/Cart"),
    exact: true,
  },
  {
    path: "/pc/checkout",
    loader: () => import("src/view/pages/PC/Checkout"),
    exact: true,
  },
].filter(Boolean);

const pcPublicRoutes = [
  {
    path: "/pc/auth/signin",
    loader: () => import("src/view/pages/PC/Login"),
  },
  {
    path: "/pc/auth/signup",
    loader: () => import("src/view/pages/PC/Register"),
  },
].filter(Boolean);

const pcPrivateRoutes = [
  {
    path: "/pc/mine",
    loader: () => import("src/view/pages/PC/Mine/Home"),
    exact: true,
  },
  {
    path: "/pc/mine/account",
    loader: () => import("src/view/pages/PC/Mine/MyAccount"),
    exact: true,
  },
  {
    path: "/pc/mine/orders",
    loader: () => import("src/view/pages/PC/Mine/MyOrders"),
    exact: true,
  },
  {
    path: "/pc/mine/addresses",
    loader: () => import("src/view/pages/PC/Mine/Addresses"),
    exact: true,
  },
  {
    path: "/pc/mine/collection",
    loader: () => import("src/view/pages/PC/Mine/MyCollection"),
    exact: true,
  },
  {
    path: "/pc/mine/browse",
    loader: () => import("src/view/pages/PC/Mine/MyBrowse"),
    exact: true,
  },
  {
    path: "/pc/mine/balance",
    loader: () => import("src/view/pages/PC/Mine/Balance"),
    exact: true,
  },
  {
    path: "/pc/mine/deposit",
    loader: () => import("src/view/pages/PC/Mine/Deposit"),
    exact: true,
  },
  {
    path: "/pc/mine/deposit-record",
    loader: () => import("src/view/pages/PC/Mine/DepositRecord"),
    exact: true,
  },
  {
    path: "/pc/mine/withdrawal",
    loader: () => import("src/view/pages/PC/Mine/Withdrawal"),
    exact: true,
  },
  {
    path: "/pc/mine/withdrawal-record",
    loader: () => import("src/view/pages/PC/Mine/WithdrawalRecord"),
    exact: true,
  },
  {
    path: "/pc/mine/payment-password",
    loader: () => import("src/view/pages/PC/Mine/PaymentPassword"),
    exact: true,
  },
  {
    path: "/pc/mine/apply-merchant",
    loader: () => import("src/view/pages/PC/Mine/ApplyMerchant"),
    exact: true,
  },
  {
    path: "/pc/mine/messages",
    loader: () => import("src/view/pages/PC/Mine/Messages"),
    exact: true,
  },
  {
    path: "/pc/mine/settings",
    loader: () => import("src/view/pages/PC/Mine/Settings"),
    exact: true,
  },
  {
    path: "/pc/mine/support",
    loader: () => import("src/view/pages/PC/Mine/Support"),
    exact: true,
  },
  {
    path: "/pc/mine-seller",
    loader: () => import("src/view/pages/PC/MineSeller/Home"),
    exact: true,
  },
  {
    path: "/pc/mine-seller/shop-details",
    loader: () => import("src/view/pages/PC/MineSeller/ShopDetails"),
    exact: true,
  },
  {
    path: "/pc/mine-seller/products",
    loader: () => import("src/view/pages/PC/MineSeller/ProductManagement"),
    exact: true,
  },
  {
    path: "/pc/mine-seller/orders",
    loader: () => import("src/view/pages/PC/MineSeller/Orders"),
    exact: true,
  },
  {
    path: "/pc/mine-seller/wholesale",
    loader: () => import("src/view/pages/PC/MineSeller/WholesaleManagement"),
    exact: true,
  },
  {
    path: "/pc/mine-seller/settings",
    loader: () => import("src/view/pages/PC/MineSeller/SellerSetUp"),
    exact: true,
  },
].filter(Boolean);

export default {
  privateRoutes,
  publicRoutes,
  simpleRoutes,
  screenRoutes,
  emptyPermissionsRoutes,
  estoreRoutes,
  pcRoutes,
  pcPublicRoutes,
  pcPrivateRoutes,
};
