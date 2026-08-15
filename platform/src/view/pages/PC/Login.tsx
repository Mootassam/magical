import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FormProvider, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import actions from "src/modules/auth/authActions";
import selectors from "src/modules/auth/authSelectors";
import yupFormSchemas from "src/modules/shared/yup/yupFormSchemas";
import { i18n } from "../../../i18n";
import InputFormItem from "src/shared/form/InputFormItem";
import ButtonIcon from "src/shared/ButtonIcon";
import "src/view/pages/PC/pcTheme.css";

const schema = yup.object().shape({
  email: yupFormSchemas.string(i18n("user.fields.username"), {
    required: true,
  }),
  password: yupFormSchemas.string(i18n("user.fields.password"), {
    required: true,
  }),
  rememberMe: yupFormSchemas.boolean(i18n("user.fields.rememberMe")),
});

function Login() {
  const dispatch = useDispatch();
  const loading = useSelector(selectors.selectLoading);
  const externalErrorMessage = useSelector(selectors.selectErrorMessage);

  const [showPassword, setShowPassword] = useState(false);

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

  const togglePassword = () => {
    setShowPassword((prev) => !prev);
  };

  const onSubmit = ({ email, password, rememberMe }) => {
    dispatch(actions.doSigninWithEmailAndPassword(email, password, rememberMe));
  };

  return (
    <>
      <div className="pc-auth">
        <div
          className="pc-auth__panel pc-auth__panel--brand"
          style={{ ["--pc-auth-brand-image" as any]: "url(https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=900&h=1200&fit=crop&auto=format&q=80)" }}
        >
          <div className="pc-auth__brand-content">
            <Link to="/pc" className="pc-auth__logo">Estore</Link>
            <h1>{i18n("estore.pc.login.brandTitle")}</h1>
            <p>{i18n("estore.pc.login.brandSubtitle")}</p>
          </div>
        </div>

        <div className="pc-auth__panel pc-auth__panel--form">
          <div className="pc-auth__form-wrap">
            <h2 className="pc-auth__title">{i18n("estore.pc.login.title")}</h2>
            <p className="pc-auth__subtitle">{i18n("estore.pc.login.subtitle")}</p>

            <FormProvider {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)}>
                <label className="pc-auth__label" htmlFor="email">{i18n("estore.auth.login.phoneOrEmail")}</label>
                <InputFormItem
                  type="text"
                  name="email"
                  placeholder={i18n("estore.auth.login.phoneOrEmailPlaceholder")}
                  className="pc-input"
                  externalErrorMessage={externalErrorMessage}
                />

                <label className="pc-auth__label" htmlFor="password">{i18n("estore.pc.login.password")}</label>
                <div className="pc-auth__field-wrap">
                  <InputFormItem
                    type={showPassword ? "text" : "password"}
                    name="password"
                    placeholder={i18n("estore.auth.login.passwordPlaceholder")}
                    className="pc-input"
                  />
                  <button type="button" className="pc-auth__toggle-eye" onClick={togglePassword}>👁</button>
                </div>

                <div className="pc-auth__links-row">
                  <a href="#">{i18n("estore.pc.login.forgotPassword")}</a>
                  <span>
                    {i18n("estore.auth.login.noAccount")} <Link to="/pc/auth/signup">{i18n("estore.auth.login.signUp")}</Link>
                  </span>
                </div>

                <button className="pc-btn pc-btn-primary pc-auth__submit" disabled={loading} type="submit">
                  <ButtonIcon loading={loading} />
                  <span>{i18n("estore.auth.login.loginButton")}</span>
                </button>
              </form>
            </FormProvider>
          </div>
        </div>
      </div>

      <style>{authStyles}</style>
    </>
  );
}

export const authStyles = `
  .pc-auth {
    width: 100%;
    min-height: 100vh;
    display: grid;
    grid-template-columns: 1fr 1fr;
  }

  .pc-auth__panel {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 48px;
  }

  .pc-auth__panel--brand {
    position: relative;
    overflow: hidden;
    background: linear-gradient(150deg, var(--pc-primary), var(--pc-primary-dark));
    color: #fff;
  }

  .pc-auth__panel--brand::before {
    content: "";
    position: absolute;
    inset: 0;
    background-image: var(--pc-auth-brand-image, url(https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=900&h=1200&fit=crop&auto=format&q=80));
    background-size: cover;
    background-position: center;
    opacity: 0.5;
    mix-blend-mode: luminosity;
  }

  .pc-auth__panel--brand::after {
    content: "";
    position: absolute;
    inset: 0;
    background: linear-gradient(160deg, rgba(127,43,21,0.94) 0%, rgba(209,69,31,0.8) 55%, rgba(209,69,31,0.55) 100%);
  }

  .pc-auth__brand-content {
    position: relative;
    z-index: 1;
    max-width: 420px;
  }

  .pc-auth__logo {
    display: inline-block;
    font-size: 22px;
    font-weight: 800;
    color: #fff;
    text-decoration: none;
    margin-bottom: 48px;
  }

  .pc-auth__panel--brand h1 {
    font-size: 34px;
    font-weight: 800;
    line-height: 1.25;
    margin: 0 0 16px;
  }

  .pc-auth__panel--brand p {
    font-size: 15px;
    line-height: 1.6;
    opacity: 0.9;
    margin: 0;
  }

  .pc-auth__panel--form {
    background: var(--pc-bg);
  }

  .pc-auth__form-wrap {
    width: 100%;
    max-width: 380px;
  }

  .pc-auth__title {
    font-size: 24px;
    font-weight: 800;
    color: var(--pc-text);
    margin: 0 0 6px;
  }

  .pc-auth__subtitle {
    font-size: 14px;
    color: var(--pc-text-secondary);
    margin: 0 0 32px;
  }

  .pc-auth__label {
    display: block;
    font-size: 13px;
    font-weight: 700;
    color: var(--pc-text);
    margin-bottom: 6px;
  }

  .pc-auth__form-wrap .form-group {
    margin-bottom: 18px;
  }

  .pc-auth__field-wrap {
    position: relative;
  }

  .pc-auth__toggle-eye {
    position: absolute;
    right: 14px;
    top: 12px;
    border: none;
    background: none;
    cursor: pointer;
    font-size: 15px;
    opacity: 0.6;
  }

  .pc-auth__links-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 13px;
    margin-bottom: 24px;
  }

  .pc-auth__links-row a {
    color: var(--pc-primary);
    text-decoration: none;
  }

  .pc-auth__links-row a:hover {
    text-decoration: underline;
  }

  .pc-auth__links-row span {
    color: var(--pc-text-secondary);
  }

  .pc-auth__links-row span a {
    font-weight: 700;
  }

  .pc-auth__submit {
    width: 100%;
    padding: 15px;
  }

  .pc-auth__form-wrap .invalid-feedback {
    color: var(--pc-danger);
    font-size: 12px;
    margin-top: 4px;
  }

  .pc-auth__form-wrap input.__danger {
    border-color: var(--pc-danger) !important;
    background: #FCE9E9 !important;
  }

  @media (max-width: 900px) {
    .pc-auth {
      grid-template-columns: 1fr;
    }
    .pc-auth__panel--brand {
      display: none;
    }
  }
`;

export default Login;
