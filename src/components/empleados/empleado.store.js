import D from "debug";
import reject from "lodash/reject";
import filter from "lodash/filter";
import findIndex from "lodash/findIndex";
import empleadoApi from "./empleado.api.js";

const debug = D("ciris:empleados");

const state = {
  empleados: { docs: [], cant: 0 },
  empleadosCMensajes: { docs: [], cant: 0 },
  empleado: {},
};

const actions = {
  getID,
  getBase,
  putID,
  postBase,
  deleteID,
  guardar,
  cargarEmpleadosConMensajes,
};

const mutations = {
  setEmpleado,
  setEmpleados,
  setEmpleadosCMensajes,
  resetEmpleado,
  resetEmpleados,
  resetEmpleadosCMensajes,
  agregarEmpleadoALista,
  eliminarEmpleadoDeLista,
  modificarEmpleadoDeLista,
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

// actions

function getID(context, params) {
  debug("getID");
  const { id } = params;
  return empleadoApi.getID(id)
    .then((empleado) => {
      context.commit("setEmpleado", empleado);
      return empleado;
    })
    .catch(err => debug(err));
}

function getBase(context, params) {
  debug("getBase");
  const { pagina, cantidad } = params;
  return empleadoApi.getBase(pagina, cantidad)
    .then((resp) => {
      context.commit("setEmpleados", resp);
      return resp;
    })
    .catch(err => debug(err));
}

function putID(context, params) {
  debug("putID");
  const { empleado, conservar, aLista } = params;
  return empleadoApi.putID(empleado)
    .then((resp) => {
      if (conservar) context.commit("setEmpleado", resp);
      if (aLista) context.commit("modificarEmpleadoDeLista", resp);
      return resp;
    })
    .catch(err => debug(err));
}

function postBase(context, params) {
  debug("postBase");
  const { empleado, conservar, aLista } = params;
  return empleadoApi.postBase(empleado)
    .then((resp) => {
      if (conservar) context.commit("setEmpleado", resp);
      if (aLista) context.commit("agregarEmpleadoALista", resp);
      return resp;
    })
    .catch(err => debug(err));
}

function deleteID(context, params) {
  debug("deleteID");
  const { empleado, delLocal, aLista } = params;
  return empleadoApi.deleteID(empleado._id)
    .then(() => {
      if (delLocal) context.commit("resetEmpleado");
      if (aLista) context.commit("eliminarEmpleadoDeLista", empleado);
      return null;
    })
    .catch(err => debug(err));
}

function guardar(context, params) {
  debug("guardar");
  const { empleado, conservar, aLista } = params;
  return empleadoApi.guardar(empleado)
    .then((resp) => {
      if (conservar) context.commit("setEmpleado", resp);
      if (aLista) {
        if (empleado._id) {
          context.commit("modificarEmpleadoDeLista", resp);
        } else {
          context.commit("agregarEmpleadoALista", resp);
        }
      }
      return resp;
    })
    .catch(err => debug(err));
}

function cargarEmpleadosConMensajes(context, params) {
  debug("Cargando la lista de empleados con mensajes al store");
  const { pagina, cantidad } = params;
  return empleadoApi.listarConMensajes(pagina, cantidad)
    .then((empleados) => {
      context.commit("setEmpleadosCMensajes", empleados);
      return null;
    })
    .catch(err => debug(err));
}

// mutations

function setEmpleadosCMensajes(pState, empleados) {
  debug("setEmpleadosCMensajes");
  pState.empleadosCMensajes = empleados;
}

function setEmpleados(pState, empleados) {
  debug("setEmpleados");
  pState.empleados = empleados;
}

function setEmpleado(pState, empleado) {
  debug("setEmpleado");
  pState.empleado = empleado;
}

function resetEmpleadosCMensajes(pState) {
  debug("setEmpleadosCMensajes");
  pState.empleadosCMensajes = { docs: [], cant: 0 };
}

function resetEmpleados(pState) {
  debug("resetEmpleados");
  pState.empleados = { docs: [], cant: 0 };
}

function resetEmpleado(pState) {
  debug("resetEmpleado");
  pState.empleado = { device: {}, ubicacion: {}, horarios: {} };
}

function modificarEmpleadoDeLista(pState, pempleado) {
  debug("modificarEmpleadoDeLista");
  const index = findIndex(pState.listado.docs, { _id: pempleado._id });
  pState.listado.docs.splice(index, 1, pempleado);
}

function agregarEmpleadoALista(pState, empleado) {
  debug("agregarEmpleadoALista");
  pState.listado.docs.push(empleado);
}

function eliminarEmpleadoDeLista(pState, empleado) {
  debug("eliminarEmpleadoDeLista");
  pState.listado.docs = reject(pState.listado.docs, ["_id", empleado._id]);
}

// getters

function listadoSinNuevos(pState) {
  debug("listadoSinNuevos");
  return {
    docs: filter(pState.empleados.docs, obj => !!obj.ubicacion),
    cant: pState.empleados.cant,
  };
}
