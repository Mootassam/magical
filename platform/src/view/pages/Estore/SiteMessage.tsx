import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import listActions from "src/modules/notification/list/notificationListActions";
import listSelectors from "src/modules/notification/list/notificationListSelectors";
import formActions from "src/modules/notification/form/notificationFormActions";

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
  if (notification.subject) {
    return notification.subject;
  }

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
  if (notification.message) {
    return notification.message;
  }

  if (notification.amount) {
    return `Amount: $${notification.amount}`;
  }

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
  return new Date(dateString).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
}

function SiteMessage() {
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
      dispatch(formActions.doMarkAsRead(notification.id));
    }
  };

  const doMarkAllRead = () => {
    dispatch(listActions.doMarkAllAsRead());
  };

  const todayRows = rows.filter((row: any) => isToday(row.createdAt));
  const earlierRows = rows.filter((row: any) => !isToday(row.createdAt));

  const renderCard = (notification: any) => {
    const { icon, bg } = getIcon(notification.type);
    const isUnread = notification.status === "unread";

    return (
      <div
        className="msg-card"
        key={notification.id}
        onClick={() => doMarkOneRead(notification)}
      >
        <div className="msg-icon" style={{ background: bg }}>
          {icon}
        </div>
        <div className="msg-body">
          <div className="msg-top">
            <span className="msg-title">{getTitle(notification)}</span>
            <span className="msg-time">{formatTime(notification.createdAt)}</span>
          </div>
          <div className="msg-text">{getText(notification)}</div>
        </div>
        {isUnread && <span className="unread-dot"></span>}
      </div>
    );
  };

  return (
    <>
      <div className="phone">

        <div className="page-header">
          <div className="left">
            <button className="back-btn" onClick={() => window.history.back()}>←</button>
            <span className="page-title">Site Message</span>
          </div>
          {hasUnread && (
            <span className="mark-read" onClick={doMarkAllRead}>Mark all read</span>
          )}
        </div>

        <div className="scroll-area">

          {loading && rows.length === 0 && (
            <div className="empty-state">Loading...</div>
          )}

          {!loading && rows.length === 0 && (
            <div className="empty-state">No messages yet.</div>
          )}

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
    --red:#DC2626;
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
  .page-header .left{ display:flex; align-items:center; gap:12px; }
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
  .mark-read{ font-size:12.5px; font-weight:600; opacity:0.9; cursor:pointer; }

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

  .msg-card{
    display:flex;
    gap:12px;
    background:var(--card-bg);
    border-radius:16px;
    box-shadow:0 8px 20px rgba(0,0,0,0.07);
    padding:14px;
    margin-bottom:12px;
    position:relative;
    cursor:pointer;
  }

  .msg-icon{
    width:42px; height:42px;
    border-radius:12px;
    display:flex; align-items:center; justify-content:center;
    font-size:19px;
    flex-shrink:0;
  }

  .msg-body{ flex:1; min-width:0; }
  .msg-top{
    display:flex;
    justify-content:space-between;
    align-items:flex-start;
    gap:8px;
  }
  .msg-title{
    font-size:13.5px;
    font-weight:700;
    color:var(--navy);
  }
  .msg-time{
    font-size:10.5px;
    color:var(--grey-text);
    white-space:nowrap;
    flex-shrink:0;
  }
  .msg-text{
    font-size:12px;
    color:var(--grey-text);
    margin-top:5px;
    line-height:1.5;
  }
  .unread-dot{
    width:8px; height:8px;
    border-radius:50%;
    background:var(--red);
    position:absolute;
    top:14px; right:14px;
  }

  .day-label{
    font-size:11.5px;
    font-weight:700;
    color:var(--grey-text);
    margin:6px 4px 10px;
    text-transform:uppercase;
    letter-spacing:0.5px;
  }
      `}</style>
    </>
  );
}

export default SiteMessage;
