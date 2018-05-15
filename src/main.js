// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from "vue";
import "moment/locale/es";
import Datepicker from "vuejs-datepicker";
import VeeValidate from "vee-validate";
import VueI18n from "vue-i18n";
import * as VueGoogleMaps from "vue2-google-maps";
import VueWebsocket from "vue-socket.io";
import VueToastr from "@deveodk/vue-toastr";
import VueStash from "vue-stash";
import store from "./config/store";
import App from "./App.vue";
import router from "./config/router";
import Auth from "./config/auth.js";
import Notify from "./config/notify.js";
import axios from "./config/axios.js";
import messages from "./i18n";
import "./config/filtros.js";
import "./components/comunes";

const pkg = require("../package.json").name;

Vue.config.productionTip = false;

Vue.use(VueToastr);
Vue.use(VeeValidate);
Vue.use(Notify);
Vue.use(Auth, axios, { pkg });
Vue.use(VueI18n);
Vue.use(VueWebsocket, Vue.axios.defaults.baseUrl);
Vue.use(VueStash);
Vue.use(VueGoogleMaps, {
  load: {
    key: "AIzaSyDn5jFd9F1zSo3XhhCD5r5bf3AQnpph5kI",
    libraries: "geometry,visualization,places",
  },
  autobindAllEvents: true,
});

Vue.component("datepicker", Datepicker);
Vue.component("infoWindow", VueGoogleMaps.InfoWindow);

Vue.prototype.$auth.checkAuth();

const i18n = new VueI18n({
  locale: "es",
  messages,
});

/* eslint-disable no-new */
export default new Vue({
  el: "#app",
  router,
  components: { App },
  data: {
    store,
  },
  template: "<App/>",
  i18n,
});
