import React from "react";
import PropTypes from "prop-types";
import { Button } from "./Button";
import Styles from "../../assets/Styles";
import TextStyles from "../../assets/TextStyles";

const { buttonWhite, verticalSpacing } = Styles;
const { buttonBlackText } = TextStyles;

const WhiteButton = props => {
  const { onPress, title, disabled } = props;

  return (
    <Button
      onPress={onPress}
      buttonStyle={[buttonWhite, verticalSpacing, props.style]}
      textStyle={buttonBlackText}
      title={title}
      disabled={disabled}
    />
  );
};

WhiteButton.propTypes = {
  onPress: PropTypes.func.isRequired,
  title: PropTypes.string
};

export { WhiteButton };
