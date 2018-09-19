const mutations = {
  showModal(state, componentName) {
    state.modalVisible = true;
    state.modalComponent = componentName;
  },
  hideModal(state) {
    state.modalVisible = false;
  },
};

const state = {
  modalVisible: false,
  modalComponent: null,
};

const store = {
  mutations,
  state,
  namespaced: true,
};

export default store;
