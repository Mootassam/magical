import React from "react";
import { Link, useLocation } from "react-router-dom";

const tabs = [
  { icon: "🏠", label: "Home", path: "/" },
  { icon: "🗂️", label: "Classification", path: "/classification" },
  { icon: "🛒", label: "Cart", path: "/cart", badge: 3 },
  { icon: "👤", label: "Mine", path: "/mine" },
];

function TabBottomNavigator() {
  const location = useLocation();

  const isActive = (pathname) => location.pathname === pathname;

  return (
    <>
      <div className="bottom-nav">
        {tabs.map((tab) => (
          <Link
            key={tab.path}
            to={tab.path}
            className={`nav-item${isActive(tab.path) ? " active" : ""}`}
          >
            <span className="icon">{tab.icon}</span>
            {tab.badge ? <span className="cart-badge">{tab.badge}</span> : null}
            <span>{tab.label}</span>
          </Link>
        ))}
      </div>

      <style>{`
        .bottom-nav{
          position:fixed;
          left:0;
          right:0;
          bottom:0;
          width:390px;
          max-width:100%;
          margin:0 auto;
          background:#fff;
          display:flex;
          justify-content:space-around;
          align-items:center;
          padding:10px 10px calc(12px + env(safe-area-inset-bottom));
          box-shadow:0 -4px 14px rgba(20,40,100,0.08);
          border-top:1px solid #eef2fa;
          z-index:50;
        }
        .nav-item{
          display:flex; flex-direction:column; align-items:center; gap:4px;
          color:#a6afc8; font-size:11px; font-weight:600;
          position:relative;
          background:none; border:none;
          padding:2px 10px;
          text-decoration:none;
        }
        .nav-item .icon{ font-size:20px; line-height:1; }
        .nav-item.active{ color:#0b3fae; }
        .nav-item.active::before{
          content:"";
          position:absolute; top:-10px; left:50%; transform:translateX(-50%);
          width:26px; height:3px; border-radius:3px;
          background:linear-gradient(90deg, #2f8dff, #0b3fae);
        }
        .nav-item .cart-badge{
          position:absolute; top:-4px; right:2px;
          background:#ff4d4f; color:#fff; font-size:9px; font-weight:700;
          width:15px; height:15px; border-radius:50%;
          display:flex; align-items:center; justify-content:center;
        }
      `}</style>
    </>
  );
}

export default TabBottomNavigator;
