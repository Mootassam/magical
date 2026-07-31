import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { i18n } from 'src/i18n';
import actions from 'src/modules/automatOrder/list/automatOrderListActions';
import selectors from 'src/modules/automatOrder/list/automatOrderListSelectors';
import Spinner from 'src/view/shared/Spinner';
import TableWrapper from 'src/view/shared/styles/TableWrapper';
import Pagination from 'src/view/shared/table/Pagination';

function getStatusClass(status) {
  switch (status) {
    case 'completed':
      return 'status-completed';
    case 'rejected':
      return 'status-rejected';
    default:
      return 'status-pending';
  }
}

function formatDate(value) {
  if (!value) return '-';
  return new Date(value).toLocaleString();
}

function AutomatOrderListTable(props) {
  const dispatch = useDispatch();

  const loading = useSelector(selectors.selectLoading);
  const rows = useSelector(selectors.selectRows);
  const pagination = useSelector(selectors.selectPagination);
  const hasRows = useSelector(selectors.selectHasRows);

  const doChangePagination = (nextPagination) => {
    dispatch(actions.doChangePagination(nextPagination));
  };

  return (
    <div className="automat-order-list-container">
      <TableWrapper>
        <div className="table-responsive">
          <table className="automat-order-list-table">
            <thead className="table-header">
              <tr>
                <th>{i18n('entities.automatOrder.fields.storeName')}</th>
                <th>{i18n('entities.automatOrder.fields.storeId')}</th>
                <th>{i18n('entities.automatOrder.fields.customerName')}</th>
                <th>{i18n('entities.automatOrder.fields.product')}</th>
                <th className="text-center">
                  {i18n('entities.automatOrder.fields.quantity')}
                </th>
                <th>{i18n('entities.automatOrder.fields.startTime')}</th>
                <th>{i18n('entities.automatOrder.fields.createdAt')}</th>
                <th>{i18n('entities.automatOrder.fields.updatedAt')}</th>
                <th className="text-center status-header">
                  {i18n('entities.automatOrder.fields.status')}
                </th>
              </tr>
            </thead>
            <tbody className="table-body">
              {loading && (
                <tr>
                  <td colSpan={9} className="loading-cell">
                    <div className="loading-container">
                      <Spinner />
                      <span className="loading-text">Loading data...</span>
                    </div>
                  </td>
                </tr>
              )}
              {!loading && !hasRows && (
                <tr>
                  <td colSpan={9} className="no-data-cell">
                    <div className="no-data-content">
                      <i className="fas fa-database no-data-icon"></i>
                      <p>{i18n('table.noData')}</p>
                    </div>
                  </td>
                </tr>
              )}
              {!loading &&
                rows.map((row: any) => (
                  <tr key={row.id} className="table-row">
                    <td className="table-cell">{row.store?.storeName || '-'}</td>
                    <td className="table-cell store-id-cell">{row.store?.storeId || '-'}</td>
                    <td className="table-cell">{row.customerName}</td>
                    <td className="table-cell">
                      <div className="product-cell">
                        {row.product?.image && (
                          <div className="product-thumb">
                            <img src={row.product.image} alt={row.product.title} />
                          </div>
                        )}
                        <span className="product-title">
                          {row.product?.title || '-'}
                        </span>
                      </div>
                    </td>
                    <td className="table-cell text-center">{row.quantity}</td>
                    <td className="table-cell">{formatDate(row.startTime)}</td>
                    <td className="table-cell">{formatDate(row.createdAt)}</td>
                    <td className="table-cell">{formatDate(row.updatedAt)}</td>
                    <td className="table-cell text-center status-cell">
                      <span className={`status-badge ${getStatusClass(row.status)}`}>
                        {row.status}
                      </span>
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

      <style>{`
        .automat-order-list-container {
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
          white-space: nowrap;
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

        .store-id-cell {
          font-family: monospace;
          font-size: 12px;
          color: #64748b;
        }

        .product-cell {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .product-thumb {
          width: 32px;
          height: 32px;
          border-radius: 6px;
          overflow: hidden;
          flex-shrink: 0;
          background: #f3f6fc;
        }

        .product-thumb img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .product-title {
          font-weight: 500;
          color: #334155;
        }

        .status-header {
          position: sticky;
          right: 0;
          background: #f8fafc;
          z-index: 11;
          width: 130px;
        }

        .status-cell {
          position: sticky;
          right: 0;
          background: white;
          z-index: 10;
          box-shadow: -2px 0 8px rgba(0,0,0,0.06);
          border-left: 2px solid #f1f5f9;
        }

        .table-row:hover .status-cell {
          background: #f8fafc;
        }

        .status-badge {
          display: inline-flex;
          align-items: center;
          padding: 5px 12px;
          border-radius: 20px;
          font-size: 11px;
          font-weight: 600;
          text-transform: capitalize;
        }

        .status-pending {
          background: linear-gradient(135deg, #f6ad55 0%, #ed8936 100%);
          color: white;
        }

        .status-completed {
          background: linear-gradient(135deg, #48bb78 0%, #38a169 100%);
          color: white;
        }

        .status-rejected {
          background: linear-gradient(135deg, #f56565 0%, #e53e3e 100%);
          color: white;
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

        .pagination-container {
          margin-top: 20px;
          display: flex;
          justify-content: center;
        }
      `}</style>
    </div>
  );
}

export default AutomatOrderListTable;
