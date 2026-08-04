import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { i18n } from "../../../i18n";
import deliveryAddressActions from "src/modules/deliveryAddress/deliveryAddressActions";
import deliveryAddressSelectors from "src/modules/deliveryAddress/deliveryAddressSelectors";
import Message from "src/view/shared/message";

function DeliveryAddress() {
  const dispatch = useDispatch();
  const rows = useSelector(deliveryAddressSelectors.selectRows);
  const loading = useSelector(deliveryAddressSelectors.selectLoading);
  const saveLoading = useSelector(deliveryAddressSelectors.selectSaveLoading);
  const destroyLoading = useSelector(deliveryAddressSelectors.selectDestroyLoading);
  const [initialized, setInitialized] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);

  const [address, setAddress] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [contact, setContact] = useState("");

  useEffect(() => {
    let mounted = true;

    (async () => {
      await dispatch(deliveryAddressActions.doFetch());
      if (mounted) {
        setInitialized(true);
      }
    })();

    return () => {
      mounted = false;
    };
  }, [dispatch]);

  const openAddModal = () => {
    setEditingId(null);
    setAddress("");
    setContactNumber("");
    setContact("");
    setShowModal(true);
  };

  const openEditModal = (row: any) => {
    setEditingId(row.id);
    setAddress(row.address || "");
    setContactNumber(row.contactNumber || "");
    setContact(row.contact || "");
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const doSubmit = async () => {
    if (!address.trim()) {
      Message.error(i18n("pages.deliveryAddress.missingAddress"));
      return;
    }

    if (!contactNumber.trim()) {
      Message.error(i18n("pages.deliveryAddress.missingContactNumber"));
      return;
    }

    if (!contact.trim()) {
      Message.error(i18n("pages.deliveryAddress.missingContact"));
      return;
    }

    const values = {
      address: address.trim(),
      countryCode: "+1",
      contactNumber: contactNumber.trim(),
      contact: contact.trim(),
    };

    if (editingId) {
      await dispatch(deliveryAddressActions.doUpdate(editingId, values));
    } else {
      await dispatch(deliveryAddressActions.doCreate(values));
    }

    setShowModal(false);
  };

  const doConfirmDelete = async () => {
    if (!confirmDeleteId) {
      return;
    }

    await dispatch(deliveryAddressActions.doDestroy(confirmDeleteId));
    setConfirmDeleteId(null);
  };

  const showEmptySkeleton = !initialized || loading;

  return (
    <>
      <div className="phone">

        <div className="page-header">
          <button className="back-btn" onClick={() => window.history.back()}>←</button>
          <span className="page-title">{i18n("pages.deliveryAddress.title")}</span>
        </div>

        <div className="scroll-area">

          <div className="address-card">
            {showEmptySkeleton && (
              <div className="empty-state">Loading...</div>
            )}

            {!showEmptySkeleton && rows.length === 0 && (
              <div className="empty-state">
                {i18n("pages.deliveryAddress.noAddresses")}
              </div>
            )}

            {!showEmptySkeleton &&
              rows.map((row: any, index: number) => (
                <div
                  className={`address-item${index === 0 ? " first" : ""}`}
                  key={row.id}
                >
                  <div className="address-item-body">
                    <div className="address-text">{row.address}</div>
                    <div className="address-contact">
                      {row.contact} · {row.countryCode || "+1"} {row.contactNumber}
                    </div>
                  </div>
                  <div className="address-item-actions">
                    <span className="icon-btn" onClick={() => openEditModal(row)}>✏️</span>
                    <span className="icon-btn" onClick={() => setConfirmDeleteId(row.id)}>🗑️</span>
                  </div>
                </div>
              ))}
          </div>

          <button className="add-btn" onClick={openAddModal}>
            <span className="plus">+</span> {i18n("pages.deliveryAddress.addAddress")}
          </button>

        </div>

      </div>

      {showModal && (
        <div className="modal-overlay">
          <div className="modal-sheet">

            <div className="page-header">
              <button className="back-btn" onClick={closeModal}>←</button>
              <span className="page-title">
                {editingId
                  ? i18n("pages.deliveryAddress.editModalTitle")
                  : i18n("pages.deliveryAddress.modalTitle")}
              </span>
            </div>

            <div className="modal-body">

              <div className="field-label">
                <span className="required">*</span>
                {i18n("pages.deliveryAddress.addressLabel")}
              </div>
              <input
                type="text"
                className="text-input"
                placeholder={i18n("pages.deliveryAddress.addressPlaceholder")}
                value={address}
                onChange={(event) => setAddress(event.target.value)}
              />

              <div className="field-label sp">
                <span className="required">*</span>
                {i18n("pages.deliveryAddress.contactNumberLabel")}
              </div>
              <div className="phone-input-row">
                <span className="country-code">+1</span>
                <input
                  type="text"
                  className="text-input phone-input"
                  placeholder={i18n("pages.deliveryAddress.contactNumberPlaceholder")}
                  value={contactNumber}
                  onChange={(event) => setContactNumber(event.target.value)}
                />
              </div>

              <div className="field-label sp">
                <span className="required">*</span>
                {i18n("pages.deliveryAddress.contactLabel")}
              </div>
              <input
                type="text"
                className="text-input"
                placeholder={i18n("pages.deliveryAddress.contactPlaceholder")}
                value={contact}
                onChange={(event) => setContact(event.target.value)}
              />

            </div>

            <div className="modal-footer">
              <button className="submit-btn" disabled={saveLoading} onClick={doSubmit}>
                {saveLoading
                  ? "Saving..."
                  : editingId
                  ? i18n("pages.deliveryAddress.saveChanges")
                  : i18n("pages.deliveryAddress.submit")}
              </button>
              <div className="drag-handle"></div>
            </div>

          </div>
        </div>
      )}

      {confirmDeleteId && (
        <div className="modal-overlay">
          <div className="confirm-card">
            <div className="confirm-title">
              {i18n("pages.deliveryAddress.confirmDeleteTitle")}
            </div>
            <div className="confirm-text">
              {i18n("pages.deliveryAddress.confirmDeleteText")}
            </div>
            <div className="confirm-actions">
              <button
                className="confirm-btn cancel"
                disabled={destroyLoading}
                onClick={() => setConfirmDeleteId(null)}
              >
                {i18n("pages.deliveryAddress.cancel")}
              </button>
              <button
                className="confirm-btn delete"
                disabled={destroyLoading}
                onClick={doConfirmDelete}
              >
                {destroyLoading ? "Deleting..." : i18n("pages.deliveryAddress.delete")}
              </button>
            </div>
          </div>
        </div>
      )}

      <style>{`
        :root{
          --navy:#111111;
          --blue-bright:#D1451F;
          --blue-mid:#B93C1A;
          --blue-deep:#7F2B15;
          --white:#FFFFFF;
          --page-bg:#FAFAFA;
          --card-bg:#FFFFFF;
          --grey-text:#555555;
          --grey-light:#F4F4F4;
          --field-border:#E7E7E7;
          --red:#DC2626;
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
          padding:18px 16px 24px;
        }
        .scroll-area::-webkit-scrollbar{ display:none; }

        .address-card{
          background:var(--card-bg);
          border-radius:16px;
          box-shadow:0 8px 20px rgba(0,0,0,0.06);
          min-height:140px;
          display:flex;
          flex-direction:column;
          justify-content:center;
        }
        .empty-state{
          text-align:center;
          color:var(--grey-text);
          font-size:13.5px;
          padding:40px 20px;
        }

        .address-item{
          padding:16px;
          border-top:1px solid var(--grey-light);
          display:flex;
          align-items:flex-start;
          justify-content:space-between;
          gap:10px;
        }
        .address-item.first{ border-top:none; }
        .address-item-body{ flex:1; min-width:0; }
        .address-text{ font-size:13.5px; font-weight:700; color:var(--navy); }
        .address-contact{ font-size:12px; color:var(--grey-text); margin-top:4px; }
        .address-item-actions{
          display:flex;
          gap:12px;
          flex-shrink:0;
        }
        .icon-btn{
          font-size:15px;
          cursor:pointer;
          line-height:1;
        }

        .add-btn{
          width:100%;
          margin-top:16px;
          border:none;
          border-radius:14px;
          padding:15px;
          background:linear-gradient(135deg, var(--blue-bright), var(--blue-deep));
          color:#fff;
          font-size:15px;
          font-weight:800;
          letter-spacing:0.3px;
          cursor:pointer;
          box-shadow:0 10px 22px rgba(209,69,31,0.4);
        }
        .add-btn .plus{ margin-right:6px; }

        /* ---------- Modal / bottom sheet ---------- */
        .modal-overlay{
          position:fixed;
          inset:0;
          background:rgba(17,17,17,0.35);
          display:flex;
          align-items:center;
          justify-content:center;
          z-index:1000;
        }
        .modal-sheet{
          width:390px;
          max-width:390px;
          height:100vh;
          background:var(--page-bg);
          display:flex;
          flex-direction:column;
          margin:0 auto;
          overflow:hidden;
        }

        .modal-body{
          flex:1;
          overflow-y:auto;
          padding:20px 18px;
          scrollbar-width:none;
        }
        .modal-body::-webkit-scrollbar{ display:none; }

        .field-label{
          display:flex;
          align-items:center;
          font-size:13px;
          font-weight:700;
          color:var(--navy);
          margin-bottom:8px;
        }
        .field-label.sp{ margin-top:22px; }
        .required{ color:var(--red); margin-right:3px; }

        .text-input{
          width:100%;
          border:1.5px solid var(--field-border);
          border-radius:12px;
          padding:13px 14px;
          font-size:13.5px;
          color:var(--navy);
          outline:none;
          background:#fff;
        }
        .text-input::placeholder{ color:#888888; }
        .text-input:focus{
          border-color:var(--blue-bright);
          box-shadow:0 0 0 3px rgba(209,69,31,0.12);
        }

        .phone-input-row{
          display:flex;
          gap:10px;
        }
        .country-code{
          flex-shrink:0;
          display:flex;
          align-items:center;
          justify-content:center;
          padding:0 14px;
          border:1.5px solid var(--field-border);
          border-radius:12px;
          font-size:13.5px;
          font-weight:600;
          color:var(--navy);
          background:#fff;
        }
        .phone-input{ flex:1; }

        .modal-footer{
          flex-shrink:0;
          padding:14px 18px 22px;
          border-top:1px solid var(--grey-light);
          background:var(--page-bg);
        }
        .submit-btn{
          width:100%;
          border:none;
          border-radius:14px;
          padding:15px;
          background:linear-gradient(135deg, var(--blue-bright), var(--blue-deep));
          color:#fff;
          font-size:15px;
          font-weight:800;
          letter-spacing:0.3px;
          cursor:pointer;
          box-shadow:0 10px 22px rgba(209,69,31,0.4);
        }
        .submit-btn:disabled{ opacity:0.6; cursor:not-allowed; }

        .drag-handle{
          width:44px;
          height:5px;
          border-radius:3px;
          background:#E7E7E7;
          margin:12px auto 0;
        }

        /* ---------- Confirm delete ---------- */
        .confirm-card{
          width:300px;
          max-width:88%;
          background:#fff;
          border-radius:16px;
          padding:22px 20px;
          text-align:center;
          box-shadow:0 20px 40px rgba(0,0,0,0.25);
        }
        .confirm-title{ font-size:15px; font-weight:800; color:var(--navy); }
        .confirm-text{ font-size:12.5px; color:var(--grey-text); margin-top:8px; line-height:1.5; }
        .confirm-actions{ display:flex; gap:10px; margin-top:20px; }
        .confirm-btn{
          flex:1;
          border:none;
          border-radius:12px;
          padding:12px;
          font-size:13.5px;
          font-weight:700;
          cursor:pointer;
        }
        .confirm-btn:disabled{ opacity:0.6; cursor:not-allowed; }
        .confirm-btn.cancel{ background:var(--grey-light); color:var(--navy); }
        .confirm-btn.delete{ background:var(--red); color:#fff; }
      `}</style>
    </>
  );
}

export default DeliveryAddress;
