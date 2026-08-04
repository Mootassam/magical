import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import authSelectors from "src/modules/auth/authSelectors";
import storeActions from "src/modules/store/storeActions";
import storeSelectors from "src/modules/store/storeSelectors";
import FileUploader from "src/modules/shared/fileUpload/fileUploader";
import Storage from "src/security/storage";
import Message from "src/view/shared/message";
import Errors from "src/modules/shared/error/errors";
import MineSellerShell from "./MineSellerShell";
import { sharedMineStyles } from "src/view/pages/PC/Mine/MyAccount";

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

  const showLoading = initLoading && !store;

  return (
    <MineSellerShell active="settings">
      <h1 className="pc-mine__page-title">Set Up</h1>

      {showLoading && <div className="pc-mine__hint">Loading store settings…</div>}

      {!initLoading && !store && (
        <div className="pc-card pc-mine__empty">
          <div className="pc-mine__empty-title">No store found for this account</div>
          <div className="pc-mine__empty-text">Apply to become a merchant to manage store settings.</div>
        </div>
      )}

      {store && (
        <div className="pc-mine__settings-layout">
          <div className="pc-card pc-mine__panel pc-mine__settings-main">
            <h2>Store Information</h2>
            <p className="pc-mine__settings-sub">
              Update your store details and business information.
            </p>

            <div className="pc-mine__settings-logo-row">
              <div className="pc-mine__settings-logo">
                {logoUrl ? <img src={logoUrl} alt={storeName} /> : <span>{storeName || "Store"}</span>}
              </div>
              <div className="pc-mine__settings-logo-info">
                <div className="pc-mine__settings-logo-title">Store Logo</div>
                <div className="pc-mine__settings-logo-sub">Upload a logo for your store</div>
                <input
                  ref={logoInputRef}
                  type="file"
                  accept="image/*"
                  style={{ display: "none" }}
                  onChange={handleLogoChange}
                />
                <button
                  type="button"
                  className="pc-btn pc-btn-outline"
                  onClick={handleLogoClick}
                  disabled={uploadingLogo}
                >
                  {uploadingLogo ? "Uploading…" : "Upload Logo"}
                </button>
              </div>
            </div>

            <label className="pc-mine__field-label">Store Name *</label>
            <input
              className="pc-input"
              value={storeName}
              onChange={(event) => setStoreName(event.target.value)}
              placeholder="Your store name"
            />

            <label className="pc-mine__field-label pc-mine__field-label--sp">Store Description</label>
            <textarea
              className="pc-input pc-mine__settings-textarea"
              value={description}
              onChange={(event) => setDescription(event.target.value)}
              placeholder="Describe your store..."
              rows={4}
            />

            <div className="pc-mine__settings-field-row">
              <div>
                <label className="pc-mine__field-label">Business Email *</label>
                <input
                  className="pc-input pc-mine__field-disabled"
                  value={currentUser?.email || ""}
                  disabled
                  readOnly
                />
              </div>
              <div>
                <label className="pc-mine__field-label">Business Phone</label>
                <input
                  className="pc-input"
                  value={contact}
                  onChange={(event) => setContact(event.target.value)}
                  placeholder="Phone number"
                />
              </div>
            </div>

            <button
              type="button"
              className="pc-btn pc-btn-primary pc-mine__settings-save"
              onClick={handleSave}
              disabled={savingChanges}
            >
              {savingChanges ? "Saving…" : "Save Changes"}
            </button>
          </div>

          <div className="pc-card pc-mine__panel pc-mine__settings-banner">
            <h2>Store Banner</h2>
            <p className="pc-mine__settings-sub">Shown at the top of your shop page.</p>

            <div className="pc-mine__settings-banner-box">
              {bannerUrl ? (
                <img src={bannerUrl} alt="Store banner" />
              ) : (
                <span className="pc-mine__settings-banner-placeholder">No banner uploaded</span>
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
              type="button"
              className="pc-btn pc-btn-outline pc-mine__settings-banner-btn"
              onClick={handleBannerClick}
              disabled={uploadingBanner}
            >
              {uploadingBanner ? "Uploading…" : "Upload Banner"}
            </button>
          </div>
        </div>
      )}

      <style>{sharedMineStyles}</style>
      <style>{`
        .pc-mine__settings-layout {
          display: grid;
          grid-template-columns: 1fr 320px;
          gap: 20px;
          align-items: start;
        }

        .pc-mine__settings-main,
        .pc-mine__settings-banner {
          padding: 24px;
        }

        .pc-mine__settings-main h2,
        .pc-mine__settings-banner h2 {
          font-size: 15px;
          font-weight: 800;
          color: var(--pc-text);
          margin: 0 0 6px;
        }

        .pc-mine__settings-sub {
          font-size: 12.5px;
          color: var(--pc-text-muted);
          margin: 0 0 20px;
        }

        .pc-mine__settings-logo-row {
          display: flex;
          align-items: center;
          gap: 16px;
          margin-bottom: 22px;
        }

        .pc-mine__settings-logo {
          width: 76px;
          height: 76px;
          border-radius: 50%;
          background: #111111;
          color: #fff;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 11px;
          font-weight: 800;
          text-align: center;
          line-height: 1.3;
          padding: 6px;
          flex-shrink: 0;
          overflow: hidden;
        }

        .pc-mine__settings-logo img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .pc-mine__settings-logo-info {
          flex: 1;
          min-width: 0;
        }

        .pc-mine__settings-logo-title {
          font-size: 14px;
          font-weight: 800;
          color: var(--pc-text);
        }

        .pc-mine__settings-logo-sub {
          font-size: 12px;
          color: var(--pc-text-muted);
          margin: 3px 0 10px;
        }

        .pc-mine__settings-main input,
        .pc-mine__settings-textarea {
          margin-bottom: 4px;
        }

        .pc-mine__settings-textarea {
          resize: vertical;
          font-family: inherit;
        }

        .pc-mine__settings-field-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
          margin-top: 18px;
        }

        .pc-mine__field-disabled {
          background: var(--pc-secondary) !important;
          color: var(--pc-text-muted);
          cursor: not-allowed;
        }

        .pc-mine__settings-save {
          width: 100%;
          margin-top: 24px;
          padding: 13px;
        }

        .pc-mine__settings-banner-box {
          border: 1.5px dashed var(--pc-border);
          border-radius: var(--pc-radius-sm);
          background: var(--pc-bg);
          height: 150px;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          margin-bottom: 12px;
        }

        .pc-mine__settings-banner-box img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .pc-mine__settings-banner-placeholder {
          font-size: 12.5px;
          color: var(--pc-text-muted);
        }

        .pc-mine__settings-banner-btn {
          width: 100%;
        }

        @media (max-width: 900px) {
          .pc-mine__settings-layout {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </MineSellerShell>
  );
}

export default SellerSetUp;
