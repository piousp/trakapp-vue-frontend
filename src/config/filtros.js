import Vue from "vue";
import moment from "moment";

Vue.filter("colones", value => `₡${value.toLocaleString()}`);

Vue.filter("fecha", (value, format) => {
  if (value) {
    const fecha = moment.isMoment(value) ? value : moment(String(value));
    return fecha.format(format || "DD/MM/YYYY");
  }
  return "No definida";
});
