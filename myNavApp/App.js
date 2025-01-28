import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "./src/screens/HomeScreen";
import ComponentScreen from "./src/screens/ComponentScreen";
import ListScreen from "./src/screens/ListScreen";
import StateScreen from "./src/screens/StateScreen";
import ModalScreen from "./src/screens/ModalScreen";
import SwipeScreen from "./src/screens/SwipeScreen";
import CardScreen from "./src/screens/CardScreen";
import HeroDict from "./src/screens/HeroDict";
import LoadUsers from "./src/screens/LoadUsers";

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Component" component={ComponentScreen} />
        <Stack.Screen name="List" component={ListScreen} />
        <Stack.Screen
          name="State"
          component={StateScreen}
          option={{ title: "Learning UseState 🥸" }}
        />
        <Stack.Screen name="Modal" component={ModalScreen} />
        <Stack.Screen name="Swipe" component={SwipeScreen} />
        <Stack.Screen name="Card" component={CardScreen} />
        <Stack.Screen name="Hero" component={HeroDict} />
        <Stack.Screen name="Load" component={LoadUsers} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
