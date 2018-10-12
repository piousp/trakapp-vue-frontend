import D from "debug";
import reject from "lodash/reject";
import findIndex from "lodash/findIndex";
import clienteApi from "../APIs/clienteApi";

const debug = D("ciris:storeCliente");

const state = {
  cliente: {},
  clientes: { docs: [], cant: 0 },
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
  replaceEnClientes,
  eliminarEnClientes,
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
    })
    .catch(err => debug(err));
}

function getBase(context, params) {
  debug("getBase");
  const { pagina, cantidad } = params;
  return clienteApi.getBase(pagina, cantidad)
    .then((resp) => {
      debug(resp);
      context.commit("setClientes", resp);
      return resp;
    })
    .catch(err => debug(err));
}

function putID(context, params) {
  debug("putID");
  const { cliente, conservar } = params;
  return clienteApi.putID(cliente)
    .then((resp) => {
      if (conservar) context.commit("setCliente", resp);
      return resp;
    })
    .catch(err => debug(err));
}

function postBase(context, params) {
  debug("postBase");
  const { cliente, conservar } = params;
  return clienteApi.postBase(cliente)
    .then((resp) => {
      if (conservar) context.commit("setCliente", resp);
      return resp;
    })
    .catch(err => debug(err));
}

function deleteID(context, params) {
  debug("deleteID");
  const { cliente, delLocal, deLista } = params;
  return clienteApi.deleteID(cliente._id)
    .then(() => {
      if (delLocal) context.commit("resetCliente");
      if (deLista) context.commit("eliminarEnClientes", cliente);
      return null;
    })
    .catch(err => debug(err));
}

function guardar(context, params) {
  debug("guardar");
  const { cliente, conservar, actualizarLista } = params;
  return clienteApi.guardar(cliente)
    .then((resp) => {
      if (conservar) context.commit("setCliente", resp);
      if (actualizarLista) context.commit("replaceEnClientes", resp);
      return resp;
    })
    .catch(err => debug(err));
}

function buscar(context, params) {
  debug("buscar");
  const {
    txt, pagina, cantidad, recordar,
  } = params;
  return clienteApi.buscar(txt, pagina, cantidad)
    .then((resp) => {
      if (recordar) context.commit("setClientes", resp);
      return resp;
    })
    .catch(err => debug(err));
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

function replaceEnClientes(pState, cliente) {
  debug("replaceEnClientes");
  const index = findIndex(pState.clientes.docs, { _id: cliente._id });
  pState.clientes.docs.splice(index, 1, cliente);
}

function eliminarEnClientes(pState, cliente) {
  debug("eliminarEnClientes");
  pState.clientes = {
    docs: reject(pState.clientes.docs, ["_id", cliente._id]),
    cant: pState.clientes.cant - 1,
  };
}

function resetCliente(pState) {
  debug("resetCliente");
  pState.cliente = {};
}

function resetClientes(pState) {
  debug("resetClientes");
  pState.clientes = [];
}
