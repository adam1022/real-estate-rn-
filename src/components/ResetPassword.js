import React from "react";
import { connect } from "react-redux";
import { TextInput, View } from "react-native";
import {
  StretchView,
  YellowButton,
  Input,
  CityBackgroundView,
  HText,
  ToorText,
  FlexView,
  HeaderBack
} from "./common";
import {
  confirmLoginPromise,
  resetUserPasswordPromise
} from "../serverHelpers/APIFuncs";
import { userSignInSuccess } from "../actions";
import TextStyles from "../assets/TextStyles";
import Styles, { styleFuncs, standardProps } from "../assets/Styles";

class UnlinkedResetPassword extends React.Component {
  constructor(props) {
    super(props);
    let email = this.props.navigation.state.params
      ? this.props.navigation.state.params.email
      : "";

    this.state = {
      email,
      tempPassword: "",
      password: "",
      loading: false,
      error: false
    };
  }

  onChangeText = (text, key) => {
    this.setState({ [key]: text, error: false });
  };

  handleResetPassword = () => {
    const { tempPassword, password, email } = this.state;
    const { navigation, userSignInSuccess } = this.props;

    this.setState({ loading: true, error: false });

    confirmLoginPromise({ email, password: tempPassword })
      .then(({ data }) => {
        // get token, id
        console.log("user successfully signed in before resetting password");
        const { token, user_id: id } = data;
        console.log(`res`, data);

        console.log(`token, id`, token, id);

        resetUserPasswordPromise({
          current_password: tempPassword,
          new_password: password,
          id,
          token
        }).then(success => {
          console.log("user successfully reset password");
          userSignInSuccess({ token, id, navigation });
        });
        // reset password with new password entered
        // navigate Home
      })
      .catch(err => {
        console.log(`ERR CREATING NEW PASSWORD`, err);
        this.setState({ loading: false, error: true });
      });

    console.log("handling reset password");
  };

  handleError = () => {
    if (this.state.error) {
      return (
        <HText
          color={"red"}
          size={3}
          text={"Invalid email or temp password."}
          style={{ marginTop: 5 }}
        />
      );
    }
  };

  render() {
    return (
      <FlexView>
        <HeaderBack
          text={"Reset Password"}
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
                marginBottom: "25%"
              }
            ]}
          >
            <ToorText
              color={"white"}
              size={1}
              mL={2.5}
              mR={2.5}
              mB={2.5}
              text={"Set your new password."}
              style={{ alignSelf: "flex-start" }}
            />
            <TextInput
              {...standardProps.inputProps}
              placeholder={"Your email"}
              onChangeText={text => this.onChangeText(text, "email")}
              value={this.state.email}
              autoCapitalize={"none"}
              autoFocus
              returnKeyType={"next"}
              onSubmitEditing={() => this.tempPasswordInput.focus()}
            />
            {/*  <TextInput />
            <TextInput /> */}
            <TextInput
              {...standardProps.inputProps}
              ref={input => (this.tempPasswordInput = input)}
              placeholder={"Your temporary password"}
              onChangeText={text => this.onChangeText(text, "tempPassword")}
              value={this.state.tempPassword}
              autoCapitalize={"none"}
              autoCapitalize={"none"}
              secureTextEntry
              returnKeyType={"next"}
              onSubmitEditing={() => this.newPasswordInput.focus()}
            />
            <TextInput
              {...standardProps.inputProps}
              ref={input => (this.newPasswordInput = input)}
              autoCapitalize={"none"}
              placeholder={"Your new password"}
              onChangeText={text => this.onChangeText(text, "password")}
              value={this.state.password}
              autoCapitalize={"none"}
              secureTextEntry
              returnKeyType={"go"}
              onSubmitEditing={this.handleResetPassword}
            />
            {this.handleError()}
          </View>
        </CityBackgroundView>
      </FlexView>
    );
  }
}

const mapStateToProps = ({ user }) => user;

const ResetPassword = connect(mapStateToProps, { userSignInSuccess })(
  UnlinkedResetPassword
);

export { ResetPassword };
