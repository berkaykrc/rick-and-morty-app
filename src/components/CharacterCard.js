import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

const CharacterCard = ({ character }) => {
  const navigation = useNavigation();

  handlePress = () => {
    navigation.navigate("Character", {
      character: character,
    });
  };
  return (
    <TouchableOpacity style={styles.container} onPress={handlePress}>
      <Image source={{ uri: character.image }} style={styles.image} />
      <View style={styles.textContainer}>
        <Text style={styles.name}>Name: {character.name}</Text>
        <Text style={styles.status}>
          Status: {character.status === "Alive" ? "❤️ Alive" : "💀 Dead"}
        </Text>
        <Text style={styles.species}>Species: {character.species}</Text>
        <Text style={styles.location}>Location: {character.location.name}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "#A0DAA9",
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
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
    marginRight: 10,
  },
  textContainer: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 4,
    color: "#1F1C18",
  },
  status: {
    fontSize: 16,
    color: "green",
    marginTop: 5,
  },
  species: {
    fontSize: 16,
    color: "gray",
    marginTop: 5,
  },
  location: {
    fontSize: 16,
    marginTop: 5,
  },
});

export default CharacterCard;
