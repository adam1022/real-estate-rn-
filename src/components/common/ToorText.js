import React from "react";
import PropTypes from "prop-types";
import { Text } from "react-native";
import { styleFuncs } from "../../assets/Styles";
import TextStyles from "../../assets/TextStyles";

const ToorText = props => {
  let color;
  const { size } = props;
  const { mT, mR, mB, mL, mAll, textAlign } = props;

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
    <Text
      style={[
        color,
        styleFuncs.marginXP(
          mAll || mT || 0,
          mAll || mR || 0,
          mAll || mB || 0,
          mAll || mL || 0
        ),
        props.style
      ]}
      textAlign={textAlign || "left"}
    >
      {props.text}
    </Text>
  );
};

ToorText.propTypes = {
  text: PropTypes.string.isRequired,
  color: PropTypes.string,
  size: PropTypes.number.isRequired
};

export { ToorText };
