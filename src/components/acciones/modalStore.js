export const mutations = {
  showModal(state, componentName) {
    state.modalVisible = true;
    state.modalComponent = componentName;
    console.log(state);
  },
  hideModal(state) {
    state.modalVisible = false;
  },
};

export const state = {
  modalVisible: false,
  modalComponent: null,
};

export const store = {
  mutations,
  state,
  namespaced: true,
};

export default store;
