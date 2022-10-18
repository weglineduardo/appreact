import React, { useState, useEffect } from "react";
import { JsonSerializer, throwError } from "typescript-json-serializer";

import { JsonConvert, OperationMode, ValueCheckingMode } from "json2typescript";
import Cookies from "universal-cookie";
import axios, { AxiosResponse } from "axios";
import { iListCaseForClient } from "../interfaces/listCaseClient";
import { iCase } from "../interfaces/case";
import Modals from "./modal";
import NavBar from "./navBar";
import Accordion from "./acordion";
import ListaCasosActivos from "./casoActivoId";

function CaseById() {
  type listCaseForClient = iListCaseForClient;
  //usamos listCaseForClient para setArchivedCaseList y
  //tambien para setCaseList por que son los mismo atributos
  const [archivedCaseList, setArchivedCaseList] = useState<listCaseForClient[]>(
    []
  );
  const [caseList, setCaseList] = useState<listCaseForClient[]>([]);
  type caseId = iCase;
  const [inputId, setInputId] = useState<string>("");
  const [caseid, setCaseid] = useState<caseId[]>([]);
  let defaultSerializer = new JsonSerializer();
  let jsonConvert: JsonConvert = new JsonConvert();
  const [comments, setComments] = useState([undefined]);

  const [jcomments, setjComments] = useState([undefined]);
  useEffect(() => {
    caseForId;
    // fetchComments();
  }, [caseid]);
  //#endregion
  //#region caseForId
  const caseForId = async (id: string) => {
    const cookies = new Cookies();
    let JSESSIONIDNODE = cookies.get("JSESSIONIDNODE");
    let X_Bonita_API_Token = cookies.get("X-Bonita-API-Token");
    axios.defaults.baseURL = "http://localhost:8080";

    axios.defaults.headers.post["Content-Type"] =
      "application/json;charset=utf-8";
    axios.defaults.headers.post["Access-Control-Allow-Origin"] = "*";
    axios.defaults.withCredentials = true;
    axios
      .get("/bonita/API/bpm/case/" + id)
      .then((resp) => {
        let result = resp;
        setCaseid(result.data);
        console.log("setCaseId", caseid);

        setCaseid(result.data);
      })
      .catch((error: any) => {
        console.log(error);
      });
    return;
  };
  //#endregion

  return (
    <>
      <NavBar />

      <ListaCasosActivos />
    </>
  );
}

export default CaseById;
