import D from "debug";
import reject from "lodash/reject";
import rutaApi from "./ruta.api.js";

const debug = D("ciris:rutas");

const state = {
  rutas: { docs: [], cant: 0 },
  ruta: { ubicaciones: [] },
};

const actions = {
  getID,
  getBase,
  putID,
  postBase,
  deleteID,
  guardar,
};

const mutations = {
  setRuta,
  setRutas,
  eliminarEnRutas,
  resetRuta,
  resetRutas,
};

const store = {
  state,
  actions,
  mutations,
  namespaced: true,
};

export default store;

// actions

function getID(context, params) {
  debug("getID");
  const { id } = params;
  return rutaApi.getID(id)
    .then((ruta) => {
      context.commit("setRuta", ruta);
      return ruta;
    })
    .catch(err => debug(err));
}

function getBase(context, params) {
  debug("getBase");
  const { pagina, cantidad } = params;
  return rutaApi.getBase(pagina, cantidad)
    .then((resp) => {
      context.commit("setRutas", resp);
      return resp;
    })
    .catch(err => debug(err));
}

function putID(context, params) {
  debug("putID");
  const { ruta, conservar } = params;
  return rutaApi.putID(ruta)
    .then((resp) => {
      if (conservar) context.commit("setRuta", resp);
      return resp;
    })
    .catch(err => debug(err));
}

function postBase(context, params) {
  debug("postBase");
  const { ruta, conservar } = params;
  return rutaApi.postBase(ruta)
    .then((resp) => {
      if (conservar) context.commit("setRuta", resp);
      return resp;
    })
    .catch(err => debug(err));
}

function deleteID(context, params) {
  debug("deleteID");
  const { ruta, delLocal, deLista } = params;
  return rutaApi.deleteID(ruta._id)
    .then(() => {
      if (delLocal) context.commit("resetRuta");
      if (deLista) context.commit("eliminarEnRutas", ruta);
      return null;
    })
    .catch(err => debug(err));
}

function guardar(context, params) {
  debug("guardar");
  const { ruta, conservar } = params;
  return rutaApi.guardar(ruta)
    .then((resp) => {
      if (conservar) context.commit("setRuta", resp);
      return resp;
    })
    .catch(err => debug(err));
}

// mutations

function setRutas(pState, rutas) {
  debug("setRutas");
  pState.rutas = rutas;
}

function setRuta(pState, ruta) {
  debug("setRuta");
  pState.ruta = ruta;
}

function eliminarEnRutas(pState, tarea) {
  debug("eliminarEnRutas");
  pState.rutas = {
    docs: reject(pState.rutas.docs, ["_id", tarea._id]),
    cant: pState.rutas.cant - 1,
  };
}

function resetRutas(pState) {
  debug("resetRutas");
  pState.rutas = { docs: [], cant: 0 };
}

function resetRuta(pState) {
  debug("resetRuta");
  pState.ruta = { ubicaciones: [] };
}
