import D from "debug";
import axios from "../config/axios";
import rutasGenericas from "./_base";

const debug = D("ciris:tareaApi.js");

const apiSinBases = {
  modelo: "tarea",
  listarXFecha,
  getTareasPopuladas,
};

const tareaApi = rutasGenericas(apiSinBases);

function listarXFecha(fechaInicio, fechaFin) {
  debug("Llamando al listar", "fechaInicio", fechaInicio, "fechaFin", fechaFin);
  const query = {
    params: {
      fechaInicio,
      fechaFin,
    },
  };
  return axios
    .get(`${axios.defaults.baseUrl}/api/tarea/listarXFecha`, query)
    .then(resp => resp.data);
}

function getTareasPopuladas() {
  debug("Get Tareas Populadas");
  return axios
    .get(`${axios.defaults.baseUrl}/api/tarea/listaPopulada`)
    .then(resp => resp.data);
}

export default tareaApi;
