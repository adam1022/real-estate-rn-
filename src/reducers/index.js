import { combineReducers } from "redux";
// import AuthReducer from "./AuthReducer";
import NavReducer from "./NavReducer";
import UserReducer from "./UserReducer";
import LockboxReducer from "./LockboxReducer";
import HouseReducer from "./HouseReducer";
import LoadingReducer from "./LoadingReducer";

export default combineReducers({
  nav: NavReducer,
  user: UserReducer,
  lockboxes: LockboxReducer,
  houses: HouseReducer,
  loading: LoadingReducer
});
