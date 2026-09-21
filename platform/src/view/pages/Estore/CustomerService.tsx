import React from "react";
import useTawkChat from "src/view/shared/hooks/useTawkChat";

// The div Tawk.to renders the chat into instead of its default floating
// corner bubble - see useTawkChat.
const TAWK_CONTAINER_ID = "tawk-chat-embed";

function CustomerService() {
  useTawkChat(TAWK_CONTAINER_ID);

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
          <div id={TAWK_CONTAINER_ID} className="tawk-embed">
            <div className="empty-state">
              Our support team will get back to you shortly.
            </div>
          </div>
        </div>

      </div>

      <style>{`
  :root{
    --navy:#111111;
    --blue-bright:#D1451F;
    --blue-deep:#7F2B15;
    --page-bg:#FAFAFA;
    --grey-text:#555555;
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
    display:flex;
    flex-direction:column;
  }
  .scroll-area::-webkit-scrollbar{ display:none; }

  .tawk-embed{
    flex:1;
    display:flex;
    flex-direction:column;
    min-height:100%;
  }

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
