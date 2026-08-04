import React from "react";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import authActions from "src/modules/auth/authActions";
import authSelectors from "src/modules/auth/authSelectors";

const BASE_MENU = [
  { key: "account", label: "My Account", icon: "👤", path: "/pc/mine/account" },
  { key: "balance", label: "Balance", icon: "💰", path: "/pc/mine/balance" },
  { key: "orders", label: "My Orders", icon: "📦", path: "/pc/mine/orders" },
  { key: "deposit", label: "Deposit", icon: "⬆️", path: "/pc/mine/deposit" },
  { key: "deposit-record", label: "Deposit Record", icon: "🧾", path: "/pc/mine/deposit-record" },
  { key: "withdrawal", label: "Withdrawal", icon: "⬇️", path: "/pc/mine/withdrawal" },
  { key: "withdrawal-record", label: "Withdrawal Record", icon: "📤", path: "/pc/mine/withdrawal-record" },
  { key: "payment-password", label: "Payment Password", icon: "🔒", path: "/pc/mine/payment-password" },
];

const AFTER_MERCHANT_MENU = [
  { key: "addresses", label: "Delivery Addresses", icon: "📍", path: "/pc/mine/addresses" },
  { key: "collection", label: "My Collection", icon: "❤️", path: "/pc/mine/collection" },
  { key: "browse", label: "My Browse", icon: "🕓", path: "/pc/mine/browse" },
  { key: "messages", label: "Messages", icon: "💬", path: "/pc/mine/messages" },
  { key: "settings", label: "Set Up", icon: "⚙️", path: "/pc/mine/settings" },
  { key: "support", label: "Live Chat", icon: "🎧", path: "/pc/mine/support" },
];

function MineShell(props: { active: string; children: React.ReactNode }) {
  const dispatch = useDispatch();
  const history = useHistory();
  const currentUser = useSelector(authSelectors.selectCurrentUser);
  const userLabel = useSelector(authSelectors.selectCurrentUserNameOrEmailPrefix);

  const MENU = [...BASE_MENU, ...AFTER_MERCHANT_MENU];

  const doSignout = () => {
    dispatch(authActions.doSignout());
    history.push("/pc");
  };

  return (
    <>
      <div className="pc-mine">
        <div className="pc-container pc-mine__layout">
          <aside className="pc-mine__sidebar pc-card">
            <Link to="/pc/mine" className="pc-mine__profile">
              <div className="pc-mine__avatar">
                {(userLabel || "U").slice(0, 1).toUpperCase()}
              </div>
              <div className="pc-mine__name">{userLabel || "Account"}</div>
              <div className="pc-mine__email">{currentUser?.email}</div>
            </Link>

            {currentUser?.store ? (
              <Link to="/pc/mine-seller" className="pc-mine__switch-link pc-mine__switch-link--primary">
                🏪 Go to Seller Dashboard
              </Link>
            ) : (
              <Link to="/pc/mine/apply-merchant" className="pc-mine__switch-link">
                🏪 Apply to Become a Merchant
              </Link>
            )}

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
          display: block;
          text-align: center;
          padding-bottom: 20px;
          margin-bottom: 16px;
          border-bottom: 1px solid var(--pc-divider);
          text-decoration: none;
          color: inherit;
          border-radius: var(--pc-radius-sm);
          transition: opacity 0.15s ease;
        }

        .pc-mine__profile:hover {
          opacity: 0.85;
        }

        .pc-mine__switch-link {
          display: block;
          text-align: center;
          font-size: 12.5px;
          font-weight: 700;
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

        .pc-mine__switch-link--primary {
          background: var(--pc-primary);
          border-color: var(--pc-primary);
          color: #fff;
        }

        .pc-mine__switch-link--primary:hover {
          background: var(--pc-primary-hover);
          border-color: var(--pc-primary-hover);
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
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }

        .pc-mine__menu {
          display: flex;
          flex-direction: column;
          gap: 2px;
          max-height: 56vh;
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

export default MineShell;
