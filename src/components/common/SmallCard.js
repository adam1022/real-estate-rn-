import React from "react";
import { View } from "react-native";

const styles = {
  containerStyle: {
    flexDirection: "row",
    alignSelf: "flex-start",
    height: "20%",
    width: "100%",
    borderBottomWidth: 0,
    shadowColor: "#000",
    shadowOffset: { width: 2, height: 4 },
    shadowOpacity: 0.35,
    shadowRadius: 4,
    elevation: 1,
    marginLeft: 5,
    marginRight: 5,
    marginTop: 10
  }
};

const SmallCard = props => {
  return (
    <View style={styles.containerStyle}>
      {props.children}
    </View>
  );
};

export { SmallCard };
