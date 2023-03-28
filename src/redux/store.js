import { CartReducer } from "./cartReducer";

const { configureStore } = require("@reduxjs/toolkit");

const store = configureStore({
  reducer: {
    cart: CartReducer,
  },
});

export default store;
