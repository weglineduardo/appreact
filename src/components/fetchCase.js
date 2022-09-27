//const BonitaApi = require("../models/BonitaApi");
import BonitaApi from "../models/BonitaApi";
import axios from "axios";

const { Cookies: kks } = require("react-cookie");

export const fetchCase = async () => {
  const bonita = new BonitaApi();

  const login = await bonita.caseFech();

  console.log("is login bonitaLogin ", login);
  //return {};
};

//callApi();
export default fetchCase;
