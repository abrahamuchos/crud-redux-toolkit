import { createSlice } from "@reduxjs/toolkit";

const productsSlice = createSlice({
  name: "products",
  initialState: {
    data: []
  },
  reducers: {
    getProducts: (state, action) => {
      state.data = action.payload;
    },
    getProduct: (state, action) => {
    },
    addProduct: (state, action) => {
    },
    updateProduct: (state, action) => {
    },
    deleteProduct: (state, action) => {
    },
  }
});

export const {
  getProducts,
  getProduct,
  addProduct,
  updateProduct,
  deleteProduct,
} = productsSlice.actions;

export default productsSlice.reducer;