import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Button,
  Alert,
  Image,
  TouchableOpacity,
} from "react-native"; // Importing Alert and Image

const ComponentScreen = () => {
  // Updated the function signature
  const name = <Text style={styles.TextStyle}>2024</Text>;
  const ShowAlert = (title, msg) => {
    Alert.alert(title, msg, [
      { text: "OK", onPress: () => console.log("CLick OK") },
      { text: "Cancle", onPress: () => console.log("CLick Cancle") },
    ]);
  };

  return (
    <View style={styles.ViewStyle}>
      <TouchableOpacity onPress={() => ShowAlert("Pic Said", "มาสิวะ สีแสด")}>
        <Image
          style={styles.ImageStyle}
          source={require("../img/Chill_guy_original_artwork.jpg")}
        />
      </TouchableOpacity>

      <Text style={styles.TextStyle}>This is ComponentScreen</Text>
      <Text style={styles.TextStyle}>by Suphasawat</Text>
      {name}
      <View style={styles.ButtonStyle}>
        <Button
          title="Say Hi!"
          color="pink"
          onPress={() => ShowAlert("Butt said", "What the Faabb!!")} // Corrected onPress handler
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  ViewStyle: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  TextStyle: {
    fontSize: 24,
  },
  ImageStyle: {
    width: 150,
    height: 150,
    margin: 5,
    borderWidth: 7,
    borderColor: "#FFF",
    borderRadius: 75,
  },
  ButtonStyle: {
    width: 130,
  },
});

export default ComponentScreen;
