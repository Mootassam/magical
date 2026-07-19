import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import shopProductActions from "src/modules/shop/shopProductActions";
import shopProductSelectors from "src/modules/shop/shopProductSelectors";
import cartActions from "src/modules/cart/cartActions";

function ProductDetails(props) {
  const dispatch = useDispatch();
  const history = useHistory();
  const id = props.match?.params?.id;

  const record = useSelector(shopProductSelectors.selectRecord);
  const loading = useSelector(shopProductSelectors.selectFindLoading);
  const [qty, setQty] = useState(1);

  useEffect(() => {
    if (id) {
      dispatch(shopProductActions.doFind(id, true));
    }
  }, [dispatch, id]);

  const doAddToCart = () => {
    if (!record) return;
    dispatch(cartActions.doAddItem(record, qty));
  };

  const doBuyNow = () => {
    if (!record) return;
    dispatch(cartActions.doAddItem(record, qty));
    history.push("/cart");
  };

  const price =
    record && typeof record.price === "number"
      ? record.price.toFixed(2)
      : record?.price;

  return (
    <>
      <div className="phone">

        <div className="page-header">
          <button className="back-btn" onClick={() => window.history.back()}>←</button>
          <span className="page-title">Product Details</span>
        </div>

        <div className="scroll-area">

          {loading && <div className="state-text">Loading...</div>}

          {!loading && !record && (
            <div className="state-text">Product not found.</div>
          )}

          {!loading && record && (
            <>
              <div className="product-image">
                {record.image && <img src={record.image} alt={record.title} />}
              </div>

              <div className="product-body">
                {record.category?.name && (
                  <div className="category-badge">{record.category.name}</div>
                )}

                <div className="product-title">{record.title}</div>
                <div className="product-price">${price}</div>

                {record.description && (
                  <>
                    <div className="section-label">Description</div>
                    <div className="product-description">{record.description}</div>
                  </>
                )}

                <div className="section-label">Quantity</div>
                <div className="qty-stepper">
                  <button onClick={() => setQty((value) => Math.max(1, value - 1))}>−</button>
                  <span className="qty-value">{qty}</span>
                  <button onClick={() => setQty((value) => value + 1)}>+</button>
                </div>
              </div>
            </>
          )}

        </div>

        {!loading && record && (
          <div className="action-bar">
            <button className="add-cart-btn" onClick={doAddToCart}>
              🛒 Add to Cart
            </button>
            <button className="buy-now-btn" onClick={doBuyNow}>
              Buy Now
            </button>
          </div>
        )}

      </div>

      <style>{`
        :root{
          --navy:#0e1b45;
          --blue-bright:#2f8dff;
          --blue-mid:#1656c9;
          --blue-deep:#0b3fae;
          --white:#ffffff;
          --page-bg:#f4f7fd;
          --card-bg:#ffffff;
          --grey-text:#6b7590;
          --grey-light:#eef2fa;
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

        /* ---------- Scroll body ---------- */
        .scroll-area{
          flex:1;
          overflow-y:auto;
          scrollbar-width:none;
          padding-bottom:20px;
        }
        .scroll-area::-webkit-scrollbar{ display:none; }

        .state-text{
          text-align:center;
          color:var(--grey-text);
          font-size:13px;
          padding:60px 20px;
        }

        .product-image{
          width:100%;
          height:280px;
          background:#fff;
        }
        .product-image img{ width:100%; height:100%; object-fit:cover; }

        .product-body{
          background:var(--card-bg);
          border-radius:22px 22px 0 0;
          margin-top:-18px;
          position:relative;
          padding:20px 18px 30px;
        }

        .category-badge{
          display:inline-block;
          background:var(--grey-light);
          color:var(--blue-mid);
          font-size:11px;
          font-weight:700;
          padding:4px 10px;
          border-radius:8px;
          margin-bottom:10px;
        }

        .product-title{
          font-size:18px;
          font-weight:800;
          color:var(--navy);
          line-height:1.4;
        }

        .product-price{
          font-size:22px;
          font-weight:800;
          color:var(--blue-deep);
          margin-top:8px;
        }

        .section-label{
          font-size:13px;
          font-weight:700;
          color:var(--navy);
          margin:20px 0 8px;
        }

        .product-description{
          font-size:12.5px;
          color:var(--grey-text);
          line-height:1.7;
          white-space:pre-line;
        }

        .qty-stepper{
          display:inline-flex;
          align-items:center;
          gap:0;
          background:var(--grey-light);
          border-radius:12px;
          overflow:hidden;
        }
        .qty-stepper button{
          width:36px; height:36px;
          border:none;
          background:transparent;
          font-size:17px;
          color:var(--blue-deep);
          font-weight:700;
          cursor:pointer;
        }
        .qty-value{
          width:36px;
          text-align:center;
          font-size:14px;
          font-weight:700;
          color:var(--navy);
        }

        /* ---------- Bottom action bar ---------- */
        .action-bar{
          flex-shrink:0;
          display:flex;
          gap:10px;
          padding:12px 16px;
          background:#fff;
          box-shadow:0 -6px 18px rgba(20,40,100,0.08);
          border-top:1px solid var(--grey-light);
        }
        .add-cart-btn, .buy-now-btn{
          flex:1;
          border:none;
          border-radius:14px;
          padding:14px;
          font-size:14px;
          font-weight:800;
          cursor:pointer;
        }
        .add-cart-btn{
          background:var(--grey-light);
          color:var(--blue-deep);
        }
        .buy-now-btn{
          background:linear-gradient(135deg, var(--blue-bright), var(--blue-deep));
          color:#fff;
          box-shadow:0 10px 22px rgba(47,141,255,0.4);
        }
      `}</style>
    </>
  );
}

export default ProductDetails;
