//import "./App.css";
import Axios from "axios";
import React, { useState, useEffect } from "react";
import { JsonSerializer, throwError } from "typescript-json-serializer";
import { JsonObject, JsonProperty } from "json2typescript";
import { JsonConvert, OperationMode, ValueCheckingMode } from "json2typescript";
import Cookies from "universal-cookie";
import axios, { AxiosResponse } from "axios";
import { kMaxLength } from "buffer";
import { ClasesApi } from "../clases/clasesApi";
import { iListCaseForClient } from "../interfaces/listCaseClient";
import { iCase } from "../interfaces/case";

function Lista() {
  type listCaseForClient = iListCaseForClient;
  const [caseList, setCaseList] = useState<listCaseForClient[]>([]);
  type caseId = iCase;
  const [caseid, setCaseid] = useState<caseId[]>([]);
  let defaultSerializer = new JsonSerializer();
  let jsonConvert: JsonConvert = new JsonConvert();
  const [comments, setComments] = useState([undefined]);

  const [jcomments, setjComments] = useState([undefined]);
  useEffect(() => {
    obtenerCaseList;
    caseForId;
    // fetchComments();
  }, [caseList, caseid]);
  useEffect(() => {
    //console.log(comments);
  }, [comments]);
  const obtenerCaseList = async () => {
    const cookies = new Cookies();
    let JSESSIONIDNODE = cookies.get("JSESSIONIDNODE");
    let X_Bonita_API_Token = cookies.get("X-Bonita-API-Token");
    axios.defaults.baseURL = "http://localhost:8080";

    axios.defaults.headers.post["Content-Type"] =
      "application/json;charset=utf-8";
    axios.defaults.headers.post["Access-Control-Allow-Origin"] = "*";
    axios.defaults.withCredentials = true;
    axios
      .get(
        "/bonita/portal/resource/app/userAppBonita/case-list/API/bpm/case?c=10&p=0&d=processDefinitionId&d=started_by&d=startedBySubstitute&f=user_id=4&n=activeFlowNodes&n=failedFlowNodes&t=0"
      )
      .then((resp) => {
        let result = resp;
        setCaseList(result.data);
        console.log(result.data);
      })
      .catch((error: any) => {
        console.log(error);
      });
    return;
  };

  //#region obtenerArchivedActivity
  const obtenerArchivedActivity = async () => {
    axios.defaults.baseURL = "http://localhost:8080";
    axios.defaults.headers.post["Content-Type"] =
      "application/json;charset=utf-8";
    axios.defaults.headers.post["Access-Control-Allow-Origin"] = "*";
    axios.defaults.withCredentials = true;
    axios
      .get(
        "/bonita/API/bpm/archivedCase?c=10&p=0&d=processDefinitionId&d=started_by&d=startedBySubstitute&f=user_id=4&t=0"
      )
      .then((resp) => {
        let result = resp;
        //setCaseList(result.data);
        console.log("obtenerArchivedActivity", result.data);
      })
      .catch((error: any) => {
        console.log(error);
      });
    return;
  };
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
      <ul className="nav nav-tabs" role="tablist">
        <li className="nav-item" role="presentation">
          <a
            className="nav-link active"
            data-bs-toggle="tab"
            href="#home"
            aria-selected="true"
            role="tab"
            onClick={obtenerCaseList}
          >
            Casos activos
          </a>
        </li>
        <li className="nav-item" role="presentation">
          <a
            className="nav-link"
            data-bs-toggle="tab"
            href="#profile"
            aria-selected="false"
            role="tab"
            onClick={obtenerArchivedActivity}
            tabIndex={-1}
          >
            Casos archivados
          </a>
        </li>
      </ul>
      <div id="myTabContent" className="tab-content">
        <div
          className="tab-pane fade active show"
          id="home"
          role="tabpanel"
        ></div>
        <div className="tab-pane fade " id="profile" role="tabpanel">
          <div className="row">
            <div className="column">
              {" "}
              <button
                className="btn btn-info text-right"
                onClick={obtenerArchivedActivity}
              >
                traer casos archivados
              </button>
            </div>
            <div className="column">
              <p>Estos son casos archivados</p>
            </div>
          </div>
          <table className="table table-hover table-success table-striped">
            <thead>
              <tr></tr>
            </thead>
            <tbody>
              {caseList.map((list) => (
                <tr className="table-light">
                  <td>
                    <div className="card border-warning mb-3">
                      <div className="card-header">
                        {list.processDefinitionId.displayName}
                      </div>
                      <div className="card-body">
                        <h4 className="card-title">
                          {list.id} {list.start}
                        </h4>
                        <p className="card-text">
                          {list.startedBySubstitute.firstname}{" "}
                          {list.startedBySubstitute.lastname}{" "}
                        </p>
                      </div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {caseList.map((list) => (
        <div className="container">
          <div className="row shadow p-3 mb-5 bg-white rounded ">
            <div className="col-1">
              <div>Id </div>
              <div>{list.id} </div>
            </div>
            <div className="col-2">
              <div> Nombre proceso </div>
              <div>{list.processDefinitionId.displayName} </div>
            </div>
            <div className="col-3">
              <div>Iniciado por </div>
              <div>
                {" "}
                {list.startedBySubstitute.firstname}{" "}
                {list.startedBySubstitute.lastname}{" "}
              </div>
            </div>
            <div className="col-4">
              {" "}
              <div>Fecha inicio</div>
              <div>{list.start} </div>
            </div>
            <div className="col-1">
              <div>Tareas</div>
              <div>{list.id} </div>
            </div>
            <div className="col-1">
              <div>
                {" "}
                <button
                  onClick={() => caseForId(list.id)}
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
    </>
  );
}

export default Lista;
/**          <table className="table table-hover table-success table-striped">
            <thead>
              <tr>
                <th scope="col">Id</th>
                <th scope="col">Nombre proceso</th>
                <th scope="col">Iniciado por</th>
                <th scope="col">Fecha inicio</th>
                <th scope="col"></th>
              </tr>
            </thead>
            <tbody>
              {caseList.map((list) => (
                <tr className="table-light">
                  <td>{list.id}</td>
                  <td>{list.processDefinitionId.displayName}</td>
                  <td>
                    {list.startedBySubstitute.firstname}{" "}
                    {list.startedBySubstitute.lastname}{" "}
                  </td>
                  <td>{list.start}</td>
                  <td>
                    <button className="btn btn-outline-info btn-sm ">
                      Mas
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table> */
/*  const fetchComments = async () => {
    setComments([]);
    const response = await Axios(
      "https://jsonplaceholder.typicode.com/comments"
    );
    setuComments(response.data);
    console.log(response.headers);
    console.log(response.headers["cache-control"]);
    console.log(response.data[0]);

    const onecoments = response.data[0];
    console.log(onecoments);
    const dataz = defaultSerializer.serialize(onecoments);
    console.log(dataz);

    let country = jsonConvert.deserializeObject(onecoments, Comments);
    let datathecomment = new Comments();
    var cc = defaultSerializer.deserialize(onecoments, datathecomment);
    console.log(cc);

    setComments(response.data);
    setjComments(onecoments);
    uncomentario(datathecomment);
  };
  const uncomentario = (comment: Comments) => {
    comments.map((comment) => {
      return (
        <div
          key={comment}
          style={{ alignItems: "center", margin: "20px 60px" }}
        >
          <h4>{comment}</h4>
          <p>{comment}</p>
        </div>
      );
    });
  }; */
/*       <div className="col-12 row">
        <div>
          <button className="btn btn-info" onClick={obtenerCaseList}>
            Casos activos
          </button>
        </div>

        {/*comments &&
        comments.map((comment) => {
          return (
            <div
              key={comment}
              style={{ alignItems: "center", margin: "20px 60px" }}
            >
              <h4>{comment}</h4>
              <p>{comment}</p>
            </div>
          );
        })
      </div >
       * /

/*   

      <div className="col-9 row  form-control">
        <table className="table table-hover table-success table-striped">
          <thead>
            <tr>
              <th scope="col">Id</th>
              <th scope="col">Nombre proceso</th>
              <th scope="col">Iniciado por</th>
              <th scope="col">Fecha inicio</th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
            {caseList.map((list) => (
              <tr className="table-light">
                <td>{list.id}</td>
                <td>{list.processDefinitionId.displayName}</td>
                <td>
                  {list.startedBySubstitute.firstname}{" "}
                  {list.startedBySubstitute.lastname}{" "}
                </td>
                <td>{list.start}</td>
                <td>
                  <button className="btn btn-outline-info btn-sm ">Mas</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
<div className="card border-secondary mb-3">
                    <div className="card-header">
                      {list.processDefinitionId.displayName}
                    </div>
                    <div className="card-body">
                      <h4 className="card-title">Secondary card title</h4>
                      <p className="card-text">
                        {" "}
                        {list.startedBySubstitute.firstname}{" "}
                        {list.startedBySubstitute.lastname} Some quick example
                        text t
                      </p>
                    </div>
                  </div> */

/*
  class listCaseForClient {
    "end_date": string;
    "searchIndex5Label": string;
    "processDefinitionId": ProcessDefinitionId;
    "searchIndex3Value": string;
    "searchIndex4Value": string;
    "searchIndex2Label": string;
    "start": string;
    "searchIndex1Value": string;
    "searchIndex3Label": string;
    "failedFlowNodes": string;
    "startedBySubstitute": StartedBySubstitute;
    "searchIndex5Value": string;
    "searchIndex2Value": string;
    "rootCaseId": string;
    "id": string;
    "state": string;
    "searchIndex1Label": string;
    "started_by": StartedBy;
    "activeFlowNodes": string;
    "searchIndex4Label": string;
    "last_update_date": string;
  }
  class ProcessDefinitionId {
    "displayDescription": string;
    "deploymentDate": string;
    "displayName": string;
    "name": string;
    "description": string;
    "deployedBy": string;
    "id": string;
    "activationState": string;
    "version": string;
    "configurationState": string;
    "last_update_date": string;
    "actorinitiatorid": string;
  }
  class StartedBy {
    "firstname": string;
    "icon": string;
    "creation_date": string;
    "userName": string;
    "title": string;
    "created_by_user_id": string;
    "enabled": string;
    "lastname": string;
    "last_connection": string;
    "password": string;
    "manager_id": string;
    "id": string;
    "job_title": string;
    "last_update_date": string;
  }
  class StartedBySubstitute {
    "firstname": string;
    "icon": string;
    "creation_date": string;
    "userName": string;
    "title": string;
    "created_by_user_id": string;
    "enabled": string;
    "lastname": string;
    "last_connection": string;
    "password": string;
    "manager_id": string;
    "id": string;
    "job_title": string;
    "last_update_date": string;
  }*/
