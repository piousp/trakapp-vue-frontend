import Vue from "vue";
import Vuex from "vuex";

import empleadosStore from "../components/empleados/store";
import perfilStore from "../components/perfil/store";
import modalStore from "../components/acciones/modalStore";

Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    empleados: empleadosStore,
    perfil: perfilStore,
    modal: modalStore,
  },
  strict: true,
});


Vue.prototype.$store = store;

export default store;
