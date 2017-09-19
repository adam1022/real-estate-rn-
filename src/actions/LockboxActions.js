import * as T from "./types";
import { NavigationActions } from "react-navigation";
import { getProfileInfoPromise } from "../serverHelpers/APIFuncs";
import { WIDTH } from "../assets/Styles";

export const editLockboxField = ({ key, value }) => {
  return {
    type: T.EDIT_LOCKBOX_FIELD,
    payload: { key, value }
  };
};

export const addNewLockbox = ({ serial, boxName }) => {
  return {
    type: T.ADD_NEW_LOCKBOX,
    payload: { serial, boxName }
  };
};
