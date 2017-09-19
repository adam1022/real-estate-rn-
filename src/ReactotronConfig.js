import Reactotron, { asyncStorage } from "reactotron-react-native";
import { reactotronRedux } from "reactotron-redux";

if (process.env.NODE_ENV !== "production") {
  Reactotron.configure({ name: "Toor App" }) // controls connection & communication settings
    .useReactNative()
    .use(reactotronRedux())
    .use(asyncStorage()) // add all built-in react native plugins
    .connect(); // let's connect!
}

// pre-hookup to Redux

// if (process.env.NODE_ENV !== "production") {
//   Reactotron.configure({ name: 'Toor App' }) // controls connection & communication settings
//     .useReactNative() // add all built-in react native plugins
//     .connect(); // let's connect!
// }
