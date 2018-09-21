<template>
  <section class="cuadro-ingreso">
    <form class="cuadro-ingreso__body" novalidate @submit.stop.prevent="login()">
      <div class="text--center">
        <img src="/logo-peq-contra.png" class="logo-login img--center" alt="Trakapp Logo">
      </div>
      <h1 class="h4 text--blanco text--center">Ingrese sus credenciales</h1>
      <form-group :error="errors.has(ids.correo) && submitted">
        <input type="text"
               autofocus
               :id="ids.correo"
               :name="ids.correo"
               class="form__input form__input--blanco"
               v-model="usuario"
               required
               v-validate="'required|email'"
               @input="usuario = usuario.toLowerCase()">
        <label :for="ids.correo" class="form__label form__input--blanco">Correo</label>
      </form-group>
      <form-group :error="errors.has(ids.password) && submitted">
        <input type="password"
               :id="ids.password"
               :name="ids.password"
               class="form__input form__input--blanco"
               v-model="password"
               required
               v-validate="'required'">
        <label :for="ids.password" class="form__label form__input--blanco">Contraseña</label>
      </form-group>
      <div>
        <span class="text text--blanco text--registro text--small">
          ¿Olvidó su contraseña? <a @click="() => {modalVisible = !modalVisible}"
                                    class="text--cyan clickable">Recupérela aquí</a>
        </span>
      </div>
      <br>
      <div class="text--center">
        <button class="boton boton--celeste-tema boton--l" type="submit">
          <i class="fa fa-fw fa-sign-in"/>
          Iniciar sesión
        </button>
      </div>
    </form>
    <p class="text text--right text--blanco text--registro">
      ¿No tiene cuenta?
      <router-link :to="{
                     name: idCuenta ? 'invitacionRegistro' : 'registro',
                     params: idCuenta ? {idCuenta} : {}
                   }"
                   params="class=&quot;text--cyan&quot;">¡Regístrese ahora!</router-link>
    </p>
    <modal :visible="modalVisible">
      <form novalidate @submit.stop.prevent="recuperar()">
        <div class="modal__header text--center">
          <div class="modal__header__titulo">
            Recuperar contraseña
          </div>
        </div>
        <div class="modal__body">
          <form-group class="modal__form" :error="errors.has(ids.modalCorreo) && modalSubmitted">
            <input type="text"
                   :id="ids.modalCorreo"
                   :name="ids.modalCorreo"
                   class="form__input form__input--blanco"
                   v-model="modalCorreo"
                   required
                   v-validate="'required|email'">
            <label :for="ids.modalCorreo" class="form__label">
              Ingrese el correo electrónico al que está asociado su cuenta
            </label>
            <span class="text text--rojo text--small modal__form__error"
                  v-show="errors.has(ids.modalCorreo) && modalSubmitted">
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
    </modal>
  </section>
</template>

<script>
import D from "debug";
import noop from "lodash/noop";
import cloneDeep from "lodash/cloneDeep";
import find from "lodash/find";
import usuarioAPI from "../perfil/perfilApi";
import id from "../ids.js";

const debug = D("ciris:Login.vue");
export default {
  data,
  created,
  methods: {
    login,
    recuperar,
    cerrarModal,
  },
  beforeRouteEnter,
};

function data() {
  return {
    ids: {},
    usuario: "",
    password: "",
    recordar: true,
    submitted: false,
    modalSubmitted: false,
    modalVisible: false,
    modalCorreo: "",
    idCuenta: null,
  };
}

function beforeRouteEnter(to, from, next) {
  if (to.params.id) {
    next((vm) => {
      vm.idCuenta = to.params.id;
    });
  }
  return next();
}

function created() {
  this.ids = {
    correo: `correo-${id()}`,
    password: `password-${id()}`,
    modalCorreo: `modalCorreo-${id()}`,
  };
}

function login() {
  const comp = this;
  this.submitted = true;
  return this.$validator.validateAll().then((valido) => {
    if (valido) {
      return this.$auth.login(this.usuario, this.password, this.recordar)
        .then((resp) => {
          function redirijir() {
            debug(resp);
            comp.$router.push({ name: "agenda" });
            comp.$toastr("success", this.$t("login.success"), `${resp.usuario.nombre}`);
            return resp;
          }
          if (this.idCuenta && !find(this.usuario.cuentas, n => n === this.idCuenta)) {
            const usuario = cloneDeep(resp.usuario);
            usuario.cuentas.push(this.idCuenta);
            return usuarioAPI.actualizarUsuario(usuario)
              .then(() => {
                this.$toastr("success", this.$t("invitation.success"), "Éxito");
                return redirijir();
              })
              .catch((err) => {
                debug(err);
                return this.$toastr("error", this.$t("invitation.error"), "Error");
              });
          } else if (find(this.usuario.cuentas, n => n === this.idCuenta)) {
            this.$toastr("error", this.$t("invitation.alreadyBelongs"), "Error");
          }
          return redirijir();
        })
        .catch((err) => {
          debug(err);
          if (err.response.status < 500) {
            this.$toastr("info", this.$t("login.credencialesInvalidos.msj"), this.$t("login.credencialesInvalidos.titulo"));
          } else {
            this.$toastr("error", this.$t("login.error"), "Error");
          }
        });
    }
    return noop;
  });
}

function recuperar() {
  this.modalSubmitted = true;
  return this.$validator.validateAll().then((valido) => {
    if (valido) {
      return this.$auth.solicitarCambio(this.modalCorreo)
        .then((resp) => {
          this.modalVisible = !this.modalVisible;
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

function cerrarModal() {
  this.modalVisible = !this.modalVisible;
  this.modalCorreo = "";
  this.modalSubmitted = false;
}
</script>

<style src="./login.scss" lang="scss"/>
