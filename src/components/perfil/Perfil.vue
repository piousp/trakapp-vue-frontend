<template lang="html">
  <section>
    <div class="botones-pagina">
      <button class="boton boton--rosado" @click="logout">
        <i class="fal fa-sign-out"/>
        <span>Cerrar sesión</span>
      </button>
    </div>
    <h1 class="titulo">Perfil</h1>
    <div class="grid">
      <div class="col-6">
        <div class="panel fondo--blanco">
          <h3 class="h3">Datos básicos</h3>
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
      </div>
      <div class="col-6">
        <div class="panel fondo--blanco">
          <h3 class="h3">Cambiar mi contraseña</h3>
          <form novalidate @submit.stop.prevent="mostrarModalCambioClave(claveActual)">
            <form-group>
              <label for="" class="form__label">Contraseña actual</label>
              <input type="password" class="form__input" v-model="claveActual">
            </form-group>
            <button type="submit" class="boton boton--azul">
              <i class="fa far fa-key"/>
              <span>Nueva contraseña</span>
            </button>
          </form>
        </div>
      </div>
    </div>
    <modal :visible="modalclave">
      <div class="modal__body">
        <p class="h4">Digite una nueva contraseña</p>
        <form novalidate @submit.stop.prevent="cambiarContrasena(password)">
          <form-group :error="errors.has('password')">
            <label for="password" class="form__label">Contraseña:</label>
            <input type="text"
                   id="password"
                   name="password"
                   placeholder="**********"
                   class="form__input"
                   v-model="password"
                   v-validate="{rules: {is: password2, required: true}}">
          </form-group>
          <form-group :error="errors.has('password2')">
            <label for="password2" class="form__label">Confirme la contraseña:</label>
            <input type="text"
                   id="password2"
                   name="password2"
                   placeholder="**********"
                   class="form__input"
                   v-model="password2"
                   v-validate="{rules: {is: password, required: true}}">
          </form-group>
          <button type="submit" id="submit" name="button" style="display: none"/>
        </form>
      </div>
      <div class="modal__footer">
        <button type="button" class="boton boton--cancelar" @click="cerrarModal"/>
        <button type="button" class="boton boton--verde" @click="cambiarContrasena(password)">
          <i class="fa fal fa-lock-alt"/>
          <span>Cambiar contraseña</span>
        </button>
      </div>
    </modal>
  </section>
</template>

<script>
import cloneDeep from "lodash/cloneDeep";
import D from "debug";
import api from "./perfilApi.js";

const debug = D("ciris:Perfil.vue");

export default {
  beforeRouteEnter,
  data,
  methods: {
    logout,
    guardarUsuario,
    mostrarModalCambioClave,
    cerrarModal,
    cambiarContrasena,
  },
};

function data() {
  return {
    usuario: {},
    claveActual: "",
    modalclave: false,
    password: "",
    password2: "",
  };
}

function logout() {
  this.$auth.logout();
  this.$router.push("/login");
}

function cerrarModal() {
  this.modalclave = false;
}

function mostrarModalCambioClave(claveActual) {
  return api.verificarPasswordCorrecto(claveActual)
    .then((resp) => {
      debug(resp);
      this.modalclave = true;
      return null;
    })
    .catch((error) => {
      debug(error);
      this.$toastr("error", "La contraseña proporcionada no corresponde", "Error");
      return null;
    })
    .finally(() => {
      this.claveActual = "";
    });
}

function cambiarContrasena(pass) {
  debug("cambiarContrasena");
  return this.$validator.validateAll()
    .then((valido) => {
      if (valido) {
        return api.cambiarContrasena(pass)
          .then(() => {
            this.$toastr("success", "Se ha modificado su contraseña", "Contraseña Cambiada");
            this.modalclave = false;
            this.password = "";
            this.password2 = "";
            return null;
          })
          .catch((err) => {
            debug(err);
            this.$toastr("error", "Error al cambiar la contraseña", "Error");
          });
      }
      return null;
    });
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
          this.$toastr("error", "Error al guardar sus datos", "Error");
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
