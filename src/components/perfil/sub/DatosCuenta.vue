<template lang="html">
  <section>
    <div class="botones-pagina">
      <button type="button" class="boton boton--guardar"
              onclick="document.getElementById('prueba').click()"/>
    </div>
    <form class="grid" novalidate @submit.stop.prevent="guardarCuenta(cuenta)">
      <div class="col-md-6">
        <form-group :error="errors.has(ids.correo) && submitted">
          <input type="text" class="form__input"
                 v-model="cuenta.correo"
                 :id="ids.correo"
                 :name="ids.correo"
                 v-validate="'required|email'">
          <label :for="ids.correo" class="form__label">Correo de la cuenta</label>
        </form-group>
        <form-group :error="errors.has(ids.nombre) && submitted">
          <input type="text" class="form__input"
                 v-model="cuenta.nombre"
                 :id="ids.nombre"
                 :name="ids.nombre"
                 v-validate="'required'">
          <label :for="ids.nombre" class="form__label">Nombre de la cuenta</label>
        </form-group>
      </div>
      <div class="col-md-6">
        <form-group :error="errors.has(ids.cedula) && submitted">
          <input type="text" class="form__input"
                 v-model="cuenta.cedula"
                 :id="ids.cedula"
                 :name="ids.cedula">
          <label :for="ids.cedula" class="form__label">Cédula</label>
        </form-group>
        <form-group :error="errors.has(ids.direccion) && submitted">
          <textarea class="form__input"
                    v-model="cuenta.direccion"
                    :id="ids.direccion"
                    :name="ids.direccion"/>
          <label :for="ids.direccion" class="form__label">Dirección</label>
        </form-group>
        <button type="submit" class="no-display" id="prueba"/>
      </div>
    </form>
  </section>

</template>

<script>
import D from "debug";
import api from "../perfilApi.js";
import id from "../../ids.js";

const debug = D("ciris:DatosCuenta.vue");

export default {
  beforeRouteEnter,
  data,
  created,
  methods: {
    guardarCuenta,
  },
};

function data() {
  return {
    cuenta: {},
    ids: [],
  };
}

function guardarCuenta(cuenta) {
  debug("guardarCuenta");
  this.submitted = true;
  return this.$validator.validateAll().then((valido) => {
    if (valido) {
      return api.actualizarCuenta(cuenta)
        .then((resp) => {
          debug(resp);
          this.$toastr("success", "Se han guardado correctamente los datos de su cuenta");
          return resp;
        })
        .catch((err) => {
          debug(err);
          this.$toastr("error", "Ha ocurrido un error guardando los datos de su cuenta");
        });
    }
    return null;
  });
}

function beforeRouteEnter(to, from, next) {
  api.datosCuenta().then(resp => next((vm) => {
    debug("Datos cuenta obtenidos");
    vm.cuenta = resp;
  }))
    .catch((err) => {
      this.$toastr("error", err, "Error");
    });
}

function created() {
  this.ids = {
    correo: `correo-${id()}`,
    nombre: `nombre-${id()}`,
    cedula: `cedula-${id()}`,
    direccion: `direccion-${id()}`,
  };
}
</script>

<style lang="css">
</style>
