import D from "debug";

const debug = D("ciris:app");

const state = {
  authCargado: false,
};

const mutations = {
  toggleAuthCargado,
};


const store = {
  state,
  mutations,
  namespaced: true,
};

export default store;

function toggleAuthCargado(pState) {
  debug("toggleAuthCargado");
  pState.authCargado = !pState.authCargado;
}
