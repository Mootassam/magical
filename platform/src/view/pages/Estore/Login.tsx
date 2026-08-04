import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FormProvider, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import actions from "src/modules/auth/authActions";
import layoutActions from "src/modules/layout/layoutActions";
import selectors from "src/modules/auth/authSelectors";
import yupFormSchemas from "src/modules/shared/yup/yupFormSchemas";
import { i18n, getLanguages, getLanguageCode } from "../../../i18n";
import InputFormItem from "src/shared/form/InputFormItem";
import ButtonIcon from "src/shared/ButtonIcon";

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
  const [langOpen, setLangOpen] = useState(false);
  const langRef = useRef(null);

  const languages = getLanguages();
  const currentLanguage = languages.find(
    (language) => language.id === getLanguageCode()
  );

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (langRef.current && !langRef.current?.contains(e.target)) {
        setLangOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const doChangeLanguage = (languageId) => {
    setLangOpen(false);
    layoutActions.doChangeLanguage(languageId);
  };

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
      <div className="auth-page">
      <div className="card">
        <div className="topbar">
          <button type="button" className="back-btn" onClick={() => window.history.back()} aria-label="Go back">←</button>
          <h1>Login</h1>
          <div className="lang-wrap" ref={langRef}>
            <div className="lang" onClick={() => setLangOpen(!langOpen)}>
              🌐 {currentLanguage?.label || "English"} ▾
            </div>

            {langOpen && (
              <div className="lang-dropdown">
                {languages.map((language) => (
                  <div
                    key={language.id}
                    className={`lang-option ${
                      language.id === getLanguageCode() ? "selected" : ""
                    }`}
                    onClick={() => doChangeLanguage(language.id)}
                  >
                    <img
                      src={language.flag}
                      alt={language.label}
                      className="lang-flag"
                    />
                    <span>{language.label}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="logo-wrap">

          {/* Estore logo (simplified inline SVG matching provided artwork) */}
          {/* <img src="/images/home/logo.webp" alt="" style={{ width: '60%' }} /> */}

{/* Here we will add the logo later  */}

          <div className="tagline">Shop More, Live Better</div>
        </div>

        <FormProvider {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <label className="field-label" htmlFor="email">Phone Number / Email</label>
            <div className="field-wrap">
              <InputFormItem
                type="text"
                name="email"
                placeholder="Phone Number / Email"
                externalErrorMessage={externalErrorMessage}
              />
            </div>

            <label className="field-label" htmlFor="password">Enter Password</label>
            <div className="field-wrap">
              <InputFormItem
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Login Password"
              />
              <button type="button" className="toggle-eye" onClick={togglePassword}>👁</button>
            </div>

            <div className="links-row">
              <a href="#">Forgot Password</a>
                  <div className="no-account">
              No account? <Link to="/auth/signup">Sign up</Link>
            </div>
            </div>
        

            <button className="login-btn" disabled={loading} type="submit">
              <ButtonIcon loading={loading} />
              <span>Login</span>
            </button>
          </form>
        </FormProvider>

           </div>
      </div>


      <style>{`
        :root{
          --navy-deep:#111111;
          --navy:#111111;
          --blue-bright:#D1451F;
          --blue-mid:#B93C1A;
          --white:#FFFFFF;
          --page-bg:#FAFAFA;
          --card-bg:#FFFFFF;
          --grey-text:#555555;
          --field-bg:#FAFAFA;
          --field-border:#E7E7E7;
        }

        *{box-sizing:border-box; margin:0; padding:0;}

        .auth-page{
          font-family:'Segoe UI', Roboto, Arial, sans-serif;
          background: radial-gradient(circle at 30% 15%, #E7E7E7 0%, var(--page-bg) 55%, #E7E7E7 100%);
          min-height:100vh;
          display:flex;
          align-items:flex-start;
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
          box-shadow:0 20px 50px rgba(0,0,0,0.10), 0 0 0 1px rgba(209,69,31,0.03) inset;
          animation:cardIn 0.45s ease both;
        }

        .topbar{
          display:flex;
          align-items:center;
          gap:10px;
          margin-bottom:26px;
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
        .back-btn:hover{ background:#E7E7E7; }
        .back-btn:active{ transform:scale(0.92); }

        .topbar h1{
          flex:1;
          text-align:center;
          font-size:15px;
          font-weight:600;
          color:var(--navy);
          letter-spacing:0.5px;
        }

        .lang-wrap{
          position:relative;
          flex-shrink:0;
        }

        .topbar .lang{
          display:flex;
          align-items:center;
          gap:6px;
          color:var(--grey-text);
          font-size:13px;
          cursor:pointer;
          padding:4px 6px;
          border-radius:8px;
          transition:background-color 0.2s ease;
          white-space:nowrap;
        }
        .topbar .lang:hover{ background:var(--field-bg); }

        .lang-dropdown{
          position:absolute;
          top:calc(100% + 6px);
          right:0;
          min-width:170px;
          max-height:260px;
          overflow-y:auto;
          background:#fff;
          border:1px solid var(--field-border);
          border-radius:12px;
          box-shadow:0 12px 30px rgba(0,0,0,0.15);
          z-index:1000;
          padding:6px;
        }

        .lang-option{
          display:flex;
          align-items:center;
          gap:10px;
          padding:9px 10px;
          border-radius:8px;
          cursor:pointer;
          font-size:13.5px;
          color:var(--navy);
          transition:background-color 0.15s ease;
        }
        .lang-option:hover{ background:var(--field-bg); }
        .lang-option.selected{
          background:rgba(209,69,31,0.12);
          font-weight:700;
        }

        .lang-flag{
          width:20px;
          height:14px;
          object-fit:cover;
          border-radius:2px;
          flex-shrink:0;
        }

        .logo-wrap{
          display:flex;
          flex-direction:column;
          align-items:center;
          margin-bottom:30px;
        }

        .logo-badge{
          width:150px;
          height:150px;
          border-radius:26px;
          background:#FAFAFA;
          display:flex;
          align-items:center;
          justify-content:center;
          box-shadow:0 8px 24px rgba(209,69,31,0.18), 0 0 0 1px rgba(209,69,31,0.12);
          overflow:hidden;
        }

        .logo-badge svg{ width:110px; height:110px; }

        .brand-name{
          margin-top:14px;
          font-size:26px;
          font-weight:800;
          letter-spacing:1px;
        }
        .brand-name .e{ color:var(--blue-bright); }
        .brand-name .rest{ color:var(--navy); }

        .tagline{
          margin-top:2px;
          font-size:11px;
          letter-spacing:3px;
          color:var(--grey-text);
          text-transform:uppercase;
        }

        .field-label{
          font-size:13px;
          color:var(--grey-text);
          margin:16px 0 8px;
          display:block;
        }

        .field-wrap{
          position:relative;
        }

        .field-wrap .form-group{ margin-bottom:0; }

        input[type="text"],
        input[type="password"],
        input[type="email"]{
          width:100%;
          padding:14px 16px;
          background:var(--field-bg);
          border:1px solid var(--field-border);
          border-radius:12px;
          color:var(--navy);
          font-size:14px;
          outline:none;
          transition:border-color 0.2s ease, box-shadow 0.2s ease;
        }

        input::placeholder{ color:#888888; }

        input:focus{
          border-color:var(--blue-bright);
          box-shadow:0 0 0 3px rgba(209,69,31,0.15);
        }

        .invalid-feedback{
          display:block;
          font-size:11.5px;
          color:#DC2626;
          margin-top:4px;
        }

        .toggle-eye{
          position:absolute;
          right:14px;
          top:14px;
          cursor:pointer;
          color:var(--grey-text);
          font-size:16px;
          user-select:none;
          background:none;
          border:none;
        }

        .links-row{
          display:flex;
          justify-content:space-between;
          align-items:center;
          margin-top:14px;
          font-size:13px;
        }

        .links-row a{
          color:var(--blue-bright);
          text-decoration:none;
        }
        .links-row a:hover{ text-decoration:underline; }

        .no-account{
          font-size:13px;
          color:var(--grey-text);
        }
        .no-account a{
          color:var(--blue-bright);
          text-decoration:none;
        }

        .login-btn{
          width:100%;
          margin-top:26px;
          padding:15px;
          border:none;
          border-radius:14px;
          background:linear-gradient(135deg, var(--blue-bright), var(--blue-mid));
          color:var(--white);
          font-size:16px;
          font-weight:700;
          letter-spacing:0.5px;
          cursor:pointer;
          box-shadow:0 10px 25px rgba(209,69,31,0.35);
          transition:transform 0.15s ease, box-shadow 0.15s ease;
          display:flex;
          align-items:center;
          justify-content:center;
          gap:8px;
        }

        .login-btn:hover{
          transform:translateY(-2px);
          box-shadow:0 14px 30px rgba(209,69,31,0.45);
        }

        .login-btn:active{ transform:translateY(0); }
        .login-btn:disabled{ opacity:0.7; cursor:not-allowed; transform:none; }

        .divider{
          display:flex;
          align-items:center;
          gap:10px;
          margin:22px 0 16px;
          color:var(--grey-text);
          font-size:12px;
        }
        .divider::before, .divider::after{
          content:"";
          flex:1;
          height:1px;
          background:var(--field-border);
        }

        .footer-note{
          text-align:center;
          font-size:12px;
          color:var(--grey-text);
          margin-top:4px;
        }
      `}</style>
    </>
  );
}

export default Login;
