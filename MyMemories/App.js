import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import AuthNavigation from "./src/Navigations/AuthNavigation";
import { NavigationContainer } from "@react-navigation/native";

import AppNavigation from "./src/Navigations/AppNavigation";
import Storage from "./src/auth/Storage";
import { useState } from "react";
import AppLoading from "expo-app-loading";
import AuthContext from "./src/auth/context";

export default function App() {
  const [user, setUser] = useState();
  //State check, checks if app is ready to open
  const [isReady, setIsReady] = useState(false);

  // This method, restores user data from local storage, if user was logged in. 
  // Conditionally renders login pages or homepage.
  const restorUser = async () => {
    const user = await Storage.getUser();

    if (user) setUser(user);
    else setUser(null);
  };

  // Restores user data, behind splash screen. 
  if (!isReady) {
    return (
      <AppLoading
        startAsync={restorUser}
        onFinish={() => {
          setIsReady(true);
        }}
        onError={console.warn}
      />
    );
  }

  // User context used to provide, user info throughou app.
  return (
    <AuthContext.Provider value={{ user, setUser }}>
      <NavigationContainer>
        <View style={styles.container}>
          <StatusBar style="auto" />
          {/* Checks if login page should be shown or userdata should be imported from local storage */}
          {user ? <AppNavigation /> : <AuthNavigation />}
        </View>
      </NavigationContainer>
    </AuthContext.Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
