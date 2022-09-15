//const BonitaApi = require("../models/BonitaApi");
import BonitaApi from "../models/BonitaApi";
import Cookies from "universal-cookie";

export const callApi = async () => {
  const bonita = new BonitaApi();
  const login = await bonita.login();
  console.log(login);
  const JSESSIONID = "JSESSIONID";
  const XBonitaAPIToken = "XBonitaAPIToken";
  console.log(JSESSIONID, XBonitaAPIToken);
  const cookies = new Cookies();
  /*cookies.set("myCat", "Pacman", { path: "/" });
  cookies.set("synbonitalab ", "synbonitalab", {
    path: "https://synbonitalab.az.synchro.ar",
  });*/
  //console.log(document.cookie);
  cookies.set("JSESSIONID:", "JSESSIONIDJSESSIONID");
  console.log(cookies.get("myCat")); // Pacman
  console.log(cookies.get("JSESSIONID"));
  console.log(cookies.get("X-Bonita-API-Token"));

  return ["jdlflsjdfljsad"];
};

//callApi();
export default callApi;
