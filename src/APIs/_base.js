import D from "debug";
import axios from "../config/axios";

const debug = D("ciris:rest/rutas/_base.js");

export default rutasGenericas;
export {
  getID,
  getBase,
  putID,
  postBase,
  deleteID,
  guardar,
};

function getID(api) {
  api.getID = id => axios
    .get(`${axios.defaults.baseUrl}/api/${api.modelo}/${id}`)
    .then(resp => resp.data);
  return api;
}

function getBase(api) {
  api.getBase = (pagina, cantidad) => {
    const query = {
      params: {
        pagina: pagina || 0,
        cantidad: cantidad || 0,
      },
    };
    return axios.get(`${axios.defaults.baseUrl}/api/${api.modelo}/`, query)
      .then(resp => resp.data);
  };
  return api;
}

function putID(api) {
  api.putID = obj => axios
    .put(`${axios.defaults.baseUrl}/api/${api.modelo}/${obj.id}`, obj)
    .then(resp => resp.data);
  return api;
}

function postBase(api) {
  api.postBase = obj => axios
    .post(`${axios.defaults.baseUrl}/api/${api.modelo}`, obj)
    .then(resp => resp.data);
  return api;
}

function deleteID(api) {
  api.deleteID = id => axios.delete(`${axios.defaults.baseUrl}/api/${api.modelo}/${id}`);
  return api;
}

function guardar(api) {
  api.guardar = (obj) => {
    if (obj._id) {
      return axios
        .put(`${axios.defaults.baseUrl}/api/${api.modelo}/${obj._id}`, obj)
        .then(resp => resp.data);
    }
    return axios
      .post(`${axios.defaults.baseUrl}/api/${api.modelo}`, obj)
      .then(resp => resp.data);
  };
  return api;
}

function rutasGenericas(api) {
  debug("Registrando todas las rutas genéricas");
  const APIg = getID(api);
  const APIbase = getBase(APIg);
  const APIput = putID(APIbase);
  const APIpost = postBase(APIput);
  const APIdelete = deleteID(APIpost);
  const APIguardar = guardar(APIdelete);
  return APIguardar;
}
