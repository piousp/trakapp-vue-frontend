import D from "debug";
import perfilApi from "./perfilApi";
import axios from "../../config/axios";

const debug = D("ciris:storePerfil");

const state = {
  usuario: {},
  cuenta: {},
};

const actions = {
  cargarDatos,
  actualizarDatosUsuario,
  actualizarDatosCuenta,
  cargarCuenta,
};

const mutations = {
  setUsuario,
  setCuenta,
  migrarEmpresarial,
};


const store = {
  state,
  actions,
  mutations,
  namespaced: true,
};

export default store;

function actualizarDatosUsuario(context, usuario) {
  debug("Actualizando datos del usuario");
  return perfilApi.actualizarUsuario(usuario)
    .then((resp) => {
      context.commit("setUsuario", usuario);
      return resp;
    });
}

function actualizarDatosCuenta(context, cuenta) {
  debug("Actualizando datos del cuenta");
  return perfilApi.actualizarCuenta(cuenta)
    .then((resp) => {
      context.commit("setCuenta", cuenta);
      return resp;
    });
}

function cargarCuenta(context, params) {
  const { cuenta, recordarme } = params;
  return perfilApi.getCuenta(cuenta._id)
    .then((resp) => {
      context.commit("setCuenta", { cuenta: resp, recordarme });
      context.dispatch("empleados/cargarListado", null, { root: true });
      return resp;
    });
}

function cargarDatos(context) {
  debug("Cargando los datos del usuario y cuenta al store");
  const promesas = [perfilApi.datosUsuario(), perfilApi.datosCuenta()];
  return Promise.all(promesas).then((resp) => {
    const [usuario, cuenta] = resp;
    debug("Commiteando la lista de empleados");
    context.commit("setUsuario", usuario);
    context.commit("setCuenta", cuenta);
    return null;
  });
}

function setUsuario(pState, usuario) {
  pState.usuario = usuario;
}

function setCuenta(pState, params) {
  const { cuenta, recordarme } = params;
  console.log(cuenta._id, recordarme);
  if (recordarme) {
    localStorage.setItem("trakappCuenta", cuenta._id);
  } else {
    localStorage.removeItem("trakappCuenta");
  }
  axios.defaults.headers.common.Cuenta = cuenta._id;
  pState.cuenta = cuenta;
}

function migrarEmpresarial(pState) {
  pState.cuenta.empresarial = true;
}
