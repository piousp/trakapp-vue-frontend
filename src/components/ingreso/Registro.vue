<template>
  <section class="cuadro-ingreso">
    <form class="cuadro-ingreso__body cuadro-ingreso__body--l"
          novalidate @submit.stop.prevent="registrarse()">
      <img src="/logo-peq-contra.png" class="img-center" alt="Trakapp Logo">
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
          <form-group>
            <div class="switch switch--indigo">
              <input type="checkbox" :id="ids.empresarial" :name="ids.empresarial"
                     v-model="usuario.empresarial">
              <label class="form__label text--grisc" :for="ids.empresarial">
                Estoy creando una cuenta empresarial
              </label>
            </div>
          </form-group>

        </div>
      </div>
      <div class="grid animated bounceIn" v-if="usuario.empresarial">
        <div class="col-sm-6 margin-top-none">
          <form-group :error="errors.has(ids.empresa) && submitted" class="margin-top-none">
            <input class="form__input form__input--blanco"
                   :id="ids.empresa"
                   :name="ids.empresa"
                   required
                   v-model="usuario.cuenta.nombre"
                   v-validate="'required'"
            >
            <label :for="ids.empresa" class="form__label">Empresa</label>
          </form-group>
          <form-group :error="errors.has(ids.cedula) && submitted">
            <input class="form__input form__input--blanco"
                   :id="ids.cedula"
                   :name="ids.cedula"
                   required
                   v-model="usuario.cuenta.cedula"
                   v-validate="'required'"
            >
            <label :for="ids.cedula" class="form__label">Cédula Jurídica</label>
          </form-group>
        </div>
        <div class="col-sm-6 margin-top-none">
          <form-group :error="errors.has(ids.correoEmpresa) && submitted" class="margin-top-none">
            <input class="form__input form__input--blanco"
                   :id="ids.correoEmpresa"
                   :name="ids.correoEmpresa"
                   required
                   v-model="usuario.cuenta.correo"
                   v-validate="'required'"
            >
            <label :for="ids.correoEmpresa" class="form__label">Correo Empresa</label>
          </form-group>
          <form-group :error="errors.has(ids.direccion) && submitted">
            <textarea class="form__input form__input--blanco"
                      :id="ids.direccion"
                      :name="ids.direccion"
                      v-model="usuario.cuenta.direccion"
            />
            <label :for="ids.direccion" class="form__label">Dirección</label>
          </form-group>
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
  beforeRouteEnter,
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
      if (this.idCuenta) {
        this.usuario.cuentas = [this.idCuenta];
      }
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
<style lang="scss" scoped="true" >
.margin-top-none {
  margin-top: 0;
  padding-top: 0;
}
</style>
<style src="./login.scss" lang="scss"/>
