import React from "react";

function MyAccount() {
  return (
    <>
      <div className="phone">

        <div className="page-header">
          <button className="back-btn" onClick={() => window.history.back()}>←</button>
          <span className="page-title">My account</span>
        </div>

        <div className="scroll-area">
          <div className="account-card">

            <div className="account-row">
              <div className="row-left">
                <span className="row-label">Username</span>
                <span className="row-value">kelvin_Rouge</span>
              </div>
            </div>

            <div className="account-row">
              <div className="row-left">
                <span className="row-label">ID</span>
                <span className="row-value">61909941</span>
              </div>
            </div>

            <div className="account-row">
              <div className="row-left">
                <span className="row-label">Phone number</span>
                <span className="row-value">74****74</span>
              </div>
              <div className="row-action">To modify <span className="chev">›</span></div>
            </div>

            <div className="account-row">
              <div className="row-left">
                <span className="row-label">Mail</span>
                <span className="row-value">Not bound</span>
              </div>
              <div className="row-action">Go to binding <span className="chev">›</span></div>
            </div>

            <div className="account-row">
              <div className="row-left">
                <span className="row-label">Login password</span>
                <span className="row-value">••••••</span>
              </div>
              <div className="row-action">To modify <span className="chev">›</span></div>
            </div>

            <div className="account-row">
              <div className="row-left">
                <span className="row-label">Transaction password</span>
                <span className="row-value">••••••</span>
              </div>
              <div className="row-action">To modify <span className="chev">›</span></div>
            </div>

          </div>

          <div className="hint">Keep your account secure — never share your password or verification codes with anyone.</div>
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

        /* ---------- Scroll body ---------- */
        .scroll-area{
          flex:1;
          overflow-y:auto;
          scrollbar-width:none;
          padding-bottom:20px;
        }
        .scroll-area::-webkit-scrollbar{ display:none; }

        .account-card{
          background:var(--card-bg);
          margin:16px;
          border-radius:18px;
          box-shadow:0 8px 20px rgba(20,40,100,0.07);
          overflow:hidden;
        }

        .account-row{
          display:flex;
          align-items:center;
          justify-content:space-between;
          padding:16px;
          border-top:1px solid var(--grey-light);
        }
        .account-row:first-child{ border-top:none; }

        .row-left{ display:flex; flex-direction:column; gap:4px; }
        .row-label{ font-size:11.5px; color:var(--grey-text); }
        .row-value{ font-size:14px; font-weight:700; color:var(--navy); }

        .row-action{
          display:flex;
          align-items:center;
          gap:4px;
          font-size:13px;
          font-weight:700;
          color:var(--blue-mid);
        }
        .row-action .chev{ font-size:13px; color:#9fb3e0; }

        .hint{
          margin:14px 16px 0;
          font-size:11.5px;
          color:var(--grey-text);
          text-align:center;
          line-height:1.5;
        }
      `}</style>
    </>
  );
}

export default MyAccount;
