import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import authSelectors from "src/modules/auth/authSelectors";

function Balance() {
  const currentUser = useSelector(authSelectors.selectCurrentUser);
  const [hidden, setHidden] = useState(false);

  const totalBalance = currentUser?.balance || 0;
  const frozenBalance = currentUser?.freezeblance || 0;
  const availableBalance = totalBalance - frozenBalance;

  const format = (value) => (hidden ? "••••••" : `$${value.toFixed(2)}`);

  return (
    <>
      <div className="phone">

        <div className="page-header">
          <button className="back-btn" onClick={() => window.history.back()}>←</button>
          <span className="page-title">My Balance</span>
        </div>

        <div className="scroll-area">

          <div className="balance-card">
            <div className="card-title-row">
              <span className="card-title">Total Balance</span>
              <span
                className="eye-toggle"
                onClick={() => setHidden(!hidden)}
              >
                {hidden ? "🙈" : "👁"}
              </span>
            </div>

            <div className="balance-split">
              <div className="balance-block">
                <div className="lbl">Account Balance</div>
                <div className="val">{format(totalBalance)}</div>
              </div>
              <div className="balance-block">
                <div className="lbl">Available balance</div>
                <div className="val">{format(availableBalance)}</div>
              </div>
            </div>

            <div className="action-row">
              <Link to="/topup" className="btn btn-primary">⬆ Top up</Link>
              <Link to="/withdrawal" className="btn btn-outline">⬇ Withdrawal</Link>
            </div>
          </div>

          <div className="quick-links">
            <Link to="/recharge-record" className="ql-item">
              <div className="ql-icon" style={{ background: '#E9F9EF' }}>🧾</div>
              <div className="ql-label">Recharge<br />record</div>
            </Link>
            <Link to="/withdrawal-record" className="ql-item">
              <div className="ql-icon" style={{ background: '#FEF5E7' }}>📤</div>
              <div className="ql-label">Withdrawals<br />record</div>
            </Link>
            <Link to="/wallet-management" className="ql-item">
              <div className="ql-icon" style={{ background: '#E9EFFD' }}>👛</div>
              <div className="ql-label">Wallet<br />management</div>
            </Link>
            <Link to="/bank-card-management" className="ql-item">
              <div className="ql-icon" style={{ background: '#E7E7E7' }}>💳</div>
              <div className="ql-label">Bank card<br />management</div>
            </Link>
          </div>

          <div className="hint">Available balance can be used for purchases and withdrawn to your linked bank account.</div>

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

        /* ---------- Balance hero card ---------- */
        .balance-card{
          margin:18px 16px 0;
          border-radius:22px;
          padding:22px 20px;
          background:linear-gradient(135deg, #7F2B15 0%, #B93C1A 55%, #D1451F 100%);
          color:#fff;
          box-shadow:0 16px 36px rgba(0,0,0,0.28);
          position:relative;
          overflow:hidden;
        }
        .balance-card::after{
          content:"";
          position:absolute;
          right:-40px; top:-40px;
          width:160px; height:160px;
          border-radius:50%;
          background:rgba(255,255,255,0.08);
        }
        .balance-card::before{
          content:"";
          position:absolute;
          right:20px; bottom:-50px;
          width:120px; height:120px;
          border-radius:50%;
          background:rgba(255,255,255,0.06);
        }

        .card-title-row{
          display:flex;
          justify-content:space-between;
          align-items:center;
          position:relative;
          z-index:2;
        }
        .card-title{ font-size:14px; font-weight:700; opacity:0.9; }
        .eye-toggle{ font-size:15px; opacity:0.85; cursor:pointer; }

        .balance-split{
          display:flex;
          gap:26px;
          margin-top:18px;
          position:relative;
          z-index:2;
        }
        .balance-block .lbl{ font-size:11.5px; opacity:0.8; }
        .balance-block .val{ font-size:26px; font-weight:800; margin-top:4px; }
        .balance-block.small .val{ font-size:20px; }

        .action-row{
          display:flex;
          gap:12px;
          margin-top:22px;
          position:relative;
          z-index:2;
        }
        .btn{
          flex:1;
          text-align:center;
          padding:12px;
          border-radius:12px;
          font-size:14px;
          font-weight:700;
          cursor:pointer;
          text-decoration:none;
        }
        .btn-primary{
          background:#fff;
          color:var(--blue-deep);
          box-shadow:0 8px 18px rgba(0,0,0,0.15);
        }
        .btn-outline{
          background:rgba(255,255,255,0.12);
          border:1.5px solid rgba(255,255,255,0.6);
          color:#fff;
        }

        /* ---------- Quick links ---------- */
        .quick-links{
          display:flex;
          justify-content:space-between;
          margin:18px 16px 0;
          background:var(--card-bg);
          border-radius:18px;
          box-shadow:0 8px 20px rgba(0,0,0,0.07);
          padding:16px 8px;
        }
        .ql-item{
          flex:1;
          display:flex;
          flex-direction:column;
          align-items:center;
          gap:8px;
          text-decoration:none;
          color:inherit;
        }
        .ql-icon{
          width:42px; height:42px;
          border-radius:12px;
          display:flex; align-items:center; justify-content:center;
          font-size:19px;
        }
        .ql-label{ font-size:11px; font-weight:600; color:var(--navy); text-align:center; }

        .hint{
          margin:16px 16px 0;
          font-size:11.5px;
          color:var(--grey-text);
          text-align:center;
          line-height:1.5;
        }
      `}</style>
    </>
  );
}

export default Balance;
