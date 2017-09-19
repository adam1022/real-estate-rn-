import React from "react";
import { View } from "react-native";
import { styleFuncs } from "../../assets/Styles";

const styles = {
  containerStyle: {
    justifyContent: "flex-start",
    flexWrap: "wrap",
    position: "relative"
  }
};

const CardSection = props => {
  return (
    <View
      style={[
        styles.containerStyle,
        styleFuncs.marginXP(5, 5, 5, 5),
        props.style
      ]}
    >
      {props.children}
    </View>
  );
};

export { CardSection };
