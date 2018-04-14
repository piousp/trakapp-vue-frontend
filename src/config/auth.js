import D from "debug";

const debug = D("ciris:auth.js");

const Auth = {
  install(Vue, axios, options) {
    Vue.auth = {
      usuario: {},
      registro: registro(axios),
      login(cred, password, recuerdame) {
        return axios
          .post(`${axios.defaults.baseUrl}/api/auth/login`, {
            login: cred,
            password,
          })
          .then((resp) => {
            const storage = recuerdame ? localStorage : sessionStorage;
            storage.setItem(options.pkg, JSON.stringify(resp.data));
            this.usuario = resp.data.usuario;
            this.usuario.estaAutenticado = true;
            axios.defaults.headers.common.Authorization = `Bearer ${resp.data.token}`;
            return resp.data;
          });
      },
      logout() {
        sessionStorage.removeItem(options.pkg);
        localStorage.removeItem(options.pkg);
        this.usuario.estaAutenticado = false;
      },
      checkAuth() {
        debug("checkAuth");
        const credenciales =
          JSON.parse(localStorage.getItem(options.pkg)) ||
          JSON.parse(sessionStorage.getItem(options.pkg));
        debug("Credenciales", credenciales);
        if (credenciales) {
          this.usuario = credenciales.usuario;
          this.usuario.estaAutenticado = !!credenciales.token;
          axios.defaults.headers.common.Authorization = `Bearer ${credenciales.token}`;
        }
      },
    };

    Object.defineProperties(Vue.prototype, {
      $auth: {
        get() {
          return Vue.auth;
        },
      },
    });
  },
};


function registro(axios) {
  return obj => axios
    .post(`${axios.defaults.baseUrl}/api/auth/registro`, obj);
}

export default Auth;
