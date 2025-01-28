import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  FlatList,
  ScrollView,
} from "react-native";
import Card from "../components/Card";
import CustomButton from "../components/CustomButton";

const HeroDict = () => {
  const [searchText, setSearchText] = useState("");
  const [hero, setHero] = useState([
    {
      id: "1",
      title: "SUNSPOT",
      content:
        "Sunspot channels solar energy to become a powerhouse of unbelievable strength, helps the X-Men, and runs a multi-billion dollar company.",
      image: "https://cdn.marvel.com/content/1x/306ssp_com_crd_01.jpg",
    },
    {
      id: "2",
      image: "https://cdn.marvel.com/content/1x/348abm_com_crd_01.jpg",
      title: "ABOMINATION",
      content:
        "Savage and full of a blind rage, Abomination is the Hulk’s foremost foe and while able to crush him, he often faces defeat himself.",
    },
    {
      id: "3",
      image: "https://cdn.marvel.com/content/1x/428all_com_crd_01.jpg",
      title: "Aero",
      content:
        "With the power of the wind at her command, Lei Ling is the master of the sky and the protector of Shanghai!",
    },
  ]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState("");

  const filteredHeroes = hero.filter((hero) =>
    hero.title.toLowerCase().includes(searchText.toLowerCase())
  );

  const addHero = () => {
    if (!title.trim() || !content.trim() || !image.trim()) {
      alert("Please enter the name, imfo and image");
      return;
    }
    const newHero = { id: Date.now().toString(), image, title, content };
    setHero((preHeros) => [newHero, ...preHeros]);
    setTitle("");
    setContent("");
    setImage("");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Search Heros 👺</Text>
      <TextInput
        style={styles.input}
        placeholder="Search by Name"
        value={searchText}
        onChangeText={setSearchText}
      />

      <TextInput
        style={styles.input}
        placeholder="Enter Hero name"
        value={title}
        onChangeText={setTitle}
      />
      <TextInput
        style={styles.input}
        placeholder="Enter Hero infomation"
        value={content}
        onChangeText={setContent}
      />
      <TextInput
        style={styles.input}
        placeholder="Enter Hero Image"
        value={image}
        onChangeText={setImage}
      />
      <CustomButton
        title="Create Hero"
        backgroundColor="#C70039"
        onPress={addHero}
      />

      <FlatList
        data={filteredHeroes}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => {
          return (
            <Card
              title={item.title}
              content={item.content}
              image={item.image}
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

export default HeroDict;
