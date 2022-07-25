import React, { useEffect, useState } from "react";
import {
  View,
  Image,
  StyleSheet,
  TouchableHighlight,
  TouchableOpacity,
  Text,
  FlatList,
  Platform,
} from "react-native";

import colors from "../config/colors";
import Icon from "./Icon/Icon";

import CustomText from "./CustomText";
import fontFamily from "../config/fontFamily";

function ListItem({
  title,

  subtitle,

  image,
  IconComponent,
  onPress,
  hideChevron = false,
  onImagePress,
}) {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.container}>
        {IconComponent}
        {image && (
          <TouchableOpacity activeOpacity={0.3} onPress={onImagePress}>
            <Image source={image} style={styles.image} />
          </TouchableOpacity>
        )}

        <View style={styles.detailContainer}>
          <CustomText style={styles.title} text={title} />
          {subtitle && <CustomText text={subtitle} style={styles.subtitle} />}
        </View>
        {!hideChevron && (
          <Icon name="chevron-right" color={colors.primary} size={20} />
        )}
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container2: {
    backgroundColor: colors.white,
  },
  container: {
    alignItems: "center",
    flexDirection: "row",
    padding: 15,
    backgroundColor: colors.white,
    marginBottom: "2%",
  },
  detailContainer: {
    flex: 1,
    marginLeft: "3%",
    justifyContent: "center",
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 35,
    marginRight: 10,
  },

  title: {
    fontSize: 16,
    fontWeight: "800",
    fontFamily: fontFamily.Poppins_Medium,
  },

  subtitle: {
    fontSize: 15,
    color: colors.medium,
  },
  distanceContainer: {
    flexDirection: "row",
    marginLeft: "2%",
    ...Platform.select({
      ios: {
        marginTop: "2%",
      },
    }),
  },
  distance: {
    fontSize: 15,
    color: colors.primary2,
    fontFamily: fontFamily.Poppins_Medium,
  },
  miAwayText: {
    fontSize: 15,

    fontFamily: fontFamily.Poppins_Medium,
    color: colors.primary,
  },
});

export default ListItem;
