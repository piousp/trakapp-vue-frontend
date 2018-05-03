import axios from "../../config/axios";

function listar(emisor, receptor, cargados, cantidad) {
  const query = {
    params: {
      emisor,
      cargados,
      cantidad,
    },
  };
  return axios
    .get(`${axios.defaults.baseUrl}/api/mensaje/${receptor}`, query)
    .then(resp => resp.data);
}

function guardar(obj) {
  if (obj._id) {
    return axios
      .put(`${axios.defaults.baseUrl}/api/mensaje/${obj._id}`, obj)
      .then(resp => resp.data);
  }
  return axios
    .post(`${axios.defaults.baseUrl}/api/mensaje`, obj)
    .then(resp => resp.data);
}

const chatApi = {
  listar,
  guardar,
};

export default chatApi;
