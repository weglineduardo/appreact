import React from "react";
import logo from "./logo.svg";
import callApi from "./components/callApi";
import Cookies from "universal-cookie";
import "./App.css";

const cookies = new Cookies();
function App() {
  const BASE_URL = process.env.REACT_APP_BASE_URL_API;

  const CallApi = async () => {
    callApi();
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
        <button onClick={CallApi} type="button" className="btn btn-primary">
          Primary
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
