import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { View, Text, StyleSheet, Image } from "react-native";
import { HText, ToorText, Button } from "./common";
import Images from "../assets/Images";
import Styles from "../assets/Styles";
import Colors from "../assets/Colors";

const styles = StyleSheet.create({
  contentBox: {
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
    width: "55%"
  }
});

class UnconnectedWalkthrough extends React.Component {
  state = {
    screen: 0,
    images: [
      Images.searchWalkthrough,
      Images.mapWalkthrough,
      Images.schedulerWalkthrough,
      Images.favoritesWalkthrough,
      Images.profileWalkthrough
    ],
    titles: [
      "Search & Filter",
      "Map View",
      "Scheduler",
      "Favorites",
      "Profile"
    ],
    texts: [
      "Quickly access properties and user data.",
      "Easily locate properties and agents.",
      "Manage incoming and outgoing appointments.",
      "Find your favorite properties and agents.",
      "Edit personal profile and inventory information."
    ]
  };

  handlePress = () => {
    const { screen, texts } = this.state;

    if (screen < texts.length - 1) {
      this.setState({ screen: screen + 1 });
    } else {
      this.props.navigation.navigateWithDebounce("Home");
    }
  };

  renderContent = () => {
    const { screen, titles, texts } = this.state;

    return (
      <View style={styles.contentBox}>
        <HText mAll={0} size={1} color={"lightGray"} text={titles[screen]} />
        <ToorText
          textAlign={"center"}
          mT={5}
          mB={8}
          size={1}
          color={"lightGray"}
          text={texts[screen]}
        />
        <Button
          backgroundColor={Colors.yellow}
          title={"NEXT"}
          color={Colors.black}
          onPress={this.handlePress}
        />
      </View>
    );
  };

  render() {
    const { screen, images } = this.state;

    return (
      <Image
        style={[Styles.imageFullScreenContainer, { justifyContent: "center" }]}
        source={images[screen]}
      >
        {this.renderContent()}
      </Image>
    );
  }
}

const mapStateToProps = ({ user }) => {
  return user;
};

const Walkthrough = connect(mapStateToProps)(UnconnectedWalkthrough);

export { Walkthrough };
