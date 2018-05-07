<template lang="html">
  <section>
    <h1 class="titulo">Perfil</h1>
    <form novalidate @submit.stop.prevent="guardarUsuario(usuario)">
      <form-group>
        <label for="" class="form__label">Correo</label>
        <p class="form__input">{{ usuario.correo }}</p>
      </form-group>
      <form-group>
        <label for="" class="form__label">Nombre</label>
        <input type="text" class="form__input" v-model="usuario.nombre">
      </form-group>
      <form-group>
        <label for="" class="form__label">Apellidos</label>
        <input type="text" class="form__input" v-model="usuario.apellidos">
      </form-group>
      <button type="submit" class="boton boton--guardar"/>
    </form>
  </section>
</template>

<script>
import cloneDeep from "lodash/cloneDeep";
import D from "debug";
import api from "./perfilApi.js";

const debug = D("ciris:Configuracion.vue");

export default {
  beforeRouteEnter,
  data,
  methods: {
    guardarUsuario,
  },
};

function data() {
  return {
    usuario: {},
    cuenta: {},
  };
}

function guardarUsuario(usuario) {
  this.submitted = true;
  return this.$validator.validateAll().then((valido) => {
    if (valido) {
      api.actualizarUsuario(usuario)
        .then((resp) => {
          debug(resp);
          this.$toastr("success", this.$t("login.success"), `${resp.usuario.nombre}`);
          return resp;
        })
        .catch((err) => {
          debug(err);
          this.$toastr("error", "Error al crear la cuenta", "Error");
        });
    }
    return null;
  });
}

function beforeRouteEnter(to, from, next) {
  api.datosUsuario().then(resp => next((vm) => {
    vm.usuario = resp;
    vm.copiaUsuario = cloneDeep(vm.usuario);
    vm.editando = to.params.edit;
  }))
    .catch((err) => {
      this.$toastr("error", err, "Error");
    });
}
</script>

<style lang="scss">
</style>
