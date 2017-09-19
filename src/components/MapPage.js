import React from "react";
import PropTypes from "prop-types";
import { View, Text } from "react-native";
import { HeaderSearch } from "./common";

class MapPage extends React.Component {
  render() {
    return (
      <View>
        <Text>Map Page</Text>
      </View>
    );
  }
}

MapPage.navigationOptions = {
  header: () =>
    <HeaderSearch
      onChangeText={text => console.log(text)}
      placeholder={"Search"}
    />
};

export { MapPage };
