import React from "react";
import { View, TextInput, StyleSheet } from "react-native";
import Feather from "@expo/vector-icons/Feather";

const SearchBox = ({ placeholder, value, onChangeText }) => {
  return (
    <View style={styles.container}>
      <Feather name="search" size={20} color="#888" />
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        placeholderTextColor="#888"
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
    width: "90%",
    alignSelf: "center",
    backgroundColor: "#fff",
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
    marginVertical: 10,
    gap: 10, // เพิ่มช่องว่างระหว่างไอคอนกับ TextInput
  },
  input: {
    flex: 1, // ให้ TextInput ขยายเต็มพื้นที่ที่เหลือ
    fontSize: 16,
    color: "#333",
    paddingVertical: 5,
  },
});

export default SearchBox;
