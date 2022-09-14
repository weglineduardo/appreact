//const BonitaApi = require("../models/BonitaApi");
import BonitaApi from "../models/BonitaApi";

export const callApi = async () => {
  const bonita = new BonitaApi();
  const login = await bonita.login();
  console.log(login);
  return ["jdlflsjdfljsad"];
};

//callApi();
export default callApi;
