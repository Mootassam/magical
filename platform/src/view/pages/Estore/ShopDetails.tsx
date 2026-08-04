import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import storeActions from "src/modules/store/storeActions";
import storeSelectors from "src/modules/store/storeSelectors";

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

  return (
    <>
      <div className="phone">

        <div className="page-header">
          <div className="header-top">
            <button className="back-btn" onClick={() => window.history.back()}>←</button>
            <span className="page-title">Shop Details</span>
          </div>
        </div>

        <div className="scroll-area">

          {isInitialLoading && (
            <div className="empty-state">Loading shop details…</div>
          )}

          {!isInitialLoading && !store && (
            <div className="empty-state">
              <div className="empty-title">You don't have a store yet</div>
              <div className="empty-text">Apply to become a merchant to see your shop details here.</div>
              <button className="empty-cta" onClick={() => history.push("/apply-merchant")}>
                Apply Now
              </button>
            </div>
          )}

          {!isInitialLoading && store && (
            <>
              <div className="profile-card">
                <div className="shop-avatar">
                  {photo?.downloadUrl ? (
                    <img src={photo.downloadUrl} alt={store.storeName} />
                  ) : (
                    <div className="shop-avatar-fallback">
                      {(store.storeName || "?").charAt(0).toUpperCase()}
                    </div>
                  )}
                </div>
                <div className="shop-info">
                  <div className="shop-name-row">
                    <span className="shop-name">{store.storeName}</span>
                  </div>
                  <div className="shop-meta">
                    Account Balance: <b>{formatPrice(dashboard.accountBalance)}</b><br />
                    Store Rating: <span className="stars">{renderStars(store.storeRating)}</span> <b>{(Number(store.storeRating) || 0).toFixed(1)}</b><br />
                    Quantity of products: <b>{dashboard.cumulativeOrderQty}</b>
                  </div>
                </div>
              </div>

              <div className="stats-grid">
                <div className="stat-card">
                  <div className="stat-icon">🛡️</div>
                  <div className="stat-value">{store.creditScore}</div>
                  <div className="stat-label">Credit score</div>
                </div>
                <div className="stat-card">
                  <div className="stat-icon">🧾</div>
                  <div className="stat-value">{dashboard.waitingForDeliveryCount}</div>
                  <div className="stat-label">Today's Order</div>
                </div>
                <div className="stat-card">
                  <div className="stat-icon">📦</div>
                  <div className="stat-value">{formatPrice(dashboard.waitingForDeliveryAmount)}</div>
                  <div className="stat-label">Cumulative order qty</div>
                </div>

                <div className="stat-card">
                  <div className="stat-icon">💵</div>
                  <div className="stat-value">{formatPrice(dashboard.todayTotalSales)}</div>
                  <div className="stat-label">Today's total sales</div>
                </div>
                <div className="stat-card">
                  <div className="stat-icon">📊</div>
                  <div className="stat-value accent">{formatPrice(dashboard.totalSales)}</div>
                  <div className="stat-label">Total sales</div>
                </div>
                <div className="stat-card">
                  <div className="stat-icon">📈</div>
                  <div className="stat-value">{formatPrice(dashboard.todaySalesProfit)}</div>
                  <div className="stat-label">Today's sales profit</div>
                </div>

                <div className="stat-card">
                  <div className="stat-icon">💰</div>
                  <div className="stat-value green">{formatPrice(dashboard.salesProfit)}</div>
                  <div className="stat-label">Sales Profit</div>
                </div>
                <div className="stat-card">
                  <div className="stat-icon">👥</div>
                  <div className="stat-value">{store.numberOfFollowers}</div>
                  <div className="stat-label">Number of followers</div>
                </div>
                <div className="stat-card">
                  <div className="stat-icon">🏦</div>
                  <div className="stat-value accent">{formatPrice(dashboard.accountBalance)}</div>
                  <div className="stat-label">Account Balance</div>
                </div>
              </div>
            </>
          )}

        </div>

      </div>

      <style>{`
  :root{
    --navy:#111111;
    --blue-bright:#D1451F;
    --blue-mid:#B93C1A;
    --blue-deep:#7F2B15;
    --white:#FFFFFF;
    --page-bg:#FAFAFA;
    --card-bg:#FFFFFF;
    --grey-text:#555555;
    --grey-light:#F4F4F4;
    --gold:#F59E0B;
    --green:#22C55E;
  }

  *{box-sizing:border-box; margin:0; padding:0;}

  body{
    font-family:'Segoe UI', Roboto, Arial, sans-serif;
    background:var(--page-bg);
    margin:0;
  }

  .phone{
    width:390px;
    max-width:390px;
    height:100vh;
    background:var(--page-bg);
    overflow:hidden;
    position:relative;
    display:flex;
    flex-direction:column;
    margin:0 auto;
  }

  /* ---------- Header ---------- */
  .page-header{
    background:linear-gradient(135deg, var(--blue-deep), var(--blue-bright));
    padding:14px 18px 16px;
    color:#fff;
    flex-shrink:0;
    position:relative;
  }
  .header-top{
    display:flex;
    align-items:center;
    gap:12px;
  }
  .back-btn{
    width:34px; height:34px;
    border-radius:50%;
    background:rgba(255,255,255,0.18);
    display:flex; align-items:center; justify-content:center;
    font-size:16px;
    cursor:pointer;
    border:none;
    color:#fff;
  }
  .page-title{ font-size:17px; font-weight:800; }

  /* ---------- Scroll body ---------- */
  .scroll-area{
    flex:1;
    overflow-y:auto;
    scrollbar-width:none;
    padding:16px 14px 30px;
  }
  .scroll-area::-webkit-scrollbar{ display:none; }

  /* ---------- Profile card ---------- */
  .profile-card{
    background:var(--card-bg);
    border-radius:20px;
    box-shadow:0 8px 20px rgba(0,0,0,0.07);
    padding:18px 16px;
    display:flex;
    gap:14px;
  }
  .shop-avatar{
    width:64px; height:64px;
    border-radius:50%;
    overflow:hidden;
    flex-shrink:0;
    border:3px solid #F4F4F4;
  }
  .shop-avatar img{ width:100%; height:100%; object-fit:cover; }
  .shop-avatar-fallback{
    width:100%; height:100%;
    display:flex; align-items:center; justify-content:center;
    background:linear-gradient(135deg, var(--blue-bright), var(--blue-deep));
    color:#fff;
    font-size:24px;
    font-weight:800;
  }

  .shop-info{ flex:1; min-width:0; }
  .shop-name-row{
    display:flex;
    align-items:center;
    gap:8px;
  }
  .shop-name{ font-size:16px; font-weight:800; color:var(--navy); }
  .level-badge{
    background:linear-gradient(135deg, #FEF5E7, var(--gold));
    color:#92400E;
    font-size:10px;
    font-weight:800;
    padding:2px 8px;
    border-radius:8px;
    display:flex;
    align-items:center;
    gap:3px;
  }
  .shop-meta{
    margin-top:8px;
    font-size:11.5px;
    color:var(--grey-text);
    line-height:1.7;
  }
  .shop-meta b{ color:var(--navy); font-weight:700; }
  .stars{ color:var(--gold); font-size:11px; letter-spacing:1px; }

  /* ---------- Stats grid ---------- */
  .stats-grid{
    display:grid;
    grid-template-columns:1fr 1fr 1fr;
    gap:10px;
    margin-top:16px;
  }
  .stat-card{
    background:var(--card-bg);
    border-radius:14px;
    box-shadow:0 8px 18px rgba(0,0,0,0.06);
    padding:14px 6px;
    text-align:center;
  }
  .stat-icon{ font-size:16px; margin-bottom:6px; }
  .stat-value{ font-size:14.5px; font-weight:800; color:var(--navy); }
  .stat-value.accent{ color:var(--blue-deep); }
  .stat-value.green{ color:var(--green); }
  .stat-label{ font-size:9.5px; color:var(--grey-text); margin-top:4px; line-height:1.3; }

  /* ---------- Empty state ---------- */
  .empty-state{
    text-align:center;
    padding:60px 24px;
    color:var(--grey-text);
    font-size:13px;
  }
  .empty-title{ font-size:14px; font-weight:700; color:var(--navy); }
  .empty-text{ font-size:12.5px; margin-top:6px; line-height:1.5; }
  .empty-cta{
    margin-top:16px;
    border:none;
    border-radius:12px;
    padding:11px 20px;
    background:linear-gradient(135deg, var(--blue-bright), var(--blue-deep));
    color:#fff;
    font-size:13px;
    font-weight:700;
    cursor:pointer;
    box-shadow:0 8px 18px rgba(209,69,31,0.35);
  }

  /* ---------- Highlight balance strip ---------- */
  .balance-strip{
    margin-top:16px;
    background:linear-gradient(120deg, #7F2B15, #B93C1A 60%, #D1451F);
    border-radius:18px;
    padding:16px 18px;
    color:#fff;
    display:flex;
    justify-content:space-between;
    align-items:center;
    box-shadow:0 14px 30px rgba(0,0,0,0.25);
  }
  .balance-label{ font-size:11.5px; opacity:0.85; }
  .balance-value{ font-size:22px; font-weight:800; margin-top:4px; }
  .withdraw-mini{
    background:#fff;
    color:var(--blue-deep);
    font-size:12px;
    font-weight:700;
    padding:8px 16px;
    border-radius:10px;
  }
      `}</style>
    </>
  );
}

export default ShopDetails;
