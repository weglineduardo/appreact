import { Navigate } from "react-router-dom";
const { Cookies: kks } = require("react-cookie");
const cok = new kks();
import React, { useState, useContext } from "react";
import { AuthProvider } from "../auth/AuthProvider";
import { iUsuario } from "../interfaces/usuario";
import axios from "axios";

export const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const { user } = useAuth();
  const { login } = useLogin();
  const { usuarioA } = usuarioActivo();
  if (!user) {
    return <Navigate to="/login" />;
  }
  return children;
};
function usuarioActivo(): { usuarioA: boolean } {
  let isUserAct = false;
  const isUsuarios = async () => {
    type iUarioActivo = iUsuario;
    const [usuario, setUsuario] = useState<iUarioActivo>();
    class usuarioActivo {
      "copyright": string;
      "is_guest_user": string;
      "branding_version": string;
      "branding_version_with_date": string;
      "user_id": string;
      "user_name": string;
      "session_id": string;
      "conf": string;
      "is_technical_user": string;
      "version": string;
    }
    axios.defaults.baseURL = process.env.REACT_APP_BASE_URL_API;
    axios.defaults.headers.post["Content-Type"] =
      "application/json;charset=utf-8";
    axios.defaults.headers.post["Access-Control-Allow-Origin"] = "*";
    axios.defaults.withCredentials = true;
    await axios
      .get("" + process.env.REACT_APP_API_USERACTIVE)
      .then((resp) => {
        let result = resp;
        setUsuario(result.data);
        console.log(result.data);
        isUserAct = true;
      })
      .catch((error) => {
        console.log(error);
        isUserAct = false;
      });
    isUserAct = false;
  };

  return { usuarioA: isUserAct };
}
//function useAuth(): { user: iUsuario } {
function useAuth(): { user: boolean } {
  class rs {
    "copyright": string;
    "is_guest_user": string;
    "branding_version": string;
    "branding_version_with_date": string;
    "user_id": string;
    "user_name": string;
    "session_id": string;
    "conf": string;
    "is_technical_user": string;
    "version": string;
  }
  let useract: iUsuario = {
    copyright: "",
    is_guest_user: "",
    branding_version: "",
    branding_version_with_date: "",
    user_id: "",
    user_name: "",
    session_id: "",
    conf: "",
    is_technical_user: "",
    version: "",
  };
  const usuario = window.localStorage.getItem("usuario")
    ? window.localStorage.getItem("usuario")
    : "";

  if (!usuario) {
    return { user: false };
  } else {
    return { user: true };
  }
}
function useLogin(): { login: boolean } {
  const X_Bonita_API_Token = cok.get("X-Bonita-API-Token");

  if (X_Bonita_API_Token != "") {
    return { login: false };
  } else {
    return { login: true };
  }
}
