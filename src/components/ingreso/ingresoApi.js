import axios from "../../config/axios";

const ingresoApi = {
  registro,
  login,
  solicitarCambio,
  cambiarContrasena,
  actualizarContrasena,
};

export default ingresoApi;

function registro(obj) {
  return axios
    .post(`${axios.defaults.baseUrl}/api/auth/registro`, obj)
    .then(resp => resp.data);
}

function login(usuario, password) {
  return axios
    .post(`${axios.defaults.baseUrl}/api/auth/login`, {
      login: usuario,
      password,
    });
}

function solicitarCambio(correo) {
  return axios
    .post(`${axios.defaults.baseUrl}/api/auth/solicitarCambio/`, {
      correo,
    })
    .then(resp => resp);
}

function cambiarContrasena(idRec, nvoPass, movil) {
  const url = movil ? `${axios.defaults.baseUrl}/api/auth/cambiarContrasena/movil/` :
    `${axios.defaults.baseUrl}/api/auth/cambiarContrasena/`;
  return axios
    .post(`${url}${idRec}`, {
      password: nvoPass,
    })
    .then(resp => resp);
}

function actualizarContrasena(idRec, nvoPass) {
  const url = `${axios.defaults.baseUrl}/api/auth/actualizarContrasena/`;
  return axios
    .post(`${url}${idRec}`, {
      password: nvoPass,
    })
    .then(resp => resp);
}
