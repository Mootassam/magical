import React from "react";

function WithdrawalRecord() {
  return (
    <>
      <div className="phone">

        <div className="page-header">
          <button className="back-btn" onClick={() => window.history.back()}>←</button>
          <span className="page-title">Withdrawal Record</span>
        </div>

        <div className="summary-strip">
          <div className="summary-item">
            <div className="summary-value">$15,269.89</div>
            <div className="summary-label">Total Withdrawn</div>
          </div>
          <div className="summary-item">
            <div className="summary-value">6</div>
            <div className="summary-label">Transactions</div>
          </div>
          <div className="summary-item">
            <div className="summary-value">1</div>
            <div className="summary-label">Processing</div>
          </div>
        </div>

        <div className="scroll-area">

          <div className="day-label">June 04, 2025</div>

          <div className="record-card">
            <div className="record-top">
              <div>
                <div className="record-id">ID: 2025060321230500037</div>
                <div className="record-time">Time: 2025-06-04 05:23:05</div>
              </div>
              <div className="record-right">
                <div className="record-amount">-$12,997.42</div>
                <div className="record-method">USDT-TRC20</div>
              </div>
            </div>
            <div className="record-bottom">
              <span className="status-pill processing">Processing</span>
              <span className="fee-note">Fee: $2.58</span>
            </div>
          </div>

          <div className="record-card">
            <div className="record-top">
              <div>
                <div className="record-id">ID: 2025060218450000091</div>
                <div className="record-time">Time: 2025-06-02 18:45:00</div>
              </div>
              <div className="record-right">
                <div className="record-amount">-$3,150.00</div>
                <div className="record-method">USDT-TRC20</div>
              </div>
            </div>
            <div className="record-bottom">
              <span className="status-pill completed">Completed</span>
              <span className="fee-note">Fee: $1.00</span>
            </div>
          </div>

          <div className="day-label">May 29, 2025</div>

          <div className="record-card">
            <div className="record-top">
              <div>
                <div className="record-id">ID: 2025052913200000074</div>
                <div className="record-time">Time: 2025-05-29 13:20:00</div>
              </div>
              <div className="record-right">
                <div className="record-amount">-$980.50</div>
                <div className="record-method">USDT-TRC20</div>
              </div>
            </div>
            <div className="record-bottom">
              <span className="status-pill completed">Completed</span>
              <span className="fee-note">Fee: $1.00</span>
            </div>
          </div>

          <div className="record-card">
            <div className="record-top">
              <div>
                <div className="record-id">ID: 2025052909100000063</div>
                <div className="record-time">Time: 2025-05-29 09:10:00</div>
              </div>
              <div className="record-right">
                <div className="record-amount">-$4,500.00</div>
                <div className="record-method">USDT-TRC20</div>
              </div>
            </div>
            <div className="record-bottom">
              <span className="status-pill failed">Failed</span>
              <span className="fee-note">Refunded to balance</span>
            </div>
          </div>

          <div className="day-label">May 24, 2025</div>

          <div className="record-card">
            <div className="record-top">
              <div>
                <div className="record-id">ID: 2025052416400000048</div>
                <div className="record-time">Time: 2025-05-24 16:40:00</div>
              </div>
              <div className="record-right">
                <div className="record-amount">-$1,640.00</div>
                <div className="record-method">USDT-TRC20</div>
              </div>
            </div>
            <div className="record-bottom">
              <span className="status-pill completed">Completed</span>
              <span className="fee-note">Fee: $1.00</span>
            </div>
          </div>

          <div className="record-card">
            <div className="record-top">
              <div>
                <div className="record-id">ID: 2025052410050000031</div>
                <div className="record-time">Time: 2025-05-24 10:05:00</div>
              </div>
              <div className="record-right">
                <div className="record-amount">-$1,999.97</div>
                <div className="record-method">USDT-TRC20</div>
              </div>
            </div>
            <div className="record-bottom">
              <span className="status-pill completed">Completed</span>
              <span className="fee-note">Fee: $1.00</span>
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
          --green:#12b886;
          --amber:#ffb020;
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

        /* ---------- Summary strip ---------- */
        .summary-strip{
          display:flex;
          background:#fff;
          flex-shrink:0;
          box-shadow:0 4px 12px rgba(20,40,100,0.05);
          padding:14px 10px;
        }
        .summary-item{ flex:1; text-align:center; border-right:1px solid var(--grey-light); }
        .summary-item:last-child{ border-right:none; }
        .summary-value{ font-size:15px; font-weight:800; color:var(--navy); }
        .summary-label{ font-size:10.5px; color:var(--grey-text); margin-top:3px; }

        /* ---------- Scroll body ---------- */
        .scroll-area{
          flex:1;
          overflow-y:auto;
          scrollbar-width:none;
          padding:14px 14px 24px;
        }
        .scroll-area::-webkit-scrollbar{ display:none; }

        .day-label{
          font-size:11.5px;
          font-weight:700;
          color:var(--grey-text);
          margin:4px 4px 10px;
          text-transform:uppercase;
          letter-spacing:0.5px;
        }

        .record-card{
          background:var(--card-bg);
          border-radius:14px;
          box-shadow:0 8px 20px rgba(20,40,100,0.06);
          padding:14px;
          margin-bottom:12px;
        }

        .record-top{
          display:flex;
          justify-content:space-between;
          align-items:flex-start;
        }
        .record-id{ font-size:11.5px; color:var(--grey-text); }
        .record-time{ font-size:11px; color:var(--grey-text); margin-top:3px; }

        .record-right{ text-align:right; }
        .record-amount{ font-size:15px; font-weight:800; color:var(--red); }
        .record-method{ font-size:10.5px; color:var(--grey-text); margin-top:3px; }

        .record-bottom{
          display:flex;
          justify-content:space-between;
          align-items:center;
          margin-top:10px;
          padding-top:10px;
          border-top:1px solid var(--grey-light);
        }
        .status-pill{
          font-size:10.5px;
          font-weight:700;
          padding:4px 10px;
          border-radius:8px;
        }
        .status-pill.completed{ background:#e8f9f1; color:var(--green); }
        .status-pill.processing{ background:#fff6e5; color:#c98a08; }
        .status-pill.failed{ background:#ffeaea; color:var(--red); }

        .fee-note{ font-size:10.5px; color:var(--grey-text); }
      `}</style>
    </>
  );
}

export default WithdrawalRecord;
