import React from "react";
import { StyleSheet } from "react-native";
import { StackNavigator } from "react-navigation";
import { MyHomes } from "../components";
import AddHouseNavigation from "./AddHouseNavigation";
import { TouchableText } from "../components/common";
import Styles from "../assets/Styles";
import Colors from "../assets/Colors";

const styles = StyleSheet.create({
  headerStyle: {
    backgroundColor: Colors.darkGray
  }
});

const { headerStyle } = styles;

const MyHomesNavigator = StackNavigator(
  {
    MyHomes: {
      screen: MyHomes,
      navigationOptions: {
        // header: false
        headerStyle: { position: "absolute", top: 0 }
        // title: "Your Homes",
        // headerStyle: Styles.backgroundBlack,
        // headerTintColor: Colors.whitea,
        // headerBackTitle: "Cancel"
        // tabBarVisible: false
      }
    },
    AddHouse: {
      screen: AddHouseNavigation,
      navigationOptions: {
        header: false
        // title: "Add HOME House",
        // headerBackTitle: "Cancel",
        // headerStyle: Styles.backgroundBlack,
        // headerTintColor: Colors.black
        // headerRight: <TouchableText color={"white"} size={1} text={"Done"} />
      }
    }
  },
  {
    mode: "modal",
    navigationOptions: {
      // header: false
    },
    initialRouteName:
      process.env.NODE_ENV !== "production" ? "MyHomes" : "MyHomes"
  }
);

export default MyHomesNavigator;

// navigationOptions: {
//         title: "Add Lockbox",
//         headerStyle,
//         headerTintColor: Colors.white,
//         tabBarVisible: false
//       }
