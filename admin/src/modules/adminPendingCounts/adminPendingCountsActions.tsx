import Errors from 'src/modules/shared/error/errors';
import AdminPendingCountsService from 'src/modules/adminPendingCounts/adminPendingCountsService';
import adminPendingCountsSelectors from 'src/modules/adminPendingCounts/adminPendingCountsSelectors';
import socketClient from 'src/modules/shared/socket/socketClient';
import playAlertSound from 'src/modules/adminPendingCounts/playAlertSound';

const prefix = 'ADMIN_PENDING_COUNTS';

function sumCounts(counts) {
  if (!counts) {
    return 0;
  }

  return Object.values(counts).reduce(
    (sum: number, value: any) => sum + (Number(value) || 0),
    0,
  ) as number;
}

const adminPendingCountsActions = {
  FETCH_STARTED: `${prefix}_FETCH_STARTED`,
  FETCH_SUCCESS: `${prefix}_FETCH_SUCCESS`,
  FETCH_ERROR: `${prefix}_FETCH_ERROR`,

  COUNTS_RECEIVED: `${prefix}_COUNTS_RECEIVED`,

  doFetch: () => async (dispatch) => {
    try {
      dispatch({
        type: adminPendingCountsActions.FETCH_STARTED,
      });

      const counts = await AdminPendingCountsService.fetch();

      dispatch({
        type: adminPendingCountsActions.FETCH_SUCCESS,
        payload: counts,
      });
    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: adminPendingCountsActions.FETCH_ERROR,
      });
    }
  },

  doReceiveCounts: (counts) => (dispatch, getState) => {
    const isInitialized = adminPendingCountsSelectors.selectInitialized(
      getState(),
    );

    if (isInitialized) {
      const previous = adminPendingCountsSelectors.selectCounts(getState());

      if (sumCounts(counts) > sumCounts(previous)) {
        playAlertSound();
      }
    }

    dispatch({
      type: adminPendingCountsActions.COUNTS_RECEIVED,
      payload: counts,
    });
  },

  doInit: () => (dispatch) => {
    dispatch(adminPendingCountsActions.doFetch());

    const socket = socketClient.getSocket();

    if (!socket) {
      return;
    }

    socket.off('admin:pendingCounts');
    socket.on('admin:pendingCounts', (counts) => {
      dispatch(adminPendingCountsActions.doReceiveCounts(counts));
    });
  },
};

export default adminPendingCountsActions;
