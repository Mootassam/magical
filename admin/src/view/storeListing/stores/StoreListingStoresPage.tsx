import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { i18n } from 'src/i18n';
import actions from 'src/modules/storeListing/stores/storeListingStoresActions';
import selectors from 'src/modules/storeListing/stores/storeListingStoresSelectors';
import StoreListingStoresTable from 'src/view/storeListing/stores/StoreListingStoresTable';
import ContentWrapper from 'src/view/layout/styles/ContentWrapper';
import PageTitle from 'src/view/shared/styles/PageTitle';

const SEARCH_DEBOUNCE_MS = 300;

function StoreListingStoresPage(props) {
  const dispatch = useDispatch();
  const search = useSelector(selectors.selectSearch);
  const [searchInput, setSearchInput] = useState(search);
  const debounceRef = useRef<any>(null);

  useEffect(() => {
    dispatch(actions.doFetch(''));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  const onSearchChange = (value: string) => {
    setSearchInput(value);

    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }

    debounceRef.current = setTimeout(() => {
      dispatch(actions.doSearch(value));
    }, SEARCH_DEBOUNCE_MS);
  };

  return (
    <>
      <ContentWrapper>
        <PageTitle>
          {i18n('entities.storeListing.list.title')}
        </PageTitle>

        <div className="store-listing-search-row">
          <i className="fas fa-search store-listing-search-icon" />
          <input
            type="text"
            className="store-listing-search-input"
            placeholder={i18n('entities.storeListing.searchByStore')}
            value={searchInput}
            onChange={(event) => onSearchChange(event.target.value)}
          />
        </div>

        <StoreListingStoresTable />
      </ContentWrapper>

      <style>{`
        .store-listing-search-row {
          display: flex;
          align-items: center;
          gap: 10px;
          background: #fff;
          border: 1.5px solid #e2e8f0;
          border-radius: 10px;
          padding: 10px 14px;
          margin-bottom: 16px;
          max-width: 360px;
        }
        .store-listing-search-icon {
          color: #94a3b8;
          font-size: 13px;
        }
        .store-listing-search-input {
          flex: 1;
          border: none;
          outline: none;
          font-size: 13.5px;
          color: #334155;
        }
        .store-listing-search-input::placeholder {
          color: #a0aec0;
        }
      `}</style>
    </>
  );
}

export default StoreListingStoresPage;
