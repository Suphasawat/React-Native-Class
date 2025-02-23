import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "./src/screen/HomeScreen";
import RecipeDetalliScreen from "./src/screen/RecipeDetaliScreen";
import FavoritesScreen from "./src/screen/FavoritesScreen";

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerStyle: { backgroundColor: "#ff6f61" },
          headerTintColor: "#fff",
          headerTitleAlign: "center",
          headerTitleStyle: { fontSize: 24, fontWeight: "bold" },
        }}
      >
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{
            title: "Gin Laew Tie 🍽️",
          }}
        />
        <Stack.Screen name="RecipeDetali" component={RecipeDetalliScreen} />
        <Stack.Screen
          name="favorite"
          component={FavoritesScreen}
          options={{
            title:"❤️ Favorites ❤️"
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
