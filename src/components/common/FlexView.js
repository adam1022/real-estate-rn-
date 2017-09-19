import React from "react";
import { View } from "react-native";
import Styles from "../../assets/Styles";

const FlexView = props => {
  return (
    <View style={Styles.flex1}>
      {props.children}
    </View>
  );
};

export { FlexView };
