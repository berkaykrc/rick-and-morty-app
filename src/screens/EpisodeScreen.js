import React, { useEffect, useState } from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import { fetchEpisodeById, fetchCharacterByUrl } from "../services/api";
import CharacterCard from "../components/CharacterCard";
import Pagination from "../components/Pagination";
import SearchBar from "../components/SearchBar";

const EpisodeScreen = ({ route }) => {
  const { episodeId } = route.params;
  const [episode, setEpisode] = useState(null);
  const [characters, setCharacters] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetchEpisodeDetails();
  }, [currentPage]);

  const fetchEpisodeDetails = async () => {
    try {
      const response = await fetchEpisodeById(episodeId, currentPage);
      setEpisode(response);
      if (response.characters) {
        const characterDetails = await Promise.all(
          response.characters.map((characterUrl) =>
            fetchCharacterByUrl(characterUrl)
          )
        );
        setCharacters(characterDetails);
      }
      if (response.info && response.info.pages) {
        setTotalPages(response.info.pages);
      }
    } catch (error) {
      console.log("Error fetching episode details:", error);
    }
  };

  const filteredCharacters = characters.filter(
    (character) =>
      character.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      character.status.toLowerCase().includes(searchQuery.toLowerCase()) ||
      character.species.toLowerCase().includes(searchQuery.toLowerCase()) ||
      character.origin.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      character.location.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  return (
    <View style={styles.container}>
      {episode && (
        <View>
          <Text style={styles.episodeCode}>Episode: {episode.episode}</Text>
          <Text style={styles.episodeDetails}>Name: {episode.name}</Text>
          <Text style={styles.episodeDetails}>
            Air Date: {episode.air_date}
          </Text>
        </View>
      )}
      <SearchBar
        value={searchQuery}
        onChange={setSearchQuery}
        placeholder="Search characters..."
      />
      <FlatList
        data={filteredCharacters}
        renderItem={({ item }) => <CharacterCard character={item} />}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={{ paddingBottom: 20 }}
      />
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onNextPage={() => {
          if (currentPage < totalPages) {
            handlePageChange(currentPage + 1);
          }
        }}
        onPrevPage={() => {
          if (currentPage > 1) {
            handlePageChange(currentPage - 1);
          }
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#FFFFFF",
  },
  episodeCode: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#2f2f2f",
    borderBottomWidth: 1,
    borderBottomColor: "#FFFFFF",
    backgroundColor: "A0DAA9",
    paddingBottom: 10,
  },
  episodeDetails: {
    fontSize: 18,
    marginBottom: 10,
    color: "#2f2f2f",
  },
});

export default EpisodeScreen;
