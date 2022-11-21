import axios, { AxiosResponse } from "axios";
import React, { useState, useEffect } from "react";

import { iUsuario } from "../interfaces/usuario";
import "../../node_modules/bootswatch/dist/journal/bootstrapDev.css";
import "bootswatch/dist/js/bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { AppStore } from "../redux/store";
import { createUser, resetUser } from "../redux/states/usuarioActivo.state";

//import "../App.css";

function NavBar() {
  const localStorageUsuario = window.localStorage.getItem("usuario");
  const userName = localStorageUsuario?.split(",")[5].split(":")[1];

  const userState = useSelector((store: AppStore) => store.usuarioActivo);
  const dispatch = useDispatch();
  type iUarioActivo = iUsuario;
  const [serviceLogin, setServiceLogin] = useState("");
  let [usuario, setUsuario] = useState<iUarioActivo>();
  const [caseList, setCaseList] = useState([]);

  //#region Login
  const fetchLoginService = async () => {
    loginFetch("walter.bates", "bpm");
    usuarioActivo();
    //      window.localStorage.setItem("usuario", JSON.stringify(resp.data));

    const localStorageUsuario = window.localStorage.getItem("usuario");
    console.log({ localStorageUsuario });
    await dispatch(createUser(usuario));
    //dispatch(createUser(JSON.stringify(localStorageUsuario)));

    //console.log({ userState });
    //console.log(userState);
    //setServiceLogin("Login Success " + { localStorageUsuario });
  };

  const loginFetch = async (username: string, password: string) => {
    loginFechToBonita(username, password);
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
        process.env.REACT_APP_BASE_URL_API +
        "" +
        process.env.REACT_APP_API_LOGINSERVICE;

      await fetch(BASE_URL, RequestInit)
        .then((result) => {
          if (!result.ok) {
            setServiceLogin("Error de Login");
            throw Error(result.status.toString());
          }

          console.log(result);
          //return result;
        })
        .catch((error) => {
          console.log("error fetch", error);
          //return error;
        });

      return;
    }
  };
  //#endregion

  //#region logout
  const loginOut = async () => {
    axiosLogOut();
  };
  const axiosLogOut = async () => {
    const endpoint =
      "http://localhost:8080/bonita/logoutservice?redirect=false";

    axios.defaults.baseURL = process.env.REACT_APP_BASE_URL_API;
    axios.defaults.headers.post["Content-Type"] =
      "application/json;charset=utf-8";
    axios.defaults.headers.post["Access-Control-Allow-Origin"] = "*";
    axios.defaults.withCredentials = true;
    await axios
      .get("/bonita/logoutservice?redirect=false")
      .then((resp) => {
        window.localStorage.removeItem("setServiceLogin");
        window.localStorage.removeItem("usuario");
        window.localStorage.clear();
        setServiceLogin("");
        setUsuario(undefined);
        console.log(resp);
      })
      .catch((error) => {
        window.localStorage.removeItem("setServiceLogin");
        window.localStorage.removeItem("usuario");
        setServiceLogin(error);
        console.log(error);
      });

    dispatch(resetUser());
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
        //dispatch(createUser(JSON.stringify(usuario)));

        //console.log("usuario usuario :", usuario);
        setServiceLogin("Login Success " + usuario?.user_name);

        console.log(resp.data);
      })
      .catch((error) => {
        setServiceLogin("Login No Success");
        console.log(error);
      });

    await dispatch(createUser(usuario));
    // await dispatch(createUser(usuario));
    return;
  };
  useEffect(() => {
    usuarioActivo();
  }, []);
  //#endregion

  //#region case

  //#endregion

  //#region case-list

  //#endregion

  //#region otro
  //#endregion

  //#region otro
  //#endregion

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">
            Portal
          </a>

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarColor01"
            aria-controls="navbarColor01"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarColor01">
            <ul className="navbar-nav me-auto">
              <li className="nav-item">
                <a className="nav-link active" href="/home">
                  Home
                  <span className="visually-hidden">(current)</span>
                </a>
              </li>
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle"
                  data-bs-toggle="dropdown"
                  href="#"
                  role="button"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  Tareas
                </a>
                <div className="dropdown-menu" id="usuario">
                  <a className="dropdown-item" href="/tareas">
                    Todas las tareas
                  </a>

                  <div>
                    <li className="dropdown-submenu">
                      <a className="dropdown-item dropdown-toggle" href="">
                        Buscar tarea
                      </a>
                      <ul className="dropdown-menu">
                        <li className="dropdown-submenu">
                          <a className="dropdown-item dropdown-toggle" href="#">
                            Abiertos
                          </a>
                          <ul className="dropdown-menu">
                            <li>
                              <a className="dropdown-item" href="/casebyid">
                                Por id
                              </a>
                            </li>
                            <li>
                              <a
                                className="dropdown-item"
                                href="/caseByNameProcess"
                              >
                                Por proceso
                              </a>
                            </li>
                          </ul>
                        </li>
                        <li className="dropdown-submenu">
                          <a className="dropdown-item dropdown-toggle" href="#">
                            Cerradas
                          </a>
                          <ul className="dropdown-menu">
                            <li>
                              <a
                                className="dropdown-item"
                                href="/casearchivedbyid"
                              >
                                Por id
                              </a>
                            </li>
                            <li>
                              <a
                                className="dropdown-item"
                                href="/caseArchivedByNameProcess"
                              >
                                Por Proceso
                              </a>
                            </li>
                          </ul>
                        </li>
                      </ul>
                    </li>
                  </div>

                  <div className="dropdown-divider"></div>
                  <a className="dropdown-item" href="#">
                    Ayuda
                  </a>
                </div>
              </li>
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle"
                  data-bs-toggle="dropdown"
                  href="#"
                  role="button"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  Casos
                </a>
                <div className="dropdown-menu" id="usuario">
                  <a className="dropdown-item" href="/app">
                    Todos los casos
                  </a>

                  <div>
                    <li className="dropdown-submenu">
                      <a className="dropdown-item dropdown-toggle" href="">
                        Buscar
                      </a>
                      <ul className="dropdown-menu">
                        {/*<li>
                          <a className="dropdown-item" href="#">
                            Abiertos por id
                          </a>
                        </li>
                        <li>
                          <a className="dropdown-item" href="#">
                            Archivados por id
                          </a>
                         </li>*/}
                        <li className="dropdown-submenu">
                          <a className="dropdown-item dropdown-toggle" href="#">
                            Abiertos
                          </a>
                          <ul className="dropdown-menu">
                            <li>
                              <a className="dropdown-item" href="/casebyid">
                                Por id
                              </a>
                            </li>
                            <li>
                              <a
                                className="dropdown-item"
                                href="/caseByNameProcess"
                              >
                                Por proceso
                              </a>
                            </li>
                          </ul>
                        </li>
                        <li className="dropdown-submenu">
                          <a className="dropdown-item dropdown-toggle" href="#">
                            Archivados
                          </a>
                          <ul className="dropdown-menu">
                            <li>
                              <a
                                className="dropdown-item"
                                href="/casearchivedbyid"
                              >
                                Por id
                              </a>
                            </li>
                            <li>
                              <a
                                className="dropdown-item"
                                href="/caseArchivedByNameProcess"
                              >
                                Por Proceso
                              </a>
                            </li>
                          </ul>
                        </li>
                      </ul>
                    </li>
                  </div>

                  <div className="dropdown-divider"></div>
                  <a className="dropdown-item" href="#">
                    Ayuda
                  </a>
                </div>
              </li>
              <li className="nav-item" onClick={() => usuarioActivo()}>
                <a className="nav-link" href="#">
                  Usuario activo
                </a>
              </li>
              <li className="nav-item" onClick={fetchLoginService}>
                <a className="nav-link" href="#">
                  Login
                </a>
              </li>
              {/*
              <li className="nav-item" onClick={getCaseList}>
                <a className="nav-link" href="#">
                  Lista Casos
                </a>
              </li>
              <li className="nav-item" onClick={getCase}>
                <a className="nav-link" href="#">
                  Caso
                </a>
              </li>*/}
              <li className="nav-item" onClick={loginOut}>
                <a className="nav-link" href="/">
                  LogOut
                </a>
              </li>

              <h6 className="text-succes">
                {userName}
                {/* {JSON.stringify(usuario ? usuario.user_name : " ")}*/}
              </h6>
            </ul>
            {/*<form className="d-flex">
      <input
        className="form-control me-sm-2"
        type="text"
        placeholder="Search"
      />
      <button className="btn btn-secondary my-2 my-sm-0" type="submit">
        Search
      </button>
    </form> */}
          </div>
        </div>
      </nav>
    </>
  );
}

export default NavBar;
