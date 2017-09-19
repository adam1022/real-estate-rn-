// import React from "react";
import { StyleSheet, Dimensions } from "react-native";
import Colors from "./Colors";
import TextStyles from "./TextStyles";

export const WIDTH = Dimensions.get("window").width;
export const HEIGHT = Dimensions.get("window").height;
export const SMALL_DEVICE = HEIGHT < 620;

export const styleFuncs = {
  marginXP: (top = null, right = null, bottom = null, left = null) => {
    return {
      marginTop: `${top}%`,
      marginRight: `${right}%`,
      marginBottom: `${bottom}%`,
      marginLeft: `${left}%`
    };
  },
  marginX: (top = null, right = null, bottom = null, left = null) => {
    return {
      marginTop: top,
      marginRight: right,
      marginBottom: bottom,
      marginLeft: left
    };
  },
  absoluteBP: bottom => {
    return {
      position: "absolute",
      bottom: `${bottom}%`
    };
  },
  absoluteTP: top => {
    return {
      position: "absolute",
      top: `${top}%`
    };
  },
  absoluteRP: right => {
    return {
      position: "absolute",
      right: `${right}%`
    };
  },
  absoluteLP: left => {
    return {
      position: "absolute",
      left: `${left}%`
    };
  },
  absoluteB: bottom => {
    return {
      position: "absolute",
      bottom: `${bottom}%`
    };
  },
  absoluteT: top => {
    return {
      position: "absolute",
      top: top
    };
  },
  absoluteR: right => {
    return {
      position: "absolute",
      right: right
    };
  },
  absoluteL: left => {
    return {
      position: "absolute",
      left: left
    };
  },
  borderColor: color => ({
    borderTopColor: color,
    borderRightColor: color,
    borderLeftColor: color,
    borderBottomColor: color
  }),
  square: size => ({
    height: size,
    width: size
  })
};

const Styles = StyleSheet.create({
  absoluteBottom325P: {
    bottom: "32.5%",
    position: "absolute"
  },
  backgroundBlack: {
    backgroundColor: Colors.black
  },
  backgroundWhite: {
    backgroundColor: Colors.backgroundWhite
  },
  backgroundDarkGray: {
    backgroundColor: Colors.darkGray
  },
  backgroundMediumGray: {
    backgroundColor: Colors.mediumGray
  },
  backgroundImage: {
    flex: 1,
    width: null,
    height: null
  },
  buttonWhite: {
    backgroundColor: Colors.white
  },
  buttonYellow: {
    backgroundColor: Colors.yellow
  },
  buttonBlack: {
    backgroundColor: Colors.black
  },
  buttonLoadingYellow: {
    backgroundColor: Colors.loadingYellow
  },
  centerAll: {
    alignItems: "center",
    justifyContent: "center"
  },
  divider: {
    height: 1,
    backgroundColor: Colors.white,
    borderBottomWidth: 5,
    borderBottomColor: Colors.white,
    padding: 100
  },
  icon: styleFuncs.square(22),
  iconBig: styleFuncs.square(30),
  // iconSmall: styleFuncs.square(18),
  iconSmall: {
    // height: 18
  },
  yellowCamera: {
    height: 22,
    width: 30
  },
  backArrowIcon: {
    width: 14,
    height: 23
  },
  imageFullScreenContainer: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    width: null,
    height: null,
    resizeMode: "cover",
    backgroundColor: Colors.transparent,
    opacity: 0.9
  },
  inputStyle: {
    color: Colors.white,
    paddingRight: 10,
    paddingLeft: 10,
    paddingTop: 15,
    paddingBottom: 15,
    fontSize: 12,
    lineHeight: 23,
    borderWidth: 1,
    marginTop: "2.5%",
    marginBottom: "2.5%",
    marginLeft: "2.5%",
    marginRight: "2.5%",
    borderTopColor: Colors.white,
    borderBottomColor: Colors.white,
    borderRightColor: Colors.white,
    borderLeftColor: Colors.white,
    flexDirection: "row",
    alignItems: "center",
    width: "95%"
  },
  transparentDarkInputStyle: {
    color: Colors.white,
    paddingTop: 5,
    paddingBottom: 5,
    fontSize: 18,
    lineHeight: 30,
    // marginTop: "2.5%",
    // marginBottom: "2.5%",
    // marginLeft: "2.5%",
    // marginRight: "2.5%",
    width: "95%"
  },
  plusMinusInput: {
    flexDirection: "row"
  },
  lockboxCardStyle: {
    marginTop: 10,
    marginBottom: 10,
    marginLeft: 10,
    marginRight: 10,
    height: 100,
    width: null,
    shadowOffset: {
      width: 0,
      height: 10
    },
    elevation: 1,
    shadowColor: Colors.black,
    borderBottomWidth: 0,
    shadowOpacity: 0.1,
    shadowRadius: 6,
    backgroundColor: Colors.white
  },
  guestlistCardStyle: {
    marginTop: 10,
    marginBottom: 10,
    marginLeft: 10,
    marginRight: 10,
    shadowOffset: {
      width: 0,
      height: 10
    },
    elevation: 1,
    shadowColor: Colors.black,
    borderBottomWidth: 0,
    shadowOpacity: 0.1,
    shadowRadius: 6,
    backgroundColor: Colors.white
  },
  borderRed: {
    borderTopColor: Colors.textErrorRed,
    borderBottomColor: Colors.textErrorRed,
    borderRightColor: Colors.textErrorRed,
    borderLeftColor: Colors.textErrorRed
  },
  scrollFlexView: {
    flex: 1,
    width: null,
    height: null
  },
  flexView: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    width: null,
    height: null
  },
  flex1: {
    flex: 1
  },
  guestlistInputX: {
    position: "absolute",
    right: 15,
    bottom: 15
  },
  guestlistSearch: {
    top: 65,
    zIndex: 10,
    position: "absolute",
    width: WIDTH,
    backgroundColor: Colors.darkGray,
    paddingBottom: 10,
    paddingTop: 5
  },
  guestlistSearchInput: {
    width: "95%",
    alignSelf: "center",
    backgroundColor: Colors.backgroundWhite,
    color: Colors.darkGray,
    padding: 5,
    fontSize: 14
  },
  margin10: {
    marginTop: 10,
    marginBottom: 10,
    marginLeft: 10,
    marginRight: 10
  },
  marginBottom15P: { marginBottom: "15%" },
  marginTop25P: { marginTop: "25%" },
  marginTop15P: { marginTop: "15%" },
  profilePicStyle: {
    borderRadius: 50,
    height: 100,
    width: 100,
    marginLeft: "2.5%",
    marginRight: "5%",
    resizeMode: "cover"
  },
  editProfilePicStyle: {
    borderRadius: 50,
    height: 100,
    width: 100,
    marginLeft: "10%",
    resizeMode: "cover"
  },
  slimSection: {
    alignItems: "flex-start",
    justifyContent: "center",
    width: WIDTH,
    paddingTop: "2.5%"
  },
  slimCardSection: {
    flexDirection: "row",
    alignItems: "center",
    paddingTop: 25,
    paddingBottom: 25
  },
  flexRow: {
    flexDirection: "row"
  },
  headerToggle: {
    height: "10%",
    // marginTop: 70,
    flexDirection: "row",
    backgroundColor: Colors.darkGray,
    borderTopColor: Colors.mediumGray,
    borderTopWidth: 1
  },
  headerToggleItem: {
    flex: 1,
    backgroundColor: Colors.darkGray
  },
  smallButton: {
    height: 50,
    width: 150,
    position: "absolute",
    marginLeft: "auto",
    marginRight: "auto",
    padding: 5,
    left: WIDTH - WIDTH / 2 - 75,
    right: 0,
    bottom: "10%",
    elevation: 1,
    shadowColor: Colors.black,
    borderBottomWidth: 0,
    shadowOpacity: 0.1,
    shadowRadius: 6,
    shadowOffset: {
      width: 0,
      height: 10
    }
  },
  cardShadow: {
    shadowOffset: {
      width: 0,
      height: 5
    },
    elevation: 1,
    shadowColor: Colors.black,
    borderBottomWidth: 0,
    shadowOpacity: 0.2,
    shadowRadius: 10,
    marginTop: 7.5
  },
  homeCardImage: {
    height: 175
  },
  mainCardHeight: {
    height: 175
  },
  smallImageCard: {
    height: 70,
    width: WIDTH / 5
    // marginRight: 0.25,
    // marginLeft: 0.25,
    // marginTop: 0.5
  },
  smallCircle: {
    height: 15,
    width: 15,
    marginRight: 15,
    borderRadius: 50,
    backgroundColor: Colors.white
  },
  touchableRowSection: {
    flexDirection: "row",
    alignItems: "center",
    width: WIDTH,
    paddingTop: 25,
    paddingBottom: 25
  },
  stretchView: {
    alignSelf: "stretch",
    marginLeft: 5,
    marginRight: 5,
    marginTop: 5,
    marginBottom: 5
  },
  toorLogo: {
    opacity: 1,
    position: "absolute",
    top: "15%"
  },
  verticalSpacing: {
    marginTop: 2.5,
    marginBottom: 2.5
  },
  loginErrMsg: {
    position: "absolute",
    backgroundColor: Colors.darkGray,
    padding: 5,
    left: 5,
    right: 5,
    top: "10%"
  }
});

export const standardProps = {
  inputProps: {
    style: [Styles.inputStyle, TextStyles.inputTextWhite],
    autoCorrect: false,
    keyboardAppearance: "dark",
    placeholderTextColor: Colors.white
  },
  darkInputProps: {
    style: [Styles.transparentDarkInputStyle, TextStyles.inputTextWhite],
    autoCorrect: false,
    keyboardAppearance: "dark",
    placeholderTextColor: Colors.white
  }
};

export default Styles;
