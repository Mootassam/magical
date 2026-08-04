import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import authSelectors from "src/modules/auth/authSelectors";

function PCFooter() {
  const currentUser = useSelector(authSelectors.selectCurrentUser);

  return (
    <>
      <footer className="pc-footer">
        <div className="pc-container pc-footer__inner">
          <div className="pc-footer__col">
            <div className="pc-footer__logo">Estore</div>
            <p className="pc-footer__blurb">
              Everything you need, delivered to your door.
            </p>
          </div>

          <div className="pc-footer__col">
            <div className="pc-footer__heading">Shop</div>
            <Link to="/pc">Home</Link>
            <Link to="/pc/classification">All Categories</Link>
            <Link to="/pc/cart">Cart</Link>
          </div>

          <div className="pc-footer__col">
            <div className="pc-footer__heading">Account</div>
            {currentUser ? (
              <>
                <Link to="/pc/mine/account">My Account</Link>
                <Link to="/pc/mine/orders">My Orders</Link>
                <Link to="/pc/mine/addresses">Delivery Addresses</Link>
              </>
            ) : (
              <>
                <Link to="/pc/auth/signin">Login</Link>
                <Link to="/pc/auth/signup">Create account</Link>
              </>
            )}
          </div>

          <div className="pc-footer__col">
            <div className="pc-footer__heading">Support</div>
            <span>Help Center</span>
            <span>Shipping & Delivery</span>
            <span>Returns</span>
          </div>
        </div>

        <div className="pc-container pc-footer__bottom">
          © {new Date().getFullYear()} Estore. All rights reserved.
        </div>
      </footer>

      <style>{`
        .pc-footer {
          background: var(--pc-surface);
          border-top: 1px solid var(--pc-border);
          margin-top: 48px;
        }

        .pc-footer__inner {
          display: grid;
          grid-template-columns: 1.4fr 1fr 1fr 1fr;
          gap: 32px;
          padding: 48px 32px 32px;
        }

        .pc-footer__col {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .pc-footer__col a,
        .pc-footer__col span {
          color: var(--pc-text-secondary);
          text-decoration: none;
          font-size: 13.5px;
        }

        .pc-footer__col a:hover {
          color: var(--pc-primary);
        }

        .pc-footer__logo {
          font-size: 20px;
          font-weight: 800;
          color: var(--pc-primary);
        }

        .pc-footer__blurb {
          font-size: 13px;
          color: var(--pc-text-muted);
          margin: 0;
          max-width: 260px;
        }

        .pc-footer__heading {
          font-size: 13px;
          font-weight: 700;
          color: var(--pc-text);
          text-transform: uppercase;
          letter-spacing: 0.4px;
          margin-bottom: 4px;
        }

        .pc-footer__bottom {
          border-top: 1px solid var(--pc-divider);
          padding: 18px 32px;
          font-size: 12.5px;
          color: var(--pc-text-muted);
        }
      `}</style>
    </>
  );
}

export default PCFooter;
