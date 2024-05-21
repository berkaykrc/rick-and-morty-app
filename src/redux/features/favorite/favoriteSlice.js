import { createSlice } from "@reduxjs/toolkit";
import {
  removeFavoriteCharacter,
  addFavoriteCharacter,
} from "../../../services/api";

const initialState = {
  favorites: [],
};

const favoriteSlice = createSlice({
  name: "favorite",
  initialState,
  reducers: {
    addToFavorites: async (state, action) => {
      state.favorites.push(action.payload);
      await addFavoriteCharacter(state.favorites);
    },
    removeFromFavorites: async (state, action) => {
      state.favorites = state.favorites.filter(
        (item) => item.id !== action.payload.id
      );
      await removeFavoriteCharacter(state.favorites);
    },
  },
});

export const { addToFavorites, removeFromFavorites } = favoriteSlice.actions;
export default favoriteSlice.reducer;
