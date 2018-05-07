<template lang="html">
  <section>
    <h1 class="titulo">Configuración y Perfil</h1>
    <div class="grid">
      <div class="col-6">
        <h2 class="subtitulo">Datos de usuario</h2>
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
      </div>

      <div class="col-6">
        <h2 class="subtitulo">Datos de la cuenta</h2>
        <code>{{ cuenta }}</code>
        <form novalidate @submit.stop.prevent="guardarCuenta(cuenta)">
          <form-group>
            <label for="" class="form__label">Correo</label>
            <p class="form__input">{{ cuenta.correo }}</p>
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
          <button type="submit" class="boton boton--guardar"/>
        </form>
      </div>
    </div>
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
    guardarCuenta,
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

function guardarCuenta(usuario) {
  this.submitted = true;
  return this.$validator.validateAll().then((valido) => {
    if (valido) {
      api.actualizarCuenta(usuario)
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
  const promesas = [api.datosUsuario(), api.datosCuenta()];
  Promise.all(promesas).then(resp => next((vm) => {
    [vm.usuario, vm.cuenta] = resp;
    vm.copiaUsuario = cloneDeep(vm.usuario);
    vm.copiaCuenta = cloneDeep(vm.cuenta);
    vm.editando = to.params.edit;
  }))
    .catch((err) => {
      this.$toastr("error", err, "Error");
    });
}
</script>

<style lang="scss">
</style>
