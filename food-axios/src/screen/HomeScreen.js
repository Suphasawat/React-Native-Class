import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from "react-native";
import axios from "axios";
import SearchBox from "../components/SearchBox";
import RecipeCard from "../components/RecipeCard";
import AsyncStorage from "@react-native-async-storage/async-storage";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

const HomeScreen = ({ navigation }) => {
  const [search, setSearch] = useState("");
  const [recipes, setRecipes] = useState([]);
  const [favorite, setFavorite] = useState([]);

  useEffect(() => {
    fetchRecipes();
    fetchFavorites();
  }, []);

  const fetchRecipes = async () => {
    try {
      const response = await axios.get(
        "https://www.themealdb.com/api/json/v1/1/search.php?s="
      );
      setRecipes(response.data.meals || []);
    } catch (error) {
      console.error("Cannot fetch data!!!", error);
    }
  };

  const fetchFavorites = async () => {
    try {
      const storedFavorites = await AsyncStorage.getItem("RecipeDetail");
      const favoriteList = storedFavorites ? JSON.parse(storedFavorites) : [];
      setFavorite(favoriteList);
    } catch (error) {
      console.error("Error fetching favorites:", error);
    }
  };

  return (
    <View style={styles.container}>
      <SearchBox
        placeholder="Search recipes..."
        value={search}
        onChangeText={setSearch}
      />

      <FlatList
        data={recipes.filter((item) =>
          item.strMeal.toLowerCase().includes(search.toLowerCase())
        )}
        keyExtractor={(item) => item.idMeal}
        renderItem={({ item }) => (
          <RecipeCard
            item={item}
            onPress={() =>
              navigation.navigate("RecipeDetail", { recipe: item })
            }
          />
        )}
        contentContainerStyle={styles.listContainer}
      />

      <TouchableOpacity
        onPress={() => navigation.navigate("favorite")}
        style={styles.favoriteScreenButton}
      >
        <MaterialIcons
          name="favorite-border"
          size={24}
          color="#fff"
          style={styles.favoriteIcon}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F8FF",
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  favoriteButton: {
    position: "absolute",
    top: 10,
    right: 10,
    backgroundColor: "rgba(255, 255, 255, 0.7)",
    borderRadius: 20,
    padding: 5,
  },
  favoriteScreenButton: {
    padding: 10,
    backgroundColor: "#2C3639",
    borderRadius: 5,
    alignItems: "center",
    flexDirection: "row-reverse",
    justifyContent: "center",
    marginTop: 15,
  },
  favoriteIcon: {
    marginLeft: 8,
  },
  favoriteScreenText: {
    color: "#fff",
    fontSize: 16,
  },
  listContainer: {
    paddingBottom: 20,
  },
});

export default HomeScreen;
