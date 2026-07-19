import React, { useRef, useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { i18n } from 'src/i18n';

function StoreEditModal(props) {
  const { store, onClose, onSave, saving } = props;
  const modalRef = useRef<any>();

  const [storeRating, setStoreRating] = useState(store.storeRating ?? 5);
  const [creditScore, setCreditScore] = useState(store.creditScore ?? 100);
  const [numberOfFollowers, setNumberOfFollowers] = useState(
    store.numberOfFollowers ?? 0,
  );

  useEffect(() => {
    (window as any).$(modalRef.current).modal('show');
    (window as any).$(modalRef.current).on('hidden.bs.modal', onClose);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const hide = () => {
    (window as any).$(modalRef.current).modal('hide');
  };

  const handleSave = async () => {
    const success = await onSave({
      storeRating: Number(storeRating),
      creditScore: Number(creditScore),
      numberOfFollowers: Number(numberOfFollowers),
    });

    if (success) {
      hide();
    }
  };

  return ReactDOM.createPortal(
    <div ref={modalRef} className="modal" tabIndex={-1}>
      <div className="modal-dialog modal-sm">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">
              {i18n('entities.store.editModal.title')}
            </h5>
            <button type="button" className="close" data-dismiss="modal">
              <span>&times;</span>
            </button>
          </div>
          <div className="modal-body">
            <div className="form-group">
              <label>{i18n('entities.store.fields.storeRating')}</label>
              <input
                type="number"
                className="form-control"
                min={0}
                max={5}
                step={0.1}
                value={storeRating}
                onChange={(event) => setStoreRating(event.target.value as any)}
              />
            </div>
            <div className="form-group">
              <label>{i18n('entities.store.fields.creditScore')}</label>
              <input
                type="number"
                className="form-control"
                value={creditScore}
                onChange={(event) => setCreditScore(event.target.value as any)}
              />
            </div>
            <div className="form-group">
              <label>{i18n('entities.store.fields.numberOfFollowers')}</label>
              <input
                type="number"
                className="form-control"
                min={0}
                value={numberOfFollowers}
                onChange={(event) =>
                  setNumberOfFollowers(event.target.value as any)
                }
              />
            </div>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-light btn-sm"
              data-dismiss="modal"
            >
              {i18n('common.cancel')}
            </button>
            <button
              type="button"
              disabled={saving}
              onClick={handleSave}
              className="btn btn-primary btn-sm"
            >
              {i18n('common.save')}
            </button>
          </div>
        </div>
      </div>
    </div>,
    (document as any).getElementById('modal-root'),
  );
}

export default StoreEditModal;
