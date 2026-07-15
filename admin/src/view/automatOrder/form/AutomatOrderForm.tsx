import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { i18n } from 'src/i18n';
import { getHistory } from 'src/modules/store';
import Message from 'src/view/shared/message';
import Errors from 'src/modules/shared/error/errors';
import StoreListingService from 'src/modules/storeListing/storeListingService';
import AutomatOrderService from 'src/modules/automatOrder/automatOrderService';
import ButtonIcon from 'src/view/shared/ButtonIcon';
import ContentWrapper from 'src/view/layout/styles/ContentWrapper';
import PageTitle from 'src/view/shared/styles/PageTitle';

const FIRST_NAMES = [
  'James', 'Mary', 'John', 'Patricia', 'Robert', 'Jennifer', 'Michael', 'Linda',
  'William', 'Elizabeth', 'David', 'Barbara', 'Richard', 'Susan', 'Joseph', 'Jessica',
  'Thomas', 'Sarah', 'Charles', 'Karen', 'Daniel', 'Nancy', 'Matthew', 'Lisa',
  'Anthony', 'Betty', 'Mark', 'Margaret', 'Paul', 'Sandra',
];

const LAST_NAMES = [
  'Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 'Davis',
  'Rodriguez', 'Martinez', 'Hernandez', 'Lopez', 'Gonzalez', 'Wilson', 'Anderson',
  'Thomas', 'Taylor', 'Moore', 'Jackson', 'Martin', 'Lee', 'Perez', 'Thompson',
  'White', 'Harris', 'Sanchez', 'Clark', 'Ramirez', 'Lewis', 'Robinson',
];

function generateRandomFullName() {
  const first = FIRST_NAMES[Math.floor(Math.random() * FIRST_NAMES.length)];
  const last = LAST_NAMES[Math.floor(Math.random() * LAST_NAMES.length)];
  return `${first} ${last}`;
}

let rowKeySeed = 0;

function createEmptyRow() {
  rowKeySeed += 1;

  return {
    key: `row-${rowKeySeed}`,
    storeId: '',
    customerName: '',
    productId: '',
    quantity: 1,
    startTime: '',
    storeProducts: [] as Array<any>,
    storeProductsLoading: false,
  };
}

function AutomatOrderForm(props) {
  const [stores, setStores] = useState<Array<any>>([]);
  const [storesLoading, setStoresLoading] = useState(true);
  const [rows, setRows] = useState([createEmptyRow()]);
  const [saveLoading, setSaveLoading] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const response = await StoreListingService.listStores('');
        setStores(response);
      } catch (error) {
        Errors.handle(error);
      } finally {
        setStoresLoading(false);
      }
    })();
  }, []);

  const updateRow = (key, patch) => {
    setRows((current) =>
      current.map((row) => (row.key === key ? { ...row, ...patch } : row)),
    );
  };

  const doAddRow = () => {
    setRows((current) => [...current, createEmptyRow()]);
  };

  const doRemoveRow = (key) => {
    setRows((current) =>
      current.length > 1 ? current.filter((row) => row.key !== key) : current,
    );
  };

  const doGenerateName = (key) => {
    updateRow(key, { customerName: generateRandomFullName() });
  };

  const doChangeStore = async (key, storeId) => {
    updateRow(key, {
      storeId,
      productId: '',
      storeProducts: [],
      storeProductsLoading: Boolean(storeId),
    });

    if (!storeId) {
      return;
    }

    try {
      const response = await StoreListingService.listByStore(storeId, null, 0, 0);

      updateRow(key, {
        storeProducts: response.rows,
        storeProductsLoading: false,
      });
    } catch (error) {
      Errors.handle(error);
      updateRow(key, { storeProductsLoading: false });
    }
  };

  const isRowComplete = (row) =>
    Boolean(
      row.storeId &&
        row.customerName.trim() &&
        row.productId &&
        Number(row.quantity) > 0 &&
        row.startTime,
    );

  const doSave = async () => {
    const incompleteRows = rows.filter((row) => !isRowComplete(row));

    if (incompleteRows.length > 0) {
      Message.error(i18n('entities.automatOrder.errors.incompleteRows'));
      return;
    }

    setSaveLoading(true);

    try {
      await AutomatOrderService.createMany(
        rows.map((row) => ({
          store: row.storeId,
          product: row.productId,
          customerName: row.customerName.trim(),
          quantity: Number(row.quantity),
          startTime: row.startTime,
        })),
      );

      Message.success(i18n('entities.automatOrder.create.success'));
      getHistory().push('/automat-order');
    } catch (error) {
      Errors.handle(error);
    } finally {
      setSaveLoading(false);
    }
  };

  return (
    <>
      <ContentWrapper>
        <PageTitle>{i18n('entities.automatOrder.new.title')}</PageTitle>

        <div className="automat-order-rows">
          {rows.map((row, index) => (
            <div className="automat-order-row" key={row.key}>
              <div className="automat-order-row-header">
                <span className="automat-order-row-title">
                  {i18n('entities.automatOrder.order')} #{index + 1}
                </span>
                {rows.length > 1 && (
                  <button
                    type="button"
                    className="automat-order-row-remove"
                    onClick={() => doRemoveRow(row.key)}
                  >
                    <i className="fas fa-trash" />
                  </button>
                )}
              </div>

              <div className="automat-order-row-fields">
                <div className="automat-order-field">
                  <label>{i18n('entities.automatOrder.fields.storeName')}</label>
                  <select
                    value={row.storeId}
                    disabled={storesLoading}
                    onChange={(event) => doChangeStore(row.key, event.target.value)}
                  >
                    <option value="">
                      {storesLoading
                        ? i18n('entities.automatOrder.loadingStores')
                        : i18n('entities.automatOrder.selectStore')}
                    </option>
                    {stores.map((store: any) => (
                      <option key={store.id} value={store.id}>
                        {store.storeName}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="automat-order-field">
                  <label>{i18n('entities.automatOrder.fields.customerName')}</label>
                  <div className="automat-order-name-row">
                    <input
                      type="text"
                      placeholder={i18n('entities.automatOrder.customerNamePlaceholder')}
                      value={row.customerName}
                      onChange={(event) =>
                        updateRow(row.key, { customerName: event.target.value })
                      }
                    />
                    <button
                      type="button"
                      className="automat-order-generate-btn"
                      onClick={() => doGenerateName(row.key)}
                    >
                      <i className="fas fa-dice" />
                      &nbsp;{i18n('entities.automatOrder.generate')}
                    </button>
                  </div>
                </div>

                <div className="automat-order-field">
                  <label>{i18n('entities.automatOrder.fields.product')}</label>
                  <select
                    value={row.productId}
                    disabled={!row.storeId || row.storeProductsLoading}
                    onChange={(event) =>
                      updateRow(row.key, { productId: event.target.value })
                    }
                  >
                    <option value="">
                      {!row.storeId
                        ? i18n('entities.automatOrder.selectStoreFirst')
                        : row.storeProductsLoading
                        ? i18n('entities.automatOrder.loadingProducts')
                        : row.storeProducts.length === 0
                        ? i18n('entities.automatOrder.noProductsInStore')
                        : i18n('entities.automatOrder.selectProduct')}
                    </option>
                    {row.storeProducts.map((listing: any) => (
                      <option key={listing.id} value={listing.product}>
                        {listing.title}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="automat-order-field automat-order-field-narrow">
                  <label>{i18n('entities.automatOrder.fields.quantity')}</label>
                  <input
                    type="number"
                    min={1}
                    value={row.quantity}
                    onChange={(event) =>
                      updateRow(row.key, { quantity: event.target.value })
                    }
                  />
                </div>

                <div className="automat-order-field automat-order-field-narrow">
                  <label>{i18n('entities.automatOrder.fields.startTime')}</label>
                  <input
                    type="datetime-local"
                    value={row.startTime}
                    onChange={(event) =>
                      updateRow(row.key, { startTime: event.target.value })
                    }
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="automat-order-actions">
          <button type="button" className="btn btn-light" onClick={doAddRow}>
            <i className="fas fa-plus" />
            &nbsp;{i18n('entities.automatOrder.addRow')}
          </button>

          <button
            type="button"
            className="btn btn-primary"
            disabled={saveLoading}
            onClick={doSave}
          >
            <ButtonIcon loading={saveLoading} iconClass="far fa-save" />
            &nbsp;{i18n('common.save')}
          </button>

          <button
            type="button"
            className="btn btn-light"
            disabled={saveLoading}
            onClick={() => getHistory().push('/automat-order')}
          >
            <i className="fas fa-times" />
            &nbsp;{i18n('common.cancel')}
          </button>
        </div>
      </ContentWrapper>

      <style>{`
        .automat-order-rows {
          display: flex;
          flex-direction: column;
          gap: 16px;
          margin-top: 8px;
        }

        .automat-order-row {
          background: #fff;
          border-radius: 14px;
          box-shadow: 0 8px 20px rgba(20,40,100,0.06);
          padding: 16px;
        }

        .automat-order-row-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 14px;
        }

        .automat-order-row-title {
          font-size: 13px;
          font-weight: 700;
          color: #334155;
          text-transform: uppercase;
          letter-spacing: 0.04em;
        }

        .automat-order-row-remove {
          border: none;
          background: #fef2f2;
          color: #e53e3e;
          width: 30px;
          height: 30px;
          border-radius: 8px;
          cursor: pointer;
        }

        .automat-order-row-fields {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 14px;
        }

        .automat-order-field {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .automat-order-field-narrow {
          max-width: 220px;
        }

        .automat-order-field label {
          font-size: 12px;
          font-weight: 600;
          color: #475569;
        }

        .automat-order-field select,
        .automat-order-field input {
          border: 1.5px solid #e2e8f0;
          border-radius: 8px;
          padding: 9px 10px;
          font-size: 13.5px;
          color: #334155;
          outline: none;
        }

        .automat-order-field select:focus,
        .automat-order-field input:focus {
          border-color: #4299e1;
        }

        .automat-order-name-row {
          display: flex;
          gap: 8px;
        }

        .automat-order-name-row input {
          flex: 1;
          min-width: 0;
        }

        .automat-order-generate-btn {
          flex-shrink: 0;
          border: none;
          border-radius: 8px;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: #fff;
          font-size: 12px;
          font-weight: 600;
          padding: 0 12px;
          cursor: pointer;
          white-space: nowrap;
        }

        .automat-order-actions {
          display: flex;
          gap: 10px;
          margin-top: 20px;
        }
      `}</style>
    </>
  );
}

export default AutomatOrderForm;
