<template>
  <section class="login">
    <form class="login__body" novalidate @submit.stop.prevent="registrarse()">
      <img src="/static/logo.png" class="logo-login img-center" alt="Trakapp Logo">
      <div class="text--center"/>
      <p class="text text--center">
        Por favor rellene los campos con los datos solicitados
      </p>
      <input type="text" style="display:none">
      <!-- Esto es EL HACK para que el autocomplete del browser se confunda y no me joda el form -->
      <input type="password" name="hack-password" id="hack-password"
             style="opacity:0;position:absolute;height:0;">
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
          <form-group :error="errors.has(ids.apellidos) && submitted">
            <label :for="ids.apellidos" class="form__label">Apellidos</label>
            <input class="form__input"
                   :id="ids.apellidos"
                   :name="ids.apellidos"
                   value=""
                   placeholder="Flores Paris"
                   required
                   v-model="usuario.apellidos"
                   v-validate="'required'"
            >
          </form-group>
        </div>
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
          <form-group :error="errors.has(ids.password) && submitted">
            <label :for="ids.password" class="form__label">Password</label>
            <input class="form__input"
                   type="password"
                   :id="ids.password"
                   :name="ids.password"
                   value=""
                   required
                   v-model="usuario.password"
                   v-validate="'required'"
            >
          </form-group>
          <form-group>
            <div class="checkbox checkbox--morado">
              <input type="checkbox"
                     :id="ids.empresarial"
                     :name="ids.empresarial"
                     v-model="usuario.empresarial"
                     checked="false">
              <label class="form__label" :for="ids.empresarial">
                Estoy creando una cuenta empresarial
              </label>
            </div>
          </form-group>
        </div>
      </div>
      <div class="grid" v-if="usuario.empresarial">
        <div class="col-md-6">
          <form-group :error="errors.has(ids.empresa) && submitted">
            <label :for="ids.empresa" class="form__label">Empresa</label>
            <input class="form__input"
                   :id="ids.empresa"
                   :name="ids.empresa"
                   placeholder="Trakapp S.A."
                   required
                   v-model="usuario.cuenta.nombre"
                   v-validate="'required'"
            >
          </form-group>
          <form-group :error="errors.has(ids.correoEmpresa) && submitted">
            <label :for="ids.correoEmpresa" class="form__label">Correo contacto</label>
            <input class="form__input"
                   type="email"
                   :id="ids.correoEmpresa"
                   :name="ids.correoEmpresa"
                   placeholder="info@trakapp.com"
                   required
                   v-model="usuario.cuenta.correo"
                   v-validate="'required|email'"
            >
          </form-group>
        </div>
        <div class="col-md-6">
          <form-group :error="errors.has(ids.cedula) && submitted">
            <label :for="ids.cedula" class="form__label">Cédula</label>
            <input type="text"
                   class="form__input"
                   :id="ids.cedula"
                   :name="ids.cedula"
                   placeholder="3101625445"
                   v-model="usuario.cuenta.cedula"
            >
          </form-group>
          <form-group :error="errors.has(ids.direccion) && submitted">
            <label :for="ids.direccion" class="form__label">Dirección</label>
            <textarea cols="30" rows="2" class="form__input"
                      :id="ids.direccion"
                      :name="ids.direccion"
                      placeholder="Trakapp S.A."
                      v-model="usuario.cuenta.direccion"
            />
          </form-group>
        </div>
      </div>
      <br>
      <p class="text text--right">
        ¿Ya tienes cuenta? Click <router-link to="login">aquí</router-link>
        para ingresar
      </p>
      <div class="text--center">
        <button class="boton boton--verde boton--xl" type="submit">
          <i class="fas fa-fw fa-building"/>
          ¡Registrarse!
        </button>
      </div>
    </form>
  </section>
</template>

<script>
import D from "debug";
import noop from "lodash/noop";

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
      empresarial: false,
      cuenta: {},
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
    empresarial: `empresarial-${id()}`,
    empresa: `empresa-${id()}`,
    correoEmpresa: `correoEmpresa-${id()}`,
    direccion: `direccion-${id()}`,
    cedula: `cedula-${id()}`,
  };
}

function registrarse() {
  this.submitted = true;
  return this.$validator.validateAll().then((valido) => {
    if (valido) {
      this.$auth.registro(this.usuario)
        .then((resp) => {
          debug(resp);
          this.$toastr("success", "Cuenta creada", "OK");
          this.$router.push({ name: "home" });
          this.$toastr("success", this.$t("login.success"), `${resp.usuario.nombre}`);
          return resp;
        })
        .catch((err) => {
          debug(err);
          if (err.response.status === 409) {
            this.$toastr("info", "El usuario ya existe", "Error");
          } else {
            this.$toastr("error", "Error al crear la cuenta", "Error");
          }
        });
    }
    return noop;
  });
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

.logo-login{
  max-width: 100%;
  height: 220px;
}


</style>
