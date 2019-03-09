import { GET_ERRORS, SET_CURRENT_USER } from "./types";
import setAuthToken from "../utils/setAuthToken";
import jwt_decode from "jwt-decode";
import axios from "axios";

// action for register user
export const registerUser = (userData, history) => dispatch => {
  axios
    .post("/api/users/register", userData)
    .then(res => {
      //get token
      const { token } = res.data;
      //set token in local
      localStorage.setItem("token", token);
      //setting token at header
      setAuthToken(token);
      // Decode token to get user data
      const decoded = jwt_decode(token);
      // Set current user
      dispatch(setCurrentUser(decoded));
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// action for login user
export const loginUser = (userData, history) => dispatch => {
  axios
    .post("/api/users/login", userData)
    .then(res => {
      //get token
      const { token } = res.data;
      //set token in local
      localStorage.setItem("token", token);
      //setting token at header
      setAuthToken(token);
      // Decode token to get user data
      const decoded = jwt_decode(token);
        console.log('decoded',decoded);
      // Set current user
      dispatch(setCurrentUser(decoded));
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Log user out
export const logoutUser = history => dispatch => {
  // Remove token from localStorage
  localStorage.removeItem("token");
  // Remove auth header for future requests
  setAuthToken(false);
  // Set current user to {} which will set isAuthenticated to false
  dispatch(setCurrentUser({}));
  history.push("/");
};

// Set logged in user
export const setCurrentUser = decoded => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded
  };
};
