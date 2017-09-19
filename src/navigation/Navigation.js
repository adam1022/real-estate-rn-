import React from "react";
import { StyleSheet } from "react-native";
import { NavigationActions } from "react-navigation";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { addNavigationHelpers, StackNavigator } from "react-navigation";
import { debounce } from "underscore";
import Colors from "../assets/Colors";
import HomeNavigation from "./HomeNavigation";
import {
  Login,
  EnterLogin,
  ForgotPassword,
  ResetPassword,
  SignUp,
  Verification,
  Onboarding,
  Walkthrough,
  SplashScreen
} from "../components";
import { HeaderBack } from "../components/common";

const styles = StyleSheet.create({
  loginStyle: {
    backgroundColor: Colors.darkGray,
    borderBottomColor: Colors.darkGray
  },
  onboardingStyle: {
    backgroundColor: Colors.black
  }
});

const { loginStyle, onboardingStyle } = styles;

export const AppNavigator = StackNavigator(
  {
    Login: {
      screen: Login,
      navigationOptions: {
        header: false,
        headerStyle: loginStyle,
        headerLeft: null,
        gesturesEnabled: false
      }
    },
    EnterLogin: {
      screen: EnterLogin,
      navigationOptions: {
        header: false,
        headerStyle: loginStyle,
        headerTintColor: Colors.white
      }
    },
    ForgotPassword: {
      screen: ForgotPassword,
      navigationOptions: {
        header: false,
        headerStyle: loginStyle,
        headerTintColor: Colors.white
      }
    },
    ResetPassword: {
      screen: ResetPassword,
      navigationOptions: {
        header: false,
        headerStyle: loginStyle,
        headerTintColor: Colors.white
      }
    },
    SignUp: {
      screen: SignUp,
      navigationOptions: {
        header: false,
        headerStyle: loginStyle,
        headerTintColor: Colors.white
      }
    },
    Verification: {
      screen: Verification,
      navigationOptions: {
        headerStyle: loginStyle,
        headerLeft: null,
        gesturesEnabled: false,
        title: "Verification",
        headerTintColor: Colors.white
      }
    },
    Onboarding: {
      screen: Onboarding,
      navigationOptions: {
        headerStyle: onboardingStyle,
        headerLeft: null,
        gesturesEnabled: false,
        headerTintColor: Colors.white
      }
    },
    Walkthrough: {
      screen: Walkthrough,
      navigationOptions: {
        header: false
      }
    },
    Home: {
      screen: HomeNavigation,
      navigationOptions: {
        gesturesEnabled: false
      }
    }
  },
  {
    initialRouteName: process.env.NODE_ENV !== "production" ? "Login" : "Login"
  }
);

const _addNavigationHelpers = navigation => {
  const original = addNavigationHelpers(navigation);
  // let debounce;
  return {
    ...original,
    navigateWithDebounce: debounce(
      (routeName, params, action) =>
        navigation.dispatch(
          NavigationActions.navigate({
            routeName,
            params,
            action
          })
        ),
      // Set the wait to a reasonable duration
      500,
      {
        trailing: false,
        leading: true
      }
    )
  };
};

const AppWithNavigationState = ({ dispatch, nav }) => {
  return (
    <AppNavigator
      navigation={_addNavigationHelpers({ dispatch, state: nav })}
    />
  );
};

AppWithNavigationState.propTypes = {
  dispatch: PropTypes.func.isRequired,
  nav: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  nav: state.nav
});

export default connect(mapStateToProps)(AppWithNavigationState);
