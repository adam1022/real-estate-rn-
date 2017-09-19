import * as T from "../actions/types";

export const lockboxInitialState = {
  savedLockboxes: [],
  editing: {
    serial: "",
    boxName: ""
  }
};

const LockboxReducer = (state = lockboxInitialState, action) => {
  let key;
  let value;
  let newEditing;
  let newBox;

  switch (action.type) {
    case T.EDIT_LOCKBOX_FIELD:
      key = action.payload.key;
      value = action.payload.value;

      console.log(`key`, key);
      console.log(`value`, value);

      newEditing = { ...state.editing, [key]: value };

      console.log(`newEditing`, newEditing);

      return { ...state, editing: newEditing };
    case T.ADD_NEW_LOCKBOX:
      newBox = {
        serial: action.payload.serial,
        boxName: action.payload.boxName
      };

      return {
        savedLockboxes: [...state.savedLockboxes, newBox],
        editing: {
          serial: "",
          boxName: ""
        }
      };

    case T.USER_LOGOUT:
      return lockboxInitialState;

    default:
      return state;
  }
};

export default LockboxReducer;
