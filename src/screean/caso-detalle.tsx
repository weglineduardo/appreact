import React, { useState, useContext, useEffect } from "react";
import NavBar from "./navBar";
import { useLocation } from "react-router-dom";
import axios from "axios";
import ChildFormCasoDetalle from "../components/childFormCasoDetalle";
import { iCase } from "../interfaces/case";
import { iListCaseForClient } from "../interfaces/listCaseClient";
import CasoConDetalle from "./casoConDetalle";
import apiBonita from "../apis/ApiBonita";
import { iUsuario } from "../interfaces/usuario";
const { Cookies: kks } = require("react-cookie");
const cok = new kks();

const CasoDetalle = () => {
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
  const query = new URLSearchParams(useLocation().search);
  const idCaso = query.get("id");
  type caseId = iCase;
  const [caseid, setCaseid] = useState<caseId[]>([]);
  const [usuario, setUsuario] = useState<iUsuario>(iUarioActivo);
  const [caseList, setCaseList] = useState<iListCaseForClient[]>([]);

  const [cantTask, setCantTask] = useState(0);
  //setCaseid(data);
  if (idCaso == null) {
    console.log("caso en null");
  }
  const [show, setShow] = useState(true);
  let [cantHumanTassk, setCantHumanTassk] = useState();
  const showModal = (view: boolean) => {
    setShow(view);
  };

  //#region caseForId
  const caseForId = async (id: string) => {
    setCaseList([]);
    setShow(false);
    console.log("el id", id);

    let idint = parseInt(id);
    if (idint <= 0) {
      console.log("no es mayor a cero");
      setShow(false);
      return;
    }
    let JSESSIONIDNODE = cok.get("JSESSIONIDNODE");
    let X_Bonita_API_Token = cok.get("X-Bonita-API-Token");
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

        setShow(true);
        return;
      })
      .catch((error: any) => {
        console.log(error);
        setShow(false);
        return;
      });
    return;
  };
  //const apigetListHumanTask = apiBonita.getListHumanTask("18");
  //console.log({ apigetListHumanTask });
  //console.log({ cantHumanTassk });
  //
  //const apigetHumanTaskUserCase = apiBonita.getHumanTaskUserCase(
  //  "18",
  //  idCaso ? idCaso : "0"
  //);
  //console.log({ apigetHumanTaskUserCase });
  //console.log({ cantHumanTassk });

  const getHumanTask = async (user_id: string) => {
    if (user_id != "") {
      let X_Bonita_API_Token = cok.get("X-Bonita-API-Token");
      axios.defaults.baseURL = process.env.REACT_APP_BASE_URL_API;

      axios.defaults.headers.post["Content-Type"] =
        "application/json;charset=utf-8";
      axios.defaults.headers.post["Access-Control-Allow-Origin"] = "*";
      axios.defaults.withCredentials = true;
      axios.defaults.headers.get["X-Bonita-API-Token"] = X_Bonita_API_Token;

      await axios
        .get("" + process.env.REACT_APP_LISTHUMANTASK + user_id)
        .then((resp) => {
          console.log("getHumanTadk", resp.data.length);
          //setCantHumanTassk(resp.data.length);
        })
        .catch((error: any) => {
          console.log(error);
        });
      return;
    } else {
      return;
    }
  };
  const getHumeanTaskUserCase = async (user_id: string, caso_id: string) => {
    //await usuarioActivo();
    let userId = usuario.user_id;
    console.log({ userId });
    axios.defaults.baseURL = process.env.REACT_APP_BASE_URL_API;
    axios.defaults.headers.post["Content-Type"] =
      "application/json;charset=utf-8";
    axios.defaults.headers.post["Access-Control-Allow-Origin"] = "*";
    axios.defaults.withCredentials = true;
    await axios
      .get(
        "/bonita/API/bpm/humanTask?p=0&c=50&f=state=ready&f=user_id=" +
          userId +
          "&f=caseId=" +
          idCaso
      )
      .then((resp) => {
        setCantTask(resp.data.length);
        console.log("result.data.length :", resp.data.length);
        if (resp.data.length == 0) {
          console.log("lista vacia");
        } else {
        }
      })
      .catch((error: any) => {
        console.log(error);
      });
    return;
  };
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
        console.log(result.data);
      })
      .catch((error) => {
        console.log(error);
      });
    return;
  };

  useEffect(() => {
    usuarioActivo();
    usuarioActivo();
    getHumeanTaskUserCase(usuario.user_id, idCaso ? idCaso : "0");
  }, []);
  const leerCaso = () => {
    if (idCaso == null || idCaso.length <= 0) {
      return (
        <>
          <div className="App">
            <div>
              <div className="container ">
                <div className="row shadow p-2 mb-3 bg-white rounded">
                  <div className="row">No encontramos el caso buscado</div>
                </div>
              </div>
            </div>
          </div>
        </>
      );
    } else {
      if (show) {
        useEffect(() => {
          caseForId(idCaso);
          getHumeanTaskUserCase(usuario.user_id, idCaso);
          //getHumanTadk("18");
        }, []);
        return (
          <>
            <div className="App">
              <div>
                <div className="container ">
                  <div className="row shadow p-2 mb-3 bg-white rounded">
                    <div className="row">
                      <div className="col">
                        {" "}
                        <div></div>
                        <CasoConDetalle />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        );
      } else {
        useEffect(() => {
          caseForId(idCaso);
          getHumeanTaskUserCase(usuario.user_id, idCaso);
          //getHumanTadk("18");
        }, []);
        //caseForId(idCaso);
        if (show) {
          if (caseList.length >= 0) {
            return (
              <>
                <div className="App">
                  <div>
                    <div className="container ">
                      <div className="row shadow p-2 mb-3 bg-white rounded">
                        <div className="row">
                          <div className="col">
                            {" "}
                            <div></div>
                            <div>
                              {" "}
                              <ChildFormCasoDetalle
                                idAcordion={"Incidente"}
                                titleAcordion={"Incidentes"}
                                cardHeader={"ID del Caso : " + idCaso}
                                cardTitle={""}
                                textButton={"A"}
                                body={""}
                                routeUrl="routeUrl"
                                style={"danger"}
                                data={JSON.stringify(caseid)}
                                casoId={idCaso}
                                caseData={caseList[0]}
                                cantTask={cantTask}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            );
          } else {
            <>
              <div className="App">
                <div>
                  <div className="container ">
                    <div className="row shadow p-2 mb-3 bg-white rounded">
                      <div className="row">No encontramos el caso buscado</div>
                    </div>
                  </div>
                </div>
              </div>
            </>;
          }
        }
      }
    }
  };

  return (
    <>
      <NavBar />
      {leerCaso()}
    </>
  );
};

export default CasoDetalle;
