import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { i18n } from 'src/i18n';
import actions from 'src/modules/deliveryAddress/list/deliveryAddressListActions';
import selectors from 'src/modules/deliveryAddress/list/deliveryAddressListSelectors';
import Spinner from 'src/view/shared/Spinner';
import TableWrapper from 'src/view/shared/styles/TableWrapper';
import Pagination from 'src/view/shared/table/Pagination';

function DeliveryAddressListTable(props) {
  const dispatch = useDispatch();

  const loading = useSelector(selectors.selectLoading);
  const rows = useSelector(selectors.selectRows);
  const pagination = useSelector(selectors.selectPagination);
  const hasRows = useSelector(selectors.selectHasRows);
  const sorter = useSelector(selectors.selectSorter);

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
    <div className="delivery-address-list-container">
      <TableWrapper>
        <div className="table-responsive">
          <table className="delivery-address-list-table">
            <thead className="table-header">
              <tr>
                <th
                  className="sortable-header"
                  onClick={() => doChangeSort('user')}
                >
                  {i18n('entities.deliveryAddress.fields.user')}
                  {sorter.field === 'user' && (
                    <span className="sort-icon">
                      {sorter.order === 'ascend' ? '↑' : '↓'}
                    </span>
                  )}
                </th>
                <th className="sortable-header">
                  {i18n('entities.deliveryAddress.fields.address')}
                </th>
                <th className="sortable-header">
                  {i18n('entities.deliveryAddress.fields.contact')}
                </th>
                <th className="sortable-header">
                  {i18n('entities.deliveryAddress.fields.contactNumber')}
                </th>
                <th
                  className="sortable-header"
                  onClick={() => doChangeSort('createdAt')}
                >
                  {i18n('entities.deliveryAddress.fields.createdAt')}
                  {sorter.field === 'createdAt' && (
                    <span className="sort-icon">
                      {sorter.order === 'ascend' ? '↑' : '↓'}
                    </span>
                  )}
                </th>
              </tr>
            </thead>
            <tbody className="table-body">
              {loading && (
                <tr>
                  <td colSpan={5} className="loading-cell">
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
                  <td colSpan={5} className="no-data-cell">
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
                        <div className="delivery-address-user-info">
                          <div className="delivery-address-user-name">
                            {row.user.fullName || row.user.email}
                          </div>
                          {row.user.email && (
                            <div className="delivery-address-user-email">
                              {row.user.email}
                            </div>
                          )}
                        </div>
                      ) : (
                        <span className="no-user">No user</span>
                      )}
                    </td>
                    <td className="table-cell delivery-address-cell">
                      {row.address}
                    </td>
                    <td className="table-cell">{row.contact}</td>
                    <td className="table-cell">
                      {row.countryCode || '+1'} {row.contactNumber}
                    </td>
                    <td className="table-cell">
                      <div className="delivery-address-date">
                        <div className="delivery-address-date-day">
                          {row.createdAt
                            ? new Date(row.createdAt).toLocaleDateString()
                            : '-'}
                        </div>
                        <div className="delivery-address-date-time">
                          {row.createdAt
                            ? new Date(row.createdAt).toLocaleTimeString(
                                [],
                                { hour: '2-digit', minute: '2-digit' },
                              )
                            : ''}
                        </div>
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

      <style>{`
        .delivery-address-list-container {
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
        }

        .delivery-address-cell {
          white-space: normal;
          max-width: 280px;
        }

        .delivery-address-user-info {
          display: flex;
          flex-direction: column;
          gap: 2px;
        }

        .delivery-address-user-name {
          font-weight: 500;
          color: #334155;
        }

        .delivery-address-user-email {
          font-size: 12px;
          color: #64748b;
        }

        .no-user {
          color: #94a3b8;
          font-style: italic;
        }

        .delivery-address-date {
          display: flex;
          flex-direction: column;
          gap: 2px;
        }

        .delivery-address-date-day {
          font-weight: 500;
          color: #334155;
        }

        .delivery-address-date-time {
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
      `}</style>
    </div>
  );
}

export default DeliveryAddressListTable;
