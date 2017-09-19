import React from "react";
import PropTypes from "prop-types";
import { View, Text, TextInput } from "react-native";
import Colors from "../../assets/Colors";
import { styleFuncs } from "../../assets/Styles";

class Input extends React.Component {
  render() {
    const {
      value,
      onChangeText,
      placeholder,
      placeholderTextColor,
      secureTextEntry,
      textStyle,
      selectionColor,
      keyboardType,
      mAll,
      mT,
      mR,
      mB,
      mL,
      pL,
      pR,
      pT,
      pB,
      color,
      borderColor,
      height,
      multiline,
      fontSize,
      flex,
      defaultValue,
      borderWidth,
      returnKeyType,
      onSubmitEditing,
      selectTextOnFocus,
      autoFocus,
      focus,
      refInput,
      width,
      maxLength,
      keyboardAppearance
    } = this.props;

    const styles = {
      inputStyle: {
        color: color || Colors.black,
        paddingRight: pR || pR === 0 ? pR : 10,
        paddingLeft: pL || pL === 0 ? pL : 10,
        paddingTop: pT || pT === 0 ? pT : 15,
        paddingBottom: pB || pB === 0 ? pB : 15,
        fontSize: fontSize || 18,
        lineHeight: 23,
        flex: 2
      },
      containerStyle: {
        borderWidth: borderWidth || 1,
        marginTop: mT ? `${mT}%` : "2.5%",
        marginBottom: mB ? `${mB}%` : "2.5%",
        marginLeft: mL ? `${mL}%` : "2.5%",
        marginRight: mR ? `${mR}%` : "2.5%",
        borderTopColor: borderColor || Colors.white,
        borderBottomColor: borderColor || Colors.white,
        borderRightColor: borderColor || Colors.white,
        borderLeftColor: borderColor || Colors.white,
        flexDirection: "row",
        alignItems: "center",
        flex: this.props.flex || 0,
        width: width || null
      }
    };
    const { inputStyle, containerStyle } = styles;

    // styleFuncs.marginXP(
    //           mAll || mT || 0,
    //           mAll || mR || 0,
    //           mAll || mB || 0,
    //           mAll || mL || 0
    //         ),

    const marginStyle = mAll ? styleFuncs.marginXP(mAll, mAll, mAll, mAll) : {};

    const autoCapitalize = !this.props.autoCapitalize
      ? "sentences"
      : this.props.autoCapitalize;

    return (
      <View style={[containerStyle, this.props.containerStyle, marginStyle]}>
        <TextInput
          placeholder={placeholder}
          placeholderTextColor={placeholderTextColor || Colors.white}
          selectionColor={selectionColor || Colors.white}
          autoCorrect={false}
          style={[inputStyle, textStyle, this.props.inputStyle]}
          value={value}
          onChangeText={onChangeText}
          autoCapitalize={autoCapitalize}
          secureTextEntry={secureTextEntry}
          keyboardType={keyboardType || "default"}
          multiline={multiline || false}
          defaultValue={defaultValue}
          returnKeyType={returnKeyType || "default"}
          onSubmitEditing={onSubmitEditing || null}
          selectTextOnFocus={selectTextOnFocus}
          focus={focus || false}
          autoFocus={autoFocus || false}
          refs={refInput}
          maxLength={maxLength || 150}
          keyboardAppearance={keyboardAppearance || "dark"}
        />
      </View>
    );
  }
}

Input.propTypes = {
  onChangeText: PropTypes.func.isRequired,
  placeholder: PropTypes.string.isRequired
};

export { Input };
