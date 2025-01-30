import React from "react";
import { StyleSheet, Text, View, Button, TouchableOpacity } from "react-native";

const HomeScreen = ({ navigation }) => {
  return (
    <View style={styles.ViewStyle}>
      <Text style={styles.TextStyle}>List of Screens</Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.buttonContainer}
          onPress={() => navigation.navigate("Add")}
        >
          Go to Add Cart
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  ViewStyle: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
  },
  TextStyle: {
    fontSize: 24,
    padding: 10,
  },
  buttonContainer: {
    gap: 10,
  },
  buttonContainer: {
    backgroundColor: "#f5793b",
    padding: 5,
    borderRadius: 5,
    color: "white",
    fontSize: 20,
    fontFamily: "monospace",
  },
});

export default HomeScreen;
