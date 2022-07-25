import React from "react";
import { TouchableOpacity, StyleSheet, Text } from "react-native";

import colors from "../config/colors";
import { ActivityIndicator, Colors } from "react-native-paper";

function AppButton({
  marginTop,
  title,
  color = "primary",
  onPress,
  navigation,
  width = "90%",
  loading = false,
  disabled = false,
}) {
  return (
    <TouchableOpacity
      disabled={disabled}
      style={[
        styles.button,
        { backgroundColor: colors[color], marginTop: marginTop, width: width },
      ]}
      onPress={onPress}
    >
      {loading ? (
        <ActivityIndicator animating={true} color={colors.white} />
      ) : (
        <Text style={styles.Text}>{title}</Text>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.primary,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    padding: 15,
    width: "90%",
    marginVertical: 10,
    alignSelf: "center",
  },
  Text: {
    color: colors.white,
    fontSize: 18,
    textTransform: "uppercase",
    fontWeight: "bold",
  },
});

export default AppButton;
