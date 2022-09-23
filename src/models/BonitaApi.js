const axios = require("axios");

const qs = require("qs");
//const Cookies = require("universal-cookie");
//const cookies = require("es-cookie");
const { Cookies: kks } = require("react-cookie");
const cok = new kks();
class BonitaApi {
  async login() {
    let sId = "";
    let token = "";
    // return;
    const BASE_URL = process.env.REACT_APP_BASE_URL_API;
    const endpoint =
      BASE_URL +
      "/bonita/loginservice?username=walter.bates&password=bpm&redirect=false";
    const intance = axios.create({
      baseURL: endpoint, //"https://jsonplaceholder.typicode.com/users/1", //
      mode: "cors",
      withCredentials: "true",
      //"Access-Control-Allow-Origin": "http://localhost:443",
      "Access-Control-Allow-Methods": "GET, HEAD, POST, OPTIONS",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        //"Access-Control-Allow-Origin": "*",
        //"Access-Control-Allow-Origin": "http://localhost:443",
      },
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
    /*const BASE_URL = process.env.REACT_APP_BASE_URL_API;

    const endpointc = BASE_URL + "/bonita/API/bpm/case/10002";
    console.log("endpointc case aqui ", endpointc);
    console.log(
      "async case(JSESSIONID, X_Bonita_API_Toke) ",
      JSESSIONID,
      X_Bonita_API_Token
    );
      */

    //verificamos  si la sesion esta activa en la api
    this.unusedId(JSESSIONID, X_Bonita_API_Token);

    //buscamos el caso por id
    let data = qs.stringify({});
    let config = {
      method: "get",
      url: "http://localhost:8080/bonita/API/bpm/case/10002",
      withCredentials: true,

      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "DELETE, POST, GET, OPTIONS",
        "Access-Control-Allow-Headers":
          "Content-Type, Authorization, X-Requested-With",
        "Content-Type": "application/json",
        "X-Bonita-API-Token": `${X_Bonita_API_Token}`,
      },
      data: data,
    };
    console.log("config :", config);
    const ress = await axios(config)
      .then(function(response) {
        console.log(JSON.stringify(response.data));
      })
      .catch(function(error) {
        console.log(error);
      });
    console.log("ress: ", ress);

    /*
    try {
      const BASE_URL = process.env.REACT_APP_BASE_URL_API;

      const endpointc = BASE_URL + "/bonita/API/bpm/case/8001";

      const dJSESSIONID = "F0DE6542E89AC1D9D77B21A78219137A";
      const dX_Bonita_API_Token = "3776e2f6-d1bc-4f22-a075-19879a290594";

      //console.log("dJSESSIONID ", dJSESSIONID);
      //console.log("dX_Bonita_API_Token ", dX_Bonita_API_Token);
      let her = {
        "Content-Type": "application/json;charset=utf-8",
        Cookie: `JSESSIONID=${JSESSIONID};X_Bonita_API_Token=${X_Bonita_API_Token}; bonita.tenant=1; BOS_Locale=en`,
      };

      console.log("her==", her);
      const intancec = axios.create({
        baseURL: endpointc,
        headers: her,
      });

      //const res = await intancec.get();

      //console.log("res.status case aqui ", res.status);
      //console.log("res.data case aqui ", res.data);
      //console.log("res.data case aqui ", res.data.processDefinitionId);

      return {
        //res,
      };
    } catch (error) {
      console.log("error case  **********", error.headers);
      return [];
    }*/
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

    let resl = await fetch(
      "http://localhost:8080/bonita/API/system/session/unusedId",
      {
        Method: "GET",
        body: {},
        mode: "cors",
        headers: {
          "Content-type": "application/json;charset=utf-8",
          "X-Bonita-API-Token": `${X_Bonita_API_Token}`,
        },
      }
    )
      .then((response) => response.text())
      .then((result) => console.log(result))
      .catch((error) => console.log("error", error));

    /*await fetch(
      "http://localhost:8080/bonita/API/system/session/unusedId",
      requestOptions
    )
      .then((response) => response.text())
      .then((result) => console.log(result))
      .catch((error) => console.log("error", error));*/
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
    const endpo = "http://localhost:5300/api";
    const intance = axios.create({
      baseURL: endpo,
      mode: "no-cors",
      //withCredentials: "true",
      //"Access-Control-Allow-Origin": "http://localhost:443",
      "Access-Control-Allow-Methods": "GET, HEAD, POST, OPTIONS",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        //"Access-Control-Allow-Origin": "*",
        //"Access-Control-Allow-Origin": "http://localhost:443",
      },
    });

    const res = await intance.get();
    console.log("res.headers aqui :", res.headers);

    const BASE_URL = process.env.REACT_APP_BASE_URL_API;
    const endpoint =
      BASE_URL +
      "/bonita/loginservice?username=walter.bates&password=bpm&redirect=false";
    const endPo = "http://localhost:5300/api"; //BASE_URL + "/bonita/loginservice";

    console.log("IcomponentDidMount :", "IcomponentDidMount");
    const IcomponentDidMount = await componentDidMount();
    console.log("IcomponentDidMount :", IcomponentDidMount);
    console.log("IcomponentDidMount :", "IcomponentDidMount");
    //const IloginToBonita = await loginToBonita();
    //const IgetAuthToken = await getAuthToken();
    //
    //console.log("IloginToBonita :", IloginToBonita);
    //console.log("IgetAuthToken :", IgetAuthToken);
    function loginToBonita() {
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

      //return fetch(BASE_URL + "/loginservice", requestOptions);
      return fetch(endPo, requestOptions)
        .then((result) => {
          if (!result.ok) {
            throw Error(result.status);
          }
          return getAuthToken();
        })
        .catch((error) => {
          document.getElementById("error").innerHTML +=
            "<br/> &#x26a0; Login error. " + error;
        });
    }

    function getAuthToken() {
      var myHeaders = new Headers();
      var requestOptions = {
        method: "GET",
        headers: myHeaders,
        credentials: "include",
      };

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
  url: "https://synbonitalab.az.synchro.ar/bonita/API/bpm/case/18",
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
