import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import actions from "src/modules/auth/authActions";
import { FormProvider, useForm } from "react-hook-form";
import * as yup from "yup";
import yupFormSchemas from "src/modules/shared/yup/yupFormSchemas";
import { i18n } from "../../../i18n";
import { yupResolver } from "@hookform/resolvers/yup";
import InputFormItem from "src/shared/form/InputFormItem";
import selectors from "src/modules/auth/authSelectors";
import ButtonIcon from "src/shared/ButtonIcon";
import CsPage from "./CsPage"; // Import the new component

const schema = yup.object().shape({
  email: yupFormSchemas.string(i18n("user.fields.username"), {
    required: true,
  }),
  password: yupFormSchemas.string(i18n("user.fields.password"), {
    required: true,
  }),
  rememberMe: yupFormSchemas.boolean(i18n("user.fields.rememberMe")),
});

function Signin() {
  const dispatch = useDispatch();
  const loading = useSelector(selectors.selectLoading);
  
  const [initialValues] = useState({
    email: "",
    password: "",
    rememberMe: true,
  });

  useEffect(() => {
    dispatch(actions.doClearErrorMessage());
  }, [dispatch]);

  const form = useForm({
    resolver: yupResolver(schema),
    mode: "onSubmit",
    defaultValues: initialValues,
  });

  const externalErrorMessage = useSelector(selectors.selectErrorMessage);

  const onSubmit = ({ email, password, rememberMe }) => {
    dispatch(actions.doSigninWithEmailAndPassword(email, password, rememberMe));
  };

  return (
    <div className="auth__page">
      <div className="auth__header">
        {/* <img src="/images/logo.png" alt="" style={{width:200}}  /> */}
      </div>
      <div className="auth__header header__signup ">
        <img src="/images/home/logo.webp" alt="" className="auth__logo"/>
        <h1 className="auth__title">{i18n('pages.auth.signin.welcomeBack')}</h1>
        <span className="auth__description __v2">
          {i18n('pages.auth.signin.signinToAccount')}
        </span>
      </div>

      <FormProvider {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="auth__form">
            <div className="form__authgroup">
              <InputFormItem
                type="text"
                name="email"
                placeholder={i18n("user.fields.username")}
                className="auth__input"
                
                externalErrorMessage={externalErrorMessage}
              />
            </div>
            <div className="form__authgroup">
              <InputFormItem
                type="text"
                name="password"
                placeholder={i18n("user.fields.password")}
                className="auth__input"
              />
            </div>
          </div>

          <div className="auth__bottom">
            <button className="auth__button" disabled={loading} type="submit">
              <ButtonIcon loading={loading} />
              <span>{i18n('pages.auth.signin.signinButton')}</span>
            </button>
            <Link to="/auth/signup" className="remove__ligne">
              <span className="auth__link">
                {i18n('pages.auth.signin.noAccount')}{" "}
                <span className="signup__link">
                  {i18n('pages.auth.signin.signupHere')}
                </span>
              </span>
            </Link>
          </div>
        </form>
      </FormProvider>

      {/* Include the CsPage component */}
      <CsPage />

      <style>{`
        .auth__page {
          position: relative;
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          align-items: center;
          background: #ffffff;
          color: #111111;
          padding: 48px 24px 64px;
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
        }

        .auth__header.header__signup {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          width: 100%;
          max-width: 360px;
          margin-bottom: 32px;
        }

        .auth__logo {
          width: 96px;
          height: auto;
          margin-bottom: 20px;
        }

        .auth__title {
          font-size: 26px;
          font-weight: 800;
          letter-spacing: -0.4px;
          margin: 0 0 8px;
          color: #111111;
        }

        .auth__description.__v2 {
          font-size: 14px;
          line-height: 1.5;
          color: #555555;
        }

        .auth__page form {
          width: 100%;
          max-width: 360px;
        }

        .auth__form {
          display: flex;
          flex-direction: column;
          gap: 16px;
          margin-bottom: 24px;
        }

        .form__authgroup,
        .auth__page .form-group {
          width: 100%;
        }

        .auth__input {
          width: 100%;
          padding: 15px 18px;
          border-radius: 8px;
          border: 1.5px solid #E7E7E7;
          background: #FAFAFA;
          font-size: 15px;
          color: #111111;
          outline: none;
          transition: border-color 0.15s ease, background 0.15s ease;
        }

        .auth__input::placeholder {
          color: #888888;
        }

        .auth__input:focus {
          border-color: #D1451F;
          background: #ffffff;
        }

        .auth__input.__danger {
          border-color: #DC2626;
          background: #FCE9E9;
        }

        .auth__page .invalid-feedback {
          color: #DC2626;
          font-size: 12px;
          margin-top: 6px;
        }

        .auth__bottom {
          width: 100%;
          max-width: 360px;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 20px;
        }

        .auth__button {
          width: 100%;
          padding: 16px;
          border: none;
          border-radius: 30px;
          background: #D1451F;
          color: #ffffff;
          font-size: 14px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.4px;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          transition: background 0.2s ease, transform 0.1s ease;
        }

        .auth__button:hover:not(:disabled) {
          background: #B93C1A;
        }

        .auth__button:active:not(:disabled) {
          transform: scale(0.98);
        }

        .auth__button:disabled {
          background: #c7c7c7;
          cursor: not-allowed;
        }

        .auth__button .spinner {
          width: 18px;
          height: 18px;
          border: 2px solid rgba(255, 255, 255, 0.4);
          border-top-color: #ffffff;
          border-radius: 50%;
          animation: auth-spin 0.7s linear infinite;
        }

        @keyframes auth-spin {
          to {
            transform: rotate(360deg);
          }
        }

        .remove__ligne {
          text-decoration: none;
        }

        .auth__link {
          font-size: 14px;
          color: #555555;
        }

        .signup__link {
          color: #D1451F;
          font-weight: 700;
          text-decoration: underline;
        }
      `}</style>
    </div>
  );
}

export default Signin;