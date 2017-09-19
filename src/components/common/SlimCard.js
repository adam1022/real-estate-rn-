import React from "react";
import { TouchableOpacity, Image, StyleSheet, View, Text } from "react-native";
import PropTypes from "prop-types";
import Styles, { styleFuncs } from "../../assets/Styles";
import Images from "../../assets/Images";

const localStyles = StyleSheet.create({
  slimCard: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignSelf: "center",
    alignItems: "center",
    width: "100%"
  },
  imageStyle: {
    flex: 1,
    height: 80,
    maxWidth: 80
  },
  textStyle: {
    flex: 3,
    marginLeft: 15
  }
});

const SlimCard = props => {
  const { slimCard, imageStyle, textStyle } = localStyles;
  const { guestName, photoObj } = props;

  return (
    <TouchableOpacity style={[Styles.guestlistCardStyle, slimCard]}>
      <Image style={imageStyle} source={photoObj} resizeMode="cover" />
      <Text style={textStyle}>
        {guestName}
      </Text>
    </TouchableOpacity>
  );
};

export { SlimCard };
