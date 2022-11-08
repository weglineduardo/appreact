import React, { useState, useEffect, useRef, useContext } from "react";
import axios, { AxiosResponse } from "axios";

import { useNavigate } from "react-router-dom";
import { iUsuario } from "../interfaces/usuario";
import "../../node_modules/bootswatch/dist/journal/bootstrapDev.css";
import "bootswatch/dist/js/bootstrap";

import { JsonConvert, ValueCheckingMode } from "json2typescript";
import { UsuarioContext } from "../context/usuarioContext";
import AlertDanger from "../screean/alertDanger";

function Login() {
  const { user_id } = useContext(UsuarioContext);
  const [inputUsuario, setInputUsuario] = useState("");
  const [inputPass, setInputPass] = useState("");
  const [show, setShow] = useState(false);

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

  const [bredirect, setBredirect] = useState(false);
  const [isLogin, setLogin] = useState(false);
  const [serviceLogin, setServiceLogin] = useState("");
  const [usuario, setUsuario] = useState<iUarioActivo>();
  let jsonConvert: JsonConvert = new JsonConvert();
  //#region

  //#region Login
  const [visibilidad, setVisibilidad] = useState(false);
  const traercomponente = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    console.log(visibilidad);
    setVisibilidad(!visibilidad);

    console.log(visibilidad);
  };

  const fetchLoginService = () => {
    //console.log(inputUsuario, inputPass);
    loginFetch(inputUsuario, inputPass).then(() => setBredirect(true));
    usuarioActivo();
    setBredirect(false);

    if (!bredirect) {
      return navigateTo("home");
    }
  };

  const loginFetch = async (username: string, password: string) => {
    loginFechToBonita(username, password);

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
  //#endregion
  //#region usuario activo
  const usuarioActivo = async () => {
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

        let rr = jsonConvert.deserializeObject(result.data, rs);
        //console.log("rr", usuario ? usuario.branding_version : "sin datos");
        console.log(result.data);
        window.localStorage.setItem("usuario", JSON.stringify(result.data));
        window.localStorage.setItem("rr", JSON.stringify(rr));
        let storrageUser = JSON.stringify(
          window.localStorage.getItem("usuario")
        );
      })
      .catch((error) => {
        //window.localStorage.removeItem("usuario");
        console.log(error);
      });
    return;
  };
  //#endregion
  const showAlert = (msjAlert: string, msj: string) => {
    if (show) {
      return <AlertDanger msj={msjAlert} />;
    } else {
      return <p>{msj}</p>;
    }
  };
  const navigate = useNavigate();

  const navigateTo = (routeUrl: string) => {
    const url = `/${routeUrl}`;
    navigate(url);
  };

  return (
    <>
      <div className="position-absolute top-50 start-50 translate-middle ">
        {" "}
        <div className="login-container ">
          {" "}
          <div className="">
            {" "}
            <div className=" shadow p-2 mb-3 bg-secundary ">
              <div className="card text-white bg-primary mb-3">
                {showAlert("NO hemos logrado identificarte", "")}
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
                            placeholder="Usuario"
                            autoComplete="off"
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
                            autoComplete="off"
                            placeholder="Contraseña"
                            onChange={(e) => setInputPass(e.target.value)}
                          />
                        </div>

                        <div className="form-group ">
                          <h4 className="card-title"></h4>
                          <button
                            className="btn btn-succes"
                            onClick={fetchLoginService}
                          >
                            Ingresar
                          </button>

                          {/*<button
                            className="btn btn-succes"
                            onClick={fetchLoginService}
                          >
                            fetchLoginService
                          </button>{visibilidad ? <ButtonComponent /> : null}

                          <button
                            className="btn btn-succes"
                            onClick={traercomponente}
                          >
                            traer componente
                          </button>*/}
                          {/*    
                          <label className="form-label mt-4"></label>
                                                <button
                            className="btn btn-succes"
                            onClick={fetchLoginService}
                          >
                            Ingresar
                          </button>*/}
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

      {/*<LoginFc />*/}
    </>
  );
}

export default Login;
