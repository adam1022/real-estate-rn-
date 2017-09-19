import React from "react";
import PropTypes from "prop-types";
import { View, Text, Button } from "react-native";
import { createTransition, SlideLeft } from "react-native-transition";

const Transition = createTransition(SlideLeft);

class TransitionView extends React.Component {
  switch = () => {
    Transition.show(
      <View style={{ flex: 1, alignItems: "center" }}>
        <Text>This is another view</Text>
      </View>
    );
  };

  render() {
    return (
      <Transition>
        <View style={{ flex: 1, alignItems: "center" }}>
          <Text>This the initial View</Text>
          <Button title="Press to Switch" onPress={this.switch} />
        </View>
      </Transition>
    );
  }
}

export { TransitionView };
