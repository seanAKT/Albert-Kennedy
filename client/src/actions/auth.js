import axios from "axios";
import history from "../history";
import { AUTH_USER, UNAUTH_USER } from "./types";

export const registerUser = values => {
  return dispatch => {
    axios
      .post("/signup", values)
      .then(response => {
        localStorage.setItem("token", response.data.token);
        dispatch({
          type: AUTH_USER
        });
        history.push("/success");
      })
      .catch(console.log);
  };
};

export const signinUser = values => {
  return dispatch => {
    axios
      .post("/signin", values)
      .then(response => {
        localStorage.setItem("token", response.data.token);
        dispatch({
          type: AUTH_USER
        });
        history.push("/profile");
      })
      .catch(console.log);
  };
};

export const logoutUser = () => {
  localStorage.removeItem("token");
  return {
    type: UNAUTH_USER
  };
};

export const getUser = () => {
  return dispatch => {
    axios
      .get("/getuser", {
        headers: { authorization: localStorage.getItem("token") }
      })
      .then(response => {
        dispatch({
          type: AUTH_USER
        });
      })
      .catch(err => {
        dispatch({
          type: UNAUTH_USER
        });
      });
  };
};
