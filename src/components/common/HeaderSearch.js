import React from "react";
import PropTypes from "prop-types";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Input } from "./Input";
import Colors from "../../assets/Colors";

const navSearchBarStyle = {
  containerStyle: {
    backgroundColor: Colors.backgroundWhite,
    borderTopColor: Colors.backgroundWhite,
    borderBottomColor: Colors.backgroundWhite,
    borderRightColor: Colors.backgroundWhite,
    borderLeftColor: Colors.backgroundWhite
  },
  inputStyle: {
    textAlign: "center",
    color: Colors.black,
    backgroundColor: Colors.backgroundWhite,
    paddingRight: 3,
    paddingLeft: 3,
    paddingTop: 2.5,
    paddingBottom: 2.5,
    fontSize: 14,
    lineHeight: 20
  }
};

const HeaderSearch = props => {
  return (
    <KeyboardAwareScrollView
      style={{ paddingTop: 25, backgroundColor: Colors.darkGray }}
    >
      <Input
        mAll={2.5}
        placeholder={props.placeholder}
        placeholderTextColor={Colors.gray}
        onChangeText={props.onChangeText}
        inputStyle={navSearchBarStyle.inputStyle}
        containerStyle={[
          navSearchBarStyle.containerStyle,
          props.containerStyle
        ]}
      />
    </KeyboardAwareScrollView>
  );
};

HeaderSearch.propTypes = {
  label: PropTypes.string,
  onChangeText: PropTypes.func.isRequired,
  placeholder: PropTypes.string.isRequired
};

export { HeaderSearch };
