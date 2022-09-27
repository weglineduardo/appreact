//const BonitaApi = require("../models/BonitaApi");
import BonitaApi from "../models/BonitaApi";
import axios from "axios";

const { Cookies: kks } = require("react-cookie");

export const fetchCase = async () => {
  const bonita = new BonitaApi();

  await bonita.caseFech();
};

//callApi();
export default fetchCase;
