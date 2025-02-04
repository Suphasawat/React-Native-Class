import React, { useState, useReducer } from "react";
import { View, Text, StyleSheet, Button } from "react-native";

const initialState = { count: 0 };

const reducer = (state, action) => {
  switch (action.type) {
    case "increment":
      return { count: state.count + 1 };
    case "decrement":
      return { count: state.count - 1 };
    case "reset":
      return initialState;
    default:
      return state;
  }
};

const StateScreen = () => {
  // const [value, setValue] = useState(0);

  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>{state.count}</Text>
      <View style={styles.button}>
        <Button
          title="Increase"
          onPress={
            () => dispatch({ type: "increment" })
            // setValue(value + 1);
          }
        />
        <Button
          title="Decrease"
          color="red"
          onPress={() => {
            dispatch({ type: "decrement" });
            // setValue(value - 1);
          }}
        />
        <Button
          title="Reset"
          color="green"
          onPress={() => {
            dispatch({ type: "reset" });
            // setValue(0);
          }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  text: {
    fontSize: 250,
  },
  button: {
    width: 250,
    gap: 5,
  },
});

export default StateScreen;
