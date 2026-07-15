import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import transactionListActions from "src/modules/transaction/list/transactionListActions";
import transactionListSelectors from "src/modules/transaction/list/transactionListSelectors";
import Nodata from "src/view/shared/Nodata";
import RecordListSkeleton, {
  SummarySkeleton,
} from "src/view/pages/Estore/shared/RecordListSkeleton";

const WALLET_LABELS = {
  eth: "ETH",
  btc: "BTC",
  usdt_trc20: "USDT-TRC20",
  usdt_erc20: "USDT-ERC20",
};

const STATUS_CONFIG = {
  success: { className: "completed", label: "Completed" },
  pending: { className: "processing", label: "Processing" },
  canceled: { className: "failed", label: "Canceled" },
};

function WithdrawalRecord() {
  const dispatch = useDispatch();
  const loading = useSelector(transactionListSelectors.selectLoading);
  const rows = useSelector(transactionListSelectors.selectRows);
  const count = useSelector(transactionListSelectors.selectCount);
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    let mounted = true;

    (async () => {
      dispatch({
        type: transactionListActions.PAGINATION_CHANGED,
        payload: { current: 1, pageSize: 50 },
      });
      await dispatch(
        transactionListActions.doFetchByUser(
          { type: "withdraw" },
          { type: "withdraw" },
        ),
      );
      if (mounted) {
        setInitialized(true);
      }
    })();

    return () => {
      mounted = false;
    };
  }, [dispatch]);

  const showSkeleton = !initialized || loading;

  const totalWithdrawn = rows
    .filter((row) => row.status === "success")
    .reduce((sum, row) => sum + (Number(row.amount) || 0), 0);

  const processingCount = rows.filter(
    (row) => row.status === "pending",
  ).length;

  const groups = rows.reduce((acc, row) => {
    const day = moment(row.createdAt).format("MMMM DD, YYYY");
    acc[day] = acc[day] || [];
    acc[day].push(row);
    return acc;
  }, {} as Record<string, any[]>);

  return (
    <>
      <div className="phone">

        <div className="page-header">
          <button className="back-btn" onClick={() => window.history.back()}>←</button>
          <span className="page-title">Withdrawal Record</span>
        </div>

        <div className="summary-strip">
          {showSkeleton ? (
            <SummarySkeleton />
          ) : (
            <>
              <div className="summary-item">
                <div className="summary-value">${totalWithdrawn.toFixed(2)}</div>
                <div className="summary-label">Total Withdrawn</div>
              </div>
              <div className="summary-item">
                <div className="summary-value">{count}</div>
                <div className="summary-label">Transactions</div>
              </div>
              <div className="summary-item">
                <div className="summary-value">{processingCount}</div>
                <div className="summary-label">Processing</div>
              </div>
            </>
          )}
        </div>

        <div className="scroll-area">

          {showSkeleton && <RecordListSkeleton />}

          {!showSkeleton && rows.length === 0 && <Nodata />}

          {!showSkeleton &&
            Object.keys(groups).map((day) => (
              <div key={day}>
                <div className="day-label">{day}</div>

                {groups[day].map((row) => {
                  const status =
                    STATUS_CONFIG[row.status] || STATUS_CONFIG.pending;

                  return (
                    <div className="record-card" key={row.id}>
                      <div className="record-top">
                        <div>
                          <div className="record-id">ID: {row.id}</div>
                          <div className="record-time">
                            Time: {moment(row.createdAt).format("YYYY-MM-DD HH:mm:ss")}
                          </div>
                        </div>
                        <div className="record-right">
                          <div className="record-amount">-${Number(row.amount).toFixed(2)}</div>
                          <div className="record-method">
                            {WALLET_LABELS[row.wallet] || row.wallet || "-"}
                          </div>
                        </div>
                      </div>
                      <div className="record-bottom">
                        <span className={`status-pill ${status.className}`}>
                          {status.label}
                        </span>
                        {row.status === "canceled" && (
                          <span className="fee-note">Refunded to balance</span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            ))}

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

        .loading-text{
          text-align:center;
          color:var(--grey-text);
          font-size:12.5px;
          padding:30px 0;
        }

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
        .record-id{ font-size:11.5px; color:var(--grey-text); word-break:break-all; max-width:180px; }
        .record-time{ font-size:11px; color:var(--grey-text); margin-top:3px; }

        .record-right{ text-align:right; flex-shrink:0; }
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
