import React from "react";
import PropTypes from "prop-types";
import { Keyboard, View, Text } from "react-native";
import { connect } from "react-redux";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { editLockboxField, addNewLockbox } from "../actions";
import { TitledInput, Button } from "./common";
import Colors from "../assets/Colors";
import Styles, { styleFuncs, WIDTH } from "../assets/Styles";

const UnconnectedAddLockbox = props => {
  const { lockboxes, navigation } = props;

  const handleSubmit = () => {
    // add logic for verifying lockbox
    console.log(`handling submit`);

    const { serial, boxName } = props.lockboxes.editing;

    if (serial.length < 8 || boxName.length === 0) return;
    Keyboard.dismiss();

    props.addNewLockbox({ serial, boxName });
    navigation.navigateWithDebounce("LockboxConnecting", { serial });
  };

  const handleInputs = () => {
    return ["serial", "boxName"].map((item, i) => {
      let label;
      let placeholder;
      let value;
      let maxLength;
      let autoCapitalize;
      let onSubmitEditing = null;
      let autoFocus = false;

      switch (item) {
        case "serial":
          label = "Serial Number";
          placeholder = "Enter serial number";
          maxLength = 15;
          autoCapitalize = "characters";
          autoFocus = true;
          break;
        case "boxName":
          label = "Custom Name";
          placeholder = "Enter lockbox name";
          maxLength = 30;
          autoCapitalize = "sentences";
          onSubmitEditing = handleSubmit;
          break;
        default:
          return;
      }

      return (
        <TitledInput
          key={item}
          autoFocus={autoFocus}
          fontSize={14}
          mL={5}
          mR={5}
          mB={0}
          pT={10}
          pB={10}
          color={Colors.lightGray}
          label={label}
          labelSize={3}
          labelColor={"lightGray"}
          placeholder={placeholder}
          value={lockboxes.editing[item]}
          onChangeText={value => props.editLockboxField({ key: item, value })}
          backgroundColor={Colors.darkGray}
          placeholderTextColor={Colors.lightGray}
          maxLength={maxLength}
          autoCapitalize={autoCapitalize}
          onSubmitEditing={handleSubmit}
          returnKeyType={"go"}
        />
      );
    });
  };

  return (
    <View
      style={[
        Styles.flexView,
        {
          backgroundColor: Colors.black,
          alignItems: "flex-start",
          justifyContent: "flex-start"
        }
      ]}
    >
      {handleInputs()}
    </View>
  );
};

const localButtonStyle = {
  width: WIDTH - 40,
  left: 20,
  right: 20
};

const mapStateToProps = ({ lockboxes }) => ({ lockboxes });

const AddLockbox = connect(mapStateToProps, {
  editLockboxField,
  addNewLockbox
})(UnconnectedAddLockbox);

export { AddLockbox };
