import React from 'react';
import { i18n } from 'src/i18n';
import TransactionListPage from 'src/view/transaction/list/TransactionListPage';

function WithdrawListPage(props) {
  return (
    <TransactionListPage
      fixedType="withdraw"
      title={i18n('entities.transaction.withdraw.title')}
    />
  );
}

export default WithdrawListPage;
