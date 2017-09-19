import React from "react";
import PropTypes from "prop-types";
import { Text, TouchableOpacity } from "react-native";
import TextStyles from "../../assets/TextStyles";

const localStyles = {
  buttonStyle: {
    marginLeft: 10,
    marginRight: 10
  },
  textStyle: {
    alignSelf: "flex-start",
    paddingTop: 10,
    paddingBottom: 10
  }
};

const TouchableText = props => {
  let color;
  let { size } = props;
  const { buttonStyle, textStyle } = localStyles;

  switch (props.color) {
    case "black":
      color = size === 1 ? TextStyles.p1Black : TextStyles.p2Black;
      break;
    case "white":
      color = size === 1 ? TextStyles.p1White : TextStyles.p2White;
      break;
    case "gray":
      color = size === 1 ? TextStyles.p1Gray : TextStyles.p2Gray;
      break;
    case "lightGray":
      color = size === 1 ? TextStyles.p1LightGray : TextStyles.p2LightGray;
      break;
    case "red":
      color = size === 1 ? TextStyles.p1Red : TextStyles.p2Red;
      break;
    default:
      color = TextStyles.p1Black;
      break;
  }

  return (
    <TouchableOpacity
      style={[buttonStyle, props.buttonStyle]}
      onPress={props.onPress}
    >
      <Text style={[textStyle, props.textStyle, color]}>
        {props.text}
      </Text>
    </TouchableOpacity>
  );
};

TouchableText.propTypes = {
  onPress: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
  size: PropTypes.number.isRequired
};

export { TouchableText };
