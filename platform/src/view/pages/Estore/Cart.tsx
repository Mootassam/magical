import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import cartActions from "src/modules/cart/cartActions";
import cartSelectors from "src/modules/cart/cartSelectors";

function Cart() {
  const dispatch = useDispatch();
  const history = useHistory();
  const items = useSelector(cartSelectors.selectItems);
  const count = useSelector(cartSelectors.selectCount);
  const total = useSelector(cartSelectors.selectTotal);

  useEffect(() => {
    dispatch(cartActions.doInit());
  }, [dispatch]);

  const doIncrement = (item) => {
    dispatch(cartActions.doUpdateQty(item.id, item.qty + 1));
  };

  const doDecrement = (item) => {
    dispatch(cartActions.doUpdateQty(item.id, item.qty - 1));
  };

  const doRemove = (id) => {
    dispatch(cartActions.doRemoveItem(id));
  };

  const doCheckout = () => {
    history.push("/checkout");
  };

  return (
    <>
      <div className="phone">

        <div className="page-header">
          <div className="left">
            <span className="back" onClick={() => window.history.back()}>←</span>
            <span className="title">My Cart ({count})</span>
          </div>
        </div>

        <div className="scroll-area">
          {items.length === 0 ? (
            <div className="empty-state">Your cart is empty.</div>
          ) : (
            <div className="cart-list">
              {items.map((item: any) => (
                <div className="cart-item" key={item.id}>
                  <div className="item-thumb">
                    {item.image && <img src={item.image} alt={item.title} />}
                  </div>
                  <div className="item-body">
                    <div className="item-name">{item.title}</div>
                    <div className="item-bottom">
                      <div className="price-block">
                        <span className="price-now">
                          ${(Number(item.price) || 0).toFixed(2)}
                        </span>
                      </div>
                      <div className="stepper">
                        <button onClick={() => doDecrement(item)}>−</button>
                        <span className="qty">{item.qty}</span>
                        <button onClick={() => doIncrement(item)}>+</button>
                      </div>
                    </div>
                  </div>
                  <span className="remove-btn" onClick={() => doRemove(item.id)}>✕</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {items.length > 0 && (
          <div className="checkout-bar">
            <div className="checkout-top">
              <span>Total</span>
              <div className="total-block">
                <div className="total-value">${total.toFixed(2)}</div>
              </div>
            </div>
            <button className="checkout-btn" onClick={doCheckout}>
              Checkout ({count})
            </button>
          </div>
        )}

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
        .page-header .left{ display:flex; align-items:center; gap:10px; }
        .page-header .back{ font-size:18px; cursor:pointer; }
        .page-header .title{ font-size:18px; font-weight:800; }

        /* ---------- Scroll body ---------- */
        .scroll-area{
          flex:1;
          overflow-y:auto;
          scrollbar-width:none;
          padding-bottom:8px;
        }
        .scroll-area::-webkit-scrollbar{ display:none; }

        .empty-state{
          text-align:center;
          color:var(--grey-text);
          font-size:13px;
          padding:60px 20px;
        }

        .cart-list{
          margin:14px 14px 0;
          background:var(--card-bg);
          border-radius:16px;
          box-shadow:0 8px 20px rgba(0,0,0,0.06);
          overflow:hidden;
        }

        .cart-item{
          display:flex;
          align-items:flex-start;
          gap:10px;
          padding:14px;
          border-top:1px solid var(--grey-light);
        }
        .cart-item:first-child{ border-top:none; }

        .item-thumb{
          width:76px; height:76px;
          border-radius:12px;
          overflow:hidden;
          flex-shrink:0;
          background:var(--grey-light);
        }
        .item-thumb img{ width:100%; height:100%; object-fit:cover; }

        .item-body{ flex:1; min-width:0; }
        .item-name{
          font-size:13px; font-weight:700; color:var(--navy);
          overflow:hidden; text-overflow:ellipsis; display:-webkit-box;
          -webkit-line-clamp:2; -webkit-box-orient:vertical;
        }

        .item-bottom{
          display:flex;
          justify-content:space-between;
          align-items:center;
          margin-top:8px;
        }

        .price-block{ display:flex; align-items:baseline; gap:6px; }
        .price-now{ font-size:14px; font-weight:800; color:var(--blue-deep); }

        .stepper{
          display:flex;
          align-items:center;
          gap:0;
          background:var(--grey-light);
          border-radius:10px;
          overflow:hidden;
        }
        .stepper button{
          width:26px; height:26px;
          border:none;
          background:transparent;
          font-size:15px;
          color:var(--blue-deep);
          font-weight:700;
          cursor:pointer;
        }
        .stepper .qty{
          width:26px;
          text-align:center;
          font-size:13px;
          font-weight:700;
          color:var(--navy);
        }

        .remove-btn{
          font-size:13px;
          color:#888888;
          cursor:pointer;
          padding:4px;
          flex-shrink:0;
        }

        /* ---------- Checkout summary (above tab bar) ---------- */
        .checkout-bar{
          flex-shrink:0;
          background:#fff;
          box-shadow:0 -6px 18px rgba(0,0,0,0.08);
          border-top:1px solid var(--grey-light);
          padding:12px 16px;
          z-index:20;
        }
        .checkout-top{
          display:flex;
          justify-content:space-between;
          align-items:center;
          margin-bottom:10px;
          font-size:12.5px;
          color:var(--navy);
          font-weight:600;
        }
        .total-block{ text-align:right; }
        .total-value{ font-size:17px; font-weight:800; color:var(--blue-deep); }

        .checkout-btn{
          width:100%;
          border:none;
          border-radius:14px;
          padding:13px;
          background:linear-gradient(135deg, var(--blue-bright), var(--blue-deep));
          color:#fff;
          font-size:15px;
          font-weight:800;
          letter-spacing:0.3px;
          cursor:pointer;
          box-shadow:0 10px 22px rgba(209,69,31,0.4);
        }

      `}</style>
    </>
  );
}

export default Cart;
