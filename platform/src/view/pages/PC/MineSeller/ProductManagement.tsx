import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import storeListingActions from "src/modules/storeListing/storeListingActions";
import storeListingSelectors from "src/modules/storeListing/storeListingSelectors";
import MineSellerShell from "./MineSellerShell";
import { sharedMineStyles } from "src/view/pages/PC/Mine/MyAccount";

function formatPrice(value) {
  return `$${(Number(value) || 0).toFixed(2)}`;
}

function ProductManagement() {
  const dispatch = useDispatch();
  const history = useHistory();

  const rows = useSelector(storeListingSelectors.selectRows);
  const loading = useSelector(storeListingSelectors.selectLoading);

  const [search, setSearch] = useState("");

  useEffect(() => {
    dispatch(storeListingActions.doFetchMine());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  const goToWholesaleManagement = () => {
    history.push("/pc/mine-seller/wholesale");
  };

  const visibleRows = rows.filter(
    (row: any) => !search.trim() || (row.title || "").toLowerCase().includes(search.trim().toLowerCase()),
  );

  const isInitialLoading = loading && rows.length === 0;

  return (
    <MineSellerShell active="products">
      <div className="pc-mine__addr-head">
        <h1 className="pc-mine__page-title">Product Management</h1>
        <button type="button" className="pc-btn pc-btn-primary" onClick={goToWholesaleManagement}>
          + Add Product
        </button>
      </div>

      <div className="pc-card pc-mine__panel pc-mine__pm-toolbar">
        <div className="pc-mine__pm-search">
          <span>🔍</span>
          <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={(event) => setSearch(event.target.value)}
          />
        </div>
        <div className="pc-mine__pm-count">
          {isInitialLoading ? (
            "Loading your products…"
          ) : (
            <>
              Showing <b>{visibleRows.length}</b> of <b>{rows.length}</b> products
            </>
          )}
        </div>
      </div>

      {isInitialLoading && (
        <div className="pc-mine__pm-grid">
          {Array.from({ length: 6 }).map((_, index) => (
            <div className="pc-card pc-mine__pm-card" key={index}>
              <div className="pc-skeleton pc-mine__pm-thumb" />
              <div className="pc-mine__pm-body">
                <div className="pc-skeleton" style={{ height: 13, width: "80%", marginBottom: 10 }} />
                <div className="pc-skeleton" style={{ height: 12, width: "50%" }} />
              </div>
            </div>
          ))}
        </div>
      )}

      {!isInitialLoading && rows.length === 0 && (
        <div className="pc-card pc-mine__empty">
          <div className="pc-mine__empty-title">No products listed yet</div>
          <div className="pc-mine__empty-text">Add products from Wholesale Management to see them here.</div>
          <button type="button" className="pc-btn pc-btn-primary" onClick={goToWholesaleManagement}>
            Go to Wholesale Management
          </button>
        </div>
      )}

      {!isInitialLoading && rows.length > 0 && visibleRows.length === 0 && (
        <div className="pc-card pc-mine__empty">
          <div className="pc-mine__empty-title">No matches</div>
          <div className="pc-mine__empty-text">No products match "{search}".</div>
        </div>
      )}

      {!isInitialLoading && visibleRows.length > 0 && (
        <div className="pc-mine__pm-grid">
          {visibleRows.map((row: any) => (
            <div className="pc-card pc-mine__pm-card" key={row.id}>
              <div className="pc-mine__pm-thumb">
                {row.image && <img src={row.image} alt={row.title} />}
              </div>
              <div className="pc-mine__pm-body">
                <div className="pc-mine__pm-name">{row.title}</div>
                <div className="pc-mine__pm-price-row">
                  <div>
                    <span className="pc-mine__pm-price-lbl">Wholesale</span>
                    <span className="pc-mine__pm-price-val">{formatPrice(row.wholesalePrice)}</span>
                  </div>
                  <div>
                    <span className="pc-mine__pm-price-lbl">Sales</span>
                    <span className="pc-mine__pm-price-val">{formatPrice(row.salesPrice)}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <style>{sharedMineStyles}</style>
      <style>{`
        .pc-mine__pm-toolbar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 20px;
          padding: 16px 20px;
          margin-bottom: 20px;
        }

        .pc-mine__pm-search {
          display: flex;
          align-items: center;
          gap: 8px;
          background: var(--pc-bg);
          border: 1px solid var(--pc-border);
          border-radius: 999px;
          padding: 9px 16px;
          flex: 1;
          max-width: 320px;
        }

        .pc-mine__pm-search input {
          border: none;
          background: transparent;
          outline: none;
          flex: 1;
          font-size: 13.5px;
          color: var(--pc-text);
        }

        .pc-mine__pm-count {
          font-size: 12.5px;
          color: var(--pc-text-muted);
          white-space: nowrap;
        }

        .pc-mine__pm-count b {
          color: var(--pc-text);
        }

        .pc-mine__pm-grid {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 16px;
        }

        .pc-mine__pm-card {
          display: flex;
          gap: 12px;
          padding: 14px;
          align-items: center;
        }

        .pc-mine__pm-thumb {
          width: 56px;
          height: 56px;
          border-radius: var(--pc-radius-sm);
          overflow: hidden;
          flex-shrink: 0;
          background: var(--pc-secondary);
        }

        .pc-mine__pm-thumb img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .pc-mine__pm-body {
          flex: 1;
          min-width: 0;
        }

        .pc-mine__pm-name {
          font-size: 12.5px;
          font-weight: 700;
          color: var(--pc-text);
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          margin-bottom: 8px;
        }

        .pc-mine__pm-price-row {
          display: flex;
          gap: 16px;
        }

        .pc-mine__pm-price-lbl {
          display: block;
          font-size: 9px;
          color: var(--pc-text-muted);
          text-transform: uppercase;
          letter-spacing: 0.3px;
        }

        .pc-mine__pm-price-val {
          display: block;
          font-size: 12.5px;
          font-weight: 800;
          color: var(--pc-danger);
          margin-top: 2px;
        }

        @media (max-width: 1100px) {
          .pc-mine__pm-grid {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }
        }
      `}</style>
    </MineSellerShell>
  );
}

export default ProductManagement;
