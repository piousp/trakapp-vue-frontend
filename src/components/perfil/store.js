import D from "debug";
import perfilApi from "./perfilApi";

const debug = D("ciris:storeEmpleados");

const state = {
  usuario: {},
  cuenta: {},
};

const actions = {
  cargarDatos,
};

const mutations = {
  setListado,
};


const store = {
  state,
  actions,
  mutations,
};

export default store;

function cargarDatos(context) {
  debug("Cargando los datos del usuario y cuenta al store");
  return perfilApi.listarConMensajes().then((empleados) => {
    debug("Commiteando la lista de empleados");
    context.commit("setListado", empleados.docs);
    return null;
  });
}

function setListado(pState, listado) {
  pState.listado = listado;
}
