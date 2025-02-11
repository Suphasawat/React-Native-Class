import React from "react";
import { View, Text, StyleSheet, TextInput } from "react-native";
import Feather from "@expo/vector-icons/Feather";

const SearchBox = ({ placeholder, value, onChangeText }) => {
  return (
    <View style={styles.container}>
      <Feather name="search" size={24} style={styles.icon} />
      <TextInput
        placeholder={placeholder}
        style={styles.placeholder}
        value={value}
        onChangeText={onChangeText}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: 24,
    borderColor: "#A27B5C",
    borderWidth: 2,
    padding: 8,
    margin: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  placeholder: {
    flex: 1,
    marginLeft: 10,
  },
  icon: {
    color: "#A27B5C",
  },
});

export default SearchBox;
