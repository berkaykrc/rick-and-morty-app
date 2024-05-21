import React from "react";
import { Text, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

const EpisodeCard = ({ episode }) => {
  const navigation = useNavigation();

  handlePress = () => {
    navigation.navigate("Episode", {
      episodeId: episode.id,
    });
  };
  return (
    <TouchableOpacity style={styles.container} onPress={handlePress}>
      <Text style={styles.title}>{episode.name}</Text>
      <Text style={styles.subtitle}>{`Episode: ${episode.episode}`}</Text>
      <Text style={styles.subtitle}>{`Air Date: ${episode.air_date}`}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#A0DAA9",
    padding: 16,
    borderRadius: 8,
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
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 14,
    color: "#666",
  },
});

export default EpisodeCard;
