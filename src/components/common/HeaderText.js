import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { NavigationActions } from "react-navigation";
import { View, TouchableOpacity, Text, Image } from "react-native";
// import { Button } from './Button'
import { getNextBackKey } from "../../Helpers";
import { HText } from "./HText";
import Styles, { WIDTH } from "../../assets/Styles";
import Icons from "../../assets/Icons";
import Colors from "../../assets/Colors";

const headerLeftStyle = {
  flexDirection: "row",
  position: "absolute",
  alignItems: "center",
  bottom: 3.5,
  left: 0,
  padding: 10,
  paddingRight: 20,
  zIndex: 100,
  backgroundColor: Colors.darkGray
};

const headerRightStyle = {
  position: "absolute",
  bottom: 3.5,
  right: 0,
  padding: 10,
  paddingLeft: 20,
  zIndex: 100,
  backgroundColor: Colors.darkGray
};

const containerStyle = {
  position: "absolute",
  width: WIDTH,
  height: 65,
  paddingBottom: 10,
  alignItems: "center",
  justifyContent: "flex-end",
  zIndex: 10,
  backgroundColor: Colors.darkGray
};

const centerTextStyle = {};

// const buttonStyle = {
//   back
// }

const UnconnectedHeaderText = props => {
  // const { key: routeKey } = props.navigation.state;
  // const nextKey = getNextBackKey(routeKey);

  // const goBack = () => {
  //   props.navigation.dispatch({
  //     type: "Navigation/BACK",
  //     key: nextKey
  //   });
  // };

  const goBack = () => props.navigation.dispatch(NavigationActions.back());

  const {
    titleCenter,
    backArrow,
    titleLeft,
    titleRight,
    rightAction,
    leftAction
  } = props;

  renderLeftTitle = () => {
    return (
      <TouchableOpacity
        style={headerLeftStyle}
        onPress={leftAction ? leftAction : goBack}
      >
        {backArrow &&
          <Image style={Styles.backArrowIcon} source={Icons.backArrowWhite} />}

        <HText mL={5} size={4} color={"white"} text={titleLeft || ""} />
      </TouchableOpacity>
    );
  };

  renderBackArrow = () => {
    return (
      <TouchableOpacity
        style={headerLeftStyle}
        onPress={leftAction ? leftAction : goBack}
      >
        <Image style={Styles.backArrowIcon} source={Icons.backArrowWhite} />
      </TouchableOpacity>
    );
  };

  return (
    <View style={containerStyle}>
      <HText
        // style={textStyle}
        mB={1}
        color={"white"}
        size={4}
        style={{ fontWeight: "600" }}
        text={titleCenter || ""}
      />

      {titleLeft && renderLeftTitle()}
      {!titleLeft && renderBackArrow()}

      {titleRight &&
        <TouchableOpacity style={headerRightStyle} onPress={rightAction}>
          <HText size={4} color={"white"} text={titleRight} />
        </TouchableOpacity>}
    </View>
  );
};

UnconnectedHeaderText.propTypes = {
  navigation: PropTypes.object.isRequired,
  text: PropTypes.string
};

const mapStateToProps = state => state;

const HeaderText = connect(mapStateToProps)(UnconnectedHeaderText);

export { HeaderText };
