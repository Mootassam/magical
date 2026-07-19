import selectors from 'src/modules/product/list/productListSelectors';
import { i18n } from 'src/i18n';
import exporterFields from 'src/modules/product/list/productListExporterFields';
import Errors from 'src/modules/shared/error/errors';
import Exporter from 'src/modules/shared/exporter/exporter';
import ProductService from 'src/modules/product/productService';
import Message from 'src/view/shared/message';

const prefix = 'PRODUCT_LIST';

const productListActions = {
  FETCH_STARTED: `${prefix}_FETCH_STARTED`,
  FETCH_SUCCESS: `${prefix}_FETCH_SUCCESS`,
  FETCH_ERROR: `${prefix}_FETCH_ERROR`,

  RESETED: `${prefix}_RESETED`,
  TOGGLE_ONE_SELECTED: `${prefix}_TOGGLE_ONE_SELECTED`,
  TOGGLE_ALL_SELECTED: `${prefix}_TOGGLE_ALL_SELECTED`,
  CLEAR_ALL_SELECTED: `${prefix}_CLEAR_ALL_SELECTED`,

  PAGINATION_CHANGED: `${prefix}_PAGINATION_CHANGED`,
  SORTER_CHANGED: `${prefix}_SORTER_CHANGED`,

  EXPORT_STARTED: `${prefix}_EXPORT_STARTED`,
  EXPORT_SUCCESS: `${prefix}_EXPORT_SUCCESS`,
  EXPORT_ERROR: `${prefix}_EXPORT_ERROR`,

  HUGGINGFACE_IMPORT_STARTED: `${prefix}_HUGGINGFACE_IMPORT_STARTED`,
  HUGGINGFACE_IMPORT_SUCCESS: `${prefix}_HUGGINGFACE_IMPORT_SUCCESS`,
  HUGGINGFACE_IMPORT_ERROR: `${prefix}_HUGGINGFACE_IMPORT_ERROR`,

  doClearAllSelected() {
    return {
      type: productListActions.CLEAR_ALL_SELECTED,
    };
  },

  doToggleAllSelected() {
    return {
      type: productListActions.TOGGLE_ALL_SELECTED,
    };
  },

  doToggleOneSelected(id) {
    return {
      type: productListActions.TOGGLE_ONE_SELECTED,
      payload: id,
    };
  },

  doReset: () => async (dispatch) => {
    dispatch({
      type: productListActions.RESETED,
    });

    dispatch(productListActions.doFetch());
  },

  doExport: () => async (dispatch, getState) => {
    try {
      if (!exporterFields || !exporterFields.length) {
        throw new Error('exporterFields is required');
      }

      dispatch({
        type: productListActions.EXPORT_STARTED,
      });

      const filter = selectors.selectFilter(getState());
      const response = await ProductService.list(
        filter,
        selectors.selectOrderBy(getState()),
        null,
        null,
      );

      new Exporter(
        exporterFields,
        i18n('entities.product.exporterFileName'),
      ).transformAndExportAsExcelFile(response.rows);

      dispatch({
        type: productListActions.EXPORT_SUCCESS,
      });
    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: productListActions.EXPORT_ERROR,
      });
    }
  },

  doChangePagination:
    (pagination) => async (dispatch, getState) => {
      dispatch({
        type: productListActions.PAGINATION_CHANGED,
        payload: pagination,
      });

      dispatch(productListActions.doFetchCurrentFilter());
    },

  doChangeSort: (sorter) => async (dispatch, getState) => {
    dispatch({
      type: productListActions.SORTER_CHANGED,
      payload: sorter,
    });

    dispatch(productListActions.doFetchCurrentFilter());
  },

  doFetchCurrentFilter:
    () => async (dispatch, getState) => {
      const filter = selectors.selectFilter(getState());
      const rawFilter = selectors.selectRawFilter(
        getState(),
      );
      dispatch(
        productListActions.doFetch(filter, rawFilter, true),
      );
    },

  doFetch:
    (filter?, rawFilter?, keepPagination = false) =>
    async (dispatch, getState) => {
      try {
        dispatch({
          type: productListActions.FETCH_STARTED,
          payload: { filter, rawFilter, keepPagination },
        });

        const response = await ProductService.list(
          filter,
          selectors.selectOrderBy(getState()),
          selectors.selectLimit(getState()),
          selectors.selectOffset(getState()),
        );

        dispatch({
          type: productListActions.FETCH_SUCCESS,
          payload: {
            rows: response.rows,
            count: response.count,
          },
        });
      } catch (error) {
        Errors.handle(error);

        dispatch({
          type: productListActions.FETCH_ERROR,
        });
      }
    },

  doImportFromHuggingFace: () => async (dispatch) => {
    try {
      dispatch({
        type: productListActions.HUGGINGFACE_IMPORT_STARTED,
      });

      const result = await ProductService.importFromHuggingFace();

      dispatch({
        type: productListActions.HUGGINGFACE_IMPORT_SUCCESS,
      });

      const failedDatasets = (result.datasets || []).filter(
        (dataset) => dataset.error,
      );
      const hasImports =
        result.categoriesCreated > 0 || result.productsCreated > 0;

      if (!hasImports && failedDatasets.length > 0) {
        Message.error(
          `Import failed: ${failedDatasets
            .map((dataset) => `${dataset.dataset} (${dataset.error})`)
            .join('; ')}`,
        );
      } else {
        let successMessage = i18n(
          'entities.product.importHuggingFace.success',
          result.categoriesCreated,
          result.productsCreated,
        );

        if (result.backgroundImport?.status === 'started') {
          successMessage += i18n(
            'entities.product.importHuggingFace.backgroundImportStarted',
          );
        }

        Message.success(successMessage);
      }

      dispatch(productListActions.doFetch());
    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: productListActions.HUGGINGFACE_IMPORT_ERROR,
      });
    }
  },
};

export default productListActions;
