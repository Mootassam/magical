import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { i18n } from 'src/i18n';
import actions from 'src/modules/orderShipment/list/orderShipmentListActions';
import OrderShipmentListTable from 'src/view/orderShipment/list/OrderShipmentListTable';
import ContentWrapper from 'src/view/layout/styles/ContentWrapper';
import PageTitle from 'src/view/shared/styles/PageTitle';

function OrderShipmentListPage(props) {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(actions.doFetch());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  return (
    <>
      <ContentWrapper>
        <PageTitle>{i18n('entities.orderShipment.list.title')}</PageTitle>
        <OrderShipmentListTable />
      </ContentWrapper>
    </>
  );
}

export default OrderShipmentListPage;
