import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import orderActions from "src/modules/order/orderActions";
import orderSelectors from "src/modules/order/orderSelectors";
import MineShell from "./MineShell";
import { sharedMineStyles } from "./MyAccount";
import { i18n } from "../../../../i18n";

function formatDate(value) {
  if (!value) return "";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "";
  return date.toLocaleDateString(undefined, { year: "numeric", month: "short", day: "numeric" });
}

function MyOrders() {
  const dispatch = useDispatch();
  const orders = useSelector(orderSelectors.selectRows);
  const loading = useSelector(orderSelectors.selectLoading);

  const STATUS_LABEL = {
    pending: i18n("estore.pc.myOrders.statusPending"),
    confirmed: i18n("estore.pc.myOrders.statusConfirmed"),
    shipped: i18n("estore.pc.myOrders.statusShipped"),
    delivered: i18n("estore.pc.myOrders.statusDelivered"),
    cancelled: i18n("estore.pc.myOrders.statusCancelled"),
  };

  useEffect(() => {
    dispatch(orderActions.doFetchMine());
  }, [dispatch]);

  return (
    <MineShell active="orders">
      <h1 className="pc-mine__page-title">{i18n("estore.pc.myOrders.title")}</h1>

      {loading && (!orders || orders.length === 0) && (
        <div className="pc-card pc-mine__panel">
          {Array.from({ length: 3 }).map((_, index) => (
            <div className="pc-mine__order-row" key={index}>
              <div className="pc-skeleton" style={{ width: 60, height: 60, borderRadius: 8 }} />
              <div style={{ flex: 1 }}>
                <div className="pc-skeleton" style={{ height: 14, width: "60%", marginBottom: 8 }} />
                <div className="pc-skeleton" style={{ height: 12, width: "30%" }} />
              </div>
            </div>
          ))}
        </div>
      )}

      {!loading && (!orders || orders.length === 0) && (
        <div className="pc-card pc-mine__empty">
          <div className="pc-mine__empty-icon">📦</div>
          <div className="pc-mine__empty-title">{i18n("estore.pc.myOrders.emptyTitle")}</div>
          <div className="pc-mine__empty-text">{i18n("estore.pc.myOrders.emptyText")}</div>
          <Link to="/pc" className="pc-btn pc-btn-primary">{i18n("estore.pc.myOrders.startShopping")}</Link>
        </div>
      )}

      {!loading && orders && orders.length > 0 && (
        <div className="pc-mine__orders">
          {orders.map((order: any) => (
            <div className="pc-card pc-mine__order-card" key={order.id}>
              <div className="pc-mine__order-head">
                <div>
                  <span className="pc-mine__order-id">{i18n("estore.pc.myOrders.order")} #{order.id?.slice(-8).toUpperCase()}</span>
                  <span className="pc-mine__order-date">{formatDate(order.createdAt)}</span>
                </div>
                <span className={`pc-mine__status-tag pc-mine__status-${order.status || "pending"}`}>
                  {STATUS_LABEL[order.status] || order.status}
                </span>
              </div>

              <div className="pc-mine__order-items">
                {(order.items || []).map((item: any, index: number) => (
                  <div className="pc-mine__order-row" key={index}>
                    <div className="pc-mine__order-thumb">
                      {item.image && <img src={item.image} alt={item.title} />}
                    </div>
                    <div className="pc-mine__order-item-body">
                      <div className="pc-mine__order-item-name">{item.title}</div>
                      <div className="pc-mine__order-item-qty">
                        ${(Number(item.price) || 0).toFixed(2)} × {item.qty}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="pc-mine__order-footer">
                <span>{i18n("estore.pc.myOrders.total")}</span>
                <span className="pc-mine__order-total">${Number(order.totalAmount || 0).toFixed(2)}</span>
              </div>
            </div>
          ))}
        </div>
      )}

      <style>{sharedMineStyles}</style>
      <style>{`
        .pc-mine__orders {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .pc-mine__order-card {
          padding: 20px 24px;
        }

        .pc-mine__order-head {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          padding-bottom: 14px;
          margin-bottom: 14px;
          border-bottom: 1px solid var(--pc-divider);
        }

        .pc-mine__order-id {
          display: block;
          font-size: 13.5px;
          font-weight: 700;
          color: var(--pc-text);
        }

        .pc-mine__order-date {
          display: block;
          font-size: 12px;
          color: var(--pc-text-muted);
          margin-top: 2px;
        }

        .pc-mine__status-tag {
          font-size: 11.5px;
          font-weight: 700;
          padding: 5px 12px;
          border-radius: 999px;
          text-transform: capitalize;
          white-space: nowrap;
        }

        .pc-mine__status-pending { background: #FEF5E7; color: #D08609; }
        .pc-mine__status-confirmed { background: #E9EFFD; color: #2563EB; }
        .pc-mine__status-shipped { background: #E9EFFD; color: #2563EB; }
        .pc-mine__status-delivered { background: #E9F9EF; color: #1DA750; }
        .pc-mine__status-cancelled { background: #FCE9E9; color: #DC2626; }

        .pc-mine__order-items {
          display: flex;
          flex-direction: column;
          gap: 12px;
          margin-bottom: 14px;
        }

        .pc-mine__order-row {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .pc-mine__order-thumb {
          width: 52px;
          height: 52px;
          border-radius: var(--pc-radius-sm);
          background: var(--pc-secondary);
          overflow: hidden;
          flex-shrink: 0;
        }

        .pc-mine__order-thumb img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .pc-mine__order-item-name {
          font-size: 13px;
          font-weight: 600;
          color: var(--pc-text);
        }

        .pc-mine__order-item-qty {
          font-size: 12px;
          color: var(--pc-text-muted);
          margin-top: 2px;
        }

        .pc-mine__order-footer {
          display: flex;
          justify-content: space-between;
          font-size: 13.5px;
          color: var(--pc-text-secondary);
          padding-top: 14px;
          border-top: 1px solid var(--pc-divider);
        }

        .pc-mine__order-total {
          font-weight: 800;
          color: var(--pc-primary-dark);
          font-size: 15px;
        }
      `}</style>
    </MineShell>
  );
}

export default MyOrders;
