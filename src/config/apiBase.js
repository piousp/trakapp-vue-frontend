import D from "debug";
import flow from "lodash/flow";
import axios from "../config/axios";

const debug = D("ciris:config/apiBase.js");

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
  api.getID = (id) => {
    debug(`Ejecutando getID en API de ${api.modelo}`);
    return axios
      .get(`${axios.defaults.baseUrl}/api/${api.modelo}/${id}`)
      .then(resp => resp.data);
  };
  return api;
}

function getBase(api) {
  api.getBase = (pagina, cantidad) => {
    debug(`Ejecutando getBase en API de ${api.modelo}`);
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
  api.putID = (obj) => {
    debug(`Ejecutando putID en API de ${api.modelo}`);
    return axios
      .put(`${axios.defaults.baseUrl}/api/${api.modelo}/${obj.id}`, obj)
      .then(resp => resp.data);
  };
  return api;
}

function postBase(api) {
  api.postBase = (obj) => {
    debug(`Ejecutando postBase en API de ${api.modelo}`);
    return axios
      .post(`${axios.defaults.baseUrl}/api/${api.modelo}`, obj)
      .then(resp => resp.data);
  };
  return api;
}

function deleteID(api) {
  api.deleteID = (id) => {
    debug(`Ejecutando deleteID en API de ${api.modelo}`);
    return axios.delete(`${axios.defaults.baseUrl}/api/${api.modelo}/${id}`);
  };
  return api;
}

function guardar(api) {
  api.guardar = (obj) => {
    debug(`Ejecutando guardar en API de ${api.modelo}`);
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
  debug(`Registrando todas las rutas genéricas para: ${api.modelo}`);
  const curryFlow = flow(getID, getBase, putID, postBase, deleteID, guardar);
  return curryFlow(api);
}
