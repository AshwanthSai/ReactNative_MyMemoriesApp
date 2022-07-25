import React, { useEffect, useState } from "react";
import { View, StyleSheet, Text, ScrollView } from "react-native";

import * as yup from "yup";

import colors from "../config/colors";
import AppFromField from "../Components/AppFormField";
import CategoryPickerItems from "../Components/CategoryPickerItems";
import SubmitButton from "../Components/SubmitButton";
import AppForm from "../Components/AppForm";
import AppFromPicker from "../Components/AppFromPicker";
import ImageInput from "../Components/ImageInput";
import Storage from "../auth/Storage";

const categories = [
  {
    backgroundColor: "#fc5c65",
    label: "School Memories",
    Icon: "school-outline",
    value: 1,
  },
  {
    backgroundColor: "#fd9644",
    label: "College memories",
    Icon: "school",
    value: 2,
  },
  {
    backgroundColor: "#fed330",
    label: "High school Memories",
    Icon: "teach",
    value: 3,
  },
  {
    backgroundColor: "#26de81",
    label: "Job Memories",
    Icon: "briefcase-plus",
    value: 4,
  },
  {
    backgroundColor: "#2bcbba",
    label: "Wedding Memories",
    Icon: "flower-poppy",
    value: 5,
  },
];
//Yup Validation Schema
const validationSchema = yup.object().shape({
  title: yup.string().required().label("Title"),
  description: yup.string().required().min(1).label("Quantity"),
  category: yup.string().required().label("category"),
});

function AddMemoryScreen({ navigation }) {
  const [loading, setLoading] = useState(false);
  const [uri, setUri] = useState(null);
  console.log(uri);

  // Method to add memory in list
  const addMemory = async (value) => {
    //Checks if there is memory in local storage, fetches it.
    const memory = await Storage.getMemory();

    // Stores new memory into existing memory list
    // and saves it in to local storage
    Storage.storeMemory([
      {
        id: memory.length + 1,
        title: value.title,
        subTitle: value.description,
        category: value.category,
        uri: uri,
      },
      ...memory,
    ]);
    // Moves to home screen after adding new memory.
    navigation.goBack();
  };

  return (
    <ScrollView>
      <View style={styles.formStyle}>
        <AppForm
          initialValues={{
            title: "",
            description: "",
            category: "",
          }}
          onSubmit={(val) => addMemory(val)}
          validationSchema={validationSchema}
        >
          {/* <ImageInput name="images" /> */}

          <AppFromField
            leftIcon="format-title"
            placeholder="Memory Title"
            autoCapitalize="none"
            //autoCorrect={false}
            name="title"
          />
          <AppFromField
            // leftIcon="format-title"
            placeholder="Memory Description"
            autoCapitalize="none"
            autoCorrect={false}
            name="description"
            multiline={true}
            numberOfLines={2}
            style={{ minHeight: 70 }}
            textAlignVertical="top"
            // alignItems="flex-start"
          />

          <AppFromPicker
            name="category"
            icon="quadcopter"
            items={categories}
            placeholder="Category"
            width="70%"
            numberOfColoms={3}
            PickerItemsComponent={CategoryPickerItems}
          />
          <View style={{ marginTop: "2%" }}>
            <ImageInput uri={uri} setUri={setUri} />
          </View>

          <View style={styles.nextButton}>
            <SubmitButton width={"99%"} title="Add Memory" />
          </View>
        </AppForm>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  formStyle: {
    flex: 1,
    marginLeft: 13,
    marginRight: 13,
    overflow: "hidden",
  },
  topInfoIcon: {
    top: 10,
    marginBottom: 20,

    flexDirection: "column",
    alignItems: "center",
  },
  nextButton: {
    padding: 4,
    top: 10,
  },
  specficFormFiledStyle: {
    color: "green",
    fontWeight: "bold",
    fontSize: 18,
    fontFamily: Platform.OS === "android" ? "Roboto" : "Avenir",
  },
  headerText: {
    textAlign: "center",
    color: colors.primary,
    fontWeight: "bold",
    fontSize: 18,
  },
});

export default AddMemoryScreen;
