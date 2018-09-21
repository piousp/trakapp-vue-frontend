import Vue from "vue";
import "moment/locale/es";
import Datetime from "vue-datetime";
import VeeValidate from "vee-validate";
import es from "vee-validate/dist/locale/es";
import VueI18n from "vue-i18n";
import * as VueGoogleMaps from "vue2-google-maps";
import VueWebsocket from "vue-socket.io";
import VueToastr from "@deveodk/vue-toastr";
import bugsnagVue from "bugsnag-vue";
import Multiselect from "vue-multiselect";
import money from "v-money";
import VueTheMask from "vue-the-mask";
import App from "./App.vue";
import router from "./config/router";
import Auth from "./config/auth.js";
import Notify from "./config/notify.js";
import axios from "./config/axios.js";
import messages from "./i18n";
import vuexStore from "./config/store";
import bugsnagClient from "./components/comunes/bugsnag";
import AppModal from "./components/acciones/BaseModal.vue";
import "./config/filtros.js";
import "./components/comunes";

window.eventBus = new Vue({});

const pkg = require("../package.json").name;

if (process.env.NODE_ENV === "production") {
  bugsnagClient.use(bugsnagVue(Vue));
}
Vue.config.productionTip = false;

Vue.use(VueToastr);
Vue.use(Notify);
Vue.use(Auth, axios, { pkg });
Vue.use(VueI18n);
Vue.use(money, { precision: 4 });
Vue.use(VueGoogleMaps, {
  load: {
    key: "AIzaSyDn5jFd9F1zSo3XhhCD5r5bf3AQnpph5kI",
    libraries: "geometry,visualization,places",
  },
  autobindAllEvents: true,
});
Vue.use(Datetime);
Vue.use(VueTheMask);

Vue.component("app-modal", AppModal);
Vue.component("infoWindow", VueGoogleMaps.InfoWindow);
Vue.component("multiselect", Multiselect);

Vue.prototype.$auth.checkAuth();

const i18n = new VueI18n({
  locale: "es",
  messages,
});

Vue.use(VeeValidate, {
  i18n,
  dictionary: {
    es,
  },
});


/* eslint-disable no-new */
export default new Vue({
  el: "#app",
  router,
  store: vuexStore,
  components: { App },
  render: h => h(App),
  i18n,
});
