import D from "debug";
import perfilApi from "./perfilApi";

const debug = D("ciris:storePerfil");

const state = {
  usuario: {},
  cuenta: {},
};

const actions = {
  cargarDatos,
  actualizarDatosUsuario,
  actualizarDatosCuenta,
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

function setCuenta(pState, cuenta) {
  pState.cuenta = cuenta;
}

function migrarEmpresarial(pState) {
  pState.cuenta.empresarial = true;
}
