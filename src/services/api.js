import AsyncStorage from "../utils/AsyncStorage";
import { Alert } from "react-native";
import axios from "axios";

const BASE_URL = process.env.EXPO_PUBLIC_REACT_APP_BASE_URL;

export const getEpisodes = async (page) => {
  try {
    const response = await axios.get(`${BASE_URL}/episode?page=${page}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching episodes:", error);
    throw error;
  }
};

export const fetchEpisodeDetails = async (character) => {
  const episodeUrls = character.episode;
  const episodeDetails = await Promise.all(
    episodeUrls.map(async (url) => {
      const response = await axios.get(url);
      return response.data;
    })
  );
  return episodeDetails;
};

export const fetchEpisodeById = async (id) => {
  try {
    const response = await axios.get(`${BASE_URL}/episode/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching episode with ID ${id}:`, error);
    throw error;
  }
};

export const fetchCharacterByUrl = async (url) => {
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error(`Error fetching character with ID ${id}:`, error);
    throw error;
  }
};

export const searchCharacter = async (name, query) => {
  try {
    const response = await axios.get(
      `${BASE_URL}/character/?name=${name}&status=${query.status}&species=${query.species}&location=${query.location}`
    );
    return response.data;
  } catch (error) {
    console.error(`Error searching characters with name ${name}:`, error);
    throw error;
  }
};

export const fetchFavoriteCharacters = async () => {
  try {
    const favorites = await AsyncStorage.getItem("favorites");
    return favorites ? JSON.parse(favorites) : [];
  } catch (error) {
    console.error("Error fetching favorite characters:", error);
    throw error;
  }
};

export const addFavoriteCharacter = async (character) => {
  try {
    const favorites = await fetchFavoriteCharacters();
    if (favorites.some((fav) => fav.id === character.id)) {
      Alert.alert("This character is already in your favorites list.");
      return;
    }

    if (favorites.length >= 10) {
      Alert.alert(
        "Favori karakter ekleme sayısını aştınız.",
        "Başka bir karakteri favorilerden çıkarmalısınız."
      );
      return;
    }

    const updatedFavorites = [...favorites, character];
    await AsyncStorage.setItem("favorites", JSON.stringify(updatedFavorites));
    Alert.alert("Success", "Character added to favorites!");
  } catch (error) {
    console.error("Error adding favorite character:", error);
    throw error;
  }
};

export const removeFavoriteCharacter = async (character) => {
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
        onPress: async () => {
          try {
            const favorites = await fetchFavoriteCharacters();

            const updatedFavorites = favorites.filter(
              (fav) => fav.id !== character.id
            );

            await AsyncStorage.setItem(
              "favorites",
              JSON.stringify(updatedFavorites)
            );
          } catch (error) {
            console.error(
              " api.js Error removing character from favorites:",
              error
            );
          }
        },
      },
    ]
  );
};
