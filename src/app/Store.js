import { configureStore } from "@reduxjs/toolkit";
import CartSlice from "./CartSlice.js";
import AuthSlice from "./AuthSlice";
import ProductSlice from "./ProductSlice.js";

const store = configureStore({
  reducer: {
    cart: CartSlice,
    auth: AuthSlice,
    product: ProductSlice,
  },
});

export default store;
