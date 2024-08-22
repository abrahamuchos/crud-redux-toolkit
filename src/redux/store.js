import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./usersSlice.js";


const store = configureStore({
  reducer: {
      users: userReducer,
  },

});


export default store;