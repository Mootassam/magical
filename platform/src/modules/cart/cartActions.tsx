import CartStorage from 'src/modules/cart/cartStorage';
import Message from 'src/view/shared/message';
import { i18n } from '../../i18n';

const prefix = 'CART';

const cartActions = {
  INIT: `${prefix}_INIT`,
  ADD_ITEM: `${prefix}_ADD_ITEM`,
  REMOVE_ITEM: `${prefix}_REMOVE_ITEM`,
  UPDATE_QTY: `${prefix}_UPDATE_QTY`,
  CLEAR: `${prefix}_CLEAR`,

  doInit: () => (dispatch) => {
    dispatch({
      type: cartActions.INIT,
      payload: CartStorage.get(),
    });
  },

  doAddItem: (product, qty = 1) => (dispatch, getState) => {
    dispatch({
      type: cartActions.ADD_ITEM,
      payload: {
        id: product.id,
        title: product.title,
        image: product.image,
        price: product.price,
        qty,
      },
    });

    CartStorage.set(getState().cart.items);
    Message.success(i18n('pages.cart.addedToCart'));
  },

  doRemoveItem: (id) => (dispatch, getState) => {
    dispatch({
      type: cartActions.REMOVE_ITEM,
      payload: id,
    });

    CartStorage.set(getState().cart.items);
  },

  doUpdateQty: (id, qty) => (dispatch, getState) => {
    dispatch({
      type: cartActions.UPDATE_QTY,
      payload: { id, qty },
    });

    CartStorage.set(getState().cart.items);
  },

  doClear: () => (dispatch) => {
    dispatch({
      type: cartActions.CLEAR,
    });

    CartStorage.clear();
  },
};

export default cartActions;
