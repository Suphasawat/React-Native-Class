import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";

const ItemCard = ({ title, price, status, image, onPress }) => {
  const isPurchased = status === "bought";

  return (
    <View style={[styles.card, isPurchased && styles.purchasedCard]}>
      <View style={{ flexDirection: "row" }}>
        <View style={{ flex: 1, opacity: isPurchased ? 0.5 : 1 }}>
          {image && <Image source={{ uri: image }} style={styles.imageStyle} />}
          <Text style={[styles.text, isPurchased && styles.strikethroughText]}>
            {title}
          </Text>
          <Text style={[styles.text, isPurchased && styles.strikethroughText]}>
            {price}
          </Text>
          <Text style={[styles.text, isPurchased && styles.strikethroughText]}>
            {status}
          </Text>
        </View>
        {onPress && (
          <TouchableOpacity onPress={onPress} style={styles.deleteButton}>
            <Icon name="delete" size={30} color="white" />
          </TouchableOpacity>
        )}
      </View>
    </View>
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
  purchasedCard: {
    opacity: 0.6, // ลดความชัดของการ์ด
  },
  text: {
    fontSize: 16,
  },
  strikethroughText: {
    textDecorationLine: "line-through",
  },
  imageStyle: {
    width: 310,
    height: 300,
    borderRadius: 10,
    marginBottom: 10,
  },
  deleteButton: {
    backgroundColor: "red",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default ItemCard;
