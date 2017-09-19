import React from "react";
import PropTypes from "prop-types";
import { View, Text } from "react-native";
import { HeaderSearch } from "./common";

class FavoritesPage extends React.Component {
  render() {
    return (
      <View>
        <Text>Favorites Page</Text>
      </View>
    );
  }
}

FavoritesPage.navigationOptions = {
  header: () =>
    <HeaderSearch
      onChangeText={text => console.log(text)}
      placeholder={"Search"}
    />
};

export { FavoritesPage };
