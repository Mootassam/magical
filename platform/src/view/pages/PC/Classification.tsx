import React, { useEffect, useRef, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import shopCategoryActions from "src/modules/shop/shopCategoryActions";
import shopCategorySelectors from "src/modules/shop/shopCategorySelectors";
import shopProductActions from "src/modules/shop/shopProductActions";
import shopProductSelectors from "src/modules/shop/shopProductSelectors";
import cartActions from "src/modules/cart/cartActions";
import categoryIcon from "src/view/pages/Estore/shared/categoryIcon";
import categoryIconImage from "src/view/pages/PC/categoryIconImage";
import { sortCategoriesByPriority } from "src/view/pages/PC/categoryOrder";
import { categoryLabel } from "src/view/pages/Estore/shared/categoryLabel";
import { i18n } from "../../../i18n";

const SEARCH_DEBOUNCE_MS = 400;

function Classification() {
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation<{ categoryId?: string; search?: string }>();

  const categories = useSelector(shopCategorySelectors.selectRows);
  const orderedCategories = sortCategoriesByPriority(categories as any[]);
  const categoriesLoading = useSelector(shopCategorySelectors.selectLoading);
  const products = useSelector(shopProductSelectors.selectRows);
  const productsLoading = useSelector(shopProductSelectors.selectLoading);
  const loadingMore = useSelector(shopProductSelectors.selectLoadingMore);
  const hasMore = useSelector(shopProductSelectors.selectHasMore);

  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(
    location.state?.categoryId || null,
  );
  const [searchInput, setSearchInput] = useState(location.state?.search || "");
  const [search, setSearch] = useState(location.state?.search || "");

  const sentinelRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    dispatch(shopCategoryActions.doFetch(true));
  }, [dispatch]);

  useEffect(() => {
    if (!selectedCategoryId && orderedCategories.length > 0) {
      setSelectedCategoryId(orderedCategories[0].id);
    }
  }, [orderedCategories, selectedCategoryId]);

  useEffect(() => {
    const handle = setTimeout(() => {
      setSearch(searchInput.trim());
    }, SEARCH_DEBOUNCE_MS);

    return () => clearTimeout(handle);
  }, [searchInput]);

  useEffect(() => {
    if (selectedCategoryId) {
      dispatch(
        shopProductActions.doFetch(selectedCategoryId, undefined, undefined, search || undefined, true),
      );
    }
  }, [dispatch, selectedCategoryId, search]);

  useEffect(() => {
    const target = sentinelRef.current;

    if (!target) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          dispatch(shopProductActions.doFetchMore());
        }
      },
      { rootMargin: "200px" },
    );

    observer.observe(target);

    return () => observer.disconnect();
  }, [dispatch, selectedCategoryId, search]);

  const selectedCategory = categories.find(
    (category: any) => category.id === selectedCategoryId,
  );

  const goToProduct = (id: string) => {
    history.push(`/pc/product/${id}`);
  };

  const doQuickAdd = (event: React.MouseEvent, product: any) => {
    event.stopPropagation();
    dispatch(cartActions.doAddItem(product, 1));
  };

  return (
    <>
      <div className="pc-classification">
        <div className="pc-container pc-classification__layout">
          <aside className="pc-classification__sidebar">
            <div className="pc-classification__search">
              <span>🔍</span>
              <input
                type="text"
                placeholder={i18n("estore.pc.classification.searchPlaceholder")}
                value={searchInput}
                onChange={(event) => setSearchInput(event.target.value)}
              />
            </div>

            <div className="pc-classification__side-title">{i18n("estore.pc.classification.categories")}</div>

            {categoriesLoading && categories.length === 0 && (
              <div className="pc-classification__side-loading">{i18n("estore.pc.classification.loading")}</div>
            )}
            {!categoriesLoading && categories.length === 0 && (
              <div className="pc-classification__side-loading">{i18n("estore.pc.classification.noCategories")}</div>
            )}

            <div className="pc-classification__side-list">
              {orderedCategories.map((category: any) => (
                <button
                  type="button"
                  key={category.id}
                  className={`pc-classification__side-item${category.id === selectedCategoryId ? " active" : ""}`}
                  onClick={() => setSelectedCategoryId(category.id)}
                >
                  <span className="pc-classification__side-icon">
                    {categoryIconImage(category.name) ? (
                      <img src={categoryIconImage(category.name)!} alt="" loading="lazy" />
                    ) : (
                      categoryIcon(category.name)
                    )}
                  </span>
                  <span>{categoryLabel(category.name)}</span>
                </button>
              ))}
            </div>
          </aside>

          <div className="pc-classification__content">
            {selectedCategory && (
              <div className="pc-classification__banner">
                <span className="pc-classification__banner-eyebrow">{i18n("estore.pc.classification.category")}</span>
                <div className="pc-classification__banner-name">
                  {categoryIcon(selectedCategory.name)} {categoryLabel(selectedCategory.name)}
                </div>
              </div>
            )}

            {productsLoading && (
              <div className="pc-classification__grid">
                {Array.from({ length: 8 }).map((_, index) => (
                  <div className="pc-classification__prod-card" key={index}>
                    <div className="pc-classification__prod-thumb pc-skeleton" />
                    <div className="pc-classification__prod-info">
                      <div className="pc-skeleton" style={{ height: 14, width: "80%", marginBottom: 8 }} />
                      <div className="pc-skeleton" style={{ height: 14, width: "40%" }} />
                    </div>
                  </div>
                ))}
              </div>
            )}

            {!productsLoading && products.length === 0 && (
              <div className="pc-classification__state">{i18n("estore.pc.classification.noProducts")}</div>
            )}

            {!productsLoading && products.length > 0 && (
              <div className="pc-classification__grid">
                {products.map((product: any) => (
                  <div
                    className="pc-classification__prod-card"
                    key={product.id}
                    onClick={() => goToProduct(product.id)}
                  >
                    <div className="pc-classification__prod-thumb">
                      {product.image && <img src={product.image} alt={product.title} loading="lazy" />}
                    </div>
                    <div className="pc-classification__prod-info">
                      <div className="pc-classification__prod-name">{product.title}</div>
                      <div className="pc-classification__prod-price-row">
                        <span className="pc-classification__prod-price">
                          ${typeof product.price === "number" ? product.price.toFixed(2) : product.price}
                        </span>
                        <button
                          className="pc-classification__add-btn"
                          onClick={(event) => doQuickAdd(event, product)}
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            <div className="pc-classification__sentinel" ref={sentinelRef}>
              {!productsLoading && loadingMore && (
                <div className="pc-classification__state">{i18n("estore.pc.classification.loadingMore")}</div>
              )}
              {!productsLoading && !loadingMore && !hasMore && products.length > 0 && (
                <div className="pc-classification__state">{i18n("estore.pc.classification.reachedEnd")}</div>
              )}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .pc-classification {
          padding: 28px 0 56px;
        }

        .pc-classification__layout {
          display: grid;
          grid-template-columns: 240px 1fr;
          gap: 28px;
          align-items: start;
        }

        .pc-classification__sidebar {
          background: var(--pc-surface);
          border: 1px solid var(--pc-border);
          border-radius: var(--pc-radius);
          padding: 18px;
          position: sticky;
          top: 96px;
        }

        .pc-classification__search {
          display: flex;
          align-items: center;
          gap: 8px;
          background: var(--pc-bg);
          border: 1px solid var(--pc-border);
          border-radius: 999px;
          padding: 9px 14px;
          margin-bottom: 18px;
        }

        .pc-classification__search input {
          border: none;
          background: transparent;
          outline: none;
          flex: 1;
          font-size: 13.5px;
          color: var(--pc-text);
        }

        .pc-classification__side-title {
          font-size: 12px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.4px;
          color: var(--pc-text-muted);
          margin-bottom: 10px;
        }

        .pc-classification__side-loading {
          font-size: 13px;
          color: var(--pc-text-muted);
          padding: 8px 0;
        }

        .pc-classification__side-list {
          display: flex;
          flex-direction: column;
          gap: 2px;
        }

        .pc-classification__side-item {
          display: flex;
          align-items: center;
          gap: 10px;
          border: none;
          background: none;
          text-align: left;
          padding: 10px 10px;
          border-radius: var(--pc-radius-sm);
          font-size: 13.5px;
          font-weight: 600;
          color: var(--pc-text-secondary);
          cursor: pointer;
        }

        .pc-classification__side-item:hover {
          background: var(--pc-secondary);
        }

        .pc-classification__side-item.active {
          background: #FAECE9;
          color: var(--pc-primary-dark);
        }

        .pc-classification__side-icon {
          font-size: 16px;
          width: 20px;
          height: 20px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .pc-classification__side-icon img {
          width: 20px;
          height: 20px;
          object-fit: contain;
        }

        .pc-classification__banner {
          background: linear-gradient(120deg, var(--pc-primary-dark), var(--pc-primary));
          border-radius: var(--pc-radius);
          padding: 22px 26px;
          color: #fff;
          margin-bottom: 22px;
        }

        .pc-classification__banner-eyebrow {
          font-size: 11.5px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          opacity: 0.85;
        }

        .pc-classification__banner-name {
          font-size: 21px;
          font-weight: 800;
          margin-top: 6px;
        }

        .pc-classification__state {
          color: var(--pc-text-muted);
          font-size: 14px;
          padding: 24px 0;
          text-align: center;
        }

        .pc-classification__grid {
          display: grid;
          grid-template-columns: repeat(4, minmax(0, 1fr));
          gap: 18px;
        }

        .pc-classification__prod-card {
          background: var(--pc-surface);
          border: 1px solid var(--pc-border);
          border-radius: var(--pc-radius);
          overflow: hidden;
          cursor: pointer;
          transition: box-shadow 0.15s ease, transform 0.1s ease, border-color 0.15s ease;
        }

        .pc-classification__prod-card:hover {
          box-shadow: 0 14px 26px var(--pc-shadow);
          transform: translateY(-3px);
          border-color: var(--pc-primary);
        }

        .pc-classification__prod-thumb {
          aspect-ratio: 1;
          background: var(--pc-secondary);
        }

        .pc-classification__prod-thumb img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }

        .pc-classification__prod-info {
          padding: 12px 14px 16px;
        }

        .pc-classification__prod-name {
          font-size: 13.5px;
          font-weight: 600;
          color: var(--pc-text);
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          min-height: 36px;
          margin-bottom: 8px;
        }

        .pc-classification__prod-price-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .pc-classification__prod-price {
          font-size: 15.5px;
          font-weight: 800;
          color: var(--pc-primary-dark);
        }

        .pc-classification__add-btn {
          width: 28px;
          height: 28px;
          border-radius: 50%;
          border: none;
          background: var(--pc-primary);
          color: #fff;
          font-size: 16px;
          font-weight: 700;
          cursor: pointer;
          line-height: 1;
          transition: background 0.15s ease;
        }

        .pc-classification__add-btn:hover {
          background: var(--pc-primary-hover);
        }

        .pc-classification__sentinel {
          padding: 20px 0;
        }

        @media (max-width: 1100px) {
          .pc-classification__grid {
            grid-template-columns: repeat(3, minmax(0, 1fr));
          }
        }

        @media (max-width: 860px) {
          .pc-classification__layout {
            grid-template-columns: 1fr;
          }
          .pc-classification__sidebar {
            position: static;
          }
        }
      `}</style>
    </>
  );
}

export default Classification;
