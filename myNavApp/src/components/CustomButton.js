import React from "react";
import { Text, StyleSheet, TouchableOpacity } from "react-native";

const CustomButton = ({ title, onPress, backgroundColor }) => {
  return (
    <TouchableOpacity
      style={[styles.button, { backgroundColor }]}
      onPress={onPress}
    >
      <Text style={styles.Text}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: "blue",
    alignItems: "center",
    padding: 10,
    borderRadius: 5,
    textTransform: "uppercase",
  },
  Text: {
    color: "white",
    fontSize: 16,
  },
});

export default CustomButton;
