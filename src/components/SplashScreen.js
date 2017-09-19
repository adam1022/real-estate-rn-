import React from "react";
import PropTypes from "prop-types";
import { View, StyleSheet } from "react-native";
import { connect } from "react-redux";
import Video from "react-native-video";
import Colors from "../assets/Colors";
import Styles from "../assets/Styles";

// const style = StyleSheet.create({
//   blackBackground: {
//     backgroundColor: Colors.black,
//     flex: 1,
//     l
//   }
// })

class UnconnectedSplashScreen extends React.Component {
  componentWillMount() {
    // console.log(`splash mounting`);
    // console.log(`PROPS`, this.props);
    // const { navigation } = this.props;
    // const { loggedIn } = this.props.state.user;
    // const { nav } = this.props.state;
    // if (loggedIn) {
    //   this.findRoute(nav);
    //   // console.log("PROPS", this.props);
    //   // const navLen = nav.routes.length - 1;
    //   // const lastScreen = nav.routes[navLen].routeName;
    //   // this.props.navigation.navigateWithDebounce(lastScreen);
    // }
  }

  findRoute = navObj => {
    const { navigation } = this.props;
    if (navObj.index === undefined) {
      if (navObj.routeName === "SplashScreen") {
        navigation.navigateWithDebounce("Login");
        return;
      }
      console.log("FOUND IT");
      console.log(`navObj`, navObj);

      navigation.navigateWithDebounce(navObj.routeName);
      return;
    }

    const { index, routes } = navObj;
    this.findRoute(routes[index]);
  };

  componentDidMount() {
    console.log(`splash MOUNTED`);
    console.log(`PROPS`, this.props);
  }

  handleRoute = () => {
    const { navigation } = this.props;
    const { loggedIn } = this.props.state.user;
    const { nav } = this.props.state;

    // if (loggedIn) {
    //   // return;
    //   this.findRoute(nav);
    // } else {
    //   console.log(`NAVIGATINGNAVIGATINGNAVIGATINGNAVIGATINGNAVIGATINGNAVIGATINGNAVIGATINGNAVIGATINGNAVIGATINGNAVIGATINGNAVIGATINGNAVIGATING`)

    // navigation.navigateWithDebounce("Login");
    // }
    // const route = this.props;

    // const { navigation } = this.props;
    // console.log(`PROPS`, this.props);

    // const { nav } = this.props.state;
    // const { loggedIn } = this.props.state.user;

    // if (loggedIn) {
    //   const navLen = nav.routes.length - 1;
    //   const lastScreen = nav.routes[navLen].routeName;
    //   if (lastScreen !== "SplashScreen") navigation.navigateWithDebounce(lastScreen);
    //   else navigation.navigateWithDebounce("Home");
    // } else {
    //   navigation.navigateWithDebounce("Login");
    // }

    // console.log(`handling route PROPS`, route);
  };

  render() {
    return (
      <View style={[Styles.centerAll, { backgroundColor: "black", flex: 1 }]}>
        <Video
          source={require("../assets/vid/toorSplash.mp4")}
          onEnd={this.handleRoute}
          style={{
            position: "absolute",
            opacity: 1,
            top: "25%",
            bottom: 0,
            right: 0,
            left: 0
          }}
        />
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    state
  };
};

const SplashScreen = connect(mapStateToProps)(UnconnectedSplashScreen);

export { SplashScreen };
