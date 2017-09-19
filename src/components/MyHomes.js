import React from "react";
import PropTypes from "prop-types";
import {
  ListView,
  TouchableOpacity,
  View,
  ScrollView,
  Image
} from "react-native";
import { connect } from "react-redux";
import _ from "underscore";
import uuidGenerator from "react-native-uuid";
import { editSelectedHouse, cancelEditHouse } from "../actions";
import { getCurrentRouteName } from "../Helpers";
import { CardSection, ToorText, Button, HText, HeaderText } from "./common";
import Images from "../assets/Images";
import Colors from "../assets/Colors";
import Styles from "../assets/Styles";

console.log(`PIPE IN FROM PROPS ON MY HOMES`);

const HeaderToggle = props => {
  const { toggles, activeToggle, onPress } = props;

  const toggleViews = toggles.map((toggle, i) => {
    let borderStyle;

    if (toggle === activeToggle) {
      borderStyle = {
        borderBottomColor: Colors.yellow,
        borderBottomWidth: 4
      };
    } else {
      borderStyle = {
        borderBottomColor: Colors.darkGray,
        borderBottomWidth: 4
      };
    }
    return (
      <TouchableOpacity
        key={`toggle-${i}`}
        style={[Styles.headerToggleItem, Styles.centerAll, borderStyle]}
        onPress={() => onPress(toggle)}
      >
        <HText
          size={3}
          color={"white"}
          style={Styles.backgroundDarkGray}
          text={toggle}
        />
      </TouchableOpacity>
    );
  });

  return (
    <View style={Styles.headerToggle}>
      {toggleViews}
    </View>
  );
};

class UnconnectedMyHomes extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      filter: "Public"
    };
  }

  componentWillMount() {
    const { userHouses } = this.props.houses;
    const userHouseKeys = Object.keys(userHouses);
    const dataArrayOfHouses = userHouseKeys.map((houseKey, i) => {
      return userHouses[houseKey];
    });

    this.createDataSource(dataArrayOfHouses);
  }

  componentWillUnmount() {
    console.log("MY HOMES IS UNMOUNTING");
  }

  componentWillReceiveProps(nextProps) {
    const { userHouses } = this.props.houses;
    const { myHomesShouldUpdate } = this.props.houses;

    if (myHomesShouldUpdate) {
      console.log(
        `MY HOMES IS UPDATING LIKE IT DAMN WELL SHOULD MY HOMES IS UPDATING LIKE IT DAMN WELL SHOULD MY HOMES IS UPDATING LIKE IT DAMN WELL SHOULD MY HOMES IS UPDATING LIKE IT DAMN WELL SHOULD MY HOMES IS UPDATING LIKE IT DAMN WELL SHOULD MY HOMES IS UPDATING LIKE IT DAMN WELL SHOULD MY HOMES IS UPDATING LIKE IT DAMN WELL SHOULD MY HOMES IS UPDATING LIKE IT DAMN WELL SHOULD`
      );

      const userHouseKeys = Object.keys(userHouses);
      const nextUserHouses = nextProps.houses.userHouses;
      const dataArrayOfHouses = userHouseKeys.map((houseKey, i) => {
        return userHouses[houseKey];
      });
      this.createDataSource(dataArrayOfHouses);
    }
  }

  createDataSource = sections => {
    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => {
        console.log(`r1`, r1);
        console.log(`r2`, r2);

        return r1 !== r2;
      }
      // rowHasChanged: (r1, r2) => _.isEqual(r1, r2)
    });

    this.dataSource = ds.cloneWithRows(sections);
  };

  changeFilter = chosenFilter => {
    if (this.state.filter !== chosenFilter) {
      this.setState({ filter: chosenFilter });

      const { userHouses } = this.props.houses;
      const userHouseKeys = Object.keys(userHouses);
      const dataArrayOfHouses = userHouseKeys.map((houseKey, i) => {
        return userHouses[houseKey];
      });
      this.createDataSource(dataArrayOfHouses);
    }
  };

  handleEditSelectedHouse = house => {
    const { editSelectedHouse, navigation } = this.props;

    editSelectedHouse({ house });
    navigation.navigateWithDebounce("AddHouse", { editing: true });
  };

  handleAddNewHouse = () => {
    // const newHouseId = uuidGenerator.v1();
    const newHouseId = new Date().getTime();

    this.props.cancelEditHouse();
    this.props.navigation.navigateWithDebounce("AddHouse");
  };

  renderRow = (data, sectionId, rowId, highlightRow) => {
    // console.log(`DATA`, data);

    const { address } = data.description;
    const { genInfo, public: houseIsPublic } = data;
    const mainImage =
      data.housePics.length > 0
        ? { uri: data.housePics[0] }
        : Images.homePlaceholder;

    const { price, beds, baths, sqft } = genInfo;
    const details = `${beds && beds + "bd "}${baths && baths + "ba "}${sqft &&
      sqft + " sqft"}`;

    const { filter } = this.state;

    if (filter === "Public" && houseIsPublic) {
      return (
        <CardSection style={[Styles.cardShadow, { width: "95%" }]}>
          <TouchableOpacity onPress={() => this.handleEditSelectedHouse(data)}>
            <Image
              style={Styles.homeCardImage}
              // resizeMode={"cover"}
              source={mainImage}
            />
            <View style={{ margin: 10 }}>
              <ToorText size={1} color={"black"} text={address} />
              <ToorText size={1} color={"black"} text={details} />
              <ToorText
                size={1}
                color={"black"}
                text={`${price && "$" + price}`}
              />
            </View>
          </TouchableOpacity>
        </CardSection>
      );
    } else if (filter !== "Public" && !houseIsPublic) {
      return (
        <CardSection style={[Styles.cardShadow, { width: "95%" }]}>
          <TouchableOpacity onPress={() => this.handleEditSelectedHouse(data)}>
            <Image
              style={Styles.homeCardImage}
              // resizeMode={"cover"}
              source={mainImage}
            />
            <View style={{ margin: 10 }}>
              <ToorText size={1} color={"black"} text={address} />
              <ToorText size={1} color={"black"} text={details} />
              <ToorText
                size={1}
                color={"black"}
                text={`${price && "$" + price}`}
              />
            </View>
          </TouchableOpacity>
        </CardSection>
      );
    } else {
      return <View />;
    }
  };

  render() {
    // console.log(`CURRENT ROUTE`, getCurrentRouteName(this.props.nav));

    // if (getCurrentRouteName(this.props.nav) !== "MyHomes") {
    //   console.log(`RETURNING NULL`);
    //   return null;
    // }
    return (
      <View style={[Styles.flex1, Styles.backgroundWhite]}>
        {/*  
        <HeaderText
          titleCenter={"Your Homes"}
          backArrow={true}
          titleLeft={"Profile"}
          navigation={this.props.navigation}
        /> */}
        <HeaderToggle
          toggles={["Public", "Private"]}
          activeToggle={this.state.filter}
          onPress={this.changeFilter}
        />
        <ListView
          style={Styles.flex1}
          contentContainerStyle={{
            justifyContent: "flex-start",
            alignItems: "center"
          }}
          dataSource={this.dataSource}
          renderRow={this.renderRow}
          removeClippedSubviews={false}
          horizontal={false}
        />
        <Button
          buttonStyle={Styles.smallButton}
          title={"ADD"}
          backgroundColor={Colors.black}
          color={Colors.yellow}
          onPress={this.handleAddNewHouse}
        />
      </View>
    );
  }
}

const mapStateToProps = ({ user, houses, lockboxes, nav }) => ({
  user,
  houses,
  lockboxes,
  nav
});

const MyHomes = connect(mapStateToProps, {
  editSelectedHouse,
  cancelEditHouse
})(UnconnectedMyHomes);

export { MyHomes };
