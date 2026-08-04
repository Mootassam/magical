import React, { useEffect, useState } from "react";
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
import { authStyles } from "./Login";

const schema = yup.object().shape({
  email: yupFormSchemas.string(i18n("user.fields.username"), {
    required: true,
  }),
  password: yupFormSchemas.string(i18n("user.fields.password"), {
    required: true,
  }),
  newPasswordConfirmation: yupFormSchemas
    .string(i18n("user.fields.newPasswordConfirmation"), {
      required: true,
    })
    .oneOf([yup.ref("password")], i18n("auth.passwordChange.mustMatch")),
  phoneNumber: yupFormSchemas.string(i18n("user.fields.phoneNumber"), {
    required: true,
  }),
  rememberMe: yupFormSchemas.boolean(i18n("user.fields.rememberMe")),
});

function Register() {
  const dispatch = useDispatch();
  const loading = useSelector(selectors.selectLoading);
  const externalErrorMessage = useSelector(selectors.selectErrorMessage);

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [initialValues] = useState({
    email: "",
    otp: "",
    password: "",
    phoneNumber: "",
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

  // Formal placeholder only - wiring this up to actually send/verify an
  // email OTP is a follow-up task (matches the mobile Estore/Register.tsx).
  const handleGetOtp = () => {};

  const togglePassword = () => {
    setShowPassword((prev) => !prev);
  };

  const toggleConfirmPassword = () => {
    setShowConfirmPassword((prev) => !prev);
  };

  const onSubmit = ({ email, password, phoneNumber }) => {
    dispatch(actions.doRegisterEmailAndPassword(email, password, phoneNumber));
  };

  return (
    <>
      <div className="pc-auth">
        <div
          className="pc-auth__panel pc-auth__panel--brand"
          style={{ ["--pc-auth-brand-image" as any]: "url(https://images.unsplash.com/photo-1556740758-90de374c12ad?w=900&h=1200&fit=crop&auto=format&q=80)" }}
        >
          <div className="pc-auth__brand-content">
            <Link to="/pc" className="pc-auth__logo">Estore</Link>
            <h1>Join Estore Today</h1>
            <p>Create an account to track orders, save addresses, and check out faster.</p>
          </div>
        </div>

        <div className="pc-auth__panel pc-auth__panel--form">
          <div className="pc-auth__form-wrap pc-auth__form-wrap--wide">
            <h2 className="pc-auth__title">Create your account</h2>
            <p className="pc-auth__subtitle">Join Estore and start shopping smarter</p>

            <FormProvider {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)}>
                <div className="pc-auth__grid-2">
                  <div>
                    <label className="pc-auth__label" htmlFor="email">Email</label>
                    <div className="pc-auth__otp-row">
                      <InputFormItem
                        type="email"
                        name="email"
                        placeholder="Enter your email"
                        className="pc-input"
                        externalErrorMessage={externalErrorMessage}
                      />
                      <button type="button" className="pc-btn pc-btn-ghost pc-auth__otp-btn" onClick={handleGetOtp}>
                        Get OTP
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="pc-auth__label" htmlFor="otp">Verification Code</label>
                    <InputFormItem
                      type="text"
                      name="otp"
                      placeholder="Enter the OTP sent to your email"
                      className="pc-input"
                    />
                  </div>
                </div>

                <label className="pc-auth__label" htmlFor="phoneNumber">Phone Number</label>
                <InputFormItem
                  type="tel"
                  name="phoneNumber"
                  placeholder="Phone number"
                  className="pc-input"
                />

                <div className="pc-auth__grid-2">
                  <div>
                    <label className="pc-auth__label" htmlFor="password">Password</label>
                    <div className="pc-auth__field-wrap">
                      <InputFormItem
                        type={showPassword ? "text" : "password"}
                        name="password"
                        placeholder="Create a password"
                        className="pc-input"
                      />
                      <button type="button" className="pc-auth__toggle-eye" onClick={togglePassword}>👁</button>
                    </div>
                  </div>

                  <div>
                    <label className="pc-auth__label" htmlFor="newPasswordConfirmation">Confirm Password</label>
                    <div className="pc-auth__field-wrap">
                      <InputFormItem
                        type={showConfirmPassword ? "text" : "password"}
                        name="newPasswordConfirmation"
                        autoComplete="new-password"
                        placeholder="Re-enter your password"
                        className="pc-input"
                      />
                      <button type="button" className="pc-auth__toggle-eye" onClick={toggleConfirmPassword}>👁</button>
                    </div>
                  </div>
                </div>

                <button className="pc-btn pc-btn-primary pc-auth__submit" disabled={loading} type="submit">
                  <ButtonIcon loading={loading} />
                  <span>Register</span>
                </button>
              </form>
            </FormProvider>

            <div className="pc-auth__login-note">
              Already have an account? <Link to="/pc/auth/signin">Log in</Link>
            </div>
          </div>
        </div>
      </div>

      <style>{authStyles}</style>
      <style>{`
        .pc-auth__form-wrap--wide {
          max-width: 480px;
        }

        .pc-auth__grid-2 {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
        }

        .pc-auth__otp-row {
          display: flex;
          gap: 8px;
          align-items: flex-start;
        }

        .pc-auth__otp-row .form-group {
          flex: 1;
        }

        .pc-auth__otp-btn {
          margin-top: 0;
          padding: 12px 14px;
          white-space: nowrap;
        }

        .pc-auth__login-note {
          text-align: center;
          font-size: 13px;
          color: var(--pc-text-secondary);
          margin-top: 20px;
        }

        .pc-auth__login-note a {
          color: var(--pc-primary);
          font-weight: 700;
          text-decoration: none;
        }

        @media (max-width: 560px) {
          .pc-auth__grid-2 {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </>
  );
}

export default Register;
