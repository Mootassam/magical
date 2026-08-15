import React, { useEffect, useState } from "react";
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
import storeActions from "src/modules/store/storeActions";
import storeSelectors from "src/modules/store/storeSelectors";
import Message from "src/view/shared/message";
import MineShell from "./MineShell";

const schema = yup.object().shape({
  oldPassword: yupFormSchemas.string(i18n("user.fields.oldPassword"), {
    required: true,
  }),
  newPassword: yupFormSchemas.string(i18n("user.fields.newPassword"), {
    required: true,
    min: 6,
  }),
  newPasswordConfirmation: yupFormSchemas
    .string(i18n("user.fields.newPasswordConfirmation"), {
      required: true,
    })
    .oneOf(
      [yup.ref("newPassword"), null],
      i18n("auth.passwordChange.mustMatch"),
    ),
});

function maskPhoneNumber(phoneNumber) {
  if (!phoneNumber) {
    return i18n("estore.pc.myAccount.notBound");
  }

  if (phoneNumber.length <= 4) {
    return phoneNumber;
  }

  return `${phoneNumber.slice(0, 2)}****${phoneNumber.slice(-2)}`;
}

function MyAccount() {
  const dispatch = useDispatch();
  const currentUser = useSelector(authSelectors.selectCurrentUser);
  const saveLoading = useSelector(authSelectors.selectLoadingPasswordChange);
  const store = useSelector(storeSelectors.selectStore);
  const [showPasswordForm, setShowPasswordForm] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (currentUser?.store) {
      dispatch(storeActions.doInit());
    }
  }, [dispatch, currentUser?.store]);

  const displayIdLabel = store?.storeId ? i18n("estore.pc.myAccount.storeId") : i18n("estore.pc.myAccount.id");
  const displayId = store?.storeId || currentUser?.id;

  const form = useForm({
    resolver: yupResolver(schema),
    mode: "onSubmit",
    defaultValues: { oldPassword: "", newPassword: "", newPasswordConfirmation: "" },
  });

  const onSubmit = ({ oldPassword, newPassword }) => {
    dispatch(authActions.doChangePassword(oldPassword, newPassword));
    form.reset();
    setShowPasswordForm(false);
  };

  const doCopyId = () => {
    if (!displayId) return;
    navigator.clipboard?.writeText(displayId);
    setCopied(true);
    Message.success(i18n("estore.pc.myAccount.idCopied", displayIdLabel));
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <MineShell active="account">
      <h1 className="pc-mine__page-title">{i18n("estore.pc.myAccount.title")}</h1>

      <div className="pc-card pc-mine__panel">
        <div className="pc-mine__row">
          <span className="pc-mine__row-label">{displayIdLabel}</span>
          <span className="pc-mine__row-value">
            {displayId}
            <button type="button" className="pc-mine__copy-btn" onClick={doCopyId}>
              {copied ? i18n("estore.pc.myAccount.copied") : i18n("estore.pc.myAccount.copy")}
            </button>
          </span>
        </div>

        <div className="pc-mine__row">
          <span className="pc-mine__row-label">{i18n("estore.pc.myAccount.username")}</span>
          <span className="pc-mine__row-value">{currentUser?.fullName || currentUser?.email}</span>
        </div>

        <div className="pc-mine__row">
          <span className="pc-mine__row-label">{i18n("estore.pc.myAccount.phoneNumber")}</span>
          <span className="pc-mine__row-value">{maskPhoneNumber(currentUser?.phoneNumber)}</span>
        </div>

        <div className="pc-mine__row">
          <span className="pc-mine__row-label">{i18n("estore.pc.myAccount.email")}</span>
          <span className="pc-mine__row-value">{currentUser?.email || i18n("estore.pc.myAccount.notBound")}</span>
        </div>

        <div className="pc-mine__row">
          <span className="pc-mine__row-label">{i18n("estore.pc.myAccount.loginPassword")}</span>
          <span className="pc-mine__row-value">
            ••••••
            <button
              type="button"
              className="pc-mine__link-btn"
              onClick={() => setShowPasswordForm((value) => !value)}
            >
              {i18n("estore.pc.myAccount.change")}
            </button>
          </span>
        </div>
      </div>

      {showPasswordForm && (
        <div className="pc-card pc-mine__panel pc-mine__password-panel">
          <h2>{i18n("estore.pc.myAccount.changeLoginPassword")}</h2>
          <FormProvider {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <label className="pc-mine__field-label">{i18n("estore.pc.myAccount.currentPassword")}</label>
              <InputFormItem
                type="password"
                name="oldPassword"
                autoComplete="current-password"
                placeholder={i18n("estore.pc.myAccount.currentPasswordPlaceholder")}
                className="pc-input"
              />

              <label className="pc-mine__field-label">{i18n("estore.pc.myAccount.newPassword")}</label>
              <InputFormItem
                type="password"
                name="newPassword"
                autoComplete="new-password"
                placeholder={i18n("estore.pc.myAccount.newPasswordPlaceholder")}
                className="pc-input"
              />

              <label className="pc-mine__field-label">{i18n("estore.pc.myAccount.confirmNewPassword")}</label>
              <InputFormItem
                type="password"
                name="newPasswordConfirmation"
                autoComplete="new-password"
                placeholder={i18n("estore.pc.myAccount.confirmNewPasswordPlaceholder")}
                className="pc-input"
              />

              <div className="pc-mine__form-actions">
                <button
                  type="button"
                  className="pc-btn pc-btn-ghost"
                  onClick={() => setShowPasswordForm(false)}
                >
                  {i18n("estore.pc.myAccount.cancel")}
                </button>
                <button className="pc-btn pc-btn-primary" disabled={saveLoading} type="submit">
                  <ButtonIcon loading={saveLoading} />
                  <span>{i18n("estore.pc.myAccount.saveChanges")}</span>
                </button>
              </div>
            </form>
          </FormProvider>
        </div>
      )}

      <p className="pc-mine__hint">
        {i18n("estore.pc.myAccount.securityHint")}
      </p>

      <style>{sharedMineStyles}</style>
    </MineShell>
  );
}

export const sharedMineStyles = `
  .pc-mine__page-title {
    font-size: 22px;
    font-weight: 800;
    color: var(--pc-text);
    margin: 0 0 20px;
  }

  .pc-mine__panel {
    padding: 8px 24px;
    margin-bottom: 20px;
  }

  .pc-mine__row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 16px 0;
    border-bottom: 1px solid var(--pc-divider);
    gap: 20px;
  }

  .pc-mine__row:last-child {
    border-bottom: none;
  }

  .pc-mine__row-label {
    font-size: 13px;
    color: var(--pc-text-muted);
    flex-shrink: 0;
  }

  .pc-mine__row-value {
    display: flex;
    align-items: center;
    gap: 10px;
    font-size: 14px;
    font-weight: 700;
    color: var(--pc-text);
    text-align: right;
  }

  .pc-mine__copy-btn,
  .pc-mine__link-btn {
    border: none;
    background: none;
    color: var(--pc-primary);
    font-size: 12.5px;
    font-weight: 700;
    cursor: pointer;
    padding: 0;
  }

  .pc-mine__copy-btn:hover,
  .pc-mine__link-btn:hover {
    text-decoration: underline;
  }

  .pc-mine__password-panel {
    padding: 24px;
    max-width: 420px;
  }

  .pc-mine__password-panel h2 {
    font-size: 15px;
    font-weight: 800;
    color: var(--pc-text);
    margin: 0 0 18px;
  }

  .pc-mine__field-label {
    display: block;
    font-size: 12.5px;
    font-weight: 700;
    color: var(--pc-text);
    margin-bottom: 6px;
  }

  .pc-mine__password-panel .form-group {
    margin-bottom: 16px;
  }

  .pc-mine__form-actions {
    display: flex;
    gap: 10px;
    margin-top: 6px;
  }

  .pc-mine__form-actions .pc-btn {
    flex: 1;
    padding: 12px;
  }

  .pc-mine__hint {
    font-size: 12.5px;
    color: var(--pc-text-muted);
    text-align: center;
    line-height: 1.6;
  }

  .pc-mine__empty {
    padding: 70px 24px;
    text-align: center;
  }

  .pc-mine__empty-icon {
    font-size: 40px;
    margin-bottom: 14px;
  }

  .pc-mine__empty-title {
    font-size: 15px;
    font-weight: 700;
    color: var(--pc-text);
    margin-bottom: 6px;
  }

  .pc-mine__empty-text {
    font-size: 13px;
    color: var(--pc-text-muted);
    margin-bottom: 20px;
  }
`;

export default MyAccount;
