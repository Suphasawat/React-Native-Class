import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import AsyncStorage from "@react-native-async-storage/async-storage";

const RecipeCard = ({ item, onPress }) => {
  const [isFavorite, setFavorite] = useState(false);

  useEffect(() => {
    const checkIfFavorite = async () => {
      const storedFavorites = await AsyncStorage.getItem("favorites");
      const favoriteList = storedFavorites ? JSON.parse(storedFavorites) : [];
      const isFavorite = favoriteList.some((fav) => fav.idMeal === item.idMeal);
      setFavorite(isFavorite);
    };
    checkIfFavorite();
  }, [item.idMeal]);

  const toggleFavorite = async () => {
    try {
      const storedFavorites = await AsyncStorage.getItem("favorites");
      let favorite = storedFavorites ? JSON.parse(storedFavorites) : [];
      if (isFavorite) {
        // ลบรายการโปรด
        favorite = favorite.filter((fav) => fav.idMeal !== item.idMeal);
      } else {
        // เพิ่มรายการโปรด
        favorite.push(item);
      }
      await AsyncStorage.setItem("favorites", JSON.stringify(favorite));
      setFavorite(!isFavorite);
    } catch (error) {
      console.error("Error Loading Favorite", error);
    }
  };

  return (
    <TouchableOpacity style={styles.recipeItem} onPress={onPress}>
      <Image style={styles.image} source={{ uri: item.strMealThumb }} />
      <View style={styles.textContainer}>
        <Text style={styles.title}>{item.strMeal}</Text>
        <View style={styles.footer}>
          <Text style={styles.category}>{item.strCategory}</Text>
          <TouchableOpacity onPress={toggleFavorite}>
            <MaterialIcons
              name={isFavorite ? "favorite" : "favorite-border"}
              size={28}
              color={isFavorite ? "#ff6f61" : "#000"}
            />
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  recipeItem: {
    backgroundColor: "#fff",
    padding: 15,
    marginVertical: 12,
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 15,
    elevation: 10,
    alignItems: "center",
    alignSelf: "stretch",
    flexDirection: "row",
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 10,
  },
  textContainer: {
    flex: 1,
    paddingLeft: 12,
    justifyContent: "center",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  category: {
    fontSize: 14,
    color: "#777",
    marginTop: 4,
  },
});

export default RecipeCard;
