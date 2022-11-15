import React, { useState, useContext } from "react";
import AcordionCards from "../components/acordionCards";

import Cookies from "universal-cookie";
import NavBar from "./navBar";
import axios from "axios";
import { AppContext } from "../AppRouterV1";
import { useSelector } from "react-redux";
import { AppStore } from "../redux/store";
import { StartedBy } from "../interfaces/archivedCase";
const { Cookies: kks } = require("react-cookie");
const cok = new kks();

const Home = () => {
  const valorFronContex = React.useContext(AppContext);
  let [processId, setProcessId] = useState("");

  const userState = useSelector((store: AppStore) => store.usuarioActivo);

  const loginFetchGlpi = async (username: string, password: string) => {
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
          App_Token: "JPgp2P6F38ZyWbjM1u8OyCEtXCd8Fj8Cl5KWhtiA",
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
  ///
  return (
    <>
      <div className="App">
        <NavBar />
        <AcordionCards />
        <button onClick={() => loginFetchGlpi}>glpi</button>
      </div>
    </>
  );
};

export default Home;
