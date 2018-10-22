import D from "debug";
import axios from "../config/axios";
import rutasGenericas from "./_base";

const debug = D("ciris:cuentaApi.js");

const apiSinBases = {
  modelo: "cuenta",
  getCuentaActiva,
  invitarUsuarios,
  cargarBulk,
  migrarEmpresarial,
};

const cuentaApi = rutasGenericas(apiSinBases);

function getCuentaActiva() {
  debug("Trayendo cuenta activa");
  return axios
    .get(`${axios.defaults.baseUrl}/api/cuenta/activa`)
    .then(resp => resp.data);
}

function invitarUsuarios(usuario, cuenta, correos) {
  debug("Invitando usuarios");
  const query = {
    usuario, cuenta, correos,
  };
  return axios
    .post(`${axios.defaults.baseUrl}/api/cuenta/invitarUsuarios`, query)
    .then(resp => resp.data);
}

function cargarBulk(cuentas) {
  debug("Cargando cuentas en bulk");
  const query = {
    params: {
      cuentas,
    },
  };
  return axios
    .get(`${axios.defaults.baseUrl}/api/cuenta/cargarBulk`, query)
    .then(resp => resp.data);
}

function migrarEmpresarial(id) {
  debug("migrarEmpresarial", id);
  return axios
    .put(`${axios.defaults.baseUrl}/api/cuenta/migrarEmpresarial/${id}`)
    .then(resp => resp.data);
}

export default cuentaApi;
