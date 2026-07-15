import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { i18n } from 'src/i18n';
import actions from 'src/modules/productCategory/list/productCategoryListActions';
import selectors from 'src/modules/productCategory/list/productCategoryListSelectors';
import productCategorySelectors from 'src/modules/productCategory/productCategorySelectors';
import destroyActions from 'src/modules/productCategory/destroy/productCategoryDestroyActions';
import destroySelectors from 'src/modules/productCategory/destroy/productCategoryDestroySelectors';
import ProductCategoryListTable from 'src/view/productCategory/list/ProductCategoryListTable';
import ContentWrapper from 'src/view/layout/styles/ContentWrapper';
import PageTitle from 'src/view/shared/styles/PageTitle';
import ButtonIcon from 'src/view/shared/ButtonIcon';
import Toolbar from 'src/view/shared/styles/Toolbar';
import ConfirmModal from 'src/view/shared/modals/ConfirmModal';

function ProductCategoryListPage(props) {
  const [
    destroyAllRecordsConfirmVisible,
    setDestroyAllRecordsConfirmVisible,
  ] = useState(false);

  const dispatch = useDispatch();

  const loading = useSelector(selectors.selectLoading);
  const hasRows = useSelector(selectors.selectHasRows);
  const destroyLoading = useSelector(destroySelectors.selectLoading);
  const hasPermissionToDestroy = useSelector(
    productCategorySelectors.selectPermissionToDestroy,
  );

  useEffect(() => {
    dispatch(actions.doFetch());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  const doDestroyAllRecords = () => {
    setDestroyAllRecordsConfirmVisible(false);

    dispatch(destroyActions.doDestroyAllRecords());
  };

  return (
    <>
      <ContentWrapper>
        <PageTitle>{i18n('entities.productCategory.list.title')}</PageTitle>

        {hasPermissionToDestroy && (
          <Toolbar>
            <button
              disabled={!hasRows || loading}
              className="btn btn-danger"
              type="button"
              onClick={() => setDestroyAllRecordsConfirmVisible(true)}
            >
              <ButtonIcon
                loading={destroyLoading}
                iconClass="far fa-trash-alt"
              />
              &nbsp;{i18n('common.deleteAll')}
            </button>
          </Toolbar>
        )}

        <ProductCategoryListTable />

        {destroyAllRecordsConfirmVisible && (
          <ConfirmModal
            title={i18n('entities.productCategory.destroyAllRecords.confirm')}
            onConfirm={() => doDestroyAllRecords()}
            onClose={() => setDestroyAllRecordsConfirmVisible(false)}
            okText={i18n('common.yes')}
            cancelText={i18n('common.no')}
          />
        )}
      </ContentWrapper>
    </>
  );
}

export default ProductCategoryListPage;
