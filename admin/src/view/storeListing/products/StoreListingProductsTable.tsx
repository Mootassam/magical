import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { i18n } from 'src/i18n';
import actions from 'src/modules/storeListing/products/storeListingProductsActions';
import selectors from 'src/modules/storeListing/products/storeListingProductsSelectors';
import Spinner from 'src/view/shared/Spinner';
import TableWrapper from 'src/view/shared/styles/TableWrapper';
import Pagination from 'src/view/shared/table/Pagination';

function formatPrice(value) {
  return `$${(Number(value) || 0).toFixed(2)}`;
}

function StoreListingProductsTable({ storeId }: { storeId: string }) {
  const dispatch = useDispatch();

  const loading = useSelector(selectors.selectLoading);
  const rows = useSelector(selectors.selectRows);
  const hasRows = useSelector(selectors.selectHasRows);
  const pagination = useSelector(selectors.selectPagination);

  const doChangePagination = (nextPagination) => {
    dispatch(actions.doChangePagination(storeId, nextPagination));
  };

  return (
    <div className="store-listing-products-container">
      <TableWrapper>
        <div className="table-responsive">
          <table className="store-listing-products-table">
            <thead className="table-header">
              <tr>
                <th className="sortable-header">
                  {i18n('entities.storeListing.fields.product')}
                </th>
                <th className="sortable-header text-right">
                  {i18n('entities.storeListing.fields.salesPrice')}
                </th>
                <th className="sortable-header text-right">
                  {i18n('entities.storeListing.fields.wholesalePrice')}
                </th>
                <th className="sortable-header">
                  {i18n('entities.storeListing.fields.createdAt')}
                </th>
              </tr>
            </thead>
            <tbody className="table-body">
              {loading && (
                <tr>
                  <td colSpan={4} className="loading-cell">
                    <div className="loading-container">
                      <Spinner />
                      <span className="loading-text">Loading data...</span>
                    </div>
                  </td>
                </tr>
              )}
              {!loading && !hasRows && (
                <tr>
                  <td colSpan={4} className="no-data-cell">
                    <div className="no-data-content">
                      <i className="fas fa-box-open no-data-icon"></i>
                      <p>{i18n('table.noData')}</p>
                    </div>
                  </td>
                </tr>
              )}
              {!loading &&
                rows.map((row: any) => (
                  <tr key={row.id} className="table-row">
                    <td className="table-cell">
                      <div className="product-cell">
                        <div className="product-thumb">
                          {row.image && <img src={row.image} alt={row.title} />}
                        </div>
                        <span className="product-title">{row.title}</span>
                      </div>
                    </td>
                    <td className="table-cell text-right">
                      {formatPrice(row.salesPrice)}
                    </td>
                    <td className="table-cell text-right">
                      {formatPrice(row.wholesalePrice)}
                    </td>
                    <td className="table-cell">
                      {row.createdAt
                        ? new Date(row.createdAt).toLocaleString()
                        : '-'}
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
        .store-listing-products-container {
          width: 100%;
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

        .product-cell {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .product-thumb {
          width: 40px;
          height: 40px;
          border-radius: 8px;
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

export default StoreListingProductsTable;
