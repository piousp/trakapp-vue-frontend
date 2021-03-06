import D from "debug";
import axios from "../../config/axios";
import rutasGenericas from "../../config/apiBase";

const debug = D("ciris:empleadoApi.js");

const apiSinBases = {
  modelo: "empleado",
  listarConMensajes,
  buscarEmpleadosChat,
};

const empleadoApi = rutasGenericas(apiSinBases);

export default empleadoApi;

function listarConMensajes(pagina, cantidad) {
  debug("Listando con mensajes");
  const query = {
    params: {
      pagina: pagina || 0,
      cantidad: cantidad || 0,
    },
  };
  return axios
    .get(`${axios.defaults.baseUrl}/api/empleado/conmensajes`, query)
    .then(resp => resp.data);
}

function buscarEmpleadosChat(param) {
  return axios
    .get(`${axios.defaults.baseUrl}/api/empleado/buscadorchat/${param}`, {
      params: {
        pagina: 0,
        cantidad: 10,
      },
    })
    .then(resp => resp.data);
}
