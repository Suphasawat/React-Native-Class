import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";

const ItemCard = ({
  title: initialTitle,
  price: initialPrice,
  status,
  types: initialType,
  onPress,
  onChange,
  onUpdate,
  onUpdateType,
}) => {
  const [title, setTitle] = useState(initialTitle);
  const [price, setPrice] = useState(initialPrice);
  const [types, setType] = useState(initialType);
  const [isEditing, setIsEditing] = useState(false);

  const isPurchased = status === "Bought";

  const handleEditPress = () => {
    setIsEditing(true);
  };

  const handleSavePress = () => {
    setIsEditing(false);
    onUpdate(title, price);
    onUpdateType(types);
  };

  return (
    <View style={[styles.card, { opacity: isPurchased ? 0.5 : 1 }]}>
      <View style={{ flexDirection: "row" }}>
        <View style={{ flex: 1 }}>
          {isEditing ? (
            <>
              <TextInput
                style={styles.Titletext}
                value={title}
                onChangeText={setTitle}
              />
              <TextInput
                style={styles.priceText}
                value={price}
                onChangeText={setPrice}
                keyboardType="numeric"
              />
              <TextInput
                style={styles.types}
                value={types}
                onChangeText={setType}
              />
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
            </>
          ) : (
            <>
              <Text
                style={[
                  styles.Titletext,
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
            </>
          )}
        </View>

        <View
          style={{
            flexDirection: "column",
            justifyContent: "center",
            marginRight: 8,
          }}
        >
          <TouchableOpacity onPress={onPress} style={styles.deleteButton}>
            <Icon name="delete" size={20} color="red" />
          </TouchableOpacity>

          {isEditing ? (
            <TouchableOpacity
              onPress={handleSavePress}
              style={styles.saveButton}
            >
              <Icon name="save" size={20} color="green" />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              onPress={handleEditPress}
              style={styles.editButton}
            >
              <Icon name="edit" size={20} color="blue" />
            </TouchableOpacity>
          )}
        </View>
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
  Titletext: {
    fontSize: 24,
    fontWeight: "bold",
    marginLeft: 8,
    marginBottom: 8,
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
    marginHorizontal: 10,
  },
  deleteButton: {
    backgroundColor: "white",
    padding: 10,
    borderRadius: 5,
    borderColor: "red",
    borderWidth: 1,
    alignItems: "center",
    marginBottom: 10,
  },
  editButton: {
    backgroundColor: "white",
    padding: 10,
    borderRadius: 5,
    borderColor: "blue",
    borderWidth: 1,
    alignItems: "center",
  },
  saveButton: {
    backgroundColor: "white",
    padding: 10,
    borderRadius: 5,
    borderColor: "green",
    borderWidth: 1,
    alignItems: "center",
  },
  types: {
    fontWeight: "bold",
    color: "#155fe1",
    marginHorizontal: 10,
    marginRight: 10,
    fontSize: 16,
  },
});

export default ItemCard;
