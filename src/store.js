import Vue from "vue";
import Vuex from "vuex";
import VuexPersist from "vuex-persist";
import D from "debug";
import keys from "lodash/keys";
import without from "lodash/without";
import isString from "lodash/isString";
import noop from "lodash/noop";

import modules from "./config/importarStores";

const debug = D("ciris:store.js");

debug("Iniciando Vuex");

const vuexPersist = new VuexPersist({
  key: "vuex-trakapp-store",
  storage: window.sessionStorage,
  asyncStorage: true,
  modules: without(keys(modules), "app", "modal"),
  restoreState(key, storage) {
    debug("Reestableciendo store de storage");
    return new Promise((resolve) => {
      const data = (storage).getItem(key);
      if (data) {
        if (isString(data)) {
          resolve(JSON.parse(data || "{}"));
        }
        resolve((data || {}));
      }
      resolve(noop);
    });
  },
});

Vue.use(Vuex);

const store = new Vuex.Store({
  modules,
  strict: true,
  plugins: [vuexPersist.plugin],
});

Vue.prototype.$store = store;

export default store;
