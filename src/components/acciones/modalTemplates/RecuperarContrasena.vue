<template>
  <section>
    <form novalidate @submit.stop.prevent="recuperar()">
      <div class="modal__header text--center">
        <div class="modal__header__titulo">
          Recuperar contraseña
        </div>
      </div>
      <div class="modal__body">
        <form-group class="modal__form" :error="errors.has(ids.correo) && submitted">
          <input type="text"
                 :id="ids.correo"
                 :name="ids.correo"
                 class="form__input form__input--blanco"
                 v-model="correo"
                 required
                 v-validate="'required|email'">
          <label :for="ids.correo" class="form__label">
            Ingrese el correo electrónico al que está asociado su cuenta
          </label>
          <span class="text text--rojo text--small modal__form__error"
                v-show="errors.has(ids.correo) && submitted">
            * Formato de correo inválido.
          </span>
        </form-group>
      </div>
      <div class="modal__footer">
        <button type="button" class="boton boton--cancelar"
                @click="cerrarModal"/>
        <button class="boton boton--aceptar" type="submit"/>
      </div>
    </form>
  </section>
</template>

<script>
import D from "debug";
import noop from "lodash/noop";
import id from "../../ids.js";

const debug = D("ciris:RecuperarContraseña.vue");

export default {
  name: "RecuperarContrasena",
  data,
  created,
  methods: {
    recuperar,
    cerrarModal() { return this.$store.commit("modal/hideModal"); },
  },
};

function data() {
  return {
    submitted: false,
    correo: "",
  };
}

function created() {
  this.ids = {
    correo: `correo-${id()}`,
  };
}

function recuperar() {
  this.submitted = true;
  return this.$validator.validateAll().then((valido) => {
    if (valido) {
      return this.$auth.solicitarCambio(this.correo)
        .then((resp) => {
          this.$store.commit("modal/hideModal");
          this.$toastr("success", this.$t("recovery.solicitud.success"), this.$t("common.success"));
          return resp;
        })
        .catch((err) => {
          debug(err);
          if (err.response.status < 500) {
            this.$toastr("info", this.$t("login.credencialesInvalidos.msj"), this.$t("login.credencialesInvalidos.titulo"));
          } else {
            this.$toastr("error", this.$t("login.error"), this.$t("common.error"));
          }
        });
    }
    return noop;
  });
}
</script>

<style lang="css">
</style>
