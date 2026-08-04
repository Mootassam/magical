import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import authSelectors from "src/modules/auth/authSelectors";
import storeActions from "src/modules/store/storeActions";
import storeSelectors from "src/modules/store/storeSelectors";
import FileUploader from "src/modules/shared/fileUpload/fileUploader";
import Storage from "src/security/storage";
import Message from "src/view/shared/message";
import Errors from "src/modules/shared/error/errors";

function SellerSetUp() {
  const dispatch = useDispatch();
  const logoInputRef = useRef<HTMLInputElement>(null);
  const bannerInputRef = useRef<HTMLInputElement>(null);

  const currentUser = useSelector(authSelectors.selectCurrentUser);
  const store = useSelector(storeSelectors.selectStore);
  const initLoading = useSelector(storeSelectors.selectInitLoading);
  const savingChanges = useSelector(storeSelectors.selectUpdateOwnLoading);

  const [storeName, setStoreName] = useState("");
  const [description, setDescription] = useState("");
  const [contact, setContact] = useState("");
  const [uploadingLogo, setUploadingLogo] = useState(false);
  const [uploadingBanner, setUploadingBanner] = useState(false);

  useEffect(() => {
    dispatch(storeActions.doInit());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  useEffect(() => {
    if (store) {
      setStoreName(store.storeName || "");
      setDescription(store.description || "");
      setContact(store.contact || "");
    }
  }, [store]);

  const logoUrl = store?.storePhoto?.[0]?.downloadUrl;
  const bannerUrl = store?.storeBanner?.[0]?.downloadUrl;

  const handleLogoClick = () => {
    logoInputRef.current?.click();
  };

  const handleBannerClick = () => {
    bannerInputRef.current?.click();
  };

  const handleLogoChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    try {
      const files = event.target.files;

      if (!files || !files.length) {
        return;
      }

      const file = files[0];
      setUploadingLogo(true);

      const uploaded = await FileUploader.upload(file, {
        storage: Storage.values.storePhoto,
        image: true,
      });

      await dispatch(storeActions.doUpdateOwn({ storePhoto: [uploaded] }) as any);
    } catch (error) {
      Errors.showMessage(error);
    } finally {
      setUploadingLogo(false);
      if (logoInputRef.current) {
        logoInputRef.current.value = "";
      }
    }
  };

  const handleBannerChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    try {
      const files = event.target.files;

      if (!files || !files.length) {
        return;
      }

      const file = files[0];
      setUploadingBanner(true);

      const uploaded = await FileUploader.upload(file, {
        storage: Storage.values.storeBanner,
        image: true,
      });

      await dispatch(storeActions.doUpdateOwn({ storeBanner: [uploaded] }) as any);
    } catch (error) {
      Errors.showMessage(error);
    } finally {
      setUploadingBanner(false);
      if (bannerInputRef.current) {
        bannerInputRef.current.value = "";
      }
    }
  };

  const handleSave = () => {
    if (!storeName.trim()) {
      Message.error("Store name is required.");
      return;
    }

    dispatch(
      storeActions.doUpdateOwn({
        storeName: storeName.trim(),
        description: description.trim(),
        contact: contact.trim(),
      }) as any,
    );
  };

  return (
    <>
      <div className="phone">

        <div className="page-header">
          <button className="back-btn" onClick={() => window.history.back()}>←</button>
          <span className="page-title">Account Management</span>
        </div>

        <div className="content-area">
          <h1 className="page-heading">Settings</h1>
          <div className="page-subtitle">Manage your store settings</div>

          {initLoading && !store && (
            <div className="loading-text">Loading store settings…</div>
          )}

          {!initLoading && !store && (
            <div className="loading-text">No store found for this account.</div>
          )}

          {store && (
            <div className="settings-card">
              <div className="card-title">Store Information</div>
              <div className="card-sub">
                Update your store details and business information.
              </div>

              <div className="logo-row">
                <div className="logo-circle">
                  {logoUrl ? (
                    <img src={logoUrl} alt={storeName} />
                  ) : (
                    <span>{storeName || "Store"}</span>
                  )}
                </div>
                <div className="logo-info">
                  <div className="logo-title">Store Logo</div>
                  <div className="logo-sub">Upload a logo for your store</div>
                  <input
                    ref={logoInputRef}
                    type="file"
                    accept="image/*"
                    style={{ display: "none" }}
                    onChange={handleLogoChange}
                  />
                  <button
                    className="outline-btn"
                    onClick={handleLogoClick}
                    disabled={uploadingLogo}
                  >
                    {uploadingLogo ? "Uploading…" : "Upload Logo"}
                  </button>
                </div>
              </div>

              <label className="field-label">Store Name *</label>
              <input
                className="field-input"
                value={storeName}
                onChange={(event) => setStoreName(event.target.value)}
                placeholder="Your store name"
              />

              <label className="field-label">Store Description</label>
              <textarea
                className="field-textarea"
                value={description}
                onChange={(event) => setDescription(event.target.value)}
                placeholder="Describe your store..."
                rows={3}
              />

              <div className="field-row">
                <div className="field-col">
                  <label className="field-label">Business Email *</label>
                  <input
                    className="field-input field-disabled"
                    value={currentUser?.email || ""}
                    disabled
                    readOnly
                  />
                </div>
                <div className="field-col">
                  <label className="field-label">Business Phone</label>
                  <input
                    className="field-input"
                    value={contact}
                    onChange={(event) => setContact(event.target.value)}
                    placeholder="Phone number"
                  />
                </div>
              </div>

              <label className="field-label">Store Banner</label>
              <div className="banner-box">
                {bannerUrl ? (
                  <img src={bannerUrl} alt="Store banner" className="banner-preview" />
                ) : (
                  <span className="banner-placeholder">No banner uploaded</span>
                )}
              </div>
              <input
                ref={bannerInputRef}
                type="file"
                accept="image/*"
                style={{ display: "none" }}
                onChange={handleBannerChange}
              />
              <button
                className="outline-btn full"
                onClick={handleBannerClick}
                disabled={uploadingBanner}
              >
                {uploadingBanner ? "Uploading…" : "Upload Banner"}
              </button>

              <button
                className="save-btn"
                onClick={handleSave}
                disabled={savingChanges}
              >
                {savingChanges ? "Saving…" : "Save Changes"}
              </button>
            </div>
          )}

        </div>

      </div>

      <style>{`
        :root{
          --navy:#111111;
          --blue-bright:#D1451F;
          --blue-deep:#7F2B15;
          --grey-text:#555555;
          --grey-light:#F4F4F4;
          --border:#F4F4F4;
        }

        *{box-sizing:border-box; margin:0; padding:0;}

        body{
          font-family:'Segoe UI', Roboto, Arial, sans-serif;
          background:#fff;
          margin:0;
        }

        .phone{
          width:390px;
          max-width:390px;
          height:100vh;
          background:#fff;
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

        .content-area{
          flex:1;
          overflow-y:auto;
          scrollbar-width:none;
          padding:20px 20px 30px;
        }
        .content-area::-webkit-scrollbar{ display:none; }
        .page-heading{
          font-size:24px;
          font-weight:800;
          color:var(--navy);
        }
        .page-subtitle{
          margin-top:4px;
          padding-bottom:16px;
          font-size:13.5px;
          color:var(--grey-text);
          border-bottom:1px solid var(--border);
        }

        .loading-text{
          text-align:center;
          color:var(--grey-text);
          font-size:13px;
          padding:40px 0;
        }

        .settings-card{
          margin-top:18px;
          border:1px solid var(--border);
          border-radius:14px;
          padding:20px;
        }
        .card-title{ font-size:16px; font-weight:800; color:var(--navy); }
        .card-sub{ font-size:12.5px; color:var(--grey-text); margin-top:6px; line-height:1.5; }

        .logo-row{
          display:flex;
          align-items:center;
          gap:16px;
          margin:20px 0 6px;
        }
        .logo-circle{
          width:76px; height:76px;
          border-radius:50%;
          background:#111111;
          color:#fff;
          display:flex;
          align-items:center;
          justify-content:center;
          font-size:11px;
          font-weight:800;
          text-align:center;
          line-height:1.3;
          padding:6px;
          flex-shrink:0;
          overflow:hidden;
        }
        .logo-circle img{ width:100%; height:100%; object-fit:cover; }
        .logo-info{ flex:1; min-width:0; }
        .logo-title{ font-size:14px; font-weight:800; color:var(--navy); }
        .logo-sub{ font-size:12px; color:var(--grey-text); margin-top:3px; margin-bottom:10px; }

        .outline-btn{
          border:1px solid var(--border);
          border-radius:10px;
          background:#fff;
          padding:10px 16px;
          font-size:13px;
          font-weight:700;
          color:var(--navy);
          cursor:pointer;
        }
        .outline-btn.full{ width:100%; margin-top:10px; padding:12px; }
        .outline-btn:disabled{ opacity:0.6; cursor:not-allowed; }

        .field-label{
          display:block;
          font-size:13px;
          font-weight:700;
          color:var(--navy);
          margin-top:18px;
          margin-bottom:8px;
        }
        .field-input{
          width:100%;
          border:1px solid var(--border);
          border-radius:10px;
          padding:12px 14px;
          font-size:14px;
          color:var(--navy);
          font-family:inherit;
        }
        .field-input:focus{ outline:none; border-color:var(--blue-bright); }
        .field-input.field-disabled{
          background:#FAFAFA;
          color:#888888;
          cursor:not-allowed;
        }
        .field-textarea{
          width:100%;
          border:1px solid var(--border);
          border-radius:10px;
          padding:12px 14px;
          font-size:14px;
          color:var(--navy);
          font-family:inherit;
          resize:vertical;
        }
        .field-textarea:focus{ outline:none; border-color:var(--blue-bright); }
        .field-textarea::placeholder{ color:#888888; }

        .field-row{
          display:flex;
          gap:12px;
        }
        .field-col{ flex:1; min-width:0; }

        .banner-box{
          border:1.5px dashed #E7E7E7;
          border-radius:12px;
          background:#FAFAFA;
          height:110px;
          display:flex;
          align-items:center;
          justify-content:center;
          overflow:hidden;
        }
        .banner-placeholder{ font-size:13px; color:#888888; }
        .banner-preview{ width:100%; height:100%; object-fit:cover; }

        .save-btn{
          width:100%;
          margin-top:22px;
          border:none;
          border-radius:10px;
          padding:13px;
          background:var(--blue-bright);
          color:#fff;
          font-size:14px;
          font-weight:700;
          cursor:pointer;
        }
        .save-btn:disabled{ opacity:0.6; cursor:not-allowed; }
      `}</style>
    </>
  );
}

export default SellerSetUp;
