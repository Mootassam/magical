import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import authActions from "src/modules/auth/authActions";
import authSelectors from "src/modules/auth/authSelectors";
import storeActions from "src/modules/store/storeActions";
import storeSelectors from "src/modules/store/storeSelectors";
import FrozenStoreModal from "src/view/pages/Estore/FrozenStoreModal";

function MineSeller() {
  const dispatch = useDispatch();
  const currentUser = useSelector(authSelectors.selectCurrentUser);
  const store = useSelector(storeSelectors.selectStore);
  const initLoading = useSelector(storeSelectors.selectInitLoading);
  const dashboard = useSelector(storeSelectors.selectDashboard);

  useEffect(() => {
    dispatch(storeActions.doInit());
    dispatch(storeActions.doFetchDashboard());
  }, [dispatch]);

  const waitingForDeliveryCount = dashboard?.waitingForDeliveryCount || 0;

  const storePhoto = store?.storePhoto?.[0]?.downloadUrl;

  const doSignout = () => {
    dispatch(authActions.doSignout());
  };

  if (initLoading || !store) {
    return null;
  }

  if (store.frozen) {
    return <FrozenStoreModal />;
  }

  return (
    <>
      <div className="phone">

        <div className="page-header">
          <div className="header-top">
            <span className="header-title">My Shop</span>
            <Link to="/seller/set-up" className="settings-icon">⚙️</Link>
          </div>
        </div>

        <div className="scroll-area">

          <Link to="/mine" className="switch-banner">
            <span className="switch-icon">🔄</span>
            <div className="switch-text">
              <div className="switch-title">Buyer account available</div>
              <div className="switch-sub">Switch back to shop as a buyer</div>
            </div>
            <span className="switch-arrow">›</span>
          </Link>

          <Link to="/shop-details" className="profile-card">
            <div className="avatar">
              {storePhoto ? (
                <img src={storePhoto} alt={`${store?.storeName || "Store"} photo`} />
              ) : (
                <div className="avatar-fallback">🏪</div>
              )}
            </div>
            <div className="profile-info">
              <div className="profile-name-row">
                <span className="profile-name">{store?.storeName || "My Store"}</span>
              </div>
              <div className="profile-email">{currentUser?.email}</div>
              <div className="profile-id">
                {store?.storeId ? `Store ID: ${store.storeId}` : `ID: ${currentUser?.id}`}
              </div>
            </div>
            <span className="profile-arrow">›</span>
          </Link>

          <div className="stats-row">
            <Link to="/my-collection" className="stat-item">
              <div className="stat-value">0</div>
              <div className="stat-label">My Collection</div>
            </Link>
            <Link to="/shop-collection" className="stat-item">
              <div className="stat-value">0</div>
              <div className="stat-label">Shop Collection</div>
            </Link>
            <Link to="/my-browse" className="stat-item">
              <div className="stat-value">0</div>
              <div className="stat-label">My Browse</div>
            </Link>
            <Link to="/balance" className="stat-item">
              <div className="stat-value">${currentUser?.balance?.toFixed(2) || "0.00"}</div>
              <div className="stat-label">Account Balance</div>
            </Link>
          </div>

          <div className="orders-card">
            <div className="orders-head">
              <span className="t">My Orders</span>
            </div>
            <div className="orders-icons">
              <Link to="/orders" className="order-icon-item">
                💳
                <span className="lbl">Payment pending</span>
              </Link>
              <Link to="/orders" className="order-icon-item">
                📦
                <span className="lbl">Waiting for delivery</span>
              </Link>
              <Link to="/orders" className="order-icon-item">
                🚚
                <span className="lbl">Waiting for receipt</span>
              </Link>
              <Link to="/orders" className="order-icon-item">
                ✅
                <span className="lbl">Completed</span>
              </Link>
              <Link to="/orders" className="order-icon-item">
                ↩️
                <span className="lbl">Refund/After-sales</span>
              </Link>
            </div>
          </div>

          <div className="quick-row">
            <Link to="/topup" className="quick-btn">
              <div className="ic">⬆️</div>
              <div className="lbl">Top up</div>
            </Link>
            <Link to="/withdrawal" className="quick-btn">
              <div className="ic">⬇️</div>
              <div className="lbl">Withdrawal</div>
            </Link>
          </div>

          <div className="menu-card">
            <Link to="/wholesale-management" className="menu-item">
              <div className="menu-icon" style={{ background: '#e8f1ff' }}>🏷️</div>
              <div className="menu-text">Wholesale Management</div>
              <span className="menu-arrow">›</span>
            </Link>
            <Link to="/shop-details" className="menu-item">
              <div className="menu-icon" style={{ background: '#fff3e6' }}>🏬</div>
              <div className="menu-text">Shop Details</div>
              <span className="menu-arrow">›</span>
            </Link>
            <Link to="/product-management" className="menu-item">
              <div className="menu-icon" style={{ background: '#f1edfd' }}>📦</div>
              <div className="menu-text">Product Management</div>
              <span className="menu-arrow">›</span>
            </Link>
            <Link to="/orders" className="menu-item">
              <div className="menu-icon" style={{ background: '#eafaf1' }}>🧾</div>
              <div className="menu-text">Orders</div>
              {waitingForDeliveryCount > 0 && (
                <span className="menu-count-badge">{waitingForDeliveryCount} waiting for delivery</span>
              )}
              <span className="menu-arrow">›</span>
            </Link>
            <Link to="/withdrawal-record" className="menu-item">
              <div className="menu-icon" style={{ background: '#e8f1ff' }}>💳</div>
              <div className="menu-text">Billing records</div>
              <span className="menu-arrow">›</span>
            </Link>
            <Link to="/delivery-address" className="menu-item">
              <div className="menu-icon" style={{ background: '#fdeef4' }}>📍</div>
              <div className="menu-text">Delivery address</div>
              <span className="menu-arrow">›</span>
            </Link>
            <Link to="/shop-collection" className="menu-item">
              <div className="menu-icon" style={{ background: '#fff3e6' }}>❤️</div>
              <div className="menu-text">Shop Collection</div>
              <span className="menu-arrow">›</span>
            </Link>
            <Link to="/site-message" className="menu-item">
              <div className="menu-icon" style={{ background: '#f1edfd' }}>🎧</div>
              <div className="menu-text">Service Center</div>
              <span className="menu-arrow">›</span>
            </Link>
            <Link to="/wallet-management" className="menu-item">
              <div className="menu-icon" style={{ background: '#eafaf1' }}>👛</div>
              <div className="menu-text">Wallet Management</div>
              <span className="menu-arrow">›</span>
            </Link>
            <Link to="/login-password" className="menu-item">
              <div className="menu-icon" style={{ background: '#e8f1ff' }}>🔒</div>
              <div className="menu-text">Login Password</div>
              <span className="menu-arrow">›</span>
            </Link>
            <Link to="/payment-password" className="menu-item">
              <div className="menu-icon" style={{ background: '#fdeef4' }}>🔑</div>
              <div className="menu-text">Payment Password</div>
              <span className="menu-arrow">›</span>
            </Link>
            <Link to="/seller/set-up" className="menu-item">
              <div className="menu-icon" style={{ background: '#eafaf1' }}>⚙️</div>
              <div className="menu-text">Set up</div>
              <span className="menu-arrow">›</span>
            </Link>
          </div>

          <div className="logout-btn" onClick={doSignout}>Log out</div>

        </div>

      </div>

      <style>{`
        :root{
          --navy:#0e1b45;
          --blue-bright:#2f8dff;
          --blue-mid:#1656c9;
          --blue-deep:#0b3fae;
          --white:#ffffff;
          --page-bg:#f4f7fd;
          --card-bg:#ffffff;
          --grey-text:#6b7590;
          --grey-light:#eef2fa;
          --gold:#ffb020;
          --green:#12b886;
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
          padding:16px 18px 46px;
          color:#fff;
          flex-shrink:0;
        }
        .header-top{
          display:flex;
          justify-content:space-between;
          align-items:center;
        }
        .header-title{ font-size:17px; font-weight:800; }
        .settings-icon{ font-size:18px; opacity:0.9; text-decoration:none; }

        /* ---------- Scroll body ---------- */
        .scroll-area{
          flex:1;
          overflow-y:auto;
          scrollbar-width:none;
          padding:0 14px 30px;
          margin-top:-30px;
        }
        .scroll-area::-webkit-scrollbar{ display:none; }

        /* ---------- Switch to buyer banner ---------- */
        .switch-banner{
          display:flex;
          align-items:center;
          gap:12px;
          background:var(--card-bg);
          border:1.4px solid #d9e6ff;
          border-radius:16px;
          padding:13px 14px;
          margin-bottom:14px;
          text-decoration:none;
          box-shadow:0 8px 20px rgba(20,40,100,0.06);
        }
        .switch-icon{
          width:36px; height:36px;
          border-radius:10px;
          background:#e8f1ff;
          display:flex; align-items:center; justify-content:center;
          font-size:16px;
          flex-shrink:0;
        }
        .switch-text{ flex:1; }
        .switch-title{ font-size:12.5px; font-weight:800; color:var(--navy); }
        .switch-sub{ font-size:11px; color:var(--grey-text); margin-top:2px; }
        .switch-arrow{ font-size:16px; color:#c3cbe0; }

        /* ---------- Profile card ---------- */
        .profile-card{
          background:var(--card-bg);
          border-radius:18px;
          box-shadow:0 10px 26px rgba(20,40,100,0.1);
          padding:16px;
          display:flex;
          align-items:center;
          gap:12px;
          text-decoration:none;
        }
        .avatar{
          width:58px; height:58px;
          border-radius:50%;
          overflow:hidden;
          flex-shrink:0;
          border:2px solid var(--grey-light);
        }
        .avatar img{ width:100%; height:100%; object-fit:cover; }
        .avatar-fallback{
          width:100%; height:100%;
          display:flex; align-items:center; justify-content:center;
          background:var(--grey-light);
          font-size:24px;
        }
        .profile-info{ flex:1; min-width:0; }
        .profile-name-row{ display:flex; align-items:center; gap:8px; }
        .profile-name{ font-size:15.5px; font-weight:800; color:var(--navy); }
        .profile-email{ font-size:11.5px; color:var(--grey-text); margin-top:3px; }
        .profile-id{ font-size:11px; color:var(--grey-text); margin-top:2px; }
        .profile-arrow{ font-size:16px; color:#c3cbe0; }

        /* ---------- Stats row ---------- */
        .stats-row{
          display:flex;
          background:var(--card-bg);
          border-radius:18px;
          box-shadow:0 8px 20px rgba(20,40,100,0.07);
          margin-top:12px;
          padding:16px 4px;
        }
        .stat-item{ flex:1; text-align:center; border-right:1px solid var(--grey-light); text-decoration:none; color:inherit; }
        .stat-item:last-child{ border-right:none; }
        .stat-value{ font-size:15px; font-weight:800; color:var(--navy); }
        .stat-label{ font-size:9.5px; color:var(--grey-text); margin-top:4px; line-height:1.3; }

        /* ---------- Orders card ---------- */
        .orders-card{
          background:var(--card-bg);
          border-radius:18px;
          box-shadow:0 8px 20px rgba(20,40,100,0.07);
          margin-top:12px;
          padding:14px 6px;
        }
        .orders-head{
          display:flex;
          justify-content:space-between;
          align-items:center;
          padding:0 12px 12px;
        }
        .orders-head .t{ font-size:14px; font-weight:800; color:var(--navy); }
        .orders-head .view-all{ font-size:11.5px; color:var(--blue-mid); font-weight:600; }
        .orders-icons{ display:flex; justify-content:space-around; }
        .order-icon-item{
          display:flex; flex-direction:column; align-items:center; gap:6px;
          font-size:19px;
          text-decoration:none;
          color:inherit;
        }
        .order-icon-item .lbl{ font-size:9px; color:var(--navy); font-weight:600; text-align:center; max-width:58px; line-height:1.2; }

        /* ---------- Quick action row ---------- */
        .quick-row{
          display:flex;
          gap:10px;
          margin-top:12px;
        }
        .quick-btn{
          flex:1;
          background:var(--card-bg);
          border-radius:14px;
          box-shadow:0 8px 18px rgba(20,40,100,0.06);
          padding:12px 6px;
          text-align:center;
          text-decoration:none;
          display:block;
        }
        .quick-btn .ic{ font-size:18px; }
        .quick-btn .lbl{ font-size:11px; font-weight:700; color:var(--navy); margin-top:5px; }

        /* ---------- Menu list ---------- */
        .menu-card{
          background:var(--card-bg);
          margin-top:12px;
          border-radius:18px;
          box-shadow:0 8px 20px rgba(20,40,100,0.06);
          overflow:hidden;
        }
        .menu-item{
          display:flex;
          align-items:center;
          gap:12px;
          padding:14px 16px;
          border-top:1px solid var(--grey-light);
          text-decoration:none;
        }
        .menu-item:first-child{ border-top:none; }
        .menu-icon{
          width:32px; height:32px;
          border-radius:9px;
          display:flex; align-items:center; justify-content:center;
          font-size:15px;
          flex-shrink:0;
        }
        .menu-text{ flex:1; font-size:13px; font-weight:600; color:var(--navy); }
        .menu-count-badge{
          background:#fff0eb;
          color:#ff5470;
          font-size:10.5px;
          font-weight:700;
          padding:3px 9px;
          border-radius:10px;
          white-space:nowrap;
          margin-right:6px;
        }
        .menu-arrow{ color:#c3cbe0; font-size:13px; }

        .logout-btn{
          margin-top:16px;
          background:var(--card-bg);
          border-radius:16px;
          box-shadow:0 8px 20px rgba(20,40,100,0.06);
          padding:13px;
          text-align:center;
          font-size:13px;
          font-weight:700;
          color:#ff5470;
          cursor:pointer;
        }
      `}</style>
    </>
  );
}

export default MineSeller;
