import React from "react";
import { StyleSheet, Text, View } from "react-native";
import colors from "../config/colors";
import SekeltonLoader from "./SekeltonLoader";

const ActivityLoader = () => {
  const arr = [{ id: 1 }];
  return (
    <View
      style={{
        alignItems: "center",
      }}
    >
      {arr.map((loader) => (
        <View style={{ marginTop: "15%" }} key={loader.id}>
          <SekeltonLoader />
        </View>
      ))}
    </View>
  );
};

export default ActivityLoader;

const styles = StyleSheet.create({});
