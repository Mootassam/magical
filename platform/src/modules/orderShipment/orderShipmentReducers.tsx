import actions from 'src/modules/orderShipment/orderShipmentActions';

const initialData = {
  rows: [] as Array<any>,
  loading: false,
  shippingId: null as string | null,
};

export default (state = initialData, { type, payload }) => {
  if (type === actions.FETCH_STARTED) {
    return {
      ...state,
      loading: true,
    };
  }

  if (type === actions.FETCH_SUCCESS) {
    return {
      ...state,
      loading: false,
      rows: payload,
    };
  }

  if (type === actions.FETCH_ERROR) {
    return {
      ...state,
      loading: false,
    };
  }

  if (type === actions.CREATE_STARTED) {
    return {
      ...state,
      shippingId: payload,
    };
  }

  if (type === actions.CREATE_SUCCESS) {
    return {
      ...state,
      shippingId: null,
    };
  }

  if (type === actions.CREATE_ERROR) {
    return {
      ...state,
      shippingId: null,
    };
  }

  return state;
};
