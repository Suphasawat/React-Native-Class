import React, { useState, useEffect } from "react";
import { Text, View, ScrollView, StyleSheet, Image } from "react-native";
import axios from "axios";

const RecipeDetailScreen = ({ route }) => {
  const { recipeId } = route.params;
  const [recipeDetail, setRecipeDetail] = useState(null);

  const fetchRecipeDetail = async () => {
    try {
      const response = await axios.get(
        `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${recipeId}`
      );
      setRecipeDetail(response.data.meals[0]);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (recipeId) {
      fetchRecipeDetail();
    }
  }, [recipeId]);

  if (!recipeDetail) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Image style={styles.image} source={{ uri: recipeDetail.strMealThumb }} />
      <Text style={styles.title}>{recipeDetail.strMeal}</Text>
      <Text style={styles.category}>{recipeDetail.strCategory}</Text>
      <Text style={styles.instructionsTitle}>Instructions:</Text>
      <Text style={styles.instructions}>{recipeDetail.strInstructions}</Text>

      <Text style={styles.ingredientsTitle}>Ingredients:</Text>
      <View style={styles.ingredientsContainer}>
        {Object.keys(recipeDetail)
          .filter((key) => key.includes("strIngredient") && recipeDetail[key])
          .map((key, index) => {
            const ingredient = recipeDetail[key];
            const imageUrl = `https://www.themealdb.com/images/ingredients/${ingredient}.png`;

            return (
              <View key={index} style={styles.ingredientContainer}>
                <Image
                  style={styles.ingredientImage}
                  source={{ uri: imageUrl }}
                />
                <Text style={styles.ingredient}>{ingredient}</Text>
              </View>
            );
          })}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: "#f9f9f9",
  },
  image: {
    width: "100%",
    height: 250,
    borderRadius: 24,
    marginBottom: 15,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 10,
  },
  category: {
    fontSize: 18,
    color: "#777",
    marginBottom: 15,
  },
  instructionsTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
    marginTop: 15,
  },
  instructions: {
    fontSize: 16,
    color: "#555",
    marginBottom: 20,
  },
  ingredientsTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  ingredientsContainer: {
    marginBottom: 20,
  },
  ingredientContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  ingredientImage: {
    width: 80,
    height: 80,
    borderRadius: 5,
    marginRight: 10,
  },
  ingredient: {
    fontSize: 16,
    color: "#555",
  },
});

export default RecipeDetailScreen;
