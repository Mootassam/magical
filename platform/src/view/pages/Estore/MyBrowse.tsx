import React from "react";
import { useHistory } from "react-router-dom";

function MyBrowse() {
  const history = useHistory();

  return (
    <>
      <div className="phone">

        <div className="page-header">
          <button className="back-btn" onClick={() => window.history.back()}>←</button>
          <span className="page-title">Browses</span>
        </div>

        <div className="content-area">
          <h1 className="page-heading">My Browse</h1>
          <div className="page-subtitle">Products you've recently viewed</div>

          <div className="empty-card">
            <div className="empty-icon">‹</div>
            <div className="empty-title">No browsing history yet</div>
            <button className="cta-btn" onClick={() => history.push("/classification")}>
              Start Shopping
            </button>
          </div>
        </div>

      </div>

      <style>{`
        :root{
          --navy:#0e1b45;
          --blue-bright:#2f8dff;
          --blue-deep:#0b3fae;
          --purple:#6c2bd9;
          --grey-text:#6b7590;
          --grey-light:#eef2fa;
          --border:#eceff5;
        }

        *{box-sizing:border-box; margin:0; padding:0;}

        body{
          font-family:'Segoe UI', Roboto, Arial, sans-serif;
          background:#fff;
          margin:0;
        }

        .phone{
          width:390px;
          max-width:390px;
          height:100vh;
          background:#fff;
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

        .content-area{
          flex:1;
          overflow-y:auto;
          scrollbar-width:none;
          padding:20px 20px 30px;
        }
        .content-area::-webkit-scrollbar{ display:none; }
        .page-heading{
          font-size:24px;
          font-weight:800;
          color:var(--navy);
        }
        .page-subtitle{
          margin-top:4px;
          padding-bottom:16px;
          font-size:13.5px;
          color:var(--grey-text);
          border-bottom:1px solid var(--border);
        }

        .empty-card{
          margin-top:40px;
          display:flex;
          flex-direction:column;
          align-items:center;
          text-align:center;
          padding:20px 24px 0;
        }
        .empty-icon{
          width:72px; height:72px;
          border-radius:50%;
          background:var(--grey-light);
          color:#b7c0d8;
          display:flex;
          align-items:center;
          justify-content:center;
          font-size:30px;
          font-weight:300;
          margin-bottom:24px;
        }
        .empty-title{
          font-size:15px;
          font-weight:600;
          color:var(--grey-text);
        }
        .cta-btn{
          margin-top:24px;
          border:none;
          border-radius:24px;
          padding:14px 32px;
          background:var(--purple);
          color:#fff;
          font-size:14px;
          font-weight:700;
          cursor:pointer;
          width:100%;
          max-width:260px;
        }
      `}</style>
    </>
  );
}

export default MyBrowse;
