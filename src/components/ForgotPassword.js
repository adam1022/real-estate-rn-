import React from "react";
import { View } from "react-native";
import { connect } from "react-redux";
import {
  Input,
  CityBackgroundView,
  HText,
  ToorText,
  HeaderBack,
  FlexView,
  TouchableText
} from "./common";
import { recoverPassword } from "../serverHelpers/APIFuncs";
import TextStyles from "../assets/TextStyles";
import Styles, { styleFuncs } from "../assets/Styles";

class UnlinkedForgotPassword extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: ""
    };
  }

  recoverPasswordFailure = err => {
    console.log(`PASSWORD RECOVERY FAILED`, err);
  };

  handleRecoverPassword = () => {
    const { email } = this.state;
    // Keyboard.dismiss();

    recoverPassword({
      email,
      success: this.recoverPasswordSuccess,
      failure: this.recoverPasswordFailure
    });

    this.setState({ email: "" });

    this.props.navigation.navigateWithDebounce("ResetPassword", { email });
  };

  onChangeText = email => {
    this.setState({ email });
  };

  recoverPasswordSuccess = res => {
    console.log(`PASSWORD RECOVERY SUCCESSFUL`, res);
  };

  recoverPasswordSuccess = res => {
    console.log(`PASSWORD RECOVERY SUCCESSFUL`, res);
  };

  render() {
    return (
      <FlexView>
        <HeaderBack
          text={"Forgot Password"}
          navigation={this.props.navigation}
        />
        <CityBackgroundView>
          <View
            style={[
              Styles.flex1,
              {
                marginLeft: 1.5,
                marginRight: 1.5,
                marginBottom: "10%",
                justifyContent: "center"
              }
            ]}
          >
            <ToorText
              color={"white"}
              size={1}
              mT={2.5}
              mB={5}
              mL={2.5}
              mR={2.5}
              text="We will email you a temporary password that you can use to log in."
            />
            <Input
              textStyle={TextStyles.inputTextWhite}
              placeholder={"Your Email"}
              onChangeText={this.onChangeText}
              value={this.state.email}
              autoCapitalize={"none"}
              returnKeyType={"go"}
              onSubmitEditing={this.handleRecoverPassword}
              autoFocus
            />
            <TouchableText
              text={"Already requested a password? Touch here."}
              size={1}
              color={"white"}
              onPress={() =>
                this.props.navigation.navigateWithDebounce("ResetPassword")}
              buttonStyle={{
                alignSelf: "flex-start",
                padding: 5
              }}
            />
          </View>
        </CityBackgroundView>
      </FlexView>
    );
  }
}

const mapStateToProps = ({ nav }) => nav;

const ForgotPassword = connect(mapStateToProps)(UnlinkedForgotPassword);

export { ForgotPassword };
