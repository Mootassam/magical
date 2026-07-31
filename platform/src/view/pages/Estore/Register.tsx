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
  // email OTP is a follow-up task.
  const handleGetOtp = () => {};

  const togglePassword = () => {
    setShowPassword((prev) => !prev);
  };

  const toggleConfirmPassword = () => {
    setShowConfirmPassword((prev) => !prev);
  };

  const onSubmit = ({
    email,
    password,
    phoneNumber,
  }) => {
    dispatch(
      actions.doRegisterEmailAndPassword(
        email,
        password,
        phoneNumber
      )
    );
  };

  return (
    <>
      <div className="card">

        <div className="topbar">
          <button type="button" className="back-btn" onClick={() => window.history.back()} aria-label="Go back">←</button>
        </div>

<img src="/images/home/logo.webp" alt="" style={{ width: '60%', display: 'block', margin: '0 auto 12px' }} />

        <div className="form-title">Create your account</div>
        <div className="form-sub">Join Estore and start shopping smarter</div>

        <FormProvider {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <label className="field-label" htmlFor="email">Email</label>
            <div className="otp-row">
              <InputFormItem
                type="email"
                name="email"
                placeholder="Enter your email"
                externalErrorMessage={externalErrorMessage}
              />
              <button type="button" className="otp-btn" onClick={handleGetOtp}>
                Get OTP
              </button>
            </div>

            <label className="field-label" htmlFor="otp">Verification Code</label>
            <InputFormItem
              type="text"
              name="otp"
              placeholder="Enter the OTP sent to your email"
            />

            <label className="field-label">Phone Number</label>
            <InputFormItem
              type="tel"
              name="phoneNumber"
              placeholder="Phone number"
            />

            <label className="field-label" htmlFor="password">Password</label>
            <div className="field-wrap">
              <InputFormItem
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Create a password"
              />
              <button type="button" className="toggle-eye" onClick={togglePassword}>👁</button>
            </div>

            <label className="field-label" htmlFor="newPasswordConfirmation">Confirm Password</label>
            <div className="field-wrap">
              <InputFormItem
                type={showConfirmPassword ? "text" : "password"}
                name="newPasswordConfirmation"
                autoComplete="new-password"
                placeholder="Re-enter your password"
              />
              <button type="button" className="toggle-eye" onClick={toggleConfirmPassword}>👁</button>
            </div>

            <button className="register-btn" disabled={loading} type="submit">
              <ButtonIcon loading={loading} />
              <span>Register</span>
            </button>
          </form>
        </FormProvider>


        <div className="login-note">Already have an account? <Link to="/auth/signin">Log in</Link></div>

      </div>


      <style>{`
        :root{
          --navy:#0e1b45;
          --blue-bright:#2f8dff;
          --blue-mid:#1656c9;
          --white:#ffffff;
          --page-bg:#f4f7fd;
          --card-bg:#ffffff;
          --grey-text:#6b7590;
          --field-bg:#f3f6fc;
          --field-border:#dde4f2;
        }

        *{box-sizing:border-box; margin:0; padding:0;}

        body{
          font-family:'Segoe UI', Roboto, Arial, sans-serif;
          background: radial-gradient(circle at 30% 15%, #eaf1ff 0%, var(--page-bg) 55%, #e6ecfa 100%);
          min-height:100vh;
          display:flex;
          align-items:center;
          justify-content:center;
          padding:24px;
        }

        @keyframes cardIn{
          from{ opacity:0; transform:translateY(16px); }
          to{ opacity:1; transform:translateY(0); }
        }

        .card{
          width:100%;
          max-width:380px;
          background:var(--card-bg);
          border:1px solid var(--field-border);
          border-radius:20px;
          padding:36px 28px 30px;
          box-shadow:0 20px 50px rgba(20,40,100,0.10), 0 0 0 1px rgba(47,141,255,0.03) inset;
          animation:cardIn 0.45s ease both;
        }

        .topbar{
          display:flex;
          align-items:center;
          margin-bottom:14px;
        }

        .back-btn{
          width:34px; height:34px;
          flex-shrink:0;
          border-radius:50%;
          background:var(--field-bg);
          border:1px solid var(--field-border);
          display:flex; align-items:center; justify-content:center;
          font-size:16px;
          color:var(--navy);
          cursor:pointer;
          transition:background-color 0.2s ease, transform 0.15s ease;
        }
        .back-btn:hover{ background:#e9eefc; }
        .back-btn:active{ transform:scale(0.92); }

        .logo-wrap{
          display:flex;
          flex-direction:column;
          align-items:center;
          margin-bottom:22px;
        }

        .logo-badge{
          width:100px;
          height:100px;
          border-radius:24px;
          background:#f7faff;
          display:flex;
          align-items:center;
          justify-content:center;
          box-shadow:0 8px 24px rgba(47,141,255,0.18), 0 0 0 1px rgba(47,141,255,0.12);
          overflow:hidden;
        }
        .logo-badge svg{ width:74px; height:74px; }

        .brand-name{
          margin-top:10px;
          font-size:20px;
          font-weight:800;
          letter-spacing:1px;
        }
        .brand-name .e{ color:var(--blue-bright); }
        .brand-name .rest{ color:var(--navy); }

        .form-title{
          font-size:19px;
          font-weight:800;
          color:var(--navy);
          text-align:center;
          margin-top:4px;
        }
        .form-sub{
          font-size:12px;
          color:var(--grey-text);
          text-align:center;
          margin-top:6px;
          margin-bottom:6px;
        }

        .field-label{
          font-size:12.5px;
          color:var(--grey-text);
          margin:16px 0 8px;
          display:block;
        }

        .field-wrap{ position:relative; }

        input[type="text"],
        input[type="email"],
        input[type="tel"],
        input[type="password"]{
          width:100%;
          padding:13px 16px;
          background:var(--field-bg);
          border:1px solid var(--field-border);
          border-radius:12px;
          color:var(--navy);
          font-size:13.5px;
          outline:none;
          transition:border-color 0.2s ease, box-shadow 0.2s ease;
        }
        input::placeholder{ color:#a3adc7; }
        input:focus{
          border-color:var(--blue-bright);
          box-shadow:0 0 0 3px rgba(47,141,255,0.15);
        }

        .invalid-feedback{
          display:block;
          font-size:11.5px;
          color:#ff3b30;
          margin-top:4px;
        }

        .otp-row{
          display:flex;
          gap:10px;
          align-items:flex-start;
        }
        .otp-row .form-group{
          flex:1;
          min-width:0;
        }

        .otp-btn{
          flex:0 0 auto;
          height:46px;
          padding:0 16px;
          border-radius:12px;
          border:1.5px solid var(--blue-bright);
          background:#fff;
          color:var(--blue-bright);
          font-size:12.5px;
          font-weight:700;
          white-space:nowrap;
          cursor:pointer;
          transition:background-color 0.2s ease, color 0.2s ease, transform 0.15s ease;
        }
        .otp-btn:hover{
          background:var(--blue-bright);
          color:#fff;
        }
        .otp-btn:active{ transform:scale(0.96); }

        .toggle-eye{
          position:absolute;
          right:14px;
          top:13px;
          cursor:pointer;
          color:var(--grey-text);
          font-size:15px;
          user-select:none;
          background:none;
          border:none;
        }

        .register-btn{
          width:100%;
          margin-top:26px;
          padding:14px;
          border:none;
          border-radius:14px;
          background:linear-gradient(135deg, var(--blue-bright), var(--blue-mid));
          color:#fff;
          font-size:15px;
          font-weight:700;
          letter-spacing:0.3px;
          cursor:pointer;
          box-shadow:0 10px 25px rgba(47,141,255,0.35);
          transition:transform 0.15s ease, box-shadow 0.15s ease;
          display:flex;
          align-items:center;
          justify-content:center;
          gap:8px;
        }
        .register-btn:hover{
          transform:translateY(-2px);
          box-shadow:0 14px 30px rgba(47,141,255,0.45);
        }
        .register-btn:active{ transform:translateY(0); }
        .register-btn:disabled{ opacity:0.7; cursor:not-allowed; transform:none; }

        .terms-note{
          font-size:10.5px;
          color:var(--grey-text);
          text-align:center;
          margin-top:14px;
          line-height:1.6;
        }
        .terms-note a{ color:var(--blue-mid); text-decoration:none; font-weight:600; }

        .login-note{
          text-align:center;
          font-size:12.5px;
          color:var(--grey-text);
          margin-top:16px;
        }
        .login-note a{ color:var(--blue-mid); font-weight:700; text-decoration:none; }

      `}</style>
    </>
  );
}

export default Register;
