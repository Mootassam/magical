import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import authSelectors from "src/modules/auth/authSelectors";
import { i18n } from "../../../i18n";

function PCFooter() {
  const currentUser = useSelector(authSelectors.selectCurrentUser);

  return (
    <>
      <footer className="pc-footer">
        <div className="pc-container pc-footer__inner">
          <div className="pc-footer__col">
            <div className="pc-footer__logo">Estore</div>
            <p className="pc-footer__blurb">
              {i18n("estore.pc.footer.blurb")}
            </p>
          </div>

          <div className="pc-footer__col">
            <div className="pc-footer__heading">{i18n("estore.pc.footer.shopHeading")}</div>
            <Link to="/pc">{i18n("estore.header.home")}</Link>
            <Link to="/pc/classification">{i18n("estore.header.allCategories")}</Link>
            <Link to="/pc/cart">{i18n("estore.header.cart")}</Link>
          </div>

          <div className="pc-footer__col">
            <div className="pc-footer__heading">{i18n("estore.pc.footer.accountHeading")}</div>
            {currentUser ? (
              <>
                <Link to="/pc/mine/account">{i18n("estore.header.myAccount")}</Link>
                <Link to="/pc/mine/orders">{i18n("estore.header.myOrders")}</Link>
                <Link to="/pc/mine/addresses">{i18n("estore.pc.footer.deliveryAddresses")}</Link>
              </>
            ) : (
              <>
                <Link to="/pc/auth/signin">{i18n("estore.pc.footer.login")}</Link>
                <Link to="/pc/auth/signup">{i18n("estore.pc.footer.createAccount")}</Link>
              </>
            )}
          </div>

          <div className="pc-footer__col">
            <div className="pc-footer__heading">{i18n("estore.pc.footer.supportHeading")}</div>
            <span>{i18n("estore.pc.footer.helpCenter")}</span>
            <span>{i18n("estore.pc.footer.shipping")}</span>
            <span>{i18n("estore.pc.footer.returns")}</span>
          </div>
        </div>

        <div className="pc-container pc-footer__bottom">
          {i18n("estore.pc.footer.rights", new Date().getFullYear())}
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
