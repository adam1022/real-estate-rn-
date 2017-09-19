import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity
} from "react-native";
import { Divider } from "react-native-elements";
import { HText, ToorText, Button, Loading } from "./common";
import { serverSignout } from "../serverHelpers/APIFuncs";
import { userLogout, setLoading, unsetLoading } from "../actions";
import { getCityAndCountry } from "../Helpers";
import Styles, { WIDTH, SMALL_DEVICE, styleFuncs } from "../assets/Styles";
import Images from "../assets/Images";
import Colors from "../assets/Colors";
import Icons from "../assets/Icons";

class UnconnectedProfilePage extends React.Component {
  constructor(props) {
    super(props);

    const { name } = props.user.profile;
    const sectionNames = [
      "My Profile",
      "My Homes",
      "My Lockboxes",
      "Terms of use"
    ];
    const sectionIcons = [
      Icons.blackProfile,
      Icons.blackHome,
      Icons.blackLockbox,
      Icons.blackInfo
    ];
    const sectionNavs = ["EditProfile", "MyHomes", "MyLockboxes", "TermsOfUse"];

    this.state = {
      name,
      sectionNames,
      sectionIcons,
      sectionNavs
    };
  }

  static navigationOptions = ({ navigation }) => {
    return {
      title: "Profile",
      headerStyle: {
        backgroundColor: Colors.darkGray
      },
      headerTintColor: Colors.white
    };
  };

  componentDidMount() {
    console.log(`PROFILE PAGE MOUNTED`);
  }

  componentWillUnmount() {
    console.log(`MYPROFILE IS UNMOUNTING`);
  }

  renderNameAndPic = () => {
    const { name, pic } = this.props.user.profile;

    const picObj =
      pic.indexOf("/images/") !== 0 ? { uri: pic } : Images.defaultProfilePic;

    return (
      <View
        style={{
          flex: 1,
          flexDirection: "row",
          width: WIDTH,
          justifyContent: "flex-start",
          alignItems: "center",
          marginTop: "5%",
          marginLeft: "2.5%"
        }}
      >
        <Image source={picObj} style={Styles.profilePicStyle} />
        <HText size={1} color={"black"} text={name} />
      </View>
    );
  };

  showDivider = () =>
    <Divider
      style={[
        {
          backgroundColor: Colors.divider
        },
        styleFuncs.marginXP(0, 5, 0, 5)
      ]}
    />;

  handleSignOut = () => {
    const { token, id } = this.props.user.profile;
    const { userLogout, setLoading, unsetLoading } = this.props;

    setLoading();
    serverSignout({ token, id }).then(success => userLogout()).catch(err => {
      unsetLoading();
      console.log(`ERROR SIGNING USER OUT`, err);
    });
  };

  showLogoutButton = () => {
    return (
      <Button
        color={"black"}
        backgroundColor={Colors.yellow}
        title={"LOG OUT"}
        mT={5}
        mB={SMALL_DEVICE ? 5 : 0}
        buttonStyle={{ width: "40%", alignSelf: "center" }}
        onPress={this.handleSignOut}
      />
    );
  };

  renderProfileSections = () => {
    const { sectionNames, sectionNavs, sectionIcons } = this.state;

    return sectionNames.map((name, i) => {
      const icon = sectionIcons[i];
      const navName = sectionNavs[i];

      let iconStyle;
      if (name === "My Lockboxes") {
        iconStyle = {
          height: 22,
          width: 10
        };
      } else {
        iconStyle = Styles.icon;
      }

      // profile section
      return (
        <View key={name}>
          <TouchableOpacity
            style={{
              justifyContent: "flex-start"
            }}
            onPress={() => this.props.navigation.navigateWithDebounce(navName)}
          >
            <View style={Styles.touchableRowSection}>
              <View
                style={[
                  styleFuncs.marginXP(0, 5, 0, 5),
                  Styles.icon,
                  { alignItems: "center" }
                ]}
              >
                <Image source={icon} style={[iconStyle]} />
              </View>
              <ToorText text={name} color={"black"} size={1} />
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "flex-end",
                  flex: 1
                }}
              >
                <Image
                  source={Icons.grayRightArrow}
                  style={([styleFuncs.square(12.5)], { marginRight: "10%" })}
                />
              </View>
            </View>
          </TouchableOpacity>
          {i !== sectionNames.length - 1 && this.showDivider()}
          {i === sectionNames.length - 1 && this.showLogoutButton()}
        </View>
      );
    });
  };

  render() {
    if (this.props.navigation.state.routeName !== "MyProfile") return null;

    const scrollEnabled = SMALL_DEVICE ? true : false;

    return (
      <ScrollView
        style={[{ backgroundColor: Colors.backgroundWhite }]}
        contentContainerStyle={[
          Styles.flexView,
          { alignItems: "flex-start", flex: 0 }
        ]}
        scrollEnabled={scrollEnabled}
      >
        {this.renderNameAndPic()}
        <View
          style={{
            flex: 2.5,
            justifyContent: "flex-start",
            backgroundColor: Colors.backgroundWhite
          }}
        >
          {this.renderProfileSections()}
        </View>
      </ScrollView>
    );
  }
}

const mapStateToProps = ({ user, houses }) => {
  return {
    user,
    houses
  };
};

const ProfilePage = connect(mapStateToProps, {
  userLogout,
  setLoading,
  unsetLoading
})(UnconnectedProfilePage);

export { ProfilePage };
