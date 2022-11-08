import React, { useState, useContext, useEffect } from "react";
import NavBar from "./navBar";
import { useLocation } from "react-router-dom";
import axios from "axios";
import ChildFormCasoDetalle from "../components/childFormCasoDetalle";
import { iCase } from "../interfaces/case";
import Cookies from "universal-cookie";
import { iListCaseForClient } from "../interfaces/listCaseClient";
import CasoConDetalle from "./casoConDetalle";

const CasoDetalle = () => {
  const query = new URLSearchParams(useLocation().search);
  const idCaso = query.get("id");
  type caseId = iCase;
  const [caseid, setCaseid] = useState<caseId[]>([]);

  const [caseList, setCaseList] = useState<iListCaseForClient[]>([]);
  //setCaseid(data);
  if (idCaso == null) {
    console.log("caso en null");
  }
  const [show, setShow] = useState(true);
  const showModal = (view: boolean) => {
    setShow(view);
  };

  //#region caseForId
  const caseForId = async (id: string) => {
    setCaseList([]);
    setShow(false);
    //setCaseid(caseid);
    console.log("el id", id);

    let idint = parseInt(id);
    if (idint <= 0) {
      console.log("no es mayor a cero");
      setShow(false);
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
    console.log(axios.defaults.baseURL);
    console.log(process.env.REACT_APP_BASE_URL_API);
    axios
      .get(
        process.env.REACT_APP_GET_CASEFORID +
          id +
          "?d=processDefinitionId&d=started_by&d=startedBySubstitute"
      )
      .then((resp) => {
        let result = resp;
        setCaseid(result.data);
        console.log(result.data);
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
