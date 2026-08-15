import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { i18n } from "../../../i18n";
import cartActions from "src/modules/cart/cartActions";
import cartSelectors from "src/modules/cart/cartSelectors";
import deliveryAddressActions from "src/modules/deliveryAddress/deliveryAddressActions";
import deliveryAddressSelectors from "src/modules/deliveryAddress/deliveryAddressSelectors";
import orderActions from "src/modules/order/orderActions";
import orderSelectors from "src/modules/order/orderSelectors";
import Message from "src/view/shared/message";

function Checkout() {
  const dispatch = useDispatch();
  const history = useHistory();

  const items = useSelector(cartSelectors.selectItems);
  const count = useSelector(cartSelectors.selectCount);
  const total = useSelector(cartSelectors.selectTotal);

  const addresses = useSelector(deliveryAddressSelectors.selectRows);
  const addressesLoading = useSelector(deliveryAddressSelectors.selectLoading);

  const createLoading = useSelector(orderSelectors.selectCreateLoading);

  const [selectedAddressId, setSelectedAddressId] = useState<string | null>(null);
  const [placedOrder, setPlacedOrder] = useState<any>(null);

  useEffect(() => {
    dispatch(deliveryAddressActions.doFetch());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  useEffect(() => {
    if (!selectedAddressId && addresses.length > 0) {
      setSelectedAddressId(addresses[0].id);
    }
  }, [addresses, selectedAddressId]);

  const selectedAddress = addresses.find(
    (row: any) => row.id === selectedAddressId,
  );

  const doPlaceOrder = async () => {
    if (items.length === 0) {
      Message.error(i18n("pages.checkout.emptyCart"));
      return;
    }

    if (!selectedAddress) {
      Message.error(i18n("pages.checkout.missingAddress"));
      return;
    }

    const payload = {
      items: items.map((item: any) => ({
        product: item.id,
        qty: item.qty,
      })),
      deliveryAddress: {
        address: selectedAddress.address,
        countryCode: selectedAddress.countryCode || "+1",
        contactNumber: selectedAddress.contactNumber,
        contact: selectedAddress.contact,
      },
      paymentMethod: "cod",
    };

    const order = await dispatch(orderActions.doCreate(payload) as any);

    if (order) {
      dispatch(cartActions.doClear());
      setPlacedOrder(order);
    }
  };

  if (placedOrder) {
    return (
      <>
        <div className="pc-checkout">
          <div className="pc-container pc-checkout__success">
            <div className="pc-checkout__success-icon">✓</div>
            <div className="pc-checkout__success-title">{i18n("pages.checkout.successTitle")}</div>
            <div className="pc-checkout__success-text">{i18n("pages.checkout.successMessage")}</div>

            <div className="pc-card pc-checkout__success-card">
              <div className="pc-checkout__success-row">
                <span>{i18n("pages.checkout.orderNumber")}</span>
                <span>#{placedOrder.id?.slice(-8).toUpperCase()}</span>
              </div>
              <div className="pc-checkout__success-row">
                <span>{i18n("pages.checkout.totalToPay")}</span>
                <span>${Number(placedOrder.totalAmount || 0).toFixed(2)}</span>
              </div>
              <div className="pc-checkout__success-row">
                <span>{i18n("pages.checkout.sectionPayment")}</span>
                <span>{i18n("pages.checkout.codLabel")}</span>
              </div>
            </div>

            <button className="pc-btn pc-btn-primary" onClick={() => history.push("/pc")}>
              {i18n("pages.checkout.backToHome")}
            </button>
          </div>
        </div>
        <style>{sharedStyles}</style>
      </>
    );
  }

  return (
    <>
      <div className="pc-checkout">
        <div className="pc-container">
          <h1 className="pc-checkout__title">{i18n("pages.checkout.title")}</h1>

          {items.length === 0 ? (
            <div className="pc-checkout__empty">{i18n("pages.checkout.emptyCart")}</div>
          ) : (
            <div className="pc-checkout__layout">
              <div className="pc-checkout__main">
                <div className="pc-checkout__section-label">{i18n("pages.checkout.sectionAddress")}</div>
                <div className="pc-card pc-checkout__address-card">
                  {addressesLoading && addresses.length === 0 && (
                    <div className="pc-checkout__address-empty">{i18n("estore.pc.checkout.loading")}</div>
                  )}

                  {!addressesLoading && addresses.length === 0 && (
                    <div className="pc-checkout__address-empty">{i18n("pages.checkout.noAddress")}</div>
                  )}

                  {addresses.map((row: any) => (
                    <label
                      key={row.id}
                      className={`pc-checkout__address-row${row.id === selectedAddressId ? " selected" : ""}`}
                    >
                      <input
                        type="radio"
                        name="address"
                        checked={row.id === selectedAddressId}
                        onChange={() => setSelectedAddressId(row.id)}
                      />
                      <div className="pc-checkout__address-body">
                        <div className="pc-checkout__address-text">{row.address}</div>
                        <div className="pc-checkout__address-contact">
                          {row.contact} · {row.countryCode || "+1"} {row.contactNumber}
                        </div>
                      </div>
                    </label>
                  ))}

                  <button
                    type="button"
                    className="pc-btn pc-btn-ghost pc-checkout__add-address"
                    onClick={() => history.push("/pc/mine/addresses")}
                  >
                    + {i18n("pages.checkout.addAddress")}
                  </button>
                </div>

                <div className="pc-checkout__section-label">{i18n("pages.checkout.sectionPayment")}</div>
                <div className="pc-card pc-checkout__payment-card">
                  <div className="pc-checkout__payment-option selected">
                    <div className="pc-checkout__payment-icon">💵</div>
                    <div className="pc-checkout__payment-body">
                      <div className="pc-checkout__payment-title">{i18n("pages.checkout.codLabel")}</div>
                      <div className="pc-checkout__payment-desc">{i18n("pages.checkout.codDescription")}</div>
                    </div>
                    <div className="pc-checkout__payment-check">✓</div>
                  </div>
                </div>
              </div>

              <div className="pc-checkout__summary pc-card">
                <h2>
                  {i18n("pages.checkout.sectionSummary")} · {i18n("pages.checkout.itemsCount", count)}
                </h2>

                <div className="pc-checkout__summary-items">
                  {items.map((item: any) => (
                    <div className="pc-checkout__summary-item" key={item.id}>
                      <div className="pc-checkout__summary-thumb">
                        {item.image && <img src={item.image} alt={item.title} />}
                      </div>
                      <div className="pc-checkout__summary-body">
                        <div className="pc-checkout__summary-name">{item.title}</div>
                        <div className="pc-checkout__summary-qty">{i18n("estore.pc.checkout.qty")}: {item.qty}</div>
                      </div>
                      <div className="pc-checkout__summary-price">
                        ${((Number(item.price) || 0) * item.qty).toFixed(2)}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="pc-checkout__summary-divider" />

                <div className="pc-checkout__summary-row">
                  <span>{i18n("pages.checkout.subtotal")}</span>
                  <span>${total.toFixed(2)}</span>
                </div>
                <div className="pc-checkout__summary-row">
                  <span>{i18n("pages.checkout.deliveryFee")}</span>
                  <span className="pc-checkout__free">{i18n("pages.checkout.free")}</span>
                </div>
                <div className="pc-checkout__summary-total">
                  <span>{i18n("pages.checkout.total")}</span>
                  <span>${total.toFixed(2)}</span>
                </div>

                <button
                  className="pc-btn pc-btn-primary pc-checkout__place-btn"
                  disabled={createLoading || !selectedAddress}
                  onClick={doPlaceOrder}
                >
                  {createLoading
                    ? i18n("pages.checkout.placingOrder")
                    : i18n("pages.checkout.placeOrder")}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      <style>{sharedStyles}</style>
    </>
  );
}

const sharedStyles = `
  .pc-checkout {
    padding: 32px 0 64px;
  }

  .pc-checkout__title {
    font-size: 24px;
    font-weight: 800;
    color: var(--pc-text);
    margin: 0 0 24px;
  }

  .pc-checkout__empty {
    padding: 80px 0;
    text-align: center;
    color: var(--pc-text-muted);
  }

  .pc-checkout__layout {
    display: grid;
    grid-template-columns: 1fr 360px;
    gap: 28px;
    align-items: start;
  }

  .pc-checkout__section-label {
    font-size: 13px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.4px;
    color: var(--pc-text-muted);
    margin: 24px 0 10px;
  }

  .pc-checkout__section-label:first-child {
    margin-top: 0;
  }

  .pc-checkout__address-card,
  .pc-checkout__payment-card {
    padding: 8px 20px;
  }

  .pc-checkout__address-empty {
    padding: 18px 0;
    color: var(--pc-text-muted);
    font-size: 14px;
  }

  .pc-checkout__address-row {
    display: flex;
    align-items: flex-start;
    gap: 12px;
    padding: 16px 0;
    border-bottom: 1px solid var(--pc-divider);
    cursor: pointer;
  }

  .pc-checkout__address-row:last-of-type {
    border-bottom: none;
  }

  .pc-checkout__address-row input {
    margin-top: 3px;
    accent-color: var(--pc-primary);
  }

  .pc-checkout__address-text {
    font-size: 14px;
    font-weight: 600;
    color: var(--pc-text);
    margin-bottom: 4px;
  }

  .pc-checkout__address-contact {
    font-size: 12.5px;
    color: var(--pc-text-muted);
  }

  .pc-checkout__add-address {
    width: 100%;
    margin: 14px 0;
  }

  .pc-checkout__payment-option {
    display: flex;
    align-items: center;
    gap: 14px;
    padding: 16px 0;
  }

  .pc-checkout__payment-icon {
    font-size: 22px;
  }

  .pc-checkout__payment-body {
    flex: 1;
  }

  .pc-checkout__payment-title {
    font-size: 14px;
    font-weight: 700;
    color: var(--pc-text);
  }

  .pc-checkout__payment-desc {
    font-size: 12.5px;
    color: var(--pc-text-muted);
    margin-top: 2px;
  }

  .pc-checkout__payment-check {
    width: 22px;
    height: 22px;
    border-radius: 50%;
    background: var(--pc-success);
    color: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 12px;
  }

  .pc-checkout__summary {
    padding: 22px;
    position: sticky;
    top: 96px;
  }

  .pc-checkout__summary h2 {
    font-size: 15px;
    font-weight: 800;
    color: var(--pc-text);
    margin: 0 0 16px;
  }

  .pc-checkout__summary-items {
    display: flex;
    flex-direction: column;
    gap: 12px;
    max-height: 220px;
    overflow-y: auto;
    margin-bottom: 16px;
  }

  .pc-checkout__summary-item {
    display: flex;
    align-items: center;
    gap: 10px;
  }

  .pc-checkout__summary-thumb {
    width: 44px;
    height: 44px;
    border-radius: var(--pc-radius-sm);
    background: var(--pc-secondary);
    overflow: hidden;
    flex-shrink: 0;
  }

  .pc-checkout__summary-thumb img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .pc-checkout__summary-body {
    flex: 1;
    min-width: 0;
  }

  .pc-checkout__summary-name {
    font-size: 12.5px;
    font-weight: 600;
    color: var(--pc-text);
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .pc-checkout__summary-qty {
    font-size: 11.5px;
    color: var(--pc-text-muted);
  }

  .pc-checkout__summary-price {
    font-size: 12.5px;
    font-weight: 700;
    color: var(--pc-text);
  }

  .pc-checkout__summary-divider {
    height: 1px;
    background: var(--pc-divider);
    margin-bottom: 14px;
  }

  .pc-checkout__summary-row {
    display: flex;
    justify-content: space-between;
    font-size: 13.5px;
    color: var(--pc-text-secondary);
    margin-bottom: 10px;
  }

  .pc-checkout__free {
    color: var(--pc-success);
    font-weight: 700;
  }

  .pc-checkout__summary-total {
    display: flex;
    justify-content: space-between;
    font-size: 16px;
    font-weight: 800;
    color: var(--pc-text);
    padding-top: 14px;
    border-top: 1px solid var(--pc-divider);
    margin-bottom: 18px;
  }

  .pc-checkout__place-btn {
    width: 100%;
    padding: 15px;
  }

  .pc-checkout__success {
    max-width: 480px;
    margin: 60px auto;
    text-align: center;
  }

  .pc-checkout__success-icon {
    width: 64px;
    height: 64px;
    border-radius: 50%;
    background: var(--pc-success);
    color: #fff;
    font-size: 28px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto 20px;
  }

  .pc-checkout__success-title {
    font-size: 22px;
    font-weight: 800;
    color: var(--pc-text);
    margin-bottom: 8px;
  }

  .pc-checkout__success-text {
    font-size: 14px;
    color: var(--pc-text-secondary);
    margin-bottom: 24px;
  }

  .pc-checkout__success-card {
    padding: 20px 24px;
    margin-bottom: 24px;
    text-align: left;
  }

  .pc-checkout__success-row {
    display: flex;
    justify-content: space-between;
    font-size: 13.5px;
    color: var(--pc-text-secondary);
    padding: 8px 0;
  }

  .pc-checkout__success-row:not(:last-child) {
    border-bottom: 1px solid var(--pc-divider);
  }

  @media (max-width: 900px) {
    .pc-checkout__layout {
      grid-template-columns: 1fr;
    }
  }
`;

export default Checkout;
