import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FormProvider, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import yupFormSchemas from "src/modules/shared/yup/yupFormSchemas";
import { i18n } from "../../../../i18n";
import InputFormItem from "src/shared/form/InputFormItem";
import ButtonIcon from "src/shared/ButtonIcon";
import authActions from "src/modules/auth/authActions";
import authSelectors from "src/modules/auth/authSelectors";
import MineShell from "./MineShell";
import { sharedMineStyles } from "./MyAccount";

function buildSchema(hasWithdrawPassword) {
  return yup.object().shape({
    ...(hasWithdrawPassword
      ? {
          oldWithdrawPassword: yupFormSchemas.string(i18n("user.fields.oldWithdrawPassword"), { required: true }),
        }
      : {}),
    newWithdrawPassword: yupFormSchemas.string(i18n("user.fields.newWithdrawPassword"), { required: true, min: 6 }),
    newWithdrawPasswordConfirmation: yupFormSchemas
      .string(i18n("user.fields.newWithdrawPasswordConfirmation"), { required: true })
      .oneOf([yup.ref("newWithdrawPassword"), null], i18n("auth.passwordChange.mustMatch")),
  });
}

function PaymentPassword() {
  const dispatch = useDispatch();
  const saveLoading = useSelector(authSelectors.selectLoadingWithdrawPasswordChange);
  const currentUser = useSelector(authSelectors.selectCurrentUser);

  const hasWithdrawPassword = Boolean(currentUser?.withdrawPassword);

  const [initialValues] = useState(() => ({
    oldWithdrawPassword: "",
    newWithdrawPassword: "",
    newWithdrawPasswordConfirmation: "",
  }));

  const form = useForm({
    resolver: yupResolver(buildSchema(hasWithdrawPassword)),
    mode: "onSubmit",
    defaultValues: initialValues,
  });

  const onSubmit = ({ oldWithdrawPassword, newWithdrawPassword }) => {
    dispatch(authActions.doChangeWithdrawPassword(oldWithdrawPassword, newWithdrawPassword) as any);
  };

  return (
    <MineShell active="payment-password">
      <h1 className="pc-mine__page-title">{i18n("estore.pc.paymentPassword.title")}</h1>

      <div className="pc-card pc-mine__password-panel">
        <FormProvider {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            {hasWithdrawPassword && (
              <>
                <label className="pc-mine__field-label">{i18n("user.fields.oldWithdrawPassword")}</label>
                <InputFormItem
                  type="password"
                  name="oldWithdrawPassword"
                  autoComplete="current-password"
                  placeholder={i18n("estore.pc.paymentPassword.oldPlaceholder")}
                  className="pc-input"
                />
              </>
            )}

            <label className="pc-mine__field-label">{i18n("user.fields.newWithdrawPassword")}</label>
            <InputFormItem
              type="password"
              name="newWithdrawPassword"
              autoComplete="new-password"
              placeholder={i18n("estore.pc.paymentPassword.newPlaceholder")}
              className="pc-input"
            />

            <label className="pc-mine__field-label">{i18n("user.fields.newWithdrawPasswordConfirmation")}</label>
            <InputFormItem
              type="password"
              name="newWithdrawPasswordConfirmation"
              autoComplete="new-password"
              placeholder={i18n("estore.pc.paymentPassword.confirmPlaceholder")}
              className="pc-input"
            />

            <p className="pc-mine__hint pc-mine__hint--left">
              {i18n("estore.pc.paymentPassword.hint")}
            </p>

            <button className="pc-btn pc-btn-primary pc-mine__deposit-submit" disabled={saveLoading} type="submit">
              <ButtonIcon loading={saveLoading} />
              <span>{saveLoading ? i18n("estore.pc.common.saving") : i18n("estore.pc.common.confirm")}</span>
            </button>
          </form>
        </FormProvider>
      </div>

      <style>{sharedMineStyles}</style>
      <style>{`
        .pc-mine__password-panel {
          padding: 28px;
          max-width: 440px;
        }

        .pc-mine__password-panel .form-group {
          margin-bottom: 16px;
        }

        .pc-mine__hint--left {
          text-align: left;
          margin: 4px 0 20px;
        }

        .pc-mine__deposit-submit {
          width: 100%;
          padding: 14px;
        }
      `}</style>
    </MineShell>
  );
}

export default PaymentPassword;
