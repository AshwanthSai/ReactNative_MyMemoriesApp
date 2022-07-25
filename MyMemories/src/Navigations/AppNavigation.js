import React from "react";

import { createNativeStackNavigator } from "@react-navigation/native-stack";

import HomeScreen from "../Screens/HomeScreen";
import AddMemoryScreen from "../Screens/AddMemoryScreen";
import colors from "../config/colors";
import UpdateMemoryScreen from "../Screens/UpdateMemoryScreen";
import ProfileScreen from "../Screens/ProfileScreen";

const Stack = createNativeStackNavigator();
//This stack for home screen navigation which has navigation screen for home add update and profile screen
function HomeNavigations(props) {
  return (
    <Stack.Navigator>
      <Stack.Screen
        options={{
          headerShown: false,
          headerTitleAlign: "center",
          gestureEnabled: true,
        }}
        name="home Screen"
        component={HomeScreen}
      />
      <Stack.Screen
        options={{
          headerShown: true,
          headerTitleStyle: {
            color: colors.primary,
          },
          headerTitleAlign: "center",
          gestureEnabled: true,
        }}
        name="Add memory"
        component={AddMemoryScreen}
      />
      <Stack.Screen
        options={{
          headerShown: true,
          headerTitleStyle: {
            color: colors.primary,
          },
          headerTitleAlign: "center",
          gestureEnabled: true,
        }}
        name="Update memory"
        component={UpdateMemoryScreen}
      />
      <Stack.Screen
        options={{
          headerShown: true,
          headerTitleStyle: {
            color: colors.primary,
          },
          headerTitleAlign: "center",
          gestureEnabled: true,
        }}
        name="profile"
        component={ProfileScreen}
      />
    </Stack.Navigator>
  );
}

export default HomeNavigations;
