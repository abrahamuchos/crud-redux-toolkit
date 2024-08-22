import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "users",
  initialState: [],
  reducers: {
    fetchUsers: (state, action) => {
      return action.payload;
    }
  }
});


export const {fetchUsers} = userSlice.actions;

export default userSlice.reducer;




