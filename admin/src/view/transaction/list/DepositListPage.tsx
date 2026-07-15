import React from 'react';
import { i18n } from 'src/i18n';
import TransactionListPage from 'src/view/transaction/list/TransactionListPage';

function DepositListPage(props) {
  return (
    <TransactionListPage
      fixedType="deposit"
      title={i18n('entities.transaction.deposit.title')}
    />
  );
}

export default DepositListPage;
