import { configureStore } from "@reduxjs/toolkit";
import { loginReducer } from "../reducers/loginReducer";
import { restaurantReducer } from "../reducers/restaurantReducer";
import { plateReducer } from "../reducers/plateReducer";
import { orderReducer } from "../reducers/orderReducer";

const reducer = {
    login: loginReducer,
    restaurants: restaurantReducer,
    plates: plateReducer,
    orders: orderReducer
}

const store = configureStore({
    reducer,
    devTools: process.env.NODE_ENV !== 'production'
})

export default store;