import Moment from "moment";
import React, { useState, useEffect, useLayoutEffect } from "react";
import Cookies from "universal-cookie";
import axios, { AxiosResponse } from "axios";
import { kMaxLength } from "buffer";
import { ClasesApi } from "../clases/clasesApi";
import {
  iListCaseForClient,
  ProcessDefinitionId,
  StartedBy,
  StartedBySubstitute,
} from "../interfaces/listCaseClient";
import { iCase } from "../interfaces/case";
import { formatearFecha } from "../components/formatoFecha";

import { useLocation } from "react-router-dom";
import ChildFormCasoDetalle from "../components/childFormCasoDetalle";

const CasoConDetalle = () => {
  const query = new URLSearchParams(useLocation().search);
  let idCaso: any;
  idCaso = query.get("id") ? query.get("id") : "0";
  type listCaseForClient = iListCaseForClient;
  //usamos listCaseForClient para setArchivedCaseList y
  //tambien para setCaseList por que son los mismo atributos
  const [archivedCaseList, setArchivedCaseList] = useState<listCaseForClient[]>(
    []
  );

  const [isVisible, setisVisible] = useState(false);
  const [inputId, setInputId] = useState<string>("1");
  const [caseList, setCaseList] = useState<listCaseForClient[]>([]);
  type caseId = iCase;
  let startedBySubstitute: StartedBySubstitute = {
    last_connection: "",
    created_by_user_id: "",
    creation_date: "",
    id: "",
    icon: "",
    enabled: "",
    title: "",
    manager_id: "",
    job_title: "",
    userName: "",
    lastname: "",
    firstname: "",
    password: "",
    last_update_date: "",
  };
  let startedBy: StartedBy = {
    last_connection: "",
    created_by_user_id: "",
    creation_date: "",
    id: "",
    icon: "",
    enabled: "",
    title: "",
    manager_id: "",
    job_title: "",
    userName: "",
    lastname: "",
    firstname: "",
    password: "",
    last_update_date: "",
  };
  let processDefinitionId: ProcessDefinitionId = {
    id: "",
    icon: "",
    displayDescription: "",
    deploymentDate: "",
    description: "",
    activationState: "",
    name: "",
    deployedBy: "",
    displayName: "",
    actorinitiatorid: "",
    last_update_date: "",
    configurationState: "",
    version: "",
  };
  let elcase: iListCaseForClient = {
    end_date: "",
    searchIndex5Label: "",
    searchIndex3Value: "",
    searchIndex4Value: "",
    searchIndex2Label: "",
    start: "",
    searchIndex1Value: "",
    searchIndex3Label: "",
    searchIndex5Value: "",
    searchIndex2Value: "",
    rootCaseId: "",
    id: "",
    state: "",
    searchIndex1Label: "",
    searchIndex4Label: "",
    last_update_date: "",
    failedFlowNodes: "",
    startedBySubstitute: startedBySubstitute,
    activeFlowNodes: "",
    started_by: startedBy,
    processDefinitionId: processDefinitionId,
  };

  const LimpiarUseState = () => {
    const [caseid, setCaseid] = useState<listCaseForClient>();
  };
  const [caseid, setCaseid] = useState<listCaseForClient>(elcase);
  useEffect(() => {
    if (!isVisible) {
      console.log("useLayoutEffect");
    }
  }, [setisVisible]);

  useLayoutEffect(() => {
    if (!isVisible) {
      console.log("useLayoutEffect");
    }
  }, [setisVisible]);

  //#region caseForId
  const caseForId = async (id: string) => {
    setCaseList([]);
    setisVisible(false);
    let idint = parseInt(id);
    if (idint <= 0) {
      console.log("no es mayor a cero");
      return;
    }
    const cookies = new Cookies();
    let JSESSIONIDNODE = cookies.get("JSESSIONIDNODE");
    let X_Bonita_API_Token = cookies.get("X-Bonita-API-Token");
    axios.defaults.baseURL = process.env.REACT_APP_BASE_URL_API;

    axios.defaults.headers.post["Content-Type"] =
      "application/json;charset=utf-8";
    axios.defaults.headers.post["Access-Control-Allow-Origin"] = "*";
    axios.defaults.withCredentials = true;
    await axios
      .get(
        process.env.REACT_APP_GET_CASEFORID +
          id +
          "?d=processDefinitionId&d=started_by&d=startedBySubstitute"
      )
      .then((resp) => {
        let result = resp;
        setCaseid(result.data);
        setisVisible(true);
        return;
      })
      .catch((error: any) => {
        console.log(error);
        LimpiarUseState;
        setisVisible(false);
        return;
      });
    return;
  };

  //#endregion

  useEffect(() => {
    console.log("  caseForId20003");

    caseForId(idCaso);
  }, [setisVisible]);
  return (
    <>
      {isVisible === false ? (
        <div className=""></div>
      ) : (
        <div>
          <ul className="nav nav-tabs" role="tablist">
            <li className="nav-item" role="presentation">
              <div
                className="nav-link active"
                data-bs-toggle="tab"
                //href="#home"
                aria-selected="true"
                role="tab"
              >
                Caso encontrado
              </div>
            </li>
          </ul>

          <div id="myTabContent" className="tab-content">
            <div
              className="tab-pane fade active show "
              id="home"
              role="tabpanel"
            >
              <div className="row">
                {" "}
                <div className="column"></div>
                <div className="column">
                  <div className="row"></div>

                  <ChildFormCasoDetalle
                    idAcordion={caseid.processDefinitionId.displayName + "s"}
                    titleAcordion={caseid.processDefinitionId.displayName}
                    cardHeader={"ID del Caso :" + caseid.id}
                    cardTitle={""}
                    body={""}
                    textButton={"Añadir comentario"}
                    routeUrl="routeUrl"
                    style={"danger"}
                    data={
                      "esta es la data desde  " +
                      caseid.processDefinitionId.displayName
                    }
                    caseData={caseid}
                    casoId={idCaso}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CasoConDetalle;
