import D from "debug";
import axios from "../../config/axios";
import rutasGenericas from "../../config/apiBase";

const debug = D("ciris:mensajeApi.js");

const apiSinBases = {
  modelo: "mensaje",
  listarPrivado,
  listarPublico,
  marcarComoVistos,
};

const mensajeApi = rutasGenericas(apiSinBases);

export default mensajeApi;

function listarPrivado(cargados, cantidad, emisor, receptor) {
  debug("Listando privado");
  const query = {
    params: {
      emisor,
      cargados,
      cantidad,
    },
  };
  return axios
    .get(`${axios.defaults.baseUrl}/api/mensaje/privado/${receptor}`, query)
    .then(resp => resp.data);
}

function listarPublico(cargados, cantidad) {
  debug("Listando publico");
  const query = {
    params: {
      cargados,
      cantidad,
    },
  };
  return axios
    .get(`${axios.defaults.baseUrl}/api/mensaje/publico`, query)
    .then(resp => resp.data);
}

function marcarComoVistos(emisor) {
  debug("Marcando como visto");
  return axios
    .put(`${axios.defaults.baseUrl}/api/mensaje/marcarvistos/${emisor}`)
    .then(resp => resp.data);
}
