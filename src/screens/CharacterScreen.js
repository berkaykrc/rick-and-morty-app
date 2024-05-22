import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  ActivityIndicator,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { addToFavorites } from "../redux/features/favorite/favoriteSlice";
import { useDispatch } from "react-redux";
import { fetchEpisodeDetails } from "../services/api";

const CharacterScreen = ({ route }) => {
  const dispatch = useDispatch();
  const { character } = route.params;
  const [episodes, setEpisodes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEpisodes = async () => {
      const characterAppearedEpisodes = await fetchEpisodeDetails(character);
      setEpisodes(characterAppearedEpisodes);
    };
    setLoading(false);
    fetchEpisodes();
  }, [character]);

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  const handleAddToFavorites = (character) => {
    try {
      dispatch(addToFavorites(character));
    } catch (error) {
      console.error("Error adding character to favorites:", error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <TouchableOpacity
          style={styles.favoriteButton}
          onPress={() => handleAddToFavorites(character)}
        >
          <Text style={{ fontSize: 30 }}>⭐</Text>
        </TouchableOpacity>
        <Image source={{ uri: character.image }} style={styles.image} />
        <Text style={styles.label}>Name:</Text>
        <Text style={styles.value}>{character.name}</Text>
        <Text style={styles.label}>Status:</Text>
        <Text style={styles.value}>{character.status}</Text>
        <Text style={styles.label}>Species:</Text>
        <Text style={styles.value}>{character.species}</Text>
        <Text style={styles.label}>Gender:</Text>
        <Text style={styles.value}>{character.gender}</Text>
        <Text style={styles.label}>Origin:</Text>
        <Text style={styles.value}>{character.origin.name}</Text>
        <Text style={styles.label}>Current Location:</Text>
        <Text style={styles.value}>{character.location.name}</Text>
        <Text style={styles.label}>Episodes:</Text>
        <FlatList
          data={episodes}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <Text style={styles.value}>{item.name}</Text>
          )}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f5f5f5",
    padding: 10,
  },
  card: {
    alignItems: "center",
    flexDirection: "column",
    backgroundColor: "#A0DAA9",
    width: "90%",
    borderRadius: 10,
    padding: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  image: {
    width: 100,
    height: 100,
    marginBottom: 20,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: "#333",
  },
  label: {
    fontSize: 18,
    color: "#333",
    fontWeight: "bold",
  },
  value: {
    fontSize: 16,
    color: "#666",
    marginBottom: 10,
  },
  favoriteButton: {
    position: "absolute",
    top: 10,
    right: 10,
    height: 50,
    width: 50,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default CharacterScreen;
