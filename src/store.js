import Vue from "vue";
import Vuex from "vuex";

import modules from "./stores/modules";

Vue.use(Vuex);

const store = new Vuex.Store({
  modules,
  strict: true,
});


Vue.prototype.$store = store;

export default store;
