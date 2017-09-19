import React from "react";
import { TextInput, View, Text, KeyboardAvoidingView } from "react-native";
import validator from "validator";
import { connect } from "react-redux";
import {
  StretchView,
  YellowButton,
  Input,
  CityBackgroundView,
  FlexView,
  HeaderBack,
  HText,
  Loading
} from "./common";
import TextStyles from "../assets/TextStyles";
import Styles, { styleFuncs, standardProps } from "../assets/Styles";
import { createAccount } from "../serverHelpers/APIFuncs";
import {
  createUser,
  userSignInSuccess,
  setLoading,
  unsetLoading
} from "../actions";
import { fixName } from "../Helpers";

class UnconnectedSignUp extends React.Component {
  constructor(props) {
    const DEV = process.env.NODE_ENV !== "production";
    console.log(`DEV?`, DEV);

    super(props);
    this.state = {
      name: DEV ? "Test User" : "",
      email: DEV ? "fake1010@email.com" : "",
      password: DEV ? "password" : "",
      buttonPressed: false,
      error: false
    };
  }

  setError = () => this.setState({ error: true });
  unsetError = () => this.setState({ error: false });

  signUpSuccess = res => {
    const { navigation, createUser, userSignInSuccess } = this.props;
    const { user_id: id, token } = res.data;

    const data = JSON.parse(res.config.data);
    const { full_name: name, email } = data;
    console.log(`RESULT`, res);

    const userObj = {
      name,
      email,
      id,
      token
    };

    this.unPressButton();
    this.unsetError();
    console.log(`SIGNUP SUCCESS`, res);
    console.log(`USER OBJ`, userObj);

    createUser(userObj);
    this.props.userSignInSuccess({ token, id, navigation });
    // navigation.navigateWithDebounce("Verification");
  };

  // renderErrMsg = () => {
  //   const { errMsg } = this.state;
  //   const text = errMsg === 'password' ?
  //     `Error. Incorrect password`
  //   if (errMsg) {
  //     return (
  //       <View style={Styles.loginErrMsg}>
  //         <HText color={'red'} size={3} text={}/>
  //       </View>
  //     )
  //   }
  // }

  signUpFailure = err => {
    this.unPressButton();
    this.setError();
    this.props.unsetLoading();
    console.log(`SIGNUP FAILURE`, err);
  };

  onChangeText = (text, key) => {
    this.setState({ [key]: text });

    if (this.state.buttonPressed) this.unPressButton();
    this.unsetError();
  };

  unPressButton = () => this.setState({ buttonPressed: false });
  pressButton = () => this.setState({ buttonPressed: true });

  handleCreateAccount = () => {
    const { name, email, password } = this.state;

    this.pressButton();
    this.unsetError();
    if (!this.validateAll()) return false;

    let trimmedName = name.trim().split(" ").filter(i => i !== "").join(" ");
    let formattedEmail = email.trim().toLowerCase();
    let formattedName = fixName(trimmedName);

    console.log(`formattedName`, formattedName);
    console.log(`formattedEmail`, formattedEmail);

    // console.log(`UNCOMMENT THE ACTUAL SIGNUP CREATION CODE`);
    this.props.setLoading();
    createAccount({
      name: formattedName,
      email: formattedEmail,
      password,
      success: this.signUpSuccess,
      failure: this.signUpFailure
    });

    // this.signUpSuccess();
    console.log(name, email, password);
  };

  handleErrorMessage = () => {
    return (
      this.state.error &&
      <Text
        style={[
          TextStyles.textErrorRed,
          { position: "absolute", top: "27.5%" }
        ]}
      >
        Account with email already exists.
      </Text>
    );
  };

  renderInputs = () => {
    const keys = Object.keys(this.state).slice(0, 3);
    const { email, name, password } = this.state;

    return keys.map((key, i) => {
      let placeholder;
      let secureTextEntry = false;
      let containerStyle = [Styles.inputStyle, TextStyles.inputTextWhite];
      let autoCapitalize = "none";
      const { buttonPressed } = this.state;
      let keyboardType = "default";
      let returnKeyType = "default";
      let onSubmitEditing;
      let autoFocus = false;

      switch (key) {
        case "name":
          placeholder = "Full Name";
          autoCapitalize = "words";
          autoFocus = true;
          returnKeyType = "next";
          onSubmitEditing = () => this.emailInput.focus();
          if (buttonPressed && (!name || name.trim().split(" ").length < 2))
            containerStyle = [...containerStyle, Styles.borderRed];
          break;
        case "email":
          placeholder = "Email";
          if (buttonPressed && (!email || !this.validateEmail(email)))
            containerStyle = [...containerStyle, Styles.borderRed];
          keyboardType = "email-address";
          returnKeyType = "next";
          onSubmitEditing = () => this.passwordInput.focus();
          break;
        case "password":
          placeholder = "Password";
          secureTextEntry = true;
          if (buttonPressed && !password)
            containerStyle = [...containerStyle, Styles.borderRed];
          returnKeyType = "go";
          onSubmitEditing = this.handleCreateAccount;
          break;
        default:
          break;
      }

      return (
        <TextInput
          {...standardProps.inputProps}
          style={containerStyle}
          ref={input => (this[`${key}Input`] = input)}
          key={`${key}-${i}`}
          placeholder={placeholder}
          onChangeText={text => this.onChangeText(text, key)}
          value={this.state[key]}
          autoCapitalize={autoCapitalize}
          secureTextEntry={secureTextEntry}
          keyboardType={keyboardType}
          onSubmitEditing={onSubmitEditing}
          returnKeyType={returnKeyType}
          autoFocus={autoFocus}
        />
      );
    });
  };

  validateEmail = () => validator.isEmail(this.state.email);
  validateAll = () => {
    return (
      this.validateEmail() &&
      Object.keys(this.state)
        .slice(0, 3)
        .filter(key => this.state[key].length > 0) &&
      this.state.name.trim().split(" ").length > 1
    );
  };

  render() {
    return (
      <FlexView>
        <Loading />
        <HeaderBack
          text={"Create Account"}
          navigation={this.props.navigation}
        />
        <CityBackgroundView>
          <View
            style={[
              Styles.stretchView,
              {
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
                marginBottom: "15%"
              }
            ]}
          >
            {/* {this.renderErrMsg()} */}
            {this.renderInputs()}
            {this.handleErrorMessage()}
          </View>
        </CityBackgroundView>
      </FlexView>
    );
  }
}

const mapStateToProps = ({ loading }) => loading;

const SignUp = connect(mapStateToProps, {
  createUser,
  userSignInSuccess,
  setLoading,
  unsetLoading
})(UnconnectedSignUp);

export { SignUp };
