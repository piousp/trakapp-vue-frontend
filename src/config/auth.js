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
        return Vue.prototype.$store.dispatch("storeCuenta/getID", {
          id: cuenta._id,
          conservarComoActivo: true,
        }).then(() => Vue.prototype.$store.commit("storeApp/toggleAuthCargado"));
      } else if (usuario.cuentas.length > 1) {
        Vue.prototype.$store.commit("storeModal/showModal", "selectCuenta");
        return Vue.prototype.$store.commit("storeApp/toggleAuthCargado");
      }
      return Vue.prototype.$store.dispatch("storeCuenta/getID", {
        id: usuario.cuentas[0],
        conservarComoActivo: true,
      }).then(() => Vue.prototype.$store.commit("storeApp/toggleAuthCargado"));
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
            Vue.prototype.$store.commit("storeUsuario/setUsuarioActivo", usuario);
            axios.defaults.headers.common.Authorization = `Bearer ${resp.data.token}`;
            resolverCuenta(usuario);
            identificarSocket(usuario);
            return resp.data;
          });
      },
      logout() {
        sessionStorage.removeItem(options.pkg);
        localStorage.removeItem(options.pkg);
        Vue.prototype.$store.commit("storeUsuario/resetUsuarioActivo");
      },
      checkAuth() {
        debug("checkAuth");
        const credenciales =
          JSON.parse(localStorage.getItem(options.pkg)) ||
          JSON.parse(sessionStorage.getItem(options.pkg));
        if (credenciales) {
          const { usuario } = credenciales;
          usuario.estaAutenticado = !!credenciales.token;
          Vue.prototype.$store.commit("storeUsuario/setUsuarioActivo", usuario);
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
      recuperarContrasena(idRec, nvoPass, movil) {
        const url = movil ? `${axios.defaults.baseUrl}/api/auth/recuperarContrasena/movil/` :
          `${axios.defaults.baseUrl}/api/auth/recuperarContrasena/`;
        return axios
          .post(`${url}${idRec}`, {
            password: nvoPass,
          })
          .then(resp => resp);
      },
      verificarPasswordCorrecto(password) {
        return axios
          .post(`${axios.defaults.baseUrl}/api/auth/verificarPasswordCorrecto`, { password })
          .then(resp => resp.data);
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
