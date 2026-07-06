import React from "react";

function ShopDetails() {
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

          <div className="profile-card">
            <div className="shop-avatar">
              <img src="https://loremflickr.com/140/140/portrait,person/all?lock=201" alt="Shop owner avatar" />
            </div>
            <div className="shop-info">
              <div className="shop-name-row">
                <span className="shop-name">Kelvin's Store</span>
                <span className="level-badge">🏅 Ordinary</span>
              </div>
              <div className="shop-meta">
                Account Balance: <b>$22,568.47</b><br />
                Store Rating: <span className="stars">★★★★★</span> <b>5.0</b><br />
                Quantity of products: <b>554</b>
              </div>
            </div>
          </div>

          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-icon">🛡️</div>
              <div className="stat-value">100</div>
              <div className="stat-label">Credit score</div>
            </div>
            <div className="stat-card">
              <div className="stat-icon">🧾</div>
              <div className="stat-value">0</div>
              <div className="stat-label">Today's Order</div>
            </div>
            <div className="stat-card">
              <div className="stat-icon">📦</div>
              <div className="stat-value">81</div>
              <div className="stat-label">Cumulative order qty</div>
            </div>

            <div className="stat-card">
              <div className="stat-icon">💵</div>
              <div className="stat-value">$0.00</div>
              <div className="stat-label">Today's total sales</div>
            </div>
            <div className="stat-card">
              <div className="stat-icon">📊</div>
              <div className="stat-value accent">$22,034.36</div>
              <div className="stat-label">Total sales</div>
            </div>
            <div className="stat-card">
              <div className="stat-icon">📈</div>
              <div className="stat-value">$0</div>
              <div className="stat-label">Today's sales profit</div>
            </div>

            <div className="stat-card">
              <div className="stat-icon">💰</div>
              <div className="stat-value green">$4,406.96</div>
              <div className="stat-label">Sales Profit</div>
            </div>
            <div className="stat-card">
              <div className="stat-icon">👥</div>
              <div className="stat-value">242</div>
              <div className="stat-label">Number of followers</div>
            </div>
            <div className="stat-card">
              <div className="stat-icon">🏦</div>
              <div className="stat-value accent">$22,568.47</div>
              <div className="stat-label">Account Balance</div>
            </div>
          </div>

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
    box-shadow:0 8px 20px rgba(20,40,100,0.07);
    padding:18px 16px;
    display:flex;
    gap:14px;
  }
  .shop-avatar{
    width:64px; height:64px;
    border-radius:50%;
    overflow:hidden;
    flex-shrink:0;
    border:3px solid #eef2fa;
  }
  .shop-avatar img{ width:100%; height:100%; object-fit:cover; }

  .shop-info{ flex:1; min-width:0; }
  .shop-name-row{
    display:flex;
    align-items:center;
    gap:8px;
  }
  .shop-name{ font-size:16px; font-weight:800; color:var(--navy); }
  .level-badge{
    background:linear-gradient(135deg, #ffe6ac, var(--gold));
    color:#7a4b00;
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
    box-shadow:0 8px 18px rgba(20,40,100,0.06);
    padding:14px 6px;
    text-align:center;
  }
  .stat-icon{ font-size:16px; margin-bottom:6px; }
  .stat-value{ font-size:14.5px; font-weight:800; color:var(--navy); }
  .stat-value.accent{ color:var(--blue-deep); }
  .stat-value.green{ color:var(--green); }
  .stat-label{ font-size:9.5px; color:var(--grey-text); margin-top:4px; line-height:1.3; }

  /* ---------- Highlight balance strip ---------- */
  .balance-strip{
    margin-top:16px;
    background:linear-gradient(120deg, #16265c, #1656c9 60%, #2f8dff);
    border-radius:18px;
    padding:16px 18px;
    color:#fff;
    display:flex;
    justify-content:space-between;
    align-items:center;
    box-shadow:0 14px 30px rgba(20,60,150,0.25);
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
