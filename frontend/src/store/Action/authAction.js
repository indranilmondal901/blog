import axios from 'axios';
import { SERVER_URL } from '../../config/config.js';
import {
  REGISTRATION_SUCCESS,
  REGISTRATION_ERROR,
  LOGIN_SUCCESS,
  LOGIN_ERROR,
  LOGOUT_SUCCESS,
  LOGOUT_ERROR,
//   TOKEN_EXPIRED
} from "../Types/authTypes.js";

export const userAuth = (token) => {
  axios.interceptors.request.use(
    (config) => {
      config.headers.authorization = `Bearer ${token}`;
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );
};

/* Registration */
export const RegisterAction = (userData) => {
  return async (dispatch) => {
    try {
      const response = await axios.post(`${SERVER_URL}/user/sign-up`, userData);

      dispatch({
        type: REGISTRATION_SUCCESS,
        payload: {
          successMessage: response.data.message || 'Registration successful!',
        },
      });
    } catch (error) {
      const errorMessage = error?.response?.data?.message || 'Registration failed.';

      dispatch({
        type: REGISTRATION_ERROR,
        payload: {
          errorMessage,
        },
      });
    }
  };
};

/* Login Action */
export const LoginAction = (credentials) => {
  return async (dispatch) => {

    try {
      const response = await axios.post(`${SERVER_URL}/user/sign-in`, credentials);
      const { token, user } = response.data;

      localStorage.setItem('token', token);
      localStorage.setItem('user', user);

      dispatch({
        type: LOGIN_SUCCESS,
        payload: {
          token,
          user,
          successMessage: response.data.message || 'Login successful!',
        },
      });

    } catch (error) {
      const errorMessage = error?.response?.data?.message || 'Invalid Credential.';

      dispatch({
        type: LOGIN_ERROR,
        payload: {
          errorMessage,
        },
      });

    }
  };
};

/* Logout Action */
export const LogoutAction = () => {
  return async (dispatch) => {
    try {
      localStorage.removeItem('token');
      localStorage.removeItem('userId');

      dispatch({
        type: LOGOUT_SUCCESS,
        payload: {
          successMessage: 'Logout successful!',
        },
      });
    } catch (error) {
      dispatch({
        type: LOGOUT_ERROR,
        payload: {
          errorMessage: 'Logout failed.',
        },
      });
    }
  };
};

/* Token Expiration Check */
// export const CheckTokenExpiration = () => {
//   return async (dispatch) => {
//     const token = localStorage.getItem('token');

//     if (!token) {
//       dispatch({
//         type: TOKEN_EXPIRED,
//         payload: {
//           errorMessage: 'Session expired. Please log in again.',
//         },
//       });

//       return;
//     }

//     try {
//       const decodedToken = jwtDecode(token);
//       const expTime = new Date(decodedToken.exp * 1000);

//       if (new Date() > expTime) {
//         localStorage.removeItem('token');
//         localStorage.removeItem('userId');

//         dispatch({
//           type: TOKEN_EXPIRED,
//           payload: {
//             errorMessage: 'Session expired. Please log in again.',
//           },
//         });
//       }
//     } catch (error) {
//       dispatch({
//         type: TOKEN_EXPIRED,
//         payload: {
//           errorMessage: 'Invalid session. Please log in again.',
//         },
//       });
//     }
//   };
// };
