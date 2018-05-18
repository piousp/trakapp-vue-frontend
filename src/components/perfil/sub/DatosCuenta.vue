<template lang="html">
  <section class="grid">
    <div class="col-md-6">
      <h4 class="h4">Datos de la cuenta</h4>
      <form novalidate @submit.stop.prevent="guardarCuenta(cuenta)">
        <form-group>
          <label for="" class="form__label">Correo</label>
          <input type="text" class="form__input" v-model="cuenta.correo">
        </form-group>
        <form-group>
          <label for="" class="form__label">Nombre</label>
          <input type="text" class="form__input" v-model="cuenta.nombre">
        </form-group>
        <form-group>
          <label for="" class="form__label">Cédula</label>
          <input type="text" class="form__input" v-model="cuenta.cedula">
        </form-group>
        <form-group>
          <label for="" class="form__label">Dirección</label>
          <textarea class="form__input" v-model="cuenta.direccion"/>
        </form-group>
        <button type="submit" class="no-display" id="prueba"/>
      </form>
    </div>
    <div class="col-md-6">
      <h4 class="h4">Preferencias</h4>
    </div>
    <div class="botones-pagina">
      <button type="button" class="boton boton--guardar"
              onclick="document.getElementById('prueba').click()"/>
    </div>
  </section>
</template>

<script>
import D from "debug";
import api from "../perfilApi.js";

const debug = D("ciris:DatosCuenta.vue");

export default {
  beforeRouteEnter,
  data,
  methods: {
    guardarCuenta,
  },
};

function data() {
  return {
    cuenta: {},
  };
}

function guardarCuenta() {

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
</script>

<style lang="css">
</style>
