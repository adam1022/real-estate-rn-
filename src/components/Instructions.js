import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { View, TouchableOpacity, TextInput } from "react-native";
import { Divider } from "react-native-elements";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { HText } from "./common";
import Styles, { standardProps } from "../assets/Styles";
import Colors from "../assets/Colors";
import { editHouseItem } from "../actions";

class UnconnectedInstructions extends React.Component {
  render() {
    const { instructions } = this.props.editingHouse;

    return (
      <View
        style={[Styles.backgroundBlack, Styles.flexView, { width: "100%" }]}
      >
        <TouchableOpacity
          style={{ alignSelf: "flex-start", margin: "5%", width: "95%" }}
          onPress={() => this.instructionsInput.focus()}
        >
          <TextInput
            {...standardProps.darkInputProps}
            autoFocus={true}
            maxLength={500}
            // numberOfLines={2}
            ref={input => (this.instructionsInput = input)}
            placeholder={`Enter instructions here.`}
            multiline={true}
            value={instructions}
            onChangeText={value =>
              this.props.editHouseItem({ key: "instructions", value })}
            fontSize={20}
            selectionColor={Colors.gray}
            selectTextOnFocus
          />
        </TouchableOpacity>
      </View>
    );
  }
}

const mapStateToProps = ({ houses }) => ({ editingHouse: houses.editingHouse });

const Instructions = connect(mapStateToProps, { editHouseItem })(
  UnconnectedInstructions
);

export { Instructions };
