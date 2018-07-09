import D from "debug";
import axios from "../../config/axios";

const debug = D("ciris:agendaApi.js");

function listar(fechaInicio, fechaFin) {
  debug("Llamando al listar", "fechaInicio", fechaInicio, "fechaFin", fechaFin);
  const query = {
    params: {
      fechaInicio,
      fechaFin,
    },
  };
  return axios
    .get(`${axios.defaults.baseUrl}/api/tarea`, query)
    .then(resp => resp.data);
}

function obtener(id) {
  return axios
    .get(`${axios.defaults.baseUrl}/api/tarea/${id}`)
    .then(resp => resp.data);
}

function guardar(obj) {
  if (obj._id) {
    return axios
      .put(`${axios.defaults.baseUrl}/api/tarea/${obj._id}`, obj)
      .then(resp => resp.data);
  }
  return axios
    .post(`${axios.defaults.baseUrl}/api/tarea`, obj)
    .then(resp => resp.data);
}

function eliminar(id) {
  return axios.delete(`${axios.defaults.baseUrl}/api/tarea/${id}`);
}

function getTareas() {
  return axios
    .get(`${axios.defaults.baseUrl}/api/tarea/lista`)
    .then(resp => resp.data);
}

const agendaApi = {
  listar,
  obtener,
  guardar,
  eliminar,
  getTareas,
};

export default agendaApi;
