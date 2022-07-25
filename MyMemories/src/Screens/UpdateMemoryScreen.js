import React, { useEffect, useState } from "react";
import { View, StyleSheet, Text, ScrollView } from "react-native";

import * as yup from "yup";

import Screen from "../Components/Screen";
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
    label: "College Memorios",
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

/* Yup Validation Schema Used */
const validationSchema = yup.object().shape({
  title: yup.string().required().label("Title"),
  description: yup.string().required().min(1).label("Quantity"),
  category: yup.string().required().label("category"),
});

function UpdateMemoryScreen({ navigation, route }) {
  // Getting, Edit item for Navigation Route parameter. Which is send while navigating through screen.
  const { memory: data } = route.params;
  console.log(data);
  const [loading, setLoading] = useState(false);
  const [uri, setUri] = useState(data?.uri);
  console.log(uri);

  //Method to update Memory, small typo.
  const addMemory = async (value) => {
    //Get memory from list
    const memory = await Storage.getMemory();
    //and update the memory with new value after finding the index of that item in array
    const findIndex = memory.findIndex((mem) => mem.id === data.id);
    if (findIndex > -1) {
      memory[findIndex].title = value.title;
      memory[findIndex].subTitle = value.description;
      memory[findIndex].category = value.category;
      memory[findIndex].uri = uri;

      //after update, store into local storge
      Storage.storeMemory([...memory]);
    }

    navigation.goBack();
  };

  return (
    <ScrollView>
      <View style={styles.formStyle}>
        <AppForm
          initialValues={{
            title: data?.title,
            description: data?.subTitle,
            category: data?.category,
          }}
          onSubmit={(val) => addMemory(val)}
          validationSchema={validationSchema}
          enableReinitialize={true}
        >
          {/* <ImageInput name="images" /> */}

          <AppFromField
            leftIcon="format-title"
            placeholder="Memory Title"
            autoCapitalize="none"
            name="title"
            defaultValue={data?.title}
          />
          <AppFromField
            placeholder="Memory Description"
            autoCapitalize="none"
            autoCorrect={false}
            name="description"
            multiline={true}
            numberOfLines={2}
            style={{ minHeight: 70 }}
            textAlignVertical="top"
            defaultValue={data?.subTitle}
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
            {/* This component is used to get the image */}
            <ImageInput uri={uri} setUri={setUri} />
          </View>

          <View style={styles.nextButton}>
            <SubmitButton width={"99%"} title="Update Memory" />
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

export default UpdateMemoryScreen;
