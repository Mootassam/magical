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
      i18n("auth.passwordChange.mustMatch")
    ),
});

function LoginPassword() {
  const dispatch = useDispatch();
  const saveLoading = useSelector(authSelectors.selectLoadingPasswordChange);

  const [initialValues] = useState(() => ({
    oldPassword: "",
    newPassword: "",
    newPasswordConfirmation: "",
  }));

  const form = useForm({
    resolver: yupResolver(schema),
    mode: "onSubmit",
    defaultValues: initialValues,
  });

  const onSubmit = ({ oldPassword, newPassword }) => {
    dispatch(authActions.doChangePassword(oldPassword, newPassword));
  };

  return (
    <>
      <div className="phone">

        <div className="page-header">
          <button className="back-btn" onClick={() => window.history.back()}>←</button>
          <span className="page-title">Login Password</span>
        </div>

        <div className="scroll-area">
          <div className="form-card">
            <FormProvider {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)}>

                <span className="field-label">{i18n("user.fields.oldPassword")}</span>
                <InputFormItem
                  type="password"
                  name="oldPassword"
                  autoComplete="current-password"
                  placeholder="Please enter your current password"
                  className="text-input"
                />

                <span className="field-label sp">{i18n("user.fields.newPassword")}</span>
                <InputFormItem
                  type="password"
                  name="newPassword"
                  autoComplete="new-password"
                  placeholder="Please enter your new password"
                  className="text-input"
                />

                <span className="field-label sp">{i18n("user.fields.newPasswordConfirmation")}</span>
                <InputFormItem
                  type="password"
                  name="newPasswordConfirmation"
                  autoComplete="new-password"
                  placeholder="Please confirm your new password"
                  className="text-input"
                />

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
          --navy:#111111;
          --blue-bright:#D1451F;
          --blue-mid:#B93C1A;
          --blue-deep:#7F2B15;
          --page-bg:#FAFAFA;
          --card-bg:#FFFFFF;
          --grey-text:#555555;
          --grey-light:#F4F4F4;
          --field-border:#E7E7E7;
          --red:#DC2626;
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
          box-shadow:0 8px 20px rgba(0,0,0,0.07);
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
        .text-input::placeholder{ color:#888888; }
        .text-input:focus{ border-color:var(--blue-bright); box-shadow:0 0 0 3px rgba(209,69,31,0.12); }
        .text-input.__danger{ border-color:var(--red); }

        .invalid-feedback{
          display:block;
          font-size:11.5px;
          color:var(--red);
          margin-top:6px;
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
          box-shadow:0 10px 22px rgba(209,69,31,0.4);
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

export default LoginPassword;
