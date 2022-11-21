/* eslint-disable react-hooks/rules-of-hooks */
import {
  Navigate,
  redirect,
  BrowserRouter,
  useNavigate,
} from "react-router-dom";
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
import NavBar from "./navBar";
import Modals from "./modal";

function casoActivoId() {
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
    const [caseid, setCaseid] = useState<listCaseForClient>(elcase);
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
    //setCaseid(caseid);
    console.log("el id", id);

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
        LimpiarUseState();
        setisVisible(false);
        return;
      });
    return;
  };
  const navigate = useNavigate();

  const navigateTo = (routeUrl: string) => {
    const url = `/${routeUrl}`;
    navigate(url);
  };
  //#endregion

  return (
    <>
      {isVisible === false ? (
        <div className="">
          <div id="tabla" className="d-flex flex-row bd-highlight mb-3">
            <div className="p-2 bd-highlight">Id de caso</div>
            <div className="p-2 bd-highlight">
              <input
                type="text"
                className=""
                id="caseId"
                placeholder="Numero de caso a buscar?"
                onChange={(e) => setInputId(e.target.value)}
              />
            </div>
            <div className="p-2 bd-highlight">
              {" "}
              <button
                onClick={() => caseForId(inputId)}
                className="btn btn-outline-info btn-sm align-text-bottom"
              >
                Buscar
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div>
          <div id="tabla" className="d-flex flex-row bd-highlight mb-3">
            <div className="p-2 bd-highlight">Id de caso</div>
            <div className="p-2 bd-highlight">
              <input
                type="text"
                className=""
                id="caseId"
                placeholder="Numero de caso a buscar?"
                onChange={(e) => setInputId(e.target.value)}
              />
            </div>
            <div className="p-2 bd-highlight">
              {" "}
              <button
                onClick={() => caseForId(inputId)}
                className="btn btn-outline-info btn-sm align-text-bottom"
              >
                Buscar
              </button>
            </div>
          </div>
          <ul className="nav nav-tabs" role="tablist">
            <li className="nav-item" role="presentation">
              <a
                className="nav-link active"
                data-bs-toggle="tab"
                href="#home"
                aria-selected="true"
                role="tab"
              >
                Caso encontrado
              </a>
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

                  <p>Caso abierto </p>

                  <div className="container ">
                    <div className="row shadow p-2 mb-3 bg-white rounded">
                      <div className="row">
                        <div className="col">
                          {" "}
                          <div>id de caso</div>
                          <div> {caseid.id} </div>
                        </div>
                        <div className="col">
                          <div> Nombre proceso </div>
                          <div>{caseid.processDefinitionId.displayName}</div>
                        </div>
                        <div className="col">
                          <div>Iniciado por </div>
                          <div>
                            {" "}
                            {caseid.startedBySubstitute.firstname}{" "}
                            {caseid.startedBySubstitute.lastname}{" "}
                          </div>
                        </div>
                        <div className="col">
                          <div>Fecha inicio</div>
                          <div>{formatearFecha(caseid.start)}</div>
                        </div>
                        <div className="col">
                          <div>Tareas</div>
                          <div>{caseid.id} </div>
                        </div>
                        <div className="col-1">
                          {" "}
                          <div></div>
                          <div>
                            {" "}
                            <button
                              onClick={() => navigateTo(caseid.id)}
                              className="btn btn-outline-info btn-sm align-text-bottom"
                            >
                              {" "}
                              Ver{" "}
                            </button>{" "}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default casoActivoId;
