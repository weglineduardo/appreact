const axios = require("axios");

class BonitaApi {
  async login() {
    let sId = "";
    let token = "";
    try {
      const BASE_URL = process.env.REACT_APP_BASE_URL_API;
      const LOGINSERVICE = process.env.REACT_APP_API_LOGINSERVICE;
      const endpoint =
        BASE_URL +
        LOGINSERVICE +
        "username=walter.bates&password=bpm&redirect=false";

      const intance = axios.create({
        baseURL: endpoint,
        mode: "cors",
        withCredentials: "true",
        "Access-Control-Allow-Origin": "http://localhost:3000",
        "Access-Control-Allow-Methods": "GET, HEAD, POST, OPTIONS",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",

          //"Access-Control-Allow-Origin": "http://localhost:3000",
        },
      });

      //console.log(intance);
      const res = await intance.post();
      const data = res.headers;
      //console.log(res.headers);
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
        "Content-Type": "application/x-www-form-urlencoded",
        Cookie: `${sId};${token}; bonita.tenant=1; BOS_Locale=en`,
      };
      //console.log("sheaders --------", sheaders);

      //this.case(sId, token);
      //this.accessControl(sId, token);

      //return {
      //  //data,
      //};
    } catch (error) {
      console.log("error **********", error);
      // return [];
    }
  }

  async accessControl(sId, token) {
    try {
      const endpointc =
        "https://synbonitalab.az.synchro.ar/bonita/API/accessControl/bdm";
      const intancec = axios.create({
        baseURL: endpointc,
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
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

  async case(sId, token) {
    try {
      const endpointc =
        "https://synbonitalab.az.synchro.ar/bonita/API/bpm/case/23";
      const intancec = axios.create({
        baseURL: endpointc,
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Cookie: `${sId};${token}; bonita.tenant=1; BOS_Locale=en`,
        },
      });

      const res = await intancec.get();

      console.log("res.status case aqui ", res.status);
      console.log("res.data case aqui ", res.data);
      console.log("res.data case aqui ", res.data.processDefinitionId);

      this.processDefinitionId(sId, token, res.data.processDefinitionId);
      return {
        res,
      };
    } catch (error) {
      console.log("error case  **********", error.headers);
      return [];
    }
  }

  async processDefinitionId(sId, token, processDefinitionId) {
    console.log("processDefinitionId aqui :", processDefinitionId);

    try {
      const endpointc =
        "https://synbonitalab.az.synchro.ar/bonita/API/bpm/case?p=0&c=10&f=processDefinitionId=" +
        processDefinitionId;
      const intancec = axios.create({
        baseURL: endpointc,
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
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
