import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import automatOrderActions from "src/modules/automatOrder/automatOrderActions";
import automatOrderSelectors from "src/modules/automatOrder/automatOrderSelectors";
import orderShipmentActions from "src/modules/orderShipment/orderShipmentActions";
import orderShipmentSelectors from "src/modules/orderShipment/orderShipmentSelectors";
import MineSellerShell from "./MineSellerShell";
import { sharedMineStyles } from "src/view/pages/PC/Mine/MyAccount";
import { i18n } from "../../../../i18n";

const WHOLESALE_DISCOUNT = 0.2;

function formatPrice(value) {
  return `$${(Number(value) || 0).toFixed(2)}`;
}

function PendingOrderCard({ order, shipping, onShip }: { order: any; shipping: boolean; onShip: () => void }) {
  const product = order.product || {};
  const lumpSum = Number(product.price) || 0;
  const salesProfit = lumpSum * WHOLESALE_DISCOUNT;
  const wholesalePrice = lumpSum - salesProfit;
  const qty = Number(order.quantity) || 1;
  const actualPayment = wholesalePrice * qty;

  return (
    <div className="pc-card pc-mine__ord-card">
      <div className="pc-mine__ord-top">
        <div className="pc-mine__ord-thumb">
          {product.image && <img src={product.image} alt={product.title} />}
        </div>
        <div className="pc-mine__ord-info">
          <div className="pc-mine__ord-name">{product.title}</div>
          <div className="pc-mine__ord-line">{i18n("estore.pc.sellerOrders.lumpSum")}: {formatPrice(lumpSum)} × {qty}</div>
          <div className="pc-mine__ord-line">{i18n("estore.pc.sellerOrders.salesProfit")}: {formatPrice(salesProfit)} × {qty}</div>
          <div className="pc-mine__ord-line">{i18n("estore.pc.sellerOrders.wholesalePrice")}: {formatPrice(wholesalePrice)} × {qty}</div>
        </div>
      </div>
      <div className="pc-mine__ord-bottom">
        <div className="pc-mine__ord-payment">
          {i18n("estore.pc.sellerOrders.actualPayment")} <b>{formatPrice(actualPayment)}</b>
        </div>
        <button type="button" className="pc-btn pc-btn-primary pc-mine__ord-ship-btn" disabled={shipping} onClick={onShip}>
          {shipping ? i18n("estore.pc.sellerOrders.processing") : i18n("estore.pc.sellerOrders.goToShipment")}
        </button>
      </div>
    </div>
  );
}

function ShipmentCard({ shipment }: { shipment: any }) {
  const product = shipment.product || {};
  const qty = Number(shipment.quantity) || 1;

  let statusTag: React.ReactNode;
  if (shipment.status === "completed") {
    statusTag = (
      <span className="pc-mine__ord-tag pc-mine__ord-tag--success">
        {i18n("estore.pc.sellerOrders.profitCredited")}: {formatPrice(shipment.profitAmount)}
      </span>
    );
  } else if (shipment.status === "refunded") {
    statusTag = (
      <span className="pc-mine__ord-tag pc-mine__ord-tag--refund">
        {i18n("estore.pc.sellerOrders.refunded")}: {formatPrice(shipment.wholesaleAmount + shipment.profitAmount)}
      </span>
    );
  } else {
    statusTag = <span className="pc-mine__ord-tag pc-mine__ord-tag--pending">{i18n("estore.pc.sellerOrders.awaitingReview")}</span>;
  }

  return (
    <div className="pc-card pc-mine__ord-card">
      <div className="pc-mine__ord-top">
        <div className="pc-mine__ord-thumb">
          {product.image && <img src={product.image} alt={product.title} />}
        </div>
        <div className="pc-mine__ord-info">
          <div className="pc-mine__ord-name">{product.title}</div>
          <div className="pc-mine__ord-line">{i18n("estore.pc.sellerOrders.wholesalePrice")}: {formatPrice(shipment.wholesaleAmount)} × {qty}</div>
        </div>
      </div>
      <div className="pc-mine__ord-bottom">
        <div className="pc-mine__ord-payment">
          {i18n("estore.pc.sellerOrders.paid")} <b>{formatPrice(shipment.wholesaleAmount)}</b>
        </div>
        {statusTag}
      </div>
    </div>
  );
}

function OrderCardSkeleton() {
  return (
    <div className="pc-card pc-mine__ord-card">
      <div className="pc-mine__ord-top">
        <div className="pc-skeleton pc-mine__ord-thumb" />
        <div className="pc-mine__ord-info">
          <div className="pc-skeleton" style={{ height: 13, width: "70%", marginBottom: 10 }} />
          <div className="pc-skeleton" style={{ height: 11, width: "40%" }} />
        </div>
      </div>
    </div>
  );
}

function Orders() {
  const dispatch = useDispatch();
  const location = useLocation<{ tab?: number }>();
  const [activeTab, setActiveTab] = useState(location.state?.tab || 0);

  const TABS = [
    { key: "waiting-delivery", label: i18n("estore.pc.sellerOrders.waitingForDelivery"), icon: "📦" },
    { key: "waiting-receipt", label: i18n("estore.pc.sellerOrders.waitingForReceipt"), icon: "🚚" },
    { key: "completed", label: i18n("estore.pc.sellerOrders.completed"), icon: "✅" },
    { key: "refund", label: i18n("estore.pc.sellerOrders.refundAfterSales"), icon: "↩️" },
  ];

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
    (automatOrdersLoading && automatOrders.length === 0) || (shipmentsLoading && shipments.length === 0);

  const doShip = (automatOrderId: string) => {
    dispatch(orderShipmentActions.doShip(automatOrderId) as any);
  };

  return (
    <MineSellerShell active="orders">
      <h1 className="pc-mine__page-title">{i18n("estore.pc.sellerOrders.title")}</h1>

      <div className="pc-mine__ord-tabs">
        {TABS.map((tab, index) => (
          <button
            key={tab.key}
            type="button"
            className={`pc-mine__ord-tab${activeTab === index ? " active" : ""}`}
            onClick={() => setActiveTab(index)}
          >
            <span>{tab.icon}</span>
            {tab.label}
            {tabData[index].length > 0 && <span className="pc-mine__ord-tab-count">{tabData[index].length}</span>}
          </button>
        ))}
      </div>

      {isInitialLoading && (
        <div className="pc-mine__ord-grid">
          <OrderCardSkeleton />
          <OrderCardSkeleton />
        </div>
      )}

      {!isInitialLoading && tabData[activeTab].length === 0 && (
        <div className="pc-card pc-mine__empty">
          <div className="pc-mine__empty-icon">{TABS[activeTab].icon}</div>
          <div className="pc-mine__empty-title">{i18n("estore.pc.sellerOrders.emptyTitle")}</div>
          <div className="pc-mine__empty-text">{i18n("estore.pc.sellerOrders.emptyText")}</div>
        </div>
      )}

      {!isInitialLoading && activeTab === 0 && pendingOrders.length > 0 && (
        <div className="pc-mine__ord-grid">
          {pendingOrders.map((order: any) => (
            <PendingOrderCard order={order} shipping={shippingId === order.id} onShip={() => doShip(order.id)} key={order.id} />
          ))}
        </div>
      )}

      {!isInitialLoading && activeTab !== 0 && tabData[activeTab].length > 0 && (
        <div className="pc-mine__ord-grid">
          {tabData[activeTab].map((shipment: any) => (
            <ShipmentCard shipment={shipment} key={shipment.id} />
          ))}
        </div>
      )}

      <style>{sharedMineStyles}</style>
      <style>{`
        .pc-mine__ord-tabs {
          display: flex;
          gap: 10px;
          margin-bottom: 22px;
          flex-wrap: wrap;
        }

        .pc-mine__ord-tab {
          display: flex;
          align-items: center;
          gap: 8px;
          border: 1.5px solid var(--pc-border);
          background: var(--pc-surface);
          border-radius: 999px;
          padding: 10px 18px;
          font-size: 13px;
          font-weight: 700;
          color: var(--pc-text-secondary);
          cursor: pointer;
          transition: all 0.15s ease;
        }

        .pc-mine__ord-tab:hover {
          border-color: var(--pc-primary);
          color: var(--pc-primary-dark);
        }

        .pc-mine__ord-tab.active {
          background: var(--pc-primary);
          border-color: var(--pc-primary);
          color: #fff;
        }

        .pc-mine__ord-tab-count {
          background: rgba(255, 255, 255, 0.3);
          border-radius: 999px;
          font-size: 11px;
          padding: 1px 7px;
        }

        .pc-mine__ord-tab:not(.active) .pc-mine__ord-tab-count {
          background: var(--pc-secondary);
          color: var(--pc-text-muted);
        }

        .pc-mine__ord-grid {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 16px;
        }

        .pc-mine__ord-card {
          padding: 18px;
        }

        .pc-mine__ord-top {
          display: flex;
          gap: 14px;
        }

        .pc-mine__ord-thumb {
          width: 68px;
          height: 68px;
          border-radius: var(--pc-radius-sm);
          overflow: hidden;
          flex-shrink: 0;
          background: var(--pc-secondary);
        }

        .pc-mine__ord-thumb img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .pc-mine__ord-info {
          flex: 1;
          min-width: 0;
        }

        .pc-mine__ord-name {
          font-size: 13.5px;
          font-weight: 700;
          color: var(--pc-text);
          margin-bottom: 6px;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
        }

        .pc-mine__ord-line {
          font-size: 11.5px;
          color: var(--pc-danger);
          font-weight: 600;
          line-height: 1.6;
        }

        .pc-mine__ord-bottom {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-top: 16px;
          padding-top: 14px;
          border-top: 1px solid var(--pc-divider);
        }

        .pc-mine__ord-payment {
          font-size: 12.5px;
          color: var(--pc-text);
          font-weight: 600;
        }

        .pc-mine__ord-payment b {
          color: var(--pc-danger);
          font-size: 15px;
          font-weight: 800;
          margin-left: 4px;
        }

        .pc-mine__ord-ship-btn {
          padding: 9px 18px;
          font-size: 12.5px;
        }

        .pc-mine__ord-tag {
          font-size: 11.5px;
          font-weight: 700;
          padding: 6px 14px;
          border-radius: 999px;
          white-space: nowrap;
        }

        .pc-mine__ord-tag--pending {
          background: var(--pc-secondary);
          color: var(--pc-text-muted);
        }

        .pc-mine__ord-tag--success {
          background: #E9F9EF;
          color: var(--pc-success);
        }

        .pc-mine__ord-tag--refund {
          background: #FAECE9;
          color: var(--pc-primary-dark);
        }

        @media (max-width: 900px) {
          .pc-mine__ord-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </MineSellerShell>
  );
}

export default Orders;
