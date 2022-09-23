import logo from "./logo.svg";
import bonitaLogin from "./components/bonitaLogin";
import bonitaCase from "./components/bonitaCase";
import Cookies from "universal-cookie";
import { Cookies as kks } from "react-cookie";
import axios from "axios";
//import cookies from "es-cookie";
import "./App.css";

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

  const obtenerCookiesNode = async () => {
    // bonitaLogin();

    let config = {
      method: "get",
      mode: "no-cors",
      url: "http://localhost:5300/api",
      headers: { "Access-Control-Allow-Origin": "http://localhost:443" },
    };
    //https://jsonplaceholder.typicode.com/users/1
    const rst = await axios(config)
      .then(function (res) {
        console.log(" await axios");
        console.log(JSON.stringify(res.data));
      })
      .catch(function (error) {
        console.log(error);
      });
    console.log(rst);

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
          onClick={loginService}
          type="button"
          className="btn btn-primary"
        >
          Login
        </button>
        <button onClick={getCase} type="button" className="btn btn-primary">
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
