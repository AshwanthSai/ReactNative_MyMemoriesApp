import { StyleSheet, Text, View, Image } from "react-native";
import React from "react";
import colors from "../config/colors";
import Icon from "./Icon/Icon";
import { TouchableOpacity } from "react-native";

const MemoryCard = ({
  image,
  uri,
  title,
  subtile,
  category,
  onDeletePress,
  onEditPress,
}) => {
  return (
    <View
      style={{
        backgroundColor: colors.white,
        width: "95%",
        alignSelf: "center",
        borderRadius: 10,
        paddingBottom: 10,
      }}
    >
      <TouchableOpacity
        onPress={onDeletePress}
        style={{
          position: "absolute",
          top: 5,
          zIndex: 1,
          right: 10,
          flexDirection: "row",
        }}
      >
        <Icon
          iconWithRoundBackground={true}
          backgroundColor={colors.danger}
          name="delete"
        />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={onEditPress}
        style={{
          position: "absolute",
          top: 5,
          zIndex: 1,
          right: 55,
          flexDirection: "row",
        }}
      >
        <Icon
          iconWithRoundBackground={true}
          backgroundColor={colors.blue}
          name="circle-edit-outline"
        />
      </TouchableOpacity>
      {!uri && image && <Image style={styles.image} source={image} />}
      {uri && <Image style={styles.image} source={{ uri: uri }} />}
      <View style={{ marginLeft: "4%", marginTop: "4%", padding: 5 }}>
        <View>
          <Text style={styles.titleText}>{`Category: ${category}`}</Text>
        </View>
        <View>
          <Text style={styles.titleText}>{title}</Text>
        </View>
        <View>
          <Text style={styles.subtitleText}>{subtile}</Text>
        </View>
      </View>
    </View>
  );
};

export default MemoryCard;

const styles = StyleSheet.create({
  image: {
    height: 230,
    width: "100%",
    overflow: "hidden",
    borderRadius: 4,
  },
  titleText: {
    color: colors.primary,
    fontSize: 18,
    marginBottom: "3%",
  },
  subtitleText: {
    color: colors.medium,
    fontSize: 15,
  },
});
