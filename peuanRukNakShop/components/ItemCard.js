import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";

const ItemCard = ({
  title,
  price,
  status,
  image,
  types,
  onPress,
  onChange,
}) => {
  const isPurchased = status === "Bought";

  return (
    <View style={[styles.card, { opacity: isPurchased ? 0.5 : 1 }]}>
      {image && <Image source={{ uri: image }} style={styles.imageStyle} />}

      <View style={styles.row}>
        <Text
          style={[
            styles.text,
            styles.flexText,
            { textDecorationLine: isPurchased ? "line-through" : "none" },
          ]}
        >
          {title}
        </Text>
        <Text
          style={[
            styles.priceText,
            { textDecorationLine: isPurchased ? "line-through" : "none" },
          ]}
        >
          ${price}
        </Text>
        <Text
          style={[
            styles.types,
            { textDecorationLine: isPurchased ? "line-through" : "none" },
          ]}
        >
          #{types}
        </Text>
        <TouchableOpacity onPress={onChange}>
          <Text
            style={[
              styles.statusText,
              {
                color: isPurchased ? "red" : "black",
                textDecorationLine: isPurchased ? "line-through" : "none",
              },
            ]}
          >
            {status}
          </Text>
        </TouchableOpacity>
        {onPress && (
          <TouchableOpacity onPress={onPress} style={styles.deleteButton}>
            <Icon name="delete" size={20} color="red" />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "white",
    padding: 15,
    borderRadius: 10,
    margin: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 2,
  },
  row: {
    alignItems: "center",
    justifyContent: "space-between",
  },
  text: {
    fontSize: 16,
    fontWeight: "bold",
  },

  priceText: {
    fontWeight: "bold",
    color: "#28a745",
    marginHorizontal: 10,
    fontSize: 16,
  },
  statusText: {
    fontWeight: "bold",
    fontSize: 16,
  },
  imageStyle: {
    width: "100%",
    height: 200,
    borderRadius: 10,
    marginBottom: 10,
  },
  deleteButton: {
    backgroundColor: "white",
    padding: 10,
    borderRadius: 5,
    borderColor: "red",
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
    marginLeft: 10,
  },
  types: {
    fontWeight: "bold",
    color: "blue",
    marginHorizontal: 10,
    marginRight: 10,
    fontSize: 16,
  },
});

export default ItemCard;
