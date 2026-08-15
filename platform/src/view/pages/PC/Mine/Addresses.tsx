import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { i18n } from "../../../../i18n";
import deliveryAddressActions from "src/modules/deliveryAddress/deliveryAddressActions";
import deliveryAddressSelectors from "src/modules/deliveryAddress/deliveryAddressSelectors";
import Message from "src/view/shared/message";
import MineShell from "./MineShell";
import { sharedMineStyles } from "./MyAccount";

function Addresses() {
  const dispatch = useDispatch();
  const rows = useSelector(deliveryAddressSelectors.selectRows);
  const loading = useSelector(deliveryAddressSelectors.selectLoading);
  const saveLoading = useSelector(deliveryAddressSelectors.selectSaveLoading);
  const destroyLoading = useSelector(deliveryAddressSelectors.selectDestroyLoading);

  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);

  const [address, setAddress] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [contact, setContact] = useState("");

  useEffect(() => {
    dispatch(deliveryAddressActions.doFetch());
  }, [dispatch]);

  const openAddForm = () => {
    setEditingId(null);
    setAddress("");
    setContactNumber("");
    setContact("");
    setShowForm(true);
  };

  const openEditForm = (row: any) => {
    setEditingId(row.id);
    setAddress(row.address || "");
    setContactNumber(row.contactNumber || "");
    setContact(row.contact || "");
    setShowForm(true);
  };

  const doSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

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
      await dispatch(deliveryAddressActions.doUpdate(editingId, values) as any);
    } else {
      await dispatch(deliveryAddressActions.doCreate(values) as any);
    }

    setShowForm(false);
  };

  const doConfirmDelete = async (id: string) => {
    await dispatch(deliveryAddressActions.doDestroy(id) as any);
    setConfirmDeleteId(null);
  };

  return (
    <MineShell active="addresses">
      <div className="pc-mine__addr-head">
        <h1 className="pc-mine__page-title">{i18n("estore.pc.addresses.title")}</h1>
        <button type="button" className="pc-btn pc-btn-primary" onClick={openAddForm}>
          {i18n("estore.pc.addresses.addAddress")}
        </button>
      </div>

      {showForm && (
        <div className="pc-card pc-mine__panel pc-mine__addr-form-panel">
          <h2>{editingId ? i18n("estore.pc.addresses.editAddress") : i18n("estore.pc.addresses.addNewAddress")}</h2>
          <form onSubmit={doSubmit}>
            <label className="pc-mine__field-label">{i18n("estore.pc.addresses.address")}</label>
            <textarea
              className="pc-input pc-mine__textarea"
              value={address}
              onChange={(event) => setAddress(event.target.value)}
              placeholder={i18n("estore.pc.addresses.addressPlaceholder")}
              rows={3}
            />

            <label className="pc-mine__field-label">{i18n("estore.pc.addresses.contactName")}</label>
            <input
              className="pc-input"
              value={contact}
              onChange={(event) => setContact(event.target.value)}
              placeholder={i18n("estore.pc.addresses.contactNamePlaceholder")}
            />

            <label className="pc-mine__field-label">{i18n("estore.pc.addresses.contactNumber")}</label>
            <input
              className="pc-input"
              value={contactNumber}
              onChange={(event) => setContactNumber(event.target.value)}
              placeholder={i18n("estore.pc.addresses.contactNumberPlaceholder")}
            />

            <div className="pc-mine__form-actions">
              <button type="button" className="pc-btn pc-btn-ghost" onClick={() => setShowForm(false)}>
                {i18n("estore.pc.addresses.cancel")}
              </button>
              <button className="pc-btn pc-btn-primary" disabled={saveLoading} type="submit">
                {saveLoading ? i18n("estore.pc.addresses.saving") : i18n("estore.pc.addresses.saveAddress")}
              </button>
            </div>
          </form>
        </div>
      )}

      {loading && rows.length === 0 && (
        <div className="pc-mine__addr-grid">
          {Array.from({ length: 2 }).map((_, index) => (
            <div className="pc-card pc-mine__addr-card" key={index}>
              <div className="pc-skeleton" style={{ height: 16, width: "70%", marginBottom: 10 }} />
              <div className="pc-skeleton" style={{ height: 14, width: "50%" }} />
            </div>
          ))}
        </div>
      )}

      {!loading && rows.length === 0 && !showForm && (
        <div className="pc-card pc-mine__empty">
          <div className="pc-mine__empty-icon">📍</div>
          <div className="pc-mine__empty-title">{i18n("estore.pc.addresses.emptyTitle")}</div>
          <div className="pc-mine__empty-text">{i18n("estore.pc.addresses.emptyText")}</div>
          <button type="button" className="pc-btn pc-btn-primary" onClick={openAddForm}>
            {i18n("estore.pc.addresses.addAddress")}
          </button>
        </div>
      )}

      {rows.length > 0 && (
        <div className="pc-mine__addr-grid">
          {rows.map((row: any) => (
            <div className="pc-card pc-mine__addr-card" key={row.id}>
              <div className="pc-mine__addr-text">{row.address}</div>
              <div className="pc-mine__addr-contact">
                {row.contact} · {row.countryCode || "+1"} {row.contactNumber}
              </div>

              {confirmDeleteId === row.id ? (
                <div className="pc-mine__addr-confirm">
                  <span>{i18n("estore.pc.addresses.deleteConfirm")}</span>
                  <button
                    type="button"
                    className="pc-mine__link-btn pc-mine__link-btn--danger"
                    disabled={destroyLoading}
                    onClick={() => doConfirmDelete(row.id)}
                  >
                    {i18n("estore.pc.addresses.yesDelete")}
                  </button>
                  <button type="button" className="pc-mine__link-btn" onClick={() => setConfirmDeleteId(null)}>
                    {i18n("estore.pc.addresses.cancel")}
                  </button>
                </div>
              ) : (
                <div className="pc-mine__addr-actions">
                  <button type="button" className="pc-mine__link-btn" onClick={() => openEditForm(row)}>
                    {i18n("estore.pc.addresses.edit")}
                  </button>
                  <button
                    type="button"
                    className="pc-mine__link-btn pc-mine__link-btn--danger"
                    onClick={() => setConfirmDeleteId(row.id)}
                  >
                    {i18n("estore.pc.addresses.delete")}
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      <style>{sharedMineStyles}</style>
      <style>{`
        .pc-mine__addr-head {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 20px;
        }

        .pc-mine__addr-head .pc-mine__page-title {
          margin: 0;
        }

        .pc-mine__addr-form-panel {
          padding: 24px;
          max-width: 480px;
          margin-bottom: 24px;
        }

        .pc-mine__addr-form-panel h2 {
          font-size: 15px;
          font-weight: 800;
          color: var(--pc-text);
          margin: 0 0 18px;
        }

        .pc-mine__textarea {
          resize: vertical;
          font-family: inherit;
          margin-bottom: 16px;
        }

        .pc-mine__addr-form-panel input {
          margin-bottom: 16px;
        }

        .pc-mine__addr-grid {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 16px;
        }

        .pc-mine__addr-card {
          padding: 20px;
        }

        .pc-mine__addr-text {
          font-size: 14px;
          font-weight: 600;
          color: var(--pc-text);
          margin-bottom: 6px;
          line-height: 1.5;
        }

        .pc-mine__addr-contact {
          font-size: 12.5px;
          color: var(--pc-text-muted);
          margin-bottom: 14px;
        }

        .pc-mine__addr-actions,
        .pc-mine__addr-confirm {
          display: flex;
          gap: 16px;
          padding-top: 12px;
          border-top: 1px solid var(--pc-divider);
        }

        .pc-mine__addr-confirm {
          align-items: center;
          font-size: 12.5px;
          color: var(--pc-text-secondary);
        }

        .pc-mine__link-btn--danger {
          color: var(--pc-danger);
        }

        @media (max-width: 700px) {
          .pc-mine__addr-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </MineShell>
  );
}

export default Addresses;
