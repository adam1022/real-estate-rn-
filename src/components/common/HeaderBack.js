import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { View, TouchableOpacity, Text, Image } from "react-native";
// import { Button } from './Button'
import { HText } from "./HText";
import Styles, { WIDTH } from "../../assets/Styles";
import Icons from "../../assets/Icons";

const headerBackStyle = {
  position: "absolute",
  left: 0,
  padding: 10,
  paddingRight: 20,
  zIndex: 100,
  backgroundColor: "rgba(255, 255, 255, 0)"
};

const containerStyle = {
  position: "absolute",
  width: WIDTH,
  alignItems: "center",
  justifyContent: "center",
  top: 30,
  zIndex: 10,
  backgroundColor: "rgba(255, 255, 255, 0)"
};

const textStyle = {
  fontWeight: "600"
};

// const buttonStyle = {
//   back
// }

const UnconnectedHeaderBack = props => {
  console.log("props", props);
  const goBack = () => {
    props.navigation.goBack();
  };

  const { text } = props;

  return (
    <View style={containerStyle}>
      <HText style={textStyle} color={"white"} size={4} text={text || ""} />

      <TouchableOpacity style={headerBackStyle} onPress={goBack}>
        <Image style={Styles.backArrowIcon} source={Icons.backArrowWhite} />
      </TouchableOpacity>
    </View>
  );
};

UnconnectedHeaderBack.propTypes = {
  navigation: PropTypes.object.isRequired,
  text: PropTypes.string
};

const mapStateToProps = state => state;

const HeaderBack = connect(mapStateToProps)(UnconnectedHeaderBack);

export { HeaderBack };
