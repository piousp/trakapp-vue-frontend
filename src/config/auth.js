const Auth = {
  install(Vue, axios, options) {
    Vue.auth = {
      usuario: {},
      registro: registro(axios),
      login: signin(axios, options),
      logout: logout(options),
      checkAuth: checkAuth(axios, options),
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

function signin(axios, options) {
  return (login, password, recuerdame) => axios
    .post(`${axios.defaults.baseUrl}/api/auth/login`, {
      login,
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
}

function logout(options) {
  return () => {
    sessionStorage.removeItem(options.pkg);
    localStorage.removeItem(options.pkg);
    this.usuario.estaAutenticado = false;
  };
}

function checkAuth(axios, options) {
  return () => {
    const credenciales =
      JSON.parse(localStorage.getItem(options.pkg)) ||
      JSON.parse(sessionStorage.getItem(options.pkg));
    if (credenciales) {
      this.usuario = credenciales.usuario;
      this.usuario.estaAutenticado = !!credenciales.token;
      axios.defaults.headers.common.Authorization = `Bearer ${credenciales.token}`;
    }
  };
}

function registro(axios) {
  return obj => axios
    .post(`${axios.defaults.baseUrl}/api/registro`, obj);
}

export default Auth;
