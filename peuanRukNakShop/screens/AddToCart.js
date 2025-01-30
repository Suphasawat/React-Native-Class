import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  FlatList,
  TouchableOpacity,
} from "react-native";
import ItemCard from "../components/ItemCard";
import AsyncStorage from "@react-native-async-storage/async-storage";

const STORAGE_KEY = "@card_data";

const AddToCart = () => {
  const [itemName, setItemName] = useState("");
  const [itemPrice, setItemPrice] = useState("");
  const [status, setStatus] = useState("Not yet bought");
  const [items, setItems] = useState([]);

  const itemStatus = ["Not yet bought", "Bought"];

  const addItem = async () => {
    if (!itemName.trim() || isNaN(itemPrice) || parseFloat(itemPrice) <= 0) {
      alert("Please enter the title and price greater than 0");
      return;
    }

    const newItem = {
      id: Date.now().toString(),
      itemName,
      itemPrice: parseFloat(itemPrice),
      status,
    };
    const updatedItems = [newItem, ...items];
    setItems(updatedItems);
    setItemName("");
    setItemPrice("");
    setStatus("Not yet bought");

    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updatedItems));
    } catch (error) {
      console.error("Failed to add items: ", error);
    }
  };

  const deleteItem = (id) => {
    const updatedItems = items.filter((item) => item.id !== id);
    setItems(updatedItems);
    try {
      AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updatedItems));
    } catch (error) {
      console.error("Failed to delete item: ", error);
    }
  };

  const loadItems = async () => {
    try {
      const storedItems = await AsyncStorage.getItem(STORAGE_KEY);
      if (storedItems) {
        setItems(JSON.parse(storedItems));
      }
    } catch (error) {
      console.error("Failed to load items: ", error);
    }
  };

  useEffect(() => {
    loadItems();
  }, []);

  const statusChange = (id) => {
    const updatedItems = items.map((item) => {
      if (item.id === id) {
        if (item.status === itemStatus[0]) {
          return { ...item, status: itemStatus[1] };
        }
        return { ...item, status: itemStatus[0] };
      }
      return item;
    });
    setItems(updatedItems);
    try {
      AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updatedItems));
    } catch (error) {
      console.error("Failed to update item status: ", error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Add items To the Cart</Text>
      <TextInput
        style={styles.input}
        placeholder="Item Name"
        value={itemName}
        onChangeText={setItemName}
      />
      <TextInput
        style={styles.input}
        placeholder="Item Price"
        value={itemPrice}
        onChangeText={setItemPrice}
        keyboardType="numeric"
      />
      <TouchableOpacity onPress={() => addItem()} style={styles.Button}>
        Add Item
      </TouchableOpacity>
      <FlatList
        data={items}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => {
          return (
            <ItemCard
              title={item.itemName}
              price={item.itemPrice}
              status={item.status}
              onPress={() => deleteItem(item.id)}
              onChange={() => statusChange(item.id)}
            />
          );
        }}
        style={styles.cardList}
      />
      
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#f5f5f5",
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    fontSize: 18,
    marginBottom: 10,
  },
  cardList: {
    marginTop: 10,
  },
  Button: {
    fontSize: 20,
    color: "white",
    fontFamily: "monospace",
    fontWeight: "bold",
    backgroundColor: "#f5793b",
    alignItems: "center",
    padding: 10,
    borderRadius: 5,
    textTransform: "uppercase",
  },
});

export default AddToCart;
