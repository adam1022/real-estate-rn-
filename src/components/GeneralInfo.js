import React from "react";
import { connect } from "react-redux";
import { Image, Text, View, TouchableOpacity, TextInput } from "react-native";
import { Divider } from "react-native-elements";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { HText } from "./common";
import Styles, { standardProps } from "../assets/Styles";
import Colors from "../assets/Colors";
import Icons from "../assets/Icons";
import TextStyles from "../assets/TextStyles";
import { editHouseGenInfo } from "../actions";
import { toFixedIfNecessary } from "../Helpers";

class UnconnectedGeneralInfo extends React.Component {
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

  handleAddSubtract = ({ symbol, key }) => {
    const { editHouseGenInfo } = this.props;
    const value = +this.props.genInfo[key];

    if (value > 0 && symbol === "–") {
      if (value < 1) {
        this.props.editHouseGenInfo({ key, value: 0 });
      } else {
        this.props.editHouseGenInfo({
          key,
          value: toFixedIfNecessary(value - 1)
        });
      }
    } else if (symbol === "+") {
      this.props.editHouseGenInfo({
        key,
        value: toFixedIfNecessary(value + 1)
      });
    }
  };

  renderVerticalSpacer = () => {
    return <Image source={Icons.verticalSpacer} />;
  };

  renderPlusMinus = ({ symbol, reducerLabel }) => {
    return (
      <TouchableOpacity
        onPress={() => this.handleAddSubtract({ symbol, key: reducerLabel })}
        style={[Styles.centerAll, { flex: 1, padding: 5 }]}
      >
        <Text style={[TextStyles.buttonYellowText, { fontSize: 25 }]}>
          {symbol}
        </Text>
      </TouchableOpacity>
    );
  };

  renderBedAndBath = () => {
    const labelsArr = ["Beds", "Baths"];
    const reducersArr = ["beds", "baths"];

    return labelsArr.map((label, i) => {
      const reducerLabel = reducersArr[i];
      const numberOfThings = this.props.genInfo[reducerLabel];
      const containerStyle =
        label === "Beds"
          ? {
              marginTop: "7.5%",
              marginBottom: "2.5%",
              width: "100%"
            }
          : {
              marginTop: "2.5%",
              marginBottom: "5%",
              width: "100%"
            };

      return (
        <View key={label} style={containerStyle}>
          <HText mB={2.5} mL={0.5} text={label} size={3} color={"white"} />
          <View
            style={[
              Styles.plusMinusInput,
              Styles.centerAll,
              { backgroundColor: Colors.darkGray }
            ]}
          >
            {this.renderPlusMinus({ symbol: "–", reducerLabel })}
            {this.renderVerticalSpacer()}
            <TextInput
              style={{
                backgroundColor: Colors.darkGray,
                padding: 10,
                flex: 6,
                color: Colors.white,
                textAlign: "center"
              }}
              placeholderTextColor={Colors.white}
              maxLength={4}
              keyboardType={"numeric"}
              placeholder={"0"}
              value={numberOfThings.toString()}
              onChangeText={value =>
                this.props.editHouseGenInfo({ key: reducerLabel, value })}
              fontSize={16}
              selectionColor={Colors.gray}
              selectTextOnFocus
              keyboardAppearance={"dark"}
            />
            {this.renderVerticalSpacer()}
            {this.renderPlusMinus({ symbol: "+", reducerLabel })}
          </View>
        </View>
      );
    });
  };

  renderPrice = () => {
    const { price } = this.props.genInfo;

    return (
      <TouchableOpacity
        style={{ alignSelf: "flex-start", width: "100%" }}
        onPress={() => this.priceInput.focus()}
      >
        <HText text={"Price"} color={"white"} size={3} mL={0.5} mB={2.5} />
        <TextInput
          style={{
            backgroundColor: Colors.darkGray,
            padding: 12.5,
            color: Colors.white
          }}
          keyboardAppearance={"dark"}
          placeholderTextColor={"white"}
          autoFocus={true}
          maxLength={500}
          keyboardType={"numeric"}
          ref={input => (this.priceInput = input)}
          placeholder={`Enter price here.`}
          value={price}
          onChangeText={value =>
            this.props.editHouseGenInfo({ key: "price", value })}
          fontSize={16}
          selectionColor={Colors.gray}
          selectTextOnFocus
        />
      </TouchableOpacity>
    );
  };

  renderSqft = () => {
    const { sqft } = this.props.genInfo;

    return (
      <TouchableOpacity
        style={{ alignSelf: "flex-start", width: "100%" }}
        onPress={() => this.sqftInput.focus()}
      >
        <HText
          text={"Square Feet"}
          color={"white"}
          size={3}
          mL={1.5}
          mB={2.5}
        />
        <TextInput
          style={{
            backgroundColor: Colors.darkGray,
            padding: 12.5,
            color: Colors.white
          }}
          keyboardAppearance={"dark"}
          placeholderTextColor={"white"}
          maxLength={6}
          keyboardType={"numeric"}
          ref={input => (this.sqftInput = input)}
          placeholder={`Enter square footage here.`}
          value={sqft}
          onChangeText={value =>
            this.props.editHouseGenInfo({ key: "sqft", value })}
          fontSize={16}
          selectionColor={Colors.gray}
          selectTextOnFocus
        />
      </TouchableOpacity>
    );
  };

  render() {
    return (
      <KeyboardAwareScrollView
        // scrollEnabled={false}
        contentContainerStyle={[
          Styles.flex1,
          Styles.backgroundBlack,
          {
            alignItems: "center",
            justifyContent: "flex-start"
          }
        ]}
        style={Styles.backgroundBlack}
      >
        <View style={{ width: "90%", marginTop: "5%", marginBottom: "5%" }}>
          {this.renderPrice()}
          {this.showDivider()}
          {this.renderBedAndBath()}
          {this.renderSqft()}
        </View>
      </KeyboardAwareScrollView>
    );
  }
}

const mapStateToProps = ({ houses }) => ({
  genInfo: houses.editingHouse.genInfo
});

const GeneralInfo = connect(mapStateToProps, { editHouseGenInfo })(
  UnconnectedGeneralInfo
);

export { GeneralInfo };
