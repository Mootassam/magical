import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import authSelectors from "src/modules/auth/authSelectors";
import storeActions from "src/modules/store/storeActions";
import storeSelectors from "src/modules/store/storeSelectors";
import MineSellerShell from "./MineSellerShell";
import { sharedMineStyles } from "src/view/pages/PC/Mine/MyAccount";
import { i18n } from "../../../../i18n";

function Home() {
  const dispatch = useDispatch();
  const currentUser = useSelector(authSelectors.selectCurrentUser);
  const store = useSelector(storeSelectors.selectStore);
  const initLoading = useSelector(storeSelectors.selectInitLoading);
  const dashboard = useSelector(storeSelectors.selectDashboard);

  const ORDER_TILES = [
    { icon: "📦", label: i18n("estore.pc.sellerHub.waitingForDelivery"), tab: 0, bg: "#FEF5E7", fg: "#D08609" },
    { icon: "🚚", label: i18n("estore.pc.sellerHub.waitingForReceipt"), tab: 1, bg: "#E9EFFD", fg: "#2563EB" },
    { icon: "✅", label: i18n("estore.pc.sellerHub.completed"), tab: 2, bg: "#E9F9EF", fg: "#1DA750" },
    { icon: "↩️", label: i18n("estore.pc.sellerHub.refundAfterSales"), tab: 3, bg: "#FAECE9", fg: "#B93C1A" },
  ];

  useEffect(() => {
    dispatch(storeActions.doInit());
    dispatch(storeActions.doFetchDashboard());
  }, [dispatch]);

  const storePhoto = store?.storePhoto?.[0]?.downloadUrl;
  const storeBanner = store?.storeBanner?.[0]?.downloadUrl;

  if (initLoading || !store) {
    return (
      <MineSellerShell active="dashboard">
        <div className="pc-mine__hint">{i18n("estore.pc.sellerHub.loadingShop")}</div>
        <style>{sharedMineStyles}</style>
      </MineSellerShell>
    );
  }

  if (store.frozen) {
    return (
      <MineSellerShell active="dashboard">
        <div className="pc-card pc-mine__frozen-panel">
          <div className="pc-mine__frozen-icon">🚫</div>
          <div className="pc-mine__frozen-title">{i18n("estore.pc.sellerHub.storeFrozen")}</div>
          <p className="pc-mine__frozen-text">
            {i18n("estore.pc.sellerHub.frozenText")}
          </p>
          <Link to="/pc/mine/support" className="pc-btn pc-btn-primary">{i18n("estore.pc.sellerHub.contactSupport")}</Link>
          <Link to="/pc/mine" className="pc-mine__frozen-back">{i18n("estore.pc.sellerHub.backToBuyer")}</Link>
        </div>
        <style>{sharedMineStyles}</style>
        <style>{`
          .pc-mine__frozen-panel {
            max-width: 460px;
            padding: 40px 32px;
            text-align: center;
          }
          .pc-mine__frozen-icon { font-size: 40px; margin-bottom: 12px; }
          .pc-mine__frozen-title { font-size: 18px; font-weight: 800; color: var(--pc-text); margin-bottom: 10px; }
          .pc-mine__frozen-text { font-size: 13px; color: var(--pc-text-secondary); line-height: 1.6; margin-bottom: 22px; }
          .pc-mine__frozen-panel .pc-btn { width: 100%; padding: 13px; margin-bottom: 12px; }
          .pc-mine__frozen-back { display: block; font-size: 12.5px; color: var(--pc-text-muted); text-decoration: none; }
        `}</style>
      </MineSellerShell>
    );
  }

  return (
    <MineSellerShell active="dashboard">
      <div
        className="pc-mine__hero"
        style={storeBanner ? { backgroundImage: `url(${storeBanner})` } : undefined}
      >
        <div className="pc-mine__hero-overlay" />
        <div className="pc-mine__hero-content">
          <Link to="/pc/mine-seller/shop-details" className="pc-mine__hero-shop">
            <div className="pc-mine__hero-avatar">
              {storePhoto ? <img src={storePhoto} alt={store?.storeName} /> : <span>🏪</span>}
            </div>
            <div>
              <div className="pc-mine__hero-name">{store?.storeName || i18n("estore.pc.mineSeller.myStore")}</div>
              <div className="pc-mine__hero-email">{currentUser?.email}</div>
            </div>
          </Link>

          <div className="pc-mine__hero-right">
            <div className="pc-mine__hero-balance">
              <div className="pc-mine__hero-balance-label">{i18n("estore.pc.sellerHub.accountBalance")}</div>
              <div className="pc-mine__hero-balance-value">${currentUser?.balance?.toFixed(2) || "0.00"}</div>
            </div>
            <Link to="/pc/mine-seller/shop-details" className="pc-btn pc-btn-primary pc-mine__hero-btn">
              {i18n("estore.pc.sellerHub.viewShop")}
            </Link>
          </div>
        </div>
      </div>

      <div className="pc-mine__section-label">{i18n("estore.pc.sellerHub.orderFulfillment")}</div>
      <div className="pc-mine__order-tiles">
        {ORDER_TILES.map((tile) => (
          <Link
            key={tile.label}
            to={{ pathname: "/pc/mine-seller/orders", state: { tab: tile.tab } }}
            className="pc-card pc-mine__order-tile"
          >
            <div className="pc-mine__order-tile-icon" style={{ background: tile.bg, color: tile.fg }}>
              {tile.icon}
            </div>
            <div className="pc-mine__order-tile-label">{tile.label}</div>
          </Link>
        ))}
      </div>

      <div className="pc-mine__section-label">{i18n("estore.pc.sellerHub.quickActions")}</div>
      <div className="pc-mine__quick-row">
        <Link to="/pc/mine/deposit" className="pc-card pc-mine__quick-btn">
          <div className="pc-mine__quick-btn-icon">⬆️</div>
          <div>{i18n("estore.pc.sellerHub.topUp")}</div>
        </Link>
        <Link to="/pc/mine/withdrawal" className="pc-card pc-mine__quick-btn">
          <div className="pc-mine__quick-btn-icon">⬇️</div>
          <div>{i18n("estore.pc.sellerHub.withdrawal")}</div>
        </Link>
        <Link to="/pc/mine-seller/wholesale" className="pc-card pc-mine__quick-btn">
          <div className="pc-mine__quick-btn-icon">🏷️</div>
          <div>{i18n("estore.pc.sellerHub.wholesaleCatalog")}</div>
        </Link>
        <Link to="/pc/mine-seller/products" className="pc-card pc-mine__quick-btn">
          <div className="pc-mine__quick-btn-icon">📦</div>
          <div>{i18n("estore.pc.sellerHub.manageProducts")}</div>
        </Link>
      </div>

      <style>{sharedMineStyles}</style>
      <style>{`
        .pc-mine__hero {
          position: relative;
          border-radius: var(--pc-radius);
          overflow: hidden;
          padding: 30px 32px;
          margin-bottom: 30px;
          background: linear-gradient(135deg, var(--pc-primary-dark), var(--pc-primary) 65%, #E28E71);
          background-size: cover;
          background-position: center;
          box-shadow: 0 16px 34px rgba(127, 43, 21, 0.28);
        }

        .pc-mine__hero-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(120deg, rgba(127,43,21,0.78), rgba(209,69,31,0.6));
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
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(255,255,255,0.15);
          font-size: 24px;
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

        .pc-mine__order-tiles {
          display: grid;
          grid-template-columns: repeat(4, minmax(0, 1fr));
          gap: 16px;
          margin-bottom: 30px;
        }

        .pc-mine__order-tile {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 12px;
          padding: 22px 12px;
          text-align: center;
          text-decoration: none;
          transition: box-shadow 0.15s ease, transform 0.1s ease;
        }

        .pc-mine__order-tile:hover {
          box-shadow: 0 14px 28px var(--pc-shadow);
          transform: translateY(-2px);
        }

        .pc-mine__order-tile-icon {
          width: 46px;
          height: 46px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 20px;
        }

        .pc-mine__order-tile-label {
          font-size: 12.5px;
          font-weight: 700;
          color: var(--pc-text);
          line-height: 1.3;
        }

        .pc-mine__quick-row {
          display: grid;
          grid-template-columns: repeat(4, minmax(0, 1fr));
          gap: 16px;
        }

        .pc-mine__quick-btn {
          padding: 20px 12px;
          text-align: center;
          text-decoration: none;
          font-size: 13px;
          font-weight: 700;
          color: var(--pc-text);
          transition: box-shadow 0.15s ease, transform 0.1s ease;
        }

        .pc-mine__quick-btn:hover {
          box-shadow: 0 12px 26px var(--pc-shadow);
          transform: translateY(-2px);
        }

        .pc-mine__quick-btn-icon {
          font-size: 22px;
          margin-bottom: 10px;
        }

        @media (max-width: 1000px) {
          .pc-mine__order-tiles,
          .pc-mine__quick-row {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }
        }
      `}</style>
    </MineSellerShell>
  );
}

export default Home;
