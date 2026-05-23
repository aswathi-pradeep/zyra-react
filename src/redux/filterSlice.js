import { createSlice } from "@reduxjs/toolkit";

const initialState = { gender: 'women', category: 'all' };

const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setGender(state, action) {
      state.gender = action.payload;
      state.category = 'all';
    },
    setCategory(state, action) {
      state.category = action.payload;
    }
  }
});

export const { setGender, setCategory } = filterSlice.actions;
export default filterSlice.reducer;
