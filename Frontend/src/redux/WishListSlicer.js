import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  wishList: [],
};

const wishListSlice = createSlice({
  name: 'wishList',
  initialState,
  reducers: {
    setWishList: (state, action) => {
      state.wishList = action.payload;
    },
    clearWishList: (state) => {
      state.wishList = [];
    },
    removeOneWishlist: (state, action) => {
      state.wishList = state.wishList.filter(item => item.id !== action.payload);
    },
  },
});

export const { setWishList, clearWishList, removeOneWishlist } = wishListSlice.actions;

export default wishListSlice.reducer;
