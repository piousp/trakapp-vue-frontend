const mutations = {
  showModal(state, params) {
    state.modalVisible = true;
    state.modalComponent = params.componentName;
    state.params = params.params;
  },
  hideModal(state) {
    state.modalVisible = false;
  },
};

const state = {
  modalVisible: false,
  modalComponent: null,
  params: null,
};

const store = {
  mutations,
  state,
  namespaced: true,
};

export default store;
