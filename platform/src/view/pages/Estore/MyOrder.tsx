import React, { useState } from "react";

function MyOrder() {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <>
      <div className="phone">

        <div className="page-header">
          <button className="back-btn" onClick={() => window.history.back()}>←</button>
          <span className="page-title">Store Orders</span>
        </div>

        <div className="tabs">
          <div className={`tab${activeTab === 0 ? " active" : ""}`} onClick={() => setActiveTab(0)}>Waiting for<br />delivery</div>
          <div className={`tab${activeTab === 1 ? " active" : ""}`} onClick={() => setActiveTab(1)}>Waiting for<br />receipt</div>
          <div className={`tab${activeTab === 2 ? " active" : ""}`} onClick={() => setActiveTab(2)}>Completed</div>
          <div className={`tab${activeTab === 3 ? " active" : ""}`} onClick={() => setActiveTab(3)}>Refund /<br />After-sales</div>
        </div>

        <div className="scroll-area">

          <div className="order-card">
            <div className="order-top">
              <div className="order-thumb">
                <img src="https://loremflickr.com/160/160/knitwear,top/all?lock=101" alt="Liu Jo Knitted Top" />
              </div>
              <div className="order-info">
                <div className="order-name">Liu Jo Knitted Top</div>
                <div className="order-line">lump sum: $333.14 x1</div>
                <div className="order-line">Sales Profit: $66.63 x1</div>
                <div className="order-line">Wholesale Price: $266.51 x1</div>
              </div>
            </div>
            <div className="order-bottom">
              <div className="actual-payment">Actual payment: <b>$266.51</b></div>
              <button className="ship-btn">Go to Shipment</button>
            </div>
          </div>

          <div className="order-card">
            <div className="order-top">
              <div className="order-thumb">
                <img src="https://loremflickr.com/160/160/blouse,fashion/all?lock=102" alt="Patou Scalloped Hem Blouse" />
              </div>
              <div className="order-info">
                <div className="order-name">Patou Scalloped Hem Blouse</div>
                <div className="order-line">lump sum: $505.89 x1</div>
                <div className="order-line">Sales Profit: $101.18 x1</div>
                <div className="order-line">Wholesale Price: $404.71 x1</div>
              </div>
            </div>
            <div className="order-bottom">
              <div className="actual-payment">Actual payment: <b>$404.71</b></div>
              <button className="ship-btn">Go to Shipment</button>
            </div>
          </div>

          <div className="order-card">
            <div className="order-top">
              <div className="order-thumb">
                <img src="https://loremflickr.com/160/160/jumper,sweater/all?lock=103" alt="Aspesi V-Neck Jumper" />
              </div>
              <div className="order-info">
                <div className="order-name">Aspesi V-Neck Jumper</div>
                <div className="order-line">lump sum: $359.80 x1</div>
                <div className="order-line">Sales Profit: $71.96 x1</div>
                <div className="order-line">Wholesale Price: $287.84 x1</div>
              </div>
            </div>
            <div className="order-bottom">
              <div className="actual-payment">Actual payment: <b>$287.84</b></div>
              <button className="ship-btn">Go to Shipment</button>
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
    --red:#ff3b30;
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

  /* ---------- Tabs ---------- */
  .tabs{
    display:flex;
    background:#fff;
    flex-shrink:0;
    box-shadow:0 4px 12px rgba(20,40,100,0.05);
  }
  .tab{
    flex:1;
    text-align:center;
    padding:14px 4px 12px;
    font-size:12px;
    font-weight:700;
    color:#a6afc8;
    position:relative;
    cursor:pointer;
  }
  .tab.active{ color:var(--navy); }
  .tab.active::after{
    content:"";
    position:absolute;
    bottom:0; left:50%; transform:translateX(-50%);
    width:34px; height:3px; border-radius:3px;
    background:linear-gradient(90deg, var(--blue-bright), var(--blue-deep));
  }

  /* ---------- Scroll body ---------- */
  .scroll-area{
    flex:1;
    overflow-y:auto;
    scrollbar-width:none;
    padding:14px 14px 24px;
  }
  .scroll-area::-webkit-scrollbar{ display:none; }

  .order-card{
    background:var(--card-bg);
    border-radius:16px;
    box-shadow:0 8px 20px rgba(20,40,100,0.07);
    padding:14px;
    margin-bottom:14px;
  }

  .order-top{
    display:flex;
    gap:12px;
  }
  .order-thumb{
    width:70px; height:70px;
    border-radius:12px;
    overflow:hidden;
    flex-shrink:0;
    background:#f2f5fb;
  }
  .order-thumb img{ width:100%; height:100%; object-fit:cover; }

  .order-info{ flex:1; min-width:0; }
  .order-name{
    font-size:13.5px;
    font-weight:700;
    color:var(--navy);
    margin-bottom:6px;
  }
  .order-line{
    font-size:11.5px;
    color:var(--red);
    font-weight:600;
    line-height:1.6;
  }

  .order-bottom{
    display:flex;
    justify-content:space-between;
    align-items:center;
    margin-top:14px;
    padding-top:12px;
    border-top:1px solid var(--grey-light);
  }
  .actual-payment{
    font-size:12.5px;
    color:var(--navy);
    font-weight:600;
  }
  .actual-payment b{
    color:var(--red);
    font-size:15px;
    font-weight:800;
    margin-left:4px;
  }
  .ship-btn{
    border:none;
    border-radius:20px;
    padding:9px 18px;
    font-size:12.5px;
    font-weight:700;
    color:#fff;
    background:linear-gradient(135deg, var(--blue-bright), var(--blue-deep));
    box-shadow:0 8px 18px rgba(47,141,255,0.35);
    cursor:pointer;
  }
      `}</style>
    </>
  );
}

export default MyOrder;
