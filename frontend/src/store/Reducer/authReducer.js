import { jwtDecode } from "jwt-decode";

/* import types */
import {
  REGISTRATION_SUCCESS,
  REGISTRATION_ERROR,
  LOGIN_SUCCESS,
  LOGIN_ERROR,
  LOGOUT_SUCCESS,
  LOGOUT_ERROR,
  TOKEN_EXPIRED,
  RESET_AUTH_MESSAGES,
} from "../Types/authTypes";

const initialState = {
  authLoading: true, // Determines if authentication is still loading
  authenticate: false, // Indicates if the user is authenticated
  authSuccessMessage: null, // Stores success messages related to authentication
  authErrorMessage: null, // Stores error messages related to authentication
  token: null, // JWT token for the session
  currentUser: null, // Current logged-in user's information
};

// Function to decode token and validate its expiry
const tokenDecode = (token) => {
  const tokenDecoded = jwtDecode(token);
  const expTime = new Date(tokenDecoded.exp * 1000);
  if (new Date() > expTime) {
    return null;
  }
  return tokenDecoded;
};

// Retrieve token from localStorage and validate
const getToken = localStorage.getItem("token");
if (getToken) {
  const getInfo = tokenDecode(getToken);
  if (getInfo) {
    initialState.currentUser = {
      name: getInfo.name,
      email: getInfo.email,
      _id: getInfo._id,
    };
    initialState.authenticate = true;
  } else {
    localStorage.removeItem("token");
  }
}

export const AuthReducer = (state = initialState, action) => {
  const { payload, type } = action;

  switch (type) {
    /* Login Success */
    case REGISTRATION_SUCCESS:
      return {
        ...state,
        regSuccessMessage: payload.successMessage,
      };

    /* Login Error */
    case REGISTRATION_ERROR:
      return {
        ...state,
        authErrorMessage: payload.errorMessage,
      };

    /* Login Success */
    case LOGIN_SUCCESS:
      return {
        ...state,
        authSuccessMessage: payload.successMessage,
        authErrorMessage: null,
        token: payload.token,
        authenticate: true,
        currentUser: payload.user,
        authLoading: false,
      };

    /* Login Error */
    case LOGIN_ERROR:
      return {
        ...state,
        authErrorMessage: payload.errorMessage,
        authSuccessMessage: null,
        authLoading: false,
      };

    /* Logout Success */
    case LOGOUT_SUCCESS:
      localStorage.removeItem("token"); // Remove token from localStorage
      return {
        ...state,
        regSuccessMessage: null,
        authSuccessMessage: null,
        authErrorMessage: null,
        token: null,
        authenticate: false,
        currentUser: null,
        authLoading: false,
      };

    /* Logout Error */
    case LOGOUT_ERROR:
      return {
        ...state,
        authErrorMessage: payload.errorMessage,
        authSuccessMessage: null,
        authLoading: false,
      };

    /* Token Expired */
    case TOKEN_EXPIRED:
      localStorage.removeItem("token"); // Remove expired token
      return {
        ...state,
        authErrorMessage: "Session expired. Please log in again.",
        token: null,
        authenticate: false,
        currentUser: null,
        authLoading: false,
      };

    case RESET_AUTH_MESSAGES:
      console.log("here---");
      return {
        ...state,
        regSuccessMessage:null,
        authSuccessMessage: null,
        authErrorMessage: null,
      };
    default:
      return state;
  }
};
