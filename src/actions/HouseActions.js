import * as T from "./types";
import { NavigationActions } from "react-navigation";
import { getProfileInfoPromise } from "../serverHelpers/APIFuncs";
import { getCityAndCountry } from "../Helpers";
import { WIDTH } from "../assets/Styles";

export const editHouseGenInfo = ({ key, value }) => {
  return {
    type: T.EDIT_HOUSE_INFO,
    payload: { key, value }
  };
};

export const editHouseDescription = ({ key, value }) => {
  return {
    type: T.EDIT_HOUSE_DESCRIPTION,
    payload: { key, value }
  };
};

export const editHouseItem = ({ key, value }) => {
  return {
    type: T.EDIT_HOUSE_ITEM,
    payload: { key, value }
  };
};

export const editHousePics = ({ uri, index }) => {
  return {
    type: T.EDIT_HOUSE_PIC,
    payload: { uri, index }
  };
};

export const deleteHousePic = ({ index }) => ({
  type: T.DELETE_HOUSE_PIC,
  payload: { index }
});

export const addNewHouse = ({ houseId }) => ({
  type: T.SAVE_HOUSE,
  payload: { houseId }
});

export const deleteHouse = ({ houseId }) => ({
  type: T.DELETE_HOUSE,
  payload: { houseId }
});

export const editSelectedHouse = ({ house }) => {
  return {
    type: T.EDIT_SELECTED_HOUSE,
    payload: { house }
  };
};

export const cancelEditHouse = () => ({ type: T.CANCEL_EDIT_HOUSE });

export const toggleHousePublic = () => ({ type: T.TOGGLE_HOUSE_PUBLIC });

export const setLoading = () => ({ type: T.SET_LOADING_ON });
export const unsetLoading = () => ({ type: T.SET_LOADING_OFF });
export const changeGuestlistSearchText = text => ({
  type: T.CHANGE_GUESTLIST_SEARCH_TEXT,
  payload: { text }
});
export const clearGuestlistSearchText = () => ({
  type: T.CLEAR_GUESTLIST_SEARCH_TEXT
});
