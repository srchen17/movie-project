import { configureStore } from "@reduxjs/toolkit";

import accountReducer from "../users/accountReducer";
const store = configureStore({
reducer: {
    accountReducer,
}, });
export default store;