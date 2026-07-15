
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

export default {
  privateRoutes,
  publicRoutes,
  simpleRoutes,
  screenRoutes,
  emptyPermissionsRoutes,
  estoreRoutes,
};
