<template>
  <section class="cuadro-ingreso">
    <form class="cuadro-ingreso__body" novalidate @submit.stop.prevent="login()">
      <div class="text--center">
        <img src="/logo-peq-contra.png" class="logo-login img--center" alt="Trakapp Logo">
      </div>
      <h1 class="h4 text--blanco text--center">Ingrese sus credenciales</h1>
      <form-group :error="errors.has(ids.correo) && submitted">
        <input type="text"
               autofocus
               :id="ids.correo"
               :name="ids.correo"
               class="form__input form__input--blanco"
               v-model="usuario"
               required
               v-validate="'required|email'"
               @input="usuario = usuario.toLowerCase()">
        <label :for="ids.correo" class="form__label form__input--blanco">Correo</label>
      </form-group>
      <form-group :error="errors.has(ids.password) && submitted">
        <input type="password"
               :id="ids.password"
               :name="ids.password"
               class="form__input form__input--blanco"
               v-model="password"
               required
               v-validate="'required'">
        <label :for="ids.password" class="form__label form__input--blanco">Contraseña</label>
      </form-group>
      <div>
        <span class="text text--blanco text--registro text--small">
          ¿Olvidó su contraseña? <a @click="abrirModalRecuperacion"
                                    class="text--cyan clickable">Recupérela aquí</a>
        </span>
      </div>
      <br>
      <div class="text--center">
        <button class="boton boton--celeste-tema boton--l" type="submit">
          <i class="fa fa-fw fa-sign-in"/>
          Iniciar sesión
        </button>
      </div>
    </form>
    <p class="text text--right text--blanco text--registro">
      ¿No tiene cuenta?
      <router-link :to="{
                     name: idCuenta ? 'invitacionRegistro' : 'registro',
                     params: idCuenta ? {idCuenta} : {}
                   }"
                   class="text--cyan">¡Regístrese ahora!</router-link>
    </p>
  </section>
</template>

<script>
import D from "debug";
import noop from "lodash/noop";
import cloneDeep from "lodash/cloneDeep";
import find from "lodash/find";
import id from "../ids.js";

const debug = D("ciris:Login.vue");

export default {
  name: "Login",
  data,
  created,
  methods: {
    login,
    abrirModalRecuperacion,
  },
  beforeRouteEnter,
};

function data() {
  return {
    ids: {},
    usuario: "",
    password: "",
    recordar: true,
    submitted: false,
    idCuenta: null,
  };
}

function beforeRouteEnter(to, from, next) {
  if (to.params.id) {
    next((vm) => {
      vm.idCuenta = to.params.id;
    });
  }
  return next();
}

function created() {
  this.ids = {
    correo: `correo-${id()}`,
    password: `password-${id()}`,
    modalCorreo: `modalCorreo-${id()}`,
  };
}

function login() {
  const comp = this;
  this.submitted = true;
  return this.$validator.validateAll().then((valido) => {
    if (valido) {
      return this.$auth.login(this.usuario, this.password, this.recordar)
        .then((resp) => {
          function redirijir() {
            debug(resp);
            comp.$router.push({ name: "agenda" });
            comp.$toastr("success", comp.$t("login.success"), `${resp.usuario.nombre}`);
            return resp;
          }
          if (comp.idCuenta && !find(comp.usuario.cuentas, n => n === comp.idCuenta)) {
            const usuario = cloneDeep(resp.usuario);
            usuario.cuentas.push(comp.idCuenta);
            return comp.$store.dispatch(comp.$actions.guardarUsuario, usuario)
              .then(() => {
                comp.$toastr("success", comp.$t("invitation.success"), "Éxito");
                return redirijir();
              })
              .catch((err) => {
                debug(err);
                return comp.$toastr("error", comp.$t("invitation.error"), "Error");
              });
          } else if (find(comp.usuario.cuentas, n => n === comp.idCuenta)) {
            comp.$toastr("error", comp.$t("invitation.alreadyBelongs"), "Error");
          }
          return redirijir();
        })
        .catch((err) => {
          debug(err);
          if (err.response.status < 500) {
            comp.$toastr("info", comp.$t("login.credencialesInvalidos.msj"), comp.$t("login.credencialesInvalidos.titulo"));
          } else {
            comp.$toastr("error", comp.$t("login.error"), "Error");
          }
        });
    }
    return noop;
  });
}

function abrirModalRecuperacion() {
  return this.$store.commit(this.$actions.showModal, {
    componentName: "recuperarContrasena",
  });
}
</script>

<style src="./login.scss" lang="scss"/>
