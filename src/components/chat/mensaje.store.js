import D from "debug";
import findIndex from "lodash/findIndex";
import reject from "lodash/reject";
import mensajeApi from "./mensaje.api.js";

const debug = D("ciris:mensaje");

const state = {
  mensaje: {},
  mensajesPublicos: { docs: [], cant: 0 },
  mensajesPrivados: { docs: [], cant: 0 },
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
  setMensajesPublicos,
  setMensajesPrivados,
  agregarAMensajesPublicos,
  agregarAMensajesPrivados,
  agregarMensajesAMensajesPublicos,
  agregarMensajesAMensajesPrivados,
  replaceEnMensajesPublicos,
  replaceEnMensajesPrivados,
  eliminarEnMensajesPublicos,
  eliminarEnMensajesPrivados,
  resetMensaje,
  resetMensajesPublicos,
  resetMensajesPrivados,
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
      context.commit("setMensajesPublicos", resp);
      context.commit("setMensajesPrivados", resp);
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
  const {
    mensaje, delLocal, delListaPublicos, delListaPrivados,
  } = params;
  return mensajeApi.deleteID(mensaje._id)
    .then(() => {
      if (delLocal) context.commit("resetMensaje");
      if (delListaPublicos) context.commit("eliminarEnMensajesPublicos", mensaje);
      if (delListaPrivados) context.commit("eliminarEnMensajesPrivados", mensaje);
      return null;
    })
    .catch(err => debug(err));
}

function guardar(context, params) {
  debug("guardar");
  const {
    mensaje, conservar, aListaPublica, aListaPrivada,
  } = params;
  return mensajeApi.guardar(mensaje)
    .then((resp) => {
      if (conservar) context.commit("setMensaje", resp);
      if (aListaPublica) {
        if (mensaje._id) return context.commit("replaceEnMensajesPublicos", resp);
        return context.commit("agregarAMensajesPublicos", resp);
      }
      if (aListaPrivada) {
        if (mensaje._id) return context.commit("replaceEnMensajesPrivada", resp);
        return context.commit("agregarAMensajesPrivados", resp);
      }
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
      context.commit("setMensajesPrivados", resp);
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
      context.commit("setMensajesPublicos", resp);
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

function setMensajesPublicos(pState, mensajes) {
  debug("setMensajesPublicos");
  pState.mensajesPublicos = mensajes;
}

function setMensajesPrivados(pState, mensajes) {
  debug("setMensajesPrivados");
  pState.mensajesPrivados = mensajes;
}

function agregarAMensajesPublicos(pState, mensaje) {
  debug("agregarAMensajesPublicos");
  pState.mensajesPublicos.docs.push(mensaje);
  pState.mensajesPublicos.cant += 1;
}

function agregarAMensajesPrivados(pState, mensaje) {
  debug("agregarAMensajesPrivados");
  pState.mensajesPrivados.docs.push(mensaje);
  pState.mensajesPrivados.cant += 1;
}

function agregarMensajesAMensajesPublicos(pState, mensajes) {
  debug("agregarMensajesAMensajesPublicos");
  pState.mensajesPublicos.docs = pState.mensajesPublicos.docs.concat(mensajes);
  pState.mensajesPublicos.cant += mensajes.length;
}

function agregarMensajesAMensajesPrivados(pState, mensajes) {
  debug("agregarMensajesAMensajesPrivados");
  pState.mensajesPrivados.docs = pState.mensajesPrivados.docs.concat(mensajes);
  pState.mensajesPrivados.cant += mensajes.length;
}

function replaceEnMensajesPublicos(pState, mensaje) {
  debug("replaceEnMensajesPublicos");
  const index = findIndex(pState.mensajesPublicos.docs, { _id: mensaje._id });
  pState.mensajesPublicos.docs.splice(index, 1, mensaje);
}

function replaceEnMensajesPrivados(pState, mensaje) {
  debug("replaceEnMensajesPrivados");
  const index = findIndex(pState.mensajesPrivados.docs, { _id: mensaje._id });
  pState.mensajesPrivados.docs.splice(index, 1, mensaje);
}

function eliminarEnMensajesPublicos(pState, mensaje) {
  debug("eliminarEnMensajesPublicos");
  pState.mensajesPublicos = {
    docs: reject(pState.mensajesPublicos.docs, ["_id", mensaje._id]),
    cant: pState.mensajesPublicos.cant - 1,
  };
}

function eliminarEnMensajesPrivados(pState, mensaje) {
  debug("eliminarEnMensajesPrivados");
  pState.mensajesPrivados = {
    docs: reject(pState.mensajesPrivados.docs, ["_id", mensaje._id]),
    cant: pState.mensajesPrivados.cant - 1,
  };
}

function resetMensaje(pState) {
  debug("resetMensaje");
  pState.mensaje = {};
}

function resetMensajesPublicos(pState) {
  debug("resetMensajesPublicos");
  pState.mensajesPublicos = [];
}

function resetMensajesPrivados(pState) {
  debug("resetMensajesPrivados");
  pState.mensajesPrivados = [];
}
