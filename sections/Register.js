import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  ImageBackground,
  FlatList,
  Button,
  Image,
  KeyboardAvoidingView,
  TextInput,
} from "react-native";
import InlineTextButton from "../components/inlineTextButton";
import AppStyles from "../styles/AppStyles";
import { auth } from "../firebase";
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
} from "firebase/auth";

const RegisterScreen = ({ navigation }) => {
  const background = require("../assets/grnbg.png");

  let [email, setEmail] = React.useState("");
  let [password, setPassword] = React.useState("");
  let [confirmPassword, setConfirmPassword] = React.useState("");
  let [validationMessage, setValidationMessage] = React.useState("");

  let validateAndSet = (value, valueToCompare, setValue) => {
    if (value !== valueToCompare) {
      setValidationMessage("Passwords do not match.");
    } else {
      setValidationMessage("");
    }

    setValue(value);
  };

  let signUp = () => {
    if (password === confirmPassword) {
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          sendEmailVerification(auth.currentUser);
          navigation.navigate("Main", { user: userCredential.user });
        })
        .catch((error) => {
          setValidationMessage(error.message);
        });
    }
  };

  return (
    <ImageBackground style={AppStyles.imageContainer} source={background}>
      <View style={styles.photocontainer}>
        <Image />
      </View>
      <KeyboardAvoidingView>
        <View>
          <Text style={[AppStyles.lightText, AppStyles.header]}>Sign Up</Text>
          <Text style={[AppStyles.errorText]}>{validationMessage}</Text>
          <TextInput
            style={styles.inputText}
            placeholder="Email"
            placeholderTextColor="#BEBEBE"
            value={email}
            onChangeText={setEmail}
          />
          <TextInput
            style={styles.inputText}
            placeholder="Password"
            placeholderTextColor="#BEBEBE"
            secureTextEntry={true}
            value={password}
            onChangeText={(value) =>
              validateAndSet(value, confirmPassword, setPassword)
            }
          />
          <TextInput
            style={styles.inputText}
            placeholder="Confirm Password"
            placeholderTextColor="#BEBEBE"
            secureTextEntry={true}
            value={confirmPassword}
            onChangeText={(value) =>
              validateAndSet(value, password, setConfirmPassword)
            }
          />
          <View style={[AppStyles.rowContainer, AppStyles.topMargin]}>
            <Text style={AppStyles.lightText}>Already have an account? </Text>
            <InlineTextButton
              text="Login"
              onPress={() => navigation.popToTop()}
            />
          </View>

          <TouchableOpacity onPress={signUp} style={styles.touch1}>
            <Text style={styles.btn1}>Sign Up</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  touch1: {
    backgroundColor: "#F56B1D",
    borderRadius: 10,
    width: 350,
    height: 60,
    marginTop: 20,
    shadowColor: "rgba(0, 0, 0, 0.1)",
    shadowOpacity: 0.8,
    elevation: 6,
    shadowRadius: 15,
    shadowOffset: { width: 1, height: 13 },
  },
  btn1: {
    color: "white",
    textAlign: "center",
    fontSize: 20,
    paddingTop: 15,
  },
  inputText: {
    fontSize: 15,
    paddingBottom: 15,
    paddingTop: 15,
    paddingLeft: 20,
    textAlign: "left",
    borderWidth: 2,
    marginTop: 5,
    marginBottom: 20,
    width: 350,
    borderRadius: 4,
    backgroundColor: "white",
    borderColor: "white",
  },
  selectButton: {
    borderRadius: 5,
    width: 350,
    height: 50,
    alignItems: "center",
    backgroundColor: "lightblue",
    justifyContent: "center",
    marginTop: 50,
    marginBottom: 60,
    marginLeft: 0,
  },
  photo: {
    height: 80,
    marginTop: -150,
  },
  photocontainer: {
    marginTop: 0,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
  },
  btn: {
    height: 60,
    width: 300,
    borderRadius: 20,
    backgroundColor: "lightblue",
    marginTop: 400,
  },
});

export default RegisterScreen;
