import { StyleSheet } from "react-native";
import { StackNavigator } from "react-navigation";
import {
  EditProfile,
  ProfilePage,
  MyLockboxes,
  AddLockbox,
  LockboxConnecting,
  MyHomes,
  AddHouse
} from "../components";

import MyHomesNavigator from "./MyHomesNavigation";
// import { Button } from "../components/common";
import Colors from "../assets/Colors";

const styles = StyleSheet.create({
  headerStyle: {
    backgroundColor: Colors.darkGray
  }
});

const { headerStyle } = styles;

const ProfileNavigator = StackNavigator(
  {
    MyProfile: {
      screen: ProfilePage
    },
    EditProfile: {
      screen: EditProfile,
      navigationOptions: {
        title: "Edit Profile",
        headerStyle,
        headerTintColor: Colors.white,
        tabBarVisible: false
      }
    },
    MyHomes: {
      screen: MyHomesNavigator,
      navigationOptions: {
        title: "Your Homes",
        // header: false,
        tabBarVisible: false,
        headerStyle,
        headerTintColor: Colors.white
      }
    },
    MyLockboxes: {
      screen: MyLockboxes,
      navigationOptions: {
        title: "My Lockboxes",
        headerStyle,
        headerTintColor: Colors.white,
        tabBarVisible: false
      }
    },
    AddLockbox: {
      screen: AddLockbox,
      navigationOptions: {
        title: "Add Lockbox",
        headerStyle,
        headerTintColor: Colors.white,
        tabBarVisible: false
      }
    },
    LockboxConnecting: {
      screen: LockboxConnecting,
      navigationOptions: {
        header: false,
        tabBarVisible: false
      }
    }
  },
  {
    // headerMode: "float",
    initialRouteName:
      process.env.NODE_ENV !== "production" ? "MyProfile" : "MyProfile"
  }
);

export default ProfileNavigator;
