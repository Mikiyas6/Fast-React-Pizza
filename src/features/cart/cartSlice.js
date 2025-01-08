import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  cart: [],
};
const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem(state, action) {
      state.cart.push(action.payload);
    },
    deleteItem(state, action) {
      state.cart = state.cart.filter((item) => item.pizzaId !== action.payload);
    },
    increaseItemQuantity(state, action) {
      const item = state.cart.find((item) => item.pizzaId === action.payload);
      item.quantity += 1;
      item.totalPrice = item.quantity * item.unitPrice;
    },
    decreaseItemQuantity(state, action) {
      const item = state.cart.find((item) => item.pizzaId === action.payload);
      item.quantity -= 1;
      item.totalPrice = item.quantity * item.unitPrice;
      if (item.quantity === 0) cartSlice.caseReducers.deleteItem(state, action);
    },
    clearCart(state) {
      state.cart = [];
    },
  },
});

export const {
  addItem,
  deleteItem,
  increaseItemQuantity,
  decreaseItemQuantity,
  clearCart,
} = cartSlice.actions;

export const getTotalCartQuantity = (store) =>
  store.cart.cart.reduce((total, item) => total + item.quantity, 0);

export const getTotalCartPrice = (store) =>
  store.cart.cart.reduce((total, item) => total + item.totalPrice, 0);

export const getCurrentQuantityById = (id) => (store) =>
  store.cart.cart.find((item) => item.pizzaId === id)?.quantity ?? 0;

export const getCart = (store) => store.cart.cart;
export const getUsername = (store) => store.user.username;

export default cartSlice.reducer;
