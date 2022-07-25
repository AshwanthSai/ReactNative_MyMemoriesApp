import React from "react";
import { View, StyleSheet, TouchableOpacity, Text } from "react-native";

import Icon from "./Icon/Icon";

function CategoryPickerItems({ item, onPress }) {
  console.log(item);
  return (
    <TouchableOpacity style={styles.contianer} onPress={onPress}>
      <Icon
        iconWithRoundBackground={true}
        changeIconLibrary={false}
        backgroundColor={item.backgroundColor}
        name={item.Icon}
        size={80}
      />
      <Text style={styles.label}>{item.label}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  contianer: {
    paddingHorizontal: 25,
    paddingVertical: 15,
    alignItems: "center",
    width: "34%",
  },
  label: {
    paddingTop: 7,
    textAlign: "center",
  },
});

export default CategoryPickerItems;
