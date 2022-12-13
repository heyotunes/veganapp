import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ActivityIndicator,
  FlatList,
  Button,
  TouchableOpacity,
  TextInput,
} from "react-native";

const Veganscreen = () => {
  const [value, setValue] = useState(
    { data: { vegan: false } },
    { data: { flagged: false } }
  );

  const [body, setBody] = useState([]);
  const headersList = {
    "Content-Type": "text/plain",
  };
  const excuse = async () => {
    await fetch("https://api.vegancheck.me/v0/ingredients", {
      method: "POST",
      body: body,
      headers: headersList,
    })
      .then((response) => response.json()) // get response, convert to json
      .then((result) => {
        // Add a space between the flagged values
        if (typeof result.data.flagged === "string") {
          result.data.flagged = result.data.flagged.replace(",", ", ");
        } else {
          result.data.flagged = String(result.data.flagged).replace(",", ", ");
        }

        setValue(result);
      });
    console.log(value);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headtext}>
        <Text style={styles.text1}>
          Use comma , to seperate list meat, fish, nuts
        </Text>
      </View>

      <View style={styles.inputcontainer}>
        <TextInput
          style={styles.inputText}
          placeholder="Add Ingridents..."
          placeholderTextColor="#8A8A8A"
          value={body}
          onChangeText={setBody}
        />
      </View>

      {/* Check if value is defined before accessing its properties */}
      {value && (
        <View style={styles.whiteText}>
          <View>
            <Text style={styles.whiteText1}>{value.data.vegan}</Text>
          </View>
        </View>
      )}

      <View style={styles.whiteText}>
        <View>
          <Text style={styles.whiteText2}>{value.data.flagged}</Text>
        </View>
      </View>

      <TouchableOpacity onPress={excuse} style={styles.btn}>
        <Text style={styles.btnText}>Get Result</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#F5FBEE",
  },
  headtext: {
    marginTop: 50,
  },
  text1: {
    fontSize: 20,
    width: 300,
    textAlign: "center",
  },
  inputcontainer: {
    marginTop: 40,
  },
  whiteTextContainer: {
    fontSize: 20,
    backgroundColor: "#FB3B49",
    height: 70,
    width: 150,
    marginLeft: 80,
    marginTop: 20,
    alignItems: "center",
    borderRadius: 10,
    justifyContent: "center",
  },
  whiteTextContainer1: {
    fontSize: 20,
    backgroundColor: "#FB3B49",
    height: 50,
    width: 100,
    marginTop: 30,
    marginLeft: 100,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  whiteText1: {
    fontSize: 40,
    paddingLeft: 20,
    paddingRight: 20,
    textTransform: "uppercase",

    color: "black",
    fontWeight: "bold",
    justifyContent: "center",
    alignItems: "center",
  },
  whiteText2: {
    fontSize: 20,
    paddingBottom: 40,
    color: "black",

    marginTop: 20,
    fontWeight: "bold",
    justifyContent: "center",
    alignItems: "center",
  },
  whiteText: {
    marginTop: 20,
    height: 100,
    width: 300,
    borderRadius: 20,
    backgroundColor: "white",
    borderWidth: 2,
    borderColor: "#54B258",
    justifyContent: "center",
    alignItems: "center",
  },
  btnText: {
    textAlign: "center",
    paddingTop: 16,
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
  },
  btn: {
    height: 60,
    width: 300,
    marginTop: 40,
    borderRadius: 20,
    backgroundColor: "#4CC351",
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
    borderRadius: 10,
    backgroundColor: "#D7EABF",
    borderColor: "#54B258",
  },
});
export default Veganscreen;
