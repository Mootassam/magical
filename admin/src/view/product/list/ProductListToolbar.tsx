import { i18n } from 'src/i18n';
import auditLogSelectors from 'src/modules/auditLog/auditLogSelectors';
import couponsSelectors from 'src/modules/product/productSelectors';
import destroyActions from 'src/modules/product/destroy/productDestroyActions';
import destroySelectors from 'src/modules/product/destroy/productDestroySelectors';
import actions from 'src/modules/product/list/productListActions';
import selectors from 'src/modules/product/list/productListSelectors';
import React, { useEffect, useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import ConfirmModal from 'src/view/shared/modals/ConfirmModal';
import ButtonIcon from 'src/view/shared/ButtonIcon';
import Toolbar from 'src/view/shared/styles/Toolbar';
import Message from 'src/view/shared/message';
import ReactTooltip from 'react-tooltip';

const IMPORT_STATUS_POLL_MS = 5000;

function CouponsToolbar(props) {
  const [
    destroyAllConfirmVisible,
    setDestroyAllConfirmVisible,
  ] = useState(false);

  const [
    destroyAllRecordsConfirmVisible,
    setDestroyAllRecordsConfirmVisible,
  ] = useState(false);

  const [
    huggingFaceConfirmVisible,
    setHuggingFaceConfirmVisible,
  ] = useState(false);

  const dispatch = useDispatch();

  const selectedKeys = useSelector(
    selectors.selectSelectedKeys,
  );
  const loading = useSelector(selectors.selectLoading);
  const destroyLoading = useSelector(
    destroySelectors.selectLoading,
  );
  const exportLoading = useSelector(
    selectors.selectExportLoading,
  );
  const hasRows = useSelector(selectors.selectHasRows);
  const hasPermissionToAuditLogs = useSelector(
    auditLogSelectors.selectPermissionToRead,
  );
  const hasPermissionToDestroy = useSelector(
    couponsSelectors.selectPermissionToDestroy,
  );
  const hasPermissionToCreate = useSelector(
    couponsSelectors.selectPermissionToCreate,
  );
  const hasPermissionToImport = useSelector(
    couponsSelectors.selectPermissionToImport,
  );
  const hasPermissionToImportHuggingFace = useSelector(
    couponsSelectors.selectPermissionToImportHuggingFace,
  );
  const huggingFaceImportLoading = useSelector(
    selectors.selectHuggingFaceImportLoading,
  );
  const importStatus = useSelector(selectors.selectImportStatus);

  const previousImportStatusRef = useRef<string | undefined>(undefined);

  // Poll for progress on the (potentially very long-running) background
  // catalog import - once on mount, so returning admins can see an import
  // that's still going or that failed while they were away, then every few
  // seconds for as long as it's actively running.
  useEffect(() => {
    if (!hasPermissionToImportHuggingFace) {
      return;
    }

    dispatch(actions.doFetchImportStatus());

    const interval = setInterval(() => {
      dispatch(actions.doFetchImportStatus());
    }, IMPORT_STATUS_POLL_MS);

    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, hasPermissionToImportHuggingFace]);

  useEffect(() => {
    const previousStatus = previousImportStatusRef.current;

    if (
      previousStatus === 'running' &&
      importStatus?.status === 'completed'
    ) {
      Message.success(
        i18n(
          'entities.product.importHuggingFace.progressCompleted',
          importStatus.rowsProcessed,
          importStatus.productsCreated,
        ),
      );
      dispatch(actions.doFetch());
    }

    if (previousStatus === 'running' && importStatus?.status === 'failed') {
      Message.error(
        i18n(
          'entities.product.importHuggingFace.progressFailed',
          importStatus.errorMessage || 'unknown error',
        ),
      );
    }

    previousImportStatusRef.current = importStatus?.status;
  }, [importStatus, dispatch]);

  const doOpenDestroyAllConfirmModal = () => {
    setDestroyAllConfirmVisible(true);
  };

  const doCloseDestroyAllConfirmModal = () => {
    setDestroyAllConfirmVisible(false);
  };

  const doExport = () => {
    dispatch(actions.doExport());
  };

  const doDestroyAllSelected = () => {
    doCloseDestroyAllConfirmModal();

    dispatch(destroyActions.doDestroyAll(selectedKeys));
  };

  const doDestroyAllRecords = () => {
    setDestroyAllRecordsConfirmVisible(false);

    dispatch(destroyActions.doDestroyAllRecords());
  };

  const doImportFromHuggingFace = () => {
    setHuggingFaceConfirmVisible(false);
    dispatch(actions.doImportFromHuggingFace());
  };

  const renderExportButton = () => {
    const disabled = !hasRows || loading;

    const button = (
      <span
        data-tip={i18n('common.export')}
        data-for="charge-list-toolbar-export"
      >
        <button
          className="btnCircle btn-light"
          disabled={disabled}
          onClick={doExport}
          type="button"
        >
          <ButtonIcon
            loading={exportLoading}
            iconClass="far fa-file-excel"
          />
        </button>
        <ReactTooltip id="charge-list-toolbar-export" />
      </span>
    );

    if (disabled) {
      return (
        <span
          data-tip={i18n('common.noDataToExport')}
          data-tip-disable={!disabled}
          data-for="coupons-list-toolbar-export-tooltip"
        >
          {button}
          <ReactTooltip id="coupons-list-toolbar-export-tooltip" />
        </span>
      );
    }

    return button;
  };

  const renderDestroyButton = () => {
    if (!hasPermissionToDestroy) {
      return null;
    }

    const disabled = !selectedKeys.length || loading;

    const button = (
      <button
        disabled={disabled}
        className="btn btn-primary"
        type="button"
        onClick={doOpenDestroyAllConfirmModal}
      >
        <ButtonIcon
          loading={destroyLoading}
          iconClass="far fa-trash-alt"
        />
      </button>
    );

    if (disabled) {
      return (
        <span
          data-tip={i18n('common.mustSelectARow')}
          data-tip-disable={!disabled}
          data-for="coupons-list-toolbar-destroy-tooltip"
        >
          {button}
          <ReactTooltip id="coupons-list-toolbar-destroy-tooltip" />
        </span>
      );
    }

    return button;
  };

  const renderDestroyAllRecordsButton = () => {
    if (!hasPermissionToDestroy) {
      return null;
    }

    const disabled = !hasRows || loading;

    const button = (
      <button
        disabled={disabled}
        className="btn btn-danger"
        type="button"
        onClick={() => setDestroyAllRecordsConfirmVisible(true)}
      >
        <ButtonIcon
          loading={destroyLoading}
          iconClass="far fa-trash-alt"
        />
        &nbsp;{i18n('common.deleteAll')}
      </button>
    );

    if (disabled) {
      return (
        <span
          data-tip={i18n('common.noDataToExport')}
          data-tip-disable={!disabled}
          data-for="product-list-toolbar-destroy-all-records-tooltip"
        >
          {button}
          <ReactTooltip id="product-list-toolbar-destroy-all-records-tooltip" />
        </span>
      );
    }

    return button;
  };

  return (
    <Toolbar>
      {hasPermissionToCreate && (
        <Link to="/product/new">
          <span
            data-tip={i18n('common.new')}
            data-for="charge-list-toolbar-new-tooltip"
          >
            <button
              className="btn btn-primary"
              type="button"
            >
              <ButtonIcon iconClass="fas fa-plus" />
            </button>
            <ReactTooltip id="charge-list-toolbar-new-tooltip" />
          </span>
        </Link>
      )}
{/*
      {hasPermissionToImport && (
        <Link to="/product/importer">
          <span
            data-tip={i18n('common.import')}
            data-for="charge-list-toolbar-import-tooltip"
          >
            <button
              className="btn btn-primary"
              type="button"
            >
              <ButtonIcon iconClass="fas fa-upload" />
            </button>
            <ReactTooltip id="charge-list-toolbar-import-tooltip" />
          </span>
        </Link>
      )} */}

      {hasPermissionToImportHuggingFace && (
        <button
          className="btn btn-primary"
          type="button"
          disabled={huggingFaceImportLoading}
          onClick={() => setHuggingFaceConfirmVisible(true)}
        >
          <ButtonIcon
            loading={huggingFaceImportLoading}
            iconClass="fas fa-cloud-download-alt"
          />
          &nbsp;{i18n('entities.product.importHuggingFace.button')}
        </button>
      )}

      {hasPermissionToImportHuggingFace && importStatus?.status === 'running' && (
        <span className="text-muted" style={{ fontSize: '0.85em', marginLeft: 8 }}>
          <i className="fas fa-spinner fa-spin" />
          &nbsp;
          {i18n(
            'entities.product.importHuggingFace.progressRunning',
            (importStatus.rowsProcessed || 0).toLocaleString(),
            (importStatus.productsCreated || 0).toLocaleString(),
          )}
        </span>
      )}

      {hasPermissionToImportHuggingFace && importStatus?.status === 'failed' && (
        <span className="text-danger" style={{ fontSize: '0.85em', marginLeft: 8 }}>
          <i className="fas fa-exclamation-triangle" />
          &nbsp;
          {i18n(
            'entities.product.importHuggingFace.progressFailed',
            importStatus.errorMessage || 'unknown error',
          )}
        </span>
      )}

      {renderDestroyButton()}
      {renderDestroyAllRecordsButton()}
{/*
      {hasPermissionToAuditLogs && (
        <Link to="/audit-logs?entityNames=coupons">
          <span
            data-tip={i18n('auditLog.menu')}
            data-for="charge-list-toolbar-auditLog-tooltip"
          >
            <button
              className="btnCircle btn-light"
              type="button"
            >
              <ButtonIcon iconClass="fas fa-history" />
            </button>
            <ReactTooltip id="charge-list-toolbar-auditLog-tooltip" />
          </span>
        </Link>
      )}

      {renderExportButton()} */}

      {destroyAllConfirmVisible && (
        <ConfirmModal
          title={i18n('common.areYouSure')}
          onConfirm={() => doDestroyAllSelected()}
          onClose={() => doCloseDestroyAllConfirmModal()}
          okText={i18n('common.yes')}
          cancelText={i18n('common.no')}
        />
      )}

      {destroyAllRecordsConfirmVisible && (
        <ConfirmModal
          title={i18n('entities.product.destroyAllRecords.confirm')}
          onConfirm={() => doDestroyAllRecords()}
          onClose={() => setDestroyAllRecordsConfirmVisible(false)}
          okText={i18n('common.yes')}
          cancelText={i18n('common.no')}
        />
      )}

      {huggingFaceConfirmVisible && (
        <ConfirmModal
          title={i18n('entities.product.importHuggingFace.confirm')}
          onConfirm={() => doImportFromHuggingFace()}
          onClose={() => setHuggingFaceConfirmVisible(false)}
          okText={i18n('common.yes')}
          cancelText={i18n('common.no')}
        />
      )}
    </Toolbar>
  );
}

export default CouponsToolbar;
