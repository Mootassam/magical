import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import automatOrderActions from "src/modules/automatOrder/automatOrderActions";
import automatOrderSelectors from "src/modules/automatOrder/automatOrderSelectors";
import orderShipmentActions from "src/modules/orderShipment/orderShipmentActions";
import orderShipmentSelectors from "src/modules/orderShipment/orderShipmentSelectors";

const WHOLESALE_DISCOUNT = 0.2;

function formatPrice(value) {
  return `$${(Number(value) || 0).toFixed(2)}`;
}

// A pending automat order not yet sent for shipment: lump sum (sale price),
// sales profit and wholesale price are derived from the product's price,
// and the actual payment due is wholesale price x qty.
function PendingOrderCard({ order, shipping, onShip }: { order: any; shipping: boolean; onShip: () => void }) {
  const product = order.product || {};
  const lumpSum = Number(product.price) || 0;
  const salesProfit = lumpSum * WHOLESALE_DISCOUNT;
  const wholesalePrice = lumpSum - salesProfit;
  const qty = Number(order.quantity) || 1;
  const actualPayment = wholesalePrice * qty;

  return (
    <div className="order-card">
      <div className="order-top">
        <div className="order-thumb">
          {product.image && <img src={product.image} alt={product.title} />}
        </div>
        <div className="order-info">
          <div className="order-name">{product.title}</div>
          <div className="order-line">lump sum: {formatPrice(lumpSum)} x{qty}</div>
          <div className="order-line">Sales Profit: {formatPrice(salesProfit)} x{qty}</div>
          <div className="order-line">Wholesale Price: {formatPrice(wholesalePrice)} x{qty}</div>
        </div>
      </div>
      <div className="order-bottom">
        <div className="actual-payment">
          Actual payment: <b>{formatPrice(actualPayment)}</b>
        </div>
        <button className="ship-btn" disabled={shipping} onClick={onShip}>
          {shipping ? "Processing…" : "Go to Shipment"}
        </button>
      </div>
    </div>
  );
}

// A shipment request already submitted - status-specific summary instead
// of the action button (money has already moved server-side).
function ShipmentCard({ shipment }: { shipment: any }) {
  const product = shipment.product || {};
  const qty = Number(shipment.quantity) || 1;

  let statusLine: React.ReactNode;
  if (shipment.status === "completed") {
    statusLine = (
      <span className="status-tag status-tag-success">
        Profit credited: {formatPrice(shipment.profitAmount)}
      </span>
    );
  } else if (shipment.status === "refunded") {
    statusLine = (
      <span className="status-tag status-tag-refund">
        Refunded: {formatPrice(shipment.wholesaleAmount + shipment.profitAmount)}
      </span>
    );
  } else {
    statusLine = <span className="status-tag status-tag-pending">Awaiting review</span>;
  }

  return (
    <div className="order-card">
      <div className="order-top">
        <div className="order-thumb">
          {product.image && <img src={product.image} alt={product.title} />}
        </div>
        <div className="order-info">
          <div className="order-name">{product.title}</div>
          <div className="order-line">
            Wholesale Price: {formatPrice(shipment.wholesaleAmount)} x{qty}
          </div>
        </div>
      </div>
      <div className="order-bottom">
        <div className="actual-payment">
          Paid: <b>{formatPrice(shipment.wholesaleAmount)}</b>
        </div>
        {statusLine}
      </div>
    </div>
  );
}

function OrderCardSkeleton() {
  return (
    <div className="order-card">
      <div className="order-top">
        <div className="order-thumb skeleton-block" />
        <div className="order-info">
          <div className="skeleton-line skeleton-line-title" />
          <div className="skeleton-line skeleton-line-sub" />
        </div>
      </div>
      <div className="order-bottom">
        <div className="skeleton-line skeleton-line-total" />
      </div>
    </div>
  );
}

const TABS = [
  "Waiting for\ndelivery",
  "Waiting for\nreceipt",
  "Completed",
  "Refund /\nAfter-sales",
];

function MyOrder() {
  const dispatch = useDispatch();
  const [activeTab, setActiveTab] = useState(0);

  const automatOrders = useSelector(automatOrderSelectors.selectRows);
  const automatOrdersLoading = useSelector(automatOrderSelectors.selectLoading);

  const shipments = useSelector(orderShipmentSelectors.selectRows);
  const shipmentsLoading = useSelector(orderShipmentSelectors.selectLoading);
  const shippingId = useSelector(orderShipmentSelectors.selectShippingId);

  useEffect(() => {
    dispatch(automatOrderActions.doFetchMine());
    dispatch(orderShipmentActions.doFetchMine());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  const shippedOrderIds = new Set(shipments.map((s: any) => s.automatOrder));

  const pendingOrders = automatOrders.filter(
    (order: any) => order.status === "pending" && !shippedOrderIds.has(order.id),
  );
  const waitingReceipt = shipments.filter((s: any) => s.status === "pending");
  const completed = shipments.filter((s: any) => s.status === "completed");
  const refunded = shipments.filter((s: any) => s.status === "refunded");

  const tabData = [pendingOrders, waitingReceipt, completed, refunded];
  const isInitialLoading =
    (automatOrdersLoading && automatOrders.length === 0) ||
    (shipmentsLoading && shipments.length === 0);

  const doShip = (automatOrderId: string) => {
    dispatch(orderShipmentActions.doShip(automatOrderId) as any);
  };

  return (
    <>
      <div className="phone">

        <div className="page-header">
          <button className="back-btn" onClick={() => window.history.back()}>←</button>
          <span className="page-title">Store Orders</span>
        </div>

        <div className="tabs">
          {TABS.map((label, index) => (
            <div
              key={label}
              className={`tab${activeTab === index ? " active" : ""}`}
              onClick={() => setActiveTab(index)}
            >
              {label.split("\n").map((line, i) => (
                <React.Fragment key={i}>
                  {i > 0 && <br />}
                  {line}
                </React.Fragment>
              ))}
            </div>
          ))}
        </div>

        <div className="scroll-area">

          {isInitialLoading && (
            <>
              <OrderCardSkeleton />
              <OrderCardSkeleton />
              <OrderCardSkeleton />
            </>
          )}

          {!isInitialLoading && tabData[activeTab].length === 0 && (
            <div className="empty-state">Nothing here yet.</div>
          )}

          {!isInitialLoading && activeTab === 0 &&
            pendingOrders.map((order: any) => (
              <PendingOrderCard
                order={order}
                shipping={shippingId === order.id}
                onShip={() => doShip(order.id)}
                key={order.id}
              />
            ))}

          {!isInitialLoading && activeTab !== 0 &&
            tabData[activeTab].map((shipment: any) => (
              <ShipmentCard shipment={shipment} key={shipment.id} />
            ))}

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
    --red:#ff3b30;
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

  /* ---------- Tabs ---------- */
  .tabs{
    display:flex;
    background:#fff;
    flex-shrink:0;
    box-shadow:0 4px 12px rgba(20,40,100,0.05);
  }
  .tab{
    flex:1;
    text-align:center;
    padding:14px 4px 12px;
    font-size:12px;
    font-weight:700;
    color:#a6afc8;
    position:relative;
    cursor:pointer;
  }
  .tab.active{ color:var(--navy); }
  .tab.active::after{
    content:"";
    position:absolute;
    bottom:0; left:50%; transform:translateX(-50%);
    width:34px; height:3px; border-radius:3px;
    background:linear-gradient(90deg, var(--blue-bright), var(--blue-deep));
  }

  /* ---------- Scroll body ---------- */
  .scroll-area{
    flex:1;
    overflow-y:auto;
    scrollbar-width:none;
    padding:14px 14px 24px;
  }
  .scroll-area::-webkit-scrollbar{ display:none; }

  .empty-state{
    text-align:center;
    color:var(--grey-text);
    font-size:13px;
    padding:60px 20px;
  }

  .order-card{
    background:var(--card-bg);
    border-radius:16px;
    box-shadow:0 8px 20px rgba(20,40,100,0.07);
    padding:14px;
    margin-bottom:14px;
  }

  .order-top{
    display:flex;
    gap:12px;
  }
  .order-thumb{
    width:70px; height:70px;
    border-radius:12px;
    overflow:hidden;
    flex-shrink:0;
    background:#f2f5fb;
  }
  .order-thumb img{ width:100%; height:100%; object-fit:cover; }

  .order-info{ flex:1; min-width:0; }
  .order-name{
    font-size:13.5px;
    font-weight:700;
    color:var(--navy);
    margin-bottom:6px;
    overflow:hidden;
    text-overflow:ellipsis;
    display:-webkit-box;
    -webkit-line-clamp:2;
    -webkit-box-orient:vertical;
  }
  .order-line{
    font-size:11.5px;
    color:var(--red);
    font-weight:600;
    line-height:1.6;
  }

  .order-bottom{
    display:flex;
    justify-content:space-between;
    align-items:center;
    margin-top:14px;
    padding-top:12px;
    border-top:1px solid var(--grey-light);
  }
  .actual-payment{
    font-size:12.5px;
    color:var(--navy);
    font-weight:600;
  }
  .actual-payment b{
    color:var(--red);
    font-size:15px;
    font-weight:800;
    margin-left:4px;
  }
  .ship-btn{
    border:none;
    border-radius:20px;
    padding:9px 18px;
    font-size:12.5px;
    font-weight:700;
    color:#fff;
    background:linear-gradient(135deg, var(--blue-bright), var(--blue-deep));
    box-shadow:0 8px 18px rgba(47,141,255,0.35);
    cursor:pointer;
  }
  .ship-btn:disabled{
    opacity:0.6;
    cursor:not-allowed;
    box-shadow:none;
  }

  .status-tag{
    font-size:11.5px;
    font-weight:700;
    padding:7px 14px;
    border-radius:20px;
    white-space:nowrap;
  }
  .status-tag-pending{
    background:var(--grey-light);
    color:var(--grey-text);
  }
  .status-tag-success{
    background:rgba(27,166,114,0.12);
    color:var(--green);
  }
  .status-tag-refund{
    background:rgba(47,141,255,0.12);
    color:var(--blue-deep);
  }

  /* ---------- Skeleton loading ---------- */
  @keyframes shimmer{
    0%{ background-position:100% 50%; }
    100%{ background-position:0 50%; }
  }
  .skeleton-block{
    background:linear-gradient(90deg, #eef2fa 25%, #e4eaf7 37%, #eef2fa 63%);
    background-size:400% 100%;
    animation:shimmer 1.4s ease infinite;
  }
  .skeleton-line{
    height:11px;
    border-radius:6px;
    background:linear-gradient(90deg, #eef2fa 25%, #e4eaf7 37%, #eef2fa 63%);
    background-size:400% 100%;
    animation:shimmer 1.4s ease infinite;
  }
  .skeleton-line-title{ width:70%; height:13px; margin-bottom:10px; }
  .skeleton-line-sub{ width:40%; }
  .skeleton-line-total{ width:90px; height:13px; }
      `}</style>
    </>
  );
}

export default MyOrder;
