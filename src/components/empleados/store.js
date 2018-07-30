import D from "debug";
import reject from "lodash/reject";
import filter from "lodash/filter";
import findIndex from "lodash/findIndex";
import empleadoApi from "./empleadoApi";

const debug = D("ciris:storeEmpleados");

const state = {
  listado: { docs: [], cant: 0 },
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
  modificarEmpleado,
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

function modificarEmpleado(pState, pempleado) {
  const index = findIndex(pState.listado.docs, { _id: pempleado._id });
  pState.listado.docs.splice(index, 1, pempleado);
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
