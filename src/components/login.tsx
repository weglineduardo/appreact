import React, { useState, useEffect, useRef, useContext } from "react";
import axios, { AxiosResponse } from "axios";
import { useNavigate } from "react-router-dom";
import { iUsuario } from "../interfaces/usuario";
import "../../node_modules/bootswatch/dist/journal/bootstrapDev.css";
import "bootswatch/dist/js/bootstrap";
import { UsuarioContext } from "../context/usuarioContext";
import AlertDanger from "../screean/alertDanger";
import { AppStore } from "../redux/store";
import { useSelector, useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import {
  createUser,
  modifyUser,
  resetUser,
} from "../redux/states/usuarioActivo.state";
import { loginGlpi } from "../apis/public.service";

function Login() {
  const userState = useSelector((store: AppStore) => store.usuarioActivo);
  const dispatch = useDispatch();
  //const {
  //  register,
  //  handleSubmit,
  //  formState: { errors },
  //} = useForm({ defaultvalues: { email: "", pass: "" } });

  const { user_id } = useContext(UsuarioContext);
  const [inputUsuario, setInputUsuario] = useState("");
  const [inputPass, setInputPass] = useState("");
  const [show, setShow] = useState(false);

  let title = React.createRef();
  let refUsuario = useRef(null);
  type iUarioActivo = iUsuario;

  const [bredirect, setBredirect] = useState(false);
  const [isLogin, setLogin] = useState(false);
  const [serviceLogin, setServiceLogin] = useState("");
  const [usuario, setUsuario] = useState<iUarioActivo>();
  //#region

  //#region Login
  const [visibilidad, setVisibilidad] = useState(false);
  const traercomponente = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    console.log(visibilidad);
    setVisibilidad(!visibilidad);

    console.log(visibilidad);
  };

  const fetchLoginService = async () => {
    //console.log(inputUsuario, inputPass);
    await loginFetchGlpi();
    //await loginFetch(inputUsuario, inputPass).then(() => setBredirect(true));
    //await usuarioActivo();

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
  const loginFetchGlpi = async () => {
    // const lglpi = await loginGlpi;
    await glpiloginfech();
    //console.log(lglpi);
    //loginFechToBonita(username, password);
    async function glpiloginfech() {
      let myHeaders = new Headers();
      myHeaders.append(
        "Authorization",
        "'user_token' Qb8ETzMRCBj8E5mV8e83mIpZnbBjssxvsZ7HCyuJ"
      );
      myHeaders.append("App-Token", "JPgp2P6F38ZyWbjM1u8OyCEtXCd8Fj8Cl5KWhtiA");
      const RequestInit: RequestInit = {
        method: "GET",
        headers: {
          Authorization:
            "'user_token' Qb8ETzMRCBj8E5mV8e83mIpZnbBjssxvsZ7HCyuJ",
          "App-Token": "JPgp2P6F38ZyWbjM1u8OyCEtXCd8Fj8Cl5KWhtiA",
          Connection: "keep-alive",
          "Accept-Encoding": "gzip, deflate, br",
          Accept: "*/*",
          "User-Agent": "PostmanRuntime/7.29.0",
          Host: "<calculated when request is sent>",
        },
        redirect: "follow",
      };
      RequestInit.method = "GET";
      console.log(JSON.stringify(RequestInit.headers));
      //console.log(JSON.stringify(RequestInit));

      await fetch(
        "https://glpi.apps.synchro.com.ar/apirest.php/initSession",
        RequestInit
      )
        .then((response) => response.text())
        .then((result) => console.log("result :", result))
        .catch((error) => console.log("error  :", error));
    }
  };
  //#endregion
  //#region usuario activo
  const usuarioActivo = async () => {
    axios.defaults.baseURL = process.env.REACT_APP_BASE_URL_API;
    axios.defaults.headers.post["Content-Type"] =
      "application/json;charset=utf-8";
    axios.defaults.headers.post["Access-Control-Allow-Origin"] = "*";
    axios.defaults.withCredentials = true;

    await axios
      .get("" + process.env.REACT_APP_API_USERACTIVE)
      .then((resp) => {
        setUsuario(resp.data);
        dispatch(createUser(resp.data));
        dispatch(modifyUser(resp.data));
        console.log("usuarioActivo:: ", userState);
        window.localStorage.setItem("usuario", JSON.stringify(resp.data));
      })
      .catch((error) => {
        dispatch(resetUser());
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
