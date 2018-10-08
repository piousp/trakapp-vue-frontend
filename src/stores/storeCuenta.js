import D from "debug";
import swal from "sweetalert2";
import cuentaApi from "../APIs/cuentaApi";
import axios from "../config/axios";

const debug = D("ciris:storeCuenta");

/* TODO: implementar cambio a empresarial,
pero con pedido al api para cambiarlo que antes solo se cambiaba local
y DESPUES se mandaba a cambiar al back */

const state = {
  cuenta: {},
  cuentaActiva: {},
  cuentas: { docs: [], cant: 0 },
};

const actions = {
  getID,
  getBase,
  putID,
  postBase,
  deleteID,
  guardar,
  getCuentaActiva,
  invitarUsuarios,
  cargarBulk,
};

const mutations = {
  setCuenta,
  setCuentaActiva,
  setCuentas,
  resetCuenta,
  resetCuentaActiva,
  resetCuentas,
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
  return cuentaApi.getID(id)
    .then((resp) => {
      context.commit("setCuenta", resp);
      return resp;
    });
}

function getBase(context, params) {
  debug("getBase");
  const { pagina, cantidad } = params;
  return cuentaApi.getBase(pagina, cantidad)
    .then((resp) => {
      context.commit("setCuentas", resp);
      return resp;
    });
}

function putID(context, params) {
  debug("putID");
  const { cuenta, conservar } = params;
  return cuentaApi.putID(cuenta)
    .then((resp) => {
      if (conservar) context.commit("setCuenta", resp);
      return resp;
    });
}

function postBase(context, params) {
  debug("postBase");
  const { cuenta, conservar } = params;
  return cuentaApi.postBase(cuenta)
    .then((resp) => {
      if (conservar) context.commit("setCuenta", resp);
      return resp;
    });
}

function deleteID(context, params) {
  debug("deleteID");
  const { cuenta, delLocal } = params;
  return cuentaApi.deleteID(cuenta._id)
    .then(() => {
      if (delLocal) context.commit("setCuenta", null);
      return null;
    });
}

function guardar(context, params) {
  debug("guardar");
  const { cuenta, conservar } = params;
  return cuentaApi.guardar(cuenta)
    .then((resp) => {
      if (conservar) context.commit("setCuenta", resp);
      return resp;
    });
}

function getCuentaActiva(context) {
  debug("getCuentaActiva");
  return cuentaApi.getCuentaActiva()
    .then((resp) => {
      context.commit("setCuentaActiva", { cuenta: resp, recordarme: true });
      context.dispatch("empleados/cargarListado", null, { root: true });
      return resp;
    });
}

function invitarUsuarios(context, params) {
  debug("invitarUsuarios");
  const { usuario, correos } = params;
  return cuentaApi.invitarUsuarios(usuario, correos)
    .then(() => swal(
      "Invitar usuarios",
      "Se ha enviado la invitación exitosamente",
      "success",
    ));
}

function cargarBulk(context, params) {
  debug("cargarBulk");
  const { cuentas } = params;
  return cuentaApi.cargarBulk(cuentas)
    .then((resp) => {
      context.commit("setCuentas", resp);
      return resp;
    });
}

// mutations

function setCuenta(pState, cuenta) {
  debug("setCuenta");
  pState.cuenta = cuenta;
}

function setCuentaActiva(pState, params) {
  debug("setCuentaActiva");
  const { cuenta, recordarme } = params;
  if (recordarme) {
    localStorage.setItem("trakappCuenta", cuenta._id);
  } else {
    localStorage.removeItem("trakappCuenta");
  }
  axios.defaults.headers.common.Cuenta = cuenta._id;
  pState.cuenta = cuenta;
}

function setCuentas(pState, cuentas) {
  debug("setCuentas");
  pState.cuentas = cuentas;
}

function resetCuenta(pState) {
  debug("resetCuenta");
  pState.cuenta = {};
}

function resetCuentaActiva(pState) {
  debug("resetCuentaActiva");
  pState.cuentaActiva = {};
}

function resetCuentas(pState) {
  debug("resetCuentas");
  pState.cuentas = [];
}
