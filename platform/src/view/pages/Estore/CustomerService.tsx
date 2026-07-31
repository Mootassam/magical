import React from "react";

function CustomerService() {
  return (
    <>
      <div className="phone">

        <div className="page-header">
          <div className="left">
            <button className="back-btn" onClick={() => window.history.back()}>←</button>
            <span className="page-title">Customer Service</span>
          </div>
        </div>

        <div className="scroll-area">
          <div className="empty-state">
            Our support team will get back to you shortly.
          </div>
        </div>

      </div>

      <style>{`
  :root{
    --navy:#0e1b45;
    --blue-bright:#2f8dff;
    --blue-deep:#0b3fae;
    --page-bg:#f4f7fd;
    --grey-text:#6b7590;
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
    justify-content:space-between;
  }
  .page-header .left{ display:flex; align-items:center; gap:12px; }
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
    padding:14px 14px 24px;
  }
  .scroll-area::-webkit-scrollbar{ display:none; }

  .empty-state{
    text-align:center;
    color:var(--grey-text);
    font-size:13px;
    padding:60px 20px;
  }
      `}</style>
    </>
  );
}

export default CustomerService;
