import Cookies from "universal-cookie";
import { Cookies as kks } from "react-cookie";
import axios, { AxiosResponse } from "axios";
import fetchBonitaLogin from "../components/fetchBonitaLogin";
import fetchCase from "../components/fetchCase";
import unusedIdFetch from "../components/unusedIdFetch";
import React, { useState } from "react";
import bonitaCase from "../components/bonitaCase";
import "../../node_modules/bootswatch/dist/journal/bootstrapDev.css";
import "bootswatch/dist/js/bootstrap";

//import "../App.css";

function NavBar() {
  const [serviceLogin, setServiceLogin] = useState("");

  const hacerUseState = (res: {}) => {
    console.log("hacerUseState", res);

    // IssetLogin(res);
  };

  const fetchLoginService = async () => {
    //fetchBonitaLogin();
    loginFetch();
  };
  const unusedIdFechService = async () => {
    unusedIdFetch();
  };

  const fetchCases = async () => {
    fetchCase();
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
  };
  const getCaseList = async () => {
    obtenerCaseList();
  };
  // localhost:8080/bonita/portal/resource/app/userAppBonita/case-list/API/bpm/process?c=9999&
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
  const obtenerCase = async () => {
    const cookies = new Cookies();
    let JSESSIONIDNODE = cookies.get("JSESSIONIDNODE");
    let X_Bonita_API_Token = cookies.get("X-Bonita-API-Token");
    axios.defaults.baseURL = "http://localhost:8080";

    axios.defaults.headers.post["Content-Type"] =
      "application/json;charset=utf-8";
    axios.defaults.headers.post["Access-Control-Allow-Origin"] = "*";
    axios.defaults.withCredentials = true;
    console.log("X_Bonita_API_Token axios obtenercase", X_Bonita_API_Token);
    console.log(
      "axios.defaults.headers axios obtenercase",
      axios.defaults.headers
    );

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
  const obtenerCaseList = async () => {
    const cookies = new Cookies();
    let JSESSIONIDNODE = cookies.get("JSESSIONIDNODE");
    let X_Bonita_API_Token = cookies.get("X-Bonita-API-Token");
    axios.defaults.baseURL = "http://localhost:8080";

    axios.defaults.headers.post["Content-Type"] =
      "application/json;charset=utf-8";
    axios.defaults.headers.post["Access-Control-Allow-Origin"] = "*";
    axios.defaults.withCredentials = true;
    console.log("X_Bonita_API_Token axios obtenercase", X_Bonita_API_Token);
    //bonita/portal/resource/app/userAppBonita/case-list/API/bpm/case?c=10&p=0&d=processDefinitionId&d=started_by&d=startedBySubstitute&f=user_id=4&n=activeFlowNodes&n=failedFlowNodes&t=0
    // "bonita/portal/resource/app/userAppBonita/case-list/API/bpm/process?c=9999&"
    axios
      .get(
        "bonita/portal/resource/app/userAppBonita/case-list/API/bpm/case?c=10&p=0&d=processDefinitionId&d=started_by&d=startedBySubstitute&f=user_id=4&n=activeFlowNodes&n=failedFlowNodes&t=0"
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

  const usuarioActivo = async () => {
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
      .get("/bonita/API/system/session/unusedId")
      .then((resp) => {
        let result = resp;
        //valorLogin(resp);
        console.log(result);
      })
      .catch((error) => {
        console.log(error);
      });
    return;
  };
  const loginFetch = async () => {
    //logoutservice();
    loginFetchas();
  };

  const loginFetchas = async () => {
    loginFechToBonita();

    const BASE_URL = process.env.REACT_APP_BASE_URL_API;

    async function loginFechToBonita() {
      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

      var urlencoded = new URLSearchParams();
      urlencoded.append("username", "walter.bates");
      urlencoded.append("password", "bpm");
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
            throw Error(result.status.toString());
          }
          /*result.json().then((json) => {
            console.log("result.body jsom = ", json);
          });*/
          setServiceLogin(
            "walter.bates"
            //result.url
            //{result.headers.get("X-Bonita-API-Token")}
            /*JSON.stringify(result.headers.get("X-Bonita-API-Token")) +
              "result.status.toString());"*/
          );

          console.log(result);
          return result;
        })
        .catch((error) => {
          console.log("error fetch", error);
          return error;
        });
    }
  };

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
                <a className="nav-link active" href="#">
                  Home
                  <span className="visually-hidden">(current)</span>
                </a>
              </li>
              <li className="nav-item" onClick={getCaseList}>
                <a className="nav-link" href="#">
                  Lista Casos
                </a>
              </li>
              <li className="nav-item" onClick={obtenerCase}>
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
                  Estadisticas
                </a>
                <div className="dropdown-menu" id="usuario">
                  <a className="dropdown-item" href="#">
                    Item uno
                  </a>
                  <a className="dropdown-item" href="#">
                    Item dos
                  </a>
                  <a className="dropdown-item" href="#">
                    Item tres
                  </a>
                  <div className="dropdown-divider"></div>
                  <a className="dropdown-item" href="#">
                    Item otros
                  </a>
                </div>
              </li>
              <h6>{serviceLogin}</h6>
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
