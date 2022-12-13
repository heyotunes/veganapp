import React from "react";
import { SafeAreaView } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
//import Navigation from "./navigation/Navlist";
//import Homescreen from "./tabscreen/Home";
import Controller from "./navigation/Navigation";
import Acctnav from "./navigation/Navigation";
export default function App() {
  return (
    <NavigationContainer>
      <Acctnav />
    </NavigationContainer>
  );
}
