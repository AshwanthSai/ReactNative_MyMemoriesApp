import React, { useContext, useEffect, useState } from "react";
import { useFocusEffect } from "@react-navigation/native";
import {
  View,
  StyleSheet,
  Platform,
  Dimensions,
  ScrollView,
  Image,
  TouchableOpacity,
  Button,
  Text,
  Modal,
} from "react-native";
import { memoryData } from "../Data";
import colors from "../config/colors";

import fontFamily from "../config/fontFamily";

import Screen from "../Components/Screen";

import Icon from "../Components/Icon/Icon";
import MemoryCard from "../Components/MemoryCard";
import AddMemoryScreen from "./AddMemoryScreen";
import Storage from "../auth/Storage";
import AppButton from "../Components/AppButton";
console.log("local", memoryData);

export default function HomeScreen({ navigation }) {
  const [memoryList, setMeoryList] = useState([]);
  const [visible, setVisible] = React.useState(false);

  // This method is used to delete the memory on home screen
  const deleteMemory = async (id) => {
    // Filters the array from useState variable which has all the
    // listing of  memories
    const afterDeleteArray = memoryList.filter((mem) => mem.id !== id);
    // console.log(id, afterDeleteArray);
    // after deletion, store in local storage and in useState variable.
    // which helps rendering the memory on screen
    if (afterDeleteArray.length < 1) {
      setMeoryList([]);
      await Storage.storeMemory(null);
    } else {
      await Storage.storeMemory(afterDeleteArray);
      setMeoryList(afterDeleteArray);
    }
  };

  //Filtering the memory by their name which user select from popup modal.

  const filterMemory = async (category) => {
    // If nothing is selected, restore the listing from local storage
    const listfromLocalStorage = await Storage.getMemory();
    if (category.match("none")) {
      setMeoryList(listfromLocalStorage);
    } else {
      // If category is selected then filter by the category label
      // storing the filter array in setMemory useState.
      const afterfilterArray = listfromLocalStorage.filter((mem) =>
        mem.category.match(category)
      );

      setMeoryList(afterfilterArray);
    }
  };
  // console.log(memoryList);
  // This method gets listing from local store - first time.
  // home screen renders, it is called in useFocusEffect which same as useEffect hook
  const getMemories = async () => {
    //if memory list is in local storage. Set it to local state using useState
    const listfromLocalStorage = await Storage.getMemory();
    console.log("asd", listfromLocalStorage);

    if (listfromLocalStorage) {
      console.log("here", listfromLocalStorage);

      setMeoryList(listfromLocalStorage);
    } else {
      console.log("here");
      // otherwise if there is no memory or null, Store hardcode memory list in local storage
      // and local state
      setMeoryList(memoryData);
      await Storage.storeMemory(memoryData);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      // Function call to get memory list form local storage
      getMemories();
    }, [])
  );
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
    {
      backgroundColor: "#fc5c65",
      label: "none",
      Icon: "school-outline",
      value: 6,
    },
  ];
  return (
    <Screen>
      <Modal visible={visible}>
        <>
          <Screen>
            {categories.map((cat) => (
              <TouchableOpacity
                key={cat.value}
                style={{
                  marginVertical: 10,
                  marginLeft: "4%",
                  // backgroundColor: colors.grey,
                }}
                onPress={() => {
                  // this button, filters list by category
                  filterMemory(cat.label);
                  setVisible(false);
                }}
              >
                <Text>{cat.label}</Text>
              </TouchableOpacity>
            ))}
            <AppButton title="close" onPress={() => setVisible(false)} />
          </Screen>
        </>
      </Modal>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-evenly",
          alignItems: "center",
          backgroundColor: colors.primary,
          padding: 6,
          paddingTop: 13,
          paddingBottom: 13,
          width: "97%",
          alignSelf: "center",
          borderRadius: 7,
        }}
      >
        <TouchableOpacity
          // this navigates you to add memory screen when you press +
          onPress={() => navigation.navigate("Add memory")}
          style={{ flex: 0.4 }}
        >
          <Icon name="plus" color={colors.white} size={30} />
        </TouchableOpacity>
        <View>
          <Text> Memory Collection</Text>
        </View>
        <View
          style={{
            flex: 0.4,
            alignItems: "flex-end",
            flexDirection: "row",

            justifyContent: "flex-end",
          }}
        >
          <TouchableOpacity
            //This button opens the modal for filter category
            onPress={() => setVisible(true)}
          >
            <Icon name="filter" color={colors.white} size={27} />
          </TouchableOpacity>
          <TouchableOpacity
            //This button opens the profile screen
            onPress={() => navigation.navigate("profile")}
            style={{ marginLeft: "2%" }}
          >
            <Icon name="account-details" color={colors.white} size={30} />
          </TouchableOpacity>
        </View>
      </View>
      <ScrollView>
        <View style={{ marginTop: "4%" }}>
          {/* Here i am mapping the array of memory with memory card and just passing the data
            showing memory cards on home screen */}
          <>
            {memoryList.map((memory) => (
              <View
                key={memory.id}
                style={{ marginTop: "3%", marginBottom: "3%" }}
              >
                <MemoryCard
                  image={memory?.image}
                  uri={memory?.uri}
                  title={memory.title}
                  category={memory?.category}
                  subtile={memory.subTitle}
                  onDeletePress={() => deleteMemory(memory.id)}
                  onEditPress={() =>
                    navigation.navigate("Update memory", { memory: memory })
                  }
                />
              </View>
            ))}
          </>
        </View>
      </ScrollView>
      {/* <AddMemoryScreen /> */}
    </Screen>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  toggleActive: {
    marginTop: "1%",
    flexDirection: "row",

    alignSelf: "center",
    zIndex: 1,
  },
  activeText: {
    marginTop: "3%",
    marginRight: "5%",
    fontFamily: fontFamily.Poppins_Bold,
    fontSize: 17,
    marginLeft: "7%",
  },
  lastUpdatedLocationText: {
    marginTop: "3%",
    textAlign: "center",
    alignSelf: "center",
    fontFamily: fontFamily.Poppins_Medium,
    fontSize: 12,
  },
  map: {
    width: Dimensions.get("window").width - 10,
    height: Dimensions.get("window").height,
    marginBottom: "20%",
  },
  offGrid: {
    backgroundColor: colors.light,

    alignItems: "center",
    marginBottom: "2%",
  },

  profileContainer: {
    shadowColor: "#000",
    width: "50%",
    alignSelf: "center",
    alignContent: "center",
    backgroundColor: colors.light,

    ...Platform.select({
      ios: {
        shadowOffset: { width: 0.2, height: 0.1 },
        shadowOpacity: 0.7,
        shadowRadius: 2,
        elevation: 2,
      },
      android: {
        shadowOffset: { width: 0.6, height: 0.4 },
        shadowOpacity: 0.7,
        shadowRadius: 10,
        elevation: 10,
      },
    }),
    marginTop: "10%",
  },
  profileText: {
    alignSelf: "center",
    textAlign: "center",
    marginLeft: "7%",
    fontWeight: "bold",
    fontSize: 19,
  },
  updateProfileContainer: {
    flexDirection: "row",
    alignContent: "space-between",
    padding: 5,
  },

  logo: {
    height: 120,
    width: 200,
    marginTop: 7,
    marginBottom: 20,
    alignSelf: "center",
    padding: 10,
  },
  relocateUserOnMap: {
    borderRadius: 50,
    position: "absolute",
    top: "88%",
    left: "78%",
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0.7, height: 0.8 },
        shadowOpacity: 0.4,
        shadowRadius: 11,
        elevation: 2,
      },
      android: {
        shadowColor: "#000",
        shadowOffset: { width: 0.6, height: 0.8 },
        shadowOpacity: 0.4,
        shadowRadius: 11,
        elevation: 2,
      },
    }),
  },
  welcomeTextContainer: {
    marginTop: "50%",
  },
  welcome: {
    textAlign: "center",
    fontSize: 25,
    fontWeight: "bold",
  },
  logout: {
    marginTop: "3%",
    ...Platform.select({
      ios: {
        width: "55%",
      },
      android: {
        width: "55%",
      },
    }),

    alignSelf: "center",
  },
  logOutButton: {
    backgroundColor: colors.primary,
    borderRadius: 9,
  },
  nearBy: {
    textAlign: "center",
    fontSize: 20,

    padding: "5%",
    fontFamily: fontFamily.Poppins_Medium,
  },
  noPeopleContainer: {
    alignContent: "center",
    alignItems: "center",
    alignSelf: "center",
    marginTop: "20%",
  },
  SnackbarText: {
    textAlign: "center",
    fontSize: 16,
    padding: "5%",
    fontFamily: fontFamily.Poppins_Medium,
  },
});
