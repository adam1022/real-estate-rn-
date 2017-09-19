import * as T from "../actions/types";

const INITIAL_STATE = {
  loggedIn: false,
  profile: {
    name: "",
    about: "",
    city: "",
    country: "",
    phone: "",
    email: "",
    token: "",
    id: "",
    pic: "",
    verified: false,
    onboarded: false
  }
};

const UserReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case T.LOGIN_USER_SUCCESS:
      const { token, id } = action.payload;

      return {
        ...state,
        loggedIn: true,
        profile: { ...state.profile, token, id }
      };
    case T.USER_VERIFIED_SUCCESS:
      return {
        ...state,
        loggedIn: true,
        profile: { ...state.profile, verified: true }
      };
    case T.SET_PROFILE:
      // action's payload will be a profile object
      const { payload } = action;
      const newProfile = { ...state.profile, ...payload };
      return { ...state, profile: newProfile };
    case T.CHANGE_PROFILE:
      const { key, value } = action.payload;

      return { ...state, profile: { ...state.profile, [key]: value } };
    case T.CREATE_USER:
      const { name, email, id: uid, token: userToken } = action.payload;
      const profile = {
        ...state.profile,
        name,
        email,
        id: uid,
        token: userToken
      };

      return { ...state, loggedIn: true, profile };
    case T.COMPLETE_ONBOARDING:
      return {
        ...state,
        profile: { ...state.profile, onboarded: true }
      };
    case T.USER_LOGOUT:
      return INITIAL_STATE;
    default:
      return state;
  }
};

export default UserReducer;
