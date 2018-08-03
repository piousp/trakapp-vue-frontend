import axios from "../../config/axios";

const cuentaApi = {
  invitarUsuarios,
};

function invitarUsuarios(usuario, correos) {
  const query = {
    usuario, correos,
  };
  return axios
    .post(`${axios.defaults.baseUrl}/api/cuenta/invitarUsuarios`, query)
    .then(resp => resp.data);
}

export default cuentaApi;
