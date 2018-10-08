import axios from "../config/axios";

const reporteApi = {
  getTareasRealizadas,
  getTareasPendientes,
  getTareasAtrasadas,
};

function getTareasRealizadas(filtros) {
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
  const query = {
    params: {
      filtros,
    },
  };
  return axios
    .get(`${axios.defaults.baseUrl}/api/reporte/getTareasAtrasadas/`, query)
    .then(resp => resp.data);
}

export default reporteApi;
