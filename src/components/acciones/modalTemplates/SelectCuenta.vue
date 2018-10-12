<template>
  <section>
    <div v-if="cargando" class="text--center">
      <i class="fa fa-spinner fa-spin fa-3x fa-fw"/>
      <span class="sr-only">Cargando...</span>
    </div>
    <div v-else>
      <div class="modal__header text--center">
        <div class="modal__header__titulo">Escoja una cuenta</div>
      </div>
      <div class="modal__body">
        <div class="cuentaContainer">
          <div class="cuenta" v-for="cuenta in cuentas.docs" :key="cuenta._id"
               @click="cargarCuenta(cuenta)">
            <avatar :username="cuenta.nombre" :src="cuenta.avatar" :rounded="true"/>
            <p class="cuenta--nombre">{{ cuenta.nombre }}</p>
          </div>
        </div>
      </div>
      <div class="modal__footer">
        <div class="checkbox checkbox--azul text--right">
          <input type="checkbox" id="checkboxazul" :checked="recordarme" v-model="recordarme">
          <label class="form__label" for="checkboxazul">Recordar selección</label>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import Avatar from "vue-avatar";
import D from "debug";

const debug = D("ciris:SelectCuenta.vue");

export default {
  name: "ModalSelectCuenta",
  components: {
    Avatar,
  },
  data,
  created,
  computed: {
    empleados() {
      return this.$store.state.storeEmpleado.empleados;
    },
    usuario() {
      return this.$store.state.storeUsuario.usuarioActivo;
    },
    cuentas() {
      return this.$store.state.storeCuenta.cuentas;
    },
  },
  methods: {
    hideModal() { return this.$store.commit("storeModal/hideModal"); },
    cargarCuenta(cuenta) {
      this.$store.dispatch("storeCuenta/getID", { id: cuenta._id, conservarComoActivo: true, recordarCuenta: this.recordarme });
      return this.hideModal();
    },
  },
};

function data() {
  return {
    cargando: false,
    recordarme: false,
  };
}

function created() {
  this.cargando = true;
  this.$store.dispatch("storeCuenta/cargarBulk", { cuentas: this.usuario.cuentas })
    .then((resp) => {
      this.cargando = false;
      return resp;
    })
    .catch(err => debug(err));
}
</script>
<style>
.cuentaContainer {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-around;
  align-items: center;
  align-content: center;
  min-width: 110px;
}

.cuenta {
  height: 100px;
  width: 100px;
  background-color: white;
  border: 1px solid lightgray;
  border-radius: 5px;
  margin: 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  align-content: center;
  cursor: pointer;
}
</style>
