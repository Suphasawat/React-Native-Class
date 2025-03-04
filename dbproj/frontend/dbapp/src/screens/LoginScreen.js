import React from "react";
import { View, Text, StyleSheet } from "react-native";
import CustomButton from "../components/CustomButton";
import SearchBar from "../components/SearchBar";

const LoginScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <SearchBar placeholder="Username" />
      <SearchBar placeholder="Password" secure={true} />
      <CustomButton title="Login" backgroundColor="#ff5233" />
      <CustomButton
        title="Register"
        backgroundColor="#3386ff"
        onPress={() => navigation.navigate("Register")}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 20,
  },
});

export default LoginScreen;
