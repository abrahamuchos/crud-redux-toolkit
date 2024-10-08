import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./usersSlice.js";
import productReducer from './productsSlice.js';

/**
 * configureStore is a function that creates a Redux store.
 */
const store = configureStore({
  reducer: {
    users: userReducer,
    products: productReducer,
  },

});


export default store;