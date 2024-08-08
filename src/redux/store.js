import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./usersSlice.js";


const store = configureStore({
  reducer: {
    data: {
      users: userReducer,
    }
  },

});


export default store;