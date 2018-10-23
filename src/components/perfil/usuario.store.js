import D from "debug";
import swal from "sweetalert2";
import usuarioApi from "./usuario.store.js";

const debug = D("ciris:usuario");

const state = {
  usuario: { usuarios: [] },
  usuarioActivo: { usuarios: [] },
  usuarios: { docs: [], cant: 0 },
};

const actions = {
  getID,
  getBase,
  putID,
  postBase,
  deleteID,
  guardar,
  getUsuarioActivo,
  reportarBug,
};

const mutations = {
  setUsuario,
  setUsuarioActivo,
  setUsuarios,
  resetUsuario,
  resetUsuarioActivo,
  resetUsuarios,
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
  return usuarioApi.getID(id)
    .then((resp) => {
      context.commit("setUsuario", resp);
      return resp;
    })
    .catch(err => debug(err));
}

function getBase(context, params) {
  debug("getBase");
  const { pagina, cantidad } = params;
  return usuarioApi.getBase(pagina, cantidad)
    .then((resp) => {
      context.commit("setUsuarios", resp);
      return resp;
    })
    .catch(err => debug(err));
}

function putID(context, params) {
  debug("putID");
  const { usuario, conservar } = params;
  return usuarioApi.putID(usuario)
    .then((resp) => {
      if (conservar) context.commit("setUsuario", resp);
      return resp;
    })
    .catch(err => debug(err));
}

function postBase(context, params) {
  debug("postBase");
  const { usuario, conservar } = params;
  return usuarioApi.postBase(usuario)
    .then((resp) => {
      if (conservar) context.commit("setUsuario", resp);
      return resp;
    })
    .catch(err => debug(err));
}

function deleteID(context, params) {
  debug("deleteID");
  const { usuario, delLocal } = params;
  return usuarioApi.deleteID(usuario._id)
    .then(() => {
      if (delLocal) context.commit("setUsuario", null);
      return null;
    })
    .catch(err => debug(err));
}

function guardar(context, params) {
  debug("guardar");
  const { usuario, conservar, conservarActivo } = params;
  return usuarioApi.guardar(usuario)
    .then((resp) => {
      if (conservar) context.commit("setUsuario", resp);
      if (conservarActivo) context.commit("setUsuarioActivo", resp);
      return resp;
    })
    .catch(err => debug(err));
}

function getUsuarioActivo(context) {
  debug("getUsuarioActivo");
  return usuarioApi.getUsuarioActivo()
    .then((resp) => {
      context.commit("setUsuarioActivo", resp);
      return resp;
    })
    .catch(err => debug(err));
}

function reportarBug(context, params) {
  debug("reportarBug");
  const { form } = params;
  return usuarioApi.reportarBug(form)
    .then(() => swal(
      "Reportar error",
      "Se ha enviado el reporte exitosamente",
      "success",
    ))
    .catch(err => debug(err));
}

// mutations

function setUsuario(pState, usuario) {
  debug("setUsuario");
  pState.usuario = usuario;
}

function setUsuarioActivo(pState, usuario) {
  debug("setUsuarioActivo");
  pState.usuarioActivo = usuario;
}

function setUsuarios(pState, usuarios) {
  debug("setUsuarios");
  pState.usuarios = usuarios;
}

function resetUsuario(pState) {
  debug("resetUsuario");
  pState.usuario = { usuarios: [] };
}

function resetUsuarioActivo(pState) {
  debug("resetUsuarioActivo");
  pState.usuarioActivo = { usuarios: [] };
}

function resetUsuarios(pState) {
  debug("resetUsuarios");
  pState.usuarios = { docs: [], cant: 0 };
}
