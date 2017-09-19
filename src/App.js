import React, { Component } from "react";
import { AsyncStorage, View } from "react-native";
import { Provider } from "react-redux";
import { persistStore, autoRehydrate } from "redux-persist";
import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "remote-redux-devtools";
import ReduxThunk from "redux-thunk";
import logger from "redux-logger";
import applyAppStateListener from "redux-enhancer-react-native-appstate";
// import Reactotron from "reactotron-react-native";
// import { whyDidYouUpdate } from "why-did-you-update";
import Video from "react-native-video";
import Reducers from "./reducers";
import ConnectedAppWithNavigationState from "./navigation/Navigation";
import Styles from "./assets/Styles";
import SplashVideo from "./assets/vid/toorSplash.mp4";

// process.env.NODE_ENV = "production";

let SPLASH_TIME;

// set PURGE to true if you want to completely reset the app's state;
const PURGE = false;

if (process.env.NODE_ENV !== "production") SPLASH_TIME = 0;
else SPLASH_TIME = 4000;

const composeEnhancers = composeWithDevTools({
  realtime: true,
  port: 8081
});

let middlewares = [ReduxThunk];

// debugging tooling
if (process.env.NODE_ENV !== "production") {
  // add logger
  middlewares = [...middlewares, logger];

  // sync with Reactotron
  // myCreateStore = Reactotron.createStore;
}

// replace these transient reducers when they've been created
console.log(`DON'T FORGET: You're not persisting navigation here.`);

console.log(`Change to TRUE below to reset store state`);

const store = createStore(
  Reducers,
  {},
  composeEnhancers(
    applyAppStateListener(),
    applyMiddleware(...middlewares),
    autoRehydrate()
  )
);

export default class App extends Component {
  constructor() {
    super();
    this.state = { rehydrated: false };
  }

  componentWillMount() {
    // check if user is logged in or not
    console.disableYellowBox = true;
    console.log(`APP IS MOUNTING`);

    if (PURGE) {
      setTimeout(this.purgeStore, SPLASH_TIME);
    } else {
      setTimeout(this.rehydrateStore, SPLASH_TIME);
    }
  }

  purgeStore = () => {
    persistStore(
      store,
      {
        // blacklist: ["logs", "statusMessages", "env"],
        blacklist: ["logs", "statusMessages", "env", "nav"],
        storage: AsyncStorage,
        debounce: 50
      },
      () => {
        this.setState({ rehydrated: true });
      }
    ).purge();
  };

  rehydrateStore = () => {
    persistStore(
      store,
      {
        // blacklist: ["logs", "statusMessages", "env"],
        blacklist: ["logs", "statusMessages", "env", "nav"],
        storage: AsyncStorage,
        debounce: 50
      },
      () => {
        this.setState({ rehydrated: true });
      }
    );
  };

  render() {
    // For a heads up on unnecessary re-renders (performance gains)
    // if (process.env.NODE_ENV !== "production") {
    //   whyDidYouUpdate(React);
    // }

    // gives the normal Redux dev tool in Electron react-native-debugger app

    if (!this.state.rehydrated) {
      return (
        <View style={[Styles.centerAll, { backgroundColor: "black", flex: 1 }]}>
          <Video
            source={SplashVideo}
            style={{
              position: "absolute",
              opacity: 1,
              top: "30%",
              bottom: 0,
              right: "25%",
              left: "25%",
              width: "50%",
              height: "50%"
            }}
          />
        </View>
      );
    }

    return (
      <Provider store={store}>
        <ConnectedAppWithNavigationState />
      </Provider>
    );
  }
}
