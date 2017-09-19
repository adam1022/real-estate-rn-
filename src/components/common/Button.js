import React from "react";
import PropTypes from "prop-types";
import { Text, TouchableOpacity } from "react-native";
import Colors from "../../assets/Colors";

const Button = props => {
  const {
    onPress,
    disabled,
    title,
    color,
    fontSize,
    backgroundColor,
    padding,
    mB,
    mT,
    mL,
    mR
  } = props;

  const styles = {
    buttonStyle: {
      alignSelf: "stretch",
      backgroundColor: backgroundColor || "#fff",
      marginLeft: mL || mL === 0 ? `${mL}%` : 10,
      marginRight: mR || mR === 0 ? `${mR}%` : 10,
      marginBottom: mB || mB === 0 ? `${mB}%` : 0,
      marginTop: mT || mT === 0 ? `${mT}%` : 0
    },
    textStyle: {
      fontSize: fontSize || 16,
      fontWeight: "500",
      color: color || Colors.black,
      alignSelf: "center",
      paddingTop: padding || 10,
      paddingBottom: padding || 10
    }
  };

  const { buttonStyle, textStyle } = styles;

  return (
    <TouchableOpacity
      onPress={onPress}
      style={[buttonStyle, props.buttonStyle]}
      disabled={disabled}
    >
      <Text style={[textStyle, props.textStyle]}>
        {title || ""}
      </Text>
    </TouchableOpacity>
  );
};

Button.propTypes = {
  onPress: PropTypes.func.isRequired,
  title: PropTypes.string
};

export { Button };
