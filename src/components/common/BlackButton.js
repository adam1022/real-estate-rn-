import React from "react";
import PropTypes from "prop-types";
import { Button } from "./Button";
import Styles from "../../assets/Styles";
import TextStyles from "../../assets/TextStyles";

const { buttonBlack, verticalSpacing } = Styles;
const { buttonYellowText } = TextStyles;

const BlackButton = props => {
  const { onPress, disabled, title } = props;

  return (
    <Button
      onPress={onPress}
      buttonStyle={[buttonBlack, verticalSpacing, props.buttonStyle]}
      textStyle={buttonYellowText}
      title={title}
      disabled={disabled}
    />
  );
};

BlackButton.propTypes = {
  onPress: PropTypes.func.isRequired,
  title: PropTypes.string
};

export { BlackButton };
