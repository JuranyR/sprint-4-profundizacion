import { orderTypes } from "../types/orderTypes";
const initialState = {
  orders: [],
  status: "loading",
  currentOrder: {},
};

export const orderReducer = (state = initialState, action) => {
  switch (action.type) {
    case orderTypes.CREATE_ORDER:
      return {
        ...state,
        orders: [...state.orders, action.payload.order],
        status: action.payload.status,
      };

    case orderTypes.GET_ORDERS:
      return {
        ...state,
        orders: [...action.payload],
      };

    case orderTypes.DELETE_ORDER:
      return {
        ...state,
        orders: state.orders.filter((order) => order.id !== action.payload.id),
        status: action.payload.status,
      };

    case orderTypes.CURRENT_ORDER:
      return {
        ...state,
        currentOrder: action.payload,
      };

    case orderTypes.UPDATE_ORDER:
      const dummyOrders = [...state.orders];
      const orderIndex = dummyOrders.findIndex(
        (order) => order.id === action.payload.order.id
      );
      dummyOrders[orderIndex] = action.payload.order;

      return {
        ...state,
        orders: [...dummyOrders],
        status: action.payload.status,
      };
    default:
      return state;
  }
};