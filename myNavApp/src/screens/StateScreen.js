import React, { useState } from "react";
import { View, Text, StyleSheet, Button } from "react-native";

const StateScreen = () => {
  const [value, setValue] = useState(0);
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{value}</Text>
      <View style={styles.button}>
        <Button
          title="Increase"
          onPress={() => {
            setValue(value + 1);
          }}
        />
        <Button
          title="Decrease"
          color="red"
          onPress={() => {
            setValue(value - 1);
          }}
        />
        <Button
          title="Reset"
          color="green"
          onPress={() => {
            setValue(0);
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
