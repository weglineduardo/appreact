import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import {
  Navigate,
  redirect,
  BrowserRouter,
  useNavigate,
} from "react-router-dom";
import AlertSuccess from "../screean/alertSuccess";
import DateTimePicker from "./dateTimePicker";
const { Cookies: kks } = require("react-cookie");
const cok = new kks();

interface Props {
  idAcordion: string;
  titleAcordion: string;
  cardHeader: string;
  cardTitle: string;
  body: string;
  textButton: string;
  routeUrl: string;
  style: string;
}

const ChildFormServiceRequest: React.FC<Props> = ({
  idAcordion,
  titleAcordion,
  cardHeader,
  cardTitle,
  body,
  textButton,
  routeUrl,
  style,
}) => {
  let [createCaseId, setCreateCaseId] = useState({});
  let [processId, setProcessId] = useState("");
  useEffect(() => {
    getProcessName("ServiceRequest");
  }, []);
  const [alarma, setAlarma] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [creado, setCreado] = useState(false);
  const [prioridad, setPrioridad] = useState("");
  const [torre, setTorre] = useState("");
  const [ci, setCi] = useState("");
  const [fechaEsperada, setFechaEsperada] = useState("");
  const Style = `card border-primary mb-${style}`;
  const navigate = useNavigate();
  const navigateTo = (routeUrl: string) => {
    const url = `${routeUrl}`;
    navigate(url);
  };
  const createRequerimiento = async (
    sprocessId: string,
    isetProcessId: React.Dispatch<React.SetStateAction<string>>,
    alarma: string,
    descripcion: string,
    prioridad: string,
    torre: string,
    ci: string,
    fechaEsperada: string
  ) => {
    await getProcessName("ServiceRequest");

    if (sprocessId == "") {
      console.log("sprocessId vacio ", sprocessId);
      await getProcessName("ServiceRequest");
      await createCaseBonitaFechOk(sprocessId);
    } else {
      await createCaseBonitaFechOk(sprocessId);
    }
    if (creado) {
      showAlert();
    }
    setTimeout(function() {
      navigateTo("/app");
    }, 4000);
  };
  const createCaseBonitaFechOk = async (processId: string) => {
    if (processId === "") {
      console.log("llego vacio el processID : ", processId);
      return;
    }
    const X_Bonita_API_Token = cok.get("X-Bonita-API-Token");
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("X-Bonita-API-Token", X_Bonita_API_Token);
    var urlencoded = new URLSearchParams();

    const raw = JSON.stringify({
      serviceRequestInput: {
        alarma: alarma,
        categoria: "DBA",
        ci: "altaicare_4_0_0_OP1108",
        fechaEsperada: "2022-11-03T11:55:00",
        descripcion: descripcion,
        prioridad: prioridad,
        estado: "",
      },
    });
    const rawbkp = JSON.stringify({
      serviceRequestInput: {
        alarma: alarma,
        descripcion: descripcion,
        prioridad: prioridad,
        estado: "",
      },
    });

    const RequestInit: RequestInit = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
      credentials: "include",
    };
    RequestInit.method = "POST";

    const BASE_URL =
      "" +
      process.env.REACT_APP_BASE_URL_API +
      process.env.REACT_APP_POST_CASE +
      processId +
      "/instantiation";

    await fetch(BASE_URL, RequestInit)
      .then((response) => {
        if (!response.ok) {
          console.log("!result.ok", response);
          setCreado(false);

          return;
        }

        readCreateCase(response);
        console.log("readCreateCase", JSON.stringify(response));
        console.log("readCreateCase", JSON.stringify(response.status));
        console.log("readCreateCase", response);
        window.localStorage.setItem(
          "createCaseBonitaFechOk",
          JSON.stringify({ response })
        );
        setCreado(true);
        console.log(response.body);

        return;
      })
      .catch((error) => {
        console.log("error fetch ------", error);
        setCreado(false);
        return;
      });
    return;
  };

  const usuarioActivo = async () => {
    axios.defaults.headers.post["Content-Type"] =
      "application/json;charset=utf-8";
    axios.defaults.headers.post["Access-Control-Allow-Origin"] = "*";
    axios.defaults.withCredentials = true;

    await axios
      .get("" + process.env.REACT_APP_API_USERACTIVE)
      .then((resp) => {
        let result = resp;

        console.log(result.data);
        window.localStorage.setItem("usuario", JSON.stringify(result.data));
        let storrageUser = JSON.stringify(
          window.localStorage.getItem("usuario")
        );
        return;
      })
      .catch((error) => {
        console.log(error);

        return;
      });
    return;
  };
  const getProcessName = async (processName: string) => {
    if (processName != "") {
      let X_Bonita_API_Token = cok.get("X-Bonita-API-Token");
      axios.defaults.baseURL = process.env.REACT_APP_BASE_URL_API;

      axios.defaults.headers.post["Content-Type"] =
        "application/json;charset=utf-8";
      axios.defaults.headers.post["Access-Control-Allow-Origin"] = "*";
      axios.defaults.withCredentials = true;
      axios.defaults.headers.get["X-Bonita-API-Token"] = X_Bonita_API_Token;
      await axios
        .get("" + process.env.REACT_APP_GET_PROCESSNAME + processName)
        .then((resp) => {
          setProcessId(resp.data[0].id);
        })
        .catch((error: any) => {
          console.log(error);
        });
      return;
    } else {
      return;
    }
  };
  const getHumanTadk = async (user_id: string) => {
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
          setProcessId(resp.data[0].id);
        })
        .catch((error: any) => {
          console.log(error);
        });
      return;
    } else {
      return;
    }
  };
  const showAlert = () => {
    if (creado) {
      return (
        <>
          {/* <Modals id={"vemos o no el modal "} isShow={true} />
          
          <AlertSuccess msj={"Requerimiento creado Numero:" + createCaseId} />*/}
          <AlertSuccess
            msj={"Requerimiento creado Numero:" + { createCaseId }}
          />
          <div
            className="toast show"
            role="alert"
            aria-live="assertive"
            aria-atomic="true"
          >
            <div className="toast-header">
              <strong className="me-auto">Requerimiento Creado</strong>
              <small>11 mins ago</small>
              <button
                type="button"
                className="btn-close ms-2 mb-1"
                data-bs-dismiss="toast"
                aria-label="Close"
                onClick={() => {
                  setCreado(false);
                }}
              >
                <span aria-hidden="true"></span>
              </button>
            </div>
            <div className="toast-body">Se creo el caso numero :</div>
          </div>
          {/*JSON.stringify(createCaseId)*/}
        </>
      );
    } else {
      return <div></div>;
    }
  };
  function readCreateCase(body: {}) {
    setCreateCaseId(body);
  }

  return (
    <div>
      {}

      <div className={Style}>
        <div className="card-header">{cardHeader}</div>
        <div className="card-body">
          <h4 className="card-title">{cardTitle}</h4>
          <p className="card-text">{body}</p>
          <form>
            <fieldset>
              <div className="form-group">
                <p className="form-label mt-1 text-start">Alarma</p>
                <input
                  type="text"
                  className="form-control"
                  id="alarma"
                  placeholder="Ingrese un titulo"
                  autoComplete="off"
                  onChange={(e) => setAlarma(e.target.value)}
                />
              </div>
              <div className="form-group">
                <p className="form-label mt-4 text-start">Descripcion</p>
                <textarea
                  className="form-control"
                  id="exampleTextarea"
                  itemID="descripcion"
                  placeholder="Ingrese la descripcion del incidente lo mas detallado posible"
                  onChange={(e) => setDescripcion(e.target.value)}
                ></textarea>
              </div>
              <div className="form-group ">
                <p className="form-label mt-4 text-start">Prioridad</p>
                <div
                  className="btn-group d-flex justify-content-between col-3"
                  role="group"
                  aria-label="Basic radio toggle button group"
                >
                  <input
                    type="radio"
                    className="btn-check"
                    name="btnradio"
                    id="btnradio1"
                    autoComplete="off"
                    onChange={(e) => setPrioridad("Baja")}
                  />
                  <label className="btn btn-outline-info" htmlFor="btnradio1">
                    Baja
                  </label>
                  <input
                    type="radio"
                    className="btn-check"
                    name="btnradio"
                    id="btnradio2"
                    autoComplete="off"
                    onChange={(e) => setPrioridad("Media")}
                  />
                  <label
                    className="btn btn-outline-warning"
                    htmlFor="btnradio2"
                  >
                    Media
                  </label>
                  <input
                    type="radio"
                    className="btn-check"
                    name="btnradio"
                    id="btnradio3"
                    autoComplete="off"
                    onChange={(e) => setPrioridad("Alta")}
                    defaultChecked
                  />
                  <label
                    className="btn btn-outline-primary"
                    htmlFor="btnradio3"
                  >
                    Alta
                  </label>
                </div>
              </div>
              <div className="form-group">
                <p className="form-label mt-4 text-start">Torre</p>
                <select
                  className="form-select"
                  aria-label="Default select example"
                  onChange={(e) => setTorre(e.target.value)}
                >
                  <option selected>Seleccione una Torre</option>
                  <option value="DBA">DBA</option>
                  <option value="Wintel">Wintel</option>
                  <option value="Linux">Linux</option>
                  <option value="Monitoreo">Monitoreo</option>
                  <option value="Indefinido">Indefinido</option>
                </select>
              </div>
              <div className="form-group">
                <p className="form-label mt-4 text-start">CI</p>
                <select
                  className="form-select"
                  aria-label="Default select example"
                  onChange={(e) => setCi(e.target.value)}
                >
                  <option selected>Seleccione un CI</option>
                  <option value="chksms001">chksms001</option>
                  <option value="CNA-WKS">CNA-WKS</option>
                  <option value="Collector-2.9-B-14">Collector-2.9-B-14</option>
                  <option value="CUCMPUB-P01">CUCMPUB-P01</option>
                  <option value="CUCMSUB-P01">CUCMSUB-P01</option>
                  <option value="CUCPUB-P01">CUCPUB-P01</option>
                  <option value="CUCSUB-P01">CUCSUB-P01</option>
                  <option value="CUPSPUB-P0">CUPSPUB-P0</option>
                  <option value="CDesconocido">Desconocido</option>
                </select>
              </div>
              <div className="form-group">
                <p className="form-label mt-4 text-start">
                  Fecha espera <DateTimePicker />
                </p>
              </div>
            </fieldset>
          </form>
        </div>
        {showAlert()}
        <button
          onClick={() =>
            createRequerimiento(
              processId,
              setProcessId,
              alarma,
              descripcion,
              prioridad,
              torre,
              ci,
              fechaEsperada
            )
          }
          className="btn btn-primary btn-sm"
        >
          {textButton}
        </button>
      </div>
    </div>
  );
};

export default ChildFormServiceRequest;
