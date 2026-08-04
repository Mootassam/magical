import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import authSelectors from "src/modules/auth/authSelectors";
import storeActions from "src/modules/store/storeActions";
import storeSelectors from "src/modules/store/storeSelectors";
import MineShell from "./MineShell";
import { sharedMineStyles } from "./MyAccount";

const SHOP_TILES = [
  { icon: "❤️", label: "My Collection", path: "/pc/mine/collection", bg: "#FAECE9", fg: "#B93C1A" },
  { icon: "🕓", label: "My Browse", path: "/pc/mine/browse", bg: "#E9EFFD", fg: "#2563EB" },
];

const ORDER_TILES = [
  { icon: "💳", label: "Payment Pending", bg: "#FEF5E7", fg: "#D08609" },
  { icon: "🚚", label: "In Shipping", bg: "#E9EFFD", fg: "#2563EB" },
  { icon: "📬", label: "Received", bg: "#FAECE9", fg: "#B93C1A" },
  { icon: "✅", label: "Completed", bg: "#E9F9EF", fg: "#1DA750" },
  { icon: "↩️", label: "Refund", bg: "#FCE9E9", fg: "#DC2626" },
];

function Home() {
  const dispatch = useDispatch();
  const currentUser = useSelector(authSelectors.selectCurrentUser);
  const avatar = useSelector(authSelectors.selectCurrentUserAvatar);
  const store = useSelector(storeSelectors.selectStore);

  useEffect(() => {
    if (currentUser?.store) {
      dispatch(storeActions.doInit());
    }
  }, [dispatch, currentUser?.store]);

  const storePhoto = store?.storePhoto?.[0]?.downloadUrl;

  return (
    <MineShell active="dashboard">
      {currentUser?.store && store?.frozen && (
        <div className="pc-mine__banner pc-mine__banner--frozen">
          <span className="pc-mine__banner-icon">🚫</span>
          <div className="pc-mine__banner-text">
            <div className="pc-mine__banner-title">Store Frozen</div>
            <div className="pc-mine__banner-sub">Your seller account has been temporarily frozen.</div>
          </div>
          <Link to="/pc/mine/support" className="pc-mine__banner-link">Contact Customer Service</Link>
        </div>
      )}

      {currentUser?.store && !store?.frozen && (
        <div className="pc-mine__banner">
          <span className="pc-mine__banner-icon">✅</span>
          <div className="pc-mine__banner-text">
            <div className="pc-mine__banner-title">Store Application Approved!</div>
            <div className="pc-mine__banner-sub">Your seller account is active.</div>
          </div>
          <Link to="/pc/mine-seller" className="pc-mine__banner-link">Go to Seller Dashboard</Link>
        </div>
      )}

      <div className="pc-mine__hero">
        <div className="pc-mine__hero-overlay" />
        <div className="pc-mine__hero-content">
          <Link to="/pc/mine/account" className="pc-mine__hero-shop">
            <div className="pc-mine__hero-avatar">
              <img
                src={storePhoto || avatar || "https://loremflickr.com/140/140/portrait,person/all?lock=501"}
                alt={currentUser?.fullName || "User"}
              />
            </div>
            <div>
              <div className="pc-mine__hero-name">{currentUser?.fullName || currentUser?.email}</div>
              <div className="pc-mine__hero-email">{currentUser?.email}</div>
            </div>
          </Link>

          <div className="pc-mine__hero-right">
            <div className="pc-mine__hero-balance">
              <div className="pc-mine__hero-balance-label">Account Balance</div>
              <div className="pc-mine__hero-balance-value">${currentUser?.balance?.toFixed(2) || "0.00"}</div>
            </div>
            <Link to="/pc/mine/account" className="pc-btn pc-btn-primary pc-mine__hero-btn">
              My Account
            </Link>
          </div>
        </div>
      </div>

      <div className="pc-mine__section-label">My Stuff</div>
      <div className="pc-mine__tile-row pc-mine__tile-row--2">
        {SHOP_TILES.map((tile) => (
          <Link key={tile.label} to={tile.path} className="pc-card pc-mine__tile">
            <div className="pc-mine__tile-icon" style={{ background: tile.bg, color: tile.fg }}>
              {tile.icon}
            </div>
            <div className="pc-mine__tile-label">{tile.label}</div>
          </Link>
        ))}
      </div>

      <div className="pc-mine__orders-head">
        <div className="pc-mine__section-label">My Orders</div>
        <Link to="/pc/mine/orders" className="pc-mine__link-btn">View All ›</Link>
      </div>
      <div className="pc-mine__tile-row pc-mine__tile-row--5">
        {ORDER_TILES.map((tile) => (
          <Link key={tile.label} to="/pc/mine/orders" className="pc-card pc-mine__tile">
            <div className="pc-mine__tile-icon" style={{ background: tile.bg, color: tile.fg }}>
              {tile.icon}
            </div>
            <div className="pc-mine__tile-label">{tile.label}</div>
          </Link>
        ))}
      </div>

      <div className="pc-mine__section-label">Quick Actions</div>
      <div className="pc-mine__tile-row pc-mine__tile-row--3">
        <Link to="/pc/mine/deposit" className="pc-card pc-mine__tile">
          <div className="pc-mine__tile-icon" style={{ background: "#E9F9EF", color: "#1DA750" }}>⬆️</div>
          <div className="pc-mine__tile-label">Top Up</div>
        </Link>
        <Link to="/pc/mine/withdrawal" className="pc-card pc-mine__tile">
          <div className="pc-mine__tile-icon" style={{ background: "#E9EFFD", color: "#2563EB" }}>⬇️</div>
          <div className="pc-mine__tile-label">Withdrawal</div>
        </Link>
        <Link
          to={currentUser?.store ? "/pc/mine-seller" : "/pc/mine/apply-merchant"}
          className="pc-card pc-mine__tile"
        >
          <div className="pc-mine__tile-icon" style={{ background: "#FAECE9", color: "#B93C1A" }}>🏪</div>
          <div className="pc-mine__tile-label">{currentUser?.store ? "Seller Dashboard" : "Apply Merchant"}</div>
        </Link>
      </div>

      <style>{sharedMineStyles}</style>
      <style>{hubStyles}</style>
    </MineShell>
  );
}

export const hubStyles = `
        .pc-mine__banner {
          display: flex;
          align-items: center;
          gap: 14px;
          background: linear-gradient(120deg, #22C55E, #1DA750);
          border-radius: var(--pc-radius);
          padding: 18px 22px;
          color: #fff;
          box-shadow: 0 12px 26px rgba(34,197,94,0.28);
          margin-bottom: 20px;
        }

        .pc-mine__banner--frozen {
          background: linear-gradient(120deg, #DC2626, #BB2020);
          box-shadow: 0 12px 26px rgba(220,38,38,0.28);
        }

        .pc-mine__banner-icon {
          font-size: 28px;
        }

        .pc-mine__banner-text {
          flex: 1;
        }

        .pc-mine__banner-title {
          font-size: 14.5px;
          font-weight: 800;
        }

        .pc-mine__banner-sub {
          font-size: 12.5px;
          opacity: 0.9;
          margin-top: 2px;
        }

        .pc-mine__banner-link {
          background: #fff;
          color: #1DA750;
          font-size: 12.5px;
          font-weight: 800;
          padding: 9px 16px;
          border-radius: var(--pc-radius-sm);
          text-decoration: none;
          white-space: nowrap;
        }

        .pc-mine__banner--frozen .pc-mine__banner-link {
          color: #BB2020;
        }

        .pc-mine__hero {
          position: relative;
          border-radius: var(--pc-radius);
          overflow: hidden;
          padding: 30px 32px;
          margin-bottom: 30px;
          background: linear-gradient(135deg, var(--pc-primary-dark), var(--pc-primary) 65%, #E28E71);
          box-shadow: 0 16px 34px rgba(127, 43, 21, 0.28);
        }

        .pc-mine__hero-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(120deg, rgba(127,43,21,0.5), rgba(209,69,31,0.3));
        }

        .pc-mine__hero-content {
          position: relative;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 20px;
          flex-wrap: wrap;
        }

        .pc-mine__hero-shop {
          display: flex;
          align-items: center;
          gap: 16px;
          text-decoration: none;
        }

        .pc-mine__hero-avatar {
          width: 68px;
          height: 68px;
          border-radius: 50%;
          border: 3px solid rgba(255,255,255,0.6);
          overflow: hidden;
          flex-shrink: 0;
        }

        .pc-mine__hero-avatar img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .pc-mine__hero-name {
          font-size: 19px;
          font-weight: 800;
          color: #fff;
        }

        .pc-mine__hero-email {
          font-size: 12.5px;
          color: rgba(255,255,255,0.85);
          margin-top: 3px;
        }

        .pc-mine__hero-right {
          display: flex;
          align-items: center;
          gap: 18px;
        }

        .pc-mine__hero-balance {
          text-align: right;
        }

        .pc-mine__hero-balance-label {
          font-size: 12px;
          color: rgba(255,255,255,0.85);
        }

        .pc-mine__hero-balance-value {
          font-size: 22px;
          font-weight: 800;
          color: #fff;
          margin-top: 2px;
        }

        .pc-mine__hero-btn {
          background: #fff;
          color: var(--pc-primary-dark);
          padding: 12px 22px;
        }

        .pc-mine__hero-btn:hover {
          background: rgba(255,255,255,0.9) !important;
        }

        .pc-mine__section-label {
          font-size: 13px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          color: var(--pc-text-muted);
          margin-bottom: 14px;
        }

        .pc-mine__orders-head {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-top: 30px;
        }

        .pc-mine__orders-head .pc-mine__section-label {
          margin-bottom: 0;
        }

        .pc-mine__tile-row {
          display: grid;
          gap: 16px;
          margin-bottom: 14px;
        }

        .pc-mine__tile-row--2 {
          grid-template-columns: repeat(2, minmax(0, 1fr));
        }

        .pc-mine__tile-row--3 {
          grid-template-columns: repeat(3, minmax(0, 1fr));
        }

        .pc-mine__tile-row--5 {
          grid-template-columns: repeat(5, minmax(0, 1fr));
          margin-top: 14px;
        }

        .pc-mine__tile {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 12px;
          padding: 20px 10px;
          text-align: center;
          text-decoration: none;
          transition: box-shadow 0.15s ease, transform 0.1s ease;
        }

        .pc-mine__tile:hover {
          box-shadow: 0 14px 28px var(--pc-shadow);
          transform: translateY(-2px);
        }

        .pc-mine__tile-icon {
          width: 44px;
          height: 44px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 19px;
        }

        .pc-mine__tile-label {
          font-size: 12px;
          font-weight: 700;
          color: var(--pc-text);
          line-height: 1.3;
        }

        @media (max-width: 1000px) {
          .pc-mine__tile-row--5 {
            grid-template-columns: repeat(3, minmax(0, 1fr));
          }
        }

        @media (max-width: 700px) {
          .pc-mine__tile-row--3,
          .pc-mine__tile-row--2 {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }
          .pc-mine__tile-row--5 {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }
        }
`;

export default Home;
