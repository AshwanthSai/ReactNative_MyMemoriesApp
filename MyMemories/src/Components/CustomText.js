import { useFonts } from "expo-font";
import React from "react";
import { Text } from "react-native";

const CustomText = ({ text, ...rest }) => {
  let [fontloaded] = useFonts({
    Poppins_Light: require("../assets/fonts/Poppins-Light.ttf"),
    Poppins_Medium: require("../assets/fonts/Poppins-Medium.ttf"),
    Poppins_Bold: require("../assets/fonts/Poppins-Bold.ttf"),
    Oasis: require("../assets/fonts/Oasis.ttf"),
    Montserrat: require("../assets/fonts/MontserratAlternates-Bold.ttf"),
  });
  if (fontloaded) {
    return <Text {...rest}>{text}</Text>;
  } else {
    return null;
  }
};

export default CustomText;
