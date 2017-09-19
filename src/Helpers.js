import { Alert, Linking } from "react-native";
import Permissions from "react-native-permissions";

const strCap = str => {
  let copy = str.split("").map(i => i.toLowerCase());

  copy[0] = copy[0].toUpperCase();

  return copy.join("");
};

export const fixName = name => {
  let fixed = name
    .trim()
    .split(" ")
    .filter(i => i !== "")
    .map(strCap)
    .join(" ");

  return fixed;
};

export const getCityAndCountry = location => {
  let city;
  let country;

  if (location) {
    const splitLocation = location.split(", ");
    city = splitLocation[0] || "";
    country = splitLocation[1] || "";
  } else {
    city = "";
    country = "";
  }

  return {
    city,
    country
  };
};

export const getNextBackKey = keyStr => {
  const newKey = keyStr.split("");
  const lastNum = +newKey[newKey.length - 1];
  newKey[newKey.length - 1] = (lastNum + 1).toString();

  const finished = newKey.join("").replace("Init-", "");
  return finished;
};

export const getCurrentRouteName = nav => {
  if (nav.index === undefined) {
    console.log(`RETURNING NAV`, nav);
    console.log(`nav.routeName`, nav.routeName);

    const name = nav.routeName.split("").slice(0).join("");

    console.log(`NAME`, name);

    return name;
  }

  return getCurrentRouteName(nav.routes[nav.index]);
};

export const requestPhotoPermission = successFunction => {
  console.log(`RUNNING CHECK`);

  Permissions.check("photo").then(response => {
    console.log(`RESPONSE`, response);

    if (response === "authorized" || response === "undetermined") {
      return successFunction();
    } else {
      alertToToorSettings();
    }
  });
};

export const alertToToorSettings = () => {
  return Alert.alert("Please Allow Photo Access", "", [
    {
      text: "Cancel",
      style: "cancel"
    },
    {
      text: "Settings",
      onPress: () =>
        Linking.canOpenURL("app-settings:")
          .then(supported => {
            if (!supported) {
              console.log("Can't handle settings url");
            } else {
              return Linking.openURL("app-settings:");
            }
          })
          .catch(err => console.error("An error occurred", err))
    }
  ]);
};

export const toFixedIfNecessary = number => {
  if (Math.round(number) !== number) {
    return number.toFixed(2);
  }

  return number;
};

export const transposeHouseDatatoLocal = houseResponse => {
  const userHouses = {};

  for (let houseObj of houseResponse) {
    const genInfo = {
      price: houseObj.price || "",
      beds: houseObj.num_bedrooms || "",
      baths: houseObj.num_bathrooms || "",
      sqft: houseObj.square_feet || ""
    };

    const description = {
      headline: houseObj.headline || "",
      address: houseObj.address || "",
      subDescription: houseObj.description || ""
    };

    const guestList = {
      searchText: "",
      activeList: houseObj.guest_lists_json
    };

    const { instructions, id: houseId } = houseObj;

    const housePics = houseObj.photos_json.map(photo => photo.medium);
    const lockbox = "";
    const isPublic = false;

    userHouses[houseId] = {
      genInfo,
      description,
      housePics,
      houseId,
      instructions,
      lockbox,
      public: isPublic,
      guestList
    };
    // need public && lockbox
  }

  return userHouses;
};
