import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { FaShoppingCart } from "react-icons/fa";

const HomeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Available Screens</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("Add")}
      >
        <FaShoppingCart style={styles.icon} />
        <Text style={styles.buttonText}>CART</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f8f9fa",
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 20,
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#ff7043",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "600",
    marginLeft: 10,
  },
  icon: {
    color: "white",
    fontSize: 20,
  },
});

export default HomeScreen;
