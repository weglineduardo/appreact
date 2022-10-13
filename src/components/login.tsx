import { Link } from "react-router-dom";
import React, { useState, useEffect, useRef } from "react";
import Cookies from "universal-cookie";
import { Cookies as kks } from "react-cookie";
import axios, { AxiosResponse } from "axios";
import fetchBonitaLogin from "../components/fetchBonitaLogin";
import fetchCase from "../components/fetchCase";
import unusedIdFetch from "../components/unusedIdFetch";

import { iUsuario } from "../interfaces/usuario";
import bonitaCase from "../components/bonitaCase";
import "../../node_modules/bootswatch/dist/yeti/bootstrap.css";
import "bootswatch/dist/js/bootstrap";

import { idText } from "typescript";
import { JsonSerializer } from "typescript-json-serializer";
import { JsonConvert, ValueCheckingMode } from "json2typescript";
function Login() {
  //#region tipos y clases

  const mapDiv = useRef("--");
  const [inputUsuario, setInputUsuario] = useState("");
  const [inputPass, setInputpPass] = useState("");
  const count = useRef(45);

  let title = React.createRef();
  let refUsuario = useRef(null);
  type iUarioActivo = iUsuario;
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
  const [serviceLogin, setServiceLogin] = useState("");
  const [usuario, setUsuario] = useState<iUarioActivo>();
  const [caseList, setCaseList] = useState([]);
  let defaultSerializer = new JsonSerializer();
  let jsonConvert: JsonConvert = new JsonConvert();
  //#region

  //#region Login
  const fetchLoginService = async () => {
    loginFetch(inputUsuario, inputPass);
    usuarioActivo();

    /*usuario?.branding_version &&
      console.log("is_guest_user", usuario?.branding_version);
    const is_guest_user = (usuario?.branding_version, "que onda");
    console.log("is_guest_user", is_guest_user);*/
  };

  const loginFetch = async (username: string, password: string) => {
    loginFechToBonita(username, password);

    const BASE_URL = process.env.REACT_APP_BASE_URL_API;

    async function loginFechToBonita(username: string, password: string) {
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

      const BASE_URL =
        process.env.REACT_APP_BASE_URL_API + "/bonita/loginservice";

      await fetch(BASE_URL, RequestInit)
        .then((result) => {
          if (!result.ok) {
            setServiceLogin("Error de Login");
            throw Error(result.status.toString());
          }
          /*result.json().then((json) => {
            console.log("result.body jsom = ", json);
          });*/
          setServiceLogin("Login Success");

          console.log(result);
          return result;
        })
        .catch((error) => {
          console.log("error fetch", error);
          return error;
        });
    }
  };
  //#endregion
  //#region usuario activo
  const usuarioActivo = async () => {
    axios.defaults.baseURL = "http://localhost:8080";

    axios.defaults.headers.post["Content-Type"] =
      "application/json;charset=utf-8";
    axios.defaults.headers.post["Access-Control-Allow-Origin"] = "*";
    axios.defaults.withCredentials = true;
    axios
      .get("/bonita/API/system/session/unusedId")
      .then((resp) => {
        let result = resp;
        setUsuario(result.data);

        let rr = jsonConvert.deserializeObject(result.data, rs);
        console.log("rr", usuario ? usuario.branding_version : "sin datos");
        console.log(result.data);
      })
      .catch((error) => {
        console.log(error);
      });
    return;
  };
  //#endregion

  return (
    <>
      {" "}
      <div className="position-absolute top-50 start-50 translate-middle ">
        {" "}
        <div className="login-container ">
          {" "}
          <div className="">
            {" "}
            <div className="">
              <div className="card text-white bg-primary mb-3">
                <div className="card-header">Portal </div>
                <div className="card-body">
                  <h4 className="card-title">Login</h4>
                  <div className="">
                    <form>
                      <fieldset>
                        <div className="form-group">
                          <label className="form-label mt-4">Usuario</label>
                          <input
                            type="text"
                            className="form-control"
                            id="usuario"
                            aria-describedby="emailHelp"
                            placeholder="Usuario"
                            onChange={(e) => setInputUsuario(e.target.value)}
                          />
                        </div>
                        <div className="form-group">
                          <label className="form-label mt-4">Contraseña</label>
                          <input
                            itemID="password"
                            type="password"
                            className="form-control"
                            id="password"
                            placeholder="Contraseña"
                            onChange={(e) => setInputpPass(e.target.value)}
                          />
                        </div>

                        <div className="form-group ">
                          <label className="form-label mt-4"></label>

                          <button
                            className="btn btn-succes"
                            onClick={fetchLoginService}
                          >
                            Ingresar
                          </button>
                        </div>
                      </fieldset>
                    </form>
                  </div>
                </div>
              </div>
            </div>{" "}
          </div>{" "}
        </div>
      </div>
    </>
  );
}

export default Login;
