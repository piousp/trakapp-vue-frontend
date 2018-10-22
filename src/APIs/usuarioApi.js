import D from "debug";
import axios from "../config/axios";
import rutasGenericas from "./_base";

const debug = D("ciris:mensajeApi.js");

const apiSinBases = {
  modelo: "usuario",
  getUsuarioActivo,
  reportarBug,
};

const perfilApi = rutasGenericas(apiSinBases);

export default perfilApi;

function getUsuarioActivo() {
  debug("Trayendo usuario activo");
  return axios
    .get(`${axios.defaults.baseUrl}/api/usuario/yo`)
    .then(resp => resp.data);
}

function reportarBug(form) {
  debug("Reportando bug");
  return axios
    .post(`${axios.defaults.baseUrl}/api/usuario/reportarbug`, form)
    .then(resp => resp.data);
}
