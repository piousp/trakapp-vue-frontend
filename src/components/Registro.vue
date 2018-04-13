<template>
  <section class="login">
    <form class="login__body" novalidate @submit.stop.prevent="registrarse()">
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
          <form-group :error="errors.has(ids.nombre) && submitted">
            <label :for="ids.nombre" class="form__label">Nombre</label>
            <input class="form__input"
                   :id="ids.nombre"
                   :name="ids.nombre"
                   required
                   placeholder="Pablo"
                   v-model="usuario.nombre"
                   v-validate="'required'"
            >
          </form-group>
        </div>
        <div class="col-md-6">
          <form-group :error="errors.has(ids.apellidos) && submitted">
            <label :for="ids.apellidos" class="form__label">Apellidos</label>
            <input class="form__input"
                   :id="ids.apellidos"
                   :name="ids.apellidos"
                   placeholder="Flores Paris"
                   required
                   v-model="usuario.apellidos"
                   v-validate="'required'"
            >
          </form-group>
        </div>
      </div>
      <div class="grid">
        <div class="col-md-6">
          <form-group :error="errors.has(ids.correo) && submitted">
            <label :for="ids.correo" class="form__label">Correo</label>
            <input
              class="form__input"
              :id="ids.correo"
              :name="ids.correo"
              type="email"
              placeholder="allan.perez@ciriscr.com"
              required
              v-model="usuario.correo"
              v-validate="'required|email'"
            >
          </form-group>
        </div>
        <div class="col-md-6">
          <form-group :error="errors.has(ids.password) && submitted">
            <label :for="ids.password" class="form__label">Password</label>
            <input class="form__input"
                   type="password"
                   :id="ids.password"
                   :name="ids.password"
                   required
                   v-model="usuario.password"
                   v-validate="'required'"
            >
          </form-group>
        </div>
      </div>
      <div class="grid">
        <div class="col-md-6">
          <form-group>
            <label :for="ids.empresa" class="form__label">Empresa</label>
            <input
              class="form__input"
              :id="ids.empresa"
              v-model="usuario.empresa"
            >
          </form-group>
        </div>
        <div class="col-md-6">
          <form-group :error="errors.has(ids.sitioweb) && submitted">
            <label :for="ids.sitioweb" class="form__label">Sitio Web</label>
            <input class="form__input"
                   :id="ids.sitioweb"
                   :name="ids.sitioweb"
                   type="url"
                   v-model="usuario.sitioweb"
                   v-validate="'url'"
            >
          </form-group>
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

const debug = D("ciris:Registro.vue");

export default {
  data,
  created,
  methods: {
    registrarse,
  },
};

function data() {
  return {
    ids: {},
    usuario: {
      nombre: "",
      apellidos: "",
      correo: "",
      password: "",
      empresa: "",
      sitioweb: "",
    },
    submitted: false,
  };
}

function created() {
  this.ids = {
    nombre: `nombre-${id()}`,
    apellidos: `apellidos-${id()}`,
    correo: `correo-${id()}`,
    password: `password-${id()}`,
    empresa: `empresa-${id()}`,
    sitioweb: `sitioweb-${id()}`,
  };
}

async function registrarse() {
  this.submitted = true;
  const valido = await this.$validator.validateAll();
  if (valido) {
    try {
      const resp = await this.$auth.registro(this.usuario);
      debug(resp);
      this.$toastr("success", "Cuenta creada", "OK");
    } catch (e) {
      debug(e);
      this.$toastr("error", "Error al crear la cuenta", "Error");
    }
  }
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


</style>
