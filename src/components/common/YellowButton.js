import React from "react";
import PropTypes from "prop-types";
import { Button } from "./Button";
import Styles from "../../assets/Styles";
import TextStyles from "../../assets/TextStyles";

const { buttonYellow, verticalSpacing } = Styles;
const { buttonBlackText } = TextStyles;

const YellowButton = props => {
  const { onPress, disabled, title } = props;

  return (
    <Button
      onPress={onPress}
      buttonStyle={[buttonYellow, verticalSpacing, props.style]}
      textStyle={buttonBlackText}
      title={title}
      disabled={disabled}
    />
  );
};

YellowButton.propTypes = {
  onPress: PropTypes.func.isRequired,
  title: PropTypes.string
};

export { YellowButton };
