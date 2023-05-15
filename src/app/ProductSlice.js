import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  productlist: [],
};

const productSlice = createSlice({
  initialState,
  name: "product",
  reducers: {
    setProducts: (state, action) => {
      state.productlist = action.payload;
    },
  },
});

export const { setProducts } = productSlice.actions;

export default productSlice.reducer;
