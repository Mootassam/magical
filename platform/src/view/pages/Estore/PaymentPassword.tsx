import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FormProvider, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import yupFormSchemas from "src/modules/shared/yup/yupFormSchemas";
import { i18n } from "../../../i18n";
import InputFormItem from "src/shared/form/InputFormItem";
import ButtonIcon from "src/shared/ButtonIcon";
import authActions from "src/modules/auth/authActions";
import authSelectors from "src/modules/auth/authSelectors";

function buildSchema(hasWithdrawPassword) {
  return yup.object().shape({
    ...(hasWithdrawPassword
      ? {
          oldWithdrawPassword: yupFormSchemas.string(
            i18n("user.fields.oldWithdrawPassword"),
            { required: true }
          ),
        }
      : {}),
    newWithdrawPassword: yupFormSchemas.string(
      i18n("user.fields.newWithdrawPassword"),
      { required: true, min: 6 }
    ),
    newWithdrawPasswordConfirmation: yupFormSchemas
      .string(i18n("user.fields.newWithdrawPasswordConfirmation"), {
        required: true,
      })
      .oneOf(
        [yup.ref("newWithdrawPassword"), null],
        i18n("auth.passwordChange.mustMatch")
      ),
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
    dispatch(
      authActions.doChangeWithdrawPassword(oldWithdrawPassword, newWithdrawPassword)
    );
  };

  return (
    <>
      <div className="phone">

        <div className="page-header">
          <button className="back-btn" onClick={() => window.history.back()}>←</button>
          <span className="page-title">Transaction Password</span>
        </div>

        <div className="scroll-area">
          <div className="form-card">
            <FormProvider {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)}>

                {hasWithdrawPassword && (
                  <>
                    <span className="field-label">{i18n("user.fields.oldWithdrawPassword")}</span>
                    <InputFormItem
                      type="password"
                      name="oldWithdrawPassword"
                      autoComplete="current-password"
                      placeholder="Please enter your current transaction password"
                      className="text-input"
                    />
                  </>
                )}

                <span className={`field-label${hasWithdrawPassword ? " sp" : ""}`}>{i18n("user.fields.newWithdrawPassword")}</span>
                <InputFormItem
                  type="password"
                  name="newWithdrawPassword"
                  autoComplete="new-password"
                  placeholder="Please enter your new transaction password"
                  className="text-input"
                />

                <span className="field-label sp">{i18n("user.fields.newWithdrawPasswordConfirmation")}</span>
                <InputFormItem
                  type="password"
                  name="newWithdrawPasswordConfirmation"
                  autoComplete="new-password"
                  placeholder="Please confirm your new transaction password"
                  className="text-input"
                />

                <div className="notice">
                  <p>Your transaction password is used to confirm withdrawals and other sensitive account changes. Keep it secure and never share it with anyone.</p>
                </div>

                <button className="submit-btn" disabled={saveLoading} type="submit">
                  <ButtonIcon loading={saveLoading} />
                  <span>{saveLoading ? "Saving..." : "Confirm"}</span>
                </button>

              </form>
            </FormProvider>
          </div>
        </div>

      </div>

      <style>{`
        :root{
          --navy:#0e1b45;
          --blue-bright:#2f8dff;
          --blue-mid:#1656c9;
          --blue-deep:#0b3fae;
          --page-bg:#f4f7fd;
          --card-bg:#ffffff;
          --grey-text:#6b7590;
          --grey-light:#eef2fa;
          --field-border:#dde4f2;
          --red:#ff5470;
        }

        *{box-sizing:border-box; margin:0; padding:0;}

        body{
          font-family:'Segoe UI', Roboto, Arial, sans-serif;
          background:var(--page-bg);
          margin:0;
        }

        .phone{
          width:390px;
          max-width:390px;
          height:100vh;
          background:var(--page-bg);
          overflow:hidden;
          position:relative;
          display:flex;
          flex-direction:column;
          margin:0 auto;
        }

        .page-header{
          background:linear-gradient(135deg, var(--blue-deep), var(--blue-bright));
          padding:14px 18px 16px;
          color:#fff;
          flex-shrink:0;
          display:flex;
          align-items:center;
          gap:12px;
        }
        .back-btn{
          width:34px; height:34px;
          border-radius:50%;
          background:rgba(255,255,255,0.18);
          display:flex; align-items:center; justify-content:center;
          font-size:16px;
          cursor:pointer;
          border:none;
          color:#fff;
        }
        .page-title{ font-size:17px; font-weight:800; }

        .scroll-area{
          flex:1;
          overflow-y:auto;
          scrollbar-width:none;
          padding:16px 16px 30px;
        }
        .scroll-area::-webkit-scrollbar{ display:none; }

        .form-card{
          background:var(--card-bg);
          border-radius:18px;
          box-shadow:0 8px 20px rgba(20,40,100,0.07);
          padding:18px 16px;
        }

        .field-label{
          font-size:12.5px;
          font-weight:700;
          color:var(--navy);
          margin-bottom:8px;
          display:block;
        }
        .field-label.sp{ margin-top:18px; }

        .text-input{
          width:100%;
          border:1.5px solid var(--field-border);
          border-radius:12px;
          padding:13px 14px;
          font-size:13.5px;
          color:var(--navy);
          outline:none;
        }
        .text-input::placeholder{ color:#a9b3cf; }
        .text-input:focus{ border-color:var(--blue-bright); box-shadow:0 0 0 3px rgba(47,141,255,0.12); }
        .text-input.__danger{ border-color:var(--red); }

        .invalid-feedback{
          display:block;
          font-size:11.5px;
          color:var(--red);
          margin-top:6px;
        }

        .notice{
          margin-top:16px;
          background:#f6f9ff;
          border-radius:12px;
          padding:12px 14px;
          font-size:11.5px;
          line-height:1.6;
          color:var(--grey-text);
        }

        .submit-btn{
          width:100%;
          margin-top:12px;
          border:none;
          border-radius:14px;
          padding:14px;
          background:linear-gradient(135deg, var(--blue-bright), var(--blue-deep));
          color:#fff;
          font-size:15px;
          font-weight:800;
          letter-spacing:0.3px;
          cursor:pointer;
          box-shadow:0 10px 22px rgba(47,141,255,0.4);
          display:flex;
          align-items:center;
          justify-content:center;
          gap:8px;
        }
        .submit-btn:disabled{ opacity:0.7; cursor:not-allowed; }

        .spinner{
          width:16px; height:16px;
          border:2px solid rgba(255,255,255,0.4);
          border-top-color:#fff;
          border-radius:50%;
          animation:spin 0.7s linear infinite;
        }
        @keyframes spin{ to{ transform:rotate(360deg); } }
      `}</style>
    </>
  );
}

export default PaymentPassword;
