import { restaurantTypes } from "../types/restaurantTypes";
const initialState = {
  restaurants: [],
  status: "loading",
  current: {},
};

export const restaurantReducer = (state = initialState, action) => {
  switch (action.type) {
    case restaurantTypes.CREATE_RESTAURANT:
      return {
        ...state,
        restaurants: [...state.restaurants, action.payload.restaurant],
        status: action.payload.status,
      };

    case restaurantTypes.GET_RESTAURANTS:
      return {
        ...state,
        restaurants: [...action.payload],
      };

    case restaurantTypes.DELETE_RESTAURANT:
      return {
        ...state,
        restaurants: state.restaurants.filter((restaurant) => restaurant.id !== action.payload.id),
        status: action.payload.status,
      };

    case restaurantTypes.CURRENT_RESTAURANT:
      return {
        ...state,
        current: action.payload,
      };
    default:
      return state;
  }
};