// read more about react-navigation, beta-11... maybe switch to earlier version w/o bugs. READ

import React from "react";
// import PropTypes from "prop-types";
import { Text } from "react-native";
import { connect } from "react-redux";
import Styles from "../assets/Styles";
import TextStyles from "../assets/TextStyles";
import {
  WhiteButton,
  YellowButton,
  StretchView,
  CityBackgroundView,
  HeaderBack,
  FadeInView
} from "./common";

const { marginBottom15P } = Styles;

class UnconnectedLogin extends React.Component {
  // state = {
  //   appState: AppState.currentState
  // };

  componentWillMount() {
    const { loggedIn, navigation } = this.props;
    const { onboarded, verified } = this.props.profile;
    // const { appState } = this.state;

    // console.log(`appState`, this.state.appState);

    if (loggedIn) {
      if (verified && onboarded) {
        navigation.navigateWithDebounce("Home");
      } else if (verified) {
        navigation.navigateWithDebounce("Onboarding");
      } else {
        navigation.navigateWithDebounce("Verification");
      }
    }
  }

  componentDidMount() {
    console.log(`LOGIN MOUNTED`);
  }

  // componentDidMount() {
  //   const { loggedIn, navigation } = this.props;
  //   const { onboarded, verified } = this.props.profile;
  //   const { appState } = this.state;

  //   console.log(`Login mounting`);
  //   console.log(`appState`, this.state.appState);

  //   if (loggedIn) {
  //     if (verified && onboarded) {
  //       navigation.navigateWithDebounce("Home");
  //     } else if (verified) {
  //       navigation.navigateWithDebounce("Onboarding");
  //     } else {
  //       navigation.navigateWithDebounce("Verification");
  //     }
  //   }
  // }

  handleOpenLogin = () =>
    this.props.navigation.navigateWithDebounce("EnterLogin");

  handleCreateAccountPress = () => {
    this.props.navigation.navigateWithDebounce("SignUp");
  };

  handleErrorMessage = () => {
    return (
      this.state.error &&
      <Text style={[TextStyles.textErrorRed, Styles.absoluteBottom325P]}>
        Invalid email or password.
      </Text>
    );
  };

  handleViewBox = () =>
    <StretchView>
      <WhiteButton onPress={this.handleOpenLogin} title={"LOGIN"} />
      <YellowButton
        onPress={this.handleCreateAccountPress}
        title={"CREATE ACCOUNT"}
        style={[marginBottom15P, { marginTop: "2.5%" }]}
      />
    </StretchView>;

  render() {
    const { loggedIn, navigation } = this.props;

    if (!loggedIn) {
      return (
        <FadeInView style={{ flex: 1 }}>
          <CityBackgroundView>
            {this.handleViewBox()}
          </CityBackgroundView>
        </FadeInView>
      );
    } else {
      return null;
    }
  }
}

const mapStateToProps = ({ user }) => user;

const Login = connect(mapStateToProps)(UnconnectedLogin);

export { Login };
