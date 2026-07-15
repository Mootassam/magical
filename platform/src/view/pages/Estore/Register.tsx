import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FormProvider, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
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
  withdrawPassword: yupFormSchemas.string(
    i18n("user.fields.withdrawPassword"),
    { required: true }
  ),
  rememberMe: yupFormSchemas.boolean(i18n("user.fields.rememberMe")),
});

function Register() {
  const dispatch = useDispatch();
  const loading = useSelector(selectors.selectLoading);
  const externalErrorMessage = useSelector(selectors.selectErrorMessage);

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const dropdownRef = useRef(null);

  const [initialValues] = useState({
    email: "",
    password: "",
    phoneNumber: "",
    withdrawPassword: "",
    rememberMe: true,
  });

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await axios.get(
          "https://restcountries.com/v3.1/all?fields=name,flags,idd,cca2"
        );

        const countriesData = response.data
          .filter((c) => c.idd?.root)
          .map((country) => {
            let dialCode = country.idd.root;

            const rootOnlyCountries = ["US", "CA", "RU", "KZ", "AU"];
            if (rootOnlyCountries.includes(country.cca2)) {
              dialCode = country.idd.root;
            } else if (country.idd.suffixes && country.idd.suffixes.length > 0) {
              dialCode = country.idd.root + (country.idd.suffixes[0] || "");
            }

            return {
              value: dialCode,
              label: country.name.common,
              code: country.cca2,
              flag: country.flags.svg,
            };
          })
          .sort((a, b) => a.label.localeCompare(b.label));

        setCountries(countriesData);

        try {
          const ipResponse = await axios.get("https://ip2c.org/s");
          const countryCode = ipResponse.data.split(";")[1];
          const defaultCountry = countriesData.find(
            (c) => c.code === countryCode
          );
          setSelectedCountry(defaultCountry || countriesData[0]);
        } catch {
          setSelectedCountry(countriesData[0]);
        }
      } catch (error) {
        console.error("Error fetching countries:", error);
      }
    };

    fetchCountries();
    dispatch(actions.doClearErrorMessage());
  }, [dispatch]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current?.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const filteredCountries = countries.filter(
    (country) =>
      country.label.toLowerCase().includes(searchTerm.toLowerCase()) ||
      country.value.includes(searchTerm) ||
      country.code.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const form = useForm({
    resolver: yupResolver(schema),
    mode: "onSubmit",
    defaultValues: initialValues,
  });

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
    withdrawPassword,
  }) => {
    const fullPhoneNumber = `${selectedCountry?.value || "+1"}${phoneNumber}`;
    dispatch(
      actions.doRegisterEmailAndPassword(
        email,
        password,
        fullPhoneNumber,
        withdrawPassword
      )
    );
  };

  return (
    <>
      <div className="card">

        <div className="topbar">
          <button type="button" className="back-btn" onClick={() => window.history.back()} aria-label="Go back">←</button>
        </div>

        <div className="logo-wrap">
          <div className="logo-badge">
            <svg viewBox="0 0 200 220" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <linearGradient id="blueGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#1e5fd6" />
                  <stop offset="100%" stopColor="#3fb0ff" />
                </linearGradient>
              </defs>
              <path d="M60 40 h70 a10 10 0 0 1 10 10 v110 a10 10 0 0 1 -10 10 h-70 a10 10 0 0 1 -10 -10 v-110 a10 10 0 0 1 10 -10 z" fill="#0e1b45" />
              <path d="M78 40 v-8 a17 17 0 0 1 34 0 v8" fill="none" stroke="#0e1b45" strokeWidth="8" />
              <path d="M78 40 v-8 a17 17 0 0 1 34 0 v8" fill="none" stroke="#f7faff" strokeWidth="3" />
              <rect x="20" y="95" width="35" height="6" rx="3" fill="url(#blueGrad)" />
              <rect x="10" y="112" width="45" height="6" rx="3" fill="url(#blueGrad)" />
              <path d="M95 75 h55 l-12 18 h-33 v14 h30 l-10 16 h-20 v16 h35 l-12 18 h-53 a8 8 0 0 1 -8 -8 v-58 a8 8 0 0 1 8 -8 z" fill="url(#blueGrad)" />
              <circle cx="82" cy="182" r="7" fill="#0e1b45" />
              <circle cx="118" cy="182" r="7" fill="#0e1b45" />
            </svg>
          </div>
          <div className="brand-name">
            <span className="e">E</span>
            <span className="rest">store</span>
          </div>
        </div>

        <div className="form-title">Create your account</div>
        <div className="form-sub">Join Estore and start shopping smarter</div>

        <FormProvider {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <label className="field-label" htmlFor="email">Email</label>
            <InputFormItem
              type="email"
              name="email"
              placeholder="Enter your email"
              externalErrorMessage={externalErrorMessage}
            />

            <label className="field-label">Phone Number</label>
            <div className="phone-input-wrapper">
              <div
                className={`phone-input-container ${dropdownOpen ? "dropdown-open" : ""}`}
                ref={dropdownRef}
              >
                <div className="phone-input-inner">
                  <div
                    className="country-selector"
                    onClick={() => setDropdownOpen(!dropdownOpen)}
                  >
                    {selectedCountry && (
                      <div className="country-selected">
                        <img
                          src={selectedCountry.flag}
                          alt={selectedCountry.label}
                          className="country-flag"
                        />
                        <span className="country-code">{selectedCountry.value}</span>
                        <span className="dropdown-arrow">▾</span>
                      </div>
                    )}
                  </div>

                  <div className="phone-number-input">
                    <InputFormItem
                      type="tel"
                      name="phoneNumber"
                      placeholder="Phone number"
                    />
                  </div>
                </div>

                {dropdownOpen && (
                  <div className="country-dropdown">
                    <div className="dropdown-search">
                      <input
                        type="text"
                        placeholder="Search countries"
                        className="search-input"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        onClick={(e) => e.stopPropagation()}
                      />
                    </div>
                    <div className="dropdown-list">
                      {filteredCountries.map((country) => (
                        <div
                          key={country.code}
                          className={`country-option ${selectedCountry?.code === country.code ? "selected" : ""}`}
                          onClick={() => {
                            setSelectedCountry(country);
                            setDropdownOpen(false);
                            setSearchTerm("");
                          }}
                        >
                          <img
                            src={country.flag}
                            alt={country.label}
                            className="country-flag"
                          />
                          <span className="country-name">{country.label}</span>
                          <span className="country-dial-code">{country.value}</span>
                        </div>
                      ))}
                      {filteredCountries.length === 0 && (
                        <div className="no-results">No countries found</div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>

            <label className="field-label" htmlFor="withdrawPassword">Withdraw Password</label>
            <InputFormItem
              type="password"
              name="withdrawPassword"
              placeholder="Set a withdrawal password"
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

        <div className="terms-note">By registering, you agree to Estore's <a href="#">Terms of Service</a> and <a href="#">Privacy Policy</a>.</div>

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

        /* ---------- Phone input with country selector ---------- */
        .phone-input-wrapper {
          margin-bottom: 1rem;
        }

        .phone-input-container {
          position: relative;
          border: 1px solid var(--field-border);
          border-radius: 12px;
          background: var(--field-bg);
          transition: all 0.2s ease;
        }

        .phone-input-container:focus-within,
        .phone-input-container.dropdown-open {
          border-color: var(--blue-bright);
          box-shadow: 0 0 0 3px rgba(47,141,255,0.15);
        }

        .phone-input-inner {
          display: flex;
          align-items: stretch;
          min-height: 48px;
        }

        .country-selector {
          flex: 0 0 auto;
          border-right: 1px solid var(--field-border);
          border-radius: 12px 0 0 12px;
          cursor: pointer;
          transition: background-color 0.2s ease;
        }

        .country-selector:hover {
          background: #e9eefc;
        }

        .country-selected {
          display: flex;
          align-items: center;
          padding: 0 12px;
          height: 100%;
          min-width: 100px;
        }

        .country-flag {
          width: 20px;
          height: 15px;
          object-fit: cover;
          border-radius: 2px;
          margin-right: 8px;
        }

        .country-code {
          font-size: 0.85rem;
          font-weight: 500;
          color: var(--navy);
          margin-right: 8px;
        }

        .dropdown-arrow {
          color: var(--grey-text);
          font-size: 12px;
          transition: transform 0.2s ease;
        }

        .phone-input-container.dropdown-open .dropdown-arrow {
          transform: rotate(180deg);
        }

        .phone-number-input {
          flex: 1;
        }

        .phone-number-input input{
          border: none !important;
          border-radius: 0 12px 12px 0 !important;
          background: transparent !important;
          height: 100% !important;
          box-shadow: none !important;
        }

        .country-dropdown {
          position: absolute;
          top: 100%;
          left: 0;
          right: 0;
          background: white;
          border: 1px solid var(--field-border);
          border-radius: 12px;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
          z-index: 1000;
          margin-top: 4px;
          max-height: 260px;
          overflow: hidden;
          display: flex;
          flex-direction: column;
        }

        .dropdown-search {
          padding: 10px;
          border-bottom: 1px solid #eee;
        }

        .search-input {
          width: 100%;
          padding: 8px 12px;
          border: 1px solid var(--field-border);
          border-radius: 8px;
          font-size: 0.85rem;
        }

        .search-input:focus {
          outline: none;
          border-color: var(--blue-bright);
        }

        .dropdown-list {
          flex: 1;
          overflow-y: auto;
          max-height: 220px;
        }

        .country-option {
          display: flex;
          align-items: center;
          padding: 8px 12px;
          cursor: pointer;
          transition: background-color 0.2s ease;
          border-bottom: 1px solid #f5f5f5;
        }

        .country-option:last-child {
          border-bottom: none;
        }

        .country-option:hover {
          background: #f8f9fa;
        }

        .country-option.selected {
          background: #e3f2fd;
        }

        .country-option .country-flag {
          margin-right: 10px;
          flex-shrink: 0;
        }

        .country-option .country-name {
          flex: 1;
          font-size: 0.85rem;
          color: var(--navy);
        }

        .country-option .country-dial-code {
          font-size: 0.8rem;
          color: var(--grey-text);
          font-weight: 500;
          margin-left: 8px;
        }

        .no-results {
          padding: 12px;
          text-align: center;
          color: var(--grey-text);
          font-style: italic;
        }
      `}</style>
    </>
  );
}

export default Register;
