import React from "react";
import {
  Text,
  View,
  TextInput,
  ImageBackground,
  Button,
  KeyboardAvoidingView,
  Platform,
  Image,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import AppStyles from "../styles/AppStyles";
import InlineTextButton from "../components/inlineTextButton";

import { auth } from "../firebase";
import { signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";

const LoginScreen = ({ navigation }) => {
  const background = require("../assets/grnbg.png");

  if (auth.currentUser) {
    navigation.navigate("Main");
  } else {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        navigation.navigate("Main");
      }
    });
  }

  let [errorMessage, setErrorMessage] = React.useState("");
  let [email, setEmail] = React.useState("");
  let [password, setPassword] = React.useState("");

  let login = () => {
    if (email !== "" && password !== "") {
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          navigation.navigate("Main", { user: userCredential.user });
          setErrorMessage("");
          setEmail("");
          setPassword("");
        })
        .catch((error) => {
          setErrorMessage(error.message);
        });
    } else {
      setErrorMessage("Please enter an email and password");
    }
  };

  return (
    <ImageBackground style={AppStyles.imageContainer} source={background}>
      <View style={styles.photocontainer}>
        <Image />
      </View>
      <KeyboardAvoidingView>
        <Text style={[AppStyles.lightText, AppStyles.header]}>Login</Text>
        <Text style={AppStyles.errorText}>{errorMessage}</Text>
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
          placeholderTextColor="#B6B3B3"
          secureTextEntry={true}
          value={password}
          onChangeText={setPassword}
        />
        <View style={[AppStyles.rowContainer, AppStyles.topMargin]}>
          <Text style={AppStyles.lightText}>Don't have an account? </Text>
          <InlineTextButton
            text="Sign Up"
            onPress={() => navigation.navigate("Register")}
          />
        </View>
        <TouchableOpacity onPress={login} style={styles.touch1}>
          <Text style={styles.btn1}> Login</Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  btn1: {
    color: "white",
    textAlign: "center",
    fontSize: 20,
    paddingTop: 15,
  },
  touch1: {
    backgroundColor: "#F56B1D",
    borderRadius: 10,
    width: 350,
    height: 60,
    marginTop: 20,
    shadowColor: "rgba(0, 0, 0, 0.1)",
    shadowOpacity: 0.8,
    elevation: 10,
    shadowRadius: 15,
    shadowOffset: { width: 1, height: 13 },
  },
  input1: {
    color: "black",
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
});

export default LoginScreen;
