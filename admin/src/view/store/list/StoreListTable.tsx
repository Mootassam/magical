import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { i18n } from 'src/i18n';
import actions from 'src/modules/store/list/storeListActions';
import selectors from 'src/modules/store/list/storeListSelectors';
import Spinner from 'src/view/shared/Spinner';
import TableWrapper from 'src/view/shared/styles/TableWrapper';
import Pagination from 'src/view/shared/table/Pagination';
import StoreEditModal from 'src/view/store/list/StoreEditModal';

function getStatusClass(status) {
  switch (status) {
    case 'success':
      return 'status-success';
    case 'pending':
      return 'status-pending';
    case 'rejected':
      return 'status-rejected';
    default:
      return 'status-unknown';
  }
}

function getStatusIcon(status) {
  switch (status) {
    case 'success':
      return 'fas fa-check-circle';
    case 'pending':
      return 'fas fa-clock';
    case 'rejected':
      return 'fas fa-times-circle';
    default:
      return 'fas fa-question-circle';
  }
}

function Thumb({ file, alt }) {
  if (!file || !file.downloadUrl) {
    return <span className="no-user">-</span>;
  }

  return (
    <a
      className="store-thumb-link"
      href={file.downloadUrl}
      target="_blank"
      rel="noopener noreferrer"
    >
      <img className="store-thumb" src={file.downloadUrl} alt={alt} />
    </a>
  );
}

function StoreListTable(props) {
  const dispatch = useDispatch();

  const loading = useSelector(selectors.selectLoading);
  const statusUpdateLoading = useSelector(
    selectors.selectStatusUpdateLoading,
  );
  const detailsUpdateLoading = useSelector(
    selectors.selectDetailsUpdateLoading,
  );
  const rows = useSelector(selectors.selectRows);
  const pagination = useSelector(selectors.selectPagination);
  const hasRows = useSelector(selectors.selectHasRows);
  const sorter = useSelector(selectors.selectSorter);

  const [editingRow, setEditingRow] = useState<any>(null);

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

  const handleStatusChange = (id, status) => {
    dispatch(actions.doUpdateStatus(id, status));
  };

  const handleSaveDetails = async (data) => {
    return dispatch(actions.doUpdateDetails(editingRow.id, data)) as any;
  };

  return (
    <div className="store-list-container">
      <TableWrapper>
        <div className="table-responsive">
          <table className="store-list-table">
            <thead className="table-header">
              <tr>
                <th
                  className="sortable-header"
                  onClick={() => doChangeSort('user')}
                >
                  {i18n('entities.store.fields.user')}
                  {sorter.field === 'user' && (
                    <span className="sort-icon">
                      {sorter.order === 'ascend' ? '↑' : '↓'}
                    </span>
                  )}
                </th>
                <th
                  className="sortable-header"
                  onClick={() => doChangeSort('storeName')}
                >
                  {i18n('entities.store.fields.storeName')}
                  {sorter.field === 'storeName' && (
                    <span className="sort-icon">
                      {sorter.order === 'ascend' ? '↑' : '↓'}
                    </span>
                  )}
                </th>
                <th className="sortable-header">
                  {i18n('entities.store.fields.mainBusiness')}
                </th>
                <th className="sortable-header">
                  {i18n('entities.store.fields.contact')}
                </th>
                <th className="sortable-header">
                  {i18n('entities.store.fields.idNumber')}
                </th>
                <th className="sortable-header">
                  {i18n('entities.store.fields.address')}
                </th>
                <th className="sortable-header">
                  {i18n('entities.store.fields.storePhoto')}
                </th>
                <th className="sortable-header">
                  {i18n('entities.store.fields.idCardFront')}
                </th>
                <th className="sortable-header">
                  {i18n('entities.store.fields.idCardBack')}
                </th>
                <th
                  className="sortable-header"
                  onClick={() => doChangeSort('createdAt')}
                >
                  {i18n('entities.store.fields.createdAt')}
                  {sorter.field === 'createdAt' && (
                    <span className="sort-icon">
                      {sorter.order === 'ascend' ? '↑' : '↓'}
                    </span>
                  )}
                </th>
                <th className="actions-header store-table-actions-header">
                  {i18n('entities.store.fields.status')}
                </th>
              </tr>
            </thead>
            <tbody className="table-body">
              {loading && (
                <tr>
                  <td colSpan={11} className="loading-cell">
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
                  <td colSpan={11} className="no-data-cell">
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
                      {row.user ? (
                        <div className="store-user-info">
                          <div className="store-user-name">
                            {row.user.fullName || row.user.email}
                          </div>
                          {row.user.email && (
                            <div className="store-user-email">
                              {row.user.email}
                            </div>
                          )}
                        </div>
                      ) : (
                        <span className="no-user">No user</span>
                      )}
                    </td>
                    <td className="table-cell">{row.storeName}</td>
                    <td className="table-cell">
                      {row.mainBusiness
                        ? i18n(
                            `entities.store.enumerators.mainBusiness.${row.mainBusiness}`,
                          )
                        : '-'}
                    </td>
                    <td className="table-cell">{row.contact || '-'}</td>
                    <td className="table-cell">{row.idNumber || '-'}</td>
                    <td className="table-cell store-address-cell">
                      {row.address || '-'}
                    </td>
                    <td className="table-cell">
                      <Thumb
                        file={row.storePhoto && row.storePhoto[0]}
                        alt="store"
                      />
                    </td>
                    <td className="table-cell">
                      <Thumb
                        file={row.idCardFront && row.idCardFront[0]}
                        alt="id front"
                      />
                    </td>
                    <td className="table-cell">
                      <Thumb
                        file={row.idCardBack && row.idCardBack[0]}
                        alt="id back"
                      />
                    </td>
                    <td className="table-cell">
                      <div className="store-date">
                        <div className="store-date-day">
                          {row.createdAt
                            ? new Date(row.createdAt).toLocaleDateString()
                            : '-'}
                        </div>
                        <div className="store-date-time">
                          {row.createdAt
                            ? new Date(row.createdAt).toLocaleTimeString(
                                [],
                                { hour: '2-digit', minute: '2-digit' },
                              )
                            : ''}
                        </div>
                      </div>
                    </td>
                    <td className="store-table-actions">
                      {row.status === 'pending' ? (
                        <div className="store-status-buttons">
                          <button
                            className="status-btn success"
                            disabled={statusUpdateLoading}
                            onClick={() =>
                              handleStatusChange(row.id, 'success')
                            }
                          >
                            <i className="fas fa-check status-btn-icon"></i>
                            {i18n('entities.store.actions.accept')}
                          </button>
                          <button
                            className="status-btn danger"
                            disabled={statusUpdateLoading}
                            onClick={() =>
                              handleStatusChange(row.id, 'rejected')
                            }
                          >
                            <i className="fas fa-times status-btn-icon"></i>
                            {i18n('entities.store.actions.reject')}
                          </button>
                        </div>
                      ) : (
                        <div className="store-status-buttons">
                          <div
                            className={`status-badge ${getStatusClass(row.status)}`}
                          >
                            <i
                              className={`status-icon ${getStatusIcon(row.status)}`}
                            ></i>
                            <span className="status-text">
                              {i18n(
                                `entities.store.enumerators.status.${row.status}`,
                              )}
                            </span>
                          </div>
                          {row.status === 'success' && (
                            <button
                              className="status-btn edit"
                              onClick={() => setEditingRow(row)}
                            >
                              <i className="fas fa-pen status-btn-icon"></i>
                              {i18n('entities.store.actions.edit')}
                            </button>
                          )}
                        </div>
                      )}
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

      {editingRow && (
        <StoreEditModal
          store={editingRow}
          saving={detailsUpdateLoading}
          onSave={handleSaveDetails}
          onClose={() => setEditingRow(null)}
        />
      )}

      <style>{`
        .store-list-container {
          width: 100%;
        }

        .sort-icon {
          margin-left: 8px;
          font-size: 12px;
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
          white-space: nowrap;
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
          white-space: nowrap;
        }

        .store-address-cell {
          white-space: normal;
          max-width: 220px;
        }

        .store-user-info {
          display: flex;
          flex-direction: column;
          gap: 2px;
        }

        .store-user-name {
          font-weight: 500;
          color: #334155;
        }

        .store-user-email {
          font-size: 12px;
          color: #64748b;
        }

        .no-user {
          color: #94a3b8;
          font-style: italic;
        }

        .store-thumb-link {
          display: inline-block;
        }

        .store-thumb {
          width: 44px;
          height: 44px;
          object-fit: cover;
          border-radius: 6px;
          border: 1px solid #e2e8f0;
        }

        .store-date {
          display: flex;
          flex-direction: column;
          gap: 2px;
        }

        .store-date-day {
          font-weight: 500;
          color: #334155;
        }

        .store-date-time {
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
          width: 220px;
        }

        .store-table-actions-header {
          background: #f8fafc;
        }

        .store-table-actions {
          position: sticky;
          right: 0;
          background: white;
          z-index: 10;
          min-width: 220px;
          white-space: nowrap;
          box-shadow: -2px 0 8px rgba(0,0,0,0.06);
          border-left: 2px solid #f1f5f9;
          padding: 12px;
          vertical-align: middle;
        }

        .store-status-buttons {
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
          border: none;
          border-radius: 6px;
          font-size: 11px;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .status-btn:hover {
          transform: translateY(-1px);
        }

        .status-btn:disabled {
          opacity: 0.6;
          cursor: not-allowed;
          transform: none;
        }

        .status-btn.success {
          background: linear-gradient(135deg, #48bb78 0%, #38a169 100%);
          color: white;
        }

        .status-btn.danger {
          background: linear-gradient(135deg, #f56565 0%, #e53e3e 100%);
          color: white;
        }

        .status-btn.edit {
          background: linear-gradient(135deg, #4299e1 0%, #3182ce 100%);
          color: white;
        }

        .status-btn-icon {
          font-size: 10px;
        }

        .status-badge {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 6px 12px;
          border-radius: 20px;
          font-size: 12px;
          font-weight: 500;
        }

        .status-success {
          background: linear-gradient(135deg, #48bb78 0%, #38a169 100%);
          color: white;
        }

        .status-pending {
          background: linear-gradient(135deg, #f6ad55 0%, #ed8936 100%);
          color: white;
        }

        .status-rejected {
          background: linear-gradient(135deg, #f56565 0%, #e53e3e 100%);
          color: white;
        }

        .status-unknown {
          background: #e2e8f0;
          color: #475569;
        }

        .status-icon {
          font-size: 10px;
        }

        .status-text {
          text-transform: capitalize;
        }

        .pagination-container {
          margin-top: 20px;
          display: flex;
          justify-content: center;
        }

        @media (max-width: 768px) {
          .store-status-buttons {
            flex-direction: column;
            gap: 4px;
          }

          .status-btn {
            padding: 4px 8px;
            font-size: 10px;
          }
        }
      `}</style>
    </div>
  );
}

export default StoreListTable;
