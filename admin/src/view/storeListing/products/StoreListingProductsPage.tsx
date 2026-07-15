import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouteMatch, Link } from 'react-router-dom';
import { i18n } from 'src/i18n';
import actions from 'src/modules/storeListing/products/storeListingProductsActions';
import selectors from 'src/modules/storeListing/products/storeListingProductsSelectors';
import StoreListingProductsTable from 'src/view/storeListing/products/StoreListingProductsTable';
import ContentWrapper from 'src/view/layout/styles/ContentWrapper';
import PageTitle from 'src/view/shared/styles/PageTitle';

function StoreListingProductsPage(props) {
  const dispatch = useDispatch();
  const match = useRouteMatch<{ storeId: string }>();
  const storeId = match.params.storeId;

  const rows = useSelector(selectors.selectRows);
  const storeName = rows.find((row: any) => row.store?.id === storeId)?.store
    ?.storeName;

  useEffect(() => {
    dispatch(actions.doFetch(storeId));

    return () => {
      dispatch(actions.doReset());
    };
  }, [dispatch, storeId]);

  return (
    <>
      <ContentWrapper>
        <div className="store-listing-products-header">
          <Link className="store-listing-back-link" to="/product-management">
            <i className="fas fa-arrow-left" />
          </Link>
          <PageTitle>
            {storeName || i18n('entities.storeListing.products.title')}
          </PageTitle>
        </div>

        <StoreListingProductsTable storeId={storeId} />
      </ContentWrapper>

      <style>{`
        .store-listing-products-header {
          display: flex;
          align-items: center;
          gap: 14px;
        }
        .store-listing-back-link {
          width: 34px;
          height: 34px;
          border-radius: 50%;
          background: #eef2fa;
          color: #334155;
          display: flex;
          align-items: center;
          justify-content: center;
          text-decoration: none;
          font-size: 13px;
          flex-shrink: 0;
        }
        .store-listing-back-link:hover {
          background: #e2e8f0;
        }
      `}</style>
    </>
  );
}

export default StoreListingProductsPage;
