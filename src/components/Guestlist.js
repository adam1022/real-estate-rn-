import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import _ from "underscore";
import validator from "validator";
import {
  ScrollView,
  TouchableOpacity,
  Image,
  View,
  Text,
  TextInput
} from "react-native";
import {
  changeGuestlistSearchText,
  clearGuestlistSearchText
} from "../actions";
import {
  SlimCard,
  HeaderSearch,
  HeaderText,
  ToorText,
  HText,
  Loading,
  Button
} from "./common";
import { searchForUser } from "../serverHelpers/APIFuncs";
import Styles, { styleFuncs } from "../assets/Styles";
import Colors from "../assets/Colors";
import Icons from "../assets/Icons";
import Images from "../assets/Images";

class UnconnectedGuestlist extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      foundUsers: []
    };
  }

  performSearch = _.debounce(async () => {
    const { searchText } = this.props.houses.editingHouse.guestlist;
    const { id, token } = this.props.user.profile;
    console.log(`DOING SEARCH`);

    if (searchText) {
      const results = await searchForUser({ id, token, email: searchText });

      console.log(`RESULT`, results);

      // if there's a positive result, set the state with the results
      if (results.data.data.length >= 0) {
        const foundUsers = results.data.data.map(userObj => {
          const { full_name: name, photo_json } = userObj;
          const { medium: photoURI } = photo_json;

          return {
            name,
            photoURI
          };
        });

        this.setState({ foundUsers });
      }
    }
  }, 500);

  componentWillMount() {
    console.log(`GUESTLIST IS MOUNTING`);
  }

  componentWillUpdate() {
    // console.log(`GUESTLIST IS UPDATING`);
  }

  handlePushEdit = () => {
    console.log(`PUSHING EDIT`);
  };

  renderInputX = () => {
    const { clearGuestlistSearchText } = this.props;
    const { searchText } = this.props.houses.editingHouse.guestlist;

    return (
      <TouchableOpacity
        onPress={() => clearGuestlistSearchText()}
        style={Styles.guestlistInputX}
      >
        {!!searchText && <Image source={Icons.clearInputX} />}
      </TouchableOpacity>
    );
  };

  renderBody = () => {
    const { searchText } = this.props.houses.editingHouse.guestlist;
    if (!searchText) {
      return (
        <HText
          mT={5}
          mL={5}
          mR={5}
          size={3}
          color={"black"}
          text={
            "Search by name or email address to add Toor users to your Guestlist"
          }
        />
      );

      // renderCard if there are results
    } else if (this.state.foundUsers.length > 0) {
      const userCards = this.state.foundUsers.map((userObj, i) => {
        let { name, photoURI } = userObj;

        let photoObj = { uri: photoURI };

        if (photoURI.indexOf("missing.png") > -1) {
          photoObj = Images.defaultProfilePic;
        }

        return (
          <SlimCard
            key={`foundUser-${name}-${i}`}
            guestName={name}
            photoObj={photoObj}
          />
        );
      });

      return (
        <ScrollView style={{ width: "100%" }}>
          {userCards}
        </ScrollView>
      );
    } else if (validator.isEmail(searchText)) {
      // invite buttons
      console.log(`VALIDATION PASSED`);

      return (
        <View
          style={{ alignItems: "center", alignSelf: "center", width: "75%" }}
        >
          <HText
            color={"black"}
            size={3}
            mAll={10}
            text={`We can't find this user.`}
          />
          <Button
            color={"black"}
            backgroundColor={Colors.yellow}
            title={"SEND INVITE"}
            onPress={() =>
              console.log(`SENDING EMAIL TO THE EMAIL THAT CANNOT BE FOUND`)}
          />
        </View>
      );
    }
  };

  handleOnChangeText = text => {
    // const {searchText} =
    const { changeGuestlistSearchText } = this.props;
    const { searchText } = this.props.houses.editingHouse.guestlist;
    const { id, token } = this.props.user.profile;

    changeGuestlistSearchText(text);

    if (!text) {
      this.setState({ foundUsers: [] });
    }

    this.performSearch();
  };

  render() {
    const { changeGuestlistSearchText } = this.props;
    const { searchText, activeList } = this.props.houses.editingHouse.guestlist;
    const titleRight = activeList.length ? "Edit" : null;
    const rightAction = activeList.length ? this.handlePushEdit : null;
    const alignTextStyle = !!searchText
      ? { textAlign: "left" }
      : { textAlign: "center" };

    return (
      <View style={[Styles.flexView, Styles.backgroundWhite]}>
        <HeaderText
          titleCenter={"Guestlist"}
          titleRight={titleRight}
          rightAction={rightAction}
          navigation={this.props.navigation}
          backArrow
        />
        <View style={Styles.guestlistSearch}>
          <TextInput
            style={[Styles.guestlistSearchInput, alignTextStyle]}
            placeholder={"Search"}
            placeholderTextColor={Colors.darkGray}
            containerStyle={Styles.guestlistSearch}
            onChangeText={text => this.handleOnChangeText(text)}
            maxLength={38}
            autoCapitalize={"none"}
            value={searchText}
            autoCorrect={false}
          />
          {this.renderInputX()}
        </View>
        <View style={{ marginTop: 110, width: "95%", alignItems: "center" }}>
          {this.renderBody()}
        </View>
      </View>
    );
  }
}

const mapStateToProps = ({ user, houses }) => ({ user, houses });

const Guestlist = connect(mapStateToProps, {
  changeGuestlistSearchText,
  clearGuestlistSearchText
})(UnconnectedGuestlist);

export { Guestlist };
