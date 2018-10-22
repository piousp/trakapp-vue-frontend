import D from "debug";
import axios from "../config/axios";

const debug = D("ciris:reporteAPI.js");

const reporteApi = {
  getTareasRealizadas,
  getTareasPendientes,
  getTareasAtrasadas,
};

export default reporteApi;

function getTareasRealizadas(filtros) {
  debug("getTareasRealizadas");
  const query = {
    params: {
      filtros,
    },
  };
  return axios
    .get(`${axios.defaults.baseUrl}/api/reporte/getTareasRealizadas/`, query)
    .then(resp => resp.data);
}

function getTareasPendientes(filtros) {
  debug("getTareasPendientes");
  const query = {
    params: {
      filtros,
    },
  };
  return axios
    .get(`${axios.defaults.baseUrl}/api/reporte/getTareasPendientes/`, query)
    .then(resp => resp.data);
}

function getTareasAtrasadas(filtros) {
  debug("getTareasAtrasadas");
  const query = {
    params: {
      filtros,
    },
  };
  return axios
    .get(`${axios.defaults.baseUrl}/api/reporte/getTareasAtrasadas/`, query)
    .then(resp => resp.data);
}
