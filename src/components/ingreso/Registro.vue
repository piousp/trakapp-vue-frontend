<template>
  <section class="cuadro-ingreso">
    <form class="cuadro-ingreso__body cuadro-ingreso__body--l"
          novalidate @submit.stop.prevent="registrarse()">
      <img src="/static/logo-peq-contra.png" class="img-center" alt="Trakapp Logo">
      <div class="text--center"/>
      <p class="text text--center text--blanco">
        Por favor rellene los campos con los datos solicitados
      </p>
      <div class="grid">
        <div class="col-sm-6">
          <form-group :error="errors.has(ids.nombre) && submitted">
            <input class="form__input form__input--blanco"
                   :id="ids.nombre"
                   :name="ids.nombre"
                   required
                   v-model="usuario.nombre"
                   v-validate="'required'"
            >
            <label :for="ids.nombre" class="form__label">Nombre</label>
          </form-group>
          <form-group :error="errors.has(ids.apellidos) && submitted">
            <input class="form__input form__input--blanco"
                   :id="ids.apellidos"
                   :name="ids.apellidos"
                   value=""
                   required
                   v-model="usuario.apellidos"
                   v-validate="'required'"
            >
            <label :for="ids.apellidos" class="form__label">Apellidos</label>
          </form-group>
          <form-group :error="errors.has(ids.correo) && submitted">
            <input
              class="form__input form__input--blanco"
              :id="ids.correo"
              :name="ids.correo"
              type="email"
              required
              v-model="usuario.correo"
              v-validate="'required|email'"
            >
            <label :for="ids.correo" class="form__label">Correo</label>
          </form-group>
        </div>
        <div class="col-sm-6">
          <password class="text--blanco"
                    @password="usuario.password = $event"
                    :submitted="submitted"/>
        </div>
      </div>
      <div class="text--center">
        <button class="boton boton--celeste-tema boton--xl" type="submit">
          <i class="fas fa-fw fa-building"/>
          ¡Registrarse!
        </button>
      </div>
    </form>
    <p class="text text--blanco">
      ¿Ya tiene cuenta? <router-link class="text--cyan"
                                      to="login">Ingrese aquí</router-link>
    </p>
  </section>
</template>

<script>
import D from "debug";
import noop from "lodash/noop";

const debug = D("ciris:Registro.vue");

export default {
  data,
  created,
  methods: {
    registrarse,
  },
};

function data() {
  return {
    ids: {},
    usuario: {
      nombre: "",
      apellidos: "",
      correo: "",
      password: "",
      empresarial: false,
      cuenta: {},
    },
    submitted: false,
  };
}

function created() {
  this.ids = {
    nombre: `nombre-${id()}`,
    apellidos: `apellidos-${id()}`,
    correo: `correo-${id()}`,
    empresarial: `empresarial-${id()}`,
    empresa: `empresa-${id()}`,
    correoEmpresa: `correoEmpresa-${id()}`,
    direccion: `direccion-${id()}`,
    cedula: `cedula-${id()}`,
  };
}

function registrarse() {
  this.submitted = true;
  return this.$validator.validateAll().then((valido) => {
    if (valido) {
      this.$auth.registro(this.usuario)
        .then((resp) => {
          debug(resp);
          this.$toastr(
            "success",
            "Se le ha enviado un correo de verificación para activar su cuenta.",
            "Cuenta creada",
          );
          this.$router.push({ name: "login" });
          return resp;
        })
        .catch((err) => {
          debug(err);
          if (err.response.status === 409) {
            this.$toastr("info", "El usuario ya existe", "Error");
          } else {
            this.$toastr("error", "Error al crear la cuenta", "Error");
          }
        });
    }
    return noop;
  });
}

function id() {
  return Math.random().toString(36).substr(2, 9);
}
</script>

<style src="./login.scss" lang="scss"/>
