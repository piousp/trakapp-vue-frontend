<template>
  <section class="login">
    <form class="login__body" novalidate @submit.stop.prevent="login()">
      <div class="text--center">
        <h1 class="h1 text--azul">
          <i class="fa fa-fw fa-flask"/>
          Rastreador
        </h1>
      </div>
      <form-group :error="errors.has(ids.correo) && submitted">
        <label :for="ids.correo" class="form__label">Correo:</label>
        <input type="text"
               :id="ids.correo"
               :name="ids.correo"
               placeholder="Digite su usuario. Ej: usuario@dominio.com"
               class="form__input"
               v-model="usuario"
               v-validate="'required'"
               @input="usuario = usuario.toLowerCase()">
      </form-group>
      <form-group :error="errors.has(ids.password) && submitted">
        <label :for="ids.password" class="form__label">Contraseña:</label>
        <input type="password"
               placeholder="Digite su contraseña"
               :id="ids.password"
               :name="ids.password"
               class="form__input"
               v-model="password"
               v-validate="'required'">
      </form-group>
      <br>
      <p class="text text--right">
        ¿No tienes cuenta? Click <router-link to="registro">aquí</router-link>
        para registrarse
      </p>
      <div class="text--center">
        <button class="boton boton--azul boton--l" type="submit">
          <i class="fa fa-fw fa-sign-in"/>
          Iniciar sesión
        </button>
      </div>
    </form>
  </section>
</template>

<script>
import D from "debug";
import noop from "lodash/noop";
import id from "./ids.js";

const debug = D("ciris:Login.vue");
export default {
  data,
  created,
  methods: {
    login,
  },
};

function data() {
  return {
    ids: {},
    usuario: "",
    password: "",
    recordar: true,
    submitted: false,
  };
}

function created() {
  this.ids = {
    correo: `correo-${id()}`,
    password: `password-${id()}`,
  };
}

function login() {
  this.submitted = true;
  return this.$validator.validateAll().then((valido) => {
    if (valido) {
      return this.$auth.login(this.usuario, this.password, this.recordar)
        .then((resp) => {
          debug(resp);
          this.$router.push({ name: "home" });
          this.$toastr("success", this.$t("login.success"), `${resp.usuario.nombre}`);
          return resp;
        })
        .catch((err) => {
          debug(err);
          if (err.response.status < 500) {
            this.$toastr("info", "Credenciales inválidos", "Usuario inválido");
          } else {
            this.$toastr("error", this.$t("login.error"), "Error");
          }
        });
    }
    return noop;
  });
}
</script>

<style lang="scss">
@import "../sass/base/colores";
@import "../sass/base/helpers";

.login {
  align-items: center;
  background: url("/static/fondo.jpg");
  background-attachment: fixed;
  background-size: cover;
  display: flex;
  height: 100%;
  justify-content: center;

  &::before {
    background: transparentize($blanco, .1);
    width: 100%;
    height: 100%;
    position: fixed;
    z-index: 2;
  }
}

.login__body {
  @extend .sombra;
  background: transparentize($blanco, .2);
  padding: 15px 0;
  width: 90%;

  @media (min-width: 992px) {
    padding: 1em;
    width: 45%;
  }
}

.login__label {
  font-size: 90%;
  font-weight: bolder;
}

.login__boton {
  margin-top: 15px;
  width: 96%;
}

@media (min-width: 992px) {

  .login__label {
    font-size: 90%;
    font-weight: bolder;
    justify-content: flex-end;
    text-align: right;
  }
}

.login__input {
  background: transparent;
  color: $blanco;
}

</style>
