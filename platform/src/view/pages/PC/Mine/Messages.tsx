import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import listActions from "src/modules/notification/list/notificationListActions";
import listSelectors from "src/modules/notification/list/notificationListSelectors";
import formActions from "src/modules/notification/form/notificationFormActions";
import MineShell from "./MineShell";
import { sharedMineStyles } from "./MyAccount";

const ICONS = {
  deposit_success: { icon: "💰", bg: "#E9F9EF" },
  deposit_canceled: { icon: "⚠️", bg: "#FEF5E7" },
  withdraw_success: { icon: "💸", bg: "#E9F9EF" },
  withdraw_canceled: { icon: "⚠️", bg: "#FEF5E7" },
  system: { icon: "⚙️", bg: "#E7E7E7" },
  alert: { icon: "🔔", bg: "#FCE9E9" },
  admin: { icon: "📣", bg: "#E7E7E7" },
};

function getIcon(type) {
  return ICONS[type] || { icon: "🔔", bg: "#E9EFFD" };
}

function getTitle(notification) {
  if (notification.subject) return notification.subject;
  switch (notification.type) {
    case "deposit_success":
      return "Deposit successful";
    case "deposit_canceled":
      return "Deposit canceled";
    case "withdraw_success":
      return "Withdrawal successful";
    case "withdraw_canceled":
      return "Withdrawal canceled";
    case "system":
      return "System notice";
    case "alert":
      return "Alert";
    default:
      return "Notification";
  }
}

function getText(notification) {
  if (notification.message) return notification.message;
  if (notification.amount) return `Amount: $${notification.amount}`;
  return "";
}

function isToday(dateString) {
  if (!dateString) return false;
  const date = new Date(dateString);
  const now = new Date();
  return (
    date.getFullYear() === now.getFullYear() &&
    date.getMonth() === now.getMonth() &&
    date.getDate() === now.getDate()
  );
}

function formatTime(dateString) {
  if (!dateString) return "";
  return new Date(dateString).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}

function Messages() {
  const dispatch = useDispatch();
  const rows = useSelector(listSelectors.selectRows);
  const loading = useSelector(listSelectors.selectLoading);

  useEffect(() => {
    dispatch(listActions.doFetch());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  const hasUnread = rows.some((row: any) => row.status === "unread");

  const doMarkOneRead = (notification) => {
    if (notification.status === "unread") {
      dispatch(formActions.doMarkAsRead(notification.id) as any);
    }
  };

  const doMarkAllRead = () => {
    dispatch(listActions.doMarkAllAsRead() as any);
  };

  const todayRows = rows.filter((row: any) => isToday(row.createdAt));
  const earlierRows = rows.filter((row: any) => !isToday(row.createdAt));

  const renderCard = (notification: any) => {
    const { icon, bg } = getIcon(notification.type);
    const isUnread = notification.status === "unread";

    return (
      <div className="pc-mine__msg-card" key={notification.id} onClick={() => doMarkOneRead(notification)}>
        <div className="pc-mine__msg-icon" style={{ background: bg }}>
          {icon}
        </div>
        <div className="pc-mine__msg-body">
          <div className="pc-mine__msg-top">
            <span className="pc-mine__msg-title">{getTitle(notification)}</span>
            <span className="pc-mine__msg-time">{formatTime(notification.createdAt)}</span>
          </div>
          <div className="pc-mine__msg-text">{getText(notification)}</div>
        </div>
        {isUnread && <span className="pc-mine__unread-dot" />}
      </div>
    );
  };

  return (
    <MineShell active="messages">
      <div className="pc-mine__addr-head">
        <h1 className="pc-mine__page-title">Messages</h1>
        {hasUnread && (
          <button type="button" className="pc-mine__link-btn" onClick={doMarkAllRead}>
            Mark all read
          </button>
        )}
      </div>

      <div className="pc-card pc-mine__panel pc-mine__messages-panel">
        {loading && rows.length === 0 && <div className="pc-mine__hint">Loading...</div>}
        {!loading && rows.length === 0 && <div className="pc-mine__hint">No messages yet.</div>}

        {todayRows.length > 0 && (
          <>
            <div className="day-label">Today</div>
            {todayRows.map(renderCard)}
          </>
        )}

        {earlierRows.length > 0 && (
          <>
            <div className="day-label">Earlier</div>
            {earlierRows.map(renderCard)}
          </>
        )}
      </div>

      <style>{sharedMineStyles}</style>
      <style>{`
        .pc-mine__messages-panel {
          padding: 8px 24px 20px;
        }

        .pc-mine__msg-card {
          display: flex;
          align-items: flex-start;
          gap: 14px;
          padding: 16px 0;
          border-bottom: 1px solid var(--pc-divider);
          cursor: pointer;
          position: relative;
        }

        .pc-mine__msg-card:last-child {
          border-bottom: none;
        }

        .pc-mine__msg-icon {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 18px;
          flex-shrink: 0;
        }

        .pc-mine__msg-body {
          flex: 1;
          min-width: 0;
        }

        .pc-mine__msg-top {
          display: flex;
          justify-content: space-between;
          gap: 10px;
        }

        .pc-mine__msg-title {
          font-size: 13.5px;
          font-weight: 700;
          color: var(--pc-text);
        }

        .pc-mine__msg-time {
          font-size: 11.5px;
          color: var(--pc-text-muted);
          flex-shrink: 0;
        }

        .pc-mine__msg-text {
          font-size: 12.5px;
          color: var(--pc-text-secondary);
          margin-top: 4px;
        }

        .pc-mine__unread-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: var(--pc-danger);
          flex-shrink: 0;
          margin-top: 4px;
        }
      `}</style>
    </MineShell>
  );
}

export default Messages;
