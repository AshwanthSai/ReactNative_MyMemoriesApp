import React from "react";

import { createNativeStackNavigator } from "@react-navigation/native-stack";

// import ForgotPasswordNavigation from "./ForgotPasswordNavigation";
import LoginScreen from "../Screens/LoginScreen";
import RegisterScreen from "../Screens/RegisterScreen";

const Stack = createNativeStackNavigator();
//This login register screen stack navigtor
function AuthNavigation(props) {
  return (
    <Stack.Navigator>
      <Stack.Screen
        options={{
          headerShown: false,
          headerTitleAlign: "center",
          gestureEnabled: true,
        }}
        name="Login"
        component={LoginScreen}
      />
      <Stack.Screen
        options={{
          headerShown: false,
          headerTitleAlign: "center",
          gestureEnabled: true,
        }}
        name="Register"
        component={RegisterScreen}
      />
      {/* <Stack.Screen
        options={{
          headerShown: false,
          headerTitleAlign: "center",
          gestureEnabled: true,
        }}
        name="ForgotPassword"
        component={ForgotPasswordNavigation}
      /> */}
    </Stack.Navigator>
  );
}

export default AuthNavigation;
