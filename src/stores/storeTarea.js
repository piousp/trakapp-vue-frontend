import D from "debug";
import tareaApi from "../APIs/tareaApi";

const debug = D("ciris:storeTarea");

const state = {
  tarea: {},
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
    });
}

function getBase(context, params) {
  debug("getBase");
  const { pagina, cantidad } = params;
  return tareaApi.getBase(pagina, cantidad)
    .then((resp) => {
      context.commit("setTareas", resp);
      return resp;
    });
}

function putID(context, params) {
  debug("putID");
  const { cuenta, conservar } = params;
  return tareaApi.putID(cuenta)
    .then((resp) => {
      if (conservar) context.commit("setTarea", resp);
      return resp;
    });
}

function postBase(context, params) {
  debug("postBase");
  const { cuenta, conservar } = params;
  return tareaApi.postBase(cuenta)
    .then((resp) => {
      if (conservar) context.commit("setTarea", resp);
      return resp;
    });
}

function deleteID(context, params) {
  debug("deleteID");
  const { cuenta, delLocal } = params;
  return tareaApi.deleteID(cuenta._id)
    .then(() => {
      if (delLocal) context.commit("setTarea", null);
      return null;
    });
}

function guardar(context, params) {
  debug("guardar");
  const { cuenta, conservar } = params;
  return tareaApi.guardar(cuenta)
    .then((resp) => {
      if (conservar) context.commit("setTarea", resp);
      return resp;
    });
}

function listarXFecha(context, params) {
  debug("listarXFecha");
  const { fechaInicio, fechaFin } = params;
  return tareaApi.listarXFecha(fechaInicio, fechaFin)
    .then((resp) => {
      context.commit("setTareas", resp);
      return resp;
    });
}

function getTareasPopuladas(context) {
  debug("getTareasPopuladas");
  return tareaApi.getTareasPopuladas()
    .then((resp) => {
      context.commit("setTareas", resp);
      return resp;
    });
}

// mutations

function setTarea(pState, tarea) {
  debug("setTarea");
  pState.tarea = tarea;
}

function setTareas(pState, tareas) {
  debug("setTarea");
  pState.tareas = tareas;
}

function resetTarea(pState) {
  debug("resetTarea");
  pState.tarea = {};
}

function resetTareas(pState) {
  debug("resetTareas");
  pState.tareas = [];
}
