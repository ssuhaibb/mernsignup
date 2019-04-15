import axios from "axios";
import { GET_ERRORS, SET_CURRENT_USER } from "./types";
import setAuthToken from "../setAuthToken";
import jwt_decode from "jwt-decode";

export const registerUser = (user, history) => dispatch => {
  axios
    .post("/api/users/register", user)

    .then(res => {
      console.log(res.data);
      history.push("login");
    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
};

export const loginUser = user => dispatch => {
  debugger
  axios
    .post("/api/users/login", user)
    .then(res => {
      const { token } = res.data;
      localStorage.setItem("jwtToken", token);
      setAuthToken(token);
      const decoded = jwt_decode(token);
      dispatch(setCurrentUser(decoded));
      console.log(res.data);
    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
};


export const setCurrentUser = decoded =>{
  debugger
  return{
    type:SET_CURRENT_USER,
    payload:decoded
  }
}

export const logoutUser = (history) => dispatch => {
  debugger
  localStorage.removeItem('jwtToken');
  setAuthToken(false);
  dispatch(setCurrentUser({}));
  history.push('/login');
}