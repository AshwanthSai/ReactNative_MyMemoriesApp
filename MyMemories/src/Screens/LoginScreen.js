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

import useAuth from "../auth/useAuth";

//Validation schema for feilds
const validationSchema = yup.object().shape({
  email: yup.string().required().email().label("*Email"),
  password: yup.string().required().min(8).label("*Password"),
});

// Array of Limited, registered users.
const RegisterUser = [
  {
    id: 1,
    userName: "Sample User1",
    email: "sampleuser1@gmail.com",
    password: 123456789,
  },
  {
    id: 2,
    userName: "Sample User2",
    email: "sampleuser2@gmail.com",
    password: 123456789,
  },
  {
    id: 3,
    userName: "Sample User3",
    email: "sampleuser3@gmail.com",
    password: 123456789,
  },
];

// Saves user in local storage
function LoginScreen({ navigation }) {
  const { logIn } = useAuth();

  const [visiblePassword, setVisiblePassword] = useState(true);
  const [loading, setLoading] = useState(false);

  // Function for login
  const handlelogin = ({ email, password }) => {
    setLoading(true);
    console.log(email, password);
    // Filters the user from above array, Email and password is checked with input.

    const verifyUser = RegisterUser.filter(
      (user) => user.email.match(email) && user.password.toString() === password
    );
    //Saves user in local storage using custom hook useAuth which has method login.
    if (verifyUser.length > 0) {
      console.log(verifyUser[0]);
      setLoading(false);
      logIn(verifyUser[0]);
    } else {
      //If credentials dont match, pop error.
      setLoading(false);
      alert("Invalid email or password");
    }
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
          {/* This is custom component of formik, wraps the inputs 
           like we <Formik > ...</Formik> */}
          <AppForm
            initialValues={{ email: "", password: "" }}
            validationSchema={validationSchema}
            onSubmit={handlelogin}
          >
            {/* This is custom component which wrappes on custom input and 
          in this componenet, formik hook is used to handle its function to get the 
          the value of input like setValues etc */}
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

            {/* This is the component for submit its is a wrapper on button it will submit 
            data to formik */}
            <SubmitButton loading={loading} marginTop="10%" title="Login" />
          </AppForm>
        </View>
        <View>
          <TouchableOpacity onPress={() => navigation.navigate("Register")}>
            <CustomText style={styles.goToRegister} text=" Or Register Here" />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </Screen>
  );
}
export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    padding: 5,
    backgroundColor: colors.white,
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
