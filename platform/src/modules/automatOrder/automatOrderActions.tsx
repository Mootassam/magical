import Errors from 'src/modules/shared/error/errors';
import AutomatOrderService from 'src/modules/automatOrder/automatOrderService';

const prefix = 'AUTOMAT_ORDER';

const automatOrderActions = {
  FETCH_STARTED: `${prefix}_FETCH_STARTED`,
  FETCH_SUCCESS: `${prefix}_FETCH_SUCCESS`,
  FETCH_ERROR: `${prefix}_FETCH_ERROR`,

  doFetchMine: () => async (dispatch) => {
    try {
      dispatch({
        type: automatOrderActions.FETCH_STARTED,
      });

      const rows = await AutomatOrderService.findByUserStore();

      dispatch({
        type: automatOrderActions.FETCH_SUCCESS,
        payload: rows,
      });
    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: automatOrderActions.FETCH_ERROR,
      });
    }
  },
};

export default automatOrderActions;
