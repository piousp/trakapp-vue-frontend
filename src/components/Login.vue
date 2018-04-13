<template>
  <section class="login">
    <form class="login__body" novalidate @submit.stop.prevent="login()">
      <div class="text--center">
        <h1 class="h1 text--blanco">
          <i class="fa fa-fw fa-flask"/>
          Rastreador
        </h1>
      </div>
      <div class="form__group"
           :class="{ 'form__group--error': errors.has('usuario') && submitted }">
        <label for="usuario" class="form__label">Correo:</label>
        <div class="form__input-group">
          <span class="form__input-group__addon"><i class="fa fa-fw fa-user"/></span>
          <input name="usuario"
                 id="usuario"
                 placeholder="Digite su usuario. Ej: usuario@dominio.com"
                 type="text"
                 class="form__input login__input"
                 v-model="usuario"
                 v-validate="'required'"
                 @input="usuario = usuario.toLowerCase()">
        </div>
      </div>
      <div class="form__group"
           :class="{ 'form__group--error': errors.has('password') && submitted }">
        <label for="password" class="form__label">Contraseña:</label>
        <div class="form__input-group">
          <span class="form__input-group__addon"><i class="fa fa-fw fa-lock"/></span>
          <input name="password"
                 placeholder="Digite su contraseña"
                 id="password"
                 type="password"
                 class="form__input login__input"
                 v-model="password"
                 v-validate="'required'">
        </div>
      </div>
      <br>
      <div class="text--center">
        <button class="boton boton--verde-o boton--l" type="submit">
          <i class="fa fa-fw fa-sign-in"/>
          Iniciar sesión
        </button>
      </div>
    </form>
  </section>
</template>

<script>
import D from "debug";

const debug = D("ciris:Login.vue");
export default {
  data() {
    return {
      usuario: "",
      password: "",
      recordar: true,
      submitted: false,
    };
  },
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
  background: transparentize($negro2, .2);
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
