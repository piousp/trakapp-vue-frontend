import axios from "../../config/axios";

const cuentaApi = {
  invitarUsuarios,
  cargarBulk,
};

function invitarUsuarios(usuario, correos) {
  const query = {
    usuario, correos,
  };
  return axios
    .post(`${axios.defaults.baseUrl}/api/cuenta/invitarUsuarios`, query)
    .then(resp => resp.data);
}

function cargarBulk(cuentas) {
  const query = {
    params: {
      cuentas,
    },
  };
  return axios
    .get(`${axios.defaults.baseUrl}/api/cuenta/cargarBulk`, query)
    .then(resp => resp.data);
}

export default cuentaApi;
