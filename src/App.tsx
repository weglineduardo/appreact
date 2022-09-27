import logo from "./logo.svg";
import bonitaLogin from "./components/bonitaLogin";
import fetchBonitaLogin from "./components/fetchBonitaLogin";
import fetchCase from "./components/fetchCase";
import unusedIdFetch from "./components/unusedIdFetch";

import bonitaCase from "./components/bonitaCase";
import Cookies from "universal-cookie";
import { Cookies as kks } from "react-cookie";
import axios from "axios";
//import cookies from "es-cookie";
import "./App.css";
import { Console } from "console";

function App() {
  const loginService = async () => {
    bonitaLogin();

    //const cookies = new Cookies();
    //const cok = new kks();
    //cok.set("JSESSIONID", "JSESSIONID");
    //cok.set("X-Bonita-API-Token", "X-Bonita-API-Token");
    //cok.set("cookiesuno", "ljljljddddddddljljljljss");

    /*let JSESSIONID = cok.get("JSESSIONID");
    let X_Bonita_API_Token = cok.get("X-Bonita-API-Token");
    cok.set("X-Bonita", "X-Bonita", {
      domain: "http://localhost:8080/",
      httpOnly: false,
    });

    console.log(
      "JSESSIONID, X_Bonita_API_Token  bonitaLogin aqui ",
      JSESSIONID,
      X_Bonita_API_Token
    );
    //cok.set("JSESSIONID", "JSESSIONID");
    console.log(
      "JSESSIONID, X_Bonita_API_Token  bonitaLogin aqui ",
      JSESSIONID,
      X_Bonita_API_Token
    );
    sessionStorage.setItem("JSESSIONID", cok.get("JSESSIONID"));
    sessionStorage.setItem("X-Bonita-API-Token", cok.get("X-Bonita-API-Token"));
    localStorage.setItem("JSESSIONID", cok.get("JSESSIONID"));
    localStorage.setItem("X-Bonita-API-Token", cok.get("X-Bonita-API-Token"));*/
  };
  const unusedIdFechService = async () => {
    unusedIdFetch();
  };
  const fetchLoginService = async () => {
    fetchBonitaLogin();
  };

  const fetchCases = async () => {
    fetchCase();
  };
  const obtenerCookiesNode = async () => {
    // bonitaLogin();

    let config = {
      method: "get",
      mode: "no-cors",
      url: "http://localhost:5300/bonita/login",
      headers: { "Access-Control-Allow-Origin": "http://localhost:443" },
    };
    //https://jsonplaceholder.typicode.com/users/1
    const rst = await axios(config)
      .then(function (res) {
        console.log(" await axios");
        console.log(JSON.stringify(res.data));
        //console.log(res.data);
        const data_array = JSON.stringify(res.data).split(",");
        console.log(data_array[0].split(":")[1].split(","));
        console.log(data_array[1].split(":")[1].split(","));
        const cok = new kks();
        cok.set("JSESSIONID", data_array[0].split(":")[1].split(","));
        cok.set("JSESSIONIDNODE", data_array[0].split(":")[1].split(","));

        cok.set("X-Bonita-API-Token", data_array[1].split(":")[1].split(","));
      })
      .catch(function (error) {
        console.log(error);
      });
    //console.log(rst);

    //const cookies = new Cookies();
    //const cok = new kks();
    //cok.set("JSESSIONID", "JSESSIONID");
    //cok.set("X-Bonita-API-Token", "X-Bonita-API-Token");
    //cok.set("cookiesuno", "ljljljddddddddljljljljss");

    /*let JSESSIONID = cok.get("JSESSIONID");
    let X_Bonita_API_Token = cok.get("X-Bonita-API-Token");
    cok.set("X-Bonita", "X-Bonita", {
      domain: "http://localhost:8080/",
      httpOnly: false,
    });

    console.log(
      "JSESSIONID, X_Bonita_API_Token  bonitaLogin aqui ",
      JSESSIONID,
      X_Bonita_API_Token
    );
    //cok.set("JSESSIONID", "JSESSIONID");
    console.log(
      "JSESSIONID, X_Bonita_API_Token  bonitaLogin aqui ",
      JSESSIONID,
      X_Bonita_API_Token
    );
    sessionStorage.setItem("JSESSIONID", cok.get("JSESSIONID"));
    sessionStorage.setItem("X-Bonita-API-Token", cok.get("X-Bonita-API-Token"));
    localStorage.setItem("JSESSIONID", cok.get("JSESSIONID"));
    localStorage.setItem("X-Bonita-API-Token", cok.get("X-Bonita-API-Token"));*/
  };
  const obtenerCase = async () => {
    const cookies = new Cookies();
    let JSESSIONIDNODE = cookies.get("JSESSIONIDNODE");
    let X_Bonita_API_Token = cookies.get("X-Bonita-API-Token");
    const BASE_URL = process.env.REACT_APP_BASE_URL_API;
    const hs = {
      "Access-Control-Allow-Origin": "http://localhost:443",
      // JSESSIONID: `${JSESSIONIDNODE}`,
      "X-Bonita-API-Token": `${X_Bonita_API_Token}`,
    };
    const endpointc = BASE_URL + "/bonita/API/bpm/case/13001";
    let config = {
      method: "get",
      mode: "no-cors",
      url: endpointc,
      headers: hs,
      //{
      //  "Access-Control-Allow-Origin": "http://localhost:443",
      //  JSESSIONID: `${JSESSIONIDNODE}`,
      //  "X-Bonita-API-Token": `${X_Bonita_API_Token}`,
      //},
    };
    console.log(config);
    //https://jsonplaceholder.typicode.com/users/1
    const rst = await axios(config)
      .then(function (res) {
        console.log(" await axios");
        console.log(JSON.stringify(res.data));
        //console.log(res.data);
        const data_array = JSON.stringify(res.data).split(",");
        console.log(data_array[0].split(":")[1].split(","));
        console.log(data_array[1].split(":")[1].split(","));
        const cok = new kks();
        cok.set("JSESSIONID", data_array[0].split(":")[1].split(","));
        cok.set("JSESSIONIDNODE", data_array[0].split(":")[1].split(","));

        cok.set("X-Bonita-API-Token", data_array[1].split(":")[1].split(","));
      })
      .catch(function (error) {
        console.log(error);
      });
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
    bonitaLogin();
  };
  /*const r = CallApi();
  console.log(r);
  console.log(cookies.get("myCat")); // Pacman
  console.log(cookies.get("JSESSIONID"));
  console.log(cookies.get("X-Bonita-API-Token"));
  cookies.set("synbonitalab ", "synbonitalab", {
    path: "https://synbonitalab.az.synchro.ar",
  });
  console.log(document.cookie);
  console.log("cookies.getAll()::", cookies.getAll());
  */

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <button
          onClick={obtenerCookiesNode}
          type="button"
          className="btn btn-primary"
        >
          Obtener cookies Node
        </button>
        <button
          onClick={fetchLoginService}
          type="button"
          className="btn btn-primary"
        >
          Fetch Login
        </button>
        <button
          onClick={unusedIdFechService}
          type="button"
          className="btn btn-primary"
        >
          Fetch unusedId
        </button>
        <button onClick={fetchCases} type="button" className="btn btn-primary">
          Case fetch
        </button>
        <button
          onClick={loginService}
          type="button"
          className="btn btn-primary"
        >
          Login
        </button>
        <button onClick={obtenerCase} type="button" className="btn btn-primary">
          Get case
        </button>
        <button onClick={getProcess} type="button" className="btn btn-primary">
          Get process
        </button>
      </header>

      <div
        className="btn-group"
        role="group"
        aria-label="Basic radio toggle button group"
      >
        <input
          type="radio"
          className="btn-check"
          name="btnradio"
          id="btnradio1"
          checked={true}
        />
        <label className="btn btn-outline-primary">Radio 1</label>
        <input
          type="radio"
          className="btn-check"
          name="btnradio"
          id="btnradio2"
          checked={true}
        />
        <label className="btn btn-outline-primary">Radio 2</label>
        <input
          type="radio"
          className="btn-check"
          name="btnradio"
          id="btnradio3"
          checked={true}
        />
        <label className="btn btn-outline-primary">Radio 3</label>
      </div>

      <div className="btn-group-horizontal">
        <button type="button" className="btn btn-primary">
          Button
        </button>
        <button type="button" className="btn btn-primary">
          Button
        </button>
        <button type="button" className="btn btn-primary">
          Button
        </button>
        <button type="button" className="btn btn-primary">
          Button
        </button>
        <button type="button" className="btn btn-primary">
          Button
        </button>
        <button type="button" className="btn btn-primary">
          Button
        </button>
      </div>
    </div>
  );
}

export default App;
