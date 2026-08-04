import React, { useState } from "react";

function LoginViolet() {
  const [showPassword, setShowPassword] = useState(false);

  const togglePassword = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <>
      <div className="card">
        <div className="topbar">
          <h1>Login</h1>
          <div className="lang">🌐 English ▾</div>
        </div>

        <div className="logo-wrap">
          <div className="logo-badge">
            <svg viewBox="0 0 200 220" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <linearGradient id="violetGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#2563EB" />
                  <stop offset="100%" stopColor="#2563EB" />
                </linearGradient>
              </defs>
              <path d="M60 40 h70 a10 10 0 0 1 10 10 v110 a10 10 0 0 1 -10 10 h-70 a10 10 0 0 1 -10 -10 v-110 a10 10 0 0 1 10 -10 z" fill="#7F2B15" />
              <path d="M78 40 v-8 a17 17 0 0 1 34 0 v8" fill="none" stroke="#7F2B15" strokeWidth="8" />
              <path d="M78 40 v-8 a17 17 0 0 1 34 0 v8" fill="none" stroke="#FAFAFA" strokeWidth="3" />
              <rect x="20" y="95" width="35" height="6" rx="3" fill="url(#violetGrad)" />
              <rect x="10" y="112" width="45" height="6" rx="3" fill="url(#violetGrad)" />
              <path d="M95 75 h55 l-12 18 h-33 v14 h30 l-10 16 h-20 v16 h35 l-12 18 h-53 a8 8 0 0 1 -8 -8 v-58 a8 8 0 0 1 8 -8 z" fill="url(#violetGrad)" />
              <circle cx="82" cy="182" r="7" fill="#7F2B15" />
              <circle cx="118" cy="182" r="7" fill="#7F2B15" />
            </svg>
          </div>
          <div className="brand-name">
            <span className="e">E</span>
            <span className="rest">store</span>
          </div>
          <div className="tagline">Shop More, Live Better</div>
        </div>

        <label className="field-label" htmlFor="identifier">Phone Number / Email</label>
        <div className="field-wrap">
          <input type="text" id="identifier" placeholder="Phone Number / Email" />
        </div>

        <label className="field-label" htmlFor="password">Enter Password</label>
        <div className="field-wrap">
          <input type={showPassword ? "text" : "password"} id="password" placeholder="Login Password" />
          <button type="button" className="toggle-eye" onClick={togglePassword}>👁</button>
        </div>

        <div className="links-row">
          <a href="#">Merchant onboarding</a>
          <a href="#">Forgot Password</a>
        </div>
        <div className="no-account">No account? <a href="#">Sign up</a></div>

        <button className="login-btn">Login</button>

        <div className="divider">or continue with</div>
        <div className="footer-note">By logging in you agree to Estore's Terms & Privacy Policy</div>
      </div>

      <style>{`
        :root{
          --ink:#7F2B15;
          --violet-bright:#2563EB;
          --violet-mid:#2563EB;
          --white:#FFFFFF;
          --page-bg:#FAFAFA;
          --card-bg:#FFFFFF;
          --grey-text:#888888;
          --field-bg:#FAFAFA;
          --field-border:#E7E7E7;
        }

        *{box-sizing:border-box; margin:0; padding:0;}

        body{
          font-family:'Segoe UI', Roboto, Arial, sans-serif;
          background: radial-gradient(circle at 30% 15%, #FAFAFA 0%, var(--page-bg) 55%, #FAFAFA 100%);
          min-height:100vh;
          display:flex;
          align-items:center;
          justify-content:center;
          padding:24px;
        }

        .card{
          width:100%;
          max-width:380px;
          background:var(--card-bg);
          border:1px solid var(--field-border);
          border-radius:20px;
          padding:36px 28px 30px;
          box-shadow:0 20px 50px rgba(37,99,235,0.12), 0 0 0 1px rgba(37,99,235,0.03) inset;
        }

        .topbar{
          display:flex;
          justify-content:space-between;
          align-items:center;
          margin-bottom:26px;
        }

        .topbar h1{
          font-size:15px;
          font-weight:600;
          color:var(--ink);
          letter-spacing:0.5px;
        }

        .topbar .lang{
          display:flex;
          align-items:center;
          gap:6px;
          color:var(--grey-text);
          font-size:13px;
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
          box-shadow:0 8px 24px rgba(37,99,235,0.20), 0 0 0 1px rgba(37,99,235,0.14);
          overflow:hidden;
        }

        .logo-badge svg{ width:110px; height:110px; }

        .brand-name{
          margin-top:14px;
          font-size:26px;
          font-weight:800;
          letter-spacing:1px;
        }
        .brand-name .e{ color:var(--violet-bright); }
        .brand-name .rest{ color:var(--ink); }

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

        input[type="text"],
        input[type="password"],
        input[type="email"]{
          width:100%;
          padding:14px 16px;
          background:var(--field-bg);
          border:1px solid var(--field-border);
          border-radius:12px;
          color:var(--ink);
          font-size:14px;
          outline:none;
          transition:border-color 0.2s ease, box-shadow 0.2s ease;
        }

        input::placeholder{ color:#888888; }

        input:focus{
          border-color:var(--violet-bright);
          box-shadow:0 0 0 3px rgba(37,99,235,0.15);
        }

        .toggle-eye{
          position:absolute;
          right:14px;
          top:50%;
          transform:translateY(-50%);
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
          color:var(--violet-bright);
          text-decoration:none;
        }
        .links-row a:hover{ text-decoration:underline; }

        .no-account{
          margin-top:6px;
          font-size:13px;
          color:var(--grey-text);
        }
        .no-account a{
          color:var(--violet-bright);
          text-decoration:none;
        }

        .login-btn{
          width:100%;
          margin-top:26px;
          padding:15px;
          border:none;
          border-radius:14px;
          background:linear-gradient(135deg, var(--violet-bright), var(--violet-mid));
          color:var(--white);
          font-size:16px;
          font-weight:700;
          letter-spacing:0.5px;
          cursor:pointer;
          box-shadow:0 10px 25px rgba(37,99,235,0.35);
          transition:transform 0.15s ease, box-shadow 0.15s ease;
        }

        .login-btn:hover{
          transform:translateY(-2px);
          box-shadow:0 14px 30px rgba(37,99,235,0.45);
        }

        .login-btn:active{ transform:translateY(0); }

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

export default LoginViolet;
