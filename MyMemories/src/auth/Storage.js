import AsyncStorage from "@react-native-async-storage/async-storage";
//This is the funtions to store user and memory items
const key = "authToken";
const key2 = "Memory";
const key3 = "registerUser";
const storeUser = async (user) => {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(user));
  } catch (error) {
    console.log("Error Storing  the auth Token ", error);
  }
};
const storeMemory = async (user) => {
  try {
    await AsyncStorage.setItem(key2, JSON.stringify(user));
  } catch (error) {
    console.log("Error Storing  the auth Token ", error);
  }
};
const storeRegisterUser = async (user) => {
  try {
    await AsyncStorage.setItem(key3, JSON.stringify(user));
  } catch (error) {
    console.log("Error Storing  the auth Token ", error);
  }
};
const getRegisterUser = async () => {
  try {
    const user = await AsyncStorage.getItem(key3);
    return JSON.parse(user);
  } catch (error) {
    console.log("Error getting the memory ", error);
  }
};
const getMemory = async () => {
  try {
    const user = await AsyncStorage.getItem(key2);
    return JSON.parse(user);
  } catch (error) {
    console.log("Error getting the memory ", error);
  }
};

const getUser = async () => {
  try {
    const user = await AsyncStorage.getItem(key);
    return JSON.parse(user);
  } catch (error) {
    console.log("Error getting the auth Token ", error);
  }
};

const deleteUser = async () => {
  try {
    await AsyncStorage.removeItem(key);
  } catch (error) {
    console.log("Error removing the auth Token ", error);
  }
};
const deleteMoemory = async () => {
  try {
    await AsyncStorage.removeItem(key2);
  } catch (error) {
    console.log("Error removing the auth Token ", error);
  }
};
export default {
  getUser,
  storeUser,
  deleteUser,
  storeMemory,
  getMemory,
  storeRegisterUser,
  getRegisterUser,
  deleteMoemory,
};
