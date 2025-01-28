import React, { useEffect, useState } from "react";
import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  TextInput,
  FlatList,
} from "react-native";
import Card from "../components/Card";
import CustomButton from "../components/CustomButton";
import AsyncStorage from "@react-native-async-storage/async-storage";

const STORAGE_KEY = "@card_data";

const CardScreen = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [cards, setCards] = useState([]);

  const addCard = async () => {
    if (!title.trim() || !content.trim()) {
      alert("Please enter the title and content");
      return;
    }
    const newCard = { id: Date.now().toString(), title, content };
    const updatedCards = [newCard, ...cards];
    setCards(updatedCards);
    setTitle("");
    setContent("");

    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updatedCards));
    } catch (error) {
      console.log("Error saving card: ", error);
    }
  };

  const loadCards = async () => {
    try {
      const storedCards = await AsyncStorage.getItem(STORAGE_KEY);
      if (storedCards) {
        setCards(JSON.parse(storedCards));
      }
    } catch (error) {
      console.error("Failed to load cards: ", error);
    }
  };

  const deleteCard = (id) => {
    const updatedCards = cards.filter((item) => item.id !== id);
    setCards(updatedCards);

    AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updatedCards));
  };

  useEffect(() => {
    loadCards();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>ทดสอบสร้างการ์ด 😁</Text>
      <TextInput
        style={styles.input}
        placeholder="ใส่หัวข้อ..."
        value={title}
        onChangeText={setTitle}
      />
      <TextInput
        style={styles.input}
        placeholder="ใส่เนื้อหา..."
        value={content}
        onChangeText={setContent}
      />
      <CustomButton
        title="Create Card"
        backgroundColor="black"
        onPress={addCard}
      />
      <FlatList
        data={cards}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => {
          return (
            <Card
              title={item.title}
              content={item.content}
              onPress={() => deleteCard(item.id)}
            />
          );
        }}
        contentContainerStyle={styles.cardList}
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
});

export default CardScreen;
