import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  ScrollView,
  StyleSheet,
  Image,
  TouchableOpacity,
} from "react-native";
import axios from "axios";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import AsyncStorage from "@react-native-async-storage/async-storage";

const RecipeDetailScreen = ({ route }) => {
  const { recipeId } = route.params;
  const [recipeDetail, setRecipeDetail] = useState(null);
  const [isFavorite, setIsFavorite] = useState(false);

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

  const checkFavoriteStatus = async () => {
    try {
      const storedFavorites = await AsyncStorage.getItem("favorites");
      const favorites = storedFavorites ? JSON.parse(storedFavorites) : [];
      const exist = favorites.some((id) => id === recipeId);
      setIsFavorite(exist);
    } catch (error) {
      console.log("Error checking favorites:", error);
    }
  };

  useEffect(() => {
    if (recipeId) {
      fetchRecipeDetail();
      checkFavoriteStatus();
    }
  }, [recipeId]);

  const toggleFavorite = async () => {
    try {
      const storedFavorites = await AsyncStorage.getItem("favorites");
      let favorites = storedFavorites ? JSON.parse(storedFavorites) : [];

      if (isFavorite) {
        favorites = favorites.filter((id) => id !== recipeId);
      } else {
        favorites.push(recipeId);
      }

      await AsyncStorage.setItem("favorites", JSON.stringify(favorites));
      setIsFavorite(!isFavorite);
    } catch (error) {
      console.log("Error Saving favorites: ", error);
    }
  };

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
      <TouchableOpacity style={styles.favoriteButton} onPress={toggleFavorite}>
        <MaterialIcons
          name={isFavorite ? "favorite" : "favorite-border"}
          size={28}
          color={isFavorite ? "#ff6f61" : "black"}
        />
      </TouchableOpacity>
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
            const measureKey = key.replace("strIngredient", "strMeasure");
            const measure = recipeDetail[measureKey];

            if (ingredient && measure) {
              const imageUrl = `https://www.themealdb.com/images/ingredients/${ingredient}.png`;

              return (
                <View key={index} style={styles.ingredientContainer}>
                  <Image
                    style={styles.ingredientImage}
                    source={{ uri: imageUrl }}
                  />
                  <Text style={styles.ingredient}>
                    {measure} {ingredient}
                  </Text>
                </View>
              );
            }
            return null;
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
    backgroundColor: "white",
    borderRadius: 24,
    marginHorizontal: 10,
    marginVertical: 6,
    padding: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
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
  favoriteButton: {
    position: "absolute",
    top: 10,
    right: 10,
    zIndex: 1,
    backgroundColor: "#fff",
    borderRadius: 50,
    padding: 8,
  },
});

export default RecipeDetailScreen;
