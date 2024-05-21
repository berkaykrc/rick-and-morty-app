import React, { useState, useEffect } from "react";
import {
  View,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Text,
} from "react-native";
import EpisodeCard from "../components/EpisodeCard";
import Pagination from "../components/Pagination";
import { getEpisodes } from "../services/api";
import SearchBar from "../components/SearchBar";

const HomeScreen = ({ navigation }) => {
  const [episodes, setEpisodes] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");

  React.useLayoutEffect(() => {
    navigation.setOptions({
      title: "Rick and Morty Episodes",
      headerRight: () => (
        <TouchableOpacity
          style={{ marginRight: 10 }}
          onPress={() => navigation.navigate("Favorites")}
        >
          <Text style={{ fontSize: 24 }}>🔖</Text>
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  useEffect(() => {
    fetchEpisodes(currentPage);
  }, [currentPage]);

  const fetchEpisodes = async (page) => {
    try {
      const response = await getEpisodes(page);
      setEpisodes(response.results);
      setTotalPages(response.info.pages);
    } catch (error) {
      console.error(error);
    }
  };

  const filteredEpisodes = episodes.filter(
    (episode) =>
      episode.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      episode.air_date.toLowerCase().includes(searchQuery.toLowerCase()) ||
      episode.id.toString().includes(searchQuery) ||
      episode.episode.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  return (
    <View style={styles.container}>
      <SearchBar
        value={searchQuery}
        onChange={setSearchQuery}
        placeholder="Search episodes..."
      />
      <FlatList
        data={filteredEpisodes}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <EpisodeCard episode={item} />}
      />
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onNextPage={() => handlePageChange(currentPage + 1)}
        onPrevPage={() => handlePageChange(currentPage - 1)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
});

export default HomeScreen;
