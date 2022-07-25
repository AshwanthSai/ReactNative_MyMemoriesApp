import React, { useState } from "react";
import {
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  Modal,
  Button,
  Text,
  FlatList,
} from "react-native";

import { MaterialCommunityIcons } from "@expo/vector-icons";
import defaultStyles from "../config/styles";
import Screen from "./Screen";
import colors from "../config/colors";
import AppButton from "./AppButton";

function AppPicker({
  icon,
  items,
  placeholder,
  selectedItem,
  onSelectedItem,
  numberOfColoms,
  PickerItemsComponent = PickerItems,
  width = "100%",
}) {
  const [ModalVisible, SetModalVisible] = useState(false);
  //This is custom componet to show and pick the catoegory in modal

  return (
    <>
      <TouchableWithoutFeedback onPress={() => SetModalVisible(true)}>
        <View style={[styles.container, { width }]}>
          {icon && (
            <MaterialCommunityIcons
              name={icon}
              size={20}
              color={defaultStyles.colors.medium}
              style={styles.icon}
            />
          )}

          {selectedItem ? (
            <Text style={styles.text}>{selectedItem}</Text>
          ) : (
            <Text style={styles.placeholder}>{placeholder}</Text>
          )}

          <MaterialCommunityIcons
            name="chevron-down"
            size={20}
            color={defaultStyles.colors.medium}
          />
        </View>
      </TouchableWithoutFeedback>

      <Modal visible={ModalVisible} animationType="slide">
        <Screen>
          <FlatList
            data={items}
            keyExtractor={(item) => item.value.toString()}
            numColumns={numberOfColoms}
            renderItem={({ item }) => (
              <PickerItemsComponent
                onPress={() => {
                  SetModalVisible(false);
                  onSelectedItem(item.label);
                }}
                item={item}
                label={item.label}
              />
            )}
          />
          <AppButton title="close" onPress={() => SetModalVisible(false)} />
        </Screen>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: defaultStyles.colors.white,
    borderRadius: 25,
    flexDirection: "row",
    padding: 15,
    marginVertical: 10,
    borderColor: colors.primary,
    shadowColor: "#000",
    shadowOffset: { width: 0.6, height: 0.4 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 9,
    borderRadius: 10,
    borderWidth: 1,
  },
  placeholder: {
    color: defaultStyles.colors.grey,
    flex: 1,
  },
  icon: {
    marginRight: 10,
  },
  text: {
    flex: 1,
    color: colors.black,
  },
});

export default AppPicker;
