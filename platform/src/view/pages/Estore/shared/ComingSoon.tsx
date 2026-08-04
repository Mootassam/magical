import React from "react";

function ComingSoon({ title, icon }: { title: string; icon: string }) {
  return (
    <>
      <div className="phone">

        <div className="page-header">
          <button className="back-btn" onClick={() => window.history.back()}>←</button>
          <span className="page-title">{title}</span>
        </div>

        <div className="scroll-area">
          <div className="empty-icon">{icon}</div>
          <div className="empty-title">{title}</div>
          <div className="empty-sub">This section is coming soon.</div>
        </div>

      </div>

      <style>{`
        :root{
          --navy:#111111;
          --blue-bright:#D1451F;
          --blue-mid:#B93C1A;
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

        .scroll-area{
          flex:1;
          overflow-y:auto;
          display:flex;
          flex-direction:column;
          align-items:center;
          justify-content:center;
          text-align:center;
          padding:40px 30px;
        }
        .empty-icon{ font-size:52px; margin-bottom:18px; }
        .empty-title{ font-size:16px; font-weight:800; color:var(--navy); }
        .empty-sub{ font-size:13px; color:var(--grey-text); margin-top:8px; }
      `}</style>
    </>
  );
}

export default ComingSoon;
