// read more about react-navigation, beta-11... maybe switch to earlier version w/o bugs. READ

import React from "react";
import PropTypes from "prop-types";
import { TextInput, View } from "react-native";
import { connect } from "react-redux";
import validator from "validator";
// import KeyboardSpacer from "react-native-keyboard-spacer";
import {
  userSignInSuccess,
  setProfile,
  setLoading,
  unsetLoading
} from "../actions";
import Styles from "../assets/Styles";
import TextStyles from "../assets/TextStyles";
import Colors from "../assets/Colors";
import {
  TouchableText,
  CityBackgroundView,
  HeaderBack,
  FlexView,
  HText,
  Loading
} from "./common";
import { confirmLogin } from "../serverHelpers/APIFuncs";

class UnconnectedEnterLogin extends React.Component {
  constructor(props) {
    const DEV = process.env.NODE_ENV !== "production";

    super(props);
    this.state = {
      loading: false,
      email: DEV ? "wkoutre@gmail.com" : "",
      password: DEV ? "password" : "",
      error: false,
      autoFocus: 1
    };
  }
  componentDidMount() {
    console.log(`Enter Login Mounted`);
  }

  onChangeText = (val, item) => {
    this.setState({ [item]: val, error: false });
  };

  setError = () => this.setState({ error: true });
  stopLoading = () => this.setState({ loading: false });
  startLoading = () => this.setState({ loading: true });
  removeErrror = () => this.setState({ error: false });
  clearState = () => {
    this.setState({
      email: "",
      name: "",
      password: ""
    });
  };

  handleConfirmLogin = () => {
    this.startLoading();
    this.removeErrror();
    const { email, password } = this.state;

    if (!this.isValidEmail() || !password) {
      this.setError();
      this.stopLoading();
      return;
    }

    this.props.setLoading();

    confirmLogin({
      email,
      password,
      success: this.loginSuccess,
      failure: this.loginFailure
    });
  };

  loginSuccess = ({ data }) => {
    const { userSignInSuccess, navigation, setProfile } = this.props;
    const { token, user_id: id } = data;

    this.stopLoading();
    this.clearState();

    console.log(`response data`, data);

    userSignInSuccess({ token, id, navigation });
  };

  loginFailure = err => {
    console.log(`LOGIN FAILURE:`, err);

    // this.stopLoading();
    this.props.unsetLoading();
    this.setError();
  };

  handleForgotPassword = () => {
    console.log(`forgot password`);
    this.removeErrror();
    this.props.navigation.navigateWithDebounce("ForgotPassword");
  };

  handleErrorMessage = () => {
    return (
      this.state.error &&
      <HText
        color={"red"}
        size={2}
        text={"Invalid email or password."}
        style={[TextStyles.textErrorRed, { position: "absolute", top: "26%" }]}
      />
    );
  };

  isValidEmail = () => {
    return validator.isEmail(this.state.email);
  };

  handleViewBox = () => {
    let emailStyle = null;
    let passwordStyle = null;

    if (this.state.error) {
      if (!this.isValidEmail()) {
        emailStyle = Styles.borderRed;
      }
      if (!this.state.password) {
        passwordStyle = Styles.borderRed;
      }
    }
    return (
      <View style={[Styles.stretchView, Styles.flex1, Styles.centerAll]}>
        <TextInput
          autoCapitalize={"none"}
          onChangeText={val => this.onChangeText(val, "email")}
          placeholder={"Your email"}
          placeholderTextColor={Colors.white}
          value={this.state.email}
          style={[Styles.inputStyle, TextStyles.inputTextWhite, emailStyle]}
          returnKeyType={"next"}
          onSubmitEditing={() => this.passwordInput.focus()}
          keyboardType={"email-address"}
          autoFocus
          autoCorrect={false}
          keyboardAppearance={"dark"}
        />
        <TextInput
          ref={input => (this.passwordInput = input)}
          autoCapitalize={"none"}
          onChangeText={val => this.onChangeText(val, "password")}
          placeholder={"Password"}
          placeholderTextColor={Colors.white}
          secureTextEntry
          value={this.state.password}
          style={[Styles.inputStyle, TextStyles.inputTextWhite, passwordStyle]}
          onSubmitEditing={this.handleConfirmLogin}
          returnKeyType={"go"}
          keyboardAppearance={"dark"}
        />

        <TouchableText
          text={"Forgot Password?"}
          size={1}
          color={"white"}
          onPress={this.handleForgotPassword}
          buttonStyle={{
            alignSelf: "flex-start",
            padding: 10,
            paddingTop: 5,
            marginBottom: 30
          }}
        />
      </View>
    );
  };

  render() {
    return (
      <FlexView>
        <HeaderBack text={"Login"} navigation={this.props.navigation} />
        <Loading />
        <CityBackgroundView>
          {this.handleErrorMessage()}
          {this.handleViewBox()}
        </CityBackgroundView>
      </FlexView>
    );
  }
}

UnconnectedEnterLogin.PropTypes = {
  navigation: PropTypes.object.isRequired
};

const mapStateToProps = state => {
  const { nav, loading } = state;

  return { nav, state, loading };
};

const EnterLogin = connect(mapStateToProps, {
  userSignInSuccess,
  setProfile,
  setLoading,
  unsetLoading
})(UnconnectedEnterLogin);

export { EnterLogin };
