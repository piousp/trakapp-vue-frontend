import D from "debug";
import findIndex from "lodash/findIndex";
import reject from "lodash/reject";
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
  agregarAMensajes,
  agregarMensajesAMensajes,
  replaceEnMensajes,
  eliminarEnMensajes,
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
    })
    .catch(err => debug(err));
}

function getBase(context, params) {
  debug("getBase");
  const { pagina, cantidad } = params;
  return mensajeApi.getBase(pagina, cantidad)
    .then((resp) => {
      context.commit("setMensajes", resp);
      return resp;
    })
    .catch(err => debug(err));
}

function putID(context, params) {
  debug("putID");
  const { mensaje, conservar } = params;
  return mensajeApi.putID(mensaje)
    .then((resp) => {
      if (conservar) context.commit("setMensaje", resp);
      return resp;
    })
    .catch(err => debug(err));
}

function postBase(context, params) {
  debug("postBase");
  const { mensaje, conservar } = params;
  return mensajeApi.postBase(mensaje)
    .then((resp) => {
      if (conservar) context.commit("setMensaje", resp);
      return resp;
    })
    .catch(err => debug(err));
}

function deleteID(context, params) {
  debug("deleteID");
  const { mensaje, delLocal, delLista } = params;
  return mensajeApi.deleteID(mensaje._id)
    .then(() => {
      if (delLocal) context.commit("resetMensaje");
      if (delLista) context.commit("replaceEnMensajes", mensaje);
      return null;
    })
    .catch(err => debug(err));
}

function guardar(context, params) {
  debug("guardar");
  const { mensaje, conservar, aLista } = params;
  return mensajeApi.guardar(mensaje)
    .then((resp) => {
      if (conservar) context.commit("setMensaje", resp);
      if (aLista) context.commit("replaceEnMensajes", resp);
      if (!mensaje._id) context.commit("agregarAMensajes", resp);
      return resp;
    })
    .catch(err => debug(err));
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
    })
    .catch(err => debug(err));
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
    })
    .catch(err => debug(err));
}

function marcarComoVistos(context, params) {
  debug("listarPublico");
  const { emisor } = params;
  return mensajeApi.marcarComoVistos(emisor)
    .then(debug("Se marcaron los mensajes como vistos"))
    .catch(err => debug(err));
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

function agregarAMensajes(pState, mensaje) {
  debug("agregarAMensajes");
  pState.mensajes.docs.push(mensaje);
  pState.mensajes.cant += 1;
}

function agregarMensajesAMensajes(pState, mensajes) {
  debug("agregarMensajesAMensajes");
  pState.mensajes.docs = pState.mensajes.docs.concat(mensajes);
  pState.mensajes.cant += mensajes.length;
}

function replaceEnMensajes(pState, mensaje) {
  debug("replaceEnMensajes");
  const index = findIndex(pState.mensajes.docs, { _id: mensaje._id });
  pState.mensajes.docs.splice(index, 1, mensaje);
}

function eliminarEnMensajes(pState, mensaje) {
  debug("eliminarEnMensajes");
  pState.mensajes = {
    docs: reject(pState.mensajes.docs, ["_id", mensaje._id]),
    cant: pState.mensajes.cant - 1,
  };
}

function resetMensaje(pState) {
  debug("resetMensaje");
  pState.mensaje = {};
}

function resetMensajes(pState) {
  debug("resetMensajes");
  pState.mensajes = [];
}
