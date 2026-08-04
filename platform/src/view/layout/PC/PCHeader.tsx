import React, { useEffect, useRef, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import authActions from "src/modules/auth/authActions";
import authSelectors from "src/modules/auth/authSelectors";
import cartSelectors from "src/modules/cart/cartSelectors";
import shopCategoryActions from "src/modules/shop/shopCategoryActions";
import shopCategorySelectors from "src/modules/shop/shopCategorySelectors";
import storeActions from "src/modules/store/storeActions";
import storeSelectors from "src/modules/store/storeSelectors";
import categoryIcon from "src/view/pages/Estore/shared/categoryIcon";
import categoryIconImage from "src/view/pages/PC/categoryIconImage";
import { sortCategoriesByPriority } from "src/view/pages/PC/categoryOrder";

const NAV_CATEGORY_COUNT = 6;

function PCHeader() {
  const dispatch = useDispatch();
  const history = useHistory();

  const currentUser = useSelector(authSelectors.selectCurrentUser);
  const userLabel = useSelector(authSelectors.selectCurrentUserNameOrEmailPrefix);
  const cartCount = useSelector(cartSelectors.selectCount);
  const categories = useSelector(shopCategorySelectors.selectRows);
  const dashboard = useSelector(storeSelectors.selectDashboard);

  const [searchInput, setSearchInput] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    dispatch(shopCategoryActions.doFetch(true));
  }, [dispatch]);

  useEffect(() => {
    if (currentUser?.store) {
      dispatch(storeActions.doFetchDashboard());
    }
  }, [dispatch, currentUser?.store]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const doSearch = (event: React.FormEvent) => {
    event.preventDefault();
    const trimmed = searchInput.trim();
    history.push("/pc/classification", trimmed ? { search: trimmed } : undefined);
  };

  const goToCategory = (categoryId: string) => {
    history.push("/pc/classification", { categoryId });
  };

  const doSignout = () => {
    setMenuOpen(false);
    dispatch(authActions.doSignout());
  };

  const navCategories = sortCategoriesByPriority(categories).slice(0, NAV_CATEGORY_COUNT);

  return (
    <>
      <header className="pc-header">
        <div className="pc-container pc-header__top">
          <Link to="/pc" className="pc-header__logo">
            Estore
          </Link>

          <form className="pc-header__search" onSubmit={doSearch}>
            <span className="pc-header__search-icon">🔍</span>
            <input
              type="text"
              placeholder="Search products, brands and categories..."
              value={searchInput}
              onChange={(event) => setSearchInput(event.target.value)}
            />
            <button type="submit">Search</button>
          </form>

          <div className="pc-header__actions">
            {currentUser?.store && (
              <Link
                to={{ pathname: "/pc/mine-seller/orders", state: { tab: 0 } }}
                className="pc-header__notify"
                title="Orders waiting for delivery"
              >
                <span className="pc-header__notify-icon">📦</span>
                {(dashboard?.waitingForDeliveryCount || 0) > 0 && (
                  <span className="pc-header__notify-badge">{dashboard.waitingForDeliveryCount}</span>
                )}
              </Link>
            )}

            <Link to="/pc/cart" className="pc-header__cart">
              <span className="pc-header__cart-icon">🛒</span>
              <span>Cart</span>
              {cartCount > 0 && <span className="pc-header__cart-badge">{cartCount}</span>}
            </Link>

            <div className="pc-header__account" ref={menuRef}>
              {currentUser ? (
                <>
                  <button
                    type="button"
                    className="pc-header__account-btn"
                    onClick={() => setMenuOpen((value) => !value)}
                  >
                    <span className="pc-header__avatar">
                      {(userLabel || "U").slice(0, 1).toUpperCase()}
                    </span>
                    <span>{userLabel || "Account"}</span>
                  </button>
                  {menuOpen && (
                    <div className="pc-header__account-menu">
                      <Link to="/pc/mine/account" onClick={() => setMenuOpen(false)}>
                        My Account
                      </Link>
                      <Link to="/pc/mine/orders" onClick={() => setMenuOpen(false)}>
                        My Orders
                      </Link>
                      <button type="button" onClick={doSignout}>
                        Sign out
                      </button>
                    </div>
                  )}
                </>
              ) : (
                <Link to="/pc/auth/signin" className="pc-header__login">
                  Login / Register
                </Link>
              )}
            </div>
          </div>
        </div>

        <nav className="pc-header__nav">
          <div className="pc-container pc-header__nav-inner">
            <div className="pc-header__nav-scroll pc-scroll-x">
              <Link to="/pc" className="pc-header__nav-link">
                Home
              </Link>
              {navCategories.map((category: any) => (
                <button
                  key={category.id}
                  type="button"
                  className="pc-header__nav-link"
                  onClick={() => goToCategory(category.id)}
                >
                  <span className="pc-header__nav-icon">
                    {categoryIconImage(category.name) ? (
                      <img src={categoryIconImage(category.name)!} alt="" loading="lazy" />
                    ) : (
                      categoryIcon(category.name)
                    )}
                  </span>
                  {category.name}
                </button>
              ))}
            </div>
            <Link to="/pc/classification" className="pc-header__nav-all">
              All Categories <span className="pc-header__nav-all-arrow">›</span>
            </Link>
          </div>
        </nav>
      </header>

      <style>{`
        .pc-header {
          position: sticky;
          top: 0;
          z-index: 100;
          background: var(--pc-surface);
          border-bottom: 1px solid var(--pc-border);
        }

        .pc-header__top {
          display: flex;
          align-items: center;
          gap: 32px;
          padding: 18px 32px;
        }

        .pc-header__logo {
          font-size: 24px;
          font-weight: 800;
          color: var(--pc-primary);
          text-decoration: none;
          letter-spacing: -0.5px;
          flex-shrink: 0;
        }

        .pc-header__search {
          flex: 1;
          max-width: 640px;
          display: flex;
          align-items: center;
          border: 1.5px solid var(--pc-border);
          border-radius: 999px;
          padding: 4px 4px 4px 18px;
          background: var(--pc-bg);
        }

        .pc-header__search-icon {
          font-size: 14px;
          margin-right: 8px;
          opacity: 0.6;
        }

        .pc-header__search input {
          flex: 1;
          border: none;
          background: transparent;
          outline: none;
          font-size: 14px;
          color: var(--pc-text);
          padding: 8px 0;
        }

        .pc-header__search button {
          border: none;
          border-radius: 999px;
          background: var(--pc-primary);
          color: #fff;
          font-weight: 700;
          font-size: 13px;
          padding: 10px 22px;
          cursor: pointer;
          transition: background 0.15s ease;
        }

        .pc-header__search button:hover {
          background: var(--pc-primary-hover);
        }

        .pc-header__actions {
          display: flex;
          align-items: center;
          gap: 24px;
          margin-left: auto;
          flex-shrink: 0;
        }

        .pc-header__notify {
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          width: 38px;
          height: 38px;
          border-radius: 50%;
          text-decoration: none;
          transition: background 0.15s ease;
        }

        .pc-header__notify:hover {
          background: var(--pc-secondary);
        }

        .pc-header__notify-icon {
          font-size: 19px;
        }

        .pc-header__notify-badge {
          position: absolute;
          top: -2px;
          right: -2px;
          background: var(--pc-danger);
          color: #fff;
          font-size: 10px;
          font-weight: 700;
          min-width: 17px;
          height: 17px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 0 3px;
          border: 2px solid var(--pc-surface);
        }

        .pc-header__cart {
          position: relative;
          display: flex;
          align-items: center;
          gap: 6px;
          text-decoration: none;
          color: var(--pc-text);
          font-size: 14px;
          font-weight: 600;
        }

        .pc-header__cart-icon {
          font-size: 20px;
        }

        .pc-header__cart-badge {
          position: absolute;
          top: -8px;
          left: 14px;
          background: var(--pc-danger);
          color: #fff;
          font-size: 10px;
          font-weight: 700;
          min-width: 16px;
          height: 16px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 0 3px;
        }

        .pc-header__account {
          position: relative;
        }

        .pc-header__login {
          text-decoration: none;
          color: var(--pc-text);
          font-size: 14px;
          font-weight: 600;
        }

        .pc-header__account-btn {
          display: flex;
          align-items: center;
          gap: 8px;
          background: none;
          border: none;
          cursor: pointer;
          font-size: 14px;
          font-weight: 600;
          color: var(--pc-text);
          padding: 0;
        }

        .pc-header__avatar {
          width: 28px;
          height: 28px;
          border-radius: 50%;
          background: var(--pc-primary);
          color: #fff;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 12px;
          font-weight: 700;
        }

        .pc-header__account-menu {
          position: absolute;
          top: calc(100% + 10px);
          right: 0;
          background: var(--pc-surface);
          border: 1px solid var(--pc-border);
          border-radius: var(--pc-radius-sm);
          box-shadow: 0 10px 24px var(--pc-shadow);
          min-width: 140px;
          overflow: hidden;
        }

        .pc-header__account-menu button,
        .pc-header__account-menu a {
          display: block;
          width: 100%;
          text-align: left;
          padding: 10px 14px;
          border: none;
          background: none;
          cursor: pointer;
          font-size: 13px;
          color: var(--pc-text);
          text-decoration: none;
          box-sizing: border-box;
        }

        .pc-header__account-menu button:hover,
        .pc-header__account-menu a:hover {
          background: var(--pc-secondary);
        }

        .pc-header__nav {
          background: var(--pc-primary);
          box-shadow: 0 1px 0 rgba(255, 255, 255, 0.08) inset;
        }

        .pc-header__nav-inner {
          display: flex;
          align-items: center;
          gap: 18px;
          padding: 0 32px;
        }

        .pc-header__nav-scroll {
          display: flex;
          align-items: center;
          gap: 26px;
          padding: 10px 0;
          overflow-x: auto;
          flex: 1;
          min-width: 0;
        }

        .pc-header__nav-link {
          display: flex;
          align-items: center;
          gap: 6px;
          background: none;
          border: none;
          border-bottom: 2px solid transparent;
          color: rgba(255, 255, 255, 0.85);
          text-decoration: none;
          font-size: 13.5px;
          font-weight: 600;
          white-space: nowrap;
          cursor: pointer;
          padding: 3px 0;
          transition: color 0.15s ease, border-color 0.15s ease;
        }

        .pc-header__nav-link:hover {
          color: #ffffff;
          border-bottom-color: #ffffff;
        }

        .pc-header__nav-icon {
          font-size: 14px;
          width: 16px;
          height: 16px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .pc-header__nav-icon img {
          width: 16px;
          height: 16px;
          object-fit: contain;
        }

        .pc-header__nav-all {
          flex-shrink: 0;
          display: flex;
          align-items: center;
          gap: 3px;
          padding: 6px 14px;
          border-radius: 999px;
          background: rgba(255, 255, 255, 0.14);
          border: 1px solid rgba(255, 255, 255, 0.3);
          color: #ffffff;
          text-decoration: none;
          font-size: 12.5px;
          font-weight: 700;
          white-space: nowrap;
          transition: background 0.15s ease, border-color 0.15s ease;
        }

        .pc-header__nav-all:hover {
          background: rgba(255, 255, 255, 0.26);
          border-color: rgba(255, 255, 255, 0.5);
        }

        .pc-header__nav-all-arrow {
          font-size: 14px;
          line-height: 1;
        }
      `}</style>
    </>
  );
}

export default PCHeader;
