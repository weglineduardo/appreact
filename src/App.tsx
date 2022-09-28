import logo from "./logo.svg";
import bonitaLogin from "./components/bonitaLogin";
import fetchBonitaLogin from "./components/fetchBonitaLogin";
import fetchCase from "./components/fetchCase";
import unusedIdFetch from "./components/unusedIdFetch";
import React, { useState } from "react";
import bonitaCase from "./components/bonitaCase";
import Cookies from "universal-cookie";
import { Cookies as kks } from "react-cookie";
import axios from "axios";
import "./App.css";

const setuse = () => {};
function App() {
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

    /*axios
      .get("https://jsonplaceholder.typicode.com/users/1")
      .then((response) => {
        console.log(response.data);
      })
      .catch((err) => console.log(err));*/
  };

  /*
    await axios({
      method: "post",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE",
        "Access-Control-Allow-Headers": "Content-Type",
      },
      url: endpoint,
    })
      .then(function (response) {
        console.log(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
      
        };*/

  const loginService = async () => {
    axioslogin();
    //bonitaLogin();

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
      headers: { "Access-Control-Allow-Origin": "*" },
    };
    //https://jsonplaceholder.typicode.com/users/1
    const rst = await axios(config)
      .then(function(res) {
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
      .catch(function(error) {
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
  /////////////////////
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
      .get("/bonita/API/bpm/case/3001")
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
    console.log(
      "axios.defaults.headers axios obtenercase",
      axios.defaults.headers
    );

    ////////////
    axios
      .get(
        "/bonita/API/bpm/case?p=0&c=10&f=processDefinitionId=6726087166707818640"
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
    //bonitaLogin();
    obtenerProcess();
  };

  const Message = () => {
    const [count, setCount] = useState(0);
    setCount(15);
    const messageState = useState("");
    const listState = useState([]);
  };

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
