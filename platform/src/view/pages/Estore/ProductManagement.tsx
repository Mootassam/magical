import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import storeListingActions from "src/modules/storeListing/storeListingActions";
import storeListingSelectors from "src/modules/storeListing/storeListingSelectors";

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
    history.push("/wholesale-management");
  };

  const visibleRows = rows.filter((row: any) =>
    !search.trim() ||
    (row.title || "").toLowerCase().includes(search.trim().toLowerCase()),
  );

  const isInitialLoading = loading && rows.length === 0;

  return (
    <>
      <div className="phone">

        <div className="page-header">
          <div className="left">
            <button className="back-btn" onClick={() => window.history.back()}>←</button>
            <span className="page-title">Product Management</span>
          </div>
          <button className="add-btn" onClick={goToWholesaleManagement}>＋</button>
        </div>

        <div className="toolbar">
          <div className="search-row">
            <span className="search-icon">🔍</span>
            <input
              type="text"
              placeholder="Search products..."
              value={search}
              onChange={(event) => setSearch(event.target.value)}
            />
          </div>
        </div>

        <div className="scroll-area">

          <div className="result-count">
            {isInitialLoading ? (
              "Loading your products…"
            ) : (
              <>Showing <b>{visibleRows.length}</b> of <b>{rows.length}</b> products</>
            )}
          </div>

          {isInitialLoading && (
            <>
              {Array.from({ length: 4 }).map((_, index) => (
                <div className="prod-row skeleton-row" key={index}>
                  <div className="prod-thumb skeleton-block" />
                  <div className="prod-body">
                    <div className="skeleton-line skeleton-line-title" />
                    <div className="price-row">
                      <div className="skeleton-line skeleton-line-price" />
                      <div className="skeleton-line skeleton-line-price" />
                    </div>
                  </div>
                </div>
              ))}
            </>
          )}

          {!isInitialLoading && rows.length === 0 && (
            <div className="empty-state">
              <div className="empty-title">No products listed yet</div>
              <div className="empty-text">
                Add products from Wholesale Management to see them here.
              </div>
              <button className="empty-cta" onClick={goToWholesaleManagement}>
                Go to Wholesale Management
              </button>
            </div>
          )}

          {!isInitialLoading && rows.length > 0 && visibleRows.length === 0 && (
            <div className="empty-state">
              <div className="empty-title">No matches</div>
              <div className="empty-text">No products match "{search}".</div>
            </div>
          )}

          {!isInitialLoading &&
            visibleRows.map((row: any) => (
              <div className="prod-row" key={row.id}>
                <div className="prod-thumb">
                  {row.image && <img src={row.image} alt={row.title} />}
                </div>
                <div className="prod-body">
                  <div className="prod-name">{row.title}</div>
                  <div className="price-row">
                    <div className="price-block">
                      <span className="price-lbl">Wholesale</span>
                      <span className="price-val">{formatPrice(row.wholesalePrice)}</span>
                    </div>
                    <div className="price-block">
                      <span className="price-lbl">Sales</span>
                      <span className="price-val">{formatPrice(row.salesPrice)}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}

        </div>

      </div>

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
          --green:#22C55E;
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
          justify-content:space-between;
        }
        .page-header .left{ display:flex; align-items:center; gap:12px; }
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
        .add-btn{
          width:34px; height:34px;
          border-radius:10px;
          background:rgba(255,255,255,0.2);
          display:flex; align-items:center; justify-content:center;
          font-size:18px;
          color:#fff;
          border:none;
          cursor:pointer;
        }

        /* ---------- Search bar ---------- */
        .toolbar{
          background:#fff;
          flex-shrink:0;
          box-shadow:0 4px 12px rgba(0,0,0,0.05);
          padding:12px 14px;
        }
        .search-row{
          display:flex;
          align-items:center;
          gap:8px;
          background:var(--grey-light);
          border-radius:12px;
          padding:10px 12px;
        }
        .search-row input{
          border:none; outline:none; flex:1; background:transparent;
          font-size:13.5px; color:var(--navy);
        }
        .search-row input::placeholder{ color:#888888; }
        .search-icon{ color:var(--grey-text); font-size:14px; }

        /* ---------- Scroll body ---------- */
        .scroll-area{
          flex:1;
          overflow-y:auto;
          scrollbar-width:none;
          padding:12px 14px 24px;
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
          padding:60px 24px;
          color:var(--grey-text);
        }
        .empty-title{ font-size:14px; font-weight:700; color:var(--navy); }
        .empty-text{ font-size:12.5px; margin-top:6px; line-height:1.5; }
        .empty-cta{
          margin-top:16px;
          border:none;
          border-radius:12px;
          padding:11px 20px;
          background:linear-gradient(135deg, var(--blue-bright), var(--blue-deep));
          color:#fff;
          font-size:13px;
          font-weight:700;
          cursor:pointer;
          box-shadow:0 8px 18px rgba(209,69,31,0.35);
        }

        .prod-row{
          display:flex;
          gap:12px;
          background:var(--card-bg);
          border-radius:14px;
          box-shadow:0 8px 18px rgba(0,0,0,0.06);
          padding:12px;
          margin-bottom:10px;
          align-items:center;
        }
        .prod-thumb{
          width:58px; height:58px;
          border-radius:10px;
          overflow:hidden;
          flex-shrink:0;
          background:#FAFAFA;
        }
        .prod-thumb img{ width:100%; height:100%; object-fit:cover; }

        .prod-body{ flex:1; min-width:0; }
        .prod-name{
          font-size:12.5px;
          font-weight:700;
          color:var(--navy);
          white-space:nowrap;
          overflow:hidden;
          text-overflow:ellipsis;
        }
        .price-row{
          display:flex;
          gap:16px;
          margin-top:8px;
          align-items:baseline;
        }
        .price-block{ display:flex; flex-direction:column; }
        .price-lbl{ font-size:8.5px; color:#888888; text-transform:uppercase; letter-spacing:0.3px; }
        .price-val{ font-size:12px; font-weight:800; color:var(--red); }

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
        .skeleton-row{ pointer-events:none; }
        .skeleton-line{
          height:11px;
          border-radius:6px;
          background:linear-gradient(90deg, #F4F4F4 25%, #E7E7E7 37%, #F4F4F4 63%);
          background-size:400% 100%;
          animation:shimmer 1.4s ease infinite;
        }
        .skeleton-line-title{ width:70%; margin-bottom:10px; }
        .skeleton-line-price{ width:44px; height:12px; }
      `}</style>
    </>
  );
}

export default ProductManagement;
