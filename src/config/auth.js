import D from "debug";
import bugsnagClient from "../components/comunes/bugsnag";

const debug = D("ciris:auth.js");

const Auth = {
  install(Vue, axios, options) {
    function identificarSocket(usuario) {
      Vue.prototype.$socket.emit("sesionIniciada", usuario);
      debug(usuario);
      bugsnagClient.user = {
        id: usuario._id,
        name: `${usuario.nombre} ${usuario.apellidos}`,
        email: usuario.correo,
      };
    }
    function resolverCuenta(usuario) {
      const cuenta = {
        _id: localStorage.getItem("trakappCuenta"),
      };
      if (cuenta._id) {
        Vue.prototype.$store.dispatch("perfil/cargarCuenta", {
          cuenta: cuenta._id,
          recordarme: true,
        });
      } else if (usuario.cuentas.length > 1) {
        Vue.prototype.$store.commit("modal/showModal", "SelectCuenta");
      } else {
        Vue.prototype.$store.dispatch("perfil/cargarCuenta", {
          cuenta: usuario.cuentas[0],
          recordarme: true,
        });
      }
    }
    Vue.auth = {
      registro(obj) {
        return axios
          .post(`${axios.defaults.baseUrl}/api/auth/registro`, obj)
          .then(resp => resp.data);
      },
      login(cred, password, recuerdame) {
        return axios
          .post(`${axios.defaults.baseUrl}/api/auth/login`, {
            login: cred,
            password,
          })
          .then((resp) => {
            const storage = recuerdame ? localStorage : sessionStorage;
            storage.setItem(options.pkg, JSON.stringify(resp.data));
            const { usuario } = resp.data;
            usuario.estaAutenticado = true;
            Vue.prototype.$store.commit("perfil/setUsuario", usuario);
            axios.defaults.headers.common.Authorization = `Bearer ${resp.data.token}`;
            resolverCuenta(usuario);
            identificarSocket(usuario);
            return resp.data;
          });
      },
      logout() {
        sessionStorage.removeItem(options.pkg);
        localStorage.removeItem(options.pkg);
        Vue.prototype.$store.commit("perfil/setUsuario", null);
      },
      checkAuth() {
        debug("checkAuth");
        const credenciales =
          JSON.parse(localStorage.getItem(options.pkg)) ||
          JSON.parse(sessionStorage.getItem(options.pkg));
        if (credenciales) {
          const { usuario } = credenciales;
          usuario.estaAutenticado = !!credenciales.token;
          Vue.prototype.$store.commit("perfil/setUsuario", usuario);
          axios.defaults.headers.common.Authorization = `Bearer ${credenciales.token}`;
          resolverCuenta(usuario);
          identificarSocket(usuario);
        }
      },
      solicitarCambio(correo) {
        const url = `${axios.defaults.baseUrl}/api/auth/solicitarCambio/`;
        return axios
          .post(`${url}`, {
            correo,
          })
          .then(resp => resp);
      },
      cambiarContrasena(idRec, nvoPass, movil) {
        const url = movil ? `${axios.defaults.baseUrl}/api/auth/cambiarContrasena/movil/` : `${axios.defaults.baseUrl}/api/auth/cambiarContrasena/`;
        return axios
          .post(`${url}${idRec}`, {
            password: nvoPass,
          })
          .then(resp => resp);
      },
      actualizarContrasena(idRec, nvoPass) {
        const url = `${axios.defaults.baseUrl}/api/auth/actualizarContrasena/`;
        return axios
          .post(`${url}${idRec}`, {
            password: nvoPass,
          })
          .then(resp => resp);
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

export default Auth;
