import React, { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { i18n } from 'src/i18n';
import actions from 'src/modules/walletSettings/walletSettingsActions';
import selectors from 'src/modules/walletSettings/walletSettingsSelectors';
import ButtonIcon from 'src/view/shared/ButtonIcon';
import InputFormItem from 'src/view/shared/form/items/InputFormItem';
import InputNumberFormItem from 'src/view/shared/form/items/InputNumberFormItem';
import FormWrapper from 'src/view/shared/styles/FormWrapper';
import * as yup from 'yup';
import yupFormSchemas from 'src/modules/shared/yup/yupFormSchemas';
import { yupResolver } from '@hookform/resolvers/yup';

const schema = yup.object().shape({
  ethAddress: yupFormSchemas.string(
    i18n('walletSettings.fields.address'),
    {},
  ),
  ethFee: yupFormSchemas.decimal(
    i18n('walletSettings.fields.fee'),
    { min: 0 },
  ),
  btcAddress: yupFormSchemas.string(
    i18n('walletSettings.fields.address'),
    {},
  ),
  btcFee: yupFormSchemas.decimal(
    i18n('walletSettings.fields.fee'),
    { min: 0 },
  ),
  usdtTrc20Address: yupFormSchemas.string(
    i18n('walletSettings.fields.address'),
    {},
  ),
  usdtTrc20Fee: yupFormSchemas.decimal(
    i18n('walletSettings.fields.fee'),
    { min: 0 },
  ),
  usdtErc20Address: yupFormSchemas.string(
    i18n('walletSettings.fields.address'),
    {},
  ),
  usdtErc20Fee: yupFormSchemas.decimal(
    i18n('walletSettings.fields.fee'),
    { min: 0 },
  ),
});

const wallets = [
  {
    key: 'eth',
    label: i18n('walletSettings.wallets.eth'),
  },
  {
    key: 'btc',
    label: i18n('walletSettings.wallets.btc'),
  },
  {
    key: 'usdtTrc20',
    label: i18n('walletSettings.wallets.usdtTrc20'),
  },
  {
    key: 'usdtErc20',
    label: i18n('walletSettings.wallets.usdtErc20'),
  },
];

function WalletSettingsForm(props) {
  const dispatch = useDispatch();

  const saveLoading = useSelector(
    selectors.selectSaveLoading,
  );

  const walletSettings = props.walletSettings;

  const [initialValues] = useState(() => {
    const record = walletSettings || {};

    return {
      ethAddress: record.ethAddress || '',
      ethFee: record.ethFee || 0,
      btcAddress: record.btcAddress || '',
      btcFee: record.btcFee || 0,
      usdtTrc20Address: record.usdtTrc20Address || '',
      usdtTrc20Fee: record.usdtTrc20Fee || 0,
      usdtErc20Address: record.usdtErc20Address || '',
      usdtErc20Fee: record.usdtErc20Fee || 0,
    };
  });

  const form = useForm({
    resolver: yupResolver(schema),
    mode: 'all',
    defaultValues: initialValues,
  });

  const onSubmit = (values) => {
    dispatch(actions.doSave(values));
  };

  const onReset = () => {
    Object.keys(initialValues).forEach((key) => {
      form.setValue(key, initialValues[key]);
    });
  };

  return (
    <FormWrapper>
      <FormProvider {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="row">
            {wallets.map((wallet) => (
              <div
                className="col-lg-7 col-md-8 col-12"
                key={wallet.key}
              >
                <h5>{wallet.label}</h5>
                <InputFormItem
                  name={`${wallet.key}Address`}
                  label={i18n('walletSettings.fields.address')}
                  placeholder={i18n(
                    'walletSettings.fields.addressPlaceholder',
                  )}
                />
                <InputNumberFormItem
                  name={`${wallet.key}Fee`}
                  label={i18n('walletSettings.fields.fee')}
                />
              </div>
            ))}
          </div>

          <div className="form-buttons">
            <button
              className="btn btn-primary"
              disabled={saveLoading}
              type="button"
              onClick={form.handleSubmit(onSubmit)}
            >
              <ButtonIcon
                loading={saveLoading}
                iconClass="far fa-save"
              />
              {i18n('common.save')}
            </button>

            <button
              disabled={saveLoading}
              onClick={onReset}
              className="btn btn-light"
              type="button"
            >
              <i className="fas fa-undo"></i>
              {i18n('common.reset')}
            </button>

            {props.onCancel ? (
              <button
                disabled={saveLoading}
                onClick={() => props.onCancel()}
                className="btn btn-light"
                type="button"
              >
                <i className="fas fa-times"></i>
                {i18n('common.cancel')}
              </button>
            ) : null}
          </div>
        </form>
      </FormProvider>
    </FormWrapper>
  );
}

export default WalletSettingsForm;
