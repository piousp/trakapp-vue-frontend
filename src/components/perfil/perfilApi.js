import axios from "../../config/axios";

const perfilApi = {
  actualizarUsuario,
  actualizarCuenta,
  datosUsuario,
  datosCuenta,
  verificarPasswordCorrecto,
  cambiarContrasena,
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

function verificarPasswordCorrecto(clave) {
  return axios
    .post(`${axios.defaults.baseUrl}/api/auth/verificarPasswordCorrecto`, { password: clave })
    .then(resp => resp.data);
}

function cambiarContrasena(password) {
  return axios
    .post(`${axios.defaults.baseUrl}/api/auth/cambiarContrasena`, { password })
    .then(resp => resp.data);
}
