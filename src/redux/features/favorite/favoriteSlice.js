import { createSlice } from "@reduxjs/toolkit";
import { Alert } from "react-native";

const initialState = {
  favorites: [],
};

export const favoritesSlice = createSlice({
  name: "favorites",
  initialState,
  reducers: {
    addToFavorites: (state, action) => {
      const character = action.payload;

      if (state.favorites.some((item) => item.id === character.id)) {
        Alert.alert("This character is already in your favorites list.");
        return;
      }

      if (state.favorites.length >= 10) {
        Alert.alert(
          "Favori karakter ekleme sayısını aştınız.",
          "Başka bir karakteri favorilerden çıkarmalısınız."
        );
        return;
      }
      state.favorites.push(action.payload);
      Alert.alert("Success", "Character added to favorites!");
    },
    removeFromFavorites: (state, action) => {
      const character = action.payload;

      Alert.alert(
        `Remove ${character.name}`,
        `Are you sure you want to remove ${character.name} from favorites?`,
        [
          {
            text: "Cancel",
            style: "cancel",
          },
          {
            text: "Remove",
            style: "destructive",
            onPress: () => {
              state.favorites = state.favorites.filter(
                (item) => item.id !== action.payload.id
              );
            },
          },
        ]
      );
    },
  },
});

export const { addToFavorites, removeFromFavorites } = favoritesSlice.actions;
export default favoritesSlice.reducer;
