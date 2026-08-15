import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import storeActions from "src/modules/store/storeActions";
import storeSelectors from "src/modules/store/storeSelectors";
import MineSellerShell from "./MineSellerShell";
import { sharedMineStyles } from "src/view/pages/PC/Mine/MyAccount";
import { i18n } from "../../../../i18n";

function formatPrice(value) {
  return `$${(Number(value) || 0).toFixed(2)}`;
}

function renderStars(rating) {
  const rounded = Math.round(Number(rating) || 0);
  return "★★★★★".slice(0, rounded) + "☆☆☆☆☆".slice(0, 5 - rounded);
}

function ShopDetails() {
  const dispatch = useDispatch();
  const history = useHistory();

  const dashboard = useSelector(storeSelectors.selectDashboard);
  const loading = useSelector(storeSelectors.selectDashboardLoading);

  useEffect(() => {
    dispatch(storeActions.doFetchDashboard());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  const store = dashboard?.store;
  const isInitialLoading = loading && !dashboard;
  const photo = store?.storePhoto && store.storePhoto[0];
  const banner = store?.storeBanner && store.storeBanner[0];

  const healthStats = store
    ? [
        { icon: "🛡️", value: store.creditScore, label: i18n("estore.pc.shopDetails.creditScore") },
        { icon: "👥", value: store.numberOfFollowers, label: i18n("estore.pc.shopDetails.followers") },
        { icon: "🧾", value: dashboard.waitingForDeliveryCount, label: i18n("estore.pc.shopDetails.todaysOrders") },
        { icon: "📦", value: dashboard.cumulativeOrderQty, label: i18n("estore.pc.shopDetails.cumulativeOrderQty") },
      ]
    : [];

  const salesStats = store
    ? [
        { icon: "💵", value: formatPrice(dashboard.todayTotalSales), label: i18n("estore.pc.shopDetails.todaysSales") },
        { icon: "📊", value: formatPrice(dashboard.totalSales), label: i18n("estore.pc.shopDetails.totalSales") },
        { icon: "📈", value: formatPrice(dashboard.todaySalesProfit), label: i18n("estore.pc.shopDetails.todaysProfit") },
        { icon: "💰", value: formatPrice(dashboard.salesProfit), label: i18n("estore.pc.shopDetails.totalProfit"), highlight: true },
      ]
    : [];

  return (
    <MineSellerShell active="shop-details">
      <h1 className="pc-mine__page-title">{i18n("estore.pc.shopDetails.title")}</h1>

      {isInitialLoading && <div className="pc-mine__hint">{i18n("estore.pc.shopDetails.loading")}</div>}

      {!isInitialLoading && !store && (
        <div className="pc-card pc-mine__empty">
          <div className="pc-mine__empty-title">{i18n("estore.pc.shopDetails.noStoreTitle")}</div>
          <div className="pc-mine__empty-text">{i18n("estore.pc.shopDetails.noStoreText")}</div>
          <button
            type="button"
            className="pc-btn pc-btn-primary"
            onClick={() => history.push("/pc/mine/apply-merchant")}
          >
            {i18n("estore.pc.shopDetails.applyNow")}
          </button>
        </div>
      )}

      {!isInitialLoading && store && (
        <>
          <div
            className="pc-mine__sd-hero"
            style={banner?.downloadUrl ? { backgroundImage: `url(${banner.downloadUrl})` } : undefined}
          >
            <div className="pc-mine__sd-hero-overlay" />
            <div className="pc-mine__sd-hero-content">
              <div className="pc-mine__sd-hero-left">
                <div className="pc-mine__sd-avatar">
                  {photo?.downloadUrl ? (
                    <img src={photo.downloadUrl} alt={store.storeName} />
                  ) : (
                    <span>{(store.storeName || "?").charAt(0).toUpperCase()}</span>
                  )}
                </div>
                <div>
                  <div className="pc-mine__sd-name">{store.storeName}</div>
                  <div className="pc-mine__sd-rating">
                    <span className="pc-mine__sd-stars">{renderStars(store.storeRating)}</span>
                    <span>{(Number(store.storeRating) || 0).toFixed(1)}</span>
                  </div>
                </div>
              </div>

              <div className="pc-mine__sd-hero-balance">
                <div className="pc-mine__sd-hero-balance-label">{i18n("estore.pc.shopDetails.accountBalance")}</div>
                <div className="pc-mine__sd-hero-balance-value">{formatPrice(dashboard.accountBalance)}</div>
              </div>
            </div>
          </div>

          <div className="pc-mine__sd-section-label">{i18n("estore.pc.shopDetails.storeHealth")}</div>
          <div className="pc-mine__sd-stats-grid">
            {healthStats.map((stat) => (
              <div className="pc-card pc-mine__sd-stat-card" key={stat.label}>
                <div className="pc-mine__sd-stat-icon">{stat.icon}</div>
                <div className="pc-mine__sd-stat-value">{stat.value}</div>
                <div className="pc-mine__sd-stat-label">{stat.label}</div>
              </div>
            ))}
          </div>

          <div className="pc-mine__sd-section-label">{i18n("estore.pc.shopDetails.salesPerformance")}</div>
          <div className="pc-mine__sd-stats-grid">
            {salesStats.map((stat) => (
              <div
                className={`pc-card pc-mine__sd-stat-card${stat.highlight ? " pc-mine__sd-stat-card--highlight" : ""}`}
                key={stat.label}
              >
                <div className="pc-mine__sd-stat-icon">{stat.icon}</div>
                <div className="pc-mine__sd-stat-value">{stat.value}</div>
                <div className="pc-mine__sd-stat-label">{stat.label}</div>
              </div>
            ))}
          </div>
        </>
      )}

      <style>{sharedMineStyles}</style>
      <style>{`
        .pc-mine__sd-hero {
          position: relative;
          border-radius: var(--pc-radius);
          overflow: hidden;
          padding: 32px;
          margin-bottom: 28px;
          background: linear-gradient(135deg, var(--pc-primary-dark), var(--pc-primary) 60%, #E28E71);
          background-size: cover;
          background-position: center;
          box-shadow: 0 16px 34px rgba(127, 43, 21, 0.28);
        }

        .pc-mine__sd-hero-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(120deg, rgba(127,43,21,0.75), rgba(209,69,31,0.55));
        }

        .pc-mine__sd-hero-content {
          position: relative;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 20px;
          flex-wrap: wrap;
        }

        .pc-mine__sd-hero-left {
          display: flex;
          align-items: center;
          gap: 18px;
        }

        .pc-mine__sd-avatar {
          width: 76px;
          height: 76px;
          border-radius: 50%;
          border: 3px solid rgba(255,255,255,0.6);
          overflow: hidden;
          flex-shrink: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(255,255,255,0.15);
          color: #fff;
          font-size: 28px;
          font-weight: 800;
        }

        .pc-mine__sd-avatar img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .pc-mine__sd-name {
          font-size: 22px;
          font-weight: 800;
          color: #fff;
        }

        .pc-mine__sd-rating {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-top: 6px;
          font-size: 13.5px;
          font-weight: 700;
          color: #fff;
        }

        .pc-mine__sd-stars {
          color: var(--pc-warning);
          letter-spacing: 1px;
        }

        .pc-mine__sd-hero-balance {
          text-align: right;
          background: rgba(255,255,255,0.14);
          border-radius: var(--pc-radius-sm);
          padding: 14px 22px;
        }

        .pc-mine__sd-hero-balance-label {
          font-size: 12px;
          color: rgba(255,255,255,0.85);
        }

        .pc-mine__sd-hero-balance-value {
          font-size: 24px;
          font-weight: 800;
          color: #fff;
          margin-top: 4px;
        }

        .pc-mine__sd-section-label {
          font-size: 13px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          color: var(--pc-text-muted);
          margin-bottom: 14px;
        }

        .pc-mine__sd-stats-grid {
          display: grid;
          grid-template-columns: repeat(4, minmax(0, 1fr));
          gap: 16px;
          margin-bottom: 28px;
        }

        .pc-mine__sd-stat-card {
          padding: 22px 16px;
          text-align: center;
          transition: box-shadow 0.15s ease, transform 0.1s ease;
        }

        .pc-mine__sd-stat-card:hover {
          box-shadow: 0 14px 28px var(--pc-shadow);
          transform: translateY(-2px);
        }

        .pc-mine__sd-stat-card--highlight {
          background: linear-gradient(150deg, #FAECE9, #FEF5E7);
          border-color: transparent;
        }

        .pc-mine__sd-stat-icon {
          width: 42px;
          height: 42px;
          border-radius: 50%;
          background: var(--pc-secondary);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 18px;
          margin: 0 auto 12px;
        }

        .pc-mine__sd-stat-value {
          font-size: 18px;
          font-weight: 800;
          color: var(--pc-text);
        }

        .pc-mine__sd-stat-label {
          font-size: 11.5px;
          color: var(--pc-text-muted);
          margin-top: 6px;
        }

        @media (max-width: 1000px) {
          .pc-mine__sd-stats-grid {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }
        }
      `}</style>
    </MineSellerShell>
  );
}

export default ShopDetails;
