import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

const Pagination = ({ currentPage, totalPages, onNextPage, onPrevPage }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[styles.button, currentPage === 1 && styles.disabledButton]}
        onPress={onPrevPage}
        disabled={currentPage === 1}
      >
        <Text style={styles.buttonText}>🔫Prev Page</Text>
      </TouchableOpacity>
      <Text style={styles.pageText}>
        {currentPage} / {totalPages}
      </Text>
      <TouchableOpacity
        style={[
          styles.button,
          currentPage === totalPages && styles.disabledButton,
        ]}
        onPress={onNextPage}
        disabled={currentPage === totalPages}
      >
        <Text style={[styles.buttonText, { transform: [{ scaleX: -1 }] }]}>
          🔫Next Page
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
    backgroundColor: "#A0DAA9",
  },
  button: {
    backgroundColor: "#FFFFFF",
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: "#00000",
  },
  pageText: {
    color: "#FFFFFF",
    fontSize: 18,
  },
  disabledButton: {
    backgroundColor: "#D3D3D3",
  },
});
export default Pagination;
