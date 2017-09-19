import React from "react";
import PropTypes from "prop-types";
import { View } from "react-native";

const style = {
  containerStyle: {
    alignSelf: "stretch",
    marginLeft: 5,
    marginRight: 5,
    marginTop: 5,
    marginBottom: 5
  }
};

const StretchView = props => {
  return (
    <View style={[style.containerStyle, props.style]}>
      {props.children}
    </View>
  );
};

StretchView.propTypes = {
  children: PropTypes.array || PropTypes.string
};

export { StretchView };
