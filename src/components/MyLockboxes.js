import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Image, TouchableOpacity, View, ScrollView, Text } from "react-native";
import { Button, ToorText } from "./common";
import Colors from "../assets/Colors";
import Icons from "../assets/Icons";
import Styles, { WIDTH, styleFuncs } from "../assets/Styles";

const BatteryBar = props => {
  // change the colors and percentages based on the props passed in from the data from the lockbox
  const localStyle = {
    height: 15,
    width: 35,
    borderWidth: 1,
    borderColor: Colors.activeGreen,
    marginLeft: 15,
    justifyContent: "center",
    borderRadius: 2
  };

  const fillStyle = {
    flex: 1,
    width: "60%",
    borderRadius: 2,
    backgroundColor: Colors.activeGreen
  };

  const bumpStyle = {
    position: "absolute",
    right: -5,
    height: 4,
    width: 3,
    backgroundColor: Colors.activeGreen,
    borderTopRightRadius: 15,
    borderBottomRightRadius: 15
  };

  return (
    <View style={localStyle}>
      <View style={[styleFuncs.marginX(1, 1, 1, 1), fillStyle]} />
      <View style={bumpStyle} />
    </View>
  );
};

const LockboxCard = props => {
  const { boxName } = props;

  console.log(`boxName`, boxName);

  return (
    <TouchableOpacity style={Styles.lockboxCardStyle}>
      <ToorText
        text={boxName}
        size={1}
        color={"black"}
        style={styleFuncs.marginX(15, 0, 5, 15)}
      />
      <ToorText
        style={styleFuncs.marginX(0, 0, 10, 15)}
        color="gray"
        size={2}
        text={"Sample Address Here"}
      />
      <View style={[Styles.flexRow, { alignItems: "center" }]}>
        <BatteryBar />
        <ToorText
          size={2}
          text={"40%"}
          color={"black"}
          style={{ marginLeft: 10 }}
        />
        <Image style={{ marginLeft: 10 }} source={Icons.greenKey} />
      </View>
    </TouchableOpacity>
  );
};

class UnconnectedMyLockboxes extends React.Component {
  renderLockboxes = () => {
    const { savedLockboxes } = this.props.lockboxes;

    console.log(`HELLO?`);

    if (!savedLockboxes.length) {
      return <LockboxCard boxName={"No Lockboxes Saved!"} />;
    }

    return savedLockboxes.map((boxObj, i) => {
      const { boxName } = boxObj;

      return <LockboxCard key={`${boxName}-i`} boxName={boxName} />;
    });
  };

  render() {
    const { navigation, lockboxes } = this.props;

    return (
      <View style={[Styles.flex1, { backgroundColor: Colors.backgroundWhite }]}>
        <ScrollView
          containerContentStyle={Styles.centerAll}
          style={Styles.scrollFlexView}
        >
          {this.renderLockboxes()}
        </ScrollView>
        <Button
          buttonStyle={Styles.smallButton}
          backgroundColor={Colors.black}
          color={Colors.yellow}
          title={"ADD LOCKBOX"}
          onPress={() => navigation.navigateWithDebounce("AddLockbox")}
        />
      </View>
    );
  }
}

const mapStateToProps = ({ lockboxes }) => ({ lockboxes });

const MyLockboxes = connect(mapStateToProps)(UnconnectedMyLockboxes);

export { MyLockboxes };
