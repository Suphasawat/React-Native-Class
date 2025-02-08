// import React from "react";
// import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
// import Icon from "react-native-vector-icons/MaterialIcons";

// const TotalSummary = ({ price, onPress }) => {
//   return (
//     <View style={styles.container}>
//       <Text style={styles.priceText}>💰 Total: ${price.toFixed(2)}</Text>
//       {onPress && (
//         <TouchableOpacity onPress={onPress} style={styles.deleteButton}>
//           <Icon name="delete" size={22} color="white" />
//         </TouchableOpacity>
//       )}
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     backgroundColor: "#fff",
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//     padding: 15,
//     borderRadius: 10,
//     marginTop: 20,
//     shadowColor: "#000",
//     shadowOpacity: 0.1,
//     shadowOffset: { width: 0, height: 3 },
//     shadowRadius: 5,
//     elevation: 4,
//   },
//   priceText: {
//     fontSize: 20,
//     fontWeight: "bold",
//     color: "#333",
//   },
//   deleteButton: {
//     backgroundColor: "#dc3545",
//     padding: 10,
//     borderRadius: 5,
//     alignItems: "center",
//     justifyContent: "center",
//   },
// });

// export default TotalSummary;
import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";

const TotalSummary = ({ price, onPress }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.priceText}>💰 Total: ${price.toFixed(2)}</Text>
      {onPress && (
        <TouchableOpacity onPress={onPress} style={styles.deleteButton}>
          <Icon name="delete" size={22} color="white" />
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 15,
    borderRadius: 10,
    marginTop: 20,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 5,
    elevation: 4,
    position: "absolute", // This makes the component stay fixed
    bottom: 0, // Position at the bottom
    left: 0,
    right: 0,
  },
  priceText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
  },
  deleteButton: {
    backgroundColor: "#dc3545",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default TotalSummary;
