import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import transactionListActions from "src/modules/transaction/list/transactionListActions";
import transactionListSelectors from "src/modules/transaction/list/transactionListSelectors";
import Nodata from "src/view/shared/Nodata";
import RecordListSkeleton, { SummarySkeleton } from "src/view/pages/Estore/shared/RecordListSkeleton";
import MineShell from "./MineShell";
import { sharedMineStyles } from "./MyAccount";
import { recordListStyles } from "./DepositRecord";

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
      await dispatch(transactionListActions.doFetchByUser({ type: "withdraw" }, { type: "withdraw" }) as any);
      if (mounted) setInitialized(true);
    })();
    return () => {
      mounted = false;
    };
  }, [dispatch]);

  const showSkeleton = !initialized || loading;

  const totalWithdrawn = rows
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
    <MineShell active="withdrawal-record">
      <h1 className="pc-mine__page-title">Withdrawal Record</h1>

      <div className="pc-card summary-strip">
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
                        <div className="record-amount">-${Number(row.amount).toFixed(2)}</div>
                        <div className="record-method">{WALLET_LABELS[row.wallet] || row.wallet || "-"}</div>
                      </div>
                    </div>
                    <div className="record-bottom">
                      <span className={`status-pill ${status.className}`}>{status.label}</span>
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

export default WithdrawalRecord;
