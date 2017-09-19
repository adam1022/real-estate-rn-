import React from "react";
import PropTypes from "prop-types";
import { Text } from "react-native";
import TextStyles from "../../assets/TextStyles";
import { styleFuncs } from "../../assets/Styles";

const HText = props => {
  let color;
  const { size } = props;
  const { mT, mR, mB, mL, mAll } = props;

  switch (props.color) {
    case "black":
      if (size === 1) color = TextStyles.h1Black;
      else if (size === 2) color = TextStyles.h2Black;
      else if (size === 3) color = TextStyles.h3Black;
      else color = TextStyles.h4Black;
      break;
    case "white":
      if (size === 1) color = TextStyles.h1White;
      else if (size === 2) color = TextStyles.h2White;
      else if (size === 3) color = TextStyles.h3White;
      else color = TextStyles.h4White;
      break;
    case "gray":
    case "darkGray":
      if (size === 1) color = TextStyles.h1Gray;
      else if (size === 2) color = TextStyles.h2Gray;
      else if (size === 3) color = TextStyles.h3Gray;
      else color = TextStyles.h4Gray;
      break;
    case "lightGray":
      if (size === 1) color = TextStyles.h1LightGray;
      else if (size === 2) color = TextStyles.h2LightGray;
      else if (size === 3) color = TextStyles.h3LightGray;
      else color = TextStyles.h4LightGray;
      break;
    case "red":
      if (size === 1) color = TextStyles.h1Red;
      else if (size === 2) color = TextStyles.h2Red;
      else if (size === 3) color = TextStyles.h3Red;
      else color = TextStyles.h4Red;
      break;
    default:
      color = TextStyles.h1Black;
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
    >
      {props.text}
    </Text>
  );
};

HText.propTypes = {
  text: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
  size: PropTypes.number.isRequired
};

export { HText };
