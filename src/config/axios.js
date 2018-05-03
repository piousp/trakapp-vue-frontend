import Vue from "vue";
import VueAxios from "vue-axios";
import VueProgressBar from "vue-progressbar";
import axios from "axios";

const ax = axios.create({
  baseUrl: process.env.API_URL,
});

Vue.use(VueProgressBar, { thickness: "3px" });

ax.interceptors.request.use((config) => {
  Vue.prototype.$Progress.start();
  return config;
}, (error) => {
  Vue.prototype.$Progress.fail();
  return Promise.reject(error);
});

ax.interceptors.response.use((response) => {
  Vue.prototype.$Progress.finish();
  return response;
}, (error) => {
  Vue.prototype.$Progress.fail();
  return Promise.reject(error);
});

Vue.use(VueAxios, ax);

export default ax;
