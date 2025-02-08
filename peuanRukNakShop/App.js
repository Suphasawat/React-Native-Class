import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "./screens/HomeScreen";
import AddToCart from "./screens/AddToCart";

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Add">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Add" component={AddToCart} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
