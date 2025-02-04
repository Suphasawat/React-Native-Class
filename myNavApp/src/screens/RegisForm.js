import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import CustomButton from "../components/CustomButton";
import { Alert } from "react-native";

const RegisForm = ({ navigation }) => {
  const [Username, setUsername] = useState("");
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const [ConfirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (field, value) => {
    switch (field) {
      case "username":
        setUsername(value);
        setErrors((prevErrors) => ({ ...prevErrors, username: "" }));
        break;
      default:
        break;
    }
  };

  const validateField = (field, value) => {
    let error = "";
    if (!value) {
      error = "This field is required";
    } else {
      if (field === "email" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
        error = "Invalid email address";
      } else if (field === "password" && value.length < 8) {
        error = "Invalid password format";
      } else if (field === "confirmPassword" && value !== Password) {
        error = "Passwords do not match";
      }
    }
    setErrors((prevErrors) => ({ ...prevErrors, [field]: error }));
    return error;
  };

  const checkSubmit = () => {
    const usernameError = validateField("username", Username);
    const emailError = validateField("email", Email);
    const passwordError = validateField("password", Password);
    const confirmPasswordError = validateField(
      "confirmPassword",
      ConfirmPassword
    );

    if (
      !usernameError &&
      !emailError &&
      !passwordError &&
      !confirmPasswordError
    ) {
      Alert.alert("Registration result", "successful!");
      setUsername("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");
      setErrors({
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
      });
      navigation.navigate("Card");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Registration Form</Text>

      <TextInput
        style={styles.input}
        placeholder="Username"
        value={Username}
        onChangeText={(value) => handleChange("username", value)}
        onBlur={() => validateField("username", Username)}
      />
      {errors.username ? (
        <Text style={styles.error}>{errors.username}</Text>
      ) : null}

      <TextInput
        style={styles.input}
        placeholder="Email"
        value={Email}
        onChangeText={setEmail}
        keyboardType="email-address"
        onBlur={() => validateField("email", Email)}
      />
      {errors.email ? <Text style={styles.error}>{errors.email}</Text> : null}

      <TextInput
        style={styles.input}
        placeholder="Password"
        value={Password}
        onChangeText={(value) => setPassword(value)}
        secureTextEntry
        onBlur={() => validateField("password", Password)}
      />
      {errors.password ? (
        <Text style={styles.error}>{errors.password}</Text>
      ) : null}

      <TextInput
        style={styles.input}
        placeholder="confirmPassword"
        value={ConfirmPassword}
        onChangeText={(value) => setConfirmPassword(value)}
        secureTextEntry
        onBlur={() => validateField("password", Password)}
      />
      {errors.confirmPassword ? (
        <Text style={styles.error}>{errors.confirmPassword}</Text>
      ) : null}

      <CustomButton
        title="Register"
        backgroundColor="green"
        onPress={checkSubmit}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    paddingLeft: 10,
    fontSize: 18,
    marginBottom: 10,
  },
  error: {
    color: "red",
    fontSize: 14,
  },
});

export default RegisForm;
