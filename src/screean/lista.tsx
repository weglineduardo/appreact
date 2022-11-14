import { useNavigate } from "react-router-dom";
import React, { useState, useEffect, useLayoutEffect } from "react";

import Cookies from "universal-cookie";
import axios, { AxiosResponse } from "axios";
import { iListCaseForClient } from "../interfaces/listCaseClient";
import { iCase } from "../interfaces/case";
import Modals from "./modal";
import { formatearFecha } from "../components/formatoFecha";
import Icons from "../components/icons";
import AlertDanger from "./alertDanger";
import { iUsuario } from "../interfaces/usuario";

const Lista = () => {
  let iUarioActivo: iUsuario = {
    copyright: "",
    is_guest_user: "",
    branding_version: "",
    branding_version_with_date: "",
    user_id: "",
    user_name: "",
    session_id: "",
    conf: "",
    is_technical_user: "",
    version: "",
  };

  type listCaseForClient = iListCaseForClient;
  //usamos listCaseForClient para setArchivedCaseList y
  //tambien para setCaseList por que son los mismo atributos
  const [archivedCaseList, setArchivedCaseList] = useState<listCaseForClient[]>(
    []
  );
  const [caseList, setCaseList] = useState<listCaseForClient[]>([]);
  type caseId = iCase;
  const [caseid, setCaseid] = useState<caseId[]>([]);
  const [show, setShow] = useState(false);
  const [usuario, setUsuario] = useState<iUsuario>(iUarioActivo);
  const [serviceLogin, setServiceLogin] = useState("");
  //useEffect(() => {
  //  //obtenerCaseList("4");
  //  //caseForId;
  //  // fetchComments();
  //}, [caseList, caseid]);
  const navigate = useNavigate();

  const navigateTo = (routeUrl: string) => {
    const url = `/caso-detalle/?id=${routeUrl}`;
    navigate(url);
  };
  const obtenerCaseList = async (user_id: string) => {
    //await usuarioActivo();
    let userId = usuario.user_id;
    console.log({ userId });
    const cookies = new Cookies();
    console.log("usuario", usuario);
    console.log("serviceLogin", serviceLogin);

    axios.defaults.baseURL = process.env.REACT_APP_BASE_URL_API;

    axios.defaults.headers.post["Content-Type"] =
      "application/json;charset=utf-8";
    axios.defaults.headers.post["Access-Control-Allow-Origin"] = "*";
    axios.defaults.withCredentials = true;
    await axios
      .get(
        "/bonita/portal/resource/app/userAppBonita/case-list/API/bpm/case?c=20&p=0&d=processDefinitionId&d=started_by&d=startedBySubstitute&f=user_id=" +
          userId +
          "&n=activeFlowNodes&n=failedFlowNodes&t=0&o=startDate+DESC"
      )
      .then((resp) => {
        let result = resp;
        setCaseList(result.data);
        console.log(result.data);
        if (result.data.length == 0) {
          console.log("lista vacia");
          setShow(true);
        } else {
          setShow(false);
        }
      })
      .catch((error: any) => {
        setShow(true);
        console.log(error);
      });
    return;
  };
  //#region usuario activo
  const usuarioActivo = async () => {
    axios.defaults.baseURL = process.env.REACT_APP_BASE_URL_API;

    axios.defaults.headers.post["Content-Type"] =
      "application/json;charset=utf-8";
    axios.defaults.headers.post["Access-Control-Allow-Origin"] = "*";
    axios.defaults.withCredentials = true;
    await axios
      .get("" + process.env.REACT_APP_API_USERACTIVE)
      .then((resp) => {
        let result = resp;
        setUsuario(result.data);
        ////let rr = jsonConvert.deserializeObject(result.data, rs);
        console.log(
          "usuario.user_id"
          //usuario ? usuario.user_id : "sin usuario.user_id"
        );
        setServiceLogin(
          "Login Success "
          //+ (usuario ? usuario.user_name : "sin datos")
        );

        console.log(result.data);
      })
      .catch((error) => {
        console.log(error);
      });
    return;
  };
  const tareaPorCase = async (user_id: string, caso_id: string) => {
    //await usuarioActivo();
    let userId = usuario.user_id;
    console.log({ userId });
    const cookies = new Cookies();
    axios.defaults.baseURL = process.env.REACT_APP_BASE_URL_API;

    axios.defaults.headers.post["Content-Type"] =
      "application/json;charset=utf-8";
    axios.defaults.headers.post["Access-Control-Allow-Origin"] = "*";
    axios.defaults.withCredentials = true;
    await axios
      .get(
        "/bonita/API/bpm/humanTask?p=0&c=50&f=state=ready&f=user_id=" +
          userId +
          "&f=caseId=31005"
      )
      .then((resp) => {
        let result = resp;
        console.log("result.data :", result.data);
        console.log("result.data.length :", result.data.length);
        if (result.data.length == 0) {
          console.log("lista vacia");
        } else {
        }
      })
      .catch((error: any) => {
        console.log(error);
      });
    return;
  };
  useEffect(() => {
    usuarioActivo();
    //tareaPorCase(usuario.user_id);
  }, []);

  //#endregion

  //#region obtenerArchivedActivity
  const obtenerArchivedActivity = async () => {
    axios.defaults.baseURL = process.env.REACT_APP_BASE_URL_API;
    axios.defaults.headers.post["Content-Type"] =
      "application/json;charset=utf-8";
    axios.defaults.headers.post["Access-Control-Allow-Origin"] = "*";
    axios.defaults.withCredentials = true;
    await axios
      .get(
        "" +
          process.env.REACT_APP_LISTCASEACTIVED +
          usuario.user_id +
          "&t=0&o=startDate+DESC"
      )
      .then((resp) => {
        let result = resp;
        setArchivedCaseList(result.data);
        console.log("setArchivedCaseList", result.data);
        if (result.data.length == 0) {
          console.log("lista vacia");
          setShow(true);
        } else {
          setShow(false);
        }
      })
      .catch((error: any) => {
        setShow(true);
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
    axios.defaults.baseURL = process.env.REACT_APP_BASE_URL_API;

    axios.defaults.headers.post["Content-Type"] =
      "application/json;charset=utf-8";
    axios.defaults.headers.post["Access-Control-Allow-Origin"] = "*";
    axios.defaults.withCredentials = true;
    await axios
      .get(process.env.REACT_APP_GET_CASEFORID + id)
      .then((resp) => {
        let result = resp;
        setCaseid(result.data);
        console.log("setCaseId", caseid);
        if (result.data.length == 0) {
          console.log("lista vacia");
          setShow(true);
        } else {
          setShow(false);
        }
        setCaseid(result.data);
      })
      .catch((error: any) => {
        console.log(error);
      });
    return;
  };
  //#endregion

  //#region alert
  const showAlert = (msjAlert: string, msj: string) => {
    if (show) {
      return <AlertDanger msj={msjAlert} />;
    } else {
      return <p>{msj}</p>;
    }

    /*{
      return (
        show && (
          <AlertDanger msj={"NO encontramos casos para el cliente logueado"} />
        )
      );
    }*/
  };
  //endregion

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
            onClick={() => obtenerCaseList(usuario.user_id)}
          >
            Casos abiertos <Icons />
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
            Casos archivados <Icons />
          </a>
        </li>
      </ul>
      <div id="myTabContent" className="tab-content">
        <div className="tab-pane fade active show" id="home" role="tabpanel">
          <div className="row">
            {" "}
            <div className="column"></div>
            <div className="column">
              <div className="row"></div>
              {showAlert(
                "NO encontramos casos para el cliente logueado",
                "Estos son los casos abiertos"
              )}
              {caseList.map((list) => (
                <div className="container">
                  <div className="row shadow p-2 mb-3 bg-white rounded">
                    <div className="col-1">
                      <div>Id </div>
                      <div>{list.rootCaseId} </div>
                    </div>
                    <div className="col-1">
                      <div> Proceso </div>
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
                    <div className="col-3">
                      {" "}
                      <div>Fecha inicio</div>
                      <div>{formatearFecha(list.start)} </div>
                    </div>
                    <div className="col-3">
                      <div>Tareas</div>
                      <div>cant tareas</div>
                    </div>
                    <div className="col-1">
                      <div>
                        {/*<div>
            <Modals id={"vemos o no el modal "} isShow={true} />{" "}
          </div>*/}
                        <button
                          onClick={() => navigateTo(list.id)}
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
        <div className="tab-pane fade " id="profile" role="tabpanel">
          <div className="row">
            <div className="column"></div>
            <div className="column">
              {showAlert(
                "NO encontramos casos para el cliente logueado",
                "Estos son los casos archivados"
              )}

              {archivedCaseList.map((list) => (
                <div className="container">
                  <div className="row shadow p-2 mb-3 bg-white rounded">
                    <div className="col-1">
                      <div>Id </div>
                      <div>{list.rootCaseId} </div>
                    </div>
                    <div className="col-1">
                      <div> Proceso </div>
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
                    <div className="col-3">
                      {" "}
                      <div>Fecha inicio</div>
                      <div>{formatearFecha(list.start)} </div>
                    </div>
                    <div className="col-3">
                      <div>Fecha fin</div>
                      <div>{formatearFecha(list.end_date)}</div>
                    </div>
                    <div className="col-1">
                      <div>
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
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Lista;

/*          <table className="table table-hover table-success table-striped">
            <thead>
              <tr></tr>
            </thead>
            <tbody>
              {archivedCaseList.map((list) => (
                <tr className="table-light">
                  <td>
                    <div className="card border-warning mb-3">
                      <div className="card-header">
                        {list.processDefinitionId.displayName}
                      </div>
                      <div className="card-body">
                        <h4 className="card-title">
                          {list.id} {formatearFecha(list.start)} 
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
          </table> */
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
                  <td>{formatearFecha(list.start)} </td>
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
                <td>{formatearFecha(list.start)} </td>
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
