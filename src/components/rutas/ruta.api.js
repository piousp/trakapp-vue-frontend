// import D from "debug";
import rutasGenericas from "../../config/apiBase";

// const debug = D("ciris:empleadoApi.js");

const apiSinBases = {
  modelo: "ruta",
};

const empleadoApi = rutasGenericas(apiSinBases);

export default empleadoApi;
