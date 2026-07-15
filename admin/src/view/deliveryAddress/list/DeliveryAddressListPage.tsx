import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { i18n } from 'src/i18n';
import actions from 'src/modules/deliveryAddress/list/deliveryAddressListActions';
import DeliveryAddressListTable from 'src/view/deliveryAddress/list/DeliveryAddressListTable';
import ContentWrapper from 'src/view/layout/styles/ContentWrapper';
import PageTitle from 'src/view/shared/styles/PageTitle';

function DeliveryAddressListPage(props) {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(actions.doFetch());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  return (
    <>
      <ContentWrapper>
        <PageTitle>{i18n('entities.deliveryAddress.list.title')}</PageTitle>
        <DeliveryAddressListTable />
      </ContentWrapper>
    </>
  );
}

export default DeliveryAddressListPage;
