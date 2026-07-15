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
  const [showAddressPicker, setShowAddressPicker] = useState(false);
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
        <div className="phone">
          <div className="success-screen">
            <div className="success-icon">✓</div>
            <div className="success-title">{i18n("pages.checkout.successTitle")}</div>
            <div className="success-text">{i18n("pages.checkout.successMessage")}</div>

            <div className="success-card">
              <div className="success-row">
                <span>{i18n("pages.checkout.orderNumber")}</span>
                <span className="success-value">#{placedOrder.id?.slice(-8).toUpperCase()}</span>
              </div>
              <div className="success-row">
                <span>{i18n("pages.checkout.totalToPay")}</span>
                <span className="success-value">${Number(placedOrder.totalAmount || 0).toFixed(2)}</span>
              </div>
              <div className="success-row">
                <span>{i18n("pages.checkout.sectionPayment")}</span>
                <span className="success-value">{i18n("pages.checkout.codLabel")}</span>
              </div>
            </div>

            <button className="success-btn" onClick={() => history.push("/")}>
              {i18n("pages.checkout.backToHome")}
            </button>
          </div>
        </div>

        <style>{styles}</style>
      </>
    );
  }

  return (
    <>
      <div className="phone">
        <div className="page-header">
          <button className="back-btn" onClick={() => history.push("/cart")}>←</button>
          <span className="page-title">{i18n("pages.checkout.title")}</span>
        </div>

        <div className="scroll-area">
          {items.length === 0 ? (
            <div className="empty-state">{i18n("pages.checkout.emptyCart")}</div>
          ) : (
            <>
              <div className="section-label">{i18n("pages.checkout.sectionAddress")}</div>
              <div className="card address-card" onClick={() => setShowAddressPicker(true)}>
                {addressesLoading && !selectedAddress ? (
                  <div className="address-empty">Loading...</div>
                ) : selectedAddress ? (
                  <div className="address-content">
                    <div className="address-icon">📍</div>
                    <div className="address-body">
                      <div className="address-text">{selectedAddress.address}</div>
                      <div className="address-contact">
                        {selectedAddress.contact} · {selectedAddress.countryCode || "+1"} {selectedAddress.contactNumber}
                      </div>
                    </div>
                    <div className="address-change">{i18n("pages.checkout.changeAddress")} ›</div>
                  </div>
                ) : (
                  <div className="address-content">
                    <div className="address-empty">{i18n("pages.checkout.noAddress")}</div>
                    <div className="address-change">
                      {i18n("pages.checkout.addAddress")} ›
                    </div>
                  </div>
                )}
              </div>

              <div className="section-label">{i18n("pages.checkout.sectionPayment")}</div>
              <div className="card payment-card">
                <div className="payment-option selected">
                  <div className="payment-icon">💵</div>
                  <div className="payment-body">
                    <div className="payment-title">{i18n("pages.checkout.codLabel")}</div>
                    <div className="payment-desc">{i18n("pages.checkout.codDescription")}</div>
                  </div>
                  <div className="payment-check">✓</div>
                </div>
              </div>

              <div className="section-label">
                {i18n("pages.checkout.sectionSummary")} · {i18n("pages.checkout.itemsCount", count)}
              </div>
              <div className="card summary-card">
                {items.map((item: any) => (
                  <div className="summary-item" key={item.id}>
                    <div className="summary-thumb">
                      {item.image && <img src={item.image} alt={item.title} />}
                    </div>
                    <div className="summary-body">
                      <div className="summary-name">{item.title}</div>
                      <div className="summary-qty">Qty: {item.qty}</div>
                    </div>
                    <div className="summary-price">
                      ${((Number(item.price) || 0) * item.qty).toFixed(2)}
                    </div>
                  </div>
                ))}

                <div className="summary-divider" />

                <div className="summary-total-row">
                  <span>{i18n("pages.checkout.subtotal")}</span>
                  <span>${total.toFixed(2)}</span>
                </div>
                <div className="summary-total-row">
                  <span>{i18n("pages.checkout.deliveryFee")}</span>
                  <span className="free">{i18n("pages.checkout.free")}</span>
                </div>
                <div className="summary-total-row grand">
                  <span>{i18n("pages.checkout.total")}</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>
            </>
          )}
        </div>

        {items.length > 0 && (
          <div className="checkout-bar">
            <div className="checkout-top">
              <span>{i18n("pages.checkout.total")}</span>
              <div className="total-value">${total.toFixed(2)}</div>
            </div>
            <button
              className="place-order-btn"
              disabled={createLoading || !selectedAddress}
              onClick={doPlaceOrder}
            >
              {createLoading
                ? i18n("pages.checkout.placingOrder")
                : i18n("pages.checkout.placeOrder")}
            </button>
          </div>
        )}
      </div>

      {showAddressPicker && (
        <div className="modal-overlay">
          <div className="modal-sheet">
            <div className="page-header">
              <button className="back-btn" onClick={() => setShowAddressPicker(false)}>←</button>
              <span className="page-title">{i18n("pages.checkout.selectAddressTitle")}</span>
            </div>

            <div className="modal-body">
              {addresses.length === 0 && (
                <div className="address-empty modal-empty">
                  {i18n("pages.checkout.noAddress")}
                </div>
              )}

              {addresses.map((row: any) => (
                <div
                  key={row.id}
                  className={`address-pick-item${row.id === selectedAddressId ? " selected" : ""}`}
                  onClick={() => {
                    setSelectedAddressId(row.id);
                    setShowAddressPicker(false);
                  }}
                >
                  <div className="address-pick-body">
                    <div className="address-text">{row.address}</div>
                    <div className="address-contact">
                      {row.contact} · {row.countryCode || "+1"} {row.contactNumber}
                    </div>
                  </div>
                  {row.id === selectedAddressId && <div className="address-pick-check">✓</div>}
                </div>
              ))}
            </div>

            <div className="modal-footer">
              <button
                className="submit-btn"
                onClick={() => {
                  setShowAddressPicker(false);
                  history.push("/delivery-address");
                }}
              >
                {i18n("pages.checkout.addAddress")}
              </button>
            </div>
          </div>
        </div>
      )}

      <style>{styles}</style>
    </>
  );
}

const styles = `
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
    --green:#1ba672;
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

  .scroll-area{
    flex:1;
    overflow-y:auto;
    scrollbar-width:none;
    padding:16px 14px 12px;
  }
  .scroll-area::-webkit-scrollbar{ display:none; }

  .empty-state{
    text-align:center;
    color:var(--grey-text);
    font-size:13px;
    padding:60px 20px;
  }

  .section-label{
    font-size:12.5px;
    font-weight:700;
    color:var(--navy);
    margin:16px 2px 8px;
    text-transform:uppercase;
    letter-spacing:0.03em;
  }
  .section-label:first-child{ margin-top:0; }

  .card{
    background:var(--card-bg);
    border-radius:16px;
    box-shadow:0 8px 20px rgba(20,40,100,0.06);
    overflow:hidden;
  }

  /* address card */
  .address-card{ cursor:pointer; padding:14px; }
  .address-content{ display:flex; align-items:center; gap:10px; }
  .address-icon{ font-size:20px; flex-shrink:0; }
  .address-body{ flex:1; min-width:0; }
  .address-text{ font-size:13.5px; font-weight:700; color:var(--navy); }
  .address-contact{ font-size:12px; color:var(--grey-text); margin-top:4px; }
  .address-change{ font-size:12px; font-weight:700; color:var(--blue-deep); flex-shrink:0; white-space:nowrap; }
  .address-empty{ font-size:13px; color:var(--grey-text); flex:1; }

  /* payment card */
  .payment-card{ padding:4px; }
  .payment-option{
    display:flex;
    align-items:center;
    gap:12px;
    padding:14px;
    border-radius:14px;
    border:1.5px solid var(--blue-bright);
    background:rgba(47,141,255,0.06);
  }
  .payment-icon{ font-size:22px; flex-shrink:0; }
  .payment-body{ flex:1; min-width:0; }
  .payment-title{ font-size:13.5px; font-weight:800; color:var(--navy); }
  .payment-desc{ font-size:11.5px; color:var(--grey-text); margin-top:4px; line-height:1.5; }
  .payment-check{
    width:22px; height:22px; border-radius:50%;
    background:var(--blue-deep); color:#fff;
    display:flex; align-items:center; justify-content:center;
    font-size:12px; font-weight:700; flex-shrink:0;
  }

  /* summary card */
  .summary-card{ padding:14px; }
  .summary-item{ display:flex; align-items:center; gap:10px; padding-bottom:12px; }
  .summary-item + .summary-item{ padding-top:12px; border-top:1px solid var(--grey-light); }
  .summary-thumb{
    width:48px; height:48px; border-radius:10px; overflow:hidden;
    background:var(--grey-light); flex-shrink:0;
  }
  .summary-thumb img{ width:100%; height:100%; object-fit:cover; }
  .summary-body{ flex:1; min-width:0; }
  .summary-name{
    font-size:12.5px; font-weight:700; color:var(--navy);
    overflow:hidden; text-overflow:ellipsis; white-space:nowrap;
  }
  .summary-qty{ font-size:11.5px; color:var(--grey-text); margin-top:3px; }
  .summary-price{ font-size:13px; font-weight:800; color:var(--blue-deep); flex-shrink:0; }

  .summary-divider{ height:1px; background:var(--grey-light); margin:6px 0 10px; }

  .summary-total-row{
    display:flex; justify-content:space-between; align-items:center;
    font-size:12.5px; color:var(--grey-text); padding:4px 0;
  }
  .summary-total-row .free{ color:var(--green); font-weight:700; }
  .summary-total-row.grand{
    font-size:14.5px; font-weight:800; color:var(--navy);
    margin-top:4px; padding-top:10px; border-top:1px dashed var(--grey-light);
  }

  /* bottom checkout bar */
  .checkout-bar{
    flex-shrink:0;
    background:#fff;
    box-shadow:0 -6px 18px rgba(20,40,100,0.08);
    border-top:1px solid var(--grey-light);
    padding:12px 16px calc(12px + env(safe-area-inset-bottom));
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
  .total-value{ font-size:17px; font-weight:800; color:var(--blue-deep); }

  .place-order-btn{
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
  .place-order-btn:disabled{ opacity:0.55; cursor:not-allowed; box-shadow:none; }

  /* address picker modal */
  .modal-overlay{
    position:fixed;
    inset:0;
    background:rgba(14,27,69,0.35);
    display:flex;
    align-items:center;
    justify-content:center;
    z-index:1000;
  }
  .modal-sheet{
    width:390px;
    max-width:390px;
    height:100vh;
    background:var(--page-bg);
    display:flex;
    flex-direction:column;
    margin:0 auto;
    overflow:hidden;
  }
  .modal-body{
    flex:1;
    overflow-y:auto;
    padding:16px;
    scrollbar-width:none;
  }
  .modal-body::-webkit-scrollbar{ display:none; }
  .modal-empty{ text-align:center; padding:40px 20px; }

  .address-pick-item{
    display:flex;
    align-items:center;
    justify-content:space-between;
    gap:10px;
    background:#fff;
    border-radius:14px;
    padding:14px;
    margin-bottom:10px;
    border:1.5px solid var(--grey-light);
    cursor:pointer;
  }
  .address-pick-item.selected{ border-color:var(--blue-bright); background:rgba(47,141,255,0.06); }
  .address-pick-body{ flex:1; min-width:0; }
  .address-pick-check{ color:var(--blue-deep); font-weight:800; font-size:15px; flex-shrink:0; }

  .modal-footer{
    flex-shrink:0;
    padding:14px 18px calc(14px + env(safe-area-inset-bottom));
    border-top:1px solid var(--grey-light);
    background:var(--page-bg);
  }
  .submit-btn{
    width:100%;
    border:none;
    border-radius:14px;
    padding:15px;
    background:linear-gradient(135deg, var(--blue-bright), var(--blue-deep));
    color:#fff;
    font-size:15px;
    font-weight:800;
    letter-spacing:0.3px;
    cursor:pointer;
    box-shadow:0 10px 22px rgba(47,141,255,0.4);
  }

  /* success screen */
  .success-screen{
    flex:1;
    display:flex;
    flex-direction:column;
    align-items:center;
    justify-content:center;
    padding:32px 28px;
    text-align:center;
  }
  .success-icon{
    width:74px; height:74px; border-radius:50%;
    background:linear-gradient(135deg, #2fd08f, var(--green));
    color:#fff;
    display:flex; align-items:center; justify-content:center;
    font-size:34px; font-weight:800;
    box-shadow:0 12px 24px rgba(27,166,114,0.35);
    margin-bottom:18px;
  }
  .success-title{ font-size:19px; font-weight:800; color:var(--navy); }
  .success-text{
    font-size:13px; color:var(--grey-text); margin-top:8px; line-height:1.6;
    max-width:280px;
  }
  .success-card{
    width:100%;
    background:#fff;
    border-radius:16px;
    box-shadow:0 8px 20px rgba(20,40,100,0.06);
    padding:16px;
    margin-top:22px;
  }
  .success-row{
    display:flex;
    justify-content:space-between;
    font-size:12.5px;
    color:var(--grey-text);
    padding:8px 0;
  }
  .success-row + .success-row{ border-top:1px solid var(--grey-light); }
  .success-value{ font-weight:700; color:var(--navy); }
  .success-btn{
    width:100%;
    margin-top:24px;
    border:none;
    border-radius:14px;
    padding:15px;
    background:linear-gradient(135deg, var(--blue-bright), var(--blue-deep));
    color:#fff;
    font-size:15px;
    font-weight:800;
    letter-spacing:0.3px;
    cursor:pointer;
    box-shadow:0 10px 22px rgba(47,141,255,0.4);
  }
`;

export default Checkout;
