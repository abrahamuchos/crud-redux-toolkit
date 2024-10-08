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
      state.data.push(action.payload);
    },
    updateProduct: (state, action) => {
      const i = state.data.findIndex(product => product.id === action.payload.id)
     state.data[i] = action.payload
    },
    deleteProduct: (state, action) => {
      const i = state.data.findIndex(product => product.id === action.payload.id);
      state.data.splice(i, 1);
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