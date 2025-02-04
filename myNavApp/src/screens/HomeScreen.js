import React from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import CustomButton from "../components/CustomButton";

const HomeScreen = ({ navigation }) => {
  return (
    <View style={styles.ViewStyle}>
      <Text style={styles.TextStyle}>List of Screens</Text>
      <View style={styles.buttonContainer}>
        <CustomButton
          backgroundColor="purple"
          title="Go to List Screen"
          onPress={() => navigation.navigate("List")}
        />
        <CustomButton
          backgroundColor="blue"
          title="Go to Swipe Screen"
          onPress={() => navigation.navigate("Swipe")}
        />
        <CustomButton
          backgroundColor="green"
          title="Go to Modal Screen"
          onPress={() => navigation.navigate("Modal")}
        />
        <CustomButton
          title="Go To Card Screen"
          onPress={() => navigation.navigate("Card")}
          backgroundColor="black"
        />
        <CustomButton
          title="Go To Hero Dictionary"
          onPress={() => navigation.navigate("Hero")}
          backgroundColor="red"
        />
        <CustomButton
          title="Go To Loading Users"
          onPress={() => navigation.navigate("Load")}
          backgroundColor="brown"
        />
        <CustomButton
          title="Go To State Screen"
          onPress={() => navigation.navigate("State")}
          backgroundColor="orange"
        />
        <CustomButton
          title="Go To State Screen"
          onPress={() => navigation.navigate("Regis")}
          backgroundColor="#fdda16"
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  ViewStyle: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#ffc7ba",
  },
  TextStyle: {
    fontSize: 24,
    padding: 10,
  },
  buttonContainer: {
    gap: 10,
  },
});

export default HomeScreen;
