import D from "debug";
import moment from "moment";
import findIndex from "lodash/findIndex";
import reject from "lodash/reject";
import tareaApi from "./tarea.api.js";

const debug = D("ciris:tarea");

const state = {
  tarea: { subtareas: [] },
  tareas: { docs: [], cant: 0 },
};

const actions = {
  getID,
  getBase,
  putID,
  postBase,
  deleteID,
  guardar,
  listarXFecha,
  getTareasPopuladas,
};

const mutations = {
  setTarea,
  setTareas,
  replaceEnTareas,
  eliminarEnTareas,
  resetTarea,
  resetTareas,
};


const store = {
  state,
  actions,
  mutations,
  namespaced: true,
};

export default store;

function getID(context, params) {
  debug("getID");
  const { id } = params;
  return tareaApi.getID(id)
    .then((resp) => {
      context.commit("setTarea", resp);
      return resp;
    })
    .catch(err => debug(err));
}

function getBase(context, params) {
  debug("getBase");
  const { pagina, cantidad } = params;
  return tareaApi.getBase(pagina, cantidad)
    .then((resp) => {
      context.commit("setTareas", resp);
      return resp;
    })
    .catch(err => debug(err));
}

function putID(context, params) {
  debug("putID");
  const { tarea, conservar, actualizarLista } = params;
  return tareaApi.putID(tarea)
    .then((resp) => {
      if (conservar) context.commit("setTarea", resp);
      if (actualizarLista) context.commit("replaceEnTareas", resp);
      return resp;
    })
    .catch(err => debug(err));
}

function postBase(context, params) {
  debug("postBase");
  const { tarea, conservar } = params;
  return tareaApi.postBase(tarea)
    .then((resp) => {
      if (conservar) context.commit("setTarea", resp);
      return resp;
    })
    .catch(err => debug(err));
}

function deleteID(context, params) {
  debug("deleteID");
  const { tarea, delLocal, deLista } = params;
  return tareaApi.deleteID(tarea._id)
    .then(() => {
      if (delLocal) context.commit("resetTarea");
      if (deLista) context.commit("eliminarEnTareas", tarea);
      return null;
    })
    .catch(err => debug(err));
}

function guardar(context, params) {
  debug("guardar");
  const { tarea, conservar, actualizarLista } = params;
  return tareaApi.guardar(tarea)
    .then((resp) => {
      if (conservar) context.commit("setTarea", resp);
      if (actualizarLista) context.commit("replaceEnTareas", resp);
      return resp;
    })
    .catch(err => debug(err));
}

function listarXFecha(context, params) {
  debug("listarXFecha");
  const { fechaInicio, fechaFin } = params;
  return tareaApi.listarXFecha(fechaInicio, fechaFin)
    .then((resp) => {
      context.commit("setTareas", resp);
      return resp;
    })
    .catch(err => debug(err));
}

function getTareasPopuladas(context) {
  debug("getTareasPopuladas");
  return tareaApi.getTareasPopuladas()
    .then((resp) => {
      context.commit("setTareas", resp);
      return resp;
    })
    .catch(err => debug(err));
}

// mutations

function setTarea(pState, tarea) {
  tarea.start = moment(tarea.start);
  tarea.end = moment(tarea.end);
  if (tarea.empleado && tarea.empleado._id) tarea.empleado = tarea.empleado._id;
  pState.tarea = tarea;
}

function setTareas(pState, tareas) {
  debug("setTareas");
  pState.tareas = tareas;
}

function replaceEnTareas(pState, tarea) {
  debug("replaceEnTareas");
  const index = findIndex(pState.tareas.docs, { _id: tarea._id });
  pState.tareas.docs.splice(index, 1, tarea);
}

function eliminarEnTareas(pState, tarea) {
  debug("eliminarEnTareas");
  pState.tareas = {
    docs: reject(pState.tareas.docs, ["_id", tarea._id]),
    cant: pState.tareas.cant - 1,
  };
}

function resetTarea(pState) {
  debug("resetTarea");
  pState.tarea = { subtareas: [] };
}

function resetTareas(pState) {
  debug("resetTareas");
  pState.tareas = [];
}
