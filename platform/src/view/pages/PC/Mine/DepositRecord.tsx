import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import transactionListActions from "src/modules/transaction/list/transactionListActions";
import transactionListSelectors from "src/modules/transaction/list/transactionListSelectors";
import Nodata from "src/view/shared/Nodata";
import RecordListSkeleton, { SummarySkeleton } from "src/view/pages/Estore/shared/RecordListSkeleton";
import MineShell from "./MineShell";
import { sharedMineStyles } from "./MyAccount";

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

function DepositRecord() {
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
      await dispatch(transactionListActions.doFetchByUser({ type: "deposit" }, { type: "deposit" }) as any);
      if (mounted) setInitialized(true);
    })();
    return () => {
      mounted = false;
    };
  }, [dispatch]);

  const showSkeleton = !initialized || loading;

  const totalDeposited = rows
    .filter((row: any) => row.status === "success")
    .reduce((sum: number, row: any) => sum + (Number(row.amount) || 0), 0);

  const processingCount = rows.filter((row: any) => row.status === "pending").length;

  const groups = rows.reduce((acc: Record<string, any[]>, row: any) => {
    const day = moment(row.createdAt).format("MMMM DD, YYYY");
    acc[day] = acc[day] || [];
    acc[day].push(row);
    return acc;
  }, {} as Record<string, any[]>);

  return (
    <MineShell active="deposit-record">
      <h1 className="pc-mine__page-title">Deposit Record</h1>

      <div className="pc-card summary-strip">
        {showSkeleton ? (
          <SummarySkeleton />
        ) : (
          <>
            <div className="summary-item">
              <div className="summary-value">${totalDeposited.toFixed(2)}</div>
              <div className="summary-label">Total Deposited</div>
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

      <div className="pc-card pc-mine__record-panel">
        {showSkeleton && <RecordListSkeleton />}
        {!showSkeleton && rows.length === 0 && <Nodata />}

        {!showSkeleton &&
          Object.keys(groups).map((day) => (
            <div key={day}>
              <div className="day-label">{day}</div>
              {groups[day].map((row: any) => {
                const status = STATUS_CONFIG[row.status] || STATUS_CONFIG.pending;
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
                        <div className="record-amount">+${Number(row.amount).toFixed(2)}</div>
                        <div className="record-method">{WALLET_LABELS[row.wallet] || row.wallet || "-"}</div>
                      </div>
                    </div>
                    <div className="record-bottom">
                      <span className={`status-pill ${status.className}`}>{status.label}</span>
                      {row.photo && row.photo.length > 0 && (
                        <a className="proof-link" href={row.photo[0].downloadUrl} target="_blank" rel="noopener noreferrer">
                          View proof
                        </a>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          ))}
      </div>

      <style>{sharedMineStyles}</style>
      <style>{recordListStyles}</style>
    </MineShell>
  );
}

export const recordListStyles = `
  .summary-strip {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    padding: 20px;
    margin-bottom: 20px;
  }

  .summary-item {
    text-align: center;
  }

  .summary-value {
    font-size: 18px;
    font-weight: 800;
    color: var(--pc-text);
  }

  .summary-label {
    font-size: 12px;
    color: var(--pc-text-muted);
    margin-top: 4px;
  }

  .pc-mine__record-panel {
    padding: 8px 24px 20px;
  }

  .day-label {
    font-size: 12px;
    font-weight: 700;
    color: var(--pc-text-muted);
    text-transform: uppercase;
    letter-spacing: 0.4px;
    padding: 16px 0 8px;
  }

  .record-card {
    padding: 16px 0;
    border-bottom: 1px solid var(--pc-divider);
  }

  .record-top {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    margin-bottom: 10px;
  }

  .record-id {
    font-size: 12.5px;
    font-weight: 700;
    color: var(--pc-text);
  }

  .record-time {
    font-size: 11.5px;
    color: var(--pc-text-muted);
    margin-top: 3px;
  }

  .record-right {
    text-align: right;
  }

  .record-amount {
    font-size: 15px;
    font-weight: 800;
    color: var(--pc-primary-dark);
  }

  .record-method {
    font-size: 11.5px;
    color: var(--pc-text-muted);
    margin-top: 3px;
  }

  .record-bottom {
    display: flex;
    align-items: center;
    gap: 14px;
  }

  .status-pill {
    font-size: 11px;
    font-weight: 700;
    padding: 4px 11px;
    border-radius: 999px;
  }

  .status-pill.completed { background: #E9F9EF; color: #1DA750; }
  .status-pill.processing { background: #FEF5E7; color: #D08609; }
  .status-pill.failed { background: #FCE9E9; color: #DC2626; }

  .proof-link {
    font-size: 12px;
    font-weight: 600;
    color: var(--pc-primary);
    text-decoration: none;
  }

  .proof-link:hover {
    text-decoration: underline;
  }
`;

export default DepositRecord;
