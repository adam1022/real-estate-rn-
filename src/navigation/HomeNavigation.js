import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Image, StyleSheet } from "react-native";
import Colors from "../assets/Colors";
import { TabNavigator } from "react-navigation";
import {
  SchedulerPage,
  FavoritesPage,
  MapPage,
  SearchPage
} from "../components";
import { HText } from "../components/common";
import ProfileNavigation from "./ProfileNavigation";
import Icons from "../assets/Icons";
import Styles from "../assets/Styles";

const _addNavigationHelpers = navigation => {
  const original = addNavigationHelpers(navigation);
  // let debounce;
  return {
    ...original,
    navigateWithDebounce: debounce(
      (routeName, params, action) =>
        navigation.dispatch(
          NavigationActions.navigate({
            routeName,
            params,
            action
          })
        ),
      // Set the wait to a reasonable duration
      1000,
      {
        trailing: false,
        leading: true
      }
    )
  };
};

// function wrap(WrappedComponent) {
//   const EnhancedComponent = class extends React.Component {
//     render() {
//       return <WrappedComponent />;
//     }
//   };
//   return EnhancedComponent;
// }

const styles = StyleSheet.create({
  icon: {
    width: 26,
    height: 26
  },
  headerStyle: {
    backgroundColor: Colors.darkGray
  }
});

const { headerStyle } = styles;

const HomeNavigation = TabNavigator(
  {
    Search: {
      screen: SearchPage,
      navigationOptions: {
        tabBarIcon: ({ tintColor }) =>
          <Image
            source={Icons.blackSearch}
            style={[Styles.icon, { tintColor }]}
          />,
        headerStyle,
        headerTintColor: Colors.white
      }
    },
    Map: {
      screen: MapPage,
      navigationOptions: {
        title: "HOME",
        titleColor: Colors.white,
        tabBarIcon: ({ tintColor }) =>
          <Image
            source={Icons.blackMap}
            style={[Styles.icon, { tintColor }]}
          />,
        headerStyle,
        headerTintColor: Colors.white
      }
    },
    Scheduler: {
      screen: SchedulerPage,
      navigationOptions: {
        title: "Requests",
        tabBarIcon: ({ tintColor }) =>
          <Image
            source={Icons.blackScheduler}
            style={[Styles.icon, { tintColor }]}
          />,
        headerStyle,
        headerTintColor: Colors.white
        // header: () => <HText text={"Requests "} size={2} color={"gray"} />
      }
    },
    Favorites: {
      screen: FavoritesPage,
      navigationOptions: {
        headerMode: "none",
        tabBarIcon: ({ tintColor }) =>
          <Image
            source={Icons.blackHeart}
            style={[Styles.icon, { tintColor }]}
          />,
        headerStyle,
        headerTintColor: Colors.white
      }
    },
    Profile: {
      screen: ProfileNavigation,
      navigationOptions: {
        header: false,
        tabBarIcon: ({ tintColor }) =>
          <Image
            source={Icons.blackProfile}
            style={[Styles.icon, { tintColor }]}
          />
      }
    }
  },
  {
    animationEnabled: false,
    initialRouteName:
      process.env.NODE_ENV !== "production" ? "Profile" : "Search",
    lazy: true,
    tabBarOptions: {
      activeTintColor: Colors.black,
      style: {
        backgroundColor: Colors.white
      },
      showLabel: false
    }
  }
);

// export default connect(mapStateToProps)(HomeWithNavigationState);

export default HomeNavigation;
