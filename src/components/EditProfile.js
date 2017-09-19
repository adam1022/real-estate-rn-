import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {
  View,
  StyleSheet,
  Image,
  ListView,
  TouchableOpacity,
  TextInput,
  Alert
} from "react-native";
import { Divider } from "react-native-elements";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
// import CroplessImagePicker from "react-native-image-picker";
import ImagePicker from "react-native-image-crop-picker";
import { HText, Input, Button, Loading } from "./common";
import { setRemoteProfile, postUserPhoto } from "../serverHelpers/APIFuncs";
import Styles, { WIDTH, standardProps } from "../assets/Styles";
import Images from "../assets/Images";
import Colors from "../assets/Colors";
import Icons from "../assets/Icons";
import {
  setProfile,
  changeProfileItem,
  setLoading,
  unsetLoading
} from "../actions";
import {
  getCityAndCountry,
  requestPhotoPermission,
  alertToToorSettings
} from "../Helpers";

console.log(
  `Careful with the Negative bottom margin on the Section Headers here...`
);

const styles = StyleSheet.create({
  slimButton: {
    paddingTop: 0,
    paddingBottom: 0
  }
});

class UnconnectedEditProfile extends React.Component {
  componentWillMount() {
    console.log("EDIT PROFILE MOUNTING");
    this.createDSfromState({
      stateName: "profile",
      state: this.props.user.profile
    });
  }

  componentWillUnmount() {
    console.log(`EDITPROFILE UNMOUNTING`);
    this.handleSaveProfile();
  }

  componentWillReceiveProps(nextProps) {
    const { pic } = this.props.user.profile;
    const nextPic = nextProps.user.profile.pic;

    const picsAreTheSame = pic === nextPic;

    if (!picsAreTheSame) {
      // this.renderNameAndPic();
      this.createDSfromState({
        stateName: "profile",
        state: this.props.user.profile
      });
    }
  }

  createDSfromState = ({ state, stateName }) => {
    const { name, about, city, country, phone, email, pic } = state;

    const displayObj = {
      name,
      about,
      city,
      country,
      phone,
      email
    };

    // if (stateName === "profile") {
    //   const localObj = {
    //     name,
    //     about,
    //     location,
    //     phone,
    //     email,
    //     pic
    //   };

    //   this.props.setProfile(localObj);
    // }

    const keys = Object.keys(displayObj);

    const array = keys.reduce((a, b, i) => {
      return a.concat(displayObj[b]);
    }, []);

    this.createDataSource(array);
  };

  createDataSource = sections => {
    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    });

    this.dataSource = ds.cloneWithRows(sections);
  };

  handleChangePic = () => {
    const options = {
      cropping: true,
      height: 300,
      width: 300
    };

    ImagePicker.openPicker(options)
      .then(response => {
        const { name, token, id } = this.props.user.profile;

        console.log("RESPONSE", response);
        const { path } = response;

        const filePath = `file://${path}`;

        console.log("URI", path);

        this.props.changeProfileItem({ key: "pic", value: path });
        postUserPhoto({ fileURI: filePath, token, id })
          .then(res => {
            console.log(`PHOTO UPLOAD RESULT`, res);
          })
          .catch(err => console.log(`ERR PHOTO UPLOADING`, err));
      })
      .catch(err => console.log(`error`, err));
  };

  // handleChangePic = () => {
  //   const options = {
  //     title: "Choose Profile Photo",
  //     storageOptions: {
  //       skipBackup: true,
  //       path: "images"
  //     }
  //   };
  //   CroplessImagePicker.showImagePicker(options, response => {
  //     const { name, token, id } = this.props.user.profile;

  //     if (response.didCancel) {
  //       console.log("User cancelled image picker");
  //     } else if (response.error) {
  //       console.log("ImagePicker Error: ", response.error);
  //     } else if (response.customButton) {
  //       console.log("User tapped custom button: ", response.customButton);
  //     } else {
  //       console.log("RESPONSE", response);
  //       const { uri } = response;

  //       console.log("URI", uri);

  //       this.props.changeProfileItem({ key: "pic", value: uri });
  //       postUserPhoto({ fileURI: uri, token, id })
  //         .then(res => {
  //           console.log(`PHOTO UPLOAD RESULT`, res);
  //         })
  //         .catch(err => console.log(`ERR PHOTO UPLOADING`, err));
  //     }
  //   });
  // };

  renderNameAndPic = () => {
    console.log("RENDERING NAME AND PIC");
    const { pic, name } = this.props.user.profile || "";

    let picObj;

    if (pic.indexOf("/images/") === 0) {
      picObj = Images.defaultProfilePic;
    } else {
      picObj = {
        uri: pic
      };
    }

    return (
      <View
        style={{
          flex: 1,
          flexDirection: "row",
          alignItems: "center",
          width: "90%",
          flexWrap: "wrap",
          marginTop: 25,
          backgroundColor: Colors.backgroundWhite,
          marginBottom: 25
        }}
      >
        <View>
          <TouchableOpacity
            onPress={() => requestPhotoPermission(this.handleChangePic)}
          >
            <Image source={picObj} style={Styles.editProfilePicStyle} />
            <Image
              source={Icons.editPhotoIcon}
              style={[
                { position: "absolute", bottom: 0, right: 25 },
                Styles.iconBig
              ]}
            />
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          onPress={() => this.nameInput.focus()}
          style={{ flex: 1 }}
        >
          <HText size={3} mB={2.5} text={"Name"} color={"black"} />
          <TextInput
            {...standardProps.inputProps}
            ref={input => (this.nameInput = input)}
            placeholder={`enter ${name.toLowerCase()} here`}
            defaultValue={name}
            onChangeText={value =>
              this.props.changeProfileItem({ key: "name", value })}
            placeholderTextColor={Colors.black}
            style={{ color: Colors.black }}
            fontSize={16}
            selectionColor={Colors.gray}
            selectTextOnFocus
            returnKeyType={"next"}
            onSubmitEditing={() => this.aboutInput.focus()}
          />
        </TouchableOpacity>
      </View>
    );
  };

  handleRefs = name => console.log(this.refs);

  showDivider = () =>
    <Divider
      style={[
        {
          backgroundColor: Colors.divider,
          position: "relative",
          width: "100%"
        }
      ]}
    />;

  handleTextChange = ({ key, value }) => {
    this.setState({ [key]: value });
  };

  renderRow = (data, sectionId, rowId, highlightRow) => {
    console.log(`row ID`, rowId);

    if (rowId == 0) {
      console.log("ROW ID IS 0");
      return this.renderNameAndPic();
    }

    const { about, city, country, phone, email } = this.props.user.profile;
    // const { city, country } = getCityAndCountry(location);
    const sectionNames = [
      "Name",
      "Description",
      "City",
      "Country",
      "Number",
      "Email"
    ];
    const propSections = ["name", "about", "city", "country", "phone", "email"];
    const key = propSections[+rowId];
    const nextKey = key !== "email" ? propSections[+rowId + 1] : "";

    const sectionName = sectionNames[rowId] || "";

    let keyboardType = "default";
    let autoCapitalize = "sentences";
    let multiline = false;
    let maxLength = 25;
    let returnKeyType = "next";
    let onSubmitEditing =
      key !== "email" ? () => this[`${nextKey}Input`].focus() : null;

    if (sectionName === "Email") {
      keyboardType = "email-address";
      autoCapitalize = "none";
      returnKeyType = "default";
    } else if (sectionName === "Number") {
      keyboardType = "phone-pad";
      maxLength = 11;
    } else if (sectionName === "Description") {
      returnKeyType = "default";
      onSubmitEditing = null;
      maxLength = 150;
      multiline = true;
    }

    return (
      <View style={{ width: "90%" }} key={sectionName}>
        {rowId == 1 && this.showDivider()}
        <View
          style={[
            {
              justifyContent: "flex-start",
              alignItems: "center",
              marginTop: 10,
              marginBottom: 25
            }
          ]}
        >
          <TouchableOpacity
            onPress={() => this[`${key}Input`].focus()}
            style={Styles.slimSection}
          >
            <HText
              mL={6.5}
              mB={1.5}
              text={sectionName}
              color={"black"}
              size={2}
            />
            <TextInput
              autoCorrect={false}
              keyboardAppearance={"dark"}
              ref={input => (this[`${key}Input`] = input)}
              placeholder={`enter ${sectionName.toLowerCase()} here`}
              defaultValue={data}
              onChangeText={value =>
                this.props.changeProfileItem({ key, value })}
              keyboardType={keyboardType}
              placeholderTextColor={Colors.black}
              maxLength={maxLength}
              style={{
                color: Colors.black,
                marginLeft: "6.5%",
                fontSize: 15,
                width: "85%"
              }}
              selectionColor={Colors.gray}
              selectTextOnFocus
              onSubmitEditing={onSubmitEditing}
              returnKeyType={returnKeyType}
              autoCapitalize={autoCapitalize}
              multiline={multiline}
            />
          </TouchableOpacity>
        </View>
        {rowId < sectionNames.length - 1 && this.showDivider()}
        {/*  {rowId >= sectionNames.length - 1 && this.renderButton()} */}
      </View>
    );
  };

  renderButton = () => {
    return (
      <Button
        flex={1}
        buttonStyle={styles.slimButton}
        title={"Save"}
        onPress={this.handleSaveProfile}
        color={Colors.yellow}
        fontSize={18}
        mB={5}
        mL={0}
        mR={0}
        backgroundColor={Colors.black}
      />
    );
  };

  handleSaveProfile = () => {
    console.log(`HANDLING SAVE`);
    let { name, about, city, country, phone, email, pic } =
      this.props.user.profile || "";
    const { id, token } = this.props.user.profile;

    // city = city || "";
    // country = country || "";

    const location = `${city.trim()}, ${country.trim()}`;

    // const localObj = {
    //   name,
    //   about,
    //   location,
    //   phone,
    //   email,
    //   pic
    // };

    const serverObj = {
      full_name: name,
      about,
      location,
      phone_number: phone,
      email,
      id,
      token
    };

    setRemoteProfile(serverObj)
      .then(res => {
        console.log(`PROFILE SAVED TO SERVER`, res);
      })
      .catch(err => console.log("ERROR SAVING PROFILE TO SERVER:", err));
  };

  render() {
    if (this.props.navigation.state.routeName !== "EditProfile") return null;

    return (
      <KeyboardAwareScrollView
        // scrollEnabled={false}
        contentContainerStyle={[Styles.flex1, { alignItems: "flex-start" }]}
        style={Styles.backgroundWhite}
      >
        <ListView
          horizontal={false}
          style={{
            flexWrap: "wrap"
            // backgroundColor: "red"
          }}
          contentContainerStyle={{
            justifyContent: "flex-start",
            alignItems: "center"
          }}
          dataSource={this.dataSource}
          renderRow={this.renderRow}
          removeClippedSubviews={false}
        />
      </KeyboardAwareScrollView>
    );
  }
}

const mapStateToProps = ({ user }) => {
  return {
    user
  };
};

const EditProfile = connect(mapStateToProps, {
  setProfile,
  changeProfileItem,
  setLoading,
  unsetLoading
})(UnconnectedEditProfile);

export { EditProfile };
