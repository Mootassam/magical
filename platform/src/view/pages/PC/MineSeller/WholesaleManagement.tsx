import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import shopCategoryActions from "src/modules/shop/shopCategoryActions";
import shopCategorySelectors from "src/modules/shop/shopCategorySelectors";
import shopProductActions from "src/modules/shop/shopProductActions";
import shopProductSelectors from "src/modules/shop/shopProductSelectors";
import storeListingActions from "src/modules/storeListing/storeListingActions";
import storeListingSelectors from "src/modules/storeListing/storeListingSelectors";
import Message from "src/view/shared/message";
import MineSellerShell from "./MineSellerShell";
import { sharedMineStyles } from "src/view/pages/PC/Mine/MyAccount";

const WHOLESALE_DISCOUNT = 0.2;

function toWholesalePrice(price) {
  const numeric = Number(price) || 0;
  return numeric * (1 - WHOLESALE_DISCOUNT);
}

function formatPrice(value) {
  return `$${(Number(value) || 0).toFixed(2)}`;
}

function WholesaleManagement() {
  const dispatch = useDispatch();

  const categories = useSelector(shopCategorySelectors.selectRows);
  const categoriesLoading = useSelector(shopCategorySelectors.selectLoading);
  const products = useSelector(shopProductSelectors.selectRows);
  const productsCount = useSelector(shopProductSelectors.selectCount);
  const productsLoading = useSelector(shopProductSelectors.selectLoading);
  const loadingMore = useSelector(shopProductSelectors.selectLoadingMore);
  const hasMore = useSelector(shopProductSelectors.selectHasMore);
  const listedProductIds = useSelector(storeListingSelectors.selectListedProductIds);
  const listingSaveLoading = useSelector(storeListingSelectors.selectCreateLoading);

  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(null);
  const [minPriceInput, setMinPriceInput] = useState("");
  const [maxPriceInput, setMaxPriceInput] = useState("");
  const [appliedPriceRange, setAppliedPriceRange] = useState<{ min: string; max: string }>({
    min: "",
    max: "",
  });
  const [listingProduct, setListingProduct] = useState<any>(null);

  const sentinelRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    dispatch(shopCategoryActions.doFetch());
    dispatch(storeListingActions.doFetchMine());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  useEffect(() => {
    dispatch(
      shopProductActions.doFetch(
        selectedCategoryId || undefined,
        appliedPriceRange.min,
        appliedPriceRange.max,
      ),
    );
  }, [dispatch, selectedCategoryId, appliedPriceRange]);

  // Infinite scroll: load the next page of products (10 at a time) as the
  // user nears the bottom of the page, instead of fetching the whole
  // catalog (or whole category) up front. Unlike the mobile version there's
  // no fixed-height scroll container on desktop, so the observer watches
  // the viewport itself (root: null).
  useEffect(() => {
    const target = sentinelRef.current;

    if (!target) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          dispatch(shopProductActions.doFetchMore());
        }
      },
      { root: null, rootMargin: "200px" },
    );

    observer.observe(target);

    return () => observer.disconnect();
  }, [dispatch, selectedCategoryId, appliedPriceRange]);

  const doSelectCategory = (categoryId: string | null) => {
    setSelectedCategoryId(categoryId);
  };

  const doApplyFilter = () => {
    setAppliedPriceRange({ min: minPriceInput.trim(), max: maxPriceInput.trim() });
  };

  const doOpenListingModal = (product: any) => {
    if (listedProductIds.has(product.id)) {
      Message.success("Already added to your wholesale listings.");
      return;
    }

    setListingProduct(product);
  };

  const doCloseListingModal = () => {
    setListingProduct(null);
  };

  const doConfirmListing = async () => {
    const record = await dispatch(
      storeListingActions.doCreate(listingProduct.id) as any,
    );

    if (record) {
      Message.success(`"${listingProduct.title}" added to your wholesale listings.`);
      setListingProduct(null);
    }
  };

  const selectedCategory = categories.find(
    (category: any) => category.id === selectedCategoryId,
  );

  const isInitialLoading = productsLoading && products.length === 0;

  return (
    <MineSellerShell active="wholesale">
      <h1 className="pc-mine__page-title">Wholesale Management</h1>

      <div className="pc-card pc-mine__panel pc-mine__wholesale-toolbar">
        <div className="pc-mine__wholesale-chips">
          <div
            className={`pc-mine__wholesale-chip${!selectedCategoryId ? " active" : ""}`}
            onClick={() => doSelectCategory(null)}
          >
            All
          </div>
          {!categoriesLoading &&
            categories.map((category: any) => (
              <div
                key={category.id}
                className={`pc-mine__wholesale-chip${category.id === selectedCategoryId ? " active" : ""}`}
                onClick={() => doSelectCategory(category.id)}
              >
                {category.name}
              </div>
            ))}
          {categoriesLoading && (
            <>
              <div className="pc-skeleton pc-mine__wholesale-chip-skeleton" />
              <div className="pc-skeleton pc-mine__wholesale-chip-skeleton" />
              <div className="pc-skeleton pc-mine__wholesale-chip-skeleton" />
            </>
          )}
        </div>

        <div className="pc-mine__wholesale-filter">
          <input
            type="number"
            className="pc-input"
            placeholder="Lowest Price"
            value={minPriceInput}
            onChange={(event) => setMinPriceInput(event.target.value)}
          />
          <span className="pc-mine__wholesale-dash">–</span>
          <input
            type="number"
            className="pc-input"
            placeholder="Highest Price"
            value={maxPriceInput}
            onChange={(event) => setMaxPriceInput(event.target.value)}
          />
          <button type="button" className="pc-btn pc-btn-primary" onClick={doApplyFilter}>
            Filter
          </button>
        </div>
      </div>

      <div className="pc-mine__wholesale-count">
        {isInitialLoading ? (
          "Loading items…"
        ) : (
          <>
            Showing <b>{products.length}</b> of <b>{productsCount}</b> item
            {productsCount === 1 ? "" : "s"}
            {selectedCategory ? ` in ${selectedCategory.name}` : ""}
          </>
        )}
      </div>

      {isInitialLoading && (
        <div className="pc-mine__wholesale-grid">
          {Array.from({ length: 8 }).map((_, index) => (
            <div className="pc-card pc-mine__wholesale-card" key={index}>
              <div className="pc-skeleton pc-mine__wholesale-thumb" />
              <div className="pc-mine__wholesale-body">
                <div className="pc-skeleton" style={{ height: 13, width: "80%", marginBottom: 10 }} />
                <div className="pc-skeleton" style={{ height: 12, width: "50%" }} />
              </div>
            </div>
          ))}
        </div>
      )}

      {!isInitialLoading && products.length === 0 && (
        <div className="pc-card pc-mine__empty">
          <div className="pc-mine__empty-title">No products match this filter</div>
          <div className="pc-mine__empty-text">Try a different category or price range.</div>
        </div>
      )}

      {!isInitialLoading && products.length > 0 && (
        <div className="pc-mine__wholesale-grid">
          {products.map((product: any) => {
            const isListed = listedProductIds.has(product.id);

            return (
              <div
                className="pc-card pc-mine__wholesale-card"
                key={product.id}
                onClick={() => doOpenListingModal(product)}
              >
                <div className="pc-mine__wholesale-thumb">
                  {product.image && <img src={product.image} alt={product.title} loading="lazy" />}
                </div>
                <div className="pc-mine__wholesale-body">
                  <div className="pc-mine__wholesale-name">{product.title}</div>
                  <div className="pc-mine__wholesale-bottom">
                    <span className="pc-mine__wholesale-price">
                      {formatPrice(toWholesalePrice(product.price))}
                    </span>
                    <button
                      type="button"
                      className={`pc-mine__wholesale-add${isListed ? " listed" : ""}`}
                      onClick={(event) => {
                        event.stopPropagation();
                        doOpenListingModal(product);
                      }}
                    >
                      {isListed ? "✓ Added" : "＋ Add"}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      <div className="pc-mine__wholesale-sentinel" ref={sentinelRef}>
        {!isInitialLoading && loadingMore && <span>Loading more…</span>}
        {!isInitialLoading && !loadingMore && !hasMore && products.length > 0 && (
          <span>You've reached the end.</span>
        )}
      </div>

      {listingProduct && (
        <div className="pc-mine__wholesale-modal-overlay" onClick={doCloseListingModal}>
          <div className="pc-card pc-mine__wholesale-modal" onClick={(event) => event.stopPropagation()}>
            <div className="pc-mine__wholesale-modal-header">
              <div className="pc-mine__wholesale-modal-thumb">
                {listingProduct.image && (
                  <img src={listingProduct.image} alt={listingProduct.title} />
                )}
              </div>
              <div className="pc-mine__wholesale-modal-title">{listingProduct.title}</div>
              <button type="button" className="pc-mine__wholesale-modal-close" onClick={doCloseListingModal}>
                ✕
              </button>
            </div>

            <div className="pc-mine__wholesale-modal-body">
              <div className="pc-mine__row">
                <span className="pc-mine__row-label">Sales Price</span>
                <span className="pc-mine__row-value">{formatPrice(listingProduct.price)}</span>
              </div>
              <div className="pc-mine__row">
                <span className="pc-mine__row-label">Wholesale Price</span>
                <span className="pc-mine__row-value">
                  {formatPrice(toWholesalePrice(listingProduct.price))}
                </span>
              </div>
            </div>

            <div className="pc-mine__wholesale-modal-actions">
              <button
                type="button"
                className="pc-btn pc-btn-ghost"
                disabled={listingSaveLoading}
                onClick={doCloseListingModal}
              >
                Cancel
              </button>
              <button
                type="button"
                className="pc-btn pc-btn-primary"
                disabled={listingSaveLoading}
                onClick={doConfirmListing}
              >
                {listingSaveLoading ? "Confirming…" : "Confirm listing"}
              </button>
            </div>
          </div>
        </div>
      )}

      <style>{sharedMineStyles}</style>
      <style>{`
        .pc-mine__wholesale-toolbar {
          padding: 18px 20px;
          margin-bottom: 16px;
        }

        .pc-mine__wholesale-chips {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          margin-bottom: 14px;
        }

        .pc-mine__wholesale-chip {
          flex: 0 0 auto;
          font-size: 12.5px;
          font-weight: 600;
          color: var(--pc-text-secondary);
          padding: 8px 16px;
          border-radius: 999px;
          white-space: nowrap;
          cursor: pointer;
          background: var(--pc-secondary);
        }

        .pc-mine__wholesale-chip:hover {
          opacity: 0.85;
        }

        .pc-mine__wholesale-chip.active {
          background: linear-gradient(135deg, var(--pc-primary), var(--pc-primary-dark));
          color: #fff;
          font-weight: 700;
        }

        .pc-mine__wholesale-chip-skeleton {
          width: 72px;
          height: 30px;
          border-radius: 999px;
        }

        .pc-mine__wholesale-filter {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .pc-mine__wholesale-filter .pc-input {
          max-width: 180px;
        }

        .pc-mine__wholesale-dash {
          color: var(--pc-text-muted);
          font-size: 13px;
        }

        .pc-mine__wholesale-count {
          font-size: 12.5px;
          color: var(--pc-text-muted);
          margin-bottom: 12px;
        }

        .pc-mine__wholesale-count b {
          color: var(--pc-text);
        }

        .pc-mine__wholesale-grid {
          display: grid;
          grid-template-columns: repeat(4, minmax(0, 1fr));
          gap: 16px;
        }

        .pc-mine__wholesale-card {
          overflow: hidden;
          cursor: pointer;
          transition: transform 0.12s ease, box-shadow 0.12s ease;
        }

        .pc-mine__wholesale-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 24px var(--pc-shadow);
        }

        .pc-mine__wholesale-thumb {
          width: 100%;
          height: 150px;
          background: var(--pc-secondary);
        }

        .pc-mine__wholesale-thumb img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .pc-mine__wholesale-body {
          padding: 12px 14px 14px;
        }

        .pc-mine__wholesale-name {
          font-size: 13px;
          font-weight: 700;
          color: var(--pc-text);
          line-height: 1.35;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          margin-bottom: 10px;
        }

        .pc-mine__wholesale-bottom {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 8px;
        }

        .pc-mine__wholesale-price {
          font-size: 14.5px;
          font-weight: 800;
          color: var(--pc-danger);
        }

        .pc-mine__wholesale-add {
          flex-shrink: 0;
          border: 1.5px solid var(--pc-primary);
          background: var(--pc-surface);
          color: var(--pc-primary-dark);
          border-radius: var(--pc-radius-sm);
          padding: 6px 12px;
          font-size: 11.5px;
          font-weight: 700;
          cursor: pointer;
        }

        .pc-mine__wholesale-add:hover {
          background: #FAECE9;
        }

        .pc-mine__wholesale-add.listed {
          border-color: var(--pc-success);
          background: #E9F9EF;
          color: var(--pc-success);
        }

        .pc-mine__wholesale-sentinel {
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 24px 0 4px;
          font-size: 12.5px;
          color: var(--pc-text-muted);
        }

        .pc-mine__wholesale-modal-overlay {
          position: fixed;
          inset: 0;
          background: rgba(0, 0, 0, 0.4);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
          padding: 20px;
        }

        .pc-mine__wholesale-modal {
          width: 100%;
          max-width: 420px;
          overflow: hidden;
        }

        .pc-mine__wholesale-modal-header {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 20px 20px 16px;
          border-bottom: 1px solid var(--pc-divider);
        }

        .pc-mine__wholesale-modal-thumb {
          width: 44px;
          height: 44px;
          border-radius: var(--pc-radius-sm);
          overflow: hidden;
          background: var(--pc-secondary);
          flex-shrink: 0;
        }

        .pc-mine__wholesale-modal-thumb img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .pc-mine__wholesale-modal-title {
          flex: 1;
          min-width: 0;
          font-size: 15px;
          font-weight: 700;
          color: var(--pc-text);
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }

        .pc-mine__wholesale-modal-close {
          border: none;
          background: transparent;
          color: var(--pc-text-muted);
          font-size: 16px;
          cursor: pointer;
          flex-shrink: 0;
        }

        .pc-mine__wholesale-modal-body {
          padding: 4px 20px 8px;
        }

        .pc-mine__wholesale-modal-actions {
          display: flex;
          justify-content: flex-end;
          gap: 10px;
          padding: 16px 20px 20px;
        }

        @media (max-width: 1180px) {
          .pc-mine__wholesale-grid {
            grid-template-columns: repeat(3, minmax(0, 1fr));
          }
        }

        @media (max-width: 860px) {
          .pc-mine__wholesale-grid {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }
        }
      `}</style>
    </MineSellerShell>
  );
}

export default WholesaleManagement;
