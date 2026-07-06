import React from "react";

function SiteMessage() {
  return (
    <>
      <div className="phone">

        <div className="page-header">
          <div className="left">
            <button className="back-btn" onClick={() => window.history.back()}>←</button>
            <span className="page-title">Site Message</span>
          </div>
          <span className="mark-read">Mark all read</span>
        </div>

        <div className="scroll-area">

          <div className="day-label">Today</div>

          <div className="msg-card">
            <div className="msg-icon" style={{ background: '#e8f1ff' }}>🎉</div>
            <div className="msg-body">
              <div className="msg-top">
                <span className="msg-title">Weekend Sale is live!</span>
                <span className="msg-time">10:24 AM</span>
              </div>
              <div className="msg-text">Enjoy up to 70% off across Fashion, Beauty and Electronics — today only.</div>
            </div>
            <span className="unread-dot"></span>
          </div>

          <div className="msg-card">
            <div className="msg-icon" style={{ background: '#eafaf1' }}>📦</div>
            <div className="msg-body">
              <div className="msg-top">
                <span className="msg-title">Your order has shipped</span>
                <span className="msg-time">9:02 AM</span>
              </div>
              <div className="msg-text">Order #ES20458213 is on its way. Estimated delivery in 3–5 days.</div>
            </div>
            <span className="unread-dot"></span>
          </div>

          <div className="day-label">Yesterday</div>

          <div className="msg-card">
            <div className="msg-icon" style={{ background: '#fff3e6' }}>💰</div>
            <div className="msg-body">
              <div className="msg-top">
                <span className="msg-title">Top up successful</span>
                <span className="msg-time">6:48 PM</span>
              </div>
              <div className="msg-text">$50.00 USDT has been credited to your account balance.</div>
            </div>
          </div>

          <div className="msg-card">
            <div className="msg-icon" style={{ background: '#f1edfd' }}>🏷️</div>
            <div className="msg-body">
              <div className="msg-top">
                <span className="msg-title">New voucher added</span>
                <span className="msg-time">2:15 PM</span>
              </div>
              <div className="msg-text">A $10 store voucher has been added to your account. Valid for 7 days.</div>
            </div>
          </div>

          <div className="msg-card">
            <div className="msg-icon" style={{ background: '#fdeef4' }}>⭐</div>
            <div className="msg-body">
              <div className="msg-top">
                <span className="msg-title">Leave a review</span>
                <span className="msg-time">11:30 AM</span>
              </div>
              <div className="msg-text">How was your Runner Sneakers? Share a quick review and earn 20 points.</div>
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
    --red:#ff4d4f;
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
  .mark-read{ font-size:12.5px; font-weight:600; opacity:0.9; }

  /* ---------- Scroll body ---------- */
  .scroll-area{
    flex:1;
    overflow-y:auto;
    scrollbar-width:none;
    padding:14px 14px 24px;
  }
  .scroll-area::-webkit-scrollbar{ display:none; }

  .msg-card{
    display:flex;
    gap:12px;
    background:var(--card-bg);
    border-radius:16px;
    box-shadow:0 8px 20px rgba(20,40,100,0.07);
    padding:14px;
    margin-bottom:12px;
    position:relative;
  }

  .msg-icon{
    width:42px; height:42px;
    border-radius:12px;
    display:flex; align-items:center; justify-content:center;
    font-size:19px;
    flex-shrink:0;
  }

  .msg-body{ flex:1; min-width:0; }
  .msg-top{
    display:flex;
    justify-content:space-between;
    align-items:flex-start;
    gap:8px;
  }
  .msg-title{
    font-size:13.5px;
    font-weight:700;
    color:var(--navy);
  }
  .msg-time{
    font-size:10.5px;
    color:var(--grey-text);
    white-space:nowrap;
    flex-shrink:0;
  }
  .msg-text{
    font-size:12px;
    color:var(--grey-text);
    margin-top:5px;
    line-height:1.5;
  }
  .unread-dot{
    width:8px; height:8px;
    border-radius:50%;
    background:var(--red);
    position:absolute;
    top:14px; right:14px;
  }

  .day-label{
    font-size:11.5px;
    font-weight:700;
    color:var(--grey-text);
    margin:6px 4px 10px;
    text-transform:uppercase;
    letter-spacing:0.5px;
  }
      `}</style>
    </>
  );
}

export default SiteMessage;
