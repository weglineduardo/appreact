//const BonitaApi = require("../models/BonitaApi");
import BonitaApi from "../models/BonitaApi";

export const unusedIdFetch = async () => {
  const bonita = new BonitaApi();

  const login = await bonita.unusedIdFech();

  //return {};
};

//callApi();
export default unusedIdFetch;
