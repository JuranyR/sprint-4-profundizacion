import { orderTypes } from "../types/orderTypes";
import { createItemActionAsync,updateItemActionAsync, getItemsSubCollectionActionAsync, getItemsByIdActionAsync } from '../../services/crudColection';

export const currentOrderAction = (order) => {
  return {
    type: orderTypes.CURRENT_ORDER,
    payload: order,
  };
};

export const createOrderActionAsync = (order) => {
  return async (dispatch) => {
    try {
      const orderDoc = await createItemActionAsync(order,`restaurants/${order.restaurant}/orders`);
      dispatch(createOrderAction(orderDoc));
      return orderDoc
    } catch (error) {
      console.log(error);
      dispatch(
        createOrderAction({
          order: {},
          status: "error",
        })
      );
    }
  };
};

const createOrderAction = (order) => {
  return {
    type: orderTypes.CREATE_ORDER,
    payload: { ...order },
  };
};


export const getOrdersActionAsync = () => {
  return async (dispatch) => {
    try {
      const orders = await getItemsSubCollectionActionAsync("orders");
      dispatch(getOrdersAction(orders));
    } catch (error) {
      dispatch(getOrdersAction([]));
    }
  };
};

const getOrdersAction = (orders) => {
  return {
    type: orderTypes.GET_ORDERS,
    payload: [...orders],
  };
};


export const updateCurentOrderActionAsync = (order, orderId) => {
  return async (dispatch) => {
    try {
      await updateItemActionAsync(`restaurants/${order.restaurant}/orders`,order,orderId);
      dispatch(
        currentOrderAction({})
      );
    } catch (error) {
      dispatch(
        currentOrderAction({})
      );
    }
  };
};

const updateOrderAction = (order) => {
  return {
    type: orderTypes.UPDATE_ORDER,
    payload: { ...order},
  };
};

export const getOrderByIdActionAsync = (restaurantId, orderId) => {
  return async (dispatch) => {
    try {
      const order = await getItemsByIdActionAsync(`restaurants/${restaurantId}/orders`, orderId);
      dispatch(getOrderByIdAction(order));
    } catch (error) {
      dispatch(getOrderByIdAction({}));
    }
  };
}

const getOrderByIdAction = (order) => {
  return {
    type: orderTypes.CURRENT_ORDER,
    payload: order,
  };
};
