import React from "react";
import { View, ActivityIndicator } from "react-native";

const Spinner = ({ size, style }) => {
  return (
    <View style={style}>
      <ActivityIndicator size={size || "large"} />
    </View>
  );
};

export { Spinner };
