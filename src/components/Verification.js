import React from "react";
// import PropTypes from "prop-types";
import { View, Alert } from "react-native";
import { connect } from "react-redux";
import { verifyUser } from "../actions";
import { setPartOfProfile } from "../serverHelpers/APIFuncs";
import { BlackButton, CardSection, SmallCard, HText, ToorText } from "./common";
import Styles, { styleFuncs } from "../assets/Styles";
import Colors from "../assets/Colors";
import TextStyles from "../assets/TextStyles";

class UnconnectedVerification extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      frontID: "",
      backID: "",
      selfie: ""
    };
  }

  handleSubmit = () => {
    console.log(`JUMIO INTEGRATION TO GO HERE`);
    const { verifyUser, navigation } = this.props;
    const { id, token } = this.props.user.profile;

    // "successful" to be replaced with Jumio verification
    const successful = true;
    const postObj = {
      verified: true
    };

    if (successful) {
      setPartOfProfile({ id, token, postObj })
        .then(res => {
          console.log("user successfully verified");
          verifyUser(navigation);
        })
        .catch(err =>
          Alert.alert("There was an error verifying your information.")
        );
    }
  };

  renderUploadSections = () => {
    const sections = Object.keys(this.state).slice(0, 3);
    const titles = ["Front", "Back", "Selfie"];

    return sections.map((section, i) => {
      return (
        <SmallCard key={section}>
          <View style={{ flex: 2, backgroundColor: Colors.black }}>
            <ToorText text={`${section}placeholder`} color={"white"} size={2} />
          </View>
          <View style={{ flex: 4, backgroundColor: Colors.white }}>
            <HText size={2} color={"black"} text={titles[i]} />
            <ToorText
              text={"Tap to change the photo"}
              color={"black"}
              size={2}
            />
          </View>
        </SmallCard>
      );
    });
  };

  render() {
    return (
      <View style={Styles.flexView}>
        <CardSection style={{ flex: 1 }}>
          {this.renderUploadSections()}
        </CardSection>
        <BlackButton
          buttonStyle={styleFuncs.marginXP(0, 5, 5, 5)}
          title="SUBMIT"
          onPress={this.handleSubmit}
        />
      </View>
    );
  }
}

const mapStateToProps = state => {
  const { user, nav } = state;

  return { user, nav };
};

const Verification = connect(mapStateToProps, { verifyUser })(
  UnconnectedVerification
);

export { Verification };
