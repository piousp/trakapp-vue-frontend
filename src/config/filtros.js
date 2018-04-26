import Vue from "vue";
import moment from "moment";
import D from "debug";

const debug = D("ciris:config/filtros.js");

Vue.filter("colones", value => `₡${value.toLocaleString()}`);

Vue.filter("fecha", (value, format) => {
  debug(value);
  if (value) {
    const fecha = moment.isMoment(value) ? value : moment(String(value));
    return fecha.format(format || "DD/MM/YYYY");
  }
  return "No definida";
});
