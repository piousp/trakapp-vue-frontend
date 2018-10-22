import D from "debug";
import axios from "../config/axios";
import rutasGenericas from "./_base";

const debug = D("ciris:clienteApi.js");

const apiSinBases = {
  modelo: "cliente",
  buscar,
};

const clienteApi = rutasGenericas(apiSinBases);

export default clienteApi;

function buscar(txt, pagina, cantidad) {
  debug(`Buscando por texto: ${txt}`);
  return axios
    .get(`${axios.defaults.baseUrl}/api/cliente/buscar/${txt}`, {
      params: {
        pagina: pagina || 0,
        cantidad: cantidad || 0,
      },
    })
    .then(resp => resp.data);
}
