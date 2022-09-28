//import { useContext, useState } from "react";

const axios = require("axios");
//const Cookies = require("universal-cookie");
//const cookies = require("es-cookie");
const { Cookies: kks } = require("react-cookie");
const cok = new kks();

class BonitaApi {
  async login() {
    try {
      const endpoint =
        "http://localhost:8080" +
        "/bonita/loginservice?username=walter.bates&password=bpm&redirect=false";
      const intance = axios.create({
        baseURL: endpoint,
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          "Access-Control-Allow-Origin": "*",
        },
      });
      const resb = await intance
        .post
        // "/bonita/loginservice?username=walter.bates&password=bpm&redirect=false"
        ();
      const hederResp = resb.headers["set-cookie"]
        ? resb.headers["set-cookie"]
        : [];
      const JSESSIONIDNODE = hederResp[1]
        .split(";")[0]
        .split(",")[0]
        .split("=")[1];
      const XBonitaAPIToken = hederResp[2]
        .split(";")[0]
        .split(",")[0]
        .split("=")[1];
      console.log(JSESSIONIDNODE, XBonitaAPIToken);
      const data = [JSESSIONIDNODE, XBonitaAPIToken];
      this.almacenarCookies();
      return { JSESSIONIDNODE, XBonitaAPIToken };
    } catch (error) {
      console.log("error **********", error);
      return { error };
    }
  }

  async loginbkp() {
    let sId = "";
    let token = "";
    // return;
    const BASE_URL = process.env.REACT_APP_BASE_URL_API;
    const endpoint =
      BASE_URL +
      "/bonita/loginservice?username=walter.bates&password=bpm&redirect=true";
    let her = {
      /* "Content-Type": "application/json;charset=utf-8",
      Cookie: `JSESSIONID=${JSESSIONID};X_Bonita_API_Token=${X_Bonita_API_Token}; bonita.tenant=1; BOS_Locale=en`,*/
    };
    her = {
      "conntent-Type": "application/x-www-form-urlencoded",
      Cookie:
        "bonita.tenant=1; BOS_Locale=es ;X-Bonita-API-Token=%5B%22%5C%22ebcb520a-9862-449b-8276-9679650805d9%5C%22%7D%22%5D; JSESSIONID=5F7CCBE3B3C4A9B6BA5A87B21315FED2",
    };

    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

    const urlencoded = new URLSearchParams();
    urlencoded.append("username", "walter.bates");
    urlencoded.append("password", "bpm");
    urlencoded.append("redirect", "false");

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: urlencoded,
      redirect: "follow",
      credentials: "include",
    };
    const endpoints =
      process.env.REACT_APP_BASE_URL_API + "/bonita/loginservice";

    /*const intance = axios.create({
      baseURL: BASE_URL, //"https://jsonplaceholder.typicode.com/users/1", //
      mode: "no-cors",
      withCredentials: "true",
      headers: myHeaders /*{
        "Content-Type": "application/x-www-form-urlencoded",
        //"Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, HEAD, POST, OPTIONS",
        "Access-Control-Allow-Origin":
          "http://localhost:443,https://localhost:443",
      },
  });
  */

    const intance = axios.create(endpoints, requestOptions);
    const intancec = axios.create({
      baseURL: endpoints,
      headers: her,
    });
    //console.log(intance);
    let res;
    try {
      res = await intance.post();

      console.log("res.headers aqui :", res.headers);
      console.log("res.status aqui :", res.status);
      console.log("res.headers.connection aqui :", res.headers.connection);

      console.log(
        "res.status set-cookie JSESSIONID aqui :",
        res.headers["set-cookie"][1] //["JSESSIONID"]
      );
      console.log(
        "res.status set-cookie X-Bonita-API-Token aqui :",
        res.headers["set-cookie"][2] //["X-Bonita-API-Token"]
      );

      let JSESSIONID = res.headers["set-cookie"][1].split(";");
      let setcookie = res.headers["set-cookie"][2].split(";");
      console.log(JSESSIONID);

      console.log(JSESSIONID[0]);
      console.log(setcookie[0]);

      sId = JSESSIONID[0];
      token = setcookie[0];
      //console.log(res);
      const sheaders = {
        "Content-type": "application/json;charset=utf-8",
        Cookie: `${sId};${token}; bonita.tenant=1; BOS_Locale=en`,
      };

      console.log("sheaders ::", sheaders);
    } catch {
      console.log("catch await intance.get()");
    }
    //lemos cookie del response y almacenamos local y session storage
    this.almacenarCookies();
  }
  almacenarCookies = () => {
    console.log("almacenar coolies ");
    localStorage.setItem("JSESSIONID", cok.get("JSESSIONID"));
    localStorage.setItem("X-Bonita-API-Token", cok.get("X-Bonita-API-Token"));
    sessionStorage.setItem("JSESSIONID", cok.get("JSESSIONID"));
    sessionStorage.setItem("X-Bonita-API-Token", cok.get("X-Bonita-API-Token"));
  };

  async case(JSESSIONID, X_Bonita_API_Token) {
    const BASE_URL = process.env.REACT_APP_BASE_URL_API;

    const endpointc = BASE_URL + "/bonita/API/bpm/case/3001";
    console.log("endpointc case aqui ", endpointc);
    console.log(
      "async case(JSESSIONID, X_Bonita_API_Toke) ",
      JSESSIONID,
      X_Bonita_API_Token
    );

    try {
      const BASE_URL = process.env.REACT_APP_BASE_URL_API;

      const endpointc = BASE_URL + "/bonita/API/bpm/case/3001";

      let her = {
        "Content-Type": "application/json;charset=utf-8",
        Cookie: `JSESSIONID=${JSESSIONID};X_Bonita_API_Token=${X_Bonita_API_Token}; bonita.tenant=1; BOS_Locale=en`,
      };
      her = {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "X-Bonita-API-Token": `${X_Bonita_API_Token}`,
      };
      /*  "Content-type",
                "application/json",
                "Cookie",
                `bonita.tenant=1; BOS_Locale=es; X-Bonita-API-Token=${X_Bonita_API_Token}`;*/
      console.log("her==", her);
      const intancec = axios.create({
        baseURL: endpointc,
        headers: her,
      });

      const res = await intancec.get();
      console.log("res.status case aqui ", res.status);
      console.log("res.data case aqui ", res.data);
      console.log("res.data case aqui ", res.data.processDefinitionId);

      return {
        //res,
      };
    } catch (error) {
      console.log("error case  **********", error.headers);
      return [];
    }
  }

  //metodo api de estado de session
  async unusedId(JSESSIONID, X_Bonita_API_Token) {
    console.log("async unusedId X_Bonita_API_Token", X_Bonita_API_Token);

    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
    myHeaders.append(
      "Cookie",
      "bonita.tenant=1; BOS_Locale=es; JSESSIONID=A0E8D4DB8EBE88757D9E2BB8028B82C9; JSESSIONIDNODE=67D75FFE34C540A193425AA8AE6FD4FC; X-Bonita-API-Token=" +
        `${X_Bonita_API_Token}`
    );

    const urlencoded = new URLSearchParams();
    urlencoded.append("username", "walter.bates");
    urlencoded.append("password", "bpm");
    urlencoded.append("redirect", "false");

    var requestOptions = {
      method: "GET",
      credentials: "include",
      headers: myHeaders,
      body: urlencoded,
      redirect: "follow",
    };
  }

  ///acceso a controles
  async accessControl(sId, token) {
    try {
      const endpointc = "http://localhost:8080/bonita/API/accessControl/bdm";
      const intancec = axios.create({
        baseURL: endpointc,
        headers: {
          "Content-Type": "application/json;charset=utf-8",
          //"Content-Type": "application/x-www-form-urlencoded",
          Cookie: `${sId};${token}; bonita.tenant=1; BOS_Locale=en`,
        },
      });

      const res = await intancec.get();

      console.log("res.status accessControl aqui ", res.status);
      console.log("res.data accessControl aqui ", res.data);

      return {
        res,
      };
    } catch (error) {
      console.log("error accessControl  **********", error.headers);
      return [];
    }
  }

  async processDefinitionId(sId, token, processDefinitionId) {
    console.log("processDefinitionId aqui :", processDefinitionId);

    try {
      const endpointc =
        "http://localhost:8080/bonita/API/bpm/case?p=0&c=10&f=processDefinitionId=" +
        processDefinitionId;
      const intancec = axios.create({
        baseURL: endpointc,
        headers: {
          "Content-Type": "application/json;charset=utf-8",
          //"Content-Type": "application/x-www-form-urlencoded",
          Cookie: `${sId};${token}; bonita.tenant=1; BOS_Locale=en`,
        },
      });

      const res = await intancec.get();
      console.log("status processDefinitionId aqui :", res.status);
      console.log("data processDefinitionId aqui :", res.data);

      return {
        res,
      };
    } catch (error) {
      console.log("error case  **********", error.headers);
      return [];
    }
  }
  async loginFech() {
    loginFechToBonita();

    const BASE_URL = process.env.REACT_APP_BASE_URL_API;

    async function loginFechToBonita() {
      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

      var urlencoded = new URLSearchParams();
      urlencoded.append("username", "walter.bates");
      urlencoded.append("password", "bpm");
      urlencoded.append("redirect", "false");

      var requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: urlencoded,
        redirect: "follow",
        credentials: "include",
      };
      const BASE_URL =
        process.env.REACT_APP_BASE_URL_API + "/bonita/loginservice";

      return await fetch(BASE_URL, requestOptions)
        .then((result) => {
          if (!result.ok) {
            throw Error(result.status);
          }
          console.log(result);
          return result;
          //return getAuthToken();
        })
        .catch((error) => {
          console.log("error fetch", error);
          return error;
        });
    }
    async function caseBonita() {
      const myHeaders = new Headers();
      myHeaders.append(
        "X-Bonita-API-Token=add93259-565e-40e3-bd12-f62d78a197ef"
      );

      const urlencoded = new URLSearchParams();

      const requestOptions = {
        method: "GET",
        headers: myHeaders,
        body: urlencoded,
        redirect: "follow",
      };
      const BASE_URL =
        process.env.REACT_APP_BASE_URL_API + "/bonita/API/bpm/case/3001";
      console.log("BASE_URL+++++++", BASE_URL);
      console.log("requestOptions +++++++", requestOptions);
      console.log("myHeaders +++++++", myHeaders);
      return await fetch(BASE_URL, requestOptions)
        .then((result) => {
          if (!result.ok) {
            throw Error(result.status);
          }
          console.log(result);
          return;
          //return getAuthToken();
        })
        .catch((error) => {
          console.log("error fetch", error);
          return;
          /*document.getElementById("error").innerHTML +=
            "<br/> &#x26a0; Login error. " + error;*/
        });
    }

    function getAuthToken() {
      var myHeaders = new Headers();
      var requestOptions = {
        method: "GET",
        headers: myHeaders,
        credentials: "include",
      };
      const BASE_URL = process.env.REACT_APP_BASE_URL_API;

      return fetch(BASE_URL + "/API/system/session/unusedId", requestOptions)
        .then((response) => {
          if (!response.ok) {
            throw Error(response.status);
          }
          return response.headers.get("x-bonita-api-token");
        })
        .catch((error) => {
          document.getElementById("error").innerHTML +=
            "<br/> &#x26a0; Unable to retrieve authentication token from session. " +
            error;
        });
    }

    async function componentDidMount() {
      const ufa = await fetch("http://localhost:5300/api", {
        method: "GET", // *GET, POST, PUT, DELETE, etc.
        mode: "no-cors", // no-cors, *cors, same-origin
        //cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
        //credentials: "same-origin", // include, *same-origin, omit
        headers: {
          "Content-Type": "application/json;charset=utf-8",
          "Access-Control-Allow-Origin": "http://localhost:443",
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
      })
        .then((res) => {
          console.log(res);
          return res;
        })
        .then((res) => {
          const ressetState = {
            url: res.url,
            status: res.status,
          };
          console.log(ressetState);
        });
      return ufa;
    }
  }
  async unusedIdFech() {
    unusedIdFechBonita();
    async function unusedIdFechBonita() {
      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json;charset=utf-8");
      const requestOptions = {
        method: "GET",
        headers: myHeaders,
        redirect: "follow",
        credentials: "include",
      };
      const BASE_URL =
        process.env.REACT_APP_BASE_URL_API +
        "/bonita/API/system/session/unusedId";

      return await fetch(BASE_URL, requestOptions)
        .then((result) => {
          if (!result.ok) {
            console.log(result.status, result.statusText);
            throw Error(result.status);
          }
          console.log(
            "result.status fetch",
            result.status + " " + result.statusText
          );

          console.log(
            "result.headers fetch",
            result.headers.get("X-Bonita-API-Token")
          );
          result.json().then((json) => {
            console.log("result.body jsom = ", json);
          });

          return result;
        })
        .catch((error) => {
          console.log("error fetch", error);
          return error;
        });
    }
    async function caseBonita() {
      const myHeaders = new Headers();
      myHeaders.append(
        "X-Bonita-API-Token=add93259-565e-40e3-bd12-f62d78a197ef"
      );

      const urlencoded = new URLSearchParams();

      const requestOptions = {
        method: "GET",
        headers: myHeaders,
        body: urlencoded,
        redirect: "follow",
      };
      const BASE_URL =
        process.env.REACT_APP_BASE_URL_API + "/bonita/API/bpm/case/3001";
      console.log("BASE_URL+++++++", BASE_URL);
      console.log("requestOptions +++++++", requestOptions);
      console.log("myHeaders +++++++", myHeaders);
      return await fetch(BASE_URL, requestOptions)
        .then((result) => {
          if (!result.ok) {
            throw Error(result.status);
          }
          console.log(result);
          return;
          //return getAuthToken();
        })
        .catch((error) => {
          console.log("error fetch", error);
          return;
          /*document.getElementById("error").innerHTML +=
            "<br/> &#x26a0; Login error. " + error;*/
        });
    }

    function getAuthToken() {
      var myHeaders = new Headers();
      var requestOptions = {
        method: "GET",
        headers: myHeaders,
        credentials: "include",
      };
      const BASE_URL = process.env.REACT_APP_BASE_URL_API;

      return fetch(BASE_URL + "/API/system/session/unusedId", requestOptions)
        .then((response) => {
          if (!response.ok) {
            throw Error(response.status);
          }
          return response.headers.get("x-bonita-api-token");
        })
        .catch((error) => {
          document.getElementById("error").innerHTML +=
            "<br/> &#x26a0; Unable to retrieve authentication token from session. " +
            error;
        });
    }

    async function componentDidMount() {
      const ufa = await fetch("http://localhost:5300/api", {
        method: "GET", // *GET, POST, PUT, DELETE, etc.
        mode: "no-cors", // no-cors, *cors, same-origin
        //cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
        //credentials: "same-origin", // include, *same-origin, omit
        headers: {
          "Content-Type": "application/json;charset=utf-8",
          "Access-Control-Allow-Origin": "http://localhost:443",
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
      })
        .then((res) => {
          console.log(res);
          return res;
        })
        .then((res) => {
          const ressetState = {
            url: res.url,
            status: res.status,
          };
          console.log(ressetState);
        });
      return ufa;
    }
  }
  async caseFech() {
    caseFechBonita();

    async function caseFechBonita() {
      const X_Bonita_API_Token = cok.get("X-Bonita-API-Token");
      //console.log("---X_Bonita_API_Token--", X_Bonita_API_Token);
      const myHeaders = new Headers();
      myHeaders.append(
        "Content-type",
        "application/json",
        "Cookie",
        `bonita.tenant=1; BOS_Locale=es; X-Bonita-API-Token=${X_Bonita_API_Token}`
      );

      const urlencoded = new URLSearchParams();
      urlencoded.append("method", "GET");
      const requestOptions = {
        method: "GET",
        headers: myHeaders,
        redirect: "follow",
        credentials: "include",
      };
      const BASE_URL =
        process.env.REACT_APP_BASE_URL_API + "/bonita/API/bpm/case/3001";

      return await fetch(BASE_URL, requestOptions)
        .then((result) => {
          if (!result.ok) {
            console.log(result.status, result.statusText);
            throw Error(result.status);
          }
          console.log(
            "result.status fetch",
            result.status + " " + result.statusText
          );

          console.log(
            "result.headers fetch",
            result.headers.get("X-Bonita-API-Token")
          );
          result.json().then((json) => {
            console.log("result.body jsom = ", json);
          });
          return result;
        })
        .catch((error) => {
          console.log("error fetch", error);
          return error;
        });
    }
  }
}
export default BonitaApi;
//module.exports = BonitaApi;

/*
var axios = require("axios");
var qs = require("qs");
var data = qs.stringify({
  username: "walter.bates",
  password: "bpm",
  redirect: "false",
});
var config = {
  method: "get",
  url: "https://synbonitalab.az.synchro.ar/bonita/API/bpm/case/3001",
  headers: {
    "Content-Type": "application/x-www-form-urlencoded",
    Cookie:
      "JSESSIONID=EE429F63A29E62D288EBE6CD3A0F56A1; X-Bonita-API-Token=0eb1484d-2790-42d6-8e8d-4a8d0830a4fc; bonita.tenant=1; BOS_Locale=en",
  },
  data: data,
};

axios(config)
  .then(function (response) {
    console.log(JSON.stringify(response.data));
  })
  .catch(function (error) {
    console.log(error);
  });

  */
