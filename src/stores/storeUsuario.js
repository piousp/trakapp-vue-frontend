import D from "debug";
import usuarioApi from "../APIs/usuarioApi";

const debug = D("ciris:storeUsuario");

const state = {
  usuario: { subtareas: [] },
  usuarios: { docs: [], cant: 0 },
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
  setUsuario,
  setUsuarios,
  resetUsuario,
  resetUsuarios,
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
  return usuarioApi.getID(id)
    .then((resp) => {
      context.commit("setUsuario", resp);
      return resp;
    });
}

function getBase(context, params) {
  debug("getBase");
  const { pagina, cantidad } = params;
  return usuarioApi.getBase(pagina, cantidad)
    .then((resp) => {
      context.commit("setUsuarios", resp);
      return resp;
    });
}

function putID(context, params) {
  debug("putID");
  const { cuenta, conservar } = params;
  return usuarioApi.putID(cuenta)
    .then((resp) => {
      if (conservar) context.commit("setUsuario", resp);
      return resp;
    });
}

function postBase(context, params) {
  debug("postBase");
  const { cuenta, conservar } = params;
  return usuarioApi.postBase(cuenta)
    .then((resp) => {
      if (conservar) context.commit("setUsuario", resp);
      return resp;
    });
}

function deleteID(context, params) {
  debug("deleteID");
  const { cuenta, delLocal } = params;
  return usuarioApi.deleteID(cuenta._id)
    .then(() => {
      if (delLocal) context.commit("setUsuario", null);
      return null;
    });
}

function guardar(context, params) {
  debug("guardar");
  const { cuenta, conservar } = params;
  return usuarioApi.guardar(cuenta)
    .then((resp) => {
      if (conservar) context.commit("setUsuario", resp);
      return resp;
    });
}

function setUsuario(pState, usuario) {
  pState.usuario = usuario;
}

function setUsuarios(pState, usuarios) {
  pState.usuarios = usuarios;
}

function resetUsuario(pState) {
  pState.usuario = { subtareas: [] };
}

function resetUsuarios(pState) {
  pState.usuarios = { docs: [], cant: 0 };
}
