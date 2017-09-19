import * as T from "../actions/types";

const INITIAL_STATE = {
  email: "",
  password: "",
  user: null,
  error: "",
  loading: false
};

export default (state = INITIAL_STATE, action) => {
  // console.log(action);

  switch (action.type) {
    case T.EMAIL_CHANGED:
      return { ...state, email: action.payload };
    case T.PASSWORD_CHANGED:
      return { ...state, password: action.payload };
    case T.LOGIN_USER_START:
      return { ...state, loading: true, error: "" };
    case T.LOGIN_USER_SUCCESS:
      return { ...state, ...INITIAL_STATE, user: action.payload };
    case T.LOGIN_USER_FAIL:
      return {
        ...state,
        error: "Authentication Failed",
        password: "",
        loading: false
      };
    default:
      return state;
  }
};

