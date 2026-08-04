import React from "react";
import { useSelector } from "react-redux";
import authSelectors from "src/modules/auth/authSelectors";

function MineBuyer() {
  const currentUser = useSelector(authSelectors.selectCurrentUser);
  const avatar = useSelector(authSelectors.selectCurrentUserAvatar);

  return (
    <>
      <div className="phone">

        <div className="page-header">
          <div className="header-top">
            <span className="header-title">My Account</span>
            <span className="settings-icon">⚙️</span>
          </div>
        </div>

        <div className="scroll-area">

          <div className="approved-banner">
            <span className="approved-icon">✅</span>
            <div className="approved-text">
              <div className="approved-title">Store Application Approved!</div>
              <div className="approved-sub">Your seller account is active.</div>
            </div>
            <a href="estore-mine-seller.html" className="approved-link">Go to Seller Dashboard</a>
          </div>

          <div className="profile-card">
            <div className="avatar">
              <img
                src={avatar || "https://loremflickr.com/140/140/portrait,person/all?lock=501"}
                alt={`${currentUser?.fullName || "User"} avatar`}
              />
            </div>
            <div className="profile-info">
              <div className="profile-name">{currentUser?.fullName || currentUser?.email}</div>
              <div className="profile-email">{currentUser?.email}</div>
              <div className="profile-id">ID: {currentUser?.id}</div>
            </div>
            <span className="profile-arrow">›</span>
          </div>

          <div className="stats-row">
            <div className="stat-item">
              <div className="stat-value">0</div>
              <div className="stat-label">My Collection</div>
            </div>
            <div className="stat-item">
              <div className="stat-value">0</div>
              <div className="stat-label">Shop Collection</div>
            </div>
            <div className="stat-item">
              <div className="stat-value">0</div>
              <div className="stat-label">My Browse</div>
            </div>
            <div className="stat-item">
              <div className="stat-value">${currentUser?.balance?.toFixed(2) || "0.00"}</div>
              <div className="stat-label">Account Balance</div>
            </div>
          </div>

          <div className="orders-card">
            <div className="orders-head">
              <span className="t">My Orders</span>
              <a href="#" className="view-all">View All ›</a>
            </div>
            <div className="orders-icons">
              <div className="order-icon-item">
                💳
                <span className="lbl">Payment pending</span>
              </div>
              <div className="order-icon-item">
                🚚
                <span className="lbl">In shipping</span>
              </div>
              <div className="order-icon-item">
                📬
                <span className="lbl">Received</span>
              </div>
              <div className="order-icon-item">
                ✅
                <span className="lbl">Completed</span>
              </div>
              <div className="order-icon-item">
                ↩️
                <span className="lbl">Refund/After-sales</span>
              </div>
            </div>
          </div>

          <div className="quick-row">
            <a href="#" className="quick-btn">
              <div className="ic">⬆️</div>
              <div className="lbl">Top up</div>
            </a>
            <a href="#" className="quick-btn">
              <div className="ic">⬇️</div>
              <div className="lbl">Withdrawal</div>
            </a>
            <a href="estore-mine-seller.html" className="quick-btn">
              <div className="ic">🏪</div>
              <div className="lbl">Seller Dashboard</div>
            </a>
          </div>

          <div className="menu-card">
            <a href="#" className="menu-item">
              <div className="menu-icon" style={{ background: '#E7E7E7' }}>🧾</div>
              <div className="menu-text">Billing records</div>
              <span className="menu-arrow">›</span>
            </a>
            <a href="#" className="menu-item">
              <div className="menu-icon" style={{ background: '#FCE9E9' }}>📍</div>
              <div className="menu-text">Delivery address</div>
              <span className="menu-arrow">›</span>
            </a>
            <a href="#" className="menu-item">
              <div className="menu-icon" style={{ background: '#FEF5E7' }}>❤️</div>
              <div className="menu-text">My Collection</div>
              <span className="menu-arrow">›</span>
            </a>
            <a href="#" className="menu-item">
              <div className="menu-icon" style={{ background: '#E9EFFD' }}>🎧</div>
              <div className="menu-text">Service Center</div>
              <span className="menu-arrow">›</span>
            </a>
            <a href="#" className="menu-item">
              <div className="menu-icon" style={{ background: '#E9F9EF' }}>👛</div>
              <div className="menu-text">Wallet Management</div>
              <span className="menu-arrow">›</span>
            </a>
            <a href="#" className="menu-item">
              <div className="menu-icon" style={{ background: '#E7E7E7' }}>🔒</div>
              <div className="menu-text">Login Password</div>
              <span className="menu-arrow">›</span>
            </a>
            <a href="#" className="menu-item">
              <div className="menu-icon" style={{ background: '#FCE9E9' }}>🕘</div>
              <div className="menu-text">My Browse</div>
              <span className="menu-arrow">›</span>
            </a>
            <a href="#" className="menu-item">
              <div className="menu-icon" style={{ background: '#FEF5E7' }}>🔑</div>
              <div className="menu-text">Payment password</div>
              <span className="menu-arrow">›</span>
            </a>
            <a href="#" className="menu-item">
              <div className="menu-icon" style={{ background: '#E9F9EF' }}>⚙️</div>
              <div className="menu-text">Set up</div>
              <span className="menu-arrow">›</span>
            </a>
          </div>

          <div className="logout-btn">Log out</div>

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
        .settings-icon{ font-size:18px; opacity:0.9; }

        /* ---------- Scroll body ---------- */
        .scroll-area{
          flex:1;
          overflow-y:auto;
          scrollbar-width:none;
          padding:0 14px 30px;
          margin-top:-30px;
        }
        .scroll-area::-webkit-scrollbar{ display:none; }

        /* ---------- Seller approved banner ---------- */
        .approved-banner{
          background:linear-gradient(120deg, #22C55E, #22C55E);
          border-radius:16px;
          padding:14px 16px;
          color:#fff;
          display:flex;
          align-items:center;
          gap:12px;
          box-shadow:0 10px 24px rgba(34,197,94,0.3);
          margin-bottom:14px;
        }
        .approved-icon{ font-size:24px; flex-shrink:0; }
        .approved-text{ flex:1; }
        .approved-title{ font-size:13px; font-weight:800; }
        .approved-sub{ font-size:11px; opacity:0.9; margin-top:2px; }
        .approved-link{
          background:#fff;
          color:#22C55E;
          font-size:11px;
          font-weight:800;
          padding:7px 12px;
          border-radius:9px;
          white-space:nowrap;
          flex-shrink:0;
          text-decoration:none;
        }

        /* ---------- Profile card ---------- */
        .profile-card{
          background:var(--card-bg);
          border-radius:18px;
          box-shadow:0 10px 26px rgba(0,0,0,0.1);
          padding:16px;
          display:flex;
          align-items:center;
          gap:12px;
        }
        .avatar{
          width:58px; height:58px;
          border-radius:50%;
          overflow:hidden;
          flex-shrink:0;
          border:2px solid var(--grey-light);
        }
        .avatar img{ width:100%; height:100%; object-fit:cover; }
        .profile-info{ flex:1; min-width:0; }
        .profile-name{ font-size:15.5px; font-weight:800; color:var(--navy); }
        .profile-email{ font-size:11.5px; color:var(--grey-text); margin-top:3px; }
        .profile-id{ font-size:11px; color:var(--grey-text); margin-top:2px; }
        .profile-arrow{ font-size:16px; color:#888888; }

        /* ---------- Stats row ---------- */
        .stats-row{
          display:flex;
          background:var(--card-bg);
          border-radius:18px;
          box-shadow:0 8px 20px rgba(0,0,0,0.07);
          margin-top:12px;
          padding:16px 4px;
        }
        .stat-item{ flex:1; text-align:center; border-right:1px solid var(--grey-light); }
        .stat-item:last-child{ border-right:none; }
        .stat-value{ font-size:15px; font-weight:800; color:var(--navy); }
        .stat-label{ font-size:9.5px; color:var(--grey-text); margin-top:4px; line-height:1.3; }

        /* ---------- Orders card ---------- */
        .orders-card{
          background:var(--card-bg);
          border-radius:18px;
          box-shadow:0 8px 20px rgba(0,0,0,0.07);
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
        }
        .order-icon-item .lbl{ font-size:9.5px; color:var(--navy); font-weight:600; text-align:center; max-width:56px; line-height:1.2; }

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
          box-shadow:0 8px 18px rgba(0,0,0,0.06);
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
          box-shadow:0 8px 20px rgba(0,0,0,0.06);
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
        .menu-arrow{ color:#888888; font-size:13px; }

        .logout-btn{
          margin-top:16px;
          background:var(--card-bg);
          border-radius:16px;
          box-shadow:0 8px 20px rgba(0,0,0,0.06);
          padding:13px;
          text-align:center;
          font-size:13px;
          font-weight:700;
          color:#DC2626;
        }
      `}</style>
    </>
  );
}

export default MineBuyer;
