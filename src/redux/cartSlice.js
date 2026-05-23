import { createSlice } from "@reduxjs/toolkit";

const savedCart = JSON.parse(localStorage.getItem("cart")) || {};

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: savedCart
  },
  reducers: {
    addToCart: (state, action) => {
      const { userId, product } = action.payload;
      if (!userId || !product) return;

      state.items[userId] ||= [];

      const existing = state.items[userId].find(i => i.id === product.id);

      // Apply discount only if product.offer is true
      const finalPrice = product.offer ? Math.round(product.price * 0.7) : product.price;

      if (existing) {
        existing.quantity += 1;
      } else {
        state.items[userId].push({ ...product, quantity: 1, price: finalPrice });
      }

      localStorage.setItem("cart", JSON.stringify(state.items));
    },

    removeFromCart: (state, action) => {
      const { userId, productId } = action.payload;
      state.items[userId] = state.items[userId].filter(i => i.id !== productId);
      localStorage.setItem("cart", JSON.stringify(state.items));
    },

    increaseQty: (state, action) => {
      const { userId, productId } = action.payload;
      const item = state.items[userId]?.find(i => i.id === productId);
      if (item) item.quantity += 1;
      localStorage.setItem("cart", JSON.stringify(state.items));
    },

    decreaseQty: (state, action) => {
      const { userId, productId } = action.payload;
      const item = state.items[userId]?.find(i => i.id === productId);
      if (item && item.quantity > 1) item.quantity -= 1;
      localStorage.setItem("cart", JSON.stringify(state.items));
    },

    clearCart: (state, action) => {
      const userId = action.payload;
      if (!userId) return;

      delete state.items[userId];
      localStorage.setItem("cart", JSON.stringify(state.items));
    }
  }
});

export const { addToCart, removeFromCart, increaseQty, decreaseQty,clearCart } = cartSlice.actions;

export default cartSlice.reducer;
