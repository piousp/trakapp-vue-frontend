import D from "debug";
import reject from "lodash/reject";
import filter from "lodash/filter";
import empleadoApi from "./empleadoApi";

const debug = D("ciris:storeEmpleados");

const state = {
  listado: { docs: [] },
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

const getters = {
  listadoSinNuevos,
};

const store = {
  state,
  actions,
  mutations,
  getters,
  namespaced: true,
};

export default store;

function cargarListado(context) {
  debug("Cargando la lista de empleados al store");
  return empleadoApi.listarConMensajes().then((empleados) => {
    debug("Commiteando la lista de empleados");
    context.commit("setListado", empleados);
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
  pState.listado.docs.push(empleado);
}

function eliminarEmpleado(pState, empleado) {
  pState.listado.docs = reject(pState.listado.docs, ["_id", empleado._id]);
}

function listadoSinNuevos(pState) {
  return {
    docs: filter(pState.listado.docs, obj => !!obj.ubicacion),
    cant: pState.listado.cant,
  };
}
