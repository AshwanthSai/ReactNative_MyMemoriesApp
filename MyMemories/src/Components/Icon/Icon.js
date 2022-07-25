import React from "react";
import { View, StyleSheet } from "react-native";
import { MaterialCommunityIcons, FontAwesome5 } from "@expo/vector-icons";

function Icon({
  name = "email",
  size = 40,
  color = "white",

  backgroundColor = "black",
  changeIconLibrary = false,
  onPress,
  marginRight = 0,

  iconWithRoundBackground = false,
  ...style
}) {
  return (
    <>
      {iconWithRoundBackground ? (
        <View
          style={[
            styles.icon,
            { backgroundColor: backgroundColor },
            { marginRight: marginRight },
            { width: size },
            { height: size },
            { borderRadius: size },
          ]}
        >
          {changeIconLibrary ? (
            <FontAwesome5
              {...style}
              name={name}
              size={size * 0.5}
              color={color}
            />
          ) : (
            <MaterialCommunityIcons
              onPress={onPress}
              name={name}
              size={size * 0.5}
              color={color}
            />
          )}
        </View>
      ) : (
        <>
          {changeIconLibrary ? (
            <FontAwesome5
              {...style}
              name={name}
              size={size}
              color={color}
              onPrpess={onPress}
            />
          ) : (
            <MaterialCommunityIcons
              {...style}
              onPress={onPress}
              name={name}
              size={size}
              color={color}
            />
          )}
        </>
      )}
    </>
  );
}
const styles = StyleSheet.create({
  icon: {
    width: 40,
    height: 40,
    borderRadius: 40 / 2,
    backgroundColor: "black",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 0,
  },
});

export default Icon;
