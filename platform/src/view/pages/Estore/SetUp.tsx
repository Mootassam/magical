import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import moment from "moment";
import authActions from "src/modules/auth/authActions";
import authSelectors from "src/modules/auth/authSelectors";
import orderActions from "src/modules/order/orderActions";
import orderSelectors from "src/modules/order/orderSelectors";
import FileUploader from "src/modules/shared/fileUpload/fileUploader";
import Storage from "src/security/storage";
import Message from "src/view/shared/message";
import Errors from "src/modules/shared/error/errors";

function SetUp() {
  const dispatch = useDispatch();
  const history = useHistory();
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

      if (!files || !files.length) {
        return;
      }

      const file = files[0];
      setUploadingAvatar(true);

      const uploaded = await FileUploader.upload(file, {
        storage: Storage.values.userAvatarsProfiles,
        image: true,
      });

      await dispatch(
        authActions.doUpdateMemberProfile({ avatars: [uploaded] }) as any,
      );
    } catch (error) {
      Errors.showMessage(error);
    } finally {
      setUploadingAvatar(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  const handleSave = () => {
    if (!displayName.trim()) {
      Message.error("Display name is required.");
      return;
    }

    dispatch(
      authActions.doUpdateMemberProfile({
        fullName: displayName.trim(),
        avatars: currentUser?.avatars || [],
      }) as any,
    );
  };

  const joinedDate = currentUser?.createdAt
    ? moment(currentUser.createdAt).format("M/D/YYYY")
    : "-";

  return (
    <>
      <div className="phone">

        <div className="page-header">
          <button className="back-btn" onClick={() => window.history.back()}>←</button>
          <span className="page-title">Member Info</span>
        </div>

        <div className="content-area">
          <h1 className="page-heading">My Profile</h1>
          <div className="page-subtitle">Manage your personal information and addresses</div>

          <div className="settings-card">
            <div className="card-title">Public Profile</div>
            <div className="card-sub">
              This information will be displayed on your reviews and profile.
            </div>

            <div className="avatar-wrap">
              <div className="avatar-circle">
                {avatarUrl ? (
                  <img src={avatarUrl} alt={displayName || "Avatar"} />
                ) : (
                  <span>{initial}</span>
                )}
              </div>
            </div>

            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              style={{ display: "none" }}
              onChange={handleAvatarChange}
            />
            <button
              className="outline-btn"
              onClick={handleAvatarClick}
              disabled={uploadingAvatar}
            >
              {uploadingAvatar ? "Uploading…" : "Change Avatar"}
            </button>

            <label className="field-label">Display Name</label>
            <input
              className="field-input"
              value={displayName}
              onChange={(event) => setDisplayName(event.target.value)}
              placeholder="Your display name"
            />

            <label className="field-label">Email Address</label>
            <input
              className="field-input field-disabled"
              value={currentUser?.email || ""}
              disabled
              readOnly
            />
            <div className="field-hint">Contact support to change your email address.</div>

            <button
              className="save-btn"
              onClick={handleSave}
              disabled={savingProfile}
            >
              {savingProfile ? "Saving…" : "Save Changes"}
            </button>
          </div>

          <div className="settings-card">
            <div className="card-title">Account Stats</div>

            <div className="stat-row">
              <span className="stat-label">ORDERS</span>
              <span className="stat-value">{orders.length}</span>
            </div>
            <div className="stat-row">
              <span className="stat-label">REVIEWS</span>
              <span className="stat-value">0</span>
            </div>
            <div className="stat-row">
              <span className="stat-label">WISHLIST</span>
              <span className="stat-value">0</span>
            </div>
            <div className="stat-row no-border">
              <span className="stat-label">JOINED</span>
              <span className="stat-value">{joinedDate}</span>
            </div>
          </div>

          <div className="settings-card">
            <div className="card-title">Addresses</div>
            <div className="card-sub">Manage your shipping and billing addresses.</div>
            <button
              className="add-address-btn"
              onClick={() => history.push("/delivery-address")}
            >
              + Add Address
            </button>
          </div>

        </div>

      </div>

      <style>{`
        :root{
          --navy:#0e1b45;
          --blue-bright:#2f8dff;
          --blue-deep:#0b3fae;
          --grey-text:#6b7590;
          --grey-light:#eef2fa;
          --border:#eceff5;
          --purple:#6c2bd9;
          --crimson:#d81b5c;
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

        .settings-card{
          margin-top:18px;
          border:1px solid var(--border);
          border-radius:14px;
          padding:20px;
        }
        .card-title{ font-size:16px; font-weight:800; color:var(--navy); }
        .card-sub{ font-size:12.5px; color:var(--grey-text); margin-top:6px; line-height:1.5; }

        .avatar-wrap{
          display:flex;
          justify-content:center;
          margin:24px 0 20px;
        }
        .avatar-circle{
          width:96px; height:96px;
          border-radius:50%;
          background:var(--purple);
          color:#fff;
          display:flex;
          align-items:center;
          justify-content:center;
          font-size:34px;
          font-weight:800;
          overflow:hidden;
        }
        .avatar-circle img{ width:100%; height:100%; object-fit:cover; }

        .outline-btn{
          width:100%;
          border:1px solid var(--border);
          border-radius:10px;
          background:#fff;
          padding:12px;
          font-size:14px;
          font-weight:700;
          color:var(--navy);
          cursor:pointer;
        }
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
        }
        .field-input:focus{ outline:none; border-color:var(--blue-bright); }
        .field-input.field-disabled{
          background:#f7f8fb;
          color:#9aa4c0;
          cursor:not-allowed;
        }
        .field-hint{ margin-top:8px; font-size:11.5px; color:var(--grey-text); }

        .save-btn{
          width:100%;
          margin-top:18px;
          border:none;
          border-radius:10px;
          padding:13px;
          background:var(--crimson);
          color:#fff;
          font-size:14px;
          font-weight:700;
          cursor:pointer;
        }
        .save-btn:disabled{ opacity:0.6; cursor:not-allowed; }

        .stat-row{
          display:flex;
          justify-content:space-between;
          align-items:center;
          padding:12px 0;
          border-bottom:1px solid var(--border);
        }
        .stat-row.no-border{ border-bottom:none; }
        .stat-label{
          font-size:11.5px;
          font-weight:700;
          letter-spacing:0.5px;
          color:var(--grey-text);
        }
        .stat-value{ font-size:15px; font-weight:800; color:var(--navy); }

        .add-address-btn{
          width:100%;
          margin-top:16px;
          border:none;
          border-radius:10px;
          padding:13px;
          background:var(--crimson);
          color:#fff;
          font-size:14px;
          font-weight:700;
          cursor:pointer;
        }
      `}</style>
    </>
  );
}

export default SetUp;
