import axios from "../../config/axios";

const perfilApi = {
  actualizarUsuario,
  actualizarCuenta,
  datosUsuario,
  datosCuenta,
  verificarPasswordCorrecto,
  actualizarContrasena,
  reportarBug,
  getCuenta,
};

export default perfilApi;

function actualizarUsuario(usuario) {
  return axios
    .put(`${axios.defaults.baseUrl}/api/usuario/${usuario._id}`, usuario)
    .then(resp => resp.data);
}

function actualizarCuenta(cuenta) {
  return axios
    .put(`${axios.defaults.baseUrl}/api/usuario/cuenta`, cuenta)
    .then(resp => resp.data);
}

function datosUsuario() {
  return axios
    .get(`${axios.defaults.baseUrl}/api/usuario/yo`)
    .then(resp => resp.data);
}

function datosCuenta() {
  return axios
    .get(`${axios.defaults.baseUrl}/api/usuario/cuenta`)
    .then(resp => resp.data);
}

function getCuenta(idCuenta) {
  return axios
    .get(`${axios.defaults.baseUrl}/api/cuenta/${idCuenta}`)
    .then(resp => resp.data);
}

function verificarPasswordCorrecto(clave) {
  return axios
    .post(`${axios.defaults.baseUrl}/api/auth/verificarPasswordCorrecto`, { password: clave })
    .then(resp => resp.data);
}

function actualizarContrasena(password) {
  return axios
    .post(`${axios.defaults.baseUrl}/api/auth/actualizarContrasena`, { password })
    .then(resp => resp.data);
}

function reportarBug(form) {
  return axios
    .post(`${axios.defaults.baseUrl}/api/usuario/reportarbug`, form)
    .then(resp => resp.data);
}
