import actions from 'src/modules/cart/cartActions';

const initialData = {
  items: [] as Array<any>,
};

export default (state = initialData, { type, payload }) => {
  if (type === actions.INIT) {
    return {
      ...state,
      items: payload || [],
    };
  }

  if (type === actions.ADD_ITEM) {
    const existing = state.items.find((item) => item.id === payload.id);

    if (existing) {
      return {
        ...state,
        items: state.items.map((item) =>
          item.id === payload.id
            ? { ...item, qty: item.qty + payload.qty }
            : item,
        ),
      };
    }

    return {
      ...state,
      items: [...state.items, payload],
    };
  }

  if (type === actions.REMOVE_ITEM) {
    return {
      ...state,
      items: state.items.filter((item) => item.id !== payload),
    };
  }

  if (type === actions.UPDATE_QTY) {
    if (payload.qty <= 0) {
      return {
        ...state,
        items: state.items.filter((item) => item.id !== payload.id),
      };
    }

    return {
      ...state,
      items: state.items.map((item) =>
        item.id === payload.id ? { ...item, qty: payload.qty } : item,
      ),
    };
  }

  if (type === actions.CLEAR) {
    return {
      ...state,
      items: [],
    };
  }

  return state;
};
