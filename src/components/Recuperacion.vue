<template>
  <section class="login">
    <div v-if="!exito">
      <form v-if="validarRecuperacion(recuperacion)"
            class="login__body"
            novalidate @submit.stop.prevent="recuperar()"
            style="width: 100% !important; padding-left: 10px; padding-right:10px">
        <h1 class="text text--uppercase text--center">
          <i class="fa fa-fw fa-user-plus"/>
          Recuperar cuenta
        </h1>
        <div class="form__group"
             :class="{ 'form__group--error': errors.has('password') && submitted }">
          <label for="password"
                 class="form__label login__label">
            <span class="text--rojo">*</span>
            Contraseña:
          </label>
          <input name="password"
                 id="password"
                 type="password"
                 class="form__input login__input"
                 v-model="password"
                 placeholder="********"
                 v-validate="'required'">
        </div>
        <div class="form__group"
             :class="{ 'form__group--error': errors.has('password2') && submitted }">
          <label for="password2"
                 class="form__label login__label">
            <span class="text--rojo">*</span>
            Confirme la contraseña:
          </label>
          <input name="password2"
                 id="password2"
                 type="password"
                 class="form__input login__input"
                 v-model="password2"
                 placeholder="********"
                 v-validate="{rules: {regex: password, required: true}}">
        </div>
        <div class="text--center">
          <button class="boton boton--l boton--musgo" type="submit">
            <i class="fa fa-fw fa-check"/>
            Cambiar contraseña
          </button>
        </div>
      </form>
      <h1 v-else style="width: 100% !important"
          class="login__body text text--uppercase text--center">
        Parece que este link ya no es válido, por favor genere otra petición de recuperación
      </h1>
    </div>
    <div v-else>
      <h1 style="width: 100% !important"
          class="login__body text text--uppercase text--center">
        El cambio se efectuó exitosamente, ya puede cerrar esta ventana.
      </h1>
    </div>
  </section>
</template>
<script>
import moment from "moment";
import isEmpty from "lodash/isEmpty";
import axios from "../config/axios";

const debug = require("debug")("app:login");

export default {
  data,
  methods: {
    recuperar,
    validarRecuperacion,
  },
  beforeRouteEnter,
};

function obtener(id) {
  return axios
    .get(`${axios.defaults.baseUrl}/api/recuperacion/${id}`)
    .then(resp => resp.data);
}

function data() {
  return {
    recuperacion: {},
    password: "",
    password2: "",
    exito: false,
    submitted: false,
  };
}

function recuperar() {
  this.submitted = true;
  this.$validator
    .validateAll()
    .then((result) => {
      if (result) {
        this.$auth.cambiarContraseña(this.recuperacion._id, this.password, true).then((resp) => {
          if (isEmpty(resp)) {
            return this.$toastr("error", "Ocurrio un error cambiando la contraseña, intente nuevamente", "Error");
          }
          this.exito = true;
          return null;
        })
          .catch(() => this.$toastr("error", "Ocurrio un error cambiando la contraseña, intente nuevamente", "Error"));
      } else {
        this.$toastr(
          "error",
          "Las contraseñas no coinciden",
          "Error de contraseña",
        );
      }
      return false;
    })
    .catch((err) => {
      debug("Hubo un error", err);
      this.$toastr(
        "error",
        "Las contraseñas no coinciden",
        "Error de contraseña",
      );
    });
}

function validarRecuperacion(recuperacion) {
  return recuperacion._id && recuperacion.activo && validarTiempo(recuperacion.horaCreacion);
}

function validarTiempo(horaCreacion) {
  return moment().diff(moment(horaCreacion), "days") === 0;
}

function beforeRouteEnter(to, from, next) {
  if (to.params.id) {
    obtener(to.params.id).then(resp => next((vm) => {
      vm.recuperacion = resp;
    })).catch(err => console.log(err));
  } else {
    next();
  }
}
</script>
<style src="./login.scss" lang="scss"/>
