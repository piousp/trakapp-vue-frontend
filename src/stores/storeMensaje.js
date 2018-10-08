import D from "debug";
import mensajeApi from "../APIs/mensajeApi";

const debug = D("ciris:storeMensaje");

const state = {
  mensaje: {},
  mensajes: { docs: [], cant: 0 },
};

const actions = {
  getID,
  getBase,
  putID,
  postBase,
  deleteID,
  guardar,
  listarPrivado,
  listarPublico,
  marcarComoVistos,
};

const mutations = {
  setMensaje,
  setMensajes,
  resetMensaje,
  resetMensajes,
};


const store = {
  state,
  actions,
  mutations,
  namespaced: true,
};

export default store;

function getID(context, params) {
  debug("getID");
  const { id } = params;
  return mensajeApi.getID(id)
    .then((resp) => {
      context.commit("setMensaje", resp);
      return resp;
    });
}

function getBase(context, params) {
  debug("getBase");
  const { pagina, cantidad } = params;
  return mensajeApi.getBase(pagina, cantidad)
    .then((resp) => {
      context.commit("setMensajes", resp);
      return resp;
    });
}

function putID(context, params) {
  debug("putID");
  const { cuenta, conservar } = params;
  return mensajeApi.putID(cuenta)
    .then((resp) => {
      if (conservar) context.commit("setMensaje", resp);
      return resp;
    });
}

function postBase(context, params) {
  debug("postBase");
  const { cuenta, conservar } = params;
  return mensajeApi.postBase(cuenta)
    .then((resp) => {
      if (conservar) context.commit("setMensaje", resp);
      return resp;
    });
}

function deleteID(context, params) {
  debug("deleteID");
  const { cuenta, delLocal } = params;
  return mensajeApi.deleteID(cuenta._id)
    .then(() => {
      if (delLocal) context.commit("setMensaje", null);
      return null;
    });
}

function guardar(context, params) {
  debug("guardar");
  const { cuenta, conservar } = params;
  return mensajeApi.guardar(cuenta)
    .then((resp) => {
      if (conservar) context.commit("setMensaje", resp);
      return resp;
    });
}

function listarPrivado(context, params) {
  debug("listarPrivado");
  const {
    cargados, cantidad, emisor, receptor,
  } = params;
  return mensajeApi.listarPrivado(cargados, cantidad, emisor, receptor)
    .then((resp) => {
      context.commit("setMensajes", resp);
      return resp;
    });
}

function listarPublico(context, params) {
  debug("listarPublico");
  const {
    cargados, cantidad,
  } = params;
  return mensajeApi.listarPublico(cargados, cantidad)
    .then((resp) => {
      context.commit("setMensajes", resp);
      return resp;
    });
}

function marcarComoVistos(context, params) {
  debug("listarPublico");
  const { emisor } = params;
  return mensajeApi.marcarComoVistos(emisor);
}

// mutations

function setMensaje(pState, mensaje) {
  debug("setMensaje");
  pState.mensaje = mensaje;
}

function setMensajes(pState, mensajes) {
  debug("setMensaje");
  pState.mensajes = mensajes;
}

function resetMensaje(pState) {
  debug("resetMensaje");
  pState.mensaje = {};
}

function resetMensajes(pState) {
  debug("resetMensajes");
  pState.mensajes = [];
}
