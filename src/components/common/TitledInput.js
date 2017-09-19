import React from "react";
import PropTypes from "prop-types";
import { View, Text, TextInput } from "react-native";
import { HText } from "./HText";
import Colors from "../../assets/Colors";
import { WIDTH } from "../../assets/Styles";
import { styleFuncs } from "../../assets/Styles";

class TitledInput extends React.Component {
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
      backgroundColor,
      label,
      labelSize,
      labelColor,
      maxLength,
      keyboardAppearance
    } = this.props;

    const styles = {
      inputStyle: {
        color: color || Colors.black,
        paddingRight: pR || 10,
        paddingLeft: pL || 10,
        paddingTop: pT || 20,
        paddingBottom: pB || 20,
        fontSize: fontSize || 18,
        lineHeight: 23
      },
      containerStyle: {
        alignSelf: "stretch",
        marginTop: mT || mT === 0 ? `${mT}%` : "2.5%",
        marginBottom: mB || mB === 0 ? `${mB}%` : "2.5%",
        marginLeft: mL || mL === 0 ? `${mL}%` : "2.5%",
        marginRight: mR || mR === 0 ? `${mR}%` : "2.5%",
        alignItems: "flex-start",
        flex: this.props.flex || 0
      },
      inputContainerStyle: {
        width: "100%",
        borderTopColor: borderColor || Colors.white,
        borderBottomColor: borderColor || Colors.white,
        borderRightColor: borderColor || Colors.white,
        borderLeftColor: borderColor || Colors.white,
        backgroundColor: backgroundColor || Colors.black
      },
      labelStyle: {
        paddingLeft: 5
      }
    };
    const {
      inputStyle,
      containerStyle,
      inputContainerStyle,
      labelStyle
    } = styles;

    const autoCapitalize = !this.props.autoCapitalize
      ? "sentences"
      : this.props.autoCapitalize;

    return (
      <View style={containerStyle}>
        <HText
          mT={5}
          mB={2.5}
          text={label}
          size={labelSize}
          color={labelColor}
          style={labelStyle}
        />
        <View style={inputContainerStyle}>
          <TextInput
            placeholder={placeholder}
            placeholderTextColor={placeholderTextColor || Colors.white}
            selectionColor={selectionColor || Colors.white}
            autoCorrect={false}
            style={[inputStyle, textStyle]}
            value={value}
            onChangeText={onChangeText}
            autoCapitalize={autoCapitalize}
            secureTextEntry={secureTextEntry}
            keyboardType={keyboardType || "default"}
            multiline={multiline}
            defaultValue={defaultValue}
            returnKeyType={returnKeyType || "default"}
            onSubmitEditing={onSubmitEditing || null}
            selectTextOnFocus={selectTextOnFocus}
            focus={focus || false}
            autoFocus={autoFocus || false}
            refs={refInput}
            maxLength={maxLength || 1000}
            keyboardAppearance={keyboardAppearance || "dark"}
          />
        </View>
      </View>
    );
  }
}

TitledInput.propTypes = {
  onChangeText: PropTypes.func.isRequired,
  placeholder: PropTypes.string.isRequired,
  labelSize: PropTypes.number.isRequired,
  label: PropTypes.string.isRequired,
  labelColor: PropTypes.string.isRequired,
  maxLength: PropTypes.number
};

export { TitledInput };
