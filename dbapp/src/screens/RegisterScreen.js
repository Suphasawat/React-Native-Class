import React, { useState } from "react";
import { View, Text, StyleSheet, Alert } from "react-native";
import CustomButton from "../components/CustomButton";
import SearchBar from "../components/SearchBar";
import { registerUser } from "../service/api";

const RegisterScreen = ({ navigation }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = () => {
    try {
      registerUser(username, password);
    } catch (error) {
      Alert.alert("Error", error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Registration: {username} {password}
      </Text>
      <SearchBar
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
      />
      <SearchBar
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secure={true}
      />
      <CustomButton
        title="Register"
        backgroundColor="#ff5233"
        onPress={handleRegister}
      />
      <CustomButton
        title="Back to Login"
        backgroundColor="#3386ff"
        onPress={() => navigation.navigate("Login")}
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
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
});

export default RegisterScreen;
