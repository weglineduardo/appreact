import Cookies from "universal-cookie";
import axios, { AxiosResponse } from "axios";
import fetchCase from "../components/fetchCase";
import unusedIdFetch from "../components/unusedIdFetch";
import React, { useState, useEffect } from "react";

import { iUsuario } from "../interfaces/usuario";
import bonitaCase from "../components/bonitaCase";
import "../../node_modules/bootswatch/dist/journal/bootstrapDev.css";
import "bootswatch/dist/js/bootstrap";
import Accordion from "./acordion";
import { idText } from "typescript";
import { JsonSerializer } from "typescript-json-serializer";
import { JsonConvert } from "json2typescript";

//import "../App.css";

function NavBar() {
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

  useEffect(() => {
    //console.log(caseList.forEach((c) => console.log(c)));
  }, [caseList]);

  //#region Login
  const fetchLoginService = async () => {
    loginFetch("walter.bates", "bpm");
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
          setServiceLogin("Login Success " + username);

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

  //#region logout
  const loginOut = async () => {
    axiosLogOut();
  };
  const axiosLogOut = async () => {
    const endpoint =
      "http://localhost:8080/bonita/logoutservice?redirect=false";

    axios.defaults.baseURL = "http://localhost:8080";
    axios.defaults.headers.post["Content-Type"] =
      "application/json;charset=utf-8";
    axios.defaults.headers.post["Access-Control-Allow-Origin"] = "*";
    axios.defaults.withCredentials = true;
    axios
      .get("/bonita/logoutservice?redirect=false")
      .then((resp) => {
        //console.log("resp JSON.stringif = ", JSON.stringify(resp));
        let result = resp; //resp.data;
        setServiceLogin("");
        setUsuario(undefined);
        console.log(result);
      })
      .catch((error) => {
        setServiceLogin(error);
        console.log(error);
      });
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
        /*const rr: iUsuario = result.data;
        const dataz = defaultSerializer.serialize(result.data);
        console.log("dataz", dataz);
        const name = defaultSerializer.deserializeObject<iUarioActivo>(
          result.data,
          rr
        );
        console.log(
          "name",
          name?.session_id,
          name?.session_id,
          "name?.session_id"
        );*/
        /*let resultdata = jsonConvert.deserializeObject<iUsuario>(result.data);
        let leusuario = jsonConvert.deserializeObject<iUsuario>(usuario);

        console.log(resultdata.branding_version_with_date, "stringify");*/

        console.log(result.data);
      })
      .catch((error) => {
        console.log(error);
      });
    return;
  };
  //#endregion

  //#region case
  const getCase = async () => {
    obtenerCase();
  };
  const obtenerCase = async () => {
    const cookies = new Cookies();
    let JSESSIONIDNODE = cookies.get("JSESSIONIDNODE");
    let X_Bonita_API_Token = cookies.get("X-Bonita-API-Token");
    axios.defaults.baseURL = "http://localhost:8080";

    axios.defaults.headers.post["Content-Type"] =
      "application/json;charset=utf-8";
    axios.defaults.headers.post["Access-Control-Allow-Origin"] = "*";
    axios.defaults.withCredentials = true;

    axios
      .get("/bonita/API/bpm/case/4001")
      .then((resp) => {
        let result = resp;
        console.log(result);
      })
      .catch((error) => {
        console.log(error);
      });
    return;
  };
  //#endregion

  //#region case-list
  const getCaseList = async () => {
    obtenerCaseList();
    //obtenercomment();
  };
  const obtenerCaseList = async () => {
    const cookies = new Cookies();
    let JSESSIONIDNODE = cookies.get("JSESSIONIDNODE");
    let X_Bonita_API_Token = cookies.get("X-Bonita-API-Token");
    axios.defaults.baseURL = "http://localhost:8080";

    axios.defaults.headers.post["Content-Type"] =
      "application/json;charset=utf-8";
    axios.defaults.headers.post["Access-Control-Allow-Origin"] = "*";
    axios.defaults.withCredentials = true;
    axios
      .get(
        "/bonita/portal/resource/app/userAppBonita/case-list/API/bpm/case?c=10&p=0&d=processDefinitionId&d=started_by&d=startedBySubstitute&f=user_id=4&n=activeFlowNodes&n=failedFlowNodes&t=0"
      )
      .then((resp) => {
        let result = resp;
        setCaseList(result.data);
        console.log(result.data);
        console.log(caseList.forEach((c) => console.log(c)));

        console.log(result.data[0]);
        const esta =
          result &&
          result.data &&
          result.data.map((element: any, index: any) => {
            console.log("result.data", element);
            console.log(
              "result.data.json.stringfy",
              JSON.stringify(element, null, "---")
            );
          });

        // here you should see your data })
        /* const inp = async () => {
          await console.log(caseList.forEach((c) => console.log(c)));
        };*/

        /*setCaseList(result.data);
        console.log(" caseList ---", caseList);
        setCaseList(result.data);
        const data_array = caseList;
        caseList.find((item) => item. === id);
        caseList.filter((hero) => hero.publisher === publisher)
        console.log(setCaseList);*/
        //console.log(data_array[0]);
        /*console.log(data_array[1].split(":")[1].split(","));
        const { never } = caseList;
        const { Detalles } = never[0];
        const { Descripcion } = caseList[0].split(":")[1].split(",");*/
        //const todoItems = caseList.map(());
        // const[...]=caseList;
        //console.log(" caseList[0] ---", caseList[0]);
      })
      .catch((error: any) => {
        console.log(error);
      });
    return;
  };

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
              <li className="nav-item" onClick={getCaseList}>
                <a className="nav-link" href="#">
                  Lista Casos
                </a>
              </li>
              <li className="nav-item" onClick={getCase}>
                <a className="nav-link" href="#">
                  Caso
                </a>
              </li>
              <li className="nav-item" onClick={loginOut}>
                <a className="nav-link" href="#">
                  LogOut
                </a>
              </li>
              <li className="nav-item" onClick={usuarioActivo}>
                <a className="nav-link" href="#">
                  Usuario activo
                </a>
              </li>
              <li className="nav-item" onClick={fetchLoginService}>
                <a className="nav-link" href="#">
                  Login
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
                              <a className="dropdown-item" href="casebyid">
                                Por id
                              </a>
                            </li>
                            <li>
                              <a
                                className="dropdown-item"
                                href="caseByNameProcess"
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
                                href="casearchivedbyid"
                              >
                                Por id
                              </a>
                            </li>
                            <li>
                              <a
                                className="dropdown-item"
                                href="caseArchivedByNameProcess"
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
              <h6 className="text-succes">
                {serviceLogin}
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

/*  


  // localhost:8080/bonita/portal/resource/app/userAppBonita/case-list/API/bpm/process?c=9999&
  const logoutservice = async () => {
    const endpoint =
      "http://localhost:8080/bonita/logoutservice?redirect=false";

    axios.defaults.baseURL = "http://localhost:8080";
    axios.defaults.headers.post["Content-Type"] =
      "application/json;charset=utf-8";
    axios.defaults.headers.post["Access-Control-Allow-Origin"] = "*";
    axios.defaults.withCredentials = true;
    axios
      .get("/bonita/logoutservice?redirect=false")
      .then((resp) => {
        let result = resp;
        setServiceLogin(JSON.stringify(result.status));
        console.log(result);
      })
      .catch((error) => {
        setServiceLogin(error);
        console.log(error);
      });
  };

  const axiosGetCaseList = async () => {
    const cookies = new Cookies();
    let JSESSIONIDNODE = cookies.get("JSESSIONIDNODE");
    let X_Bonita_API_Token = cookies.get("X-Bonita-API-Token");
    axios.defaults.baseURL = "http://localhost:8080";

    axios.defaults.headers.post["Content-Type"] =
      "application/json;charset=utf-8";
    axios.defaults.headers.post["Access-Control-Allow-Origin"] = "*";
    axios.defaults.withCredentials = true;
    console.log("X_Bonita_API_Token axios obtenercase", X_Bonita_API_Token);

    ////////////
    axios
      .get("/bonita/API/bpm/case/4001")
      .then((resp) => {
        let result = resp;

        console.log(result);
      })
      .catch((error) => {
        console.log(error);
      });
    return;
  };

  const obtenerProcess = async () => {
    const cookies = new Cookies();
    let JSESSIONIDNODE = cookies.get("JSESSIONIDNODE");
    let X_Bonita_API_Token = cookies.get("X-Bonita-API-Token");
    axios.defaults.baseURL = "http://localhost:8080";

    axios.defaults.headers.post["Content-Type"] =
      "application/json;charset=utf-8";
    axios.defaults.headers.post["Access-Control-Allow-Origin"] = "*";
    axios.defaults.withCredentials = true;
    console.log("X_Bonita_API_Token axios obtenercase", X_Bonita_API_Token);

    ////////////
    axios
      .get(
        "/bonita/API/bpm/case?p=0&c=10&f=processDefinitionId=6523828445512427595" //"6523828445512427595"
      )
      .then((resp) => {
        let result = resp;
        console.log(result);
      })
      .catch((error) => {
        console.log(error);
      });
    return;
  };

  const axioslogin = async () => {
    const endpoint =
      "http://localhost:8080/bonita/loginservice?username=walter.bates&password=bpm&redirect=true";

    axios.defaults.baseURL = "http://localhost:8080";
    axios.defaults.headers.post["Content-Type"] =
      "application/json;charset=utf-8";
    axios.defaults.headers.post["Access-Control-Allow-Origin"] = "*";
    axios
      .get(
        "/bonita/loginservice?username=walter.bates&password=bpm&redirect=true"
      )
      .then((resp) => {
        //console.log("resp JSON.stringif = ", JSON.stringify(resp));

        let result = resp; //resp.data;
        console.log(result);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const loginService = async () => {
    axioslogin();
    const cok = new kks();

    sessionStorage.setItem("JSESSIONID", cok.get("JSESSIONID"));
    sessionStorage.setItem("X-Bonita-API-Token", cok.get("X-Bonita-API-Token"));
    localStorage.setItem("JSESSIONID", cok.get("JSESSIONID"));
    localStorage.setItem("X-Bonita-API-Token", cok.get("X-Bonita-API-Token"));
  };
  const fetchCases = async () => {
    fetchCase();
  };

  const unusedIdFechService = async () => {
    unusedIdFetch();
  };
const getCase = async () => {
    const cookies = new Cookies();
    //let JSESSIONID = cookies.get("JSESSIONID");
    let JSESSIONID = cookies.get("JSESSIONIDNODE");
    let X_Bonita_API_Token = cookies.get("X-Bonita-API-Token");
    console.log(
      "JSESSIONID, X_Bonita_API_Token  getcase aqui ",
      JSESSIONID,
      X_Bonita_API_Token
    );

    //console.log("cookies.getAll()", cookies.getAll());
    bonitaCase(JSESSIONID, X_Bonita_API_Token);
  };
  const getProcess = async () => {
    obtenerProcess();
  };*/
