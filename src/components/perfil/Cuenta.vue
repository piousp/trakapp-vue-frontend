1111<template lang="html">
  <section>
    <h2 class="h3"><strong class="text--bold">Admi</strong>nistración de la cuenta</h2>
    <div class="botones-pagina">
      <button type="button" class="boton boton--guardar"
              onclick="document.getElementById('prueba').click()"/>
      <button class="boton boton--indigo" v-if="!cuenta.empresarial" @click="migrarEmpresarial">
        <i class="fal fa-building"/>
        <span>Migrar a cuenta empresarial</span>
      </button>
      <button class="boton boton--indigo" v-if="cuenta.empresarial"
              @click="$store.commit($actions.showModal, {
                componentName:'invitarUsuarios'
              })">
        <i class="fal fa-envelope"/>
        <span>Invitar usuarios</span>
      </button>
      <button class="boton boton--morado" v-if="cuentas.length > 1"
        @click="$store.commit($actions.showModal, {
          componentName:'selectCuenta'
        })">
        <i class="fal fa-exchange"/>
        <span>Cambiar de cuenta</span>
      </button>
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
        <div class="col-md-6">
          <h3 class="h4">Tipo de cuenta</h3>
          <p class="text text--indigo text--l text--bold">
            {{ cuenta.empresarial ? "Empresarial" : "Personal" }}
          </p>
        </div>
        <button type="submit" class="no-display" id="prueba"/>
      </div>
    </form>
  </section>
</template>

<script>
import D from "debug";
import swal from "sweetalert2";
import cloneDeep from "lodash/cloneDeep";
import id from "../ids";

const debug = D("ciris:DatosCuenta.vue");

export default {
  name: "Cuenta",
  data,
  computed: {
    sCuenta() {
      return this.$store.state.cuenta.cuentaActiva;
    },
    cuentas() {
      return this.$store.state.usuario.usuarioActivo.cuentas;
    },
  },
  watch: {
    sCuenta: {
      handler(newVal) {
        this.cuenta = cloneDeep(newVal);
      },
      immediate: true,
      deep: true,
    },
  },
  created,
  methods: {
    guardarCuenta,
    migrarEmpresarial,
  },
};

function data() {
  return {
    cuenta: {},
    ids: [],
    submitted: false,
  };
}

function guardarCuenta(cuenta) {
  debug("guardarCuenta");
  this.submitted = true;
  return this.$validator.validateAll().then((valido) => {
    if (valido) {
      return this.$store.dispatch(this.$actions.guardarCuenta, {
        cuenta, conservar: true, conservarComoActivo: true,
      })
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

function created() {
  this.ids = {
    correo: `correo-${id()}`,
    nombre: `nombre-${id()}`,
    cedula: `cedula-${id()}`,
    direccion: `direccion-${id()}`,
  };
}

function migrarEmpresarial() {
  return swal({
    title: "Migrar a cuenta empresarial",
    text: "¿Está seguro que desea migrar a una cuenta empresarial? Esta acción es irreversible.",
    type: "question",
    showCancelButton: true,
  }).then((swalRes) => {
    if (swalRes.value) {
      this.$store.dispatch(this.$actions.migrarEmpresarial, {
        cuenta: this.cuenta, conservar: true, conservarComoActivo: true,
      })
        .then((resp) => {
          debug(resp);
          this.$toastr("success", "Se ha migrado su cuenta a una cuenta empresarial", "Éxito");
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
</script>

<style lang="scss">
</style>
