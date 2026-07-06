import React from "react";

function Cart() {
  return (
    <>
      <div className="phone">

        <div className="page-header">
          <div className="left">
            <span className="back">←</span>
            <span className="title">My Cart (2)</span>
          </div>
          <span className="edit">Edit</span>
        </div>

        <div className="scroll-area">
          <div className="cart-list">
            <div className="cart-item">
              <div className="checkbox checked">✓</div>
              <div className="item-thumb"><img src="https://loremflickr.com/200/200/jacket,fashion/all?lock=91" alt="Oversized Jacket" /></div>
              <div className="item-body">
                <div className="item-name">Oversized Jacket</div>
                <div className="item-variant">Beige · Size M</div>
                <div className="item-bottom">
                  <div className="price-block">
                    <span className="price-now">$56</span>
                    <span className="price-old">$80</span>
                  </div>
                  <div className="stepper">
                    <button>−</button>
                    <span className="qty">1</span>
                    <button>+</button>
                  </div>
                </div>
              </div>
            </div>

            <div className="cart-item">
              <div className="checkbox checked">✓</div>
              <div className="item-thumb"><img src="https://loremflickr.com/200/200/wristwatch/all?lock=92" alt="Minimal Watch" /></div>
              <div className="item-body">
                <div className="item-name">Minimal Watch</div>
                <div className="item-variant">Silver</div>
                <div className="item-bottom">
                  <div className="price-block">
                    <span className="price-now">$65</span>
                  </div>
                  <div className="stepper">
                    <button>−</button>
                    <span className="qty">1</span>
                    <button>+</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="checkout-bar">
          <div className="checkout-top">
            <div className="select-all">
              <div className="checkbox checked">✓</div>
              <span>Select all (2)</span>
            </div>
            <div className="total-block">
              <div className="total-label">Total</div>
              <div className="total-value">$121.00</div>
            </div>
          </div>
          <button className="checkout-btn">Checkout (2)</button>
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
          justify-content:space-between;
        }
        .page-header .left{ display:flex; align-items:center; gap:10px; }
        .page-header .back{ font-size:18px; }
        .page-header .title{ font-size:18px; font-weight:800; }
        .page-header .edit{ font-size:13px; font-weight:600; opacity:0.9; }

        /* ---------- Scroll body ---------- */
        .scroll-area{
          flex:1;
          overflow-y:auto;
          scrollbar-width:none;
          padding-bottom:8px;
        }
        .scroll-area::-webkit-scrollbar{ display:none; }

        .cart-list{
          margin:14px 14px 0;
          background:var(--card-bg);
          border-radius:16px;
          box-shadow:0 8px 20px rgba(20,40,100,0.06);
          overflow:hidden;
        }

        .cart-item{
          display:flex;
          gap:10px;
          padding:14px;
          border-top:1px solid var(--grey-light);
        }
        .cart-item:first-child{ border-top:none; }

        .checkbox{
          width:19px; height:19px;
          border-radius:6px;
          border:2px solid #cdd6ec;
          flex-shrink:0;
          margin-top:4px;
          display:flex; align-items:center; justify-content:center;
          font-size:12px;
          color:#fff;
        }
        .checkbox.checked{
          background:linear-gradient(135deg, var(--blue-bright), var(--blue-deep));
          border-color:transparent;
        }

        .item-thumb{
          width:76px; height:76px;
          border-radius:12px;
          overflow:hidden;
          flex-shrink:0;
        }
        .item-thumb img{ width:100%; height:100%; object-fit:cover; }

        .item-body{ flex:1; min-width:0; }
        .item-name{
          font-size:13px; font-weight:700; color:var(--navy);
        }
        .item-variant{
          font-size:11px; color:var(--grey-text);
          margin-top:4px;
          background:var(--grey-light);
          display:inline-block;
          padding:2px 8px;
          border-radius:6px;
        }

        .item-bottom{
          display:flex;
          justify-content:space-between;
          align-items:center;
          margin-top:8px;
        }

        .price-block{ display:flex; align-items:baseline; gap:6px; }
        .price-now{ font-size:14px; font-weight:800; color:var(--blue-deep); }
        .price-old{ font-size:10.5px; color:#b7c0d8; text-decoration:line-through; }

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

        /* ---------- Checkout summary (above tab bar) ---------- */
        .checkout-bar{
          flex-shrink:0;
          background:#fff;
          box-shadow:0 -6px 18px rgba(20,40,100,0.08);
          border-top:1px solid var(--grey-light);
          padding:12px 16px;
          z-index:20;
        }
        .checkout-top{
          display:flex;
          justify-content:space-between;
          align-items:center;
          margin-bottom:10px;
        }
        .select-all{
          display:flex; align-items:center; gap:8px;
          font-size:12.5px; color:var(--navy); font-weight:600;
        }
        .total-block{ text-align:right; }
        .total-label{ font-size:10.5px; color:var(--grey-text); }
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
          box-shadow:0 10px 22px rgba(47,141,255,0.4);
        }

      `}</style>
    </>
  );
}

export default Cart;
