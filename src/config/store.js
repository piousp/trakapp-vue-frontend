import Vue from "vue";
import Vuex from "vuex";

import empleadosStore from "../components/empleados/store";

Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    empleados: empleadosStore,
  },
  strict: true,
});


Vue.prototype.$store = store;

export default store;
