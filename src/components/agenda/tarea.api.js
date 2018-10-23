import D from "debug";
import axios from "../../config/axios";
import rutasGenericas from "../../config/apiBase";

const debug = D("ciris:tareaApi.js");

const apiSinBases = {
  modelo: "tarea",
  listarXFecha,
  getTareasPopuladas,
};

const tareaApi = rutasGenericas(apiSinBases);

export default tareaApi;

function listarXFecha(fechaInicio, fechaFin) {
  debug("listarXFecha", "fechaInicio", fechaInicio, "fechaFin", fechaFin);
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
  debug("getTareasPopuladas");
  return axios
    .get(`${axios.defaults.baseUrl}/api/tarea/listaPopulada`)
    .then(resp => resp.data);
}
