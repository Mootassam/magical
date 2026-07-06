import React from "react";

function ApplyMerchant() {
  return (
    <>
      <div className="phone">

        <div className="page-header">
          <button className="back-btn" onClick={() => window.history.back()}>←</button>
          <span className="page-title">Apply for a store</span>
        </div>

        <div className="scroll-area">

          <div className="intro-title">Apply for a store</div>
          <div className="intro-sub">Use the same seller application flow as before, now with plan selection included.</div>

          <div className="section-label">Store Logo</div>
          <div className="logo-upload">
            <div className="logo-circle">🖼️</div>
          </div>

          <div className="field-block">
            <div className="field-label"><span className="required">*</span>Store Name</div>
            <input type="text" className="text-input" placeholder="Please enter the store name" />
          </div>

          <div className="field-block">
            <div className="field-label"><span className="required">*</span>Contact</div>
            <input type="text" className="text-input" placeholder="Please enter a contact person" />
          </div>

          <div className="field-block">
            <div className="field-label"><span className="required">*</span>ID number</div>
            <input type="text" className="text-input" placeholder="Please enter your ID number" />
          </div>

          <div className="field-block">
            <div className="field-label"><span className="required">*</span>Invite Code</div>
            <input type="text" className="text-input" placeholder="Please enter the invitation code" />
            <div className="field-hint">Required. Get this from an existing seller or your account manager.</div>
          </div>

          <div className="section-label" style={{ marginBottom: '0' }}>ID card</div>

          <div className="field-block" style={{ marginTop: '12px' }}>
            <div className="upload-box">
              <span className="img-icon">🖼️</span>
              <span className="up-label">ID card front photo</span>
            </div>
            <div className="upload-box">
              <span className="img-icon">🖼️</span>
              <span className="up-label">ID card back photo</span>
            </div>
          </div>

          <div className="field-block">
            <div className="field-label"><span className="required">*</span>Main Business</div>
            <div className="select-box filled">
              <span>Fashion &amp; Clothing</span>
              <span className="chev">⌄</span>
            </div>

            <div className="options-panel">
              <div className="option-item"><span className="check">&nbsp;</span>Select main business</div>
              <div className="option-item selected"><span className="check">✓</span>Fashion &amp; Clothing</div>
              <div className="option-item"><span className="check">&nbsp;</span>Electronics</div>
              <div className="option-item"><span className="check">&nbsp;</span>Beauty &amp; Cosmetics</div>
              <div className="option-item"><span className="check">&nbsp;</span>Home &amp; Living</div>
              <div className="option-item"><span className="check">&nbsp;</span>Sports &amp; Outdoors</div>
              <div className="option-item"><span className="check">&nbsp;</span>Toys &amp; Hobbies</div>
              <div className="option-item"><span className="check">&nbsp;</span>Food &amp; Beverages</div>
              <div className="option-item"><span className="check">&nbsp;</span>Other</div>
            </div>
          </div>

          <div className="field-block">
            <div className="field-label"><span className="required">*</span>Detailed address</div>
            <textarea className="textarea-input" placeholder="Please enter the detailed address"></textarea>
          </div>

          <button className="submit-btn">Submit Application</button>

        </div>

      </div>

      <style>{`
        :root{
          --navy:#0e1b45;
          --blue-bright:#2f8dff;
          --blue-mid:#1656c9;
          --blue-deep:#0b3fae;
          --white:#ffffff;
          --page-bg:#f4f7fd;
          --card-bg:#ffffff;
          --grey-text:#6b7590;
          --grey-light:#eef2fa;
          --field-border:#dde4f2;
          --red:#ff3b30;
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

        /* ---------- Header ---------- */
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

        /* ---------- Scroll body ---------- */
        .scroll-area{
          flex:1;
          overflow-y:auto;
          scrollbar-width:none;
          padding:20px 18px 40px;
        }
        .scroll-area::-webkit-scrollbar{ display:none; }

        .intro-title{ font-size:21px; font-weight:800; color:var(--navy); }
        .intro-sub{
          font-size:12.5px;
          color:var(--grey-text);
          margin-top:8px;
          line-height:1.6;
        }

        .section-label{
          font-size:13px;
          font-weight:700;
          color:var(--navy);
          margin:24px 0 12px;
        }
        .required{ color:var(--red); margin-right:3px; }

        /* ---------- Logo upload ---------- */
        .logo-upload{
          display:flex;
          justify-content:center;
        }
        .logo-circle{
          width:96px; height:96px;
          border-radius:50%;
          background:#fff;
          border:1.6px dashed #c7d1ea;
          display:flex;
          align-items:center;
          justify-content:center;
          color:#b6c1e0;
          font-size:30px;
          cursor:pointer;
        }

        /* ---------- Inputs ---------- */
        .field-block{ margin-top:20px; }
        .field-label{
          display:flex;
          align-items:center;
          font-size:13px;
          font-weight:700;
          color:var(--navy);
          margin-bottom:8px;
        }
        .text-input, .textarea-input{
          width:100%;
          border:1.5px solid var(--field-border);
          border-radius:12px;
          padding:13px 14px;
          font-size:13.5px;
          color:var(--navy);
          outline:none;
          background:#fff;
        }
        .text-input::placeholder, .textarea-input::placeholder{ color:#a9b3cf; }
        .text-input:focus, .textarea-input:focus{
          border-color:var(--blue-bright);
          box-shadow:0 0 0 3px rgba(47,141,255,0.12);
        }
        .textarea-input{ min-height:90px; resize:none; font-family:inherit; }

        .field-hint{
          font-size:11px;
          color:var(--grey-text);
          margin-top:6px;
          line-height:1.5;
        }

        /* ---------- Upload boxes ---------- */
        .upload-box{
          border:1.6px dashed #c7d1ea;
          border-radius:14px;
          padding:26px 10px;
          display:flex;
          flex-direction:column;
          align-items:center;
          justify-content:center;
          gap:10px;
          color:#a9b3cf;
          background:#fbfcff;
          cursor:pointer;
        }
        .upload-box .img-icon{ font-size:26px; color:var(--blue-bright); }
        .upload-box .up-label{ font-size:12.5px; font-weight:600; color:var(--grey-text); }
        .upload-box + .upload-box{ margin-top:14px; }

        /* ---------- Select ---------- */
        .select-box{
          display:flex;
          align-items:center;
          justify-content:space-between;
          background:#fff;
          border:1.5px solid var(--field-border);
          border-radius:12px;
          padding:13px 14px;
          font-size:13.5px;
          color:#a9b3cf;
          font-weight:500;
          cursor:pointer;
        }
        .select-box.filled{ color:var(--navy); font-weight:600; }
        .select-box .chev{ color:var(--grey-text); font-size:12px; }

        .options-panel{
          margin-top:8px;
          background:#3a3f52;
          border-radius:14px;
          overflow:hidden;
          box-shadow:0 14px 30px rgba(20,40,100,0.25);
        }
        .option-item{
          display:flex;
          align-items:center;
          gap:10px;
          padding:13px 16px;
          font-size:13.5px;
          color:#e6e9f5;
          border-top:1px solid rgba(255,255,255,0.08);
        }
        .option-item:first-child{ border-top:none; }
        .option-item.selected{ color:#fff; font-weight:700; }
        .option-item .check{ width:14px; color:#fff; }

        .submit-btn{
          width:100%;
          margin-top:30px;
          border:none;
          border-radius:14px;
          padding:15px;
          background:linear-gradient(135deg, var(--blue-bright), var(--blue-deep));
          color:#fff;
          font-size:15px;
          font-weight:800;
          letter-spacing:0.3px;
          cursor:pointer;
          box-shadow:0 10px 22px rgba(47,141,255,0.4);
        }
      `}</style>
    </>
  );
}

export default ApplyMerchant;
