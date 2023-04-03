import { platesTypes } from "../types/platesTypes";
const initialState = {
  plates: [],
  status: "loading",
  current: {},
};

export const plateReducer = (state = initialState, action) => {
  switch (action.type) {
    case platesTypes.CREATE_PLATE:
      return {
        ...state,
        plates: [...state.plates, action.payload.plate],
        status: action.payload.status,
      };

    case platesTypes.GET_PLATES:
      return {
        ...state,
        plates: [...action.payload],
      };

    case platesTypes.DELETE_PLATE:
      return {
        ...state,
        plates: state.plates.filter((plate) => plate.id !== action.payload.id),
        status: action.payload.status,
      };

    case platesTypes.CURRENT_PLATE:
      return {
        ...state,
        current: action.payload,
      };
    default:
      return state;
  }
};