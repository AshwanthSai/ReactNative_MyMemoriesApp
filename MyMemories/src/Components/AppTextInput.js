import React from "react";
import {
  View,
  TextInput,
  StyleSheet,
  Platform,
  Image,
  TouchableOpacity,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";

import defaultStyles from "../config/styles";
import colors from "../config/colors";
import Icon from "./Icon/Icon";

function AppTextInput({
  leftIcon,
  rightIcon,
  changeIconLibrary = false,
  width = "100%",
  backgroundColor2 = colors.white,
  changeinputField,
  top = 4,
  marginRight = 0,
  editable,
  imageIcon = false,
  imageIconPath,
  onRightIconPress,
  alignItems = "center",
  ...otherProps
}) {
  return (
    <View
      style={[
        styles.container,
        { width, backgroundColor: backgroundColor2, alignItems: alignItems },
      ]}
    >
      {/* {imageIcon && (
        <Image
          style={{
            width: 20,
            height: 20,
            marginRight: "2%",
            alignSelf: "center",
          }}
          source={imageIconPath}
        />
      )} */}
      {Icon && changeIconLibrary && !imageIcon ? (
        <FontAwesome
          name={leftIcon}
          size={20}
          color={defaultStyles.colors.primary}
          style={[styles.icon]}
        />
      ) : (
        leftIcon &&
        !imageIcon && (
          <MaterialCommunityIcons
            name={leftIcon}
            size={20}
            color={defaultStyles.colors.primary}
            style={styles.icon}
          />
        )
      )}
      <TextInput
        editable={editable}
        placeholderTextColor={colors.medium}
        style={[
          defaultStyles.text,
          {
            marginRight: marginRight,
            width: rightIcon ? "80%" : "90%",
            textAlign: "justify",
          },
        ]}
        {...otherProps}
      />
      {rightIcon && (
        <TouchableOpacity
          onPress={onRightIconPress}
          style={{
            flex: 1,
            alignItems: "flex-end",
          }}
        >
          <MaterialCommunityIcons
            name={rightIcon}
            size={20}
            color={defaultStyles.colors.primary}
          />
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 10,
    borderWidth: 1,
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    marginVertical: 10,
    borderColor: colors.primary,
    shadowColor: "#000",
    shadowOffset: { width: 0.6, height: 0.4 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 9,
    // backgroundColor: colors.white,
  },
  icon: {
    marginRight: 10,
  },
});

export default AppTextInput;
