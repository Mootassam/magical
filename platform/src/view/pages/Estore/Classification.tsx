import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import shopCategoryActions from "src/modules/shop/shopCategoryActions";
import shopCategorySelectors from "src/modules/shop/shopCategorySelectors";
import shopProductActions from "src/modules/shop/shopProductActions";
import shopProductSelectors from "src/modules/shop/shopProductSelectors";
import categoryIcon from "src/view/pages/Estore/shared/categoryIcon";

function Classification() {
  const dispatch = useDispatch();
  const history = useHistory();

  const categories = useSelector(shopCategorySelectors.selectRows);
  const categoriesLoading = useSelector(shopCategorySelectors.selectLoading);
  const products = useSelector(shopProductSelectors.selectRows);
  const productsLoading = useSelector(shopProductSelectors.selectLoading);

  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(null);
  const [search, setSearch] = useState("");

  useEffect(() => {
    dispatch(shopCategoryActions.doFetch());
  }, [dispatch]);

  useEffect(() => {
    if (!selectedCategoryId && categories.length > 0) {
      setSelectedCategoryId(categories[0].id);
    }
  }, [categories, selectedCategoryId]);

  useEffect(() => {
    if (selectedCategoryId) {
      dispatch(shopProductActions.doFetch(selectedCategoryId));
    }
  }, [dispatch, selectedCategoryId]);

  const selectedCategory = categories.find(
    (category: any) => category.id === selectedCategoryId,
  );

  const visibleProducts = products.filter((product: any) =>
    !search.trim() ||
    (product.title || "").toLowerCase().includes(search.trim().toLowerCase()),
  );

  const goToProduct = (id: string) => {
    history.push(`/product/${id}`);
  };

  return (
    <>
      <div className="phone">

        <div className="page-header">
          <div className="page-title">Categories</div>
          <div className="search-row">
            <span className="search-icon">🔍</span>
            <input
              type="text"
              placeholder="Search in categories"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
            />
          </div>
        </div>

        <div className="body-split">

          <div className="sidebar">
            {categoriesLoading && (
              <div className="sidebar-loading">Loading...</div>
            )}

            {!categoriesLoading && categories.length === 0 && (
              <div className="sidebar-loading">No categories</div>
            )}

            {!categoriesLoading &&
              categories.map((category: any) => (
                <div
                  key={category.id}
                  className={`side-item${category.id === selectedCategoryId ? " active" : ""}`}
                  onClick={() => setSelectedCategoryId(category.id)}
                >
                  <div className="thumb icon-thumb">
                    <span>{categoryIcon(category.name)}</span>
                  </div>
                  <span>{category.name}</span>
                </div>
              ))}
          </div>

          <div className="content-panel">

            {selectedCategory && (
              <div className="cat-banner icon-banner">
                <div className="txt">
                  <div className="eyebrow">Category</div>
                  <div className="name">
                    {categoryIcon(selectedCategory.name)} {selectedCategory.name}
                  </div>
                </div>
              </div>
            )}

            {productsLoading && <div className="state-text">Loading products...</div>}

            {!productsLoading && visibleProducts.length === 0 && (
              <div className="state-text">No products found in this category.</div>
            )}

            {!productsLoading && visibleProducts.length > 0 && (
              <div className="grid">
                {visibleProducts.map((product: any) => (
                  <div
                    className="prod-card"
                    key={product.id}
                    onClick={() => goToProduct(product.id)}
                  >
                    <div className="prod-thumb">
                      {product.image && <img src={product.image} alt={product.title} />}
                    </div>
                    <div className="prod-info">
                      <div className="prod-name">{product.title}</div>
                      <div className="prod-price-row">
                        <span className="prod-price">
                          ${typeof product.price === "number" ? product.price.toFixed(2) : product.price}
                        </span>
                        <button
                          className="add-btn"
                          onClick={(event) => {
                            event.stopPropagation();
                            goToProduct(product.id);
                          }}
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

          </div>

        </div>

      </div>

      <style>{`
        :root{
          --navy:#0e1b45;
          --blue-bright:#2f8dff;
          --blue-mid:#1656c9;
          --blue-deep:#0b3fae;
          --white:#ffffff;
          --page-bg:#f4f7fd;
          --sidebar-bg:#eef2fb;
          --card-bg:#ffffff;
          --grey-text:#6b7590;
          --gold:#ffb020;
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

        /* ---------- Top header ---------- */
        .page-header{
          background:linear-gradient(135deg, var(--blue-deep), var(--blue-bright));
          padding:14px 18px 16px;
          color:#fff;
          flex-shrink:0;
        }
        .page-title{ font-size:19px; font-weight:800; margin-bottom:12px; }
        .search-row{
          display:flex;
          align-items:center;
          gap:10px;
          background:#fff;
          border-radius:14px;
          padding:10px 14px;
        }
        .search-row input{
          border:none; outline:none; flex:1;
          font-size:14px; color:var(--navy); background:transparent;
        }
        .search-row input::placeholder{ color:#9aa4c0; }
        .search-icon{ font-size:16px; color:var(--blue-mid); }

        /* ---------- Body split ---------- */
        .body-split{
          flex:1;
          display:flex;
          overflow:hidden;
        }

        /* Sidebar */
        .sidebar{
          width:96px;
          flex-shrink:0;
          background:var(--sidebar-bg);
          overflow-y:auto;
          scrollbar-width:none;
          padding-bottom:100px;
        }
        .sidebar::-webkit-scrollbar{ display:none; }

        .sidebar-loading{
          padding:20px 10px;
          font-size:11px;
          color:var(--grey-text);
          text-align:center;
        }

        .side-item{
          display:flex;
          flex-direction:column;
          align-items:center;
          gap:6px;
          padding:14px 6px;
          cursor:pointer;
          position:relative;
          color:var(--grey-text);
          font-size:11px;
          font-weight:600;
          text-align:center;
        }
        .side-item .thumb{
          width:44px; height:44px;
          border-radius:12px;
          overflow:hidden;
          border:2px solid transparent;
        }
        .side-item .thumb img{ width:100%; height:100%; object-fit:cover; }
        .icon-thumb{
          display:flex;
          align-items:center;
          justify-content:center;
          background:#fff;
          font-size:20px;
        }

        .side-item.active{
          background:var(--page-bg);
          color:var(--blue-deep);
        }
        .side-item.active::before{
          content:"";
          position:absolute; left:0; top:0; bottom:0;
          width:4px;
          background:linear-gradient(180deg, var(--blue-bright), var(--blue-deep));
          border-radius:0 4px 4px 0;
        }
        .side-item.active .thumb{ border-color:var(--blue-bright); }

        /* Content panel */
        .content-panel{
          flex:1;
          overflow-y:auto;
          scrollbar-width:none;
          padding:16px 14px 110px;
        }
        .content-panel::-webkit-scrollbar{ display:none; }

        .cat-banner{
          position:relative;
          border-radius:18px;
          overflow:hidden;
          margin-bottom:16px;
          color:#fff;
        }
        .icon-banner{
          background:linear-gradient(120deg, var(--blue-deep), var(--blue-bright));
          padding:18px 16px;
        }
        .cat-banner .eyebrow{ font-size:9px; letter-spacing:2px; text-transform:uppercase; opacity:0.85; }
        .cat-banner .name{ font-size:19px; font-weight:800; margin-top:2px; }

        .state-text{
          text-align:center;
          color:var(--grey-text);
          font-size:12.5px;
          padding:30px 0;
        }

        .grid{
          display:grid;
          grid-template-columns:1fr 1fr;
          gap:12px;
        }
        .prod-card{
          background:var(--card-bg);
          border-radius:16px;
          overflow:hidden;
          box-shadow:0 8px 20px rgba(20,40,100,0.08);
          cursor:pointer;
        }
        .prod-thumb{ width:100%; height:120px; position:relative; background:var(--sidebar-bg); }
        .prod-thumb img{ width:100%; height:100%; object-fit:cover; }
        .prod-info{ padding:9px 11px 11px; }
        .prod-name{
          font-size:12.5px; font-weight:700; color:var(--navy); line-height:1.3;
          overflow:hidden; text-overflow:ellipsis; display:-webkit-box;
          -webkit-line-clamp:2; -webkit-box-orient:vertical;
        }
        .prod-price-row{ display:flex; justify-content:space-between; align-items:center; margin-top:7px; }
        .prod-price{ font-size:13.5px; font-weight:800; color:var(--blue-deep); }
        .add-btn{
          width:26px; height:26px; border-radius:50%;
          background:linear-gradient(135deg, var(--blue-bright), var(--blue-mid));
          color:#fff; border:none; font-size:15px;
          display:flex; align-items:center; justify-content:center;
          cursor:pointer;
          box-shadow:0 6px 14px rgba(47,141,255,0.4);
        }

      `}</style>
    </>
  );
}

export default Classification;
