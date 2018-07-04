import D from "debug";
import empleadoApi from "./empleadoApi";

const debug = D("ciris:storeEmpleados");

const state = {
  listado: [],
};

const actions = {
  cargarListado,
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

function cargarListado(context) {
  debug("Cargando la lista de empleados al store");
  return empleadoApi.listarConMensajes().then((empleados) => {
    debug("Commiteando la lista de empleados");
    context.commit("setListado", empleados.docs);
    return null;
  });
}

function setListado(pState, listado) {
  pState.listado = listado;
}
