import React from "react";
import { Link } from "react-router-dom";

function FrozenStoreModal() {
  return (
    <>
      <div className="phone frozen-modal-phone">
        <div className="frozen-modal-overlay">
          <div className="frozen-modal-card">
            <div className="frozen-modal-icon">🚫</div>
            <div className="frozen-modal-title">Store Frozen</div>
            <div className="frozen-modal-text">
              Your seller account has been temporarily frozen because an order
              was left waiting for delivery for too long. You can't access
              the seller dashboard until this is resolved.
            </div>
            <a href="/customer-service" className="frozen-modal-btn primary">
              Contact Customer Service
            </a>
            <Link to="/mine" className="frozen-modal-btn secondary">
              Back
            </Link>
          </div>
        </div>
      </div>

      <style>{`
        :root{
          --navy:#0e1b45;
          --blue-bright:#2f8dff;
          --blue-deep:#0b3fae;
          --page-bg:#f4f7fd;
          --grey-text:#6b7590;
        }

        *{box-sizing:border-box; margin:0; padding:0;}

        body{
          font-family:'Segoe UI', Roboto, Arial, sans-serif;
          background:var(--page-bg);
          margin:0;
        }

        .frozen-modal-phone{
          width:390px;
          max-width:390px;
          height:100vh;
          background:var(--page-bg);
          overflow:hidden;
          position:relative;
          margin:0 auto;
        }

        .frozen-modal-overlay{
          position:absolute;
          inset:0;
          background:rgba(14,27,69,0.55);
          display:flex;
          align-items:center;
          justify-content:center;
          padding:24px;
        }

        .frozen-modal-card{
          width:100%;
          background:#fff;
          border-radius:20px;
          padding:28px 22px 22px;
          text-align:center;
          box-shadow:0 20px 50px rgba(20,40,100,0.25);
        }

        .frozen-modal-icon{ font-size:40px; margin-bottom:12px; }

        .frozen-modal-title{
          font-size:17px;
          font-weight:800;
          color:var(--navy);
          margin-bottom:10px;
        }

        .frozen-modal-text{
          font-size:12.5px;
          line-height:1.6;
          color:var(--grey-text);
          margin-bottom:22px;
        }

        .frozen-modal-btn{
          display:block;
          width:100%;
          padding:12px;
          border-radius:12px;
          font-size:13px;
          font-weight:700;
          text-decoration:none;
          margin-bottom:10px;
        }

        .frozen-modal-btn.primary{
          background:linear-gradient(135deg, var(--blue-deep), var(--blue-bright));
          color:#fff;
        }

        .frozen-modal-btn.secondary{
          background:#f1f5f9;
          color:var(--navy);
          margin-bottom:0;
        }
      `}</style>
    </>
  );
}

export default FrozenStoreModal;
