import * as T from "../actions/types";

const INITIAL_STATE = {
  allHouses: {},
  userHouses: {},
  editingHouse: {
    genInfo: {
      price: "",
      beds: "",
      baths: "",
      sqft: ""
    },
    description: {
      headline: "",
      address: "",
      subDescription: ""
    },
    housePics: [],
    houseId: "",
    instructions: "",
    lockbox: "",
    public: false,
    guestlist: {
      searchText: "",
      activeList: []
    }
  },
  myHomesShouldUpdate: false
};

export default (state = INITIAL_STATE, action) => {
  // console.log(action);
  let genInfo;
  let description;
  let guestlist;
  let allHouses;
  let userHouses;
  let newHouse;
  let houseId;
  let editingHouse;
  let index;
  let housePics;

  switch (action.type) {
    case T.SET_USER_HOUSES: {
      return {
        ...state,
        userHouses: action.payload.userHouses
      };
    }
    case T.CHANGE_GUESTLIST_SEARCH_TEXT:
      return {
        ...state,
        editingHouse: {
          ...state.editingHouse,
          guestlist: {
            ...state.editingHouse.guestlist,
            searchText: action.payload.text
          }
        }
      };
    case T.CLEAR_GUESTLIST_SEARCH_TEXT:
      return {
        ...state,
        editingHouse: {
          ...state.editingHouse,
          guestlist: {
            ...state.editingHouse.guestlist,
            searchText: ""
          }
        }
      };
    case T.EDIT_SELECTED_HOUSE:
      return {
        ...state,
        myHomesShouldUpdate: false,
        editingHouse: {
          ...state.editingHouse,
          ...action.payload.house
        }
      };
    case T.EDIT_HOUSE_INFO:
      return {
        ...state,
        myHomesShouldUpdate: false,
        editingHouse: {
          ...state.editingHouse,
          genInfo: {
            ...state.editingHouse.genInfo,
            [action.payload.key]: action.payload.value
          }
        }
      };
    case T.EDIT_HOUSE_DESCRIPTION:
      return {
        ...state,
        myHomesShouldUpdate: false,
        editingHouse: {
          ...state.editingHouse,
          description: {
            ...state.editingHouse.description,
            [action.payload.key]: action.payload.value
          }
        }
      };
    // instructions, lockbox, public
    case T.EDIT_HOUSE_ITEM:
      return {
        ...state,
        myHomesShouldUpdate: false,
        editingHouse: {
          ...state.editingHouse,
          [action.payload.key]: action.payload.value
        }
      };
    case T.EDIT_HOUSE_PIC:
      housePics = [...state.editingHouse.housePics];
      return {
        ...state,
        myHomesShouldUpdate: false,
        editingHouse: {
          ...state.editingHouse,
          housePics: [
            ...housePics.slice(0, action.payload.index),
            action.payload.uri,
            ...housePics.slice(action.payload.index + 1)
          ]
        }
      };
    case T.DELETE_HOUSE_PIC:
      housePics = [...state.editingHouse.housePics];

      return {
        ...state,
        myHomesShouldUpdate: false,
        editingHouse: {
          ...state.editingHouse,
          housePics: [
            ...housePics.slice(0, action.payload.index),
            ...housePics.slice(action.payload.index + 1)
          ]
        }
      };
    case T.SAVE_HOUSE:
      newHouse = { ...state.editingHouse };
      houseId = action.payload.houseId;

      console.log(`HOUSE ID`);

      if (newHouse.public) {
        return {
          ...state,
          allHouses: {
            ...state.allHouses,
            [houseId]: newHouse
          },
          userHouses: {
            ...state.userHouses,
            [houseId]: newHouse
          },
          editingHouse: { ...INITIAL_STATE.editingHouse },
          myHomesShouldUpdate: true
        };
      } else {
        return {
          ...state,
          myHomesShouldUpdate: true,
          userHouses: {
            ...state.userHouses,
            [houseId]: newHouse
          },
          editingHouse: { ...INITIAL_STATE.editingHouse }
        };
      }

    case T.DELETE_HOUSE:
      userHouses = { ...state.userHouses };

      delete userHouses[action.payload.houseId];

      return {
        ...state,
        myHomesShouldUpdate: true,
        userHouses
      };

    case T.CANCEL_EDIT_HOUSE:
      return {
        ...state,
        myHomesShouldUpdate: false,
        editingHouse: { ...INITIAL_STATE.editingHouse }
      };
    case T.TOGGLE_HOUSE_PUBLIC: {
      return {
        ...state,
        editingHouse: {
          ...state.editingHouse,
          public: !state.editingHouse.public
        }
      };
    }
    case T.USER_LOGOUT:
      return INITIAL_STATE;
    default:
      return state;
  }
};
