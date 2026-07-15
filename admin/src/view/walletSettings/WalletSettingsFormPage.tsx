import React, { useEffect } from 'react';
import { i18n } from 'src/i18n';
import { getHistory } from 'src/modules/store';
import ContentWrapper from 'src/view/layout/styles/ContentWrapper';
import WalletSettingsForm from 'src/view/walletSettings/WalletSettingsForm';
import WalletSettingsFormToolbar from 'src/view/walletSettings/WalletSettingsFormToolbar';
import PageTitle from 'src/view/shared/styles/PageTitle';
import Spinner from '../shared/Spinner';
import actions from 'src/modules/walletSettings/walletSettingsActions';
import selectors from 'src/modules/walletSettings/walletSettingsSelectors';
import { useSelector, useDispatch } from 'react-redux';

const WalletSettingsFormPage = (props) => {
  const dispatch = useDispatch();

  const initLoading = useSelector(
    selectors.selectInitLoading,
  );

  const walletSettings = useSelector(
    selectors.selectWalletSettings,
  );

  useEffect(() => {
    dispatch(actions.doInit());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <ContentWrapper>
        <PageTitle>{i18n('walletSettings.title')}</PageTitle>

        <WalletSettingsFormToolbar />

        {initLoading && <Spinner />}

        {!initLoading && walletSettings && (
          <WalletSettingsForm
            walletSettings={walletSettings}
            onCancel={() => getHistory().push('/')}
          />
        )}
      </ContentWrapper>
    </>
  );
};

export default WalletSettingsFormPage;
