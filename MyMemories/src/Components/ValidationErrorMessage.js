import React from "react";
import { StyleSheet, Text } from "react-native";
import colors from "../config/colors";

function ValidationErrorMessage({ error, visible }) {
  if (!visible || !error) return null;
  return <Text style={styles.error}>{error}</Text>;
}

const styles = StyleSheet.create({
  error: {
    color: colors.primary,
    marginLeft: 15,
    textAlign: "left",
    alignSelf: "flex-start",
  },
});

export default ValidationErrorMessage;
