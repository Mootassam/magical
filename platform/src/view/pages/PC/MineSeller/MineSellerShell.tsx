import React from "react";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import authActions from "src/modules/auth/authActions";
import storeSelectors from "src/modules/store/storeSelectors";

const MENU = [
  { key: "dashboard", label: "Dashboard", icon: "🏠", path: "/pc/mine-seller" },
  { key: "wholesale", label: "Wholesale Management", icon: "🏷️", path: "/pc/mine-seller/wholesale" },
  { key: "shop-details", label: "Shop Details", icon: "🏬", path: "/pc/mine-seller/shop-details" },
  { key: "products", label: "Product Management", icon: "📦", path: "/pc/mine-seller/products" },
  { key: "orders", label: "Orders", icon: "🧾", path: "/pc/mine-seller/orders" },
  { key: "billing", label: "Billing Records", icon: "💳", path: "/pc/mine/withdrawal-record" },
  { key: "addresses", label: "Delivery Addresses", icon: "📍", path: "/pc/mine/addresses" },
  { key: "support", label: "Service Center", icon: "🎧", path: "/pc/mine/support" },
  { key: "login-password", label: "Login Password", icon: "🔒", path: "/pc/mine/account" },
  { key: "payment-password", label: "Payment Password", icon: "🔑", path: "/pc/mine/payment-password" },
  { key: "settings", label: "Set Up", icon: "⚙️", path: "/pc/mine-seller/settings" },
];

function MineSellerShell(props: { active: string; children: React.ReactNode }) {
  const dispatch = useDispatch();
  const history = useHistory();
  const store = useSelector(storeSelectors.selectStore);

  const doSignout = () => {
    dispatch(authActions.doSignout());
    history.push("/pc");
  };

  const storePhoto = store?.storePhoto?.[0]?.downloadUrl;
  const initial = (store?.storeName || "S").slice(0, 1).toUpperCase();

  return (
    <>
      <div className="pc-mine">
        <div className="pc-container pc-mine__layout">
          <aside className="pc-mine__sidebar pc-card">
            <div className="pc-mine__profile">
              <div className="pc-mine__avatar pc-mine__avatar--shop">
                {storePhoto ? <img src={storePhoto} alt={store?.storeName} /> : initial}
              </div>
              <div className="pc-mine__name">{store?.storeName || "My Store"}</div>
              <div className="pc-mine__email">Seller</div>
            </div>

            <Link to="/pc/mine" className="pc-mine__switch-link">
              🔄 Switch to buyer account
            </Link>

            <nav className="pc-mine__menu pc-scroll-x">
              {MENU.map((item) => (
                <Link
                  key={item.key}
                  to={item.path}
                  className={`pc-mine__menu-item${item.key === props.active ? " active" : ""}`}
                >
                  <span className="pc-mine__menu-icon">{item.icon}</span>
                  {item.label}
                </Link>
              ))}
            </nav>

            <button type="button" className="pc-mine__logout" onClick={doSignout}>
              <span>↩</span> Log out
            </button>
          </aside>

          <div className="pc-mine__content">{props.children}</div>
        </div>
      </div>

      <style>{`
        .pc-mine {
          padding: 32px 0 64px;
        }

        .pc-mine__layout {
          display: grid;
          grid-template-columns: 260px 1fr;
          gap: 24px;
          align-items: start;
        }

        .pc-mine__sidebar {
          padding: 28px 20px;
          position: sticky;
          top: 96px;
        }

        .pc-mine__profile {
          text-align: center;
          padding-bottom: 16px;
          margin-bottom: 12px;
          border-bottom: 1px solid var(--pc-divider);
        }

        .pc-mine__avatar {
          width: 64px;
          height: 64px;
          border-radius: 50%;
          background: linear-gradient(150deg, var(--pc-primary), var(--pc-primary-dark));
          color: #fff;
          font-size: 24px;
          font-weight: 800;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 12px;
          overflow: hidden;
        }

        .pc-mine__avatar--shop img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .pc-mine__name {
          font-size: 15px;
          font-weight: 800;
          color: var(--pc-text);
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }

        .pc-mine__email {
          font-size: 12.5px;
          color: var(--pc-text-muted);
          margin-top: 2px;
        }

        .pc-mine__switch-link {
          display: block;
          text-align: center;
          font-size: 12px;
          font-weight: 600;
          color: var(--pc-text-secondary);
          text-decoration: none;
          padding: 10px;
          border: 1px solid var(--pc-border);
          border-radius: var(--pc-radius-sm);
          margin-bottom: 16px;
        }

        .pc-mine__switch-link:hover {
          background: var(--pc-secondary);
        }

        .pc-mine__menu {
          display: flex;
          flex-direction: column;
          gap: 2px;
          max-height: 50vh;
          overflow-y: auto;
        }

        .pc-mine__menu-item {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 11px 12px;
          border-radius: var(--pc-radius-sm);
          font-size: 13.5px;
          font-weight: 600;
          color: var(--pc-text-secondary);
          text-decoration: none;
        }

        .pc-mine__menu-item:hover {
          background: var(--pc-secondary);
        }

        .pc-mine__menu-item.active {
          background: #FAECE9;
          color: var(--pc-primary-dark);
        }

        .pc-mine__menu-icon {
          font-size: 16px;
          width: 20px;
          text-align: center;
        }

        .pc-mine__logout {
          width: 100%;
          margin-top: 18px;
          padding-top: 16px;
          border: none;
          border-top: 1px solid var(--pc-divider);
          background: none;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          font-size: 13.5px;
          font-weight: 700;
          color: var(--pc-danger);
          cursor: pointer;
        }

        .pc-mine__logout:hover {
          opacity: 0.8;
        }

        .pc-mine__content {
          min-width: 0;
        }

        @media (max-width: 860px) {
          .pc-mine__layout {
            grid-template-columns: 1fr;
          }
          .pc-mine__sidebar {
            position: static;
          }
        }
      `}</style>
    </>
  );
}

export default MineSellerShell;
