import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { i18n } from 'src/i18n';
import actions from 'src/modules/productCategory/list/productCategoryListActions';
import selectors from 'src/modules/productCategory/list/productCategoryListSelectors';
import productCategorySelectors from 'src/modules/productCategory/productCategorySelectors';
import destroyActions from 'src/modules/productCategory/destroy/productCategoryDestroyActions';
import destroySelectors from 'src/modules/productCategory/destroy/productCategoryDestroySelectors';
import ConfirmModal from 'src/view/shared/modals/ConfirmModal';
import Spinner from 'src/view/shared/Spinner';
import TableWrapper from 'src/view/shared/styles/TableWrapper';
import Pagination from 'src/view/shared/table/Pagination';

function ProductCategoryListTable(props) {
  const [recordIdToDestroy, setRecordIdToDestroy] = useState(null);
  const dispatch = useDispatch();

  const findLoading = useSelector(selectors.selectLoading);
  const destroyLoading = useSelector(destroySelectors.selectLoading);
  const loading = findLoading || destroyLoading;
  const rows = useSelector(selectors.selectRows);
  const pagination = useSelector(selectors.selectPagination);
  const hasRows = useSelector(selectors.selectHasRows);
  const sorter = useSelector(selectors.selectSorter);
  const hasPermissionToDestroy = useSelector(
    productCategorySelectors.selectPermissionToDestroy,
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

  return (
    <div className="product-category-list-container">
      <TableWrapper>
        <div className="table-responsive">
          <table className="product-category-list-table">
            <thead className="table-header">
              <tr>
                <th
                  className="sortable-header"
                  onClick={() => doChangeSort('name')}
                >
                  {i18n('entities.productCategory.fields.name')}
                  {sorter.field === 'name' && (
                    <span className="sort-icon">
                      {sorter.order === 'ascend' ? '↑' : '↓'}
                    </span>
                  )}
                </th>
                <th
                  className="sortable-header"
                  onClick={() => doChangeSort('createdAt')}
                >
                  {i18n('entities.productCategory.fields.createdAt')}
                  {sorter.field === 'createdAt' && (
                    <span className="sort-icon">
                      {sorter.order === 'ascend' ? '↑' : '↓'}
                    </span>
                  )}
                </th>
                <th className="actions-header product-category-table-actions-header">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="table-body">
              {loading && (
                <tr>
                  <td colSpan={3} className="loading-cell">
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
                  <td colSpan={3} className="no-data-cell">
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
                    <td className="table-cell">{row.name}</td>
                    <td className="table-cell">
                      <div className="product-category-date">
                        <div className="product-category-date-day">
                          {row.createdAt
                            ? new Date(row.createdAt).toLocaleDateString()
                            : '-'}
                        </div>
                        <div className="product-category-date-time">
                          {row.createdAt
                            ? new Date(row.createdAt).toLocaleTimeString(
                                [],
                                { hour: '2-digit', minute: '2-digit' },
                              )
                            : ''}
                        </div>
                      </div>
                    </td>
                    <td className="product-category-table-actions">
                      <div className="product-category-table-actions-content">
                        {hasPermissionToDestroy && (
                          <button
                            className="product-category-table-action-btn danger"
                            onClick={() => setRecordIdToDestroy(row.id)}
                          >
                            <i className="fas fa-trash product-category-table-action-icon" />
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
        .product-category-list-container {
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

        .product-category-date {
          display: flex;
          flex-direction: column;
          gap: 2px;
        }

        .product-category-date-day {
          font-weight: 500;
          color: #334155;
        }

        .product-category-date-time {
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

        .pagination-container {
          margin-top: 20px;
          display: flex;
          justify-content: center;
        }

        .actions-header {
          width: 120px;
        }

        .product-category-table-actions-header {
          background: #f8fafc;
        }

        .product-category-table-actions {
          white-space: nowrap;
        }

        .product-category-table-actions-content {
          display: flex;
          align-items: center;
          gap: 6px;
        }

        .product-category-table-action-btn {
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

        .product-category-table-action-btn:hover {
          transform: translateY(-1px);
          box-shadow: 0 4px 8px rgba(0,0,0,0.15);
        }

        .product-category-table-action-btn.danger {
          background: linear-gradient(135deg, #f56565 0%, #e53e3e 100%);
          color: white;
        }

        .product-category-table-action-icon {
          margin-right: 4px;
          font-size: 10px;
          width: 10px;
        }
      `}</style>
    </div>
  );
}

export default ProductCategoryListTable;
