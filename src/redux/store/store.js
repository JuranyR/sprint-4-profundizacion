import { configureStore } from "@reduxjs/toolkit";
import { loginReducer } from "../reducers/loginReducer";
import { restaurantReducer } from "../reducers/restaurantReducer";
import { plateReducer } from "../reducers/plateReducer";

const reducer = {
    login: loginReducer,
    restaurants: restaurantReducer,
    plates: plateReducer
}

const store = configureStore({
    reducer,
    devTools: process.env.NODE_ENV !== 'production'
})

export default store;