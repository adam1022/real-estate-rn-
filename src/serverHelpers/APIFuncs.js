import md5 from "md5";
import axios from "axios";
import FormData from "form-data";

// import request from "request";

const URL = "https://toordev.herokuapp.com/1.0/";

export const generateAuth = () => {
  const SALT = "23s0g^Kq61rM";
  const date = new Date();
  const time = Math.round(date.getTime() / 1000).toString();
  const hash = md5(String(time) + SALT);

  console.log(time, hash);

  return {
    time,
    hash
  };
};

const createConfig = () => {
  const { time, hash } = generateAuth();

  return {
    headers: {
      Time: time,
      Hash: hash
    }
  };
};

const createUserConfig = ({ id, token }) => {
  const { time, hash } = generateAuth();

  return {
    headers: {
      Time: time,
      Hash: hash,
      "User-Id": id.toString(),
      Token: token
    }
  };
};

export const createAccount = ({ name, email, password, success, failure }) => {
  const config = createConfig();

  const postObj = {
    full_name: name,
    email: email,
    password: password
  };

  axios
    .post(`${URL}auth/signup`, postObj, config)
    .then(res => success(res))
    .catch(err => failure(err));
};

export const confirmLogin = ({ email, password, success, failure }) => {
  const config = createConfig();
  const postObj = {
    email: email,
    password: password
  };

  axios
    .post(`${URL}auth/signin`, postObj, config)
    .then(res => success(res))
    .catch(err => failure(err));
};

export const confirmLoginPromise = ({ email, password }) => {
  const config = createConfig();
  const postObj = {
    email: email,
    password: password
  };

  return axios.post(`${URL}auth/signin`, postObj, config);
};

export const resetUserPasswordPromise = ({
  current_password,
  new_password,
  id,
  token
}) => {
  const config = createUserConfig({ id, token });

  const postObj = {
    current_password,
    new_password
  };

  return axios.post(`${URL}auth/reset_password`, postObj, config);
};

export const recoverPassword = ({ email, success, failure }) => {
  const config = createConfig();
  const postObj = {
    email: email
  };

  axios
    .post(`${URL}auth/recover_password`, postObj, config)
    .then(res => success(res))
    .catch(err => failure(err));
};

export const getProfileInfo = ({ id, token, success, failure }) => {
  const config = createUserConfig({ id, token });

  axios
    .get(`${URL}user/${id}`, config)
    .then(res => success(res))
    .catch(err => failure(err));
};

export const getProfileInfoPromise = ({ id, token }) => {
  const config = createUserConfig({ id, token });

  return axios.get(`${URL}user/${id}`, config);
};

export const setPartOfProfile = ({ token, id, postObj }) => {
  const config = createUserConfig({ id, token });

  return axios.put(`${URL}user/`, postObj, config);
};

export const setRemoteProfile = userObject => {
  const { id, token } = userObject;
  const { full_name, about, location, phone_number, email } = userObject;

  const config = createUserConfig({ id, token });
  const postObj = {
    full_name,
    about,
    location,
    phone_number,
    email
  };

  return axios.put(`${URL}user/`, postObj, config);
};

export const postUserPhoto = ({ fileURI, id, token }) => {
  const { headers } = createUserConfig({ id, token });
  const formData = new FormData();

  formData.append("photo", {
    uri: fileURI,
    type: "image/jpg",
    name: "profie_pic.jpg"
  });

  const options = {
    method: "POST",
    headers,
    body: formData
  };

  return fetch(`${URL}user/photo`, options);
};

export const serverSignout = ({ token, id }) => {
  const config = createUserConfig({ token, id });

  return axios.delete(`${URL}auth/signout`, config);
};

export const addHouseToServer = async ({ house, user }) => {
  let id = house.houseId;

  console.log(`HOUSE`, house);

  const {
    housePics,
    instructions,
    lockbox,
    public: isPublic,
    guestlist
  } = house;

  console.log(`HOUSE PICS BEFORE SERVER`, housePics);

  const {
    price,
    beds: num_bedrooms,
    baths: num_bathrooms,
    sqft: square_feet
  } = house.genInfo;

  const { headline, address, subDescription: description } = house.description;

  const config = createUserConfig({ id: user.id, token: user.token });

  const genInfoObj = {
    price: +price || 0,
    num_bedrooms: +num_bedrooms || 0,
    num_bathrooms: +num_bathrooms || 0,
    square_feet: +square_feet || 0
  };

  console.log(`GEN INFO OBJ`, genInfoObj);

  try {
    if (!id) {
      const response = await axios.post(
        `${URL}listing/general-information`,
        genInfoObj,
        config
      );

      console.log(`RESPONSE BECAUSE HOUSE DIDN'T EXIST BEFORE`, response);

      id = response.data.data.id;
    }

    const descriptionObj = {
      id,
      headline,
      address,
      description
    };

    const instructionsObj = {
      id,
      instructions
    };

    const publicBool = isPublic ? "1" : "0";

    console.log(`UNCOMMENT THE LOOP BELOW TO ADD THE HOUSE PICS`);

    const photoUploadArr = housePics.map((uri, i) => {
      const fileURI = housePics[i];
      return postListingPhoto({ id, fileURI, user, i })
        .then(housePhotoSuccess => {
          console.log(`HOUSE PHOTO ${i} UPLOADED`, housePhotoSuccess);
          return housePhotoSuccess;
        })
        .catch(err => console.log(`ERROR UPLOADING HOUSE PHOTO`, err));
    });

    console.log(`PHOTO UPLOAD ARR`, photoUploadArr);

    // for (let i in housePics) {
    //   const fileURI = housePics[i];

    //   postListingPhoto({ id, fileURI, user, i })
    //     .then(housePhotoSuccess =>
    //       console.log(`HOUSE PHOTO ${i} UPLOADED`, housePhotoSuccess)
    //     )
    //     .catch(err => console.log(`ERROR UPLOADING HOUSE PHOTO`, err));
    // }

    return axios.all([
      axios.put(
        `${URL}listing/${id}/toggle-public`,
        { public: publicBool, id },
        config
      ),
      axios.put(`${URL}listing/${id}/general-information`, genInfoObj, config),
      axios.put(`${URL}listing/${id}/description`, descriptionObj, config),
      axios.put(`${URL}listing/${id}/instructions`, instructionsObj, config),
      ...photoUploadArr
    ]);

    console.log(`HOUSE ID RESPONSE`, getHouseId);
  } catch (err) {
    console.log(`ERROR POSTING GEN_INFO FOR NEW HOUSE`, err);
  }
};

const postListingPhoto = ({ id, fileURI, user, i }) => {
  const { headers } = createUserConfig({ id: user.id, token: user.token });
  const formData = new FormData();

  formData.append("photo", {
    uri: fileURI,
    type: "image/jpg",
    name: `house_pic${i}.jpg`
  });

  const options = {
    method: "PUT",
    headers,
    body: formData,
    id: id
  };

  return fetch(`${URL}listing/${id}/photo`, options);
};

export const deleteListing = ({ id, user }) => {
  console.log(`id`, id);
  console.log(`user`, user);

  let config = createUserConfig({ id: user.id, token: user.token });

  return axios.delete(`${URL}listing/${id}`, config);
};

export const getOwnUserListingsPromise = ({ id, token }) => {
  const { headers } = createUserConfig({ id, token });

  const postObj = {
    page: 1,
    user_id: id,
    me: "1"
  };

  const newConfig = {
    headers,
    params: {
      me: "1",
      page: 1,
      user_id: id
    }
  };

  return axios.get(`${URL}listing/all`, newConfig);
  // .then(response => console.log(response.data))
  // .catch(err => console.log("ERR", err));
};

export const searchForUser = ({ id, token, email }) => {
  console.log(`doingingdsdasadad`);

  const { headers } = createUserConfig({ id, token });

  return axios.get(`${URL}/user/search?query=${email}`, { headers });
  // .then(response => response)
  // .catch(err => console.log(`ERR SEARCHING`, err));
};
