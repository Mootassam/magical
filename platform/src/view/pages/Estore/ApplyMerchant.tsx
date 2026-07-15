import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { i18n } from "../../../i18n";
import storeActions from "src/modules/store/storeActions";
import storeSelectors from "src/modules/store/storeSelectors";
import FileUploader from "src/modules/shared/fileUpload/fileUploader";
import Storage from "src/security/storage";
import Message from "src/view/shared/message";
import Errors from "src/modules/shared/error/errors";

const MAIN_BUSINESS_OPTIONS = [
  "fashion_clothing",
  "electronics",
  "beauty_cosmetics",
  "home_living",
  "sports_outdoors",
  "toys_hobbies",
  "food_beverages",
  "other",
];

function UploadBox({ label, value, uploading, onChange, inputRef }) {
  return (
    <label className="upload-box">
      {value ? (
        <img src={value.downloadUrl} alt={value.name} className="upload-preview" />
      ) : (
        <>
          <span className="img-icon">{uploading ? "…" : "🖼️"}</span>
          <span className="up-label">{label}</span>
        </>
      )}
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        style={{ display: "none" }}
        disabled={uploading}
        onChange={onChange}
      />
    </label>
  );
}

function ApplyMerchant() {
  const dispatch = useDispatch();
  const store = useSelector(storeSelectors.selectStore);
  const initLoading = useSelector(storeSelectors.selectInitLoading);
  const saveLoading = useSelector(storeSelectors.selectSaveLoading);
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    let mounted = true;

    (async () => {
      await dispatch(storeActions.doInit());
      if (mounted) {
        setInitialized(true);
      }
    })();

    return () => {
      mounted = false;
    };
  }, [dispatch]);

  const [storeName, setStoreName] = useState("");
  const [contact, setContact] = useState("");
  const [idNumber, setIdNumber] = useState("");
  const [mainBusiness, setMainBusiness] = useState(MAIN_BUSINESS_OPTIONS[0]);
  const [address, setAddress] = useState("");
  const [storePhoto, setStorePhoto] = useState<any>(null);
  const [idCardFront, setIdCardFront] = useState<any>(null);
  const [idCardBack, setIdCardBack] = useState<any>(null);
  const [uploadingField, setUploadingField] = useState<string | null>(null);

  const storePhotoRef = useRef<HTMLInputElement>(null);
  const idCardFrontRef = useRef<HTMLInputElement>(null);
  const idCardBackRef = useRef<HTMLInputElement>(null);

  const canEdit = !store || store.status === "rejected";

  useEffect(() => {
    if (store && canEdit) {
      setStoreName(store.storeName || "");
      setContact(store.contact || "");
      setIdNumber(store.idNumber || "");
      setMainBusiness(store.mainBusiness || MAIN_BUSINESS_OPTIONS[0]);
      setAddress(store.address || "");
      setStorePhoto(store.storePhoto && store.storePhoto[0] ? store.storePhoto[0] : null);
      setIdCardFront(store.idCardFront && store.idCardFront[0] ? store.idCardFront[0] : null);
      setIdCardBack(store.idCardBack && store.idCardBack[0] ? store.idCardBack[0] : null);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [store]);

  const doUpload = (field: string, storageKey: string, setter: (value: any) => void, inputRef: React.RefObject<HTMLInputElement>) =>
    async (event: React.ChangeEvent<HTMLInputElement>) => {
      try {
        const files = event.target.files;

        if (!files || !files.length) {
          return;
        }

        const file = files[0];
        setUploadingField(field);

        const uploaded = await FileUploader.upload(file, {
          storage: Storage.values[storageKey],
          image: true,
        });

        setter(uploaded);
      } catch (error) {
        Errors.showMessage(error);
      } finally {
        setUploadingField(null);
        if (inputRef.current) {
          inputRef.current.value = "";
        }
      }
    };

  const doSubmit = async () => {
    if (!storeName.trim()) {
      Message.error(i18n("pages.applyMerchant.missingStoreName"));
      return;
    }

    if (!mainBusiness) {
      Message.error(i18n("pages.applyMerchant.missingMainBusiness"));
      return;
    }

    if (!address.trim()) {
      Message.error(i18n("pages.applyMerchant.missingAddress"));
      return;
    }

    if (!storePhoto) {
      Message.error(i18n("pages.applyMerchant.missingStorePhoto"));
      return;
    }

    if (!idCardFront) {
      Message.error(i18n("pages.applyMerchant.missingIdCardFront"));
      return;
    }

    if (!idCardBack) {
      Message.error(i18n("pages.applyMerchant.missingIdCardBack"));
      return;
    }

    const values = {
      storeName: storeName.trim(),
      contact: contact.trim(),
      idNumber: idNumber.trim(),
      mainBusiness,
      address: address.trim(),
      storePhoto: [storePhoto],
      idCardFront: [idCardFront],
      idCardBack: [idCardBack],
    };

    await dispatch(storeActions.doSubmit(values));
  };

  const showLoading = !initialized || initLoading;

  return (
    <>
      <div className="phone">

        <div className="page-header">
          <button className="back-btn" onClick={() => window.history.back()}>←</button>
          <span className="page-title">{i18n("pages.applyMerchant.title")}</span>
        </div>

        <div className="scroll-area">

          {showLoading && <div className="loading-text">Loading...</div>}

          {!showLoading && store && store.status === "success" && (
            <div className="status-card success">
              <div className="status-icon">✅</div>
              <div className="status-title">{i18n("pages.applyMerchant.status.successTitle")}</div>
              <div className="status-text">{i18n("pages.applyMerchant.status.successText")}</div>
              <Link to="/mine-seller" className="submit-btn status-link">
                {i18n("pages.applyMerchant.goToDashboard")}
              </Link>
            </div>
          )}

          {!showLoading && store && store.status === "pending" && (
            <>
              <div className="status-card pending">
                <div className="status-icon">⏳</div>
                <div className="status-title">{i18n("pages.applyMerchant.status.pendingTitle")}</div>
                <div className="status-text">{i18n("pages.applyMerchant.status.pendingText")}</div>
              </div>

              <div className="summary-card">
                <div className="summary-row"><span className="summary-label">{i18n("pages.applyMerchant.storeName")}</span><span className="summary-value">{store.storeName}</span></div>
                <div className="summary-row"><span className="summary-label">{i18n("pages.applyMerchant.mainBusiness")}</span><span className="summary-value">{i18n(`pages.applyMerchant.enumerators.mainBusiness.${store.mainBusiness}`)}</span></div>
                <div className="summary-row"><span className="summary-label">{i18n("pages.applyMerchant.address")}</span><span className="summary-value">{store.address}</span></div>
                <div className="summary-photos">
                  {store.storePhoto && store.storePhoto[0] && (
                    <img className="summary-thumb" src={store.storePhoto[0].downloadUrl} alt="store" />
                  )}
                  {store.idCardFront && store.idCardFront[0] && (
                    <img className="summary-thumb" src={store.idCardFront[0].downloadUrl} alt="id front" />
                  )}
                  {store.idCardBack && store.idCardBack[0] && (
                    <img className="summary-thumb" src={store.idCardBack[0].downloadUrl} alt="id back" />
                  )}
                </div>
              </div>
            </>
          )}

          {!showLoading && canEdit && (
            <>
              {store && store.status === "rejected" && (
                <div className="status-card rejected">
                  <div className="status-icon">❌</div>
                  <div className="status-title">{i18n("pages.applyMerchant.status.rejectedTitle")}</div>
                  <div className="status-text">{i18n("pages.applyMerchant.status.rejectedText")}</div>
                </div>
              )}

              <div className="intro-title">{i18n("pages.applyMerchant.title")}</div>
              <div className="intro-sub">{i18n("pages.applyMerchant.intro")}</div>

              <div className="section-label">{i18n("pages.applyMerchant.storePhoto")}</div>
              <div className="logo-upload">
                <label className="logo-circle">
                  {storePhoto ? (
                    <img src={storePhoto.downloadUrl} alt={storePhoto.name} className="logo-preview" />
                  ) : (
                    <span>{uploadingField === "storePhoto" ? "…" : "🖼️"}</span>
                  )}
                  <input
                    ref={storePhotoRef}
                    type="file"
                    accept="image/*"
                    style={{ display: "none" }}
                    disabled={uploadingField === "storePhoto"}
                    onChange={doUpload("storePhoto", "storePhoto", setStorePhoto, storePhotoRef)}
                  />
                </label>
              </div>

              <div className="field-block">
                <div className="field-label"><span className="required">*</span>{i18n("pages.applyMerchant.storeName")}</div>
                <input
                  type="text"
                  className="text-input"
                  placeholder={i18n("pages.applyMerchant.storeNamePlaceholder")}
                  value={storeName}
                  onChange={(event) => setStoreName(event.target.value)}
                />
              </div>

              <div className="field-block">
                <div className="field-label">{i18n("pages.applyMerchant.contact")}</div>
                <input
                  type="text"
                  className="text-input"
                  placeholder={i18n("pages.applyMerchant.contactPlaceholder")}
                  value={contact}
                  onChange={(event) => setContact(event.target.value)}
                />
              </div>

              <div className="field-block">
                <div className="field-label">{i18n("pages.applyMerchant.idNumber")}</div>
                <input
                  type="text"
                  className="text-input"
                  placeholder={i18n("pages.applyMerchant.idNumberPlaceholder")}
                  value={idNumber}
                  onChange={(event) => setIdNumber(event.target.value)}
                />
              </div>

              <div className="section-label" style={{ marginBottom: '0' }}>ID card</div>

              <div className="field-block id-card-row" style={{ marginTop: '12px' }}>
                <UploadBox
                  label={i18n("pages.applyMerchant.idCardFront")}
                  value={idCardFront}
                  uploading={uploadingField === "idCardFront"}
                  onChange={doUpload("idCardFront", "storeIdCardFront", setIdCardFront, idCardFrontRef)}
                  inputRef={idCardFrontRef}
                />
                <UploadBox
                  label={i18n("pages.applyMerchant.idCardBack")}
                  value={idCardBack}
                  uploading={uploadingField === "idCardBack"}
                  onChange={doUpload("idCardBack", "storeIdCardBack", setIdCardBack, idCardBackRef)}
                  inputRef={idCardBackRef}
                />
              </div>

              <div className="field-block">
                <div className="field-label"><span className="required">*</span>{i18n("pages.applyMerchant.mainBusiness")}</div>
                <div className="select-box">
                  <select
                    value={mainBusiness}
                    onChange={(event) => setMainBusiness(event.target.value)}
                    className="business-select"
                  >
                    {MAIN_BUSINESS_OPTIONS.map((option) => (
                      <option key={option} value={option}>
                        {i18n(`pages.applyMerchant.enumerators.mainBusiness.${option}`)}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="field-block">
                <div className="field-label"><span className="required">*</span>{i18n("pages.applyMerchant.address")}</div>
                <textarea
                  className="textarea-input"
                  placeholder={i18n("pages.applyMerchant.addressPlaceholder")}
                  value={address}
                  onChange={(event) => setAddress(event.target.value)}
                ></textarea>
              </div>

              <button className="submit-btn" disabled={saveLoading} onClick={doSubmit}>
                {saveLoading ? "Submitting..." : i18n("pages.applyMerchant.submit")}
              </button>
            </>
          )}

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
          --green:#12b886;
          --amber:#ffb020;
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

        .loading-text{
          text-align:center;
          color:var(--grey-text);
          font-size:12.5px;
          padding:30px 0;
        }

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

        /* ---------- Status cards ---------- */
        .status-card{
          border-radius:16px;
          padding:22px 18px;
          text-align:center;
          margin-bottom:18px;
        }
        .status-card.pending{ background:#fff6e5; }
        .status-card.success{ background:#e8f9f1; }
        .status-card.rejected{ background:#ffeaea; }
        .status-icon{ font-size:32px; }
        .status-title{ font-size:15px; font-weight:800; color:var(--navy); margin-top:8px; }
        .status-text{ font-size:12px; color:var(--grey-text); margin-top:6px; line-height:1.6; }
        .status-link{ display:inline-block; margin-top:16px; text-decoration:none; width:auto; padding-left:24px; padding-right:24px; }

        .summary-card{
          background:var(--card-bg);
          border-radius:14px;
          box-shadow:0 8px 20px rgba(20,40,100,0.06);
          padding:14px 16px;
        }
        .summary-row{
          display:flex;
          justify-content:space-between;
          gap:10px;
          padding:8px 0;
          border-bottom:1px solid var(--grey-light);
          font-size:12.5px;
        }
        .summary-row:last-of-type{ border-bottom:none; }
        .summary-label{ color:var(--grey-text); }
        .summary-value{ color:var(--navy); font-weight:600; text-align:right; }
        .summary-photos{ display:flex; gap:10px; margin-top:12px; }
        .summary-thumb{ width:60px; height:60px; object-fit:cover; border-radius:10px; border:1px solid var(--field-border); }

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
          overflow:hidden;
        }
        .logo-preview{ width:100%; height:100%; object-fit:cover; }

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

        /* ---------- Upload boxes ---------- */
        .id-card-row{ display:flex; gap:14px; }
        .upload-box{
          flex:1;
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
          overflow:hidden;
          min-height:110px;
        }
        .upload-box .img-icon{ font-size:26px; color:var(--blue-bright); }
        .upload-box .up-label{ font-size:12.5px; font-weight:600; color:var(--grey-text); text-align:center; }
        .upload-preview{ width:100%; height:100%; object-fit:cover; border-radius:10px; }

        /* ---------- Select ---------- */
        .select-box{
          display:flex;
          align-items:center;
          justify-content:space-between;
          background:#fff;
          border:1.5px solid var(--field-border);
          border-radius:12px;
          padding:4px 6px;
          font-size:13.5px;
          color:var(--navy);
          font-weight:600;
        }
        .business-select{
          width:100%;
          border:none;
          outline:none;
          background:transparent;
          padding:9px 8px;
          font-size:13.5px;
          color:var(--navy);
          font-weight:600;
        }

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
          text-align:center;
          text-decoration:none;
          display:block;
        }
        .submit-btn:disabled{ opacity:0.6; cursor:not-allowed; }
      `}</style>
    </>
  );
}

export default ApplyMerchant;
