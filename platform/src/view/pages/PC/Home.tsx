import React, { useEffect, useMemo, useRef, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import authSelectors from "src/modules/auth/authSelectors";
import cartActions from "src/modules/cart/cartActions";
import shopCategoryActions from "src/modules/shop/shopCategoryActions";
import shopCategorySelectors from "src/modules/shop/shopCategorySelectors";
import shopProductActions from "src/modules/shop/shopProductActions";
import shopProductSelectors from "src/modules/shop/shopProductSelectors";
import companyListActions from "src/modules/company/list/companyListActions";
import companyListSelectors from "src/modules/company/list/companyListSelectors";
import categoryIcon from "src/view/pages/Estore/shared/categoryIcon";
import categoryIconImage from "src/view/pages/PC/categoryIconImage";
import { sortCategoriesByPriority } from "src/view/pages/PC/categoryOrder";

// Maps each PC footer/sidebar info link to the company field the admin
// fills in under Admin > Company, and the title shown in the info modal.
const COMPANY_INFO_LINKS: Record<string, { title: string; field: string }> = {
  aboutUs: { title: "About Us", field: "companydetails" },
  joinUs: { title: "Join Us", field: "joinUs" },
  contactUs: { title: "Contact Us", field: "contactUs" },
  merchantAgreement: { title: "Merchant Agreement", field: "merchantAgreement" },
  supplierCooperation: { title: "Supplier Cooperation", field: "supplierCooperation" },
  strategicManagement: { title: "Strategic Management", field: "strategicManagement" },
  precisionOperation: { title: "Precision Operation", field: "precisionOperation" },
  courseDriven: { title: "Course Driven", field: "courseDriven" },
  faqs: { title: "FAQ", field: "faqs" },
};

const HERO_ROTATE_MS = 6000;
const FLASH_DISCOUNTS = [45, 35, 50, 30, 25, 40];
const RATING_POOL = [4.8, 4.9, 4.7, 4.6, 4.9, 4.8];
const SOLD_POOL = ["1.2k sold", "860 sold", "2.1k sold", "540 sold", "3.4k sold", "720 sold"];
const BADGE_POOL = ["NEW", "HOT", null, null, null, null];

const PROMO_EXCLUDE_PATTERN = /ramadan|\beid\b|islamic|muslim|hijab|niqab/i;

// Flash Deals and Just For You are women's-clothing-only rails - shoes,
// bags, accessories and lifestyle items are deliberately excluded so every
// product shown there is actual clothing.
const WOMEN_CATEGORY_NAMES = ["Women Clothing"];

const TRUST_BADGES = [
  { icon: "🚚", title: "Free Shipping", text: "On orders over $50" },
  { icon: "↩️", title: "Easy Returns", text: "30-day return window" },
  { icon: "🔒", title: "Secure Checkout", text: "Your data stays protected" },
  { icon: "🎧", title: "24/7 Support", text: "We're here whenever you need us" },
];

function Home() {
  const dispatch = useDispatch();
  const history = useHistory();

  const currentUser = useSelector(authSelectors.selectCurrentUser);

  const categories = useSelector(shopCategorySelectors.selectRows);
  const categoriesLoading = useSelector(shopCategorySelectors.selectLoading);
  const products = useSelector(shopProductSelectors.selectRows);
  const productsLoading = useSelector(shopProductSelectors.selectLoading);
  const companyRecord = useSelector(companyListSelectors.selectRows);

  const [activeInfoKey, setActiveInfoKey] = useState<string | null>(null);

  useEffect(() => {
    dispatch(shopCategoryActions.doFetch(true));
    dispatch(companyListActions.doFetch());
  }, [dispatch]);

  useEffect(() => {
    if (!activeInfoKey) {
      return;
    }
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setActiveInfoKey(null);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [activeInfoKey]);

  const activeInfo = activeInfoKey ? COMPANY_INFO_LINKS[activeInfoKey] : null;
  const activeInfoContent = activeInfo ? companyRecord?.[0]?.[activeInfo.field] : null;

  // Products can only be filtered down to the women's categories once the
  // category list (with real ids) has loaded, so this waits on `categories`
  // instead of firing alongside the category fetch above.
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

    // The first page is only 10 products (shopProductActions.PAGE_SIZE) -
    // load two more pages so Flash Deals (6) + Just For You still has 15+
    // products left over instead of running dry after the first page.
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

  const heroSlides = useMemo(
    () => [
      {
        image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=1600&h=560&fit=crop&q=80",
        eyebrow: currentUser ? "Welcome back" : "Welcome, gorgeous",
        title: greetingName ? `Hi, ${greetingName} 👋` : "Styled For Every Her",
        text: "Curated dresses, shoes and accessories, handpicked for women who love to shine.",
        cta: "Shop Women",
      },
      {
        image: "https://images.unsplash.com/photo-1445205170230-053b83016050?w=1600&h=560&fit=crop&q=80",
        eyebrow: "Limited time",
        title: "Up To 50% Off Women's Fashion",
        text: "Refresh your wardrobe with this season's must-have styles.",
        cta: "Shop The Sale",
      },
      {
        image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=1600&h=560&fit=crop&q=80",
        eyebrow: "New arrivals",
        title: "Jewelry You'll Love",
        text: "From delicate necklaces to statement bags — finish every look in style.",
        cta: "Explore Accessories",
      },
      {
        image: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=1600&h=560&fit=crop&q=80",
        eyebrow: "This week only",
        title: "Free Shipping On Orders $50+",
        text: "No code needed — the discount is applied automatically at checkout.",
        cta: "Start Shopping",
      },
    ],
    [currentUser, greetingName],
  );

  const [heroIndex, setHeroIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setHeroIndex((current) => (current + 1) % heroSlides.length);
    }, HERO_ROTATE_MS);

    return () => clearInterval(timer);
  }, [heroSlides.length]);

  const goToCategory = (categoryId: string) => {
    history.push("/pc/classification", { categoryId });
  };

  const goToProduct = (id: string) => {
    history.push(`/pc/product/${id}`);
  };

  const doQuickAdd = (event: React.MouseEvent, product: any) => {
    event.stopPropagation();
    dispatch(cartActions.doAddItem(product, 1));
  };

  // Bulk-imported rows can share an identical createdAt timestamp, which
  // makes plain skip/limit pagination (sorted by createdAt) return the same
  // product on more than one page - de-dupe by id defensively on top of the
  // promo-title exclusion.
  const seenProductIds = new Set<string>();
  const eligibleProducts = products.filter((product: any) => {
    if (!product?.id || seenProductIds.has(product.id)) {
      return false;
    }
    if (PROMO_EXCLUDE_PATTERN.test(product.title || "")) {
      return false;
    }
    seenProductIds.add(product.id);
    return true;
  });
  const flashDeals = eligibleProducts.slice(0, 6);
  const usedIds = new Set(flashDeals.map((product: any) => product.id));
  const justForYou = eligibleProducts.filter(
    (product: any) => !usedIds.has(product.id),
  );
  const isLoading = categoriesLoading || productsLoading;

  const globalPurchaseCategory = categories.find(
    (category: any) => category.name === "Global Purchase",
  );

  const orderedCategories = sortCategoriesByPriority(categories);

  return (
    <>
      <div className="pc-home">
        <div className="pc-container">
          <div className="pc-home__page-row">
          <aside className="pc-home__cat-sidebar pc-card">
            <div className="pc-home__cat-sidebar-title">All Categories</div>
            <nav className="pc-home__cat-sidebar-list">
              {categoriesLoading && categories.length === 0 && (
                <div className="pc-home__cat-sidebar-empty">Loading...</div>
              )}
              {!categoriesLoading && categories.length === 0 && (
                <div className="pc-home__cat-sidebar-empty">No categories yet.</div>
              )}
              {orderedCategories.map((category: any) => (
                <button
                  type="button"
                  key={category.id}
                  className="pc-home__cat-sidebar-item"
                  onClick={() => goToCategory(category.id)}
                >
                  <span className="pc-home__cat-sidebar-icon">
                    {categoryIconImage(category.name) ? (
                      <img src={categoryIconImage(category.name)!} alt="" loading="lazy" />
                    ) : (
                      categoryIcon(category.name)
                    )}
                  </span>
                  <span className="pc-home__cat-sidebar-label">{category.name}</span>
                </button>
              ))}
            </nav>
            <Link to="/pc/classification" className="pc-home__cat-sidebar-all">
              Browse all categories ›
            </Link>

            <div className="pc-home__sidebar-footer">
              <div className="pc-home__sidebar-footer-group">
                <div className="pc-home__sidebar-footer-heading">About E-store Fashion</div>
                <span
                  className="pc-home__sidebar-footer-link is-clickable"
                  onClick={() => setActiveInfoKey("aboutUs")}
                >
                  about Us
                </span>
                <span
                  className="pc-home__sidebar-footer-link is-clickable"
                  onClick={() => setActiveInfoKey("joinUs")}
                >
                  Join us
                </span>
                <span
                  className="pc-home__sidebar-footer-link is-clickable"
                  onClick={() => setActiveInfoKey("contactUs")}
                >
                  Contact Us
                </span>
              </div>

              <div className="pc-home__sidebar-footer-group">
                <div className="pc-home__sidebar-footer-heading">Exchange and Cooperation</div>
                <span
                  className="pc-home__sidebar-footer-link is-clickable"
                  onClick={() => setActiveInfoKey("merchantAgreement")}
                >
                  Merchant Agreement
                </span>
                <span
                  className="pc-home__sidebar-footer-link is-clickable"
                  onClick={() => setActiveInfoKey("supplierCooperation")}
                >
                  Supplier Cooperation
                </span>
              </div>

              <div className="pc-home__sidebar-footer-group">
                <div className="pc-home__sidebar-footer-heading">Strategic Management</div>
                <span
                  className="pc-home__sidebar-footer-link is-clickable"
                  onClick={() => setActiveInfoKey("strategicManagement")}
                >
                  Strategic Management
                </span>
                <span
                  className="pc-home__sidebar-footer-link is-clickable"
                  onClick={() => setActiveInfoKey("precisionOperation")}
                >
                  Precision Operation
                </span>
                <span
                  className="pc-home__sidebar-footer-link is-clickable"
                  onClick={() => setActiveInfoKey("courseDriven")}
                >
                  Course Driven
                </span>
              </div>

              <div className="pc-home__sidebar-footer-group pc-home__sidebar-footer-group--plain">
                <span
                  className="pc-home__sidebar-footer-link pc-home__sidebar-footer-link--icon is-clickable"
                  onClick={() => setActiveInfoKey("faqs")}
                >
                  ❓ FAQ
                </span>
                <span className="pc-home__sidebar-footer-link pc-home__sidebar-footer-link--icon">
                  ⬇ Download the app
                </span>
                <span
                  className={`pc-home__sidebar-footer-link pc-home__sidebar-footer-link--icon${globalPurchaseCategory ? " is-clickable" : ""}`}
                  onClick={
                    globalPurchaseCategory
                      ? () => goToCategory(globalPurchaseCategory.id)
                      : undefined
                  }
                >
                  🌍 Global Purchase
                </span>
              </div>
            </div>
          </aside>

          <div className="pc-home__main-col">
            <div className="pc-home__slider">
              {heroSlides.map((slide, index) => (
                <div
                  key={slide.title}
                  className={`pc-home__slide${index === heroIndex ? " active" : ""}`}
                  style={{ backgroundImage: `url(${slide.image})` }}
                >
                  <div className="pc-home__slide-overlay" />
                  <div className="pc-home__slide-content">
                    <span className="pc-home__slide-eyebrow">✨ {slide.eyebrow}</span>
                    <h1>{slide.title}</h1>
                    <p>{slide.text}</p>
                    <Link to="/pc/classification" className="pc-btn pc-btn-primary pc-home__slide-cta">
                      {slide.cta}
                    </Link>
                  </div>
                </div>
              ))}

              <button
                type="button"
                className="pc-home__slide-arrow pc-home__slide-arrow--prev"
                onClick={() => setHeroIndex((current) => (current - 1 + heroSlides.length) % heroSlides.length)}
                aria-label="Previous slide"
              >
                ‹
              </button>
              <button
                type="button"
                className="pc-home__slide-arrow pc-home__slide-arrow--next"
                onClick={() => setHeroIndex((current) => (current + 1) % heroSlides.length)}
                aria-label="Next slide"
              >
                ›
              </button>

              <div className="pc-home__slide-dots">
                {heroSlides.map((slide, index) => (
                  <span
                    key={slide.title}
                    className={index === heroIndex ? "active" : ""}
                    onClick={() => setHeroIndex(index)}
                  />
                ))}
              </div>
            </div>

            <div className="pc-home__trust-row">
              {TRUST_BADGES.map((badge) => (
                <div className="pc-home__trust-item" key={badge.title}>
                  <span className="pc-home__trust-icon">{badge.icon}</span>
                  <div>
                    <div className="pc-home__trust-title">{badge.title}</div>
                    <div className="pc-home__trust-text">{badge.text}</div>
                  </div>
                </div>
              ))}
            </div>

            {flashDeals.length > 0 && (
              <div className="pc-section">
                <div className="pc-section__head">
                  <h2>Flash Deals</h2>
                  <span className="pc-home__timer">⏱ Limited time</span>
                </div>
                <div className="pc-home__deals">
                  {flashDeals.map((product: any, index: number) => {
                    const discount = FLASH_DISCOUNTS[index % FLASH_DISCOUNTS.length];
                    const price = typeof product.price === "number" ? product.price : Number(product.price) || 0;
                    const oldPrice = price / (1 - discount / 100);

                    return (
                      <div
                        className="pc-home__deal-card"
                        key={product.id}
                        onClick={() => goToProduct(product.id)}
                      >
                        <div className="pc-home__deal-thumb">
                          {product.image && <img src={product.image} alt={product.title} loading="lazy" />}
                          <span className="pc-home__off-tag">-{discount}%</span>
                        </div>
                        <div className="pc-home__deal-info">
                          <div className="pc-home__deal-name">{product.title}</div>
                          <div className="pc-home__deal-price-row">
                            <span className="pc-home__deal-price">${price.toFixed(2)}</span>
                            <span className="pc-home__deal-old">${oldPrice.toFixed(2)}</span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            <div className="pc-section">
              <div className="pc-section__head">
                <h2>Just For You</h2>
                <Link to="/pc/classification" className="pc-section__see-all">See all ›</Link>
              </div>

              {isLoading && justForYou.length === 0 && (
                <div className="pc-home__state">Loading...</div>
              )}

              {!isLoading && justForYou.length === 0 && (
                <div className="pc-home__state">No more products to show right now.</div>
              )}

              {!isLoading && justForYou.length > 0 && (
                <div className="pc-home__grid">
                  {justForYou.map((product: any, index: number) => {
                    const badge = BADGE_POOL[index % BADGE_POOL.length];

                    return (
                      <div
                        className="pc-home__prod-card"
                        key={product.id}
                        onClick={() => goToProduct(product.id)}
                      >
                        <div className="pc-home__prod-thumb">
                          {product.image && <img src={product.image} alt={product.title} loading="lazy" />}
                          {badge && (
                            <span className={`pc-home__prod-badge ${badge === "HOT" ? "hot" : "new"}`}>
                              {badge}
                            </span>
                          )}
                        </div>
                        <div className="pc-home__prod-info">
                          <div className="pc-home__prod-name">{product.title}</div>
                          <div className="pc-home__prod-meta">
                            ⭐ {RATING_POOL[index % RATING_POOL.length]} · {SOLD_POOL[index % SOLD_POOL.length]}
                          </div>
                          <div className="pc-home__prod-price-row">
                            <span className="pc-home__prod-price">
                              ${typeof product.price === "number" ? product.price.toFixed(2) : product.price}
                            </span>
                            <button className="pc-home__add-btn" onClick={(event) => doQuickAdd(event, product)}>
                              + Add
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
          </div>
        </div>
      </div>

      {activeInfo && (
        <div
          className="pc-info-modal__backdrop"
          onClick={() => setActiveInfoKey(null)}
        >
          <div
            className="pc-info-modal"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="pc-info-modal__header">
              <h3>{activeInfo.title}</h3>
              <button
                type="button"
                className="pc-info-modal__close"
                aria-label="Close"
                onClick={() => setActiveInfoKey(null)}
              >
                ×
              </button>
            </div>
            <div className="pc-info-modal__body">
              {activeInfoContent ? (
                <div dangerouslySetInnerHTML={{ __html: activeInfoContent }} />
              ) : (
                <p className="pc-info-modal__empty">
                  This content hasn't been added yet. Please check back soon.
                </p>
              )}
            </div>
          </div>
        </div>
      )}

      <style>{`
        .pc-home {
          padding: 32px 0 56px;
        }

        .pc-home__page-row {
          display: grid;
          grid-template-columns: 250px 1fr;
          gap: 20px;
          align-items: start;
        }

        .pc-home__main-col {
          display: flex;
          flex-direction: column;
          gap: 40px;
        }

        .pc-home__cat-sidebar {
          display: flex;
          flex-direction: column;
          padding: 18px 0 20px;
        }

        .pc-home__cat-sidebar-title {
          font-size: 12px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          color: var(--pc-text-muted);
          padding: 0 18px 12px;
          border-bottom: 1px solid var(--pc-divider);
          margin-bottom: 6px;
        }

        .pc-home__cat-sidebar-list {
          display: flex;
          flex-direction: column;
        }

        .pc-home__cat-sidebar-empty {
          padding: 12px 18px;
          font-size: 13px;
          color: var(--pc-text-muted);
        }

        .pc-home__cat-sidebar-item {
          display: flex;
          align-items: center;
          gap: 12px;
          width: 100%;
          border: none;
          background: none;
          text-align: left;
          padding: 9px 18px;
          font-size: 13.5px;
          font-weight: 600;
          color: var(--pc-text-secondary);
          cursor: pointer;
          transition: background 0.15s ease, color 0.15s ease;
        }

        .pc-home__cat-sidebar-item:hover {
          background: var(--pc-secondary);
          color: var(--pc-primary-dark);
        }

        .pc-home__cat-sidebar-icon {
          font-size: 16px;
          width: 20px;
          height: 20px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          text-align: center;
          flex-shrink: 0;
        }

        .pc-home__cat-sidebar-icon img {
          width: 20px;
          height: 20px;
          object-fit: contain;
        }

        .pc-home__cat-sidebar-label {
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }

        .pc-home__cat-sidebar-all {
          display: block;
          margin: 10px 18px 0;
          padding-top: 12px;
          border-top: 1px solid var(--pc-divider);
          font-size: 12.5px;
          font-weight: 700;
          color: var(--pc-primary);
          text-decoration: none;
        }

        .pc-home__cat-sidebar-all:hover {
          text-decoration: underline;
        }

        .pc-home__sidebar-footer {
          display: flex;
          flex-direction: column;
          gap: 18px;
          margin-top: 18px;
          padding: 18px 18px 0;
          border-top: 1px solid var(--pc-divider);
        }

        .pc-home__sidebar-footer-group {
          display: flex;
          flex-direction: column;
          gap: 7px;
        }

        .pc-home__sidebar-footer-group--plain {
          gap: 12px;
        }

        .pc-home__sidebar-footer-heading {
          font-size: 13px;
          font-weight: 700;
          color: var(--pc-text);
          margin-bottom: 2px;
        }

        .pc-home__sidebar-footer-link {
          font-size: 12.5px;
          color: var(--pc-text-secondary);
          cursor: default;
        }

        .pc-home__sidebar-footer-link--icon {
          display: flex;
          align-items: center;
          gap: 8px;
          font-weight: 600;
          color: var(--pc-text);
        }

        .pc-home__sidebar-footer-link.is-clickable {
          cursor: pointer;
        }

        .pc-home__sidebar-footer-link.is-clickable:hover {
          color: var(--pc-primary);
        }

        .pc-home__slider {
          position: relative;
          border-radius: var(--pc-radius);
          overflow: hidden;
          height: 440px;
          background: var(--pc-secondary);
          box-shadow: 0 16px 36px var(--pc-shadow);
        }

        .pc-home__slide {
          position: absolute;
          inset: 0;
          background-size: cover;
          background-position: center;
          opacity: 0;
          visibility: hidden;
          transition: opacity 0.6s ease;
        }

        .pc-home__slide.active {
          opacity: 1;
          visibility: visible;
        }

        .pc-home__slide-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(100deg, rgba(58,12,32,0.78) 0%, rgba(58,12,32,0.42) 45%, rgba(58,12,32,0.1) 75%);
        }

        .pc-home__slide-content {
          position: relative;
          height: 100%;
          display: flex;
          flex-direction: column;
          justify-content: center;
          gap: 14px;
          max-width: 520px;
          /* Left padding clears the prev-arrow button (left:20px, 44px wide,
             so it ends at 64px) - anything less lets short-title slides put
             body text right behind the arrow at the vertical center. */
          padding: 0 56px 0 80px;
          color: #fff;
        }

        .pc-home__slide-eyebrow {
          font-size: 13px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 1.5px;
          color: #F5B8CE;
        }

        .pc-home__slide-content h1 {
          font-size: 38px;
          font-weight: 800;
          margin: 0;
          line-height: 1.2;
          text-shadow: 0 2px 12px rgba(0,0,0,0.3);
        }

        .pc-home__slide-content p {
          font-size: 15px;
          margin: 0;
          opacity: 0.92;
          line-height: 1.6;
          max-width: 420px;
        }

        .pc-home__slide-cta {
          width: fit-content;
          padding: 14px 28px;
          margin-top: 10px;
        }

        .pc-home__slide-arrow {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          width: 44px;
          height: 44px;
          border-radius: 50%;
          border: none;
          background: rgba(255,255,255,0.2);
          color: #fff;
          font-size: 24px;
          line-height: 1;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: background 0.15s ease;
          backdrop-filter: blur(2px);
        }

        .pc-home__slide-arrow:hover {
          background: rgba(255,255,255,0.35);
        }

        .pc-home__slide-arrow--prev {
          left: 20px;
        }

        .pc-home__slide-arrow--next {
          right: 20px;
        }

        .pc-home__slide-dots {
          position: absolute;
          bottom: 22px;
          left: 56px;
          display: flex;
          gap: 8px;
        }

        .pc-home__slide-dots span {
          width: 9px;
          height: 9px;
          border-radius: 50%;
          background: rgba(255,255,255,0.5);
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .pc-home__slide-dots span.active {
          background: #fff;
          width: 26px;
          border-radius: 5px;
        }

        .pc-home__trust-row {
          display: grid;
          grid-template-columns: repeat(4, minmax(0, 1fr));
          gap: 16px;
        }

        .pc-home__trust-item {
          display: flex;
          align-items: center;
          gap: 14px;
          background: var(--pc-surface);
          border: 1px solid var(--pc-border);
          border-radius: var(--pc-radius);
          padding: 18px 20px;
        }

        .pc-home__trust-icon {
          font-size: 24px;
          flex-shrink: 0;
        }

        .pc-home__trust-title {
          font-size: 13.5px;
          font-weight: 700;
          color: var(--pc-text);
        }

        .pc-home__trust-text {
          font-size: 12px;
          color: var(--pc-text-muted);
          margin-top: 2px;
        }

        .pc-section__head {
          display: flex;
          align-items: baseline;
          justify-content: space-between;
          margin-bottom: 18px;
        }

        .pc-section__head h2 {
          font-size: 19px;
          font-weight: 800;
          margin: 0;
          color: var(--pc-text);
        }

        .pc-section__see-all {
          font-size: 13.5px;
          font-weight: 600;
          color: var(--pc-primary);
          text-decoration: none;
        }

        .pc-section__see-all:hover {
          text-decoration: underline;
        }

        .pc-home__state {
          color: var(--pc-text-muted);
          font-size: 14px;
          padding: 24px 0;
        }

        .pc-home__timer {
          background: #FCE4EE;
          color: #C2185B;
          font-size: 12.5px;
          font-weight: 700;
          padding: 5px 12px;
          border-radius: 999px;
        }

        .pc-home__deals {
          display: grid;
          grid-template-columns: repeat(6, minmax(0, 1fr));
          gap: 16px;
        }

        .pc-home__deal-card {
          background: var(--pc-surface);
          border: 1px solid var(--pc-border);
          border-radius: var(--pc-radius);
          overflow: hidden;
          cursor: pointer;
          transition: box-shadow 0.15s ease, transform 0.1s ease;
        }

        .pc-home__deal-card:hover {
          box-shadow: 0 12px 26px var(--pc-shadow);
          transform: translateY(-2px);
        }

        .pc-home__deal-thumb {
          position: relative;
          aspect-ratio: 1;
          background: var(--pc-secondary);
        }

        .pc-home__deal-thumb img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }

        .pc-home__off-tag {
          position: absolute;
          top: 8px;
          left: 8px;
          background: #C2185B;
          color: #fff;
          font-size: 11px;
          font-weight: 700;
          padding: 3px 7px;
          border-radius: 4px;
        }

        .pc-home__deal-info {
          padding: 10px 12px 14px;
        }

        .pc-home__deal-name {
          font-size: 13px;
          font-weight: 600;
          color: var(--pc-text);
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          min-height: 34px;
          margin-bottom: 8px;
        }

        .pc-home__deal-price-row {
          display: flex;
          align-items: baseline;
          gap: 8px;
        }

        .pc-home__deal-price {
          font-size: 15px;
          font-weight: 800;
          color: var(--pc-primary-dark);
        }

        .pc-home__deal-old {
          font-size: 12px;
          color: var(--pc-text-muted);
          text-decoration: line-through;
        }

        .pc-home__grid {
          display: grid;
          grid-template-columns: repeat(5, minmax(0, 1fr));
          gap: 20px;
        }

        .pc-home__prod-card {
          background: var(--pc-surface);
          border: 1px solid var(--pc-border);
          border-radius: var(--pc-radius);
          overflow: hidden;
          cursor: pointer;
          transition: box-shadow 0.15s ease, transform 0.1s ease, border-color 0.15s ease;
        }

        .pc-home__prod-card:hover {
          box-shadow: 0 14px 28px var(--pc-shadow);
          transform: translateY(-3px);
          border-color: var(--pc-primary);
        }

        .pc-home__prod-thumb {
          position: relative;
          aspect-ratio: 1;
          background: var(--pc-secondary);
        }

        .pc-home__prod-thumb img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }

        .pc-home__prod-badge {
          position: absolute;
          top: 8px;
          left: 8px;
          font-size: 10.5px;
          font-weight: 700;
          padding: 3px 8px;
          border-radius: 4px;
          color: #fff;
        }

        .pc-home__prod-badge.hot {
          background: #C2185B;
        }

        .pc-home__prod-badge.new {
          background: #9C6ADE;
        }

        .pc-home__prod-info {
          padding: 12px 14px 16px;
        }

        .pc-home__prod-name {
          font-size: 13.5px;
          font-weight: 600;
          color: var(--pc-text);
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          min-height: 36px;
          margin-bottom: 6px;
        }

        .pc-home__prod-meta {
          font-size: 12px;
          color: var(--pc-text-muted);
          margin-bottom: 10px;
        }

        .pc-home__prod-price-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .pc-home__prod-price {
          font-size: 16px;
          font-weight: 800;
          color: var(--pc-primary-dark);
        }

        .pc-home__add-btn {
          border: none;
          border-radius: 999px;
          background: var(--pc-primary);
          color: #fff;
          font-size: 12px;
          font-weight: 700;
          padding: 7px 14px;
          cursor: pointer;
          transition: background 0.15s ease;
        }

        .pc-home__add-btn:hover {
          background: var(--pc-primary-hover);
        }

        @media (max-width: 1100px) {
          .pc-home__deals,
          .pc-home__grid {
            grid-template-columns: repeat(4, minmax(0, 1fr));
          }
          .pc-home__trust-row {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }
        }

        @media (max-width: 860px) {
          .pc-home__page-row {
            grid-template-columns: 1fr;
          }
          .pc-home__cat-sidebar {
            display: none;
          }
          .pc-home__slider {
            height: 340px;
          }
          .pc-home__slide-content {
            padding: 0 28px;
          }
          .pc-home__slide-content h1 {
            font-size: 28px;
          }
          .pc-home__deals,
          .pc-home__grid {
            grid-template-columns: repeat(3, minmax(0, 1fr));
          }
        }

        .pc-info-modal__backdrop {
          position: fixed;
          inset: 0;
          background: rgba(17, 17, 17, 0.5);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 24px;
          z-index: 1000;
        }

        .pc-info-modal {
          background: var(--pc-surface);
          border-radius: var(--pc-radius);
          width: 100%;
          max-width: 620px;
          max-height: 80vh;
          display: flex;
          flex-direction: column;
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.25);
        }

        .pc-info-modal__header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 18px 22px;
          border-bottom: 1px solid var(--pc-divider);
        }

        .pc-info-modal__header h3 {
          margin: 0;
          font-size: 17px;
          font-weight: 700;
          color: var(--pc-text);
        }

        .pc-info-modal__close {
          border: none;
          background: transparent;
          font-size: 24px;
          line-height: 1;
          color: var(--pc-text-muted);
          cursor: pointer;
          padding: 4px 8px;
        }

        .pc-info-modal__close:hover {
          color: var(--pc-text);
        }

        .pc-info-modal__body {
          padding: 20px 22px 26px;
          overflow-y: auto;
          font-size: 14px;
          line-height: 1.6;
          color: var(--pc-text-secondary);
        }

        .pc-info-modal__empty {
          margin: 0;
          color: var(--pc-text-muted);
        }
      `}</style>
    </>
  );
}

export default Home;
