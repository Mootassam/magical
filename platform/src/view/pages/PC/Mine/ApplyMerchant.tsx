import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { i18n } from "../../../../i18n";
import storeActions from "src/modules/store/storeActions";
import storeSelectors from "src/modules/store/storeSelectors";
import FileUploader from "src/modules/shared/fileUpload/fileUploader";
import Storage from "src/security/storage";
import Message from "src/view/shared/message";
import Errors from "src/modules/shared/error/errors";
import MineShell from "./MineShell";
import { sharedMineStyles } from "./MyAccount";

const MAIN_BUSINESS_OPTIONS = [
  "fashion_clothing",
  "electronics",
  "beauty_cosmetics",
  "home_living",
  "sports_outdoors",
  "toys_hobbies",
  "food_beverages",
  "all",
];

function UploadBox({ label, value, uploading, onChange, inputRef }: any) {
  return (
    <label className="pc-mine__id-upload">
      {value ? (
        <img src={value.downloadUrl} alt={value.name} />
      ) : (
        <>
          <span className="pc-mine__id-upload-icon">{uploading ? "…" : "🖼️"}</span>
          <span>{label}</span>
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
      await dispatch(storeActions.doInit() as any);
      if (mounted) setInitialized(true);
    })();
    return () => {
      mounted = false;
    };
  }, [dispatch]);

  const [storeName, setStoreName] = useState("");
  const [contact, setContact] = useState("");
  const [idNumber, setIdNumber] = useState("");
  const [invitationCode, setInvitationCode] = useState("");
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
      setInvitationCode(store.invitationcode || "");
      setMainBusiness(store.mainBusiness || MAIN_BUSINESS_OPTIONS[0]);
      setAddress(store.address || "");
      setStorePhoto(store.storePhoto && store.storePhoto[0] ? store.storePhoto[0] : null);
      setIdCardFront(store.idCardFront && store.idCardFront[0] ? store.idCardFront[0] : null);
      setIdCardBack(store.idCardBack && store.idCardBack[0] ? store.idCardBack[0] : null);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [store]);

  const doUpload =
    (field: string, storageKey: string, setter: (value: any) => void, inputRef: React.RefObject<HTMLInputElement>) =>
    async (event: React.ChangeEvent<HTMLInputElement>) => {
      try {
        const files = event.target.files;
        if (!files || !files.length) return;
        setUploadingField(field);
        const uploaded = await FileUploader.upload(files[0], {
          storage: Storage.values[storageKey],
          image: true,
        });
        setter(uploaded);
      } catch (error) {
        Errors.showMessage(error);
      } finally {
        setUploadingField(null);
        if (inputRef.current) inputRef.current.value = "";
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
      invitationcode: invitationCode.trim(),
      mainBusiness,
      address: address.trim(),
      storePhoto: [storePhoto],
      idCardFront: [idCardFront],
      idCardBack: [idCardBack],
    };

    await dispatch(storeActions.doSubmit(values) as any);
  };

  const showLoading = !initialized || initLoading;

  return (
    <MineShell active="apply-merchant">
      <h1 className="pc-mine__page-title">{i18n("pages.applyMerchant.title")}</h1>

      {showLoading && <div className="pc-mine__hint">Loading...</div>}

      {!showLoading && store && store.status === "success" && (
        <div className="pc-card pc-mine__status-card pc-mine__status-card--success">
          <div className="pc-mine__status-icon">✅</div>
          <div className="pc-mine__status-title">{i18n("pages.applyMerchant.status.successTitle")}</div>
          <div className="pc-mine__status-text">{i18n("pages.applyMerchant.status.successText")}</div>
        </div>
      )}

      {!showLoading && store && store.status === "pending" && (
        <>
          <div className="pc-card pc-mine__status-card pc-mine__status-card--pending">
            <div className="pc-mine__status-icon">⏳</div>
            <div className="pc-mine__status-title">{i18n("pages.applyMerchant.status.pendingTitle")}</div>
            <div className="pc-mine__status-text">{i18n("pages.applyMerchant.status.pendingText")}</div>
          </div>

          <div className="pc-card pc-mine__panel pc-mine__merchant-summary">
            <div className="pc-mine__row">
              <span className="pc-mine__row-label">{i18n("pages.applyMerchant.storeName")}</span>
              <span className="pc-mine__row-value">{store.storeName}</span>
            </div>
            <div className="pc-mine__row">
              <span className="pc-mine__row-label">{i18n("pages.applyMerchant.mainBusiness")}</span>
              <span className="pc-mine__row-value">
                {i18n(`pages.applyMerchant.enumerators.mainBusiness.${store.mainBusiness}`)}
              </span>
            </div>
            {store.invitationcode && (
              <div className="pc-mine__row">
                <span className="pc-mine__row-label">{i18n("pages.applyMerchant.invitationCode")}</span>
                <span className="pc-mine__row-value">{store.invitationcode}</span>
              </div>
            )}
            <div className="pc-mine__row">
              <span className="pc-mine__row-label">{i18n("pages.applyMerchant.address")}</span>
              <span className="pc-mine__row-value">{store.address}</span>
            </div>
            <div className="pc-mine__summary-photos">
              {store.storePhoto?.[0] && <img src={store.storePhoto[0].downloadUrl} alt="store" />}
              {store.idCardFront?.[0] && <img src={store.idCardFront[0].downloadUrl} alt="id front" />}
              {store.idCardBack?.[0] && <img src={store.idCardBack[0].downloadUrl} alt="id back" />}
            </div>
          </div>
        </>
      )}

      {!showLoading && canEdit && (
        <div className="pc-card pc-mine__panel pc-mine__merchant-form">
          {store && store.status === "rejected" && (
            <div className="pc-mine__status-banner">
              <span>❌</span>
              <div>
                <div className="pc-mine__status-title">{i18n("pages.applyMerchant.status.rejectedTitle")}</div>
                <div className="pc-mine__status-text">{i18n("pages.applyMerchant.status.rejectedText")}</div>
              </div>
            </div>
          )}

          <p className="pc-mine__merchant-intro">{i18n("pages.applyMerchant.intro")}</p>

          <div className="pc-mine__merchant-logo-row">
            <label className="pc-mine__logo-circle">
              {storePhoto ? (
                <img src={storePhoto.downloadUrl} alt={storePhoto.name} />
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
            <span className="pc-mine__field-label">{i18n("pages.applyMerchant.storePhoto")}</span>
          </div>

          <div className="pc-mine__merchant-grid">
            <div>
              <label className="pc-mine__field-label">{i18n("pages.applyMerchant.storeName")}</label>
              <input
                type="text"
                className="pc-input"
                placeholder={i18n("pages.applyMerchant.storeNamePlaceholder")}
                value={storeName}
                onChange={(event) => setStoreName(event.target.value)}
              />
            </div>
            <div>
              <label className="pc-mine__field-label">{i18n("pages.applyMerchant.contact")}</label>
              <input
                type="text"
                className="pc-input"
                placeholder={i18n("pages.applyMerchant.contactPlaceholder")}
                value={contact}
                onChange={(event) => setContact(event.target.value)}
              />
            </div>
            <div>
              <label className="pc-mine__field-label">{i18n("pages.applyMerchant.idNumber")}</label>
              <input
                type="text"
                className="pc-input"
                placeholder={i18n("pages.applyMerchant.idNumberPlaceholder")}
                value={idNumber}
                onChange={(event) => setIdNumber(event.target.value)}
              />
            </div>
            <div>
              <label className="pc-mine__field-label">{i18n("pages.applyMerchant.invitationCode")}</label>
              <input
                type="text"
                className="pc-input"
                placeholder={i18n("pages.applyMerchant.invitationCodePlaceholder")}
                value={invitationCode}
                onChange={(event) => setInvitationCode(event.target.value)}
              />
            </div>
          </div>

          <label className="pc-mine__field-label pc-mine__field-label--sp">ID Card</label>
          <div className="pc-mine__id-row">
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

          <label className="pc-mine__field-label pc-mine__field-label--sp">
            {i18n("pages.applyMerchant.mainBusiness")}
          </label>
          <select className="pc-input" value={mainBusiness} onChange={(event) => setMainBusiness(event.target.value)}>
            {MAIN_BUSINESS_OPTIONS.map((option) => (
              <option key={option} value={option}>
                {i18n(`pages.applyMerchant.enumerators.mainBusiness.${option}`)}
              </option>
            ))}
          </select>

          <label className="pc-mine__field-label pc-mine__field-label--sp">
            {i18n("pages.applyMerchant.address")}
          </label>
          <textarea
            className="pc-input pc-mine__textarea"
            rows={3}
            placeholder={i18n("pages.applyMerchant.addressPlaceholder")}
            value={address}
            onChange={(event) => setAddress(event.target.value)}
          />

          <button
            className="pc-btn pc-btn-primary pc-mine__deposit-submit"
            disabled={saveLoading}
            onClick={doSubmit}
          >
            {saveLoading ? "Submitting..." : i18n("pages.applyMerchant.submit")}
          </button>
        </div>
      )}

      <style>{sharedMineStyles}</style>
      <style>{`
        .pc-mine__status-card {
          padding: 32px;
          text-align: center;
          margin-bottom: 20px;
        }

        .pc-mine__status-icon {
          font-size: 36px;
          margin-bottom: 10px;
        }

        .pc-mine__status-title {
          font-size: 16px;
          font-weight: 800;
          color: var(--pc-text);
          margin-bottom: 6px;
        }

        .pc-mine__status-text {
          font-size: 13px;
          color: var(--pc-text-secondary);
        }

        .pc-mine__merchant-summary {
          padding: 20px 24px;
        }

        .pc-mine__summary-photos {
          display: flex;
          gap: 10px;
          padding-top: 14px;
        }

        .pc-mine__summary-photos img {
          width: 72px;
          height: 72px;
          border-radius: var(--pc-radius-sm);
          object-fit: cover;
          border: 1px solid var(--pc-border);
        }

        .pc-mine__merchant-form {
          padding: 28px;
          max-width: 640px;
        }

        .pc-mine__status-banner {
          display: flex;
          gap: 12px;
          background: #FCE9E9;
          border-radius: var(--pc-radius-sm);
          padding: 14px 16px;
          margin-bottom: 20px;
        }

        .pc-mine__merchant-intro {
          font-size: 13px;
          color: var(--pc-text-secondary);
          margin: 0 0 20px;
        }

        .pc-mine__merchant-logo-row {
          display: flex;
          align-items: center;
          gap: 14px;
          margin-bottom: 22px;
        }

        .pc-mine__logo-circle {
          width: 64px;
          height: 64px;
          border-radius: 50%;
          background: var(--pc-secondary);
          border: 1.5px dashed var(--pc-border);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 22px;
          cursor: pointer;
          overflow: hidden;
          flex-shrink: 0;
        }

        .pc-mine__logo-circle img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .pc-mine__merchant-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
          margin-bottom: 4px;
        }

        .pc-mine__merchant-grid input,
        .pc-mine__merchant-form select {
          margin-bottom: 4px;
        }

        .pc-mine__id-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
          margin-bottom: 20px;
        }

        .pc-mine__id-upload {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 6px;
          height: 100px;
          border: 1.5px dashed var(--pc-border);
          border-radius: var(--pc-radius-sm);
          cursor: pointer;
          font-size: 12px;
          color: var(--pc-text-muted);
          overflow: hidden;
        }

        .pc-mine__id-upload img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .pc-mine__id-upload-icon {
          font-size: 20px;
        }

        .pc-mine__merchant-form select,
        .pc-mine__textarea {
          margin-bottom: 20px;
        }

        @media (max-width: 700px) {
          .pc-mine__merchant-grid,
          .pc-mine__id-row {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </MineShell>
  );
}

export default ApplyMerchant;
