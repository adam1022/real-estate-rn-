import React from "react";
import { View, Image, Dimensions, Alert } from "react-native";
import { connect } from "react-redux";
import { Divider } from "react-native-elements";
import GestureRecognizer, {
  swipeDirections
} from "react-native-swipe-gestures";
import { createTransition, FlipX } from "react-native-transition";
import { setPartOfProfile } from "../serverHelpers/APIFuncs";
import { HText, ToorText, TouchableText } from "./common";
import { completeOnboarding } from "../actions";
import Colors from "../assets/Colors";
import Styles, { styleFuncs } from "../assets/Styles";
import Images from "../assets/Images";

const Transition = createTransition(FlipX);

class UnconnectedOnboarding extends React.Component {
  constructor(props) {
    super(props);

    const headerText = [
      "Welcome to TOOR",
      "Verified Users",
      "Property & Agent Search",
      "Scheduling Tool",
      "Real Time Notifications"
    ];
    const bodyText = [
      "The all-in-one solution used to schedule and access properties.",
      "Our community is built on trust and transparency. Feel safe knowing all users identities have been verified.",
      "View properties with or without TOOR access including MLS listings. Find available and nearby agents ready to assist.",
      "View profiles and showing requests from agents, buyers, visitors, and more. Approve, decline, or reschedule appointments instantly.",
      "Receive instant alerts when the TOOR Smart Lockbox is opened and closed. Get real time messaging, feedback, and showing request notifications."
    ];

    this.state = {
      screen: 0,
      images: [
        Images.onboarding1,
        Images.onboarding2,
        Images.onboarding3,
        Images.onboarding4,
        Images.onboarding5
      ],
      headerText,
      bodyText
    };

    this.sideMargin = 5;
    this.width = Dimensions.get("window").width;
    this.height = Dimensions.get("window").height;
  }

  handleCircles = () => {
    const circles = [];

    for (let i = 0; i < 5; i += 1) {
      const bgStyle = {
        backgroundColor: i === this.state.screen ? Colors.white : Colors.gray
      };

      circles.push(
        <View key={`circle-${i}`} style={[Styles.smallCircle, bgStyle]} />
      );
    }

    return (
      <View
        style={[
          {
            width: 100,
            flexDirection: "row"
          },
          styleFuncs.marginXP(null, 45, null, this.sideMargin)
        ]}
      >
        {circles}
      </View>
    );
  };

  handleNextScreen = () => {
    let { screen } = this.state;
    const { completeOnboarding, navigation } = this.props;

    if (screen < 4) {
      const activeImage = this.state.images[screen + 1];
      this.setState({ screen: screen + 1 });
      Transition.show(
        <View
          style={[
            Styles.centerAll,
            {
              flex: 3,
              paddingBottom: "10%"
            }
          ]}
        >
          <Image
            style={{
              flex: 1,
              resizeMode: "center",
              width: "65%",
              height: null
            }}
            source={activeImage}
          />
        </View>
      );
    } else {
      const { id, token } = this.props.user.profile;
      const postObj = {
        onboarded: true
      };

      setPartOfProfile({ id, token, postObj })
        .then(res => {
          console.log(`Onboarding successfully posted to server.`);
          completeOnboarding(navigation);
        })
        .catch(err =>
          Alert.alert("Error", "Onboarding Unsuccessful. Please try again")
        );
    }
  };

  onSwipeLeft = state => {
    console.log(`SWIPE STATE`, state);

    this.handleNextScreen();
  };

  onSwipeRight = state => {
    let { screen } = this.state;
    const { completeOnboarding, navigation } = this.props;

    if (screen > 0) {
      const activeImage = this.state.images[screen - 1];
      this.setState({ screen: screen - 1 });
      Transition.show(
        <View
          style={[
            Styles.centerAll,
            {
              flex: 3,
              paddingBottom: "10%"
            }
          ]}
        >
          <Image
            style={{
              flex: 1,
              resizeMode: "center",
              width: "65%",
              height: null
            }}
            source={activeImage}
          />
        </View>
      );
    }
  };

  render() {
    const { screen, headerText, bodyText } = this.state;

    return (
      <GestureRecognizer
        onSwipeRight={state => this.onSwipeRight(state)}
        onSwipeLeft={state => this.onSwipeLeft(state)}
        style={{ backgroundColor: Colors.black, flex: 1 }}
      >
        <Transition>
          <View
            style={[
              Styles.centerAll,
              {
                flex: 3,
                paddingBottom: "10%"
              }
            ]}
          >
            <Image
              style={{
                flex: 1,
                resizeMode: "center",
                width: "65%",
                height: null
              }}
              source={Images.onboarding1}
            />
          </View>
        </Transition>
        <View
          style={{
            backgroundColor: Colors.darkGray,
            flex: 1
          }}
        >
          <View style={{ margin: `${this.sideMargin}%`, flex: 2.5 }}>
            <HText
              mAll={5}
              size={2}
              text={headerText[screen]}
              color={"lightGray"}
            />
            <ToorText
              mAll={5}
              size={1}
              text={bodyText[screen]}
              color={"lightGray"}
            />
          </View>
          <Divider style={{ backgroundColor: Colors.divider }} />
          <View
            style={{
              backgroundColor: Colors.darkGray,
              flex: 1,
              flexDirection: "row",
              alignItems: "center"
            }}
          >
            {this.handleCircles()}
            <TouchableText
              text={"NEXT"}
              color={"lightGray"}
              size={2}
              onPress={this.handleNextScreen}
            />
          </View>
        </View>
      </GestureRecognizer>
    );
  }
}

const mapStateToProps = ({ user, nav }) => {
  return {
    user,
    nav
  };
};

const Onboarding = connect(mapStateToProps, { completeOnboarding })(
  UnconnectedOnboarding
);

export { Onboarding };
