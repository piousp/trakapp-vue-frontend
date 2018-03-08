import axios from "../../config/axios";

function listar(pagina, cantidad) {
  const query = {
    params: {
      pagina: pagina || 0,
      cantidad: cantidad || 0,
    },
  };
  return axios
    .get(`${axios.defaults.baseUrl}/api/empleado`, query)
    .then(resp => resp.data);
}

function obtener(id) {
  return axios
    .get(`${axios.defaults.baseUrl}/api/empleado/${id}`)
    .then(resp => resp.data);
}

function guardar(obj) {
  if (obj._id) {
    return axios
      .put(`${axios.defaults.baseUrl}/api/empleado/${obj._id}`, obj)
      .then(resp => resp.data);
  }
  return axios
    .post(`${axios.defaults.baseUrl}/api/empleado`, obj)
    .then(resp => resp.data);
}

function eliminar(id) {
  return axios.delete(`${axios.defaults.baseUrl}/api/empleado/${id}`);
}

const empleadoApi = {
  listar,
  obtener,
  guardar,
  eliminar,
};

export default empleadoApi;
