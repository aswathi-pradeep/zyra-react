import { createSlice } from "@reduxjs/toolkit";

const savedWishlist = JSON.parse(localStorage.getItem("wishlist")) || {};

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState: {
    items: savedWishlist
  },
  reducers: {


    loadWishlist: (state, action) => {
      const userId = action.payload;
      const data = JSON.parse(localStorage.getItem("wishlist")) || {};
      state.items[userId] = data[userId] || [];
    },

    
    addToWishlist: (state, action) => {
      const { userId, product } = action.payload;
      if (!userId || !product) return;

      state.items[userId] ||= [];

      const exists = state.items[userId].some(
        item => item.id === product.id
      );

      if (!exists) {
        state.items[userId].push(product);
      }

      localStorage.setItem("wishlist", JSON.stringify(state.items));
    },

    /* ❌ Remove */
    removeFromWishlist: (state, action) => {
      const { userId, productId } = action.payload;
      if (!userId) return;

      state.items[userId] = state.items[userId]?.filter(
        item => item.id !== productId
      );

      localStorage.setItem("wishlist", JSON.stringify(state.items));
    },

    /* ❤️ Toggle */
    toggleWishlist: (state, action) => {
      const { userId, product } = action.payload;
      if (!userId || !product) return;

      state.items[userId] ||= [];

      const index = state.items[userId].findIndex(
        item => item.id === product.id
      );

      if (index !== -1) {
        state.items[userId].splice(index, 1);
      } else {
        state.items[userId].push(product);
      }

      localStorage.setItem("wishlist", JSON.stringify(state.items));
    }
  }
});

export const {
  loadWishlist,
  addToWishlist,
  removeFromWishlist,
  toggleWishlist
} = wishlistSlice.actions;

export default wishlistSlice.reducer;
