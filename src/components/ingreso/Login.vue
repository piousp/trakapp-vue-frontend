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
                   params="class=&quot;text--cyan&quot;">¡Regístrese ahora!</router-link>
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
            comp.$toastr("success", this.$t("login.success"), `${resp.usuario.nombre}`);
            return resp;
          }
          if (this.idCuenta && !find(this.usuario.cuentas, n => n === this.idCuenta)) {
            const usuario = cloneDeep(resp.usuario);
            usuario.cuentas.push(this.idCuenta);
            return this.$store.dispatch(this.$actions.guardarUsuario, usuario)
              .then(() => {
                this.$toastr("success", this.$t("invitation.success"), "Éxito");
                return redirijir();
              })
              .catch((err) => {
                debug(err);
                return this.$toastr("error", this.$t("invitation.error"), "Error");
              });
          } else if (find(this.usuario.cuentas, n => n === this.idCuenta)) {
            this.$toastr("error", this.$t("invitation.alreadyBelongs"), "Error");
          }
          return redirijir();
        })
        .catch((err) => {
          debug(err);
          if (err.response.status < 500) {
            this.$toastr("info", this.$t("login.credencialesInvalidos.msj"), this.$t("login.credencialesInvalidos.titulo"));
          } else {
            this.$toastr("error", this.$t("login.error"), "Error");
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
