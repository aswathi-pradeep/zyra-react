import { configureStore } from "@reduxjs/toolkit";
import filterReducer from "./redux/filterSlice"
import cartReducer from "./redux/cartSlice"
import WishlistReducer from "./redux/wishlistSlice"
import authReducer from "./redux/authSlice"


export const store=configureStore({
    reducer:{
       
       filter:filterReducer,
       cart: cartReducer,
       wishlist:WishlistReducer,
       auth:authReducer,
      
    }
})