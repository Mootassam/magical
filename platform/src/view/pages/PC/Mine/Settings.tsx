import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import authActions from "src/modules/auth/authActions";
import authSelectors from "src/modules/auth/authSelectors";
import orderActions from "src/modules/order/orderActions";
import orderSelectors from "src/modules/order/orderSelectors";
import FileUploader from "src/modules/shared/fileUpload/fileUploader";
import Storage from "src/security/storage";
import Message from "src/view/shared/message";
import Errors from "src/modules/shared/error/errors";
import MineShell from "./MineShell";
import { sharedMineStyles } from "./MyAccount";
import { i18n } from "../../../../i18n";

function Settings() {
  const dispatch = useDispatch();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const currentUser = useSelector(authSelectors.selectCurrentUser);
  const avatarUrl = useSelector(authSelectors.selectCurrentUserAvatar);
  const savingProfile = useSelector(authSelectors.selectLoadingUpdateProfile);
  const orders = useSelector(orderSelectors.selectRows);

  const [displayName, setDisplayName] = useState("");
  const [uploadingAvatar, setUploadingAvatar] = useState(false);

  useEffect(() => {
    dispatch(orderActions.doFetchMine());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  useEffect(() => {
    setDisplayName(currentUser?.fullName || "");
  }, [currentUser?.fullName]);

  const initial = (displayName || currentUser?.email || "?").charAt(0).toUpperCase();

  const handleAvatarClick = () => {
    fileInputRef.current?.click();
  };

  const handleAvatarChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    try {
      const files = event.target.files;
      if (!files || !files.length) return;
      setUploadingAvatar(true);
      const uploaded = await FileUploader.upload(files[0], {
        storage: Storage.values.userAvatarsProfiles,
        image: true,
      });
      await dispatch(authActions.doUpdateMemberProfile({ avatars: [uploaded] }) as any);
    } catch (error) {
      Errors.showMessage(error);
    } finally {
      setUploadingAvatar(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  const handleSave = () => {
    if (!displayName.trim()) {
      Message.error(i18n("estore.pc.settings.displayNameRequired"));
      return;
    }

    dispatch(
      authActions.doUpdateMemberProfile({
        fullName: displayName.trim(),
        avatars: currentUser?.avatars || [],
      }) as any,
    );
  };

  const joinedDate = currentUser?.createdAt ? moment(currentUser.createdAt).format("M/D/YYYY") : "-";

  return (
    <MineShell active="settings">
      <h1 className="pc-mine__page-title">{i18n("estore.pc.settings.title")}</h1>

      <div className="pc-mine__settings-layout">
        <div className="pc-card pc-mine__panel pc-mine__settings-profile">
          <h2>{i18n("estore.pc.settings.publicProfile")}</h2>
          <p className="pc-mine__settings-sub">
            {i18n("estore.pc.settings.publicProfileSub")}
          </p>

          <div className="pc-mine__settings-avatar-row">
            <div className="pc-mine__settings-avatar">
              {avatarUrl ? <img src={avatarUrl} alt={displayName || "Avatar"} /> : <span>{initial}</span>}
            </div>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              style={{ display: "none" }}
              onChange={handleAvatarChange}
            />
            <button type="button" className="pc-btn pc-btn-ghost" onClick={handleAvatarClick} disabled={uploadingAvatar}>
              {uploadingAvatar ? i18n("estore.pc.settings.uploading") : i18n("estore.pc.settings.changeAvatar")}
            </button>
          </div>

          <label className="pc-mine__field-label">{i18n("estore.pc.settings.displayName")}</label>
          <input
            className="pc-input"
            value={displayName}
            onChange={(event) => setDisplayName(event.target.value)}
            placeholder={i18n("estore.pc.settings.displayNamePlaceholder")}
          />

          <label className="pc-mine__field-label pc-mine__field-label--sp">{i18n("estore.pc.settings.emailAddress")}</label>
          <input className="pc-input pc-mine__field-disabled" value={currentUser?.email || ""} disabled readOnly />
          <div className="pc-mine__settings-hint">{i18n("estore.pc.settings.emailHint")}</div>

          <button
            className="pc-btn pc-btn-primary pc-mine__deposit-submit"
            onClick={handleSave}
            disabled={savingProfile}
          >
            {savingProfile ? i18n("estore.pc.settings.saving") : i18n("estore.pc.settings.saveChanges")}
          </button>
        </div>

        <div className="pc-card pc-mine__panel pc-mine__settings-stats">
          <h2>{i18n("estore.pc.settings.accountStats")}</h2>
          <div className="pc-mine__stat-row">
            <span>{i18n("estore.pc.settings.orders")}</span>
            <span>{orders.length}</span>
          </div>
          <div className="pc-mine__stat-row">
            <span>{i18n("estore.pc.settings.reviews")}</span>
            <span>0</span>
          </div>
          <div className="pc-mine__stat-row">
            <span>{i18n("estore.pc.settings.wishlist")}</span>
            <span>0</span>
          </div>
          <div className="pc-mine__stat-row pc-mine__stat-row--last">
            <span>{i18n("estore.pc.settings.joined")}</span>
            <span>{joinedDate}</span>
          </div>
        </div>
      </div>

      <style>{sharedMineStyles}</style>
      <style>{`
        .pc-mine__settings-layout {
          display: grid;
          grid-template-columns: 1fr 320px;
          gap: 20px;
          align-items: start;
        }

        .pc-mine__settings-profile,
        .pc-mine__settings-stats {
          padding: 24px;
        }

        .pc-mine__settings-profile h2,
        .pc-mine__settings-stats h2 {
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

        .pc-mine__settings-avatar-row {
          display: flex;
          align-items: center;
          gap: 16px;
          margin-bottom: 24px;
        }

        .pc-mine__settings-avatar {
          width: 64px;
          height: 64px;
          border-radius: 50%;
          background: var(--pc-secondary);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 22px;
          font-weight: 700;
          color: var(--pc-text-secondary);
          overflow: hidden;
          flex-shrink: 0;
        }

        .pc-mine__settings-avatar img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .pc-mine__settings-profile input {
          margin-bottom: 4px;
        }

        .pc-mine__field-disabled {
          background: var(--pc-secondary) !important;
          color: var(--pc-text-muted);
        }

        .pc-mine__settings-hint {
          font-size: 11.5px;
          color: var(--pc-text-muted);
          margin: 6px 0 20px;
        }

        .pc-mine__stat-row {
          display: flex;
          justify-content: space-between;
          font-size: 13px;
          color: var(--pc-text-secondary);
          padding: 12px 0;
          border-bottom: 1px solid var(--pc-divider);
        }

        .pc-mine__stat-row span:last-child {
          font-weight: 700;
          color: var(--pc-text);
        }

        .pc-mine__stat-row--last {
          border-bottom: none;
        }

        @media (max-width: 900px) {
          .pc-mine__settings-layout {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </MineShell>
  );
}

export default Settings;
