import React from "react";
import { Text, StyleSheet } from "react-native";
import { StackNavigator } from "react-navigation";
import {
  AddHouse,
  Description,
  Instructions,
  GeneralInfo,
  Guestlist
} from "../components";
import { TouchableText } from "../components/common";
import Styles from "../assets/Styles";
import Colors from "../assets/Colors";
import TextStyles from "../assets/TextStyles";

const styles = StyleSheet.create({
  headerStyle: {
    backgroundColor: Colors.black
  }
});

const { headerStyle } = styles;

const AddHouseNavigator = StackNavigator(
  {
    AddHouse: {
      screen: AddHouse,
      navigationOptions: {
        header: false
        // title: "Add House",
        // // headerBackTitle: "Cancel",
        // headerStyle: Styles.backgroundBlack
        // headerTintColor: Colors.white,
        // headerRight: <TouchableText color={"white"} size={1} text={"Done"} />
      }
    },
    Description: {
      screen: Description,
      navigationOptions: {
        title: <Text style={TextStyles.h3White}>Description</Text>,
        headerStyle: [
          Styles.backgroundBlack,
          { borderBottomColor: Colors.dividerGray, borderBottomWidth: 1 }
        ],
        headerTintColor: Colors.white
      }
    },
    Instructions: {
      screen: Instructions,
      navigationOptions: {
        title: <Text style={TextStyles.h3White}>Instructions</Text>,
        headerStyle: [
          Styles.backgroundBlack,
          { borderBottomColor: Colors.dividerGray, borderBottomWidth: 1 }
        ],
        headerTintColor: Colors.white
      }
    },
    GeneralInfo: {
      screen: GeneralInfo,
      navigationOptions: {
        title: <Text style={TextStyles.h3White}>General Info</Text>,
        headerStyle: [
          Styles.backgroundBlack,
          { borderBottomColor: Colors.dividerGray, borderBottomWidth: 1 }
        ],
        headerTintColor: Colors.white
      }
    },
    Guestlist: {
      screen: Guestlist,
      navigationOptions: {
        // title: <Text style={TextStyles.h3White}>Guestlist</Text>
        header: false
      }
    }
  },
  {
    navigationOptions: {
      // headerStyle: [
      //   Styles.backgroundBlack,
      //   { borderBottomColor: Colors.dividerGray, borderBottomWidth: 1 }
      // ],
      headerTintColor: Colors.white
    },
    initialRouteName:
      process.env.NODE_ENV !== "production" ? "AddHouse" : "AddHouse"
  }
);

export default AddHouseNavigator;
