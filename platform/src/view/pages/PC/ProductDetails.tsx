import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import shopProductActions from "src/modules/shop/shopProductActions";
import shopProductSelectors from "src/modules/shop/shopProductSelectors";
import cartActions from "src/modules/cart/cartActions";
import { categoryLabel } from "src/view/pages/Estore/shared/categoryLabel";
import { i18n } from "../../../i18n";

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
    history.push("/pc/cart");
  };

  const price =
    record && typeof record.price === "number"
      ? record.price.toFixed(2)
      : record?.price;

  return (
    <>
      <div className="pc-pd">
        <div className="pc-container">
          {loading && (
            <div className="pc-pd__layout">
              <div className="pc-pd__gallery pc-skeleton" />
              <div className="pc-pd__info">
                <div className="pc-skeleton" style={{ height: 28, width: "70%", marginBottom: 16 }} />
                <div className="pc-skeleton" style={{ height: 20, width: "30%", marginBottom: 24 }} />
                <div className="pc-skeleton" style={{ height: 100, width: "100%" }} />
              </div>
            </div>
          )}

          {!loading && !record && (
            <div className="pc-pd__state">{i18n("estore.pc.productDetails.notFound")}</div>
          )}

          {!loading && record && (
            <div className="pc-pd__layout">
              <div className="pc-pd__gallery">
                {record.image ? (
                  <img src={record.image} alt={record.title} />
                ) : (
                  <div className="pc-pd__gallery-placeholder">{i18n("estore.pc.productDetails.noImage")}</div>
                )}
              </div>

              <div className="pc-pd__info">
                {record.category?.name && (
                  <div className="pc-pd__category">{categoryLabel(record.category.name)}</div>
                )}

                <h1 className="pc-pd__title">{record.title}</h1>
                <div className="pc-pd__price">${price}</div>

                {record.description && (
                  <>
                    <div className="pc-pd__label">{i18n("estore.pc.productDetails.description")}</div>
                    <p className="pc-pd__description">{record.description}</p>
                  </>
                )}

                <div className="pc-pd__label">{i18n("estore.pc.productDetails.quantity")}</div>
                <div className="pc-pd__stepper">
                  <button onClick={() => setQty((value) => Math.max(1, value - 1))}>−</button>
                  <span>{qty}</span>
                  <button onClick={() => setQty((value) => value + 1)}>+</button>
                </div>

                <div className="pc-pd__actions">
                  <button className="pc-btn pc-btn-outline" onClick={doAddToCart}>
                    🛒 {i18n("estore.pc.productDetails.addToCart")}
                  </button>
                  <button className="pc-btn pc-btn-primary" onClick={doBuyNow}>
                    {i18n("estore.pc.productDetails.buyNow")}
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <style>{`
        .pc-pd {
          padding: 32px 0 64px;
        }

        .pc-pd__state {
          padding: 80px 0;
          text-align: center;
          color: var(--pc-text-muted);
          font-size: 15px;
        }

        .pc-pd__layout {
          display: grid;
          grid-template-columns: 480px 1fr;
          gap: 48px;
          align-items: start;
        }

        .pc-pd__gallery {
          aspect-ratio: 1;
          background: var(--pc-surface);
          border: 1px solid var(--pc-border);
          border-radius: var(--pc-radius);
          overflow: hidden;
          position: sticky;
          top: 96px;
        }

        .pc-pd__gallery img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }

        .pc-pd__gallery-placeholder {
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--pc-text-muted);
          font-size: 14px;
        }

        .pc-pd__category {
          display: inline-block;
          background: var(--pc-secondary);
          color: var(--pc-text-secondary);
          font-size: 12px;
          font-weight: 700;
          padding: 5px 12px;
          border-radius: 999px;
          margin-bottom: 14px;
        }

        .pc-pd__title {
          font-size: 26px;
          font-weight: 800;
          color: var(--pc-text);
          margin: 0 0 14px;
          line-height: 1.3;
        }

        .pc-pd__price {
          font-size: 28px;
          font-weight: 800;
          color: var(--pc-primary-dark);
          margin-bottom: 24px;
        }

        .pc-pd__label {
          font-size: 13px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.4px;
          color: var(--pc-text-muted);
          margin-bottom: 8px;
        }

        .pc-pd__description {
          font-size: 14.5px;
          line-height: 1.7;
          color: var(--pc-text-secondary);
          margin: 0 0 24px;
        }

        .pc-pd__stepper {
          display: inline-flex;
          align-items: center;
          border: 1.5px solid var(--pc-border);
          border-radius: var(--pc-radius-sm);
          margin-bottom: 28px;
        }

        .pc-pd__stepper button {
          width: 40px;
          height: 40px;
          border: none;
          background: none;
          font-size: 18px;
          cursor: pointer;
          color: var(--pc-text);
        }

        .pc-pd__stepper button:hover {
          background: var(--pc-secondary);
        }

        .pc-pd__stepper span {
          width: 48px;
          text-align: center;
          font-size: 15px;
          font-weight: 700;
        }

        .pc-pd__actions {
          display: flex;
          gap: 14px;
          max-width: 420px;
        }

        .pc-pd__actions .pc-btn {
          flex: 1;
          padding: 15px 20px;
        }

        @media (max-width: 900px) {
          .pc-pd__layout {
            grid-template-columns: 1fr;
          }
          .pc-pd__gallery {
            position: static;
          }
        }
      `}</style>
    </>
  );
}

export default ProductDetails;
