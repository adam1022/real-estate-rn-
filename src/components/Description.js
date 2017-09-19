import React from "react";
import { connect } from "react-redux";
import { View, TouchableOpacity, TextInput } from "react-native";
import { Divider } from "react-native-elements";
// import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { HText } from "./common";
import Styles, { standardProps } from "../assets/Styles";
import Colors from "../assets/Colors";
import { editHouseDescription } from "../actions";

const inputSections = ["Headline", "Address", "Description"];
const reducerSections = ["headline", "address", "subDescription"];

class UnconnectedDescription extends React.Component {
  componentWillUnmount() {
    console.log(`DESCRIPTION UNMOUNTING`);
  }

  showDivider = () =>
    <Divider
      style={[
        {
          backgroundColor: Colors.dividerGray,
          position: "relative",
          width: "100%",
          marginTop: "7.5%"
        }
      ]}
    />;

  renderInputs = () => {
    return inputSections.map((title, i) => {
      const reducerKey = reducerSections[i];
      const isLastKey = i === inputSections.length - 1;
      const nextInputKey = !isLastKey ? inputSections[i + 1] : null;
      const value = this.props.editingHouse.description[reducerKey];
      let returnKeyType;
      let onSubmitEditing;
      let autoFocus = title === "Headline" ? true : false;

      // not adding NEXT functionality because these are multiline fields
      // info will be saved when user goes back

      // if (isLastKey) {
      //   returnKeyType = "go";
      //   blurOnSubmit = true;
      // }
      // } else {
      //   onSubmitEditing = () => this[`${nextInputKey}Input`].focus();
      // }

      return (
        <View
          key={title}
          style={[Styles.backgroundBlack, { marginTop: "7.5%" }]}
        >
          <TouchableOpacity onPress={() => this[`${title}Input`].focus()}>
            <HText size={3} mT={0} mB={2.5} text={title} color={"white"} />
            <TextInput
              {...standardProps.darkInputProps}
              autoFocus={autoFocus}
              maxLength={150}
              // numberOfLines={2}
              ref={input => (this[`${title}Input`] = input)}
              placeholder={`enter ${title.toLowerCase()} here`}
              multiline={true}
              value={value}
              onChangeText={value =>
                this.props.editHouseDescription({ key: reducerKey, value })}
              fontSize={16}
              selectionColor={Colors.gray}
              selectTextOnFocus
              // returnKeyType={returnKeyType}
              // onSubmitEditing={onSubmitEditing}
            />
          </TouchableOpacity>
          {!isLastKey && this.showDivider()}
        </View>
      );
    });
  };
  render() {
    return (
      <View
        style={[
          Styles.backgroundBlack,
          Styles.flexView
          // { borderTopColor: Colors.gray, borderTopWidth: 1 }
        ]}
      >
        <View style={{ width: "90%" }}>
          {this.renderInputs()}
        </View>
      </View>
    );
  }
}

const mapStateToProps = ({ houses }) => ({ editingHouse: houses.editingHouse });

const Description = connect(mapStateToProps, { editHouseDescription })(
  UnconnectedDescription
);

export { Description };
