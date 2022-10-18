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

function casoActivoPorNombreProceso() {
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
    const [caseList, setCaseList] = useState<listCaseForClient>(elcase);
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

  const obtenerCaseList = async (name: string) => {
    setCaseList([]);
    setisVisible(false);
    axios.defaults.baseURL = "http://localhost:8080";

    axios.defaults.headers.post["Content-Type"] =
      "application/json;charset=utf-8";
    axios.defaults.headers.post["Access-Control-Allow-Origin"] = "*";
    axios.defaults.withCredentials = true;
    axios
      .get(
        "/bonita/API/bpm/case?c=10&p=0&d=processDefinitionId&d=started_by&d=startedBySubstitute&f=user_id=4&n=activeFlowNodes&n=failedFlowNodes&t=0&s=" +
          name +
          "&o=startDate+DESC"
      )
      .then((resp) => {
        let result = resp;
        console.log(result.data);
        if (result.data.length > 0) {
          setisVisible(true);
          setCaseList(result.data);
        } else {
          setisVisible(false);
          setCaseList([]);
        }
      })
      .catch((error: any) => {
        setCaseList([]);
        setisVisible(false);
        console.log(error);
      });
    return;
  };

  return (
    <>
      {isVisible === false ? (
        <div className="">
          <div id="tabla" className="d-flex flex-row bd-highlight mb-3">
            <div className="p-2 bd-highlight">
              Nombre o inicio del nombre del proceso
            </div>
            <div className="p-2 bd-highlight">
              <input
                type="text"
                className=""
                id="caseId"
                placeholder=" Nombre o inicio del nombre del proceso"
                onChange={(e) => setInputId(e.target.value)}
              />
            </div>
            <div className="p-2 bd-highlight">
              {" "}
              <button
                onClick={() => obtenerCaseList(inputId)}
                className="btn btn-outline-info btn-sm align-text-bottom"
              >
                Buscar
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div>
          <div className="">
            <div id="tabla" className="d-flex flex-row bd-highlight mb-3">
              <div className="p-2 bd-highlight">
                Nombre o inicio del nombre del proceso
              </div>
              <div className="p-2 bd-highlight">
                <input
                  type="text"
                  className=""
                  id="caseId"
                  placeholder="Nombre o inicio del nombre del proceso"
                  onChange={(e) => setInputId(e.target.value)}
                />
              </div>
              <div className="p-2 bd-highlight">
                {" "}
                <button
                  onClick={() => obtenerCaseList(inputId)}
                  className="btn btn-outline-info btn-sm align-text-bottom"
                >
                  Buscar
                </button>
              </div>
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
                Casos encontrados
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

                  <p>Estos son casos abiertos</p>
                  {caseList.map((list) => (
                    <div className="container ">
                      <div className="row shadow p-2 mb-3 bg-white rounded">
                        <div className="col">
                          <div>Id </div>
                          <div>{list.id} </div>
                        </div>
                        <div className="col">
                          <div> Nombre proceso </div>
                          <div>{list.processDefinitionId.displayName} </div>
                        </div>
                        <div className="col">
                          <div>Iniciado por </div>
                          <div>
                            {" "}
                            {list.startedBySubstitute.firstname}{" "}
                            {list.startedBySubstitute.lastname}{" "}
                          </div>
                        </div>
                        <div className="col">
                          {" "}
                          <div>Fecha inicio</div>
                          <div>{formatearFecha(list.start)} </div>
                        </div>
                        <div className="col">
                          <div>Tareas</div>
                          <div>{list.id} </div>
                        </div>
                        <div className="col">
                          <div>
                            {" "}
                            <button
                              onClick={() => obtenerCaseList(inputId)}
                              className="btn btn-outline-info btn-sm align-text-bottom"
                            >
                              {" "}
                              Ver{" "}
                            </button>{" "}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default casoActivoPorNombreProceso;
