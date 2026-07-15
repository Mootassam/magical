import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { i18n } from 'src/i18n';
import selectors from 'src/modules/storeListing/stores/storeListingStoresSelectors';
import Spinner from 'src/view/shared/Spinner';
import TableWrapper from 'src/view/shared/styles/TableWrapper';

function StoreListingStoresTable(props) {
  const loading = useSelector(selectors.selectLoading);
  const rows = useSelector(selectors.selectRows);
  const hasRows = useSelector(selectors.selectHasRows);

  return (
    <div className="store-listing-stores-container">
      <TableWrapper>
        <div className="table-responsive">
          <table className="store-listing-stores-table">
            <thead className="table-header">
              <tr>
                <th className="sortable-header">
                  {i18n('entities.storeListing.fields.storeName')}
                </th>
                <th className="sortable-header">
                  {i18n('entities.storeListing.fields.merchant')}
                </th>
                <th className="sortable-header">
                  {i18n('entities.storeListing.fields.mainBusiness')}
                </th>
                <th className="sortable-header text-center">
                  {i18n('entities.storeListing.fields.productCount')}
                </th>
                <th className="actions-header store-listing-table-actions-header">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="table-body">
              {loading && (
                <tr>
                  <td colSpan={5} className="loading-cell">
                    <div className="loading-container">
                      <Spinner />
                      <span className="loading-text">Loading data...</span>
                    </div>
                  </td>
                </tr>
              )}
              {!loading && !hasRows && (
                <tr>
                  <td colSpan={5} className="no-data-cell">
                    <div className="no-data-content">
                      <i className="fas fa-store no-data-icon"></i>
                      <p>{i18n('table.noData')}</p>
                    </div>
                  </td>
                </tr>
              )}
              {!loading &&
                rows.map((row: any) => (
                  <tr key={row.id} className="table-row">
                    <td className="table-cell">
                      <span className="store-name">{row.storeName}</span>
                    </td>
                    <td className="table-cell">
                      {row.user ? (
                        <div className="user-info">
                          <div className="user-name">
                            {row.user.fullName || row.user.email}
                          </div>
                          {row.user.email && (
                            <div className="user-email">{row.user.email}</div>
                          )}
                        </div>
                      ) : (
                        <span className="no-user">No user</span>
                      )}
                    </td>
                    <td className="table-cell">
                      {row.mainBusiness
                        ? i18n(
                            `entities.store.enumerators.mainBusiness.${row.mainBusiness}`,
                          )
                        : '-'}
                    </td>
                    <td className="table-cell text-center">
                      <span className="product-count-badge">
                        {row.productCount}
                      </span>
                    </td>
                    <td className="store-listing-table-actions">
                      <Link
                        className="store-listing-table-action-btn primary"
                        to={`/product-management/${row.id}`}
                      >
                        <i className="fas fa-boxes-stacked store-listing-table-action-icon" />
                        {i18n('entities.storeListing.viewProducts')}
                      </Link>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </TableWrapper>

      <style>{`
        .store-listing-stores-container {
          width: 100%;
        }

        .text-center {
          text-align: center;
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

        .store-name {
          font-weight: 600;
          color: #334155;
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

        .product-count-badge {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          min-width: 28px;
          padding: 4px 10px;
          border-radius: 20px;
          background: linear-gradient(135deg, #4299e1 0%, #3182ce 100%);
          color: white;
          font-size: 12px;
          font-weight: 700;
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
          width: 160px;
        }

        .store-listing-table-actions-header {
          background: #f8fafc;
        }

        .store-listing-table-actions {
          white-space: nowrap;
          padding: 8px 12px;
        }

        .store-listing-table-action-btn {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 6px 12px;
          border: none;
          border-radius: 8px;
          font-size: 11px;
          font-weight: 500;
          cursor: pointer;
          text-decoration: none;
          white-space: nowrap;
          box-shadow: 0 1px 3px rgba(0,0,0,0.1);
        }

        .store-listing-table-action-btn:hover {
          transform: translateY(-1px);
          box-shadow: 0 4px 8px rgba(0,0,0,0.15);
        }

        .store-listing-table-action-btn.primary {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
        }

        .store-listing-table-action-icon {
          font-size: 10px;
        }
      `}</style>
    </div>
  );
}

export default StoreListingStoresTable;
