import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "./src/screen/HomeScreen";
import RecipeDetailScreen from "./src/screen/RecipeDetailScreen";
import FavoritesScreen from "./src/screen/FavoritesScreen";

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerStyle: { backgroundColor: "#2C3930" },
          headerTintColor: "#fff",
          headerTitleAlign: "center",
          headerTitleStyle: { fontSize: 24, fontWeight: "bold" },
        }}
      >
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{
            title: "Gin Laew Dead 💀",
          }}
        />
        <Stack.Screen name="RecipeDetail" component={RecipeDetailScreen} />
        <Stack.Screen
          name="favorite"
          component={FavoritesScreen}
          options={{
            title: "Favorites 💖",
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
