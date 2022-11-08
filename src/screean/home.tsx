import React, { useState, useContext } from "react";
import AcordionCards from "../components/acordionCards";

import Cookies from "universal-cookie";
import NavBar from "./navBar";
import axios from "axios";
const { Cookies: kks } = require("react-cookie");
const cok = new kks();

function Home() {
  let [processId, setProcessId] = useState("");
  console.log("processId 1", processId);

  const login = async (
    sprocessId: string,
    isetProcessId: React.Dispatch<React.SetStateAction<string>>
  ) => {
    const BASE_URL =
      process.env.REACT_APP_BASE_URL_API +
      "" +
      process.env.REACT_APP_API_LOGINSERVICE;
    const bodyParameters = {
      username: "walter.bates",
      password: "bpm",
      redirect: "false",
    };
    const cookies = new Cookies();
    let X_Bonita_API_Token = cookies.get("X-Bonita-API-Token");

    axios.defaults.baseURL = process.env.REACT_APP_BASE_URL_API;

    axios.defaults.headers.common["Content-Type"] =
      "application/x-www-form-urlencoded";
    axios.defaults.headers.common["Access-Control-Allow-Origin"] = "*";
    axios.defaults.headers.common["Access-Control-Allow-Credentials"] = true;
    axios.defaults.headers.common["Access-Control-Allow-Headers"] =
      "Origin, X-Requested-With, Content-Type, Accept";
    // axios.defaults.withCredentials = true;

    //axios.defaults.headers.get["X-Bonita-API-Token"] = X_Bonita_API_Token;
    const config = {
      //headers: { "X-Bonita-API-Token": X_Bonita_API_Token },
      //redirect: "follow",
      //withCredentials: true,
    };
    await axios
      .post("" + process.env.REACT_APP_API_LOGINSERVICE, bodyParameters, config)
      .then(console.log)
      .catch(console.log);
  };

  const createcase = async (
    sprocessId: string,
    isetProcessId: React.Dispatch<React.SetStateAction<string>>
  ) => {
    getProcessName("ServiceRequest");
    console.log("processId createcase :", sprocessId);
    usuarioActivo();
    console.log("sprocessId :", sprocessId);
    if (sprocessId == "") {
      console.log("sprocessId vacio ", sprocessId);
      getProcessName("ServiceRequest");
      createCaseBonitaFechOk(sprocessId);
      console.log("if () :", sprocessId);
    } else {
      createCaseBonitaFechOk(sprocessId);
      console.log(" else createCaseBonitaFechOk:", sprocessId);
    }
    console.log("createCaseBonitaFechOk : ", processId);
  };
  const createCaseBonitaFechOk = async (processId: string) => {
    if (processId === "") {
      console.log("llego vacio el processID : ", processId);
      return;
    }
    const X_Bonita_API_Token = cok.get("X-Bonita-API-Token");
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("X-Bonita-API-Token", X_Bonita_API_Token);
    var urlencoded = new URLSearchParams();

    const raw = JSON.stringify({
      serviceRequestInput: {
        alarma: "ida hoyincidente 31102022",
        descripcion: "dia hoy 31102022 inicidente",
        prioridad: "Alta",
        estado: "",
      },
    });
    const RequestInit: RequestInit = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
      credentials: "include",
    };
    RequestInit.method = "POST";

    const BASE_URL =
      process.env.REACT_APP_BASE_URL_API +
      "/bonita/API/bpm/process/" +
      processId +
      "/instantiation";
    //console.log("RequestInit", RequestInit);

    await fetch(BASE_URL, RequestInit)
      .then((result) => {
        if (!result.ok) {
          console.log("!result.ok", result);
          return;
        }

        window.localStorage.setItem(
          "createCaseBonitaFechOk",
          JSON.stringify(result.body)
        );
        console.log(result);
        console.log(result.body);
        return;
      })
      .catch((error) => {
        console.log("error fetch ------", error);
        return;
      });
    return;
  };

  const usuarioActivo = async () => {
    axios.defaults.headers.post["Content-Type"] =
      "application/json;charset=utf-8";
    axios.defaults.headers.post["Access-Control-Allow-Origin"] = "*";
    axios.defaults.withCredentials = true;

    await axios
      .get("" + process.env.REACT_APP_API_USERACTIVE)
      .then((resp) => {
        let result = resp;

        console.log(result.data);
        window.localStorage.setItem("usuario", JSON.stringify(result.data));
        let storrageUser = JSON.stringify(
          window.localStorage.getItem("usuario")
        );
        return;
      })
      .catch((error) => {
        console.log(error);

        return;
      });
    return;
  };
  const getProcessName = async (processName: string) => {
    console.log("processName: string", processName);
    if (processName != "") {
      const cookies = new Cookies();
      let JSESSIONIDNODE = cookies.get("JSESSIONIDNODE");
      let X_Bonita_API_Token = cookies.get("X-Bonita-API-Token");
      axios.defaults.baseURL = process.env.REACT_APP_BASE_URL_API;

      axios.defaults.headers.post["Content-Type"] =
        "application/json;charset=utf-8";
      axios.defaults.headers.post["Access-Control-Allow-Origin"] = "*";
      axios.defaults.withCredentials = true;
      axios.defaults.headers.get["X-Bonita-API-Token"] = X_Bonita_API_Token;
      await axios
        .get("/bonita/API/bpm/process?c=10&p=0&f=name=" + processName)
        .then((resp) => {
          let result = resp;
          setProcessId(resp.data[0].id);
        })
        .catch((error: any) => {
          console.log("processName: string", processName);
          console.log(error);
        });
      return;
    } else {
      console.log("processName: string", processName);
      return;
    }
  };

  ///
  return (
    <>
      <div className="App">
        <NavBar />
        {/*<Cards />*/}
        <AcordionCards />

        <header className="App-header">
          {/*
                  <button onClick={() => login(processId, setProcessId)}>
          create case
        </button><img src={logo} className="App-logo" alt="logo" />
         <Accordion key={"hero.id"} />*/}
        </header>
      </div>
    </>
  );
}

export default Home;
