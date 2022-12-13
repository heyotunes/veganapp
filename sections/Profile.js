import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Button,
  Pressable,
  TouchableOpacity,
  Modal,
  TextInput,
  Image,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import {
  FontAwesome,
  MaterialCommunityIcons,
  MaterialIcons,
  Entypo,
  Foundation,
} from "@expo/vector-icons";

import { auth, db } from "../firebase";
import { signOut } from "firebase/auth";
import { serverTimestamp, setDoc, doc } from "firebase/firestore";

const Profilescreen = ({ navigation }) => {
  console.log(auth.currentUser.uid);

  const [firstname, setFirstname] = useState(null);
  const [lastname, setLastname] = useState(null);
  const [displayname, setDisplayname] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  const incompleteForm = !lastname || !firstname || !displayname;

  const updateUserProfile = () => {
    setDoc(doc(db, "Users", auth.currentUser.uid), {
      id: auth.currentUser.uid,
      displayname: displayname,
      firstname: firstname,
      lastname: lastname,
      timestamp: serverTimestamp(),
    })
      .then(() => {
        navigation.navigate("Home");
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  const logout = () => {
    signOut(auth).then(() => {
      navigation.navigate("Login");
    });
  };
  const combined = () => {
    setModalVisible(!modalVisible);
    updateUserProfile();
  };

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            Alert.alert("Modal has been closed.");
            setModalVisible(!modalVisible);
          }}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <View style={styles.modalText}>
                <Image />
              </View>
              <View style={styles.inputviewcontainer}>
                <View style={styles.modalText}>
                  <Text style={styles.fontStyle}>Edit Profile</Text>
                </View>
                <View style={styles.inputview}>
                  <TextInput
                    style={styles.inputText}
                    value={displayname}
                    onChangeText={setDisplayname}
                    placeholder="Enter your username"
                  />
                  <TextInput
                    style={styles.inputText}
                    value={firstname}
                    onChangeText={setFirstname}
                    placeholder="Enter your firstname"
                  />
                  <TextInput
                    style={styles.inputText}
                    value={lastname}
                    onChangeText={setLastname}
                    placeholder="Enter your lastname"
                  />
                </View>

                <TouchableOpacity
                  onPress={() => combined()}
                  style={[styles.button, styles.buttonClose]}
                >
                  <Text style={styles.textStyle}>Complete Profile</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
        <View style={styles.btncontainer}>
          <TouchableOpacity
            onPress={() => setModalVisible(true)}
            style={styles.touch1}
          >
            <Text style={styles.btn1}>Edit Profile</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={logout} style={styles.touch1}>
            <Text style={styles.btn1}>Sign Out</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    marginTop: 48,
  },
  inputviewcontainer: {
    marginTop: 40,
  },
  fontStyle: {
    fontSize: 40,
    fontWeight: "bold",
  },
  inputText: {
    fontSize: 15,
    paddingBottom: 15,
    paddingTop: 15,
    paddingLeft: 20,
    textAlign: "left",
    borderWidth: 1,
    marginTop: 15,
    marginBottom: 20,
    width: 350,
    borderRadius: 4,
    backgroundColor: "white",
    borderColor: "black",
  },
  touch1: {
    height: 60,
    width: 300,

    borderRadius: 20,
    backgroundColor: "#4CC351",

    marginTop: 10,

    shadowColor: "rgba(0, 0, 0, 0.1)",
    shadowOpacity: 0.8,
    elevation: 6,
    shadowRadius: 15,
    shadowOffset: { width: 1, height: 13 },
  },
  btncontainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 250,
  },
  btn1: {
    color: "white",
    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold",
    paddingTop: 15,
  },

  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 80,
  },
  modalView: {
    margin: 20,
    height: 700,
    width: 400,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 20,
    marginTop: 50,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: "#F56B1D",
  },
  buttonClose: {
    backgroundColor: "#4CC351",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 5,
    textAlign: "center",
    justifyContent: "center",
    alignItems: "center",
  },
  photo: {
    height: 80,
    width: 300,
    marginTop: -20,
  },
  photocontainer: {
    marginTop: 0,
  },
});

export default Profilescreen;
