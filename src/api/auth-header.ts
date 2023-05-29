import {string} from "yup";

export default function bearerToken() {
  const token = localStorage.getItem("token");

  if (token) {
    return "Bearer " + token

  } else {
    return ""
  }
}
