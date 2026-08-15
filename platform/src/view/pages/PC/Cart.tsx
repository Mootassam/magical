import React, { useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import cartActions from "src/modules/cart/cartActions";
import cartSelectors from "src/modules/cart/cartSelectors";
import { i18n } from "../../../i18n";

function Cart() {
  const dispatch = useDispatch();
  const history = useHistory();
  const items = useSelector(cartSelectors.selectItems);
  const count = useSelector(cartSelectors.selectCount);
  const total = useSelector(cartSelectors.selectTotal);

  useEffect(() => {
    dispatch(cartActions.doInit());
  }, [dispatch]);

  const doIncrement = (item: any) => {
    dispatch(cartActions.doUpdateQty(item.id, item.qty + 1));
  };

  const doDecrement = (item: any) => {
    dispatch(cartActions.doUpdateQty(item.id, item.qty - 1));
  };

  const doRemove = (id: string) => {
    dispatch(cartActions.doRemoveItem(id));
  };

  const doCheckout = () => {
    history.push("/pc/checkout");
  };

  return (
    <>
      <div className="pc-cart">
        <div className="pc-container">
          <h1 className="pc-cart__title">{i18n("estore.pc.cart.title")} ({count})</h1>

          {items.length === 0 ? (
            <div className="pc-cart__empty">
              <div className="pc-cart__empty-icon">🛒</div>
              <p>{i18n("estore.pc.cart.empty")}</p>
              <Link to="/pc" className="pc-btn pc-btn-primary">{i18n("estore.pc.cart.continueShopping")}</Link>
            </div>
          ) : (
            <div className="pc-cart__layout">
              <div className="pc-cart__list pc-card">
                <div className="pc-cart__list-head">
                  <span>{i18n("estore.pc.cart.product")}</span>
                  <span>{i18n("estore.pc.cart.price")}</span>
                  <span>{i18n("estore.pc.cart.quantity")}</span>
                  <span>{i18n("estore.pc.cart.subtotal")}</span>
                  <span></span>
                </div>

                {items.map((item: any) => (
                  <div className="pc-cart__row" key={item.id}>
                    <div className="pc-cart__product">
                      <div className="pc-cart__thumb">
                        {item.image && <img src={item.image} alt={item.title} />}
                      </div>
                      <span className="pc-cart__name">{item.title}</span>
                    </div>
                    <span className="pc-cart__price">${(Number(item.price) || 0).toFixed(2)}</span>
                    <div className="pc-cart__stepper">
                      <button onClick={() => doDecrement(item)}>−</button>
                      <span>{item.qty}</span>
                      <button onClick={() => doIncrement(item)}>+</button>
                    </div>
                    <span className="pc-cart__subtotal">
                      ${((Number(item.price) || 0) * item.qty).toFixed(2)}
                    </span>
                    <button className="pc-cart__remove" onClick={() => doRemove(item.id)} aria-label={i18n("estore.pc.cart.remove")}>
                      ✕
                    </button>
                  </div>
                ))}
              </div>

              <div className="pc-cart__summary pc-card">
                <h2>{i18n("estore.pc.cart.orderSummary")}</h2>
                <div className="pc-cart__summary-row">
                  <span>{i18n("estore.pc.cart.items")} ({count})</span>
                  <span>${total.toFixed(2)}</span>
                </div>
                <div className="pc-cart__summary-row">
                  <span>{i18n("estore.pc.cart.shipping")}</span>
                  <span>{i18n("estore.pc.cart.calculatedAtCheckout")}</span>
                </div>
                <div className="pc-cart__summary-total">
                  <span>{i18n("estore.pc.cart.total")}</span>
                  <span>${total.toFixed(2)}</span>
                </div>
                <button className="pc-btn pc-btn-primary pc-cart__checkout-btn" onClick={doCheckout}>
                  {i18n("estore.pc.cart.proceedToCheckout")}
                </button>
                <Link to="/pc" className="pc-cart__continue">{i18n("estore.pc.cart.continueShoppingArrow")}</Link>
              </div>
            </div>
          )}
        </div>
      </div>

      <style>{`
        .pc-cart {
          padding: 32px 0 64px;
        }

        .pc-cart__title {
          font-size: 24px;
          font-weight: 800;
          color: var(--pc-text);
          margin: 0 0 24px;
        }

        .pc-cart__empty {
          text-align: center;
          padding: 80px 0;
          color: var(--pc-text-secondary);
        }

        .pc-cart__empty-icon {
          font-size: 48px;
          margin-bottom: 16px;
        }

        .pc-cart__empty p {
          margin: 0 0 20px;
          font-size: 15px;
        }

        .pc-cart__layout {
          display: grid;
          grid-template-columns: 1fr 340px;
          gap: 28px;
          align-items: start;
        }

        .pc-cart__list {
          padding: 8px 24px;
        }

        .pc-cart__list-head {
          display: grid;
          grid-template-columns: 2.2fr 1fr 1fr 1fr 32px;
          gap: 12px;
          padding: 16px 0;
          border-bottom: 1px solid var(--pc-divider);
          font-size: 12px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.4px;
          color: var(--pc-text-muted);
        }

        .pc-cart__row {
          display: grid;
          grid-template-columns: 2.2fr 1fr 1fr 1fr 32px;
          gap: 12px;
          align-items: center;
          padding: 18px 0;
          border-bottom: 1px solid var(--pc-divider);
        }

        .pc-cart__row:last-child {
          border-bottom: none;
        }

        .pc-cart__product {
          display: flex;
          align-items: center;
          gap: 14px;
          min-width: 0;
        }

        .pc-cart__thumb {
          width: 64px;
          height: 64px;
          border-radius: var(--pc-radius-sm);
          background: var(--pc-secondary);
          overflow: hidden;
          flex-shrink: 0;
        }

        .pc-cart__thumb img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .pc-cart__name {
          font-size: 14px;
          font-weight: 600;
          color: var(--pc-text);
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
        }

        .pc-cart__price,
        .pc-cart__subtotal {
          font-size: 14px;
          color: var(--pc-text-secondary);
        }

        .pc-cart__subtotal {
          font-weight: 700;
          color: var(--pc-primary-dark);
        }

        .pc-cart__stepper {
          display: inline-flex;
          align-items: center;
          border: 1px solid var(--pc-border);
          border-radius: var(--pc-radius-sm);
          width: fit-content;
        }

        .pc-cart__stepper button {
          width: 30px;
          height: 30px;
          border: none;
          background: none;
          font-size: 15px;
          cursor: pointer;
          color: var(--pc-text);
        }

        .pc-cart__stepper button:hover {
          background: var(--pc-secondary);
        }

        .pc-cart__stepper span {
          width: 32px;
          text-align: center;
          font-size: 13.5px;
          font-weight: 700;
        }

        .pc-cart__remove {
          border: none;
          background: none;
          color: var(--pc-text-muted);
          font-size: 14px;
          cursor: pointer;
        }

        .pc-cart__remove:hover {
          color: var(--pc-danger);
        }

        .pc-cart__summary {
          padding: 24px;
          position: sticky;
          top: 96px;
        }

        .pc-cart__summary h2 {
          font-size: 16px;
          font-weight: 800;
          margin: 0 0 18px;
          color: var(--pc-text);
        }

        .pc-cart__summary-row {
          display: flex;
          justify-content: space-between;
          font-size: 13.5px;
          color: var(--pc-text-secondary);
          margin-bottom: 12px;
        }

        .pc-cart__summary-total {
          display: flex;
          justify-content: space-between;
          font-size: 16px;
          font-weight: 800;
          color: var(--pc-text);
          padding-top: 14px;
          border-top: 1px solid var(--pc-divider);
          margin-bottom: 20px;
        }

        .pc-cart__checkout-btn {
          width: 100%;
          padding: 15px;
          margin-bottom: 14px;
        }

        .pc-cart__continue {
          display: block;
          text-align: center;
          font-size: 13px;
          color: var(--pc-text-secondary);
          text-decoration: none;
        }

        .pc-cart__continue:hover {
          color: var(--pc-primary);
        }

        @media (max-width: 900px) {
          .pc-cart__layout {
            grid-template-columns: 1fr;
          }
          .pc-cart__list-head {
            display: none;
          }
          .pc-cart__row {
            grid-template-columns: 1fr;
            gap: 10px;
          }
        }
      `}</style>
    </>
  );
}

export default Cart;
