import { NavigationActions } from "react-navigation";
import { AppNavigator } from "../navigation/Navigation";
import { Keyboard } from "react-native";
import * as T from "../actions/types";

// Start with two routes: The Main screen, with the Login screen on top.

const initialState = AppNavigator.router.getStateForAction(
  AppNavigator.router.getActionForPathAndParams("Login")
);

const NavReducer = (state = initialState, action) => {
  let nextState;

  if (action.type === T.USER_LOGOUT) {
    nextState = AppNavigator.router.getStateForAction(
      NavigationActions.navigate({ routeName: "Login" })
    );

    Keyboard.dismiss();
    return nextState;
  } else if (action.type.indexOf("Navigation") !== -1) {
    Keyboard.dismiss();
  }

  nextState = AppNavigator.router.getStateForAction(action, state);
  return nextState || state;
};

export default NavReducer;
