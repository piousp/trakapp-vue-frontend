<template>
  <section class="cuadro-ingreso">
    <div v-if="!exito" class="cuadro-ingreso__body">
      <div class="text--center">
        <img src="/logo-peq-contra.png" class="logo-login img--center" alt="Trakapp Logo">
      </div>
      <form v-if="validarRecuperacion(recuperacion)"
            novalidate @submit.stop.prevent="recuperar()">
        <h1 class="h4 text--blanco text--center">Recuperar Contraseña</h1>
        <password class="text--blanco"
                  @password="password = $event"
                  :submitted="submitted"/>
        <div class="text--center">
          <button class="boton boton--l boton--celeste-tema" type="submit">
            <i class="fa fa-fw fa-check"/>
            Cambiar contraseña
          </button>
        </div>
      </form>
      <div v-else>
        <h1 class="h3 text--naranja text--center"><i class="fal fa-watch"/> Error</h1>
        <p class="text text--big text--blanco text--left">
          Parece que este link ya no es válido, por favor genere otra petición de recuperación.
        </p>
      </div>
    </div>
    <div v-else class="cuadro-ingreso__body">
      <div class="text--center">
        <img src="/static/logo-peq-contra.png" class="logo-login img--center" alt="Trakapp Logo">
      </div>
      <h1 class="h3 text--lima text--center"><i class="fal fa-check-circle"/> Éxito</h1>
      <p class="text text--big text--blanco text--left">
        El cambio se efectuó exitosamente, ya puede cerrar esta ventana.
      </p>
    </div>
  </section>
</template>
<script>
import moment from "moment";
import isEmpty from "lodash/isEmpty";
import axios from "../../config/axios";

const debug = require("debug")("ciris:Recuperacion.vue");

export default {
  name: "Recuperacion",
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
        this.$auth.cambiarContrasena(
          this.recuperacion._id,
          this.password,
          this.recuperacion.movil,
        ).then((resp) => {
          if (isEmpty(resp)) {
            return this.$toastr("error", this.$t("recovery.proceso.fail"), this.$t("common.error"));
          }
          this.exito = true;
          return null;
        })
          .catch(() => this.$toastr("error", this.$t("recovery.proceso.fail"), this.$t("common.error")));
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
