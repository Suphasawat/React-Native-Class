import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, FlatList, Image } from "react-native";
import axios from "axios";
import SearchBox from "../components/SearchBox";
import RecipeCard from "../components/RecipeCard";

const HomeScreen = () => {
  const [search, setSearch] = useState("");
  const [recipes, setRecipes] = useState([]);

  const fetchRecipes = async () => {
    try {
      const response = await axios.get(
        "https://www.themealdb.com/api/json/v1/1/search.php?s="
      );
      setRecipes(response.data.meals || []);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchRecipes();
  }, []);

  return (
    <View style={styles.container}>
      <SearchBox placeholder="Search" value={search} onChangeText={setSearch} />
      <FlatList
        data={recipes.filter((item) =>
          item.strMeal.toLowerCase().includes(search.toLowerCase())
        )}
        keyExtractor={(item) => item.idMeal}
        renderItem={({ item }) => <RecipeCard recipes={item} />}
        style={styles.list}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  recipeImage: {
    width: "100%",
    height: 200,
  },
});

export default HomeScreen;
