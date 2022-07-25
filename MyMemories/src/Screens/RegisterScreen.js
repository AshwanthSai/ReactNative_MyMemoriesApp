import React, { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Text,
  Image,
  View,
} from "react-native";

import * as yup from "yup";

import AppForm from "../Components/AppForm";
import AppFromField from "../Components/AppFormField";
import CustomText from "../Components/CustomText";
import Screen from "../Components/Screen";

import SubmitButton from "../Components/SubmitButton";

import colors from "../config/colors";
import fontFamily from "../config/fontFamily";
import Storage from "../auth/Storage";
import useAuth from "../auth/useAuth";

const validationSchema = yup.object().shape({
  username: yup.string().required().label("*Username"),
  email: yup.string().required().email().label("*Email"),
  password: yup.string().required().min(8).label("*Password"),
});

function RegisterScreen({ navigation }) {
  const { logIn } = useAuth();
  const [visiblePassword, setVisiblePassword] = useState(true);
  const [loading, setLoading] = useState(false);

  /* Method Handles Sign up */
  const handleSignUp = ({ username, email, password }) => {
    setLoading(true);
    //Storing the user in local storage using custom hook
    logIn({
      id: 1,
      userName: username,
      email: email,
      password: password,
    });
  };

  return (
    <Screen style={styles.container}>
      <ScrollView>
        <View style={styles.welcomeTextContainer}>
          <Image
            resizeMode="contain"
            style={styles.logo}
            source={require("../assets/logo.png")}
          />
        </View>

        <View style={styles.inputFieldContainer}>
          <AppForm
            initialValues={{ username: "", email: "", password: "" }}
            validationSchema={validationSchema}
            onSubmit={handleSignUp}
          >
            <AppFromField
              label="UserName"
              width="95%"
              leftIcon="user"
              changeIconLibrary={true}
              placeholder="Enter username"
              autoCapitalize="none"
              autoCorrect={false}
              name="username"
              keyboardType="email-address"
              TextContentType="emailAddress"
            />
            <AppFromField
              label="Email"
              width="95%"
              leftIcon="email"
              placeholder="Enter Email"
              autoCapitalize="none"
              autoCorrect={false}
              name="email"
              keyboardType="email-address"
              TextContentType="emailAddress"
            />

            <AppFromField
              onRightIconPress={() => setVisiblePassword(!visiblePassword)}
              label="Password"
              width="95%"
              leftIcon="lock"
              rightIcon="eye"
              placeholder="Enter Password"
              autoCapitalize="none"
              name="password"
              autoCorrect={false}
              secureTextEntry={visiblePassword}
              TextContentType="password"
            />

            <SubmitButton marginTop="10%" title="Register" loading={loading} />
          </AppForm>
        </View>
        <TouchableOpacity
          style={{ flex: 1, padding: "5%" }}
          onPress={() => {
            navigation.navigate("Login");
          }}
        >
          <Text style={styles.forgetPasswordText}>
            Already Register? Login Here
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </Screen>
  );
}
export default RegisterScreen;

const styles = StyleSheet.create({
  container: {
    padding: 5,
    backgroundColor: colors.white,
    flex: 1,
  },
  logo: {
    height: 120,
    width: 200,
    marginTop: 7,

    alignSelf: "center",
    padding: 10,
  },
  inputFieldContainer: {
    alignItems: "center",
  },
  welcomeTextContainer: {
    marginTop: "20%",
    marginBottom: "6%",
  },
  icon: {
    top: 4,
    marginRight: 10,
  },

  welcomeText: {
    fontSize: 22,
    textAlign: "center",
    color: colors.primary,
  },
  forgetPasswordText: {
    top: 15,
    textAlign: "center",
    color: colors.primary,
    fontWeight: "bold",
    fontSize: 18,
    textDecorationLine: "underline",
  },
  otherSignInOptions: {
    marginTop: 10,

    fontSize: 19,
    textAlign: "center",
  },

  goToRegister: {
    marginTop: "10%",
    color: colors.primary,
    alignSelf: "center",

    fontSize: 19,
    fontFamily: fontFamily.Poppins_Medium,
  },
});
