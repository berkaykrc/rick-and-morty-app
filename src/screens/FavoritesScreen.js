import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeFromFavorites } from "../redux/features/favorite/favoriteSlice";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Image,
} from "react-native";
import SearchBar from "../components/SearchBar";

const FavoritesScreen = () => {
  const dispatch = useDispatch();
  const favorites = useSelector((state) => state.favorites.favorites);
  const [searchQuery, setSearchQuery] = useState("");
  useEffect(() => {
  }, [favorites]);

  const handleRemoveFavorite = (character) => {
    dispatch(removeFromFavorites(character));
  };

  const filteredFavorites = favorites ? favorites.filter(
    (character) =>
      character.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      character.status.toLowerCase().includes(searchQuery.toLowerCase()) ||
      character.species.toLowerCase().includes(searchQuery.toLowerCase())
  ) : [];

  const renderCharacter = ({ item }) => (
    <View style={styles.characterCard}>
      <Image source={{ uri: item.image }} style={styles.characterImage} />
      <View style={styles.characterInfo}>
        <Text style={styles.characterName}>{item.name}</Text>
        <Text style={styles.characterStatus}>{item.status}</Text>
        <Text style={styles.characterStatus}>{item.species}</Text>
      </View>
      <TouchableOpacity
        style={styles.removeButton}
        onPress={() => handleRemoveFavorite(item)}
      >
        <Text style={styles.removeButtonText}>Remove</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Favorite Characters</Text>
      <SearchBar
        value={searchQuery}
        onChange={setSearchQuery}
        placeholder="Search in favorite characters"
      />
      {favorites && favorites.length === 0 ? (
        <Text style={styles.emptyText}>No favorite characters</Text>
      ) : (
        <FlatList
          data={filteredFavorites}
          renderItem={renderCharacter}
          keyExtractor={(item) => item.id.toString()}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: "#f5f5f5",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  itemContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
    marginVertical: 5,
    backgroundColor: "#fff",
    borderRadius: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 1,
    elevation: 2,
  },
  itemName: {
    fontSize: 18,
  },
  characterCard: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 10,
    marginBottom: 10,
    backgroundColor: "#A0DAA9",
    borderRadius: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 1,
    elevation: 2,
  },
  characterImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  characterInfo: {
    flex: 1,
  },
  characterName: {
    fontSize: 18,
    fontWeight: "bold",
  },
  characterStatus: {
    fontSize: 16,
    color: "#888",
  },
  removeButton: {
    backgroundColor: "red",
    padding: 5,
    borderRadius: 5,
    marginTop: 10,
  },
  removeButtonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 13,
  },
});

export default FavoritesScreen;
