<template>
  <section class="login">
    <form class="login__body" novalidate @submit.stop.prevent="login()">
      <img src="/static/Ciris-color.png" alt="Logo" class="img--center">
      <div class="text--center">
        <h1 class="h3 text--azul">
          ¡Registrese para usar las características del rastreador!
        </h1>
      </div>
      <p class="text text--center">
        Por favor rellene los campos con los datos solicitados
      </p>
      <div class="grid">
        <div class="col-md-6">
          <div class="form__group">
            <label :for="ids.nombre" class="form__label">Nombre</label>
            <input class="form__input" :id="ids.nombre" required>
          </div>
        </div>
        <div class="col-md-6">
          <div class="form__group">
            <label :for="ids.apellidos" class="form__label">Apellidos</label>
            <input class="form__input" :id="ids.apellidos" required>
          </div>
        </div>
      </div>
      <div class="grid">
        <div class="col-md-6">
          <div class="form__group">
            <label :for="ids.correo" class="form__label">Correo</label>
            <input class="form__input" :id="ids.correo" type="email" required>
          </div>
        </div>
        <div class="col-md-6">
          <div class="form__group">
            <label :for="ids.password" class="form__label">Password</label>
            <input class="form__input" :id="ids.password" required>
          </div>
        </div>
      </div>
      <div class="grid">
        <div class="col-md-6">
          <div class="form__group">
            <label :for="ids.empresa" class="form__label">Empresa</label>
            <input class="form__input" :id="ids.empresa">
          </div>
        </div>
        <div class="col-md-6">
          <div class="form__group">
            <label :for="ids.sitioweb" class="form__label">Sitio Web</label>
            <input class="form__input" :id="ids.sitioweb" type="url">
          </div>
        </div>
      </div>
      <br>
      <div class="text--center">
        <button class="boton boton--azul boton--xl" type="submit">
          <i class="fas fa-fw fa-building"/>
          ¡Registrarse!
        </button>
      </div>
    </form>
  </section>
</template>

<script>
import D from "debug";

const debug = D("Login.vue");
export default {
  data,
  created,
  methods: {
    login() {
      this.submitted = true;
      this.$validator.validateAll();
      if (!this.errors.any()) {
        this.$auth.login(this.usuario, this.password, this.recordar)
          .then((response) => {
            debug(response);
            this.$router.push({ name: "home" });
            this.$toastr("success", this.$t("login.success"), `${response.usuario.nombre}`);
            return response;
          })
          .catch((err) => {
            debug(err);
            this.$toastr("error", this.$t("login.error"), "Error");
          });
      }
    },
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
    nombre: `nombre-${id()}`,
    apelidos: `apellidos-${id()}`,
    correo: `correo-${id()}`,
    password: `password-${id()}`,
    empresa: `empresa-${id()}`,
    sitioweb: `sitioweb-${id()}`,
  };
}

function id() {
  return Math.random().toString(36).substr(2, 9);
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
    background: transparentize($negro2, .1);
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
