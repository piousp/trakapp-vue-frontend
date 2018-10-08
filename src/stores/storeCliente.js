import D from "debug";
import clienteApi from "../APIs/clienteApi";

const debug = D("ciris:storeCliente");

const state = {
  cliente: {},
  clientes: [],
};

const actions = {
  getID,
  getBase,
  putID,
  postBase,
  deleteID,
  guardar,
  buscar,
};

const mutations = {
  setCliente,
  setClientes,
  resetCliente,
  resetClientes,
};


const store = {
  state,
  actions,
  mutations,
  namespaced: true,
};

export default store;

// actions

function getID(context, params) {
  debug("getID");
  const { id } = params;
  return clienteApi.getID(id)
    .then((resp) => {
      context.commit("setCliente", resp);
      return resp;
    });
}

function getBase(context, params) {
  debug("getBase");
  const { pagina, cantidad } = params;
  return clienteApi.getBase(pagina, cantidad)
    .then((resp) => {
      context.commit("setClientes", resp);
      return resp;
    });
}

function putID(context, params) {
  debug("putID");
  const { cuenta, conservar } = params;
  return clienteApi.putID(cuenta)
    .then((resp) => {
      if (conservar) context.commit("setCliente", resp);
      return resp;
    });
}

function postBase(context, params) {
  debug("postBase");
  const { cuenta, conservar } = params;
  return clienteApi.postBase(cuenta)
    .then((resp) => {
      if (conservar) context.commit("setCliente", resp);
      return resp;
    });
}

function deleteID(context, params) {
  debug("deleteID");
  const { cuenta, delLocal } = params;
  return clienteApi.deleteID(cuenta._id)
    .then(() => {
      if (delLocal) context.commit("setCliente", null);
      return null;
    });
}

function guardar(context, params) {
  debug("guardar");
  const { cuenta, conservar } = params;
  return clienteApi.guardar(cuenta)
    .then((resp) => {
      if (conservar) context.commit("setCliente", resp);
      return resp;
    });
}

function buscar(context, params) {
  debug("buscar");
  const { txt, pagina, cantidad } = params;
  return clienteApi.buscar(txt, pagina, cantidad)
    .then((resp) => {
      context.commit("setClientes", resp);
      return resp;
    });
}

// mutations

function setCliente(pState, cliente) {
  debug("setCliente");
  pState.cliente = cliente;
}

function setClientes(pState, clientes) {
  debug("setClientes");
  pState.clientes = clientes;
}

function resetCliente(pState) {
  debug("resetCliente");
  pState.cliente = {};
}

function resetClientes(pState) {
  debug("resetClientes");
  pState.clientes = [];
}
