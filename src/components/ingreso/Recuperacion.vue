<template>
  <section class="cuadro-ingreso">
    <div v-if="!exito" class="cuadro-ingreso__body">
      <form v-if="validarRecuperacion(recuperacion)"
            novalidate @submit.stop.prevent="recuperar()">
        <h1 class="text--center">Recuperar cuenta</h1>
        <form-group :error="errors.has('password') && submitted">
          <input type="text"
                 id="password"
                 name="password"
                 placeholder="**********"
                 class="form__input form__input--blanco"
                 v-model="password"
                 v-validate="{rules: {is: password2, required: true}}">
          <label for="password" class="form__label">Contraseña:</label>
        </form-group>
        <form-group :error="errors.has('password2') && submitted">
          <input type="text"
                 id="password2"
                 name="password2"
                 placeholder="**********"
                 class="form__input form__input--blanco"
                 v-model="password2"
                 v-validate="{rules: {is: password, required: true}}">
          <label for="password2" class="form__label">Confirme la contraseña:</label>
        </form-group>
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
    <div v-else class="login__body">
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
import axios from "../../config/axios";

const debug = require("debug")("ciris:Recuperacion.vue");

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
        this.$auth.cambiarContrasena(this.recuperacion._id, this.password, true).then((resp) => {
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
    })).catch(err => debug(err));
  } else {
    next();
  }
}
</script>
<style src="./login.scss" lang="scss"/>
