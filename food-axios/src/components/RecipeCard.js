import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

const RecipeCard = ({ recipes }) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      style={styles.Card}
      onPress={() =>
        navigation.navigate("RecipeDetailScreen", { recipeId: recipes.idMeal })
      }
    >
      <Image style={styles.image} source={{ uri: recipes.strMealThumb }} />
      <View style={styles.textContainer}>
        <Text style={styles.title}>{recipes.strMeal}</Text>
        <View style={styles.footer}>
          <Text style={styles.category}>{recipes.strCategory}</Text>
          <MaterialIcons name="arrow-forward-ios" size={20} color="black" />
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  Card: {
    flexDirection: "row",
    backgroundColor: "white",
    borderRadius: 24,
    borderColor: "#3F4F44",
    borderWidth: 2,
    marginHorizontal: 10,
    marginVertical: 6,
    padding: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 20,
    borderColor: "#3F4F44",
    borderWidth: 2,
  },
  textContainer: {
    flex: 1,
    paddingLeft: 12,
    justifyContent: "center",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
    color: "#333",
  },
  category: {
    fontSize: 16,
    color: "#666",
    marginTop: 4,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});

export default RecipeCard;
