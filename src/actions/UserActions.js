import * as T from "./types";
import { NavigationActions } from "react-navigation";
import {
  getProfileInfoPromise,
  getOwnUserListingsPromise
} from "../serverHelpers/APIFuncs";
import { getCityAndCountry } from "../Helpers";
import { WIDTH } from "../assets/Styles";
import { transposeHouseDatatoLocal } from "../Helpers";

const onGetDataSuccess = ({ dispatch, profileRes, navigation, id, token }) => {
  console.log(`profileRes success`, profileRes);

  getOwnUserListingsPromise({ id, token }).then(houseResponse => {
    const { data: houseData } = houseResponse.data;
    const userHouses = transposeHouseDatatoLocal(houseData);

    const { data: profileData } = profileRes.data;

    const {
      about,
      email,
      full_name: name,
      location,
      onboarded,
      phone_number: phone,
      verified,
      photo_json
    } = profileData;

    console.log(`PROFILE DATA`, profileData);

    const { city, country } = getCityAndCountry(location);
    let pic;

    if (WIDTH <= 320) {
      pic = photo_json.small;
    } else if (WIDTH <= 414) {
      pic = photo_json.medium;
    } else {
      pic = photo_json.large;
    }

    const localObj = {
      name,
      about,
      email,
      phone,
      city,
      country,
      pic,
      onboarded,
      verified
    };

    console.log(`USER HOUSES AFTER TRANSFORMATION`, userHouses);

    dispatch({
      type: T.SET_PROFILE,
      payload: localObj
    });

    dispatch({
      type: T.SET_USER_HOUSES,
      payload: { userHouses }
    });

    // const homeAction = NavigationActions.setParams({
    //   key: "Home",
    //   params: {
    //     id,
    //     token
    //   }
    // });
    let routeName;

    if (verified && onboarded) {
      // navigation.dispatch(homeAction);
      routeName = "Home";
    } else if (verified) {
      routeName = "Onboarding";
    } else {
      routeName = "Verification";
    }

    navigation.navigateWithDebounce(routeName);
  });

  // navigation.dispatch(
  //   NavigationActions.reset({
  //     index: 0,
  //     actions: [NavigationActions.navigate({ routeName: routeName })]
  //   })
  // );

  // if (verified && onboarded) {
  //   // navigation.dispatch(homeAction);
  //   navigation.navigateWithDebounce("Home");
  // } else if (verified) {
  //   navigation.navigateWithDebounce("Onboarding");
  // } else {
  //   navigation.navigateWithDebounce("Verification");
  // }
};

export const userSignInSuccess = ({ token, id, navigation }) => {
  return dispatch => {
    dispatch({
      type: T.LOGIN_USER_SUCCESS,
      payload: {
        token,
        id
      }
    });
    getProfileInfoPromise({ token, id })
      .then(profileRes => {
        onGetDataSuccess({ dispatch, profileRes, navigation, id, token });
      })
      .catch(err => console.log(`ERR: getProfileInfoPromise:`, err));
  };
};

export const createUser = ({ name, email, id, token }) => {
  return {
    type: T.CREATE_USER,
    payload: {
      name,
      email,
      id,
      token
    }
  };
};

export const verifyUser = navigation => {
  navigation.navigateWithDebounce("Onboarding");

  return {
    type: T.USER_VERIFIED_SUCCESS
  };
};

export const completeOnboarding = navigation => {
  console.log(`COMPLETING ONBOARDING`);
  navigation.navigateWithDebounce("Walkthrough");

  return {
    type: T.COMPLETE_ONBOARDING
  };
};

export const changeProfileItem = ({ key, value }) => {
  return {
    type: T.CHANGE_PROFILE,
    payload: {
      key,
      value
    }
  };
};

export const setProfile = profileObj => {
  console.log(`SETTING PROFILE`);

  return {
    type: T.SET_PROFILE,
    payload: profileObj
  };
};

export const userLogout = () => ({ type: T.USER_LOGOUT });
