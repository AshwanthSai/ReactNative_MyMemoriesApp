import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Image,
  TouchableWithoutFeedback,
  Alert,
} from "react-native";

import { MaterialCommunityIcons } from "@expo/vector-icons";
import * as imagePicker from "expo-image-picker";

import { useFormikContext } from "formik";
import ValidationErrorMessage from "./ValidationErrorMessage";
import colors from "../config/colors";

function ImageInput({ name, uri, setUri }) {

  const { setFieldValue, errors, values, touched } = useFormikContext();

  const handlePress = () => {
    if (!uri) selectImage();
    else {
      Alert.alert("Delete Image", "Do you want unselect the image?", [
        {
          text: "yes",
          onPress: () => {
            // onChangeImage(null);
            setUri(null);
            setFieldValue(name, null);
          },
        },
        {
          text: "No",
        },
      ]);
    }
  };

  const selectImage = async () => {
    try {
      const result = await imagePicker.launchImageLibraryAsync({
        mediaTypes: imagePicker.MediaTypeOptions.Images,
        quality: 0.5,
        allowsEditing: true,
        // base64: true,
        // allowsEditing: true,
      });
      if (!result.cancelled) {
        // onChangeImage(result.uri);
        setUri(result.uri);
        setFieldValue(name, {
          uri: result.uri,
          type: result.type,
        });
      }
      console.log(result);
      result;
    } catch (error) {
      console.log("unable to select image", error);
    }
  };

  return (
    <>
      <TouchableWithoutFeedback onPress={handlePress}>
        <View style={styles.container}>
          {!uri && (
            <MaterialCommunityIcons
              name="camera"
              size={50}
              color={colors.medium}
            />
          )}

          {uri && <Image style={styles.image} source={{ uri }} />}
        </View>
      </TouchableWithoutFeedback>
      <ValidationErrorMessage error={errors[name]} visible={touched[name]} />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    backgroundColor: colors.white,
    height: 100,
    width: 100,
    borderRadius: 15,
    justifyContent: "center",
    overflow: "hidden",
    borderWidth: 1,
    borderColor: colors.primary,
  },
  image: {
    width: "100%",
    height: "100%",
  },
});

export default ImageInput;
