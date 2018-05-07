import axios from "../../config/axios";

const perfilApi = {
  actualizarUsuario,
  datosUsuario,
  datosCuenta,
};

export default perfilApi;

function actualizarUsuario(usuario) {
  return axios
    .put(`${axios.defaults.baseUrl}/api/usuario/${usuario._id}`, usuario)
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
