// Authentication-related action types
export const REGISTRATION_SUCCESS = "REGISTRATION_SUCCESS";
export const REGISTRATION_ERROR = "REGISTRATION_ERROR";
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';   // Dispatched when login is successful
export const LOGIN_ERROR = 'LOGIN_ERROR';       // Dispatched when login fails
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS'; // Dispatched when logout is successful
export const LOGOUT_ERROR = 'LOGOUT_ERROR';     // Dispatched when logout fails
export const TOKEN_EXPIRED = 'TOKEN_EXPIRED';   // Dispatched when the JWT token has expired
export const AUTH_LOADING = 'AUTH_LOADING';     // Dispatched to indicate authentication loading state
export const AUTH_LOADED = 'AUTH_LOADED';       // Dispatched when authentication process finishes
export const AUTH_CLEAR_MESSAGES = 'AUTH_CLEAR_MESSAGES'; // Clears success and error messages in the authentication state
export const RESET_AUTH_MESSAGES = 'RESET_AUTH_MESSAGES'; 