import React, { useEffect, useMemo, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import authSelectors from "src/modules/auth/authSelectors";
import cartActions from "src/modules/cart/cartActions";
import cartSelectors from "src/modules/cart/cartSelectors";
import shopCategoryActions from "src/modules/shop/shopCategoryActions";
import shopCategorySelectors from "src/modules/shop/shopCategorySelectors";
import shopProductActions from "src/modules/shop/shopProductActions";
import shopProductSelectors from "src/modules/shop/shopProductSelectors";
import categoryIcon, { FALLBACK_CATEGORY_ICON } from "src/view/pages/Estore/shared/categoryIcon";

const HOME_CATEGORY_COUNT = 4;

// Decorative "% off" badges for the promo carousel - the catalog has no
// real discount/sale-price field yet, so these are cosmetic only and just
// cycle across whatever products land in the carousel.
const PROMO_DISCOUNTS = [50, 30, 40, 25];
const PROMO_ROTATE_MS = 4000;

function Home() {
  const dispatch = useDispatch();
  const history = useHistory();

  const currentUser = useSelector(authSelectors.selectCurrentUser);
  const cartCount = useSelector(cartSelectors.selectCount);

  const categories = useSelector(shopCategorySelectors.selectRows);
  const categoriesLoading = useSelector(shopCategorySelectors.selectLoading);
  const products = useSelector(shopProductSelectors.selectRows);
  const productsLoading = useSelector(shopProductSelectors.selectLoading);

  const [searchInput, setSearchInput] = useState("");

  useEffect(() => {
    dispatch(shopCategoryActions.doFetch(true));
    dispatch(
      shopProductActions.doFetch(undefined, undefined, undefined, undefined, true),
    );
  }, [dispatch]);

  const greetingName =
    currentUser?.firstName || currentUser?.fullName || currentUser?.email;

  const goToCategory = (categoryId: string) => {
    history.push("/classification", { categoryId });
  };

  const goToProduct = (id: string) => {
    history.push(`/product/${id}`);
  };

  const doSearch = (event: React.FormEvent) => {
    event.preventDefault();
    const trimmed = searchInput.trim();
    history.push("/classification", trimmed ? { search: trimmed } : undefined);
  };

  const doQuickAdd = (event: React.MouseEvent, product: any) => {
    event.stopPropagation();
    dispatch(cartActions.doAddItem(product, 1));
  };

  // Prefer categories that resolve to a real icon (over the generic
  // fallback tag), picking one per distinct icon so the row reads as a
  // varied set rather than four near-duplicates.
  const homeCategories = useMemo(() => {
    const seenIcons = new Set<string>();
    const iconic: any[] = [];

    for (const category of categories) {
      const icon = categoryIcon(category.name);

      if (icon === FALLBACK_CATEGORY_ICON || seenIcons.has(icon)) {
        continue;
      }

      seenIcons.add(icon);
      iconic.push(category);

      if (iconic.length === HOME_CATEGORY_COUNT) {
        break;
      }
    }

    return iconic.length > 0 ? iconic : categories.slice(0, HOME_CATEGORY_COUNT);
  }, [categories]);

  // Keep the homepage promo carousel broadly appealing rather than
  // spotlighting culturally/religiously specific items that happened to
  // land in the catalog via the bulk product import - the storefront's
  // customer base skews US/general audience, not this kind of item.
  const PROMO_EXCLUDE_PATTERN = /ramadan|\beid\b|islamic|muslim|hijab|niqab/i;

  // The real catalog is fetched once (newest first); the first 4 eligible
  // products drive the promo carousel and the rest fills the grid, so the
  // same product isn't shown twice on the page.
  const promoItems = products
    .filter((product: any) => !PROMO_EXCLUDE_PATTERN.test(product.title || ""))
    .slice(0, 4);
  const promoIds = new Set(promoItems.map((product: any) => product.id));
  const justForYou = products
    .filter((product: any) => !promoIds.has(product.id))
    .slice(0, 6);
  const isLoading = categoriesLoading || productsLoading;

  const [promoIndex, setPromoIndex] = useState(0);

  useEffect(() => {
    setPromoIndex(0);
  }, [promoItems.length]);

  useEffect(() => {
    if (promoItems.length < 2) {
      return;
    }

    const timer = setInterval(() => {
      setPromoIndex((current) => (current + 1) % promoItems.length);
    }, PROMO_ROTATE_MS);

    return () => clearInterval(timer);
  }, [promoItems.length]);

  return (
    <>
      <div className="phone">

        <div className="scroll-area">

          <div className="app-header">
            <div className="header-top">
              <div className="greeting">
                <div className="title">
                  {greetingName ? `Hi, ${greetingName} 👋` : "Hi, welcome 👋"}
                </div>
                <div className="sub">Find everything you need today</div>
              </div>
              <div className="right-cluster">
                <Link to="/site-message" className="bell">🔔</Link>
                <Link to="/cart" className="cart-icon">
                  🛒
                  {cartCount > 0 && <span className="dot">{cartCount}</span>}
                </Link>
              </div>
            </div>
            <form className="search-row" onSubmit={doSearch}>
              <span className="search-icon">🔍</span>
              <input
                type="text"
                placeholder="What are you looking for today?"
                value={searchInput}
                onChange={(event) => setSearchInput(event.target.value)}
              />
            </form>
          </div>

          <div className="section" style={{ paddingTop: "18px" }}>
            <div className="section-head">
              <h2>Promotions</h2>
              <Link to="/classification" className="see-all">See all ›</Link>
            </div>

            {productsLoading && promoItems.length === 0 && (
              <div className="state-text">Loading...</div>
            )}

            {!productsLoading && promoItems.length === 0 && (
              <div className="state-text">No products yet.</div>
            )}

            {promoItems.length > 0 && (
              <div className="promo-carousel">
                {promoItems.map((product: any, index: number) => (
                  <div
                    className={`promo-slide${index === promoIndex ? " active" : ""}`}
                    key={product.id}
                    onClick={() => goToProduct(product.id)}
                  >
                    {product.image && <img src={product.image} alt={product.title} loading="lazy" />}
                    <div className="promo-overlay" />
                    <div className="promo-content">
                      <span className="promo-badge">
                        -{PROMO_DISCOUNTS[index % PROMO_DISCOUNTS.length]}% OFF
                      </span>
                      <div className="promo-title">{product.title}</div>
                      <div className="promo-price">
                        ${typeof product.price === "number" ? product.price.toFixed(2) : product.price}
                      </div>
                    </div>
                  </div>
                ))}

                {promoItems.length > 1 && (
                  <div className="promo-dots">
                    {promoItems.map((product: any, index: number) => (
                      <span
                        key={product.id}
                        className={index === promoIndex ? "active" : ""}
                        onClick={(event) => {
                          event.stopPropagation();
                          setPromoIndex(index);
                        }}
                      />
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>

          <div className="categories">
            {categoriesLoading && categories.length === 0 && (
              <div className="state-text">Loading categories...</div>
            )}

            {!categoriesLoading && categories.length === 0 && (
              <div className="state-text">No categories yet.</div>
            )}

            {homeCategories.map((category: any) => (
              <div
                key={category.id}
                className="cat-item"
                onClick={() => goToCategory(category.id)}
              >
                <div className="cat-icon icon-cat-icon">
                  <span>{categoryIcon(category.name)}</span>
                </div>
                <div className="cat-label">{category.name}</div>
              </div>
            ))}
          </div>

          {categories.length > 0 && (
            <div className="section" style={{ paddingTop: "4px", paddingBottom: 0 }}>
              <Link to="/classification" className="see-all-link">Browse all categories ›</Link>
            </div>
          )}

          <div className="section" style={{ paddingTop: "22px" }}>
            <div className="section-head">
              <h2>Just For You</h2>
              <Link to="/classification" className="see-all">See all ›</Link>
            </div>
          </div>

          {!isLoading && justForYou.length > 0 && (
            <div className="grid">
              {justForYou.map((product: any) => (
                <div
                  className="prod-card"
                  key={product.id}
                  onClick={() => goToProduct(product.id)}
                >
                  <div className="prod-thumb">
                    {product.image && <img src={product.image} alt={product.title} loading="lazy" />}
                  </div>
                  <div className="prod-info">
                    <div className="prod-name">{product.title}</div>
                    {product.category?.name && (
                      <div className="prod-meta">{product.category.name}</div>
                    )}
                    <div className="prod-price-row">
                      <span className="prod-price">
                        ${typeof product.price === "number" ? product.price.toFixed(2) : product.price}
                      </span>
                      <button className="add-btn" onClick={(event) => doQuickAdd(event, product)}>+</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

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
          --gold:#ffb020;
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

        .scroll-area{
          flex:1;
          overflow-y:auto;
          -webkit-overflow-scrolling:touch;
          scrollbar-width:none;
          padding-bottom:96px;
        }
        .scroll-area::-webkit-scrollbar{ display:none; }

        .app-header{
          background:linear-gradient(135deg, var(--blue-deep), var(--blue-bright));
          padding:14px 18px 22px;
          color:#fff;
        }

        .header-top{
          display:flex;
          justify-content:space-between;
          align-items:flex-start;
          margin-bottom:14px;
        }

        .greeting .title{ font-size:16px; font-weight:700; }
        .greeting .sub{ font-size:12px; opacity:0.85; margin-top:2px; }

        .header-top .right-cluster{ display:flex; align-items:flex-start; gap:10px; }

        .bell, .cart-icon{
          width:34px; height:34px;
          border-radius:50%;
          background:rgba(255,255,255,0.15);
          display:flex; align-items:center; justify-content:center;
          font-size:16px;
          position:relative;
          text-decoration:none;
          color:#fff;
        }
        .bell::after{
          content:"";
          position:absolute; top:6px; right:7px;
          width:7px; height:7px;
          background:#ff4d4f; border-radius:50%;
          border:1.5px solid var(--blue-deep);
        }
        .cart-icon .dot{
          position:absolute; top:-4px; right:-6px;
          min-width:16px; height:16px; padding:0 3px;
          background:#ff4d4f; color:#fff; border-radius:8px;
          font-size:9px; font-weight:800; line-height:16px; text-align:center;
        }

        .search-row{
          display:flex;
          align-items:center;
          gap:10px;
          background:#fff;
          border-radius:14px;
          padding:10px 14px;
        }
        .search-row input{
          border:none; outline:none; flex:1;
          font-size:14px; color:var(--navy); background:transparent;
        }
        .search-row input::placeholder{ color:#9aa4c0; }
        .search-icon{ font-size:16px; color:var(--blue-mid); }

        .categories{ display:flex; justify-content:space-between; padding:20px 18px 6px; gap:8px; }
        .cat-item{ display:flex; flex-direction:column; align-items:center; gap:8px; width:22%; cursor:pointer; }
        .cat-icon{
          width:60px; height:60px; border-radius:18px;
          overflow:hidden;
          box-shadow:0 8px 18px rgba(20,40,100,0.12);
          border:2px solid #fff;
        }
        .icon-cat-icon{
          display:flex; align-items:center; justify-content:center;
          background:#fff; font-size:26px;
        }
        .cat-label{
          font-size:11px; color:var(--navy); font-weight:600; text-align:center;
          overflow:hidden; text-overflow:ellipsis; white-space:nowrap; max-width:100%;
        }

        .see-all-link{
          font-size:12px; color:var(--blue-mid); font-weight:600; text-decoration:none;
        }

        .state-text{
          color:var(--grey-text); font-size:12.5px; padding:10px 0; text-align:center; width:100%;
        }

        .section{ padding:22px 18px 6px; }
        .section-head{ display:flex; justify-content:space-between; align-items:center; margin-bottom:14px; }
        .section-head h2{ font-size:16px; color:var(--navy); font-weight:800; }
        .section-head .see-all{ font-size:12px; color:var(--blue-mid); font-weight:600; text-decoration:none; }

        .promo-carousel{
          position:relative;
          height:190px;
          border-radius:22px;
          overflow:hidden;
          background:#dfe6f5;
        }

        .promo-slide{
          position:absolute; inset:0;
          opacity:0;
          visibility:hidden;
          transition:opacity 0.6s ease;
          cursor:pointer;
          color:#fff;
        }
        .promo-slide.active{ opacity:1; visibility:visible; }
        .promo-slide img{
          position:absolute; inset:0;
          width:100%; height:100%; object-fit:cover;
        }
        .promo-overlay{
          position:absolute; inset:0;
          background:linear-gradient(120deg, rgba(11,26,74,0.88) 20%, rgba(22,86,201,0.55) 70%, rgba(47,141,255,0.25) 100%);
        }
        .promo-content{
          position:relative;
          height:100%;
          padding:18px 60px 18px 18px;
          display:flex;
          flex-direction:column;
          justify-content:flex-end;
        }
        .promo-badge{
          align-self:flex-start;
          background:var(--gold); color:var(--navy); font-weight:800; font-size:12px;
          padding:5px 10px; border-radius:8px; margin-bottom:10px;
        }
        .promo-title{
          font-size:16px; font-weight:800; line-height:1.25;
          overflow:hidden; text-overflow:ellipsis; display:-webkit-box;
          -webkit-line-clamp:2; -webkit-box-orient:vertical;
        }
        .promo-price{ font-size:15px; font-weight:700; margin-top:6px; opacity:0.95; }

        .promo-dots{
          position:absolute; bottom:12px; right:14px; z-index:1;
          display:flex; gap:6px;
        }
        .promo-dots span{
          width:6px; height:6px; border-radius:50%;
          background:rgba(255,255,255,0.5); cursor:pointer;
        }
        .promo-dots span.active{ background:#fff; width:16px; border-radius:4px; }

        .grid{ display:grid; grid-template-columns:1fr 1fr; gap:12px; padding:6px 18px 24px; }
        .prod-card{
          background:var(--card-bg); border-radius:16px; overflow:hidden;
          box-shadow:0 8px 20px rgba(20,40,100,0.08);
          cursor:pointer;
        }
        .prod-thumb{ width:100%; height:140px; position:relative; background:#eef2fb; }
        .prod-thumb img{ width:100%; height:100%; object-fit:cover; }
        .prod-info{ padding:10px 12px 12px; }
        .prod-name{
          font-size:13px; font-weight:700; color:var(--navy);
          overflow:hidden; text-overflow:ellipsis; display:-webkit-box;
          -webkit-line-clamp:2; -webkit-box-orient:vertical;
        }
        .prod-meta{ font-size:11px; color:var(--grey-text); margin-top:2px; }
        .prod-price-row{ display:flex; justify-content:space-between; align-items:center; margin-top:8px; }
        .prod-price{ font-size:14px; font-weight:800; color:var(--blue-deep); }
        .add-btn{
          width:28px; height:28px; border-radius:50%;
          background:linear-gradient(135deg, var(--blue-bright), var(--blue-mid));
          color:#fff; border:none; font-size:16px;
          display:flex; align-items:center; justify-content:center;
          cursor:pointer;
          box-shadow:0 6px 14px rgba(47,141,255,0.4);
        }


      `}</style>
    </>
  );
}

export default Home;
