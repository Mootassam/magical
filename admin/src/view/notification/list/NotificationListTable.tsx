import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { i18n } from 'src/i18n';
import notificationSelectors from 'src/modules/notification/notificationSelectors';
import destroyActions from 'src/modules/notification/destroy/notificationDestroyActions';
import destroySelectors from 'src/modules/notification/destroy/notificationDestroySelectors';
import actions from 'src/modules/notification/list/notificationListActions';
import selectors from 'src/modules/notification/list/notificationListSelectors';
import ConfirmModal from 'src/view/shared/modals/ConfirmModal';
import Spinner from 'src/view/shared/Spinner';
import TableWrapper from 'src/view/shared/styles/TableWrapper';
import Pagination from 'src/view/shared/table/Pagination';

function NotificationListTable(props) {
  const [recordIdToDestroy, setRecordIdToDestroy] = useState(null);
  const dispatch = useDispatch();

  const findLoading = useSelector(selectors.selectLoading);
  const destroyLoading = useSelector(destroySelectors.selectLoading);
  const loading = findLoading || destroyLoading;
  const rows = useSelector(selectors.selectRows);
  const pagination = useSelector(selectors.selectPagination);
  const selectedKeys = useSelector(selectors.selectSelectedKeys);
  const hasRows = useSelector(selectors.selectHasRows);
  const isAllSelected = useSelector(selectors.selectIsAllSelected);

  const hasPermissionToDestroy = useSelector(
    notificationSelectors.selectPermissionToDestroy,
  );

  const doDestroy = (id) => {
    setRecordIdToDestroy(null);
    dispatch(destroyActions.doDestroy(id));
  };

  const doChangePagination = (pagination) => {
    dispatch(actions.doChangePagination(pagination));
  };

  const doToggleAllSelected = () => {
    dispatch(actions.doToggleAllSelected());
  };

  const doToggleOneSelected = (id) => {
    dispatch(actions.doToggleOneSelected(id));
  };

  return (
    <div className="notification-list-container">
      <TableWrapper>
        <div className="table-responsive">
          <table className="notification-list-table">
            <thead className="table-header">
              <tr>
                <th className="checkbox-column">
                  {hasRows && (
                    <div className="checkbox-wrapper">
                      <input
                        type="checkbox"
                        className="form-checkbox"
                        id="table-header-checkbox"
                        checked={Boolean(isAllSelected)}
                        onChange={() => doToggleAllSelected()}
                      />
                    </div>
                  )}
                </th>
                <th className="sortable-header">
                  {i18n('entities.notification.fields.user')}
                </th>
                <th className="sortable-header">
                  {i18n('entities.notification.fields.subject')}
                </th>
                <th className="sortable-header text-center">
                  {i18n('entities.notification.fields.status')}
                </th>
                <th className="sortable-header">
                  {i18n('entities.notification.fields.createdAt')}
                </th>
                <th className="actions-header notification-table-actions-header">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="table-body">
              {loading && (
                <tr>
                  <td colSpan={6} className="loading-cell">
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
                  <td colSpan={6} className="no-data-cell">
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
                    <td className="checkbox-column">
                      <div className="checkbox-wrapper">
                        <input
                          type="checkbox"
                          className="form-checkbox"
                          id={`table-row-checkbox-${row.id}`}
                          checked={selectedKeys.includes(row.id)}
                          onChange={() => doToggleOneSelected(row.id)}
                        />
                      </div>
                    </td>
                    <td className="table-cell">
                      {row.user ? (
                        <div className="user-info">
                          <div className="user-name">{row.user.fullName}</div>
                          {row.user.email && (
                            <div className="user-email">{row.user.email}</div>
                          )}
                        </div>
                      ) : (
                        <span className="no-user">No user</span>
                      )}
                    </td>
                    <td className="table-cell">
                      <div className="notification-subject-cell">
                        <span className="notification-subject">
                          {row.subject || '-'}
                        </span>
                        {row.message && (
                          <small className="notification-message">
                            {row.message}
                          </small>
                        )}
                      </div>
                    </td>
                    <td className="table-cell text-center">
                      <span
                        className={`status-badge ${
                          row.status === 'unread'
                            ? 'status-unread'
                            : 'status-read'
                        }`}
                      >
                        {row.status}
                      </span>
                    </td>
                    <td className="table-cell">
                      {row.createdAt
                        ? new Date(row.createdAt).toLocaleString()
                        : '-'}
                    </td>
                    <td className="notification-table-actions">
                      <div className="notification-table-actions-content">
                        {hasPermissionToDestroy && (
                          <button
                            className="notification-table-action-btn danger"
                            onClick={() => setRecordIdToDestroy(row.id)}
                          >
                            <i className="fas fa-trash notification-table-action-icon" />
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
        .notification-list-container {
          width: 100%;
        }

        .text-center {
          text-align: center;
        }

        .checkbox-column {
          width: 40px;
          padding: 16px 8px !important;
        }

        .checkbox-wrapper {
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .form-checkbox {
          width: 16px;
          height: 16px;
          cursor: pointer;
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

        .user-info {
          display: flex;
          flex-direction: column;
          gap: 2px;
        }

        .user-name {
          font-weight: 500;
          color: #334155;
        }

        .user-email {
          font-size: 12px;
          color: #64748b;
        }

        .no-user {
          color: #94a3b8;
          font-style: italic;
        }

        .notification-subject-cell {
          display: flex;
          flex-direction: column;
          gap: 4px;
          max-width: 320px;
        }

        .notification-subject {
          font-weight: 600;
          color: #334155;
        }

        .notification-message {
          color: #64748b;
          font-size: 12px;
          line-height: 1.4;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
        }

        .status-badge {
          display: inline-flex;
          align-items: center;
          padding: 4px 12px;
          border-radius: 20px;
          font-size: 11px;
          font-weight: 600;
          text-transform: capitalize;
        }

        .status-unread {
          background: linear-gradient(135deg, #4299e1 0%, #3182ce 100%);
          color: white;
        }

        .status-read {
          background: #e2e8f0;
          color: #475569;
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
          width: 120px;
        }

        .notification-table-actions-header {
          background: #f8fafc;
        }

        .notification-table-actions {
          white-space: nowrap;
        }

        .notification-table-actions-content {
          display: flex;
          align-items: center;
          gap: 6px;
          padding: 8px;
        }

        .notification-table-action-btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          padding: 6px 10px;
          border: none;
          border-radius: 8px;
          font-size: 11px;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          white-space: nowrap;
          box-shadow: 0 1px 3px rgba(0,0,0,0.1);
        }

        .notification-table-action-btn:hover {
          transform: translateY(-1px);
          box-shadow: 0 4px 8px rgba(0,0,0,0.15);
        }

        .notification-table-action-btn.danger {
          background: linear-gradient(135deg, #f56565 0%, #e53e3e 100%);
          color: white;
        }

        .notification-table-action-icon {
          margin-right: 4px;
          font-size: 10px;
          width: 10px;
        }

        .pagination-container {
          margin-top: 20px;
          display: flex;
          justify-content: center;
        }
      `}</style>
    </div>
  );
}

export default NotificationListTable;
