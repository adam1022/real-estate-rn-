import { StyleSheet } from "react-native";
import { StackNavigator } from "react-navigation";
import { MyLockboxes } from "../components";
// import { Button } from "../components/common";
import Colors from "../assets/Colors";

const styles = StyleSheet.create({
  headerStyle: {
    backgroundColor: Colors.darkGray
  }
});

const { headerStyle } = styles;

const LockboxNavigation = StackNavigator({
  MyLockboxes: {
    screen: MyLockboxes,
    nagivationOptions: {
      title: "My Lockboxes",
      headerStyle,
      headerTintColor: Colors.black
    }
  }
});

export default LockboxNavigation;
