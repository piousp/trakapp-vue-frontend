import D from "debug";
import swal from "sweetalert2";
import cuentaApi from "../APIs/cuentaApi";
import axios from "../config/axios";

const debug = D("ciris:storeCuenta");

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
  migrarEmpresarial,
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
  const { id, conservarComoActivo, recordarCuenta } = params;
  return cuentaApi.getID(id)
    .then((resp) => {
      context.commit("setCuenta", resp);
      if (conservarComoActivo) {
        context.commit("setCuentaActiva", { cuenta: resp, recordarme: recordarCuenta });
        context.dispatch("storeEmpleado/cargarEmpleadosConMensajes", {}, { root: true });
        context.dispatch("storeEmpleado/getBase", { pagina: 0, cantidad: 10 }, { root: true });
      }
      return resp;
    })
    .catch(err => debug(err));
}

function getBase(context, params) {
  debug("getBase");
  const { pagina, cantidad } = params;
  return cuentaApi.getBase(pagina, cantidad)
    .then((resp) => {
      context.commit("setCuentas", resp);
      return resp;
    })
    .catch(err => debug(err));
}

function putID(context, params) {
  debug("putID");
  const { cuenta, conservar, conservarComoActivo } = params;
  return cuentaApi.putID(cuenta)
    .then((resp) => {
      if (conservar) context.commit("setCuenta", resp);
      if (conservarComoActivo) {
        context.commit("setCuentaActiva", { cuenta: resp, recordarme: true });
        context.dispatch("storeEmpleado/cargarEmpleadosConMensajes", {}, { root: true });
        context.dispatch("storeEmpleado/getBase", { pagina: 0, cantidad: 10 }, { root: true });
      }
      return resp;
    })
    .catch(err => debug(err));
}

function postBase(context, params) {
  debug("postBase");
  const { cuenta, conservar, conservarComoActivo } = params;
  return cuentaApi.postBase(cuenta)
    .then((resp) => {
      if (conservar) context.commit("setCuenta", resp);
      if (conservarComoActivo) {
        context.commit("setCuentaActiva", { cuenta: resp, recordarme: true });
        context.dispatch("storeEmpleado/cargarEmpleadosConMensajes", {}, { root: true });
        context.dispatch("storeEmpleado/getBase", { pagina: 0, cantidad: 10 }, { root: true });
      }
      return resp;
    })
    .catch(err => debug(err));
}

function deleteID(context, params) {
  debug("deleteID");
  const { cuenta, delLocal } = params;
  return cuentaApi.deleteID(cuenta._id)
    .then(() => {
      if (delLocal) context.commit("resetCuenta");
      return null;
    })
    .catch(err => debug(err));
}

function guardar(context, params) {
  debug("guardar");
  const { cuenta, conservar, conservarComoActivo } = params;
  return cuentaApi.guardar(cuenta)
    .then((resp) => {
      if (conservar) context.commit("setCuenta", resp);
      if (conservarComoActivo) {
        context.commit("setCuentaActiva", { cuenta: resp, recordarme: true });
        context.dispatch("storeEmpleado/cargarEmpleadosConMensajes", {}, { root: true });
        context.dispatch("storeEmpleado/getBase", { pagina: 0, cantidad: 10 }, { root: true });
      }
      return resp;
    })
    .catch(err => debug(err));
}

function getCuentaActiva(context) {
  debug("getCuentaActiva");
  return cuentaApi.getCuentaActiva()
    .then((resp) => {
      context.commit("setCuentaActiva", { cuenta: resp, recordarme: true });
      context.dispatch("storeEmpleado/cargarEmpleadosConMensajes", {}, { root: true });
      context.dispatch("storeEmpleado/getBase", { pagina: 0, cantidad: 10 }, { root: true });
      return resp;
    })
    .catch(err => debug(err));
}

function invitarUsuarios(context, params) {
  debug("invitarUsuarios");
  const { usuario, cuenta, correos } = params;
  return cuentaApi.invitarUsuarios(usuario, cuenta, correos)
    .then(() => swal(
      "Invitar usuarios",
      "Se ha enviado la invitación exitosamente",
      "success",
    ))
    .catch(err => debug(err));
}

function cargarBulk(context, params) {
  debug("cargarBulk");
  const { cuentas } = params;
  return cuentaApi.cargarBulk(cuentas)
    .then((resp) => {
      context.commit("setCuentas", resp);
      return resp;
    })
    .catch(err => debug(err));
}

function migrarEmpresarial(context, params) {
  debug("migrarEmpresarial");
  const { cuenta, conservar, conservarComoActivo } = params;
  return cuentaApi.migrarEmpresarial(cuenta)
    .then((resp) => {
      if (conservar) context.commit("setCuenta", resp);
      if (conservarComoActivo) {
        context.commit("setCuentaActiva", { cuenta: resp, recordarme: true });
        context.dispatch("storeEmpleado/cargarEmpleadosConMensajes", {}, { root: true });
        context.dispatch("storeEmpleado/getBase", { pagina: 0, cantidad: 10 }, { root: true });
      }
      return resp;
    })
    .catch(err => debug(err));
}

// mutations

function setCuenta(pState, cuenta) {
  debug("setCuenta");
  pState.cuenta = cuenta;
}

function setCuentaActiva(pState, params) {
  debug("setCuentaActiva");
  const { cuenta, recordarme } = params;
  const storage = recordarme ? localStorage : sessionStorage;
  storage.setItem("trakappCuenta", cuenta._id);
  axios.defaults.headers.common.Cuenta = cuenta._id;
  pState.cuentaActiva = cuenta;
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
  localStorage.removeItem("trakappCuenta");
  sessionStorage.removeItem("trakappCuenta");
  pState.cuentaActiva = {};
}

function resetCuentas(pState) {
  debug("resetCuentas");
  pState.cuentas = [];
}
