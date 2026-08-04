import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import cartSelectors from "src/modules/cart/cartSelectors";

const tabs = [
  { icon: "🏠", label: "Home", path: "/" },
  { icon: "🗂️", label: "Classification", path: "/classification" },
  { icon: "🛒", label: "Cart", path: "/cart" },
  { icon: "👤", label: "Mine", path: "/mine" },
];

function TabBottomNavigator() {
  const location = useLocation();
  const cartCount = useSelector(cartSelectors.selectCount);

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
            {tab.path === "/cart" && cartCount > 0 ? (
              <span className="cart-badge">{cartCount}</span>
            ) : null}
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
          box-shadow:0 -4px 14px rgba(0,0,0,0.08);
          border-top:1px solid #EEEEEE;
          z-index:50;
        }
        .nav-item{
          display:flex; flex-direction:column; align-items:center; gap:4px;
          color:#888888; font-size:11px; font-weight:600;
          position:relative;
          background:none; border:none;
          padding:2px 10px;
          text-decoration:none;
        }
        .nav-item .icon{ font-size:20px; line-height:1; }
        .nav-item.active{ color:#7F2B15; }
        .nav-item.active::before{
          content:"";
          position:absolute; top:-10px; left:50%; transform:translateX(-50%);
          width:26px; height:3px; border-radius:3px;
          background:linear-gradient(90deg, #D1451F, #7F2B15);
        }
        .nav-item .cart-badge{
          position:absolute; top:-4px; right:2px;
          background:#DC2626; color:#fff; font-size:9px; font-weight:700;
          width:15px; height:15px; border-radius:50%;
          display:flex; align-items:center; justify-content:center;
        }
      `}</style>
    </>
  );
}

export default TabBottomNavigator;
