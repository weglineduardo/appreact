//const BonitaApi = require("../models/BonitaApi");
import BonitaApi from "../models/BonitaApi";
import axios from "axios";

const { Cookies: kks } = require("react-cookie");

export const fetchBonitaLogin = async () => {
  const bonita = new BonitaApi();

  const cok = new kks();
  const login = await bonita.loginFech();

  console.log("is login bonitaLogin ", login);
  //return {};
};

//callApi();
export default fetchBonitaLogin;
