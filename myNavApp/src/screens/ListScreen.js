import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  Modal,
  TouchableOpacity,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import { SwipeListView } from "react-native-swipe-list-view";

const ListScreen = () => {
  const [listData, setListData] = useState([
    { key: "1", name: "Piya", status: "phone", time: "yesterday" },
    { key: "2", name: "Somchai", status: "phone", time: "Sunday" },
    { key: "3", name: "Piya", status: "phone", time: "Sunday" },
    { key: "4", name: "Mom", status: "phone", time: "Saturday" },
    { key: "5", name: "Somchai", status: "phone", time: "Saturday" },
    { key: "6", name: "Somchai", status: "phone", time: "Saturday" },
    { key: "7", name: "John", status: "phone", time: "Friday" },
    { key: "8", name: "Somjit", status: "phone", time: "Friday" },
    { key: "9", name: "Piya", status: "phone", time: "Thursday" },
    { key: "10", name: "Mom", status: "phone", time: "Thursday" },
  ]);

  const [isVisible, setIsVisible] = useState(false);
  const [selectedName, setSelectedName] = useState("");

  const deleteItem = (key) => {
    const newList = listData.filter((item) => item.key != key);
    setListData(newList);
  };

  return (
    <View style={styles.ViewStyle}>
      <Text style={styles.title}>Recents</Text>
      <SwipeListView
        data={listData}
        keyExtractor={(item) => item.key}
        renderItem={({ item }) => {
          return (
            <TouchableOpacity
              onPress={() => {
                {
                  setIsVisible(true);
                  setSelectedName(item.name);
                }
              }}
            >
              <View style={styles.RecordView}>
                <View style={styles.row}>
                  <Image
                    style={styles.ImageStyle}
                    source={require("../img/Chill_guy_original_artwork.jpg")}
                  />
                  <View style={styles.leftContainer}>
                    <Text style={styles.TextStyle}>{item.name}</Text>
                    <Text style={styles.status}>{item.status}</Text>
                  </View>
                  <Text style={styles.timeText}>{item.time}</Text>
                </View>
              </View>
            </TouchableOpacity>
          );
        }}
        renderHiddenItem={({ item }) => (
          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => deleteItem(item.key)}
          >
            <Text style={styles.actionText}>Delete{item.name}</Text>
          </TouchableOpacity>
        )}
        rightOpenValue={-120}
        // disableRightSwipe={true}
        onSwipeValueChange={(swipeData) => {
          const { key, value } = swipeData;
          value <= -250 ? deleteItem(key) : null;
        }}
      />

      <Modal
        transparent={true}
        animationType="fade"
        visible={isVisible}
        onPress={() => setIsVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalText}>กำลังโทรหา... {selectedName}</Text>
            <Image
              style={styles.ImageModal}
              source={require("../img/Chill_guy_original_artwork.jpg")}
            />
            <TouchableOpacity
              style={styles.okButton}
              onPress={() => setIsVisible(false)}
            >
              <Icon name="call-end" size={50} color="white" />
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  RecordView: {
    height: 110,
    padding: 20,
    backgroundColor: "black",
    borderColor: "white",
    borderWidth: 1,
    borderStyle: "solid",
  },
  TextStyle: {
    color: "#fff",
    fontSize: 28,
  },
  title: {
    fontSize: 40,
    color: "#fff",
    fontWeight: "bold",
    marginVertical: 15,
  },
  status: {
    color: "#727375",
    fontSize: 20,
  },
  ViewStyle: {
    backgroundColor: "black",
  },
  row: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  leftContainer: {
    paddingLeft: 20,
    flex: 1,
  },
  timeText: {
    color: "#b6b6b6",
    fontSize: 25,
    textAlign: "right",
  },
  ImageStyle: {
    width: 50,
    height: 50,
    margin: 5,
    borderWidth: 1,
    borderColor: "#FFF",
    borderRadius: 25,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContainer: {
    width: 300,
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
  },
  modalText: {
    fontSize: 30,
    marginVertical: 15,
    color: "#333",
  },
  okButton: {
    backgroundColor: "red",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  okButtonText: {
    fontSize: 18,
    color: "#fff",
    fontWeight: "bold",
  },
  ImageModal: {
    width: 150,
    height: 150,
    margin: 5,
    borderWidth: 1,
    borderColor: "#FFF",
    borderRadius: 100,
  },
  actionButton: {
    backgroundColor: "#ff5252",
    justifyContent: "center",
    alignItems: "flex-end",
    height: "100%",
    paddingHorizontal: 20,
  },
  actionText: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
  },
});

export default ListScreen;
