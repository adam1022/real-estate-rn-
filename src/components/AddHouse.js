import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Divider } from "react-native-elements";
import { NavigationActions } from "react-navigation";
import ImagePicker from "react-native-image-crop-picker";
import {
  Alert,
  ListView,
  Image,
  Modal,
  View,
  ScrollView,
  Text,
  TouchableOpacity
} from "react-native";
import _ from "underscore";
import Spinner from "react-native-loading-spinner-overlay";
import { HeaderText, ToorText, Loading } from "./common";
import {
  addNewHouse,
  editHousePics,
  deleteHousePic,
  cancelEditHouse,
  deleteHouse,
  toggleHousePublic,
  editHouseItem,
  setLoading,
  unsetLoading
} from "../actions";
import { addHouseToServer, deleteListing } from "../serverHelpers/APIFuncs";
import { requestPhotoPermission } from "../Helpers";
import Styles, { styleFuncs } from "../assets/Styles";
import TextStyles from "../assets/TextStyles";
import Icons from "../assets/Icons";
import Images from "../assets/Images";
import Colors from "../assets/Colors";

const imageSections = [
  null,
  Icons.blackHome,
  Icons.blackSettings,
  Icons.blackChat,
  Icons.blackLock,
  Icons.blackKey,
  Icons.blackProfile
];
const sections = [
  "House Pics",
  "General Info",
  "Description",
  "Instructions",
  "Lockbox",
  "Make House Public",
  "Guestlist"
];
const navNamesSections = sections.map(name => name.replace(" ", ""));
const editSections = [...sections, "Delete House"];
const editNavNamesSections = editSections.map(name => name.replace(" ", ""));
const editImageSections = [...imageSections, Icons.blackTrash];

class UnconnectedAddHouse extends React.Component {
  state = {
    isEditing:
      this.props.navigation.state.params &&
      this.props.navigation.state.params.editing
  };

  componentWillMount() {
    if (!this.state.isEditing) {
      this.createDataSource(sections);
    } else {
      // USER IS EDITING
      this.createDataSource(editSections);
    }
  }

  componentWillUnmount() {
    console.log(`ADD HOUSE IS UNMOUNTING`);
  }

  createDataSource = array => {
    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    });

    this.dataSource = ds.cloneWithRows(array);
  };

  componentWillReceiveProps(nextProps) {
    const { housePics, public: isPublic } = this.props.houses.editingHouse;
    const nextHousePics = nextProps.houses.editingHouse.housePics;
    const isNextPublic = nextProps.houses.editingHouse.public;

    const picsAreTheSame = _.isEqual(housePics, nextHousePics);
    const publicStatusIsSame = isPublic === isNextPublic;

    if (!picsAreTheSame || !publicStatusIsSame) {
      ("RECREATING DATASOURCE");
      if (!this.state.isEditing) this.createDataSource(sections);
      else this.createDataSource(editSections);
    }
  }

  handleChangePic = ({ index }) => {
    Alert.alert(`Picture ${index + 1}`, "Choose An Option", [
      {
        text: "Cancel",
        onPress: () => console.log(`Cancelled`),
        style: "cancel"
      },
      { text: "Delete", onPress: () => this.props.deleteHousePic({ index }) },
      { text: "Change", onPress: () => this.handleChoosePic({ index }) }
    ]);
  };

  handleChoosePic = ({ index }) => {
    const options = {
      cropping: true,
      height: 540,
      width: 1080
    };

    ImagePicker.openPicker(options)
      .then(response => {
        console.log(`RESPONSE`, response);

        //   const { name, token, id } = this.props.user.profile;

        //   console.log("RESPONSE", response);
        const { path: uri } = response;
        this.props.editHousePics({ uri, index });

        //   const filePath = `file://${path}`;

        //   console.log("URI", path);

        //   this.props.changeProfileItem({ key: "pic", value: path });
        //   postUserPhoto({ fileURI: filePath, token, id })
        //     .then(res => {
        //       console.log(`PHOTO UPLOAD RESULT`, res);
        //     })
        //     .catch(err => console.log(`ERR PHOTO UPLOADING`, err));
        // })
      })
      .catch(err => console.log(`error`, err));
  };

  renderMainImage = ({ source, uri }) => {
    // console.log(`source`, source);
    // console.log(`URI`, uri);
    const changeMainPic = () =>
      requestPhotoPermission(() => this.handleChoosePic({ index: 0 }));
    const imgObj = uri ? { uri: source } : source;

    // console.log(`IMG OBJ`, imgObj);
    if (!uri) {
      return (
        <TouchableOpacity
          style={[
            Styles.centerAll,
            Styles.backgroundDarkGray,
            Styles.mainCardHeight
          ]}
          onPress={changeMainPic}
        >
          <Image source={imgObj} />
        </TouchableOpacity>
      );
    } else {
      return (
        <TouchableOpacity
          // style={{
          //   borderBottomWidth: 0.25,
          //   borderBottomColor: Colors.backgroundWhite
          // }}
          onPress={() => this.handleChangePic({ index: 0 })}
        >
          <Image
            style={Styles.mainCardHeight}
            resizeMode={"cover"}
            source={imgObj}
          />
        </TouchableOpacity>
      );
    }
  };

  renderSmallImages = () => {
    const { housePics } = this.props.houses.editingHouse;
    const smallImages = housePics.slice(1);

    // console.log(`SMALL IMAGES`, smallImages);

    const smallDefaultImage = (
      <TouchableOpacity
        style={[
          Styles.centerAll,
          Styles.backgroundDarkGray,
          Styles.smallImageCard
        ]}
        onPress={() =>
          requestPhotoPermission(() =>
            this.handleChoosePic({ index: smallImages.length + 1 })
          )}
      >
        <Image
          resizeMode={"cover"}
          style={Styles.yellowCamera}
          source={Icons.yellowCamera}
        />
      </TouchableOpacity>
    );

    const smallRowImages = smallImages.map((image, i) => {
      return (
        <TouchableOpacity
          onPress={() => this.handleChangePic({ index: i + 1 })}
          key={`${image}-${i}`}
        >
          <Image style={Styles.smallImageCard} source={{ uri: image }} />
        </TouchableOpacity>
      );
    });

    const grayRow = (
      <View style={[Styles.flex1, Styles.backgroundMediumGray]} />
    );

    return (
      <View style={{ flexDirection: "row" }}>
        {smallRowImages}
        {smallImages.length < 5 && smallDefaultImage}
        {smallImages.length < 5 && grayRow}
      </View>
    );
  };

  renderImagePicker = () => {};

  handleAddNewHouse = () => {
    const {
      addNewHouse,
      navigation,
      houses,
      editHouseItem,
      setLoading,
      unsetLoading
    } = this.props;
    const { id, token } = this.props.user.profile;
    const { editingHouse } = houses;

    setLoading();

    addHouseToServer({
      house: editingHouse,
      user: { id, token }
    })
      .then(success => {
        console.log(`SUCCESSFULLY UPLOADED HOUSE TO SERVER`, success);

        let id;

        if (this.state.isEditing) {
          id = editingHouse.houseId;
        } else {
          id = success[0].data.data.id;
          editHouseItem({ key: "houseId", value: id });
        }

        addNewHouse({ houseId: id });
        this.props.navigation.dispatch(NavigationActions.back());
      })
      .catch(err => {
        console.log(`ERROR ADDING HOUSE TO SERVER`, err);
        unsetLoading();
      });
  };

  handleEditExistingHouse = () => {};

  handleSaveHouse = () => {
    // if address has been satisfactorily filled out
    if (this.props.houses.editingHouse.description.address) {
      const { addNewHouse, navigation, houses, editHouseItem } = this.props;
      const { id, token } = this.props.user.profile;
      const { editingHouse } = houses;

      // addNewHouse({ houseId });
      // this.props.navigation.dispatch(NavigationActions.back());

      if (!this.state.isEditing) {
        return this.handleAddNewHouse();
      } else {
        // return this.handleEditExistingHouse();
        return this.handleAddNewHouse();
      }

      // navigation.navigateWithDebounce("MyHomes");
    } else {
      Alert.alert(`Please provide an address in "Description" section.`, "", [
        {
          text: "Cancel",
          style: "cancel"
        },
        {
          text: "Okay",
          onPress: () =>
            this.props.navigation.navigateWithDebounce("Description")
        }
      ]);
    }
  };

  renderHousePics = () => {
    const { housePics } = this.props.houses.editingHouse;

    if (!housePics.length) {
      return this.renderMainImage({ source: Icons.yellowCamera, uri: false });
    } else {
      return (
        <View>
          {this.renderMainImage({ source: housePics[0], uri: true })}
          {this.renderSmallImages()}
        </View>
      );
    }
  };

  handleDeleteHouse = () => {
    const { houseId } = this.props.houses.editingHouse;
    const { profile } = this.props.user;

    const userObj = {
      id: profile.id,
      token: profile.token
    };

    Alert.alert("Are You Sure?", "Please Confirm Deletion", [
      {
        text: "Cancel",
        onPress: () => console.log(`Not deleting`),
        style: "cancel"
      },
      {
        text: "Delete",
        onPress: () => {
          this.props.setLoading();
          deleteListing({ id: houseId, user: userObj })
            .then(success => {
              console.log(`SUCCESSFULLY DELETED HOUSE FROM SERVER`, success);

              this.props.deleteHouse({ houseId });
              this.props.navigation.dispatch(NavigationActions.back());
            })
            .catch(err => {
              console.log(`ERROR DELETING HOUSE ON SERVER`, err);
              this.props.unsetLoading();
            });
        }
      }
    ]);
  };

  showDivider = () =>
    <Divider
      style={[
        {
          backgroundColor: Colors.divider
        },
        styleFuncs.marginXP(0, 5, 0, 5)
      ]}
    />;

  handleMakeHousePublic = () => {
    const isPublic = this.props.houses.editingHouse.public;

    console.log(`IS IT PUBLIC`, isPublic);

    const alertTitleText = isPublic
      ? "This house is now private."
      : "This house is now public.";

    this.props.toggleHousePublic();

    Alert.alert(alertTitleText, "", [
      {
        text: "Done",
        onPress: () => console.log(`Returning to Add House menu`),
        style: "cancel"
      }
    ]);
  };

  renderRow = (data, sectionId, rowId, highlightRow) => {
    if (rowId == 0) {
      return this.renderHousePics();
    }

    let textToShow = data;

    const navName = this.state.isEditing
      ? editNavNamesSections[+rowId]
      : navNamesSections[+rowId];
    const icon = this.state.isEditing
      ? editImageSections[+rowId]
      : imageSections[+rowId];
    // const iconStyle = [Styles.iconSmall, { marginTop: 2.5 }];
    const iconStyle = [Styles.iconSmall];
    const activeSection = this.state.isEditing ? editSections : sections;
    let onPress;

    if (navName === "DeleteHouse") {
      onPress = this.handleDeleteHouse;
    } else if (navName === "MakeHouse Public") {
      onPress = this.handleMakeHousePublic;
      textToShow = this.props.houses.editingHouse.public
        ? "Make House Private"
        : "Make House Public";
    } else {
      onPress = () => this.props.navigation.navigateWithDebounce(navName);
    }

    return (
      <View key={data}>
        <TouchableOpacity
          style={{
            justifyContent: "center"
          }}
          onPress={onPress}
        >
          <View style={Styles.touchableRowSection}>
            <View
              style={[
                styleFuncs.marginXP(0, 5, 0, 5),
                Styles.icon,
                { justifyContent: "center" }
              ]}
            >
              <Image resizeMode={"cover"} source={icon} style={iconStyle} />
            </View>
            <ToorText
              style={Styles.flex1}
              mL={2.5}
              text={textToShow}
              color={"black"}
              size={1}
            />
            <View
              style={{
                // flexDirection: "row",
                // justifyContent: "flex-end",
                alignItems: "flex-end",
                flex: 1
              }}
            >
              <Image
                source={Icons.grayRightArrow}
                style={([styleFuncs.square(12.5)], { marginRight: "20%" })}
              />
            </View>
          </View>
        </TouchableOpacity>
        {+rowId !== activeSection.length - 1 && this.showDivider()}
      </View>
    );
  };

  handleCancelEditing = () => {
    this.props.cancelEditHouse();
    this.props.navigation.dispatch(NavigationActions.back());
  };

  render() {
    const { loading } = this.props.loading;

    return (
      <View
        style={[
          Styles.flex1,
          {
            backgroundColor: Colors.backgroundWhite,
            justifyContent: "flex-start"
          }
        ]}
      >
        <Loading />

        <HeaderText
          titleCenter={this.state.isEditing ? "Edit House" : "Add House"}
          titleLeft={"Cancel"}
          leftAction={this.handleCancelEditing}
          backArrow={false}
          navigation={this.props.navigation}
          titleRight={"Done"}
          rightAction={this.handleSaveHouse}
        />
        <ListView
          contentContainerStyle={{ justifyContent: "flex-start" }}
          style={{ marginTop: 65 }}
          dataSource={this.dataSource}
          renderRow={this.renderRow}
          removeClippedSubviews={false}
        />
      </View>
    );
  }
}

const mapStateToProps = state => {
  const { user, houses, nav, loading } = state;

  return { user, houses, nav, loading };
};

const AddHouse = connect(mapStateToProps, {
  addNewHouse,
  editHousePics,
  deleteHousePic,
  cancelEditHouse,
  editHouseItem,
  deleteHouse,
  toggleHousePublic,
  unsetLoading,
  setLoading
})(UnconnectedAddHouse);

export { AddHouse };

// <Modal animationType={"slide"} transparent={false}>
//         <HeaderBack text={"Add House"} navigation={props.navigation} />
//         <Text>Add House</Text>
//       </Modal>
