import { createReducer } from "@reduxjs/toolkit";

export const CartReducer = createReducer(
  {
    cartItems: [],
    subTotal: 0,
    shipping: 0,
    tax: 0,
    total: 0,
  },
  {
    // setCartItem: (state) => {
    //   if (JSON.parse(sessionStorage.getItem("cartItemsArr"))) {
    //     state.cartItems = JSON.parse(sessionStorage.getItem("cartItemsArr"));
    //   } else {
    //     state.cartItems = [];
    //   }
    // },
    addToCart: (state, action) => {
      const item = action.payload;
      const isItemExist = state.cartItems.find(
        (cartItem) => cartItem.id === item.id
      );

      if (isItemExist) {
        state.cartItems.forEach((cartItem) => {
          if (cartItem.id === item.id) {
            cartItem.quantity += item.quantity;
          }
        });
      } else {
        state.cartItems.push(item);
      }
      sessionStorage.setItem("cartItemsArr", JSON.stringify(state.cartItems));
    },

    decFromCart: (state, action) => {
      const item = action.payload;
      const decItem = state.cartItems.find(
        (cartItem) => cartItem.id === item.id
      );

      if (decItem.quantity > 1) {
        state.cartItems.forEach((cartItem) => {
          if (item.id === cartItem.id) {
            cartItem.quantity += item.quantity;
          }
        });
      }
    },

    delFromCart: (state, action) => {
      const item = action.payload;
      if (item.id) {
        state.cartItems = state.cartItems.filter(
          (cartItem) => cartItem.id !== item.id
        );
      }
    },

    calculatePrice: (state) => {
      let sum = 0;
      if (state.cartItems.length > 0) {
        state.cartItems.forEach(
          (cartItem) =>
            (sum += Number(cartItem.price) * Number(cartItem.quantity))
        );
        state.subTotal = Number(sum);
        state.shipping = state.subTotal > 1000 ? 0 : 200;
        state.tax = Number((Number(state.subTotal) * 0.18).toFixed());
        state.total = state.subTotal + state.shipping + state.tax;
      } else {
        state.subTotal = 0;
        state.shipping = 0;
        state.tax = 0;
        state.total = 0;
      }
    },
  }
);
