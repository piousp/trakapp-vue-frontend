import axios from "../../config/axios";

function listar(pagina, cantidad) {
  const query = {
    params: {
      pagina: pagina || 0,
      cantidad: cantidad || 0,
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

const agendaApi = {
  listar,
  obtener,
  guardar,
  eliminar,
};

export default agendaApi;
