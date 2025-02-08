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
import TotalSummary from "../components/TotalSummary";
import Icon from "react-native-vector-icons/AntDesign";

const STORAGE_KEY = "@card_data";
const STORAGE_KEY_TYPE = "@type_data";

const AddToCart = () => {
  const [itemName, setItemName] = useState("");
  const [itemPrice, setItemPrice] = useState("");
  const [status, setStatus] = useState("Not yet bought");
  const [items, setItems] = useState([]);
  const [isVisible, setIsVisible] = useState(false);
  const [isVisibleType, setIsVisibleType] = useState(false);
  const [searchItem, setSearchItem] = useState("");
  const [type, setType] = useState([]);
  const [newType, setNewType] = useState("");
  const [selectedType, setSelectedType] = useState(null);

  const totalPrice = items
    .filter((item) => item.status === "Not yet bought")
    .reduce((total, item) => total + item.itemPrice, 0);

  const itemStatus = ["Not yet bought", "Bought"];

  const toggleAddButton = () => {
    setIsVisible(!isVisible);
  };

  const toggleAddTypeButton = () => {
    setIsVisibleType(!isVisibleType);
  };

  const addItem = async () => {
    if (!itemName.trim() || isNaN(itemPrice) || parseFloat(itemPrice) <= 0) {
      alert("Please enter a valid title and price above 0");
      return;
    }

    if (!selectedType) {
      alert("Please select a type before adding an item.");
      return;
    }

    const newItem = {
      id: Date.now().toString(),
      itemName,
      itemPrice: parseFloat(itemPrice),
      status,
      type: selectedType,
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

  const addType = async () => {
    if (!newType.trim()) {
      alert("Please enter a valid type");
      return;
    }

    if (type.includes(newType)) {
      alert("This type already exists! Please enter a different one.");
      return;
    }

    const updatedTypes = [...type, newType];
    setType(updatedTypes);
    setNewType("");
    setIsVisibleType(!isVisibleType);

    try {
      await AsyncStorage.setItem(
        STORAGE_KEY_TYPE,
        JSON.stringify(updatedTypes)
      );
    } catch (error) {
      console.error("Failed to add Type: ", error);
    }
  };

  const deleteType = async (typeToDelete) => {
    const updatedTypes = type.filter((item) => item !== typeToDelete);
    setType(updatedTypes);
    try {
      await AsyncStorage.setItem(
        STORAGE_KEY_TYPE,
        JSON.stringify(updatedTypes)
      );
    } catch (error) {
      console.error("Failed to delete type: ", error);
    }
  };

  const deleteItem = async (id) => {
    const updatedItems = items.filter((item) => item.id !== id);
    setItems(updatedItems);
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updatedItems));
    } catch (error) {
      console.error("Failed to delete item: ", error);
    }
  };

  const deleteAllItems = async () => {
    setItems([]);
    try {
      await AsyncStorage.removeItem(STORAGE_KEY);
    } catch (error) {
      console.error("Failed to delete all items: ", error);
    }
  };

  const loadItems = async () => {
    try {
      const storedItems = await AsyncStorage.getItem(STORAGE_KEY);
      const storedTypes = await AsyncStorage.getItem(STORAGE_KEY_TYPE);
      if (storedItems) {
        setItems(JSON.parse(storedItems));
      }
      if (storedTypes) {
        setType(JSON.parse(storedTypes));
      }
    } catch (error) {
      console.error("Failed to load items: ", error);
    }
  };

  const statusChange = (id) => {
    const updatedItems = items.map((item) => {
      if (item.id === id) {
        return {
          ...item,
          status: item.status === itemStatus[0] ? itemStatus[1] : itemStatus[0],
        };
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

  const filteredItem = items.filter((item) =>
    item?.itemName?.toLowerCase().includes(searchItem.toLowerCase())
  );

  useEffect(() => {
    loadItems();
  }, []);

  return (
    <View style={styles.container}>
      {/* แสดง Search bar */}
      {!isVisible && (
        <TextInput
          style={styles.input}
          placeholder="Search Item Name"
          value={searchItem}
          onChangeText={setSearchItem}
        />
      )}

      {/* ปุ่ม add item */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={toggleAddButton} style={[styles.addButton]}>
          <Text style={styles.buttonText}>
            ➕ {isVisible ? "Search items" : "Add Items"}
          </Text>
        </TouchableOpacity>

        {/* ปุ่ม add type */}
        {!isVisible && (
          <TouchableOpacity
            onPress={() => {
              toggleAddTypeButton();
            }}
            style={styles.addTypeButton}
          >
            <Text style={styles.buttonText}>➕ Add type</Text>
          </TouchableOpacity>
        )}
      </View>

      {/* แสดง Textinput add type หลังจากกด add type */}
      {isVisibleType && !isVisible && (
        <View>
          <TextInput
            style={styles.input}
            placeholder="Enter New Type"
            value={newType}
            onChangeText={setNewType}
          />
          <TouchableOpacity
            onPress={() => {
              addType();
            }}
            style={styles.addTypeButton2}
          >
            <Text style={styles.buttonText}>➕ Add type</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* แสดง Textinput add item หลังจากกด add item */}
      {isVisible && (
        <View>
          <Text style={styles.header}>🛒 Add items To the Cart</Text>
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
            onChangeText={(text) => setItemPrice(text.replace(/[^0-9.]/g, ""))}
            keyboardType="numeric"
          />
          <View style={styles.typeContainer}>
            <FlatList
              data={type}
              keyExtractor={(item, index) => index.toString()}
              horizontal
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={[
                    styles.typeButton,
                    selectedType === item && styles.selectedTypeButton,
                  ]}
                  onPress={() => setSelectedType(item)}
                >
                  <Text style={styles.typeText}>
                    {item}
                    <TouchableOpacity onPress={() => deleteType(item)}>
                      <Icon
                        name="close"
                        size={20}
                        color="red"
                        style={{ marginLeft: 5 }}
                      />
                    </TouchableOpacity>
                  </Text>
                </TouchableOpacity>
              )}
            />
          </View>

          {/* ปุ่ม add item */}
          <TouchableOpacity onPress={addItem} style={styles.addButton2}>
            <Text style={styles.buttonText}>➕ Add Item</Text>
          </TouchableOpacity>
        </View>
      )}

      <FlatList
        data={filteredItem}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <ItemCard
            title={item.itemName}
            price={item.itemPrice}
            status={item.status}
            types={item.type}
            onPress={() => deleteItem(item.id)}
            onChange={() => statusChange(item.id)}
          />
        )}
        style={styles.cardList}
      />

      <TotalSummary price={totalPrice} onPress={deleteAllItems} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#f0f4f8",
    flex: 1,
  },
  header: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 10,
    textAlign: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    padding: 12,
    fontSize: 18,
    backgroundColor: "#fff",
    marginBottom: 12,
  },
  addButton: {
    flex: 1,
    backgroundColor: "#28a745",
    padding: 12,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 10,
    marginHorizontal: 5,
  },
  buttonText: {
    fontSize: 18,
    color: "white",
    fontWeight: "bold",
  },
  cardList: {
    marginTop: 10,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  typeContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
    textAlign: "center",
  },
  typeText: {
    color: "black",
    fontWeight: "bold",
  },
  typeButton: {
    flex: 1,
    backgroundColor: "white",
    padding: 12,
    borderColor: "#f59800",
    borderWidth: 2,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 10,
    marginHorizontal: 5,
  },
  selectedTypeButton: {
    backgroundColor: "#dc3545",
  },
  addTypeButton: {
    flex: 1,
    backgroundColor: "#900C3F",
    padding: 12,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 10,
    marginHorizontal: 5,
  },
  addTypeButton2: {
    backgroundColor: "#907214",
    padding: 12,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 10,
    marginHorizontal: 5,
  },
  addButton2: {
    backgroundColor: "#903414",
    padding: 12,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 10,
    marginHorizontal: 5,
  },
});

export default AddToCart;
