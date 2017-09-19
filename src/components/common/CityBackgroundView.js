import React from "react";
import PropTypes from "prop-types";
import { ImageBackground, Image } from "react-native";
import Images from "../../assets/Images";
import Styles from "../../assets/Styles";

// figure out a way to get 'resizeMode' working on ImageBackground

const CityBackgroundView = props => {
  return (
    <Image
      style={Styles.imageFullScreenContainer}
      source={Images.cityBackground}
    >
      {props.logo !== false &&
        <Image style={Styles.toorLogo} source={Images.toorLogo} />}
      {props.children}
    </Image>
  );
};

export { CityBackgroundView };
