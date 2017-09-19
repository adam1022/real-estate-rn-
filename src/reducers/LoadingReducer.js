import * as T from "../actions/types";

const INITIAL_STATE = {
  loading: false
};

const LoadingReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case T.SET_LOADING_ON:
      return { ...state, loading: true };
    case T.SET_LOADING_OFF:
      return { ...state, loading: false };
    case T.LOGIN_USER_SUCCESS:
      return state;
    default:
      return { ...state, loading: false };
  }
};

export default LoadingReducer;
