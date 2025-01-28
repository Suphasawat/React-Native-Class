import React from "react";
import { ScrollView, View, Text, StyleSheet, Image } from "react-native";
import CustomButton from "./CustomButton";
import Icon from "react-native-vector-icons/MaterialIcons";

const Card = ({ title, content, onPress, image }) => {
  return (
    <ScrollView>
      <View style={styles.card}>
        <View style={styles.deleteButton}>
          <View style={{ flex: 1 }}>
            {image && (
              <Image
                source={{
                  uri: image,
                }}
                style={styles.imageStyle}
              />
            )}
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.content}>{content}</Text>
          </View>
          {onPress && (
            <CustomButton
              onPress={onPress}
              backgroundColor="red"
              title={<Icon name="delete" size={50} color="white" />}
            />
          )}
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    margin: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 2,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  content: {
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 10,
  },
  imageStyle: {
    width: 310,
    height: 300,
    borderRadius: 10,
    marginBottom: 10,
  },
  deleteButton: {
    flexDirection: "row",
  },
});
export default Card;
