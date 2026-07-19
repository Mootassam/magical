import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { i18n } from 'src/i18n';
import couponsSelectors from 'src/modules/transaction/transactionSelectors';
import destroyActions from 'src/modules/transaction/destroy/transactionDestroyActions';
import destroySelectors from 'src/modules/transaction/destroy/transactionDestroySelectors';
import actions from 'src/modules/transaction/list/transactionListActions';
import selectors from 'src/modules/transaction/list/transactionListSelectors';
import ConfirmModal from 'src/view/shared/modals/ConfirmModal';
import Spinner from 'src/view/shared/Spinner';
import TableWrapper from 'src/view/shared/styles/TableWrapper';
import Pagination from 'src/view/shared/table/Pagination';
import actionsForm from 'src/modules/transaction/form/transactionFormActions';
import UserListItem from 'src/view/user/list/UserListItem';

function TransactionListTable(props) {
  const fixedType = props.fixedType || null;
  const columnCount = fixedType ? 6 : 7;
  const [recordIdToDestroy, setRecordIdToDestroy] = useState(null);
  const dispatch = useDispatch();

  const findLoading = useSelector(selectors.selectLoading);
  const destroyLoading = useSelector(destroySelectors.selectLoading);
  const loading = findLoading || destroyLoading;
  const rows = useSelector(selectors.selectRows);
  const pagination = useSelector(selectors.selectPagination);
  const hasRows = useSelector(selectors.selectHasRows);
  const sorter = useSelector(selectors.selectSorter);
  
  const hasPermissionToEdit = useSelector(
    couponsSelectors.selectPermissionToEdit,
  );
  const hasPermissionToDestroy = useSelector(
    couponsSelectors.selectPermissionToDestroy,
  );

  const doDestroy = (id) => {
    setRecordIdToDestroy(null);
    dispatch(destroyActions.doDestroy(id));
  };

  const doChangeSort = (field) => {
    const order =
      sorter.field === field && sorter.order === 'ascend'
        ? 'descend'
        : 'ascend';

    dispatch(
      actions.doChangeSort({
        field,
        order,
      }),
    );
  };

  const doChangePagination = (pagination) => {
    dispatch(actions.doChangePagination(pagination));
  };

  const handleStatusChange = (id, newStatus) => {
    let data = {
      status: newStatus,
      id: id
    };
    dispatch(actionsForm.doUpdateStatus(data));
  };

  const getStatusClass = (status) => {
    switch (status) {
      case 'success':
        return 'status-success';
      case 'pending':
        return 'status-pending';
      case 'canceled':
        return 'status-canceled';
      default:
        return 'status-unknown';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'success':
        return 'fas fa-check-circle';
      case 'pending':
        return 'fas fa-clock';
      case 'canceled':
        return 'fas fa-times-circle';
      default:
        return 'fas fa-question-circle';
    }
  };

  const getTypeClass = (type) => {
    switch (type) {
      case 'deposit':
        return 'type-deposit';
      case 'withdraw':
        return 'type-withdraw';
      default:
        return 'type-other';
    }
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case 'deposit':
        return 'fas fa-arrow-down';
      case 'withdraw':
        return 'fas fa-arrow-up';
      default:
        return 'fas fa-exchange-alt';
    }
  };

  const getWalletSymbol = (wallet) => {
    switch (wallet) {
      case 'eth':
        return 'ETH';
      case 'btc':
        return 'BTC';
      case 'usdt_trc20':
      case 'usdt_erc20':
        return 'USDT';
      default:
        return '';
    }
  };

  return (
    <div className="transaction-list-container">
      <TableWrapper>
        <div className="table-responsive">
          <table className="transaction-list-table">
            <thead className="table-header">
              <tr>
                <th 
                  className="sortable-header" 
                  onClick={() => doChangeSort('user')}
                >
                  {i18n('entities.transaction.fields.user')}
                  {sorter.field === 'user' && (
                    <span className="sort-icon">
                      {sorter.order === 'ascend' ? '↑' : '↓'}
                    </span>
                  )}
                </th>
                {!fixedType && (
                  <th
                    className="sortable-header"
                    onClick={() => doChangeSort('type')}
                  >
                    {i18n('entities.transaction.fields.type')}
                    {sorter.field === 'type' && (
                      <span className="sort-icon">
                        {sorter.order === 'ascend' ? '↑' : '↓'}
                      </span>
                    )}
                  </th>
                )}
                <th
                  className="sortable-header text-right" 
                  onClick={() => doChangeSort('amount')}
                >
                  {i18n('entities.transaction.fields.amount')}
                  {sorter.field === 'amount' && (
                    <span className="sort-icon">
                      {sorter.order === 'ascend' ? '↑' : '↓'}
                    </span>
                  )}
                </th>
                <th className="sortable-header">
                  {fixedType === 'withdraw'
                    ? 'Withdrawal Method / Address'
                    : 'Wallet / Proof'}
                </th>
                <th
                  className="sortable-header"
                  onClick={() => doChangeSort('status')}
                >
                  {i18n('entities.transaction.fields.status')}
                  {sorter.field === 'status' && (
                    <span className="sort-icon">
                      {sorter.order === 'ascend' ? '↑' : '↓'}
                    </span>
                  )}
                </th>
                <th 
                  className="sortable-header" 
                  onClick={() => doChangeSort('createdAt')}
                >
                  Date
                  {sorter.field === 'createdAt' && (
                    <span className="sort-icon">
                      {sorter.order === 'ascend' ? '↑' : '↓'}
                    </span>
                  )}
                </th>
                <th className="actions-header transaction-table-actions-header">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="table-body">
              {loading && (
                <tr>
                  <td colSpan={columnCount} className="loading-cell">
                    <div className="loading-container">
                      <Spinner />
                      <span className="loading-text">
                        Loading data...
                      </span>
                    </div>
                  </td>
                </tr>
              )}
              {!loading && !hasRows && (
                <tr>
                  <td colSpan={columnCount} className="no-data-cell">
                    <div className="no-data-content">
                      <i className="fas fa-database no-data-icon"></i>
                      <p>{i18n('table.noData')}</p>
                    </div>
                  </td>
                </tr>
              )}
              {!loading &&
                rows.map((row) => (
                  <tr key={row.id} className="table-row">
                    <td className="table-cell">
                      <div className="transaction-user-cell">
                        {row.user ? (
                          <div className="transaction-user-info">
                            <div className="transaction-user-name">
                              {row.user.fullName || row.user.email}
                            </div>
                            {row.user.email && (
                              <div className="transaction-user-email">{row.user.email}</div>
                            )}
                          </div>
                        ) : (
                          <span className="no-user">No user</span>
                        )}
                      </div>
                    </td>
                    {!fixedType && (
                      <td className="table-cell">
                        <div className={`transaction-type-badge ${getTypeClass(row.type)}`}>
                          <i className={`transaction-type-icon ${getTypeIcon(row.type)}`}></i>
                          <span className="transaction-type-text">
                            {row.type === 'deposit' ? 'Deposit' : row.type === 'withdraw' ? 'Withdraw' : row.type}
                          </span>
                        </div>
                        {row.method && (
                          <div className="transaction-method">{row.method}</div>
                        )}
                      </td>
                    )}
                    <td className="table-cell text-right">
                      <div className={`transaction-amount ${getTypeClass(row.type)}`}>
                        <span className="amount-symbol">
                          {row.type === 'deposit' ? '+' : '-'}
                        </span>
                        <span className="amount-value">${row.amount}</span>
                        {(row.type === 'deposit' || row.type === 'withdraw') && row.wallet && (
                          <span className="amount-currency">USDT</span>
                        )}
                        {row.currency && (
                          <span className="amount-currency">{row.currency}</span>
                        )}
                      </div>
                      {row.coinAmount && (
                        <div className="transaction-coin-amount">
                          {row.type === 'withdraw' ? 'Net: ' : ''}
                          {row.coinAmount} {getWalletSymbol(row.wallet)}
                          {row.exchangeRate && (
                            <span className="transaction-rate">
                              {' '}
                              @ ${row.exchangeRate.toLocaleString()}
                            </span>
                          )}
                        </div>
                      )}
                      {row.feeAmount ? (
                        <div className="transaction-fee">
                          Fee: ${row.feeAmount}
                        </div>
                      ) : row.fee ? (
                        <div className="transaction-fee">
                          Fee: ${row.fee}
                        </div>
                      ) : null}
                    </td>
                    <td className="table-cell">
                      {row.wallet && (
                        <div className="transaction-wallet-badge">
                          {row.wallet.toUpperCase()}
                        </div>
                      )}
                      {row.type === 'withdraw' ? (
                        row.walletAddress ? (
                          <div
                            className="transaction-wallet-address"
                            title={row.walletAddress}
                          >
                            {row.walletAddress}
                          </div>
                        ) : (
                          <span className="no-user">No address</span>
                        )
                      ) : row.photo && row.photo.length > 0 ? (
                        <a
                          className="transaction-proof-link"
                          href={row.photo[0].downloadUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <img
                            className="transaction-proof-thumb"
                            src={row.photo[0].downloadUrl}
                            alt="proof"
                          />
                        </a>
                      ) : (
                        <span className="no-user">No proof</span>
                      )}
                    </td>
                    <td className="table-cell">
                      {row.status === 'pending' ? (
                        <div className="transaction-status-buttons">
                          <button
                            className="status-btn success"
                            onClick={() => handleStatusChange(row.id, 'success')}
                          >
                            <i className="fas fa-check status-btn-icon"></i>
                            Accept
                          </button>
                          <button
                            className="status-btn danger"
                            onClick={() => handleStatusChange(row.id, 'canceled')}
                          >
                            <i className="fas fa-times status-btn-icon"></i>
                            Reject
                          </button>
                        </div>
                      ) : (
                        <div className={`status-badge ${getStatusClass(row.status)}`}>
                          <i className={`status-icon ${getStatusIcon(row.status)}`}></i>
                          <span className="status-text">
                            {row.status === 'success' ? 'Success' : 
                             row.status === 'canceled' ? 'Canceled' : 
                             row.status}
                          </span>
                        </div>
                      )}
                    </td>
                    <td className="table-cell">
                      <div className="transaction-date">
                        <div className="transaction-date-day">
                          {row.createdAt ? new Date(row.createdAt).toLocaleDateString() : '-'}
                        </div>
                        <div className="transaction-date-time">
                          {row.createdAt ? new Date(row.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : ''}
                        </div>
                      </div>
                    </td>
                    <td className="transaction-table-actions">
                      <div className="transaction-table-actions-content">
                        <Link
                          className="transaction-table-action-btn info"
                          to={`/transaction/${row.id}`}
                        >
                          <i className="fas fa-eye transaction-table-action-icon" />
                          View
                        </Link>
                        {hasPermissionToEdit && (
                          <Link
                            className="transaction-table-action-btn primary"
                            to={`/transaction/${row.id}/edit`}
                          >
                            <i className="fas fa-edit transaction-table-action-icon" />
                            Edit
                          </Link>
                        )}
                        {hasPermissionToDestroy && (
                          <button
                            className="transaction-table-action-btn danger"
                            onClick={() => setRecordIdToDestroy(row.id)}
                          >
                            <i className="fas fa-trash transaction-table-action-icon" />
                            Delete
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>

        <div className="pagination-container">
          <Pagination
            onChange={doChangePagination}
            disabled={loading}
            pagination={pagination}
          />
        </div>
      </TableWrapper>

      {recordIdToDestroy && (
        <ConfirmModal
          title={i18n('common.areYouSure')}
          onConfirm={() => doDestroy(recordIdToDestroy)}
          onClose={() => setRecordIdToDestroy(null)}
          okText={i18n('common.yes')}
          cancelText={i18n('common.no')}
        />
      )}

      <style>{`
        .transaction-list-container {
          width: 100%;
        }

        .sort-icon {
          margin-left: 8px;
          font-size: 12px;
        }

        .text-right {
          text-align: right;
        }

        .table-header {
          background: #f8fafc;
          border-bottom: 2px solid #e2e8f0;
        }

        .table-header th {
          padding: 16px 12px;
          font-weight: 600;
          color: #475569;
          font-size: 12px;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          border-bottom: 2px solid #e2e8f0;
        }

        .sortable-header {
          cursor: pointer;
          transition: background-color 0.2s ease;
          user-select: none;
        }

        .sortable-header:hover {
          background: #f1f5f9;
        }

        .table-body {
          background: white;
        }

        .table-row {
          transition: background-color 0.2s ease;
          border-bottom: 1px solid #f1f5f9;
        }

        .table-row:hover {
          background: #f8fafc;
        }

        .table-cell {
          padding: 16px 12px;
          font-size: 14px;
          color: #475569;
          vertical-align: middle;
        }

        .transaction-user-cell {
          display: flex;
          align-items: center;
        }

        .transaction-user-info {
          display: flex;
          flex-direction: column;
          gap: 2px;
        }

        .transaction-user-name {
          font-weight: 500;
          color: #334155;
        }

        .transaction-user-email {
          font-size: 12px;
          color: #64748b;
        }

        .no-user {
          color: #94a3b8;
          font-style: italic;
        }

        .transaction-type-badge {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 5px 10px;
          border-radius: 6px;
          font-size: 12px;
          font-weight: 600;
          border: 1px solid transparent;
        }

        .transaction-type-badge.type-deposit {
          background: #ecfdf3;
          color: #15803d;
          border-color: #bbf7d0;
        }

        .transaction-type-badge.type-withdraw {
          background: #fef2f2;
          color: #b91c1c;
          border-color: #fecaca;
        }

        .transaction-type-badge.type-other {
          background: #f1f5f9;
          color: #475569;
          border-color: #e2e8f0;
        }

        .transaction-type-icon {
          font-size: 10px;
        }

        .transaction-method {
          font-size: 12px;
          color: #64748b;
          margin-top: 4px;
        }

        .transaction-amount {
          font-weight: 700;
          font-size: 15px;
          display: flex;
          align-items: baseline;
          justify-content: flex-end;
          gap: 2px;
        }

        .transaction-amount.type-deposit {
          color: #15803d;
        }

        .transaction-amount.type-withdraw {
          color: #b91c1c;
        }

        .transaction-amount.type-other {
          color: #334155;
        }

        .amount-symbol {
          font-size: 13px;
        }

        .amount-value {
          font-weight: 700;
        }

        .amount-currency {
          font-size: 11px;
          font-weight: 500;
          color: #94a3b8;
          margin-left: 2px;
        }

        .transaction-coin-amount {
          font-size: 11.5px;
          font-weight: 500;
          color: #64748b;
          margin-top: 3px;
          text-align: right;
        }

        .transaction-rate {
          font-size: 11px;
          font-weight: 400;
          color: #94a3b8;
        }

        .transaction-fee {
          font-size: 11px;
          color: #94a3b8;
          margin-top: 2px;
          text-align: right;
        }

        .transaction-wallet-badge {
          display: inline-block;
          padding: 3px 9px;
          border-radius: 6px;
          font-size: 10.5px;
          font-weight: 700;
          letter-spacing: 0.03em;
          background: #f1f5f9;
          color: #475569;
          border: 1px solid #e2e8f0;
          margin-bottom: 6px;
        }

        .transaction-proof-link {
          display: inline-block;
        }

        .transaction-proof-thumb {
          width: 40px;
          height: 40px;
          object-fit: cover;
          border-radius: 6px;
          border: 1px solid #e2e8f0;
        }

        .transaction-wallet-address {
          font-size: 11px;
          font-family: monospace;
          color: #334155;
          max-width: 160px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }

        .transaction-status-buttons {
          display: flex;
          gap: 8px;
          justify-content: center;
        }

        .status-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 4px;
          padding: 6px 12px;
          border: 1px solid transparent;
          border-radius: 6px;
          font-size: 11px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .status-btn:hover {
          filter: brightness(0.97);
        }

        .status-btn.success {
          background: #ecfdf3;
          color: #15803d;
          border-color: #bbf7d0;
        }

        .status-btn.danger {
          background: #fef2f2;
          color: #b91c1c;
          border-color: #fecaca;
        }

        .status-btn-icon {
          font-size: 10px;
        }

        .status-badge {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 5px 10px;
          border-radius: 6px;
          font-size: 12px;
          font-weight: 600;
          border: 1px solid transparent;
        }

        .status-success {
          background: #ecfdf3;
          color: #15803d;
          border-color: #bbf7d0;
        }

        .status-pending {
          background: #fffbeb;
          color: #b45309;
          border-color: #fde68a;
        }

        .status-canceled {
          background: #fef2f2;
          color: #b91c1c;
          border-color: #fecaca;
        }

        .status-unknown {
          background: #f1f5f9;
          color: #475569;
          border-color: #e2e8f0;
        }

        .status-icon {
          font-size: 10px;
        }

        .status-text {
          text-transform: capitalize;
        }

        .transaction-date {
          display: flex;
          flex-direction: column;
          gap: 2px;
        }

        .transaction-date-day {
          font-weight: 500;
          color: #334155;
        }

        .transaction-date-time {
          font-size: 12px;
          color: #64748b;
        }

        .loading-cell {
          text-align: center;
          padding: 40px !important;
        }

        .loading-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 12px;
        }

        .loading-text {
          color: #6c757d;
          font-size: 14px;
        }

        .no-data-cell {
          text-align: center;
          padding: 60px 20px !important;
        }

        .no-data-content {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 12px;
          color: #6c757d;
        }

        .no-data-icon {
          font-size: 48px;
          color: #adb5bd;
        }

        .no-data-content p {
          margin: 0;
          font-size: 14px;
        }

        .actions-header {
          width: 200px;
        }

        .transaction-table-actions-header {
          background: #f8fafc;
        }

        .transaction-table-actions {
          position: sticky;
          right: 0;
          background: white;
          z-index: 10;
          min-width: 200px;
          white-space: nowrap;
          box-shadow: -2px 0 8px rgba(0,0,0,0.06);
          border-left: 2px solid #f1f5f9;
        }
        
        .transaction-table-actions-content {
          display: flex;
          align-items: center;
          gap: 6px;
          flex-wrap: nowrap;
          padding: 8px;
        }
        
        .transaction-table-action-btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          padding: 6px 10px;
          border: 1px solid transparent;
          border-radius: 6px;
          font-size: 11px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.15s ease;
          text-decoration: none;
          min-width: auto;
          white-space: nowrap;
        }

        .transaction-table-action-btn:hover {
          filter: brightness(0.97);
        }

        .transaction-table-action-btn.primary {
          background: #f5f3ff;
          color: #6d28d9;
          border-color: #ddd6fe;
        }

        .transaction-table-action-btn.success {
          background: #ecfdf3;
          color: #15803d;
          border-color: #bbf7d0;
        }

        .transaction-table-action-btn.warning {
          background: #fff7ed;
          color: #c2410c;
          border-color: #fed7aa;
        }

        .transaction-table-action-btn.danger {
          background: #fef2f2;
          color: #b91c1c;
          border-color: #fecaca;
        }

        .transaction-table-action-btn.info {
          background: #eff6ff;
          color: #1d4ed8;
          border-color: #bfdbfe;
        }

        .transaction-table-action-icon {
          margin-right: 4px;
          font-size: 10px;
          width: 10px;
        }

        /* Pagination Styles */
        .pagination-container {
          margin-top: 20px;
          display: flex;
          justify-content: center;
        }

        /* Responsive */
        @media (max-width: 768px) {
          .transaction-table-actions-content {
            flex-direction: column;
            align-items: stretch;
          }
          
          .transaction-table-action-btn {
            justify-content: center;
            padding: 8px 12px;
          }
          
          .transaction-table-actions {
            min-width: 150px;
          }
          
          .table-header th {
            padding: 12px 8px;
            font-size: 10px;
          }
          
          .table-cell {
            padding: 12px 8px;
            font-size: 12px;
          }
          
          .transaction-status-buttons {
            flex-direction: column;
            gap: 4px;
          }
          
          .status-btn {
            padding: 4px 8px;
            font-size: 10px;
          }
          
          .transaction-amount {
            font-size: 14px;
          }
          
          .transaction-type-badge {
            padding: 4px 8px;
            font-size: 10px;
          }
          
          .transaction-date-day {
            font-size: 12px;
          }
          
          .transaction-date-time {
            font-size: 10px;
          }
        }
      `}</style>
    </div>
  );
}

export default TransactionListTable;