/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState, useContext, useEffect } from "react";
import axios, { AxiosResponse } from "axios";
import { iUsuario } from "../../interfaces/usuario";
const { Cookies: kks } = require("react-cookie");
const cok = new kks();

export const usuarioActivo5 = async (): Promise<AxiosResponse<Response>> => {
  //type iUarioActivo = iUsuario;
  //const [usuario, setUsuario] = useState<iUarioActivo>();
  console.log("usuarioActivo5 ");
  axios.defaults.baseURL = process.env.REACT_APP_BASE_URL_API;
  axios.defaults.headers.post["Content-Type"] =
    "application/json;charset=utf-8";
  axios.defaults.headers.post["Access-Control-Allow-Origin"] = "*";
  axios.defaults.withCredentials = true;
  console.log("usuarioActivo5 ");

  console.log("usuarioActivo5 ");

  await axios
    .get("" + process.env.REACT_APP_API_USERACTIVE)
    .then((resp) => {
      console.log("usuarioActivo5 ");
      //setUsuario(resp.data);
      window.localStorage.setItem("usuario", JSON.stringify(resp.data));
    })
    .catch((error) => {
      console.log("usuarioActivo5 ");
      window.localStorage.removeItem("usuario");
      console.log(error);
    });
  console.log("usuarioActivo5 ");
  return await axios.get<Response>("" + process.env.REACT_APP_API_USERACTIVE);
};

export const loginFetch5 = async (
  username: string,
  password: string
): Promise<AxiosResponse<Response>> => {
  loginFechToBonita(username, password);
  console.log("error loginFetch5 ------", username, password);
  async function loginFechToBonita(username: string, password: string) {
    const BASE_URL = process.env.REACT_APP_BASE_URL_API;
    let urlapi = process.env.REACT_APP_API_LOGINSERVICE;
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

    var urlencoded = new URLSearchParams();
    urlencoded.append("username", username);
    urlencoded.append("password", password);
    urlencoded.append("redirect", "false");

    const RequestInit: RequestInit = {
      method: "POST",
      headers: myHeaders,
      body: urlencoded,
      redirect: "follow",
      credentials: "include",
    };
    RequestInit.method = "POST";

    console.log("error loginFetch5 ------", username, password);

    await fetch(BASE_URL + "" + urlapi, RequestInit)
      .then((result) => {
        if (!result.ok) {
          window.localStorage.removeItem("setServiceLogin");
          window.localStorage.removeItem("usuario");
          //setServiceLogin("Error de Login");
          //setShow(true);
          return;
        }

        const thebody = JSON.stringify(result.body);
        window.localStorage.setItem("setServiceLogin", thebody);
        window.localStorage.setItem("result", JSON.stringify(result.body));
        //setServiceLogin("Login Success " + username);
        //setShow(false);
        return; //axios.get<Response>("" + process.env.REACT_APP_API_LOGINSERVICE);
      })
      .catch((error) => {
        window.localStorage.removeItem("setServiceLogin");
        window.localStorage.removeItem("usuario");
        console.log("error fetch ------", error);

        window.localStorage.setItem("resulterror", JSON.stringify(error));
        //setShow(true);
        return; //axios.get<Response>("" + process.env.REACT_APP_API_LOGINSERVICE);
      });
  }
  return await axios.get<Response>("" + process.env.REACT_APP_API_LOGINSERVICE);
};

export const loginAxios6 = async (username: string, password: string) => {
  let axiosstatus = false;
  axios.defaults.baseURL = process.env.REACT_APP_BASE_URL_API;
  axios.defaults.headers.post["Content-Type"] =
    "application/json;charset=utf-8";
  axios.defaults.headers.post["Access-Control-Allow-Origin"] = "*";
  axios.defaults.withCredentials = true;
  console.log("loginAxios6 103");

  await axios
    .get(
      "" +
        process.env.REACT_APP_API_LOGINSERVICE +
        "?username=" +
        username +
        "&password=" +
        password +
        "&redirect=false"
    )
    .then((resp) => {
      console.log("loginAxios6 116");
      window.localStorage.setItem("loginAxios6", JSON.stringify(resp.status));
      let status = JSON.stringify(resp.status);
      console.log({ status });
      console.log(JSON.stringify(resp));
      if (status === "204") {
        axiosstatus = true;
      }
      //axiosstatus = false;
    })
    .catch((error) => {
      console.log("loginAxios6 123");
      window.localStorage.removeItem("loginAxios6");
      console.log(error);
      axiosstatus = false;
    });
  return axiosstatus;
};

///////////////
export const loginAxios7 = async (
  username: string,
  password: string
): Promise<AxiosResponse<Response>> => {
  axios.defaults.baseURL = process.env.REACT_APP_BASE_URL_API;
  axios.defaults.headers.post["Content-Type"] =
    "application/json;charset=utf-8";
  axios.defaults.headers.post["Access-Control-Allow-Origin"] = "*";
  axios.defaults.withCredentials = true;
  console.log("loginAxios6 103");

  await axios
    .get(
      "" +
        process.env.REACT_APP_API_LOGINSERVICE +
        "?username=" +
        username +
        "&password=" +
        password +
        "&redirect=true"
    )
    .then((resp) => {
      console.log("loginAxios6 116");
      window.localStorage.setItem("loginAxios6", JSON.stringify(resp.status));
      return;
    })
    .catch((error) => {
      console.log("loginAxios6 123");
      window.localStorage.removeItem("loginAxios6");
      console.log(error);
      return;
    });
  console.log("loginAxios6 130");
  return await axios.get<Response>("" + process.env.REACT_APP_API_LOGINSERVICE);
};
const loginFetch = async (username: string, password: string) => {
  loginFechToBonita(username, password);

  async function loginFechToBonita(username: string, password: string) {
    const [inputUsuario, setInputUsuario] = useState("");
    const [inputPass, setInputPass] = useState("");
    type iUarioActivo = iUsuario;
    const [serviceLogin, setServiceLogin] = useState("");
    const [usuario, setUsuario] = useState<iUarioActivo>();
    const [show, setShow] = useState(false);
    const BASE_URL = process.env.REACT_APP_BASE_URL_API;
    let urlapi = process.env.REACT_APP_API_LOGINSERVICE;
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

    var urlencoded = new URLSearchParams();
    urlencoded.append("username", username);
    urlencoded.append("password", password);
    urlencoded.append("redirect", "false");

    const RequestInit: RequestInit = {
      method: "POST",
      headers: myHeaders,
      body: urlencoded,
      redirect: "follow",
      credentials: "include",
    };
    RequestInit.method = "POST";

    await fetch(BASE_URL + "" + urlapi, RequestInit)
      .then((result) => {
        if (!result.ok) {
          window.localStorage.removeItem("setServiceLogin");
          window.localStorage.removeItem("usuario");
          setServiceLogin("Error de Login");
          setShow(true);
          return;
        }

        const thebody = JSON.stringify(result.body);
        window.localStorage.setItem("setServiceLogin", thebody);
        setServiceLogin("Login Success " + username);
        setShow(false);
        return;
      })
      .catch((error) => {
        window.localStorage.removeItem("setServiceLogin");
        window.localStorage.removeItem("usuario");
        console.log("error fetch ------", error);
        setShow(true);
        return;
      });
  }
};
const getUsuarioActivo = async () => {
  type iUarioActivo = iUsuario;
  let iUarioActivo: iUsuario = {
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
  const [usuario, setUsuario] = useState<iUarioActivo>();

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
      window.localStorage.setItem("usuario", JSON.stringify(result.data));
      let storrageUser = JSON.stringify(window.localStorage.getItem("usuario"));
      console.log({ storrageUser });
    })
    .catch((error) => {
      console.log(error);
    });
  return;
};

const getListHumanTask = async (user_id: string) => {
  let [cantHumanTassk, setCantHumanTassk] = useState("0");
  if (user_id != "") {
    let X_Bonita_API_Token = cok.get("X-Bonita-API-Token");
    axios.defaults.baseURL = process.env.REACT_APP_BASE_URL_API;

    axios.defaults.headers.post["Content-Type"] =
      "application/json;charset=utf-8";
    axios.defaults.headers.post["Access-Control-Allow-Origin"] = "*";
    axios.defaults.withCredentials = true;
    axios.defaults.headers.get["X-Bonita-API-Token"] = X_Bonita_API_Token;
    await axios
      .get(
        "" + process.env.REACT_APP_LISTHUMANTASK + user_id + "&f=caseId=28001"
      )
      .then((resp) => {
        console.log(resp.data.length);
        console.log(resp.data);
        setCantHumanTassk(resp.data.length);
      })
      .catch((error: any) => {
        console.log(error);
      });
    return cantHumanTassk;
  } else {
    return cantHumanTassk;
  }
};
const getHumanTaskUserCase = async (user_id: string, case_id: string) => {
  let [humanTaskUserCase, setHumanTaskUserCase] = useState();
  if (user_id != "") {
    let X_Bonita_API_Token = cok.get("X-Bonita-API-Token");
    axios.defaults.baseURL = process.env.REACT_APP_BASE_URL_API;

    axios.defaults.headers.post["Content-Type"] =
      "application/json;charset=utf-8";
    axios.defaults.headers.post["Access-Control-Allow-Origin"] = "*";
    axios.defaults.withCredentials = true;
    axios.defaults.headers.get["X-Bonita-API-Token"] = X_Bonita_API_Token;
    await axios
      .get(
        "" +
          process.env.REACT_APP_LISTHUMANTASK +
          user_id +
          "&f=caseId=" +
          case_id
      )
      .then((resp) => {
        console.log(resp.data.length);
        console.log(resp.data);
        setHumanTaskUserCase(resp.data.length);
      })
      .catch((error: any) => {
        console.log(error);
      });
    return humanTaskUserCase;
  } else {
    return humanTaskUserCase;
  }
};
export default {
  loginFetch,
  getUsuarioActivo,
  getHumanTaskUserCase,
  getListHumanTask,
};
