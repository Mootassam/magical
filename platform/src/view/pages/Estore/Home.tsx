import React, { useEffect, useMemo, useRef, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import authSelectors from "src/modules/auth/authSelectors";
import cartActions from "src/modules/cart/cartActions";
import cartSelectors from "src/modules/cart/cartSelectors";
import shopCategoryActions from "src/modules/shop/shopCategoryActions";
import shopCategorySelectors from "src/modules/shop/shopCategorySelectors";
import shopProductActions from "src/modules/shop/shopProductActions";
import shopProductSelectors from "src/modules/shop/shopProductSelectors";
import categoryIcon from "src/view/pages/Estore/shared/categoryIcon";
import { categoryLabel } from "src/view/pages/Estore/shared/categoryLabel";
import categoryIconImage from "src/view/pages/PC/categoryIconImage";
import { sortCategoriesByPriority } from "src/view/pages/PC/categoryOrder";

const HOME_CATEGORY_COUNT = 4;

// Mirrors PC/Home.tsx - this is a women's-fashion storefront, so the phone
// home feed (Flash Deals / Just For You) is women's-clothing only too.
const WOMEN_CATEGORY_NAMES = ["Women Clothing"];

// Decorative "% off" badges for the promo carousel - the catalog has no
// real discount/sale-price field yet, so these are cosmetic only and just
// cycle across whatever products land in the carousel.
const PROMO_DISCOUNTS = [50, 30, 40, 25];
const PROMO_ROTATE_MS = 4000;

// Same idea for the flash-deals strip and the "Just For You" grid: the
// catalog has no discount/rating/sold-count fields yet, so these pools are
// purely decorative and just cycle across whatever products land there.
const FLASH_DISCOUNTS = [45, 35, 50, 30];
const RATING_POOL = [4.8, 4.9, 4.7, 4.6, 4.9, 4.8];
const SOLD_POOL = ["1.2k sold", "860 sold", "2.1k sold", "540 sold", "3.4k sold", "720 sold"];
const BADGE_POOL = ["NEW", "HOT", null, null, null, null];

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
  }, [dispatch]);

  // Same as PC/Home.tsx: wait for the real category ids before filtering to
  // Women Clothing, then pull 3 pages (30 products) so the phone home feed
  // carries the same total product count as the PC homepage instead of
  // running dry after the first page of 10.
  const hasFetchedProducts = useRef(false);

  useEffect(() => {
    if (hasFetchedProducts.current || categoriesLoading || categories.length === 0) {
      return;
    }

    const womenCategoryIds = categories
      .filter((category: any) => WOMEN_CATEGORY_NAMES.includes(category.name))
      .map((category: any) => category.id);

    if (womenCategoryIds.length === 0) {
      return;
    }

    hasFetchedProducts.current = true;

    (async () => {
      await dispatch(
        shopProductActions.doFetch(womenCategoryIds, undefined, undefined, undefined, true) as any,
      );
      await dispatch(shopProductActions.doFetchMore() as any);
      await dispatch(shopProductActions.doFetchMore() as any);
    })();
  }, [dispatch, categories, categoriesLoading]);

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

  // Same priority order as the PC site (Women categories first) so the
  // phone home row and the PC nav/sidebars always agree.
  const homeCategories = useMemo(
    () => sortCategoriesByPriority(categories as any[]).slice(0, HOME_CATEGORY_COUNT),
    [categories],
  );

  // Keep the homepage promo carousel broadly appealing rather than
  // spotlighting culturally/religiously specific items that happened to
  // land in the catalog via the bulk product import - the storefront's
  // customer base skews US/general audience, not this kind of item.
  const PROMO_EXCLUDE_PATTERN = /ramadan|\beid\b|islamic|muslim|hijab|niqab/i;

  // The real catalog is fetched once (newest first); the first few eligible
  // products drive the hero carousel, the next few the flash-deals strip,
  // and the rest fills the grid, so the same product isn't shown twice.
  const eligibleProducts = products.filter(
    (product: any) => !PROMO_EXCLUDE_PATTERN.test(product.title || ""),
  );
  const promoItems = eligibleProducts.slice(0, 3);
  const flashDeals = eligibleProducts.slice(3, 7);
  const usedIds = new Set(
    [...promoItems, ...flashDeals].map((product: any) => product.id),
  );
  const justForYou = eligibleProducts.filter(
    (product: any) => !usedIds.has(product.id),
  );
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
              <h2>Top Picks</h2>
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
                      <span className="promo-eyebrow">✨ Estore Exclusive</span>
                      <div className="promo-title">{product.title}</div>
                      <span className="promo-badge">
                        UP TO <b>{PROMO_DISCOUNTS[index % PROMO_DISCOUNTS.length]}%</b> OFF
                      </span>
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
                  {categoryIconImage(category.name) ? (
                    <img src={categoryIconImage(category.name)!} alt="" loading="lazy" />
                  ) : (
                    <span>{categoryIcon(category.name)}</span>
                  )}
                </div>
                <div className="cat-label">{categoryLabel(category.name)}</div>
              </div>
            ))}
          </div>

          {categories.length > 0 && (
            <div className="section" style={{ paddingTop: "4px", paddingBottom: 0 }}>
              <Link to="/classification" className="see-all-link">Browse all categories ›</Link>
            </div>
          )}

          {flashDeals.length > 0 && (
            <div className="section" style={{ paddingTop: "22px" }}>
              <div className="section-head">
                <h2>Flash Deals</h2>
                <span className="timer">⏱ Limited time</span>
              </div>
              <div className="deal-scroll">
                {flashDeals.map((product: any, index: number) => {
                  const discount = FLASH_DISCOUNTS[index % FLASH_DISCOUNTS.length];
                  const price = typeof product.price === "number" ? product.price : Number(product.price) || 0;
                  const oldPrice = price / (1 - discount / 100);

                  return (
                    <div
                      className="deal-card"
                      key={product.id}
                      onClick={() => goToProduct(product.id)}
                    >
                      <div className="deal-thumb">
                        {product.image && <img src={product.image} alt={product.title} loading="lazy" />}
                        <span className="off-tag">-{discount}%</span>
                      </div>
                      <div className="deal-info">
                        <div className="deal-name">{product.title}</div>
                        <div className="deal-price-row">
                          <span className="deal-price">${price.toFixed(2)}</span>
                          <span className="deal-old">${oldPrice.toFixed(2)}</span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
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
              {justForYou.map((product: any, index: number) => {
                const badge = BADGE_POOL[index % BADGE_POOL.length];

                return (
                  <div
                    className="prod-card"
                    key={product.id}
                    onClick={() => goToProduct(product.id)}
                  >
                    <div className="prod-thumb">
                      {product.image && <img src={product.image} alt={product.title} loading="lazy" />}
                      {badge && <span className={`prod-badge ${badge === "HOT" ? "hot" : "new"}`}>{badge}</span>}
                    </div>
                    <div className="prod-info">
                      <div className="prod-name">{product.title}</div>
                      <div className="prod-meta">
                        ⭐ {RATING_POOL[index % RATING_POOL.length]} · {SOLD_POOL[index % SOLD_POOL.length]}
                      </div>
                      <div className="prod-price-row">
                        <span className="prod-price">
                          ${typeof product.price === "number" ? product.price.toFixed(2) : product.price}
                        </span>
                        <button className="add-btn" onClick={(event) => doQuickAdd(event, product)}>+</button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
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
          --gold:#F59E0B;
          --pink:#DC2626;
        }

        *{box-sizing:border-box; margin:0; padding:0;}

        body{
          font-family:'Segoe UI', Roboto, Arial, sans-serif;
          background:var(--page-bg);
          margin:0;
        }

        @keyframes fadeSlideUp{
          from{ opacity:0; transform:translateY(10px); }
          to{ opacity:1; transform:translateY(0); }
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
          background:linear-gradient(135deg, var(--blue-deep), var(--blue-bright) 65%, #E28E71);
          padding:14px 18px 26px;
          color:#fff;
          border-radius:0 0 26px 26px;
          box-shadow:0 14px 30px rgba(0,0,0,0.22);
        }

        .header-top{
          display:flex;
          justify-content:space-between;
          align-items:flex-start;
          margin-bottom:14px;
        }

        .greeting .title{ font-size:17px; font-weight:800; letter-spacing:0.2px; }
        .greeting .sub{ font-size:12px; opacity:0.85; margin-top:2px; }

        .header-top .right-cluster{ display:flex; align-items:flex-start; gap:10px; }

        .bell, .cart-icon{
          width:34px; height:34px;
          border-radius:50%;
          background:rgba(255,255,255,0.16);
          backdrop-filter:blur(2px);
          display:flex; align-items:center; justify-content:center;
          font-size:16px;
          position:relative;
          text-decoration:none;
          color:#fff;
          transition:transform 0.15s ease, background 0.15s ease;
        }
        .bell:hover, .cart-icon:hover{ background:rgba(255,255,255,0.28); transform:translateY(-1px); }
        .bell::after{
          content:"";
          position:absolute; top:6px; right:7px;
          width:7px; height:7px;
          background:var(--pink); border-radius:50%;
          border:1.5px solid var(--blue-deep);
        }
        .cart-icon .dot{
          position:absolute; top:-4px; right:-6px;
          min-width:16px; height:16px; padding:0 3px;
          background:var(--pink); color:#fff; border-radius:8px;
          font-size:9px; font-weight:800; line-height:16px; text-align:center;
          box-shadow:0 0 0 2px var(--blue-deep);
        }

        .search-row{
          display:flex;
          align-items:center;
          gap:10px;
          background:#fff;
          border-radius:14px;
          padding:11px 14px;
          box-shadow:0 10px 24px rgba(0,0,0,0.18);
          transition:box-shadow 0.15s ease;
        }
        .search-row:focus-within{ box-shadow:0 10px 24px rgba(0,0,0,0.28), 0 0 0 2px rgba(255,255,255,0.5); }
        .search-row input{
          border:none; outline:none; flex:1;
          font-size:14px; color:var(--navy); background:transparent;
        }
        .search-row input::placeholder{ color:#888888; }
        .search-icon{ font-size:16px; color:var(--blue-mid); }

        .categories{ display:flex; justify-content:space-between; padding:22px 18px 6px; gap:8px; }
        .cat-item{ display:flex; flex-direction:column; align-items:center; gap:8px; width:22%; cursor:pointer; }
        .cat-icon{
          width:60px; height:60px; border-radius:18px;
          overflow:hidden;
          box-shadow:0 8px 18px rgba(0,0,0,0.12);
          border:2px solid #fff;
          transition:transform 0.15s ease, box-shadow 0.15s ease;
        }
        .cat-item:hover .cat-icon, .cat-item:active .cat-icon{
          transform:translateY(-3px) scale(1.04);
          box-shadow:0 12px 22px rgba(0,0,0,0.2);
        }
        .icon-cat-icon{
          display:flex; align-items:center; justify-content:center;
          background:linear-gradient(150deg, #FAFAFA, #E7E7E7);
          font-size:26px;
        }
        .icon-cat-icon img{
          width:34px; height:34px; object-fit:contain;
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

        .section{ padding:22px 18px 6px; animation:fadeSlideUp 0.4s ease both; }
        .section-head{ display:flex; justify-content:space-between; align-items:center; margin-bottom:14px; }
        .section-head h2{ font-size:16px; color:var(--navy); font-weight:800; }
        .section-head .see-all{ font-size:12px; color:var(--blue-mid); font-weight:600; text-decoration:none; }
        .section-head .timer{
          font-size:11px; color:var(--pink); font-weight:700;
          background:#FCE9E9; padding:4px 10px; border-radius:10px;
        }

        .promo-carousel{
          position:relative;
          height:210px;
          border-radius:24px;
          overflow:hidden;
          background:#E7E7E7;
          box-shadow:0 16px 32px rgba(0,0,0,0.18);
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
          background:linear-gradient(120deg, rgba(17,17,17,0.9) 20%, rgba(185,60,26,0.6) 70%, rgba(209,69,31,0.3) 100%);
        }
        .promo-content{
          position:relative;
          height:100%;
          padding:20px 64px 22px 20px;
          display:flex;
          flex-direction:column;
          justify-content:flex-end;
        }
        .promo-eyebrow{
          font-size:10px; letter-spacing:2.5px; text-transform:uppercase;
          font-weight:700; opacity:0.85; margin-bottom:6px;
        }
        .promo-title{
          font-size:19px; font-weight:800; line-height:1.22;
          overflow:hidden; text-overflow:ellipsis; display:-webkit-box;
          -webkit-line-clamp:2; -webkit-box-orient:vertical;
          margin-bottom:10px;
        }
        .promo-badge{
          align-self:flex-start;
          background:var(--gold); color:var(--navy); font-weight:700; font-size:11.5px;
          padding:6px 11px; border-radius:9px;
          box-shadow:0 6px 14px rgba(0,0,0,0.18);
        }
        .promo-badge b{ font-size:14px; }
        .promo-price{ font-size:15px; font-weight:700; margin-top:8px; opacity:0.95; }

        .promo-dots{
          position:absolute; bottom:14px; right:16px; z-index:1;
          display:flex; gap:6px;
        }
        .promo-dots span{
          width:6px; height:6px; border-radius:50%;
          background:rgba(255,255,255,0.5); cursor:pointer;
          transition:width 0.2s ease;
        }
        .promo-dots span.active{ background:#fff; width:16px; border-radius:4px; }

        .deal-scroll{
          display:flex; gap:12px; overflow-x:auto; padding:2px 2px 8px; scrollbar-width:none;
        }
        .deal-scroll::-webkit-scrollbar{ display:none; }
        .deal-card{
          flex:0 0 auto; width:130px;
          background:var(--card-bg); border-radius:16px; overflow:hidden;
          box-shadow:0 8px 20px rgba(0,0,0,0.1);
          cursor:pointer;
          transition:transform 0.15s ease, box-shadow 0.15s ease;
        }
        .deal-card:hover{ transform:translateY(-3px); box-shadow:0 12px 24px rgba(0,0,0,0.18); }
        .deal-thumb{ width:100%; height:112px; position:relative; background:#F4F4F4; }
        .deal-thumb img{ width:100%; height:100%; object-fit:cover; }
        .deal-thumb .off-tag{
          position:absolute; top:6px; left:6px;
          background:var(--pink); color:#fff; font-size:9px; font-weight:800;
          padding:3px 6px; border-radius:6px;
        }
        .deal-info{ padding:9px 10px 11px; }
        .deal-name{
          font-size:12px; font-weight:700; color:var(--navy);
          overflow:hidden; text-overflow:ellipsis; white-space:nowrap;
        }
        .deal-price-row{ display:flex; align-items:baseline; gap:6px; margin-top:5px; }
        .deal-price{ font-size:13px; font-weight:800; color:var(--blue-deep); }
        .deal-old{ font-size:10px; color:#888888; text-decoration:line-through; }

        .grid{ display:grid; grid-template-columns:1fr 1fr; gap:12px; padding:6px 18px 24px; }
        .prod-card{
          background:var(--card-bg); border-radius:16px; overflow:hidden;
          box-shadow:0 8px 20px rgba(0,0,0,0.08);
          cursor:pointer;
          transition:transform 0.15s ease, box-shadow 0.15s ease;
        }
        .prod-card:hover{ transform:translateY(-3px); box-shadow:0 14px 26px rgba(0,0,0,0.16); }
        .prod-thumb{ width:100%; height:140px; position:relative; background:#F4F4F4; }
        .prod-thumb img{ width:100%; height:100%; object-fit:cover; }
        .prod-badge{
          position:absolute; top:8px; left:8px;
          font-size:9px; font-weight:800; letter-spacing:0.3px;
          padding:3px 7px; border-radius:6px; color:#fff;
        }
        .prod-badge.new{ background:rgba(17,17,17,0.8); }
        .prod-badge.hot{ background:var(--pink); }
        .prod-info{ padding:10px 12px 12px; }
        .prod-name{
          font-size:13px; font-weight:700; color:var(--navy);
          overflow:hidden; text-overflow:ellipsis; display:-webkit-box;
          -webkit-line-clamp:2; -webkit-box-orient:vertical;
        }
        .prod-meta{ font-size:11px; color:var(--grey-text); margin-top:3px; }
        .prod-price-row{ display:flex; justify-content:space-between; align-items:center; margin-top:8px; }
        .prod-price{ font-size:14px; font-weight:800; color:var(--blue-deep); }
        .add-btn{
          width:28px; height:28px; border-radius:50%;
          background:linear-gradient(135deg, var(--blue-bright), var(--blue-mid));
          color:#fff; border:none; font-size:16px;
          display:flex; align-items:center; justify-content:center;
          cursor:pointer;
          box-shadow:0 6px 14px rgba(209,69,31,0.4);
          transition:transform 0.15s ease;
        }
        .add-btn:hover{ transform:scale(1.1); }


      `}</style>
    </>
  );
}

export default Home;
