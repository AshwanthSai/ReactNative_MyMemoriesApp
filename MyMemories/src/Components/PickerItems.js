import React from "react";
import { TouchableOpacity, StyleSheet, Text } from "react-native";

import { MaterialCommunityIcons } from "@expo/vector-icons";

function PickerItems({ label, onPress, item }) {
  return (
    <TouchableOpacity onPress={onPress}>
      <Text style={styles.text}>{item.label}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  text: {
    padding: 20,
  },
});

export default PickerItems;
