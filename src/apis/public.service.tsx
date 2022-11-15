import { AxiosResponse } from "axios";
import axios from "axios";

export const loginGlpi = async (
  Authorization: string,
  AppToken: string
): Promise<AxiosResponse<Response>> => {
  console.log("ingreso a export const loginGlpi = ");
  axios.defaults.baseURL = "https://glpi.apps.synchro.com.ar";
  axios.defaults.headers.post["Content-Type"] =
    "application/json;charset=utf-8";
  axios.defaults.headers.post["Access-Control-Allow-Origin"] = "*";
  axios.defaults.withCredentials = true;
  axios.defaults.headers.post["Authorization"] =
    "'user_token' Qb8ETzMRCBj8E5mV8e83mIpZnbBjssxvsZ7HCyuJ";
  axios.defaults.headers.post["App-Token"] =
    "Pgp2P6F38ZyWbjM1u8OyCEtXCd8Fj8Cl5KWhtiA";
  axios.defaults.headers.get["Authorization"] =
    "'user_token' Qb8ETzMRCBj8E5mV8e83mIpZnbBjssxvsZ7HCyuJ";
  axios.defaults.headers.get["App-Token"] =
    "Pgp2P6F38ZyWbjM1u8OyCEtXCd8Fj8Cl5KWhtiA";
  await axios
    .get("/apirest.php/initSession")
    .then((result) => {
      if (result.status) {
        console.log("export const loginGlpi = ", result.status);
        return;
      }

      console.log("export const loginGlpi = ", result.status);
      return;
    })
    .catch((error) => {
      console.log("error fetch ------", error);
      return;
    });
  return await axios.get<Response>("/apirest.php/initSession");
};
