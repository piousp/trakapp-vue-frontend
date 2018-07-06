import D from "debug";
import reject from "lodash/reject";
import empleadoApi from "./empleadoApi";

const debug = D("ciris:storeEmpleados");

const state = {
  listado: [],
};

const actions = {
  cargarListado,
  eliminarEmpleado: eliminarEmpleadoAction,
  agregarEmpleado: agregarEmpleadoAction,
};

const mutations = {
  setListado,
  agregarEmpleado,
  eliminarEmpleado,
};


const store = {
  state,
  actions,
  mutations,
  namespaced: true,
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

function eliminarEmpleadoAction(context, empleado) {
  debug("Eliminando un empleado");
  return empleadoApi.eliminar(empleado._id)
    .then((resp) => {
      context.commit("eliminarEmpleado", empleado);
      return resp;
    });
}

function agregarEmpleadoAction(context, empleado) {
  debug("Agregando un empleado");
  return empleadoApi.guardar(empleado)
    .then((resp) => {
      empleado._id = resp._id;
      context.commit("agregarEmpleado", empleado);
      return empleado;
    });
}

function setListado(pState, listado) {
  pState.listado = listado;
}

function agregarEmpleado(pState, empleado) {
  pState.listado.push([empleado]);
}

function eliminarEmpleado(pState, empleado) {
  pState.listado = reject(pState.listado, ["_id", empleado._id]);
}
