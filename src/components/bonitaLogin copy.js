//const BonitaApi = require("../models/BonitaApi");
import BonitaApi from "../models/BonitaApi";

export const bonitaLogin = async () => {
  const bonita = new BonitaApi();
  const login = await bonita.login();
  console.log(login);
  //return [""];
};

//callApi();
export default bonitaLogin;
