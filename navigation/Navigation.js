import * as React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { Ionicons, FontAwesome } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import Veganscreen from "../sections/Vegan";

import Profilescreen from "../sections/Profile";

import LoginScreen from "../sections/Login";
import RegisterScreen from "../sections/Register";

//const Drawer = createDrawerNavigator();
const Tab = createBottomTabNavigator();

const Stack = createNativeStackNavigator();

const TAB_ICON = {
  Home: "home-sharp",
  Account: "settings",
};

const createScreenOptions = ({ route }) => {
  const iconName = TAB_ICON[route.name];
  return {
    tabBarIcon: ({ size, color }) => (
      <Ionicons name={iconName} size={size} color={color} />
    ),
    tabBarStyle: { backgroundColor: "#66922D" },
  };
};

const Controller = () => {
  return (
    <Tab.Navigator
      screenOptions={createScreenOptions}
      tabBarOptions={{
        activeTintColor: "#FFCA5A",
        inactiveTintColor: "white",
      }}
      initialRouteName="Homepage"
    >
      <Tab.Screen
        name="Home"
        component={Veganscreen}
        options={{
          headerShown: true,
          headerStyle: {
            backgroundColor: "#66922D",
          },
          headerTitleStyle: {
            color: "white",
          },
        }}
      />

      <Tab.Screen
        name="Account"
        component={Profilescreen}
        options={{
          headerShown: true,
          headerStyle: {
            backgroundColor: "#66922D",
          },
          headerTitleStyle: {
            color: "white",
          },
        }}
      />
    </Tab.Navigator>
  );
};

const Acctnav = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        options={{ headerShown: false }}
        name="Login"
        component={LoginScreen}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="Register"
        component={RegisterScreen}
      />
      <Stack.Screen
        name="Main"
        component={Controller}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default Acctnav;
