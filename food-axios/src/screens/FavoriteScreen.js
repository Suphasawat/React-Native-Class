import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import RecipeCard from "../components/RecipeCard";
import SearchBox from "../components/SearchBox";

const FavoriteScreen = ({ navigation }) => {
  const [favorites, setFavorites] = useState([]);
  const [recipes, setRecipes] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const storedFavorites = await AsyncStorage.getItem("favorites");
        if (storedFavorites) {
          const favoriteIds = JSON.parse(storedFavorites);
          setFavorites(favoriteIds);

          // ดึงข้อมูลเมนูทั้งหมดจาก API โดยใช้ IDs ที่ได้
          const recipeDetails = await Promise.all(
            favoriteIds.map(async (id) => {
              const response = await axios.get(
                `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
              );
              return response.data.meals[0]; // ดึงข้อมูลเมนูจาก API
            })
          );
          setRecipes(recipeDetails); // อัพเดท state ของ recipes
        }
      } catch (error) {
        console.log("Error fetching favorites:", error);
      }
    };

    fetchFavorites();
  }, []);

  const renderFavoriteItem = ({ item }) => (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate("RecipeDetailScreen", { recipeId: item.idMeal })
      } // นำไปยังหน้า RecipeDetail
    >
      <RecipeCard recipes={item} /> {/* ส่งข้อมูลเมนูที่ดึงมาให้ RecipeCard */}
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <SearchBox placeholder="Search" value={search} onChangeText={setSearch} />
      {recipes.length > 0 ? (
        <FlatList
          data={recipes}
          renderItem={renderFavoriteItem}
          keyExtractor={(item) => item.idMeal.toString()} // ใช้ id เป็น key
        />
      ) : (
        <Text style={styles.noFavorites}>No favorites yet!</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: "#f9f9f9",
  },
  noFavorites: {
    fontSize: 18,
    textAlign: "center",
    color: "#777",
    marginTop: 20,
  },
});

export default FavoriteScreen;
