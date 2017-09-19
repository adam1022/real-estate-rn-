import React from "react";
// import PropTypes from "prop-types";
import { connect } from "react-redux";
import { View, Text } from "react-native";
import { HeaderSearch } from "./common";

class UnconnectedSearchPage extends React.Component {
  render() {
    return (
      <View>
        <Text>Home / Search Page</Text>
      </View>
    );
  }
}

UnconnectedSearchPage.navigationOptions = {
  header: () =>
    <HeaderSearch
      onChangeText={text => console.log(text)}
      placeholder={"Search"}
    />
};

const mapStateToProps = ({ user, nav }) => ({ user, nav });

const SearchPage = connect(mapStateToProps)(UnconnectedSearchPage);

export { SearchPage };
