import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import shopCategoryActions from "src/modules/shop/shopCategoryActions";
import shopCategorySelectors from "src/modules/shop/shopCategorySelectors";
import shopProductActions from "src/modules/shop/shopProductActions";
import shopProductSelectors from "src/modules/shop/shopProductSelectors";
import storeListingActions from "src/modules/storeListing/storeListingActions";
import storeListingSelectors from "src/modules/storeListing/storeListingSelectors";
import Message from "src/view/shared/message";

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

  const scrollRef = useRef<HTMLDivElement | null>(null);
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
  // user nears the bottom of the list, instead of fetching the whole
  // catalog (or whole category) up front.
  useEffect(() => {
    const root = scrollRef.current;
    const target = sentinelRef.current;

    if (!root || !target) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          dispatch(shopProductActions.doFetchMore());
        }
      },
      { root, rootMargin: "150px" },
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
    <>
      <div className="phone">

        <div className="page-header">
          <button className="back-btn" onClick={() => window.history.back()}>←</button>
          <span className="page-title">Wholesale Management</span>
        </div>

        <div className="tabs-wrap">
          <div className="tabs-scroll">
            <div
              className={`tab-chip${!selectedCategoryId ? " active" : ""}`}
              onClick={() => doSelectCategory(null)}
            >
              All
            </div>
            {!categoriesLoading &&
              categories.map((category: any) => (
                <div
                  key={category.id}
                  className={`tab-chip${category.id === selectedCategoryId ? " active" : ""}`}
                  onClick={() => doSelectCategory(category.id)}
                >
                  {category.name}
                </div>
              ))}
            {categoriesLoading && (
              <>
                <div className="tab-chip skeleton-chip" />
                <div className="tab-chip skeleton-chip" />
                <div className="tab-chip skeleton-chip" />
              </>
            )}
          </div>
          <div className="filter-row">
            <input
              type="number"
              className="price-input"
              placeholder="Lowest Price"
              value={minPriceInput}
              onChange={(event) => setMinPriceInput(event.target.value)}
            />
            <span className="dash">–</span>
            <input
              type="number"
              className="price-input"
              placeholder="Highest Price"
              value={maxPriceInput}
              onChange={(event) => setMaxPriceInput(event.target.value)}
            />
            <button className="filter-btn" onClick={doApplyFilter}>Filter</button>
          </div>
        </div>

        <div className="scroll-area" ref={scrollRef}>

          <div className="result-count">
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
            <div className="grid">
              {Array.from({ length: 6 }).map((_, index) => (
                <div className="prod-card skeleton-card" key={index}>
                  <div className="prod-thumb skeleton-block" />
                  <div className="prod-info">
                    <div className="skeleton-line skeleton-line-title" />
                    <div className="prod-bottom">
                      <div className="skeleton-line skeleton-line-price" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {!isInitialLoading && products.length === 0 && (
            <div className="empty-state">No products match this filter.</div>
          )}

          {!isInitialLoading && products.length > 0 && (
            <div className="grid">
              {products.map((product: any) => {
                const isListed = listedProductIds.has(product.id);

                return (
                  <div
                    className="prod-card"
                    key={product.id}
                    onClick={() => doOpenListingModal(product)}
                  >
                    <div className="prod-thumb">
                      {product.image && <img src={product.image} alt={product.title} loading="lazy" />}
                    </div>
                    <div className="prod-info">
                      <div className="prod-name">{product.title}</div>
                      <div className="prod-bottom">
                        <span className="prod-price">
                          {formatPrice(toWholesalePrice(product.price))}
                        </span>
                        <button
                          className={`add-store-btn${isListed ? " listed" : ""}`}
                          onClick={(event) => {
                            event.stopPropagation();
                            doOpenListingModal(product);
                          }}
                        >
                          {isListed ? "✓" : "＋"}
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          <div className="load-more-sentinel" ref={sentinelRef}>
            {!isInitialLoading && loadingMore && (
              <div className="empty-state">Loading more…</div>
            )}
            {!isInitialLoading && !loadingMore && !hasMore && products.length > 0 && (
              <div className="empty-state">You've reached the end.</div>
            )}
          </div>

        </div>

        <div className="assistant-fab">💬</div>

      </div>

      {listingProduct && (
        <div className="modal-overlay" onClick={doCloseListingModal}>
          <div className="listing-modal" onClick={(event) => event.stopPropagation()}>
            <div className="listing-modal-header">
              <div className="listing-modal-thumb">
                {listingProduct.image && (
                  <img src={listingProduct.image} alt={listingProduct.title} />
                )}
              </div>
              <div className="listing-modal-title">{listingProduct.title}</div>
              <button className="listing-modal-close" onClick={doCloseListingModal}>✕</button>
            </div>

            <div className="listing-modal-divider" />

            <div className="listing-modal-body">
              <div className="listing-price-row">
                <span className="listing-price-label">Sales Price</span>
                <span className="listing-price-value">
                  {formatPrice(listingProduct.price)}
                </span>
              </div>
              <div className="listing-price-row">
                <span className="listing-price-label">Wholesale Price:</span>
                <span className="listing-price-value">
                  {formatPrice(toWholesalePrice(listingProduct.price))}
                </span>
              </div>
            </div>

            <div className="listing-modal-actions">
              <button
                className="listing-cancel-btn"
                disabled={listingSaveLoading}
                onClick={doCloseListingModal}
              >
                Cancel
              </button>
              <button
                className="listing-confirm-btn"
                disabled={listingSaveLoading}
                onClick={doConfirmListing}
              >
                {listingSaveLoading ? "Confirming…" : "Confirm listing"}
              </button>
            </div>
          </div>
        </div>
      )}

      <style>{`
        :root{
          --navy:#111111;
          --blue-bright:#D1451F;
          --blue-mid:#B93C1A;
          --blue-deep:#7F2B15;
          --white:#FFFFFF;
          --page-bg:#FAFAFA;
          --card-bg:#FFFFFF;
          --grey-text:#555555;
          --grey-light:#F4F4F4;
          --field-border:#E7E7E7;
          --red:#DC2626;
        }

        *{box-sizing:border-box; margin:0; padding:0;}

        body{
          font-family:'Segoe UI', Roboto, Arial, sans-serif;
          background:var(--page-bg);
          margin:0;
        }

        .phone{
          width:390px;
          max-width:390px;
          height:100vh;
          background:var(--page-bg);
          overflow:hidden;
          position:relative;
          display:flex;
          flex-direction:column;
          margin:0 auto;
        }

        /* ---------- Header ---------- */
        .page-header{
          background:linear-gradient(135deg, var(--blue-deep), var(--blue-bright));
          padding:14px 18px 16px;
          color:#fff;
          flex-shrink:0;
          display:flex;
          align-items:center;
          gap:12px;
        }
        .back-btn{
          width:34px; height:34px;
          border-radius:50%;
          background:rgba(255,255,255,0.18);
          display:flex; align-items:center; justify-content:center;
          font-size:16px;
          cursor:pointer;
          border:none;
          color:#fff;
        }
        .page-title{ font-size:17px; font-weight:800; }

        /* ---------- Category tabs ---------- */
        .tabs-wrap{
          background:#fff;
          flex-shrink:0;
          box-shadow:0 4px 12px rgba(0,0,0,0.05);
        }
        .tabs-scroll{
          display:flex;
          gap:6px;
          overflow-x:auto;
          scrollbar-width:none;
          padding:12px 12px 10px;
        }
        .tabs-scroll::-webkit-scrollbar{ display:none; }
        .tab-chip{
          flex:0 0 auto;
          font-size:12px;
          font-weight:600;
          color:var(--grey-text);
          padding:7px 13px;
          border-radius:16px;
          white-space:nowrap;
          cursor:pointer;
          background:var(--grey-light);
        }
        .tab-chip.active{
          background:linear-gradient(135deg, var(--blue-bright), var(--blue-deep));
          color:#fff;
          font-weight:700;
        }
        .skeleton-chip{
          width:64px;
          height:26px;
          background:linear-gradient(90deg, #F4F4F4 25%, #E7E7E7 37%, #F4F4F4 63%);
          background-size:400% 100%;
          animation:shimmer 1.4s ease infinite;
        }

        /* ---------- Price filter ---------- */
        .filter-row{
          display:flex;
          align-items:center;
          gap:8px;
          padding:0 12px 12px;
        }
        .price-input{
          flex:1;
          min-width:0;
          border:1.4px solid var(--field-border);
          border-radius:10px;
          padding:9px 10px;
          font-size:12px;
          color:var(--navy);
          outline:none;
        }
        .price-input::placeholder{ color:#888888; }
        .price-input::-webkit-outer-spin-button,
        .price-input::-webkit-inner-spin-button{
          -webkit-appearance:none;
          margin:0;
        }
        .dash{ color:var(--grey-text); font-size:12px; }
        .filter-btn{
          flex-shrink:0;
          background:linear-gradient(135deg, var(--blue-bright), var(--blue-deep));
          color:#fff;
          font-size:12px;
          font-weight:700;
          border:none;
          border-radius:10px;
          padding:9px 16px;
          box-shadow:0 6px 14px rgba(209,69,31,0.35);
          cursor:pointer;
        }

        /* ---------- Scroll body / grid ---------- */
        .scroll-area{
          flex:1;
          overflow-y:auto;
          scrollbar-width:none;
          padding:14px 12px 30px;
          position:relative;
        }
        .scroll-area::-webkit-scrollbar{ display:none; }

        .result-count{
          font-size:11.5px;
          color:var(--grey-text);
          margin-bottom:10px;
        }
        .result-count b{ color:var(--navy); }

        .empty-state{
          text-align:center;
          color:var(--grey-text);
          font-size:13px;
          padding:60px 20px;
        }

        .load-more-sentinel{
          height:30px;
          display:flex;
          align-items:center;
          justify-content:center;
        }
        .load-more-sentinel .empty-state{
          padding:14px 20px;
          font-size:12px;
        }

        .grid{
          display:grid;
          grid-template-columns:1fr 1fr;
          gap:12px;
        }
        .prod-card{
          background:var(--card-bg);
          border-radius:14px;
          overflow:hidden;
          box-shadow:0 8px 18px rgba(0,0,0,0.07);
          cursor:pointer;
        }
        .prod-thumb{ width:100%; height:130px; background:#FAFAFA; }
        .prod-thumb img{ width:100%; height:100%; object-fit:cover; }
        .prod-info{ padding:10px 10px 12px; }
        .prod-name{
          font-size:12px;
          font-weight:700;
          color:var(--navy);
          line-height:1.35;
          display:-webkit-box;
          -webkit-line-clamp:1;
          -webkit-box-orient:vertical;
          overflow:hidden;
        }
        .prod-bottom{
          display:flex;
          justify-content:space-between;
          align-items:center;
          margin-top:9px;
        }
        .prod-price{ font-size:13.5px; font-weight:800; color:var(--red); }
        .add-store-btn{
          width:30px; height:30px;
          border-radius:9px;
          border:1.4px solid var(--blue-bright);
          background:#FAFAFA;
          color:var(--blue-mid);
          display:flex; align-items:center; justify-content:center;
          font-size:14px;
          cursor:pointer;
          flex-shrink:0;
        }
        .add-store-btn.listed{
          border-color:#22C55E;
          background:#E9F9EF;
          color:#22C55E;
          font-weight:800;
        }

        /* ---------- Skeleton loading ---------- */
        @keyframes shimmer{
          0%{ background-position:100% 50%; }
          100%{ background-position:0 50%; }
        }
        .skeleton-block{
          background:linear-gradient(90deg, #F4F4F4 25%, #E7E7E7 37%, #F4F4F4 63%);
          background-size:400% 100%;
          animation:shimmer 1.4s ease infinite;
        }
        .skeleton-card{ cursor:default; }
        .skeleton-line{
          height:12px;
          border-radius:6px;
          background:linear-gradient(90deg, #F4F4F4 25%, #E7E7E7 37%, #F4F4F4 63%);
          background-size:400% 100%;
          animation:shimmer 1.4s ease infinite;
        }
        .skeleton-line-title{ width:80%; margin-bottom:10px; }
        .skeleton-line-price{ width:50%; height:14px; }

        /* ---------- Assistant floating button ---------- */
        .assistant-fab{
          position:absolute;
          right:16px; bottom:20px;
          width:50px; height:50px; border-radius:50%;
          background:linear-gradient(135deg, var(--blue-bright), var(--blue-deep));
          display:flex; align-items:center; justify-content:center;
          color:#fff; font-size:20px;
          box-shadow:0 10px 24px rgba(209,69,31,0.45);
          z-index:15;
        }

        /* ---------- Confirm listing modal ---------- */
        .modal-overlay{
          position:fixed;
          inset:0;
          background:rgba(0,0,0,0.4);
          display:flex;
          align-items:center;
          justify-content:center;
          z-index:1000;
          padding:20px;
        }
        .listing-modal{
          width:100%;
          max-width:360px;
          background:#fff;
          border-radius:16px;
          box-shadow:0 24px 48px rgba(0,0,0,0.3);
          overflow:hidden;
        }
        .listing-modal-header{
          display:flex;
          align-items:center;
          gap:10px;
          padding:16px 16px 14px;
        }
        .listing-modal-thumb{
          width:40px; height:40px;
          border-radius:10px;
          overflow:hidden;
          background:var(--grey-light);
          flex-shrink:0;
        }
        .listing-modal-thumb img{ width:100%; height:100%; object-fit:cover; }
        .listing-modal-title{
          flex:1;
          min-width:0;
          font-size:14px;
          font-weight:700;
          color:var(--navy);
          overflow:hidden;
          text-overflow:ellipsis;
          white-space:nowrap;
        }
        .listing-modal-close{
          border:none;
          background:transparent;
          color:var(--grey-text);
          font-size:15px;
          cursor:pointer;
          flex-shrink:0;
        }
        .listing-modal-divider{ height:1px; background:var(--grey-light); }
        .listing-modal-body{ padding:16px; display:flex; flex-direction:column; gap:12px; }
        .listing-price-row{
          display:flex;
          align-items:center;
          justify-content:space-between;
          gap:12px;
        }
        .listing-price-label{ font-size:13px; color:var(--navy); font-weight:600; }
        .listing-price-value{ font-size:13.5px; font-weight:800; color:var(--red); }
        .listing-modal-actions{
          display:flex;
          justify-content:flex-end;
          gap:10px;
          padding:14px 16px 18px;
        }
        .listing-cancel-btn{
          border:1.4px solid var(--field-border);
          background:#fff;
          color:var(--navy);
          font-size:13px;
          font-weight:700;
          padding:9px 16px;
          border-radius:10px;
          cursor:pointer;
        }
        .listing-cancel-btn:disabled,
        .listing-confirm-btn:disabled{
          opacity:0.6;
          cursor:not-allowed;
        }
        .listing-confirm-btn{
          border:none;
          background:linear-gradient(135deg, var(--blue-bright), var(--blue-deep));
          color:#fff;
          font-size:13px;
          font-weight:700;
          padding:9px 16px;
          border-radius:10px;
          cursor:pointer;
          box-shadow:0 8px 18px rgba(209,69,31,0.35);
        }
      `}</style>
    </>
  );
}

export default WholesaleManagement;
