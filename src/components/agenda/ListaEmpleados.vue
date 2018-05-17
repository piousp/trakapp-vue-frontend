<template>
  <div class="modal-empleado">
    <div class="boton boton--blanco boton--s"
         @click="abrirEmpleado(emp)"
         v-for="emp in empleados" :key="emp._id">
      <i :style="{background:obtenerColor(emp._id).fondo}" class="colorEmpleado"/>
      <span class="text">{{ emp.nombre }}</span>
      <span v-show="emp.cantMensajesNoVistos > 0" class="indicadorMensajes">
        {{ emp.cantMensajesNoVistos }}
      </span>
    </div>
    <modal-empleado ref="modalempleado"/>
  </div>
</template>

<script>
import ModalEmpleado from "./ModalEmpleado.vue";
import empleadoApi from "../empleados/empleadoApi";
import obtenerColor from "./colores.js";
import chatApi from "../chat/chatApi";

function mounted() {
  return empleadoApi.listarConMensajes().then((empleados) => {
    this.empleados = empleados.docs;
    return null;
  });
}

function abrirEmpleado(emp) {
  this.empleado = emp;
  if (emp.cantMensajesNoVistos > 0) {
    chatApi.marcarComoVistos(emp._id);
    this.setIndicadorMensajes(emp._id, 0);
  }
  this.$refs.modalempleado.abrirModal();
}

function setIndicadorMensajes(id, val) {
  const emisor = this.empleados.find(e => e._id === id);
  emisor.cantMensajesNoVistos = val ? emisor.cantMensajesNoVistos + val : val;
}

export default {
  components: {
    "modal-empleado": ModalEmpleado,
  },
  store: ["empleados", "empleado"],
  mounted,
  methods: {
    obtenerColor,
    abrirEmpleado,
    setIndicadorMensajes,
  },
  sockets: {
    recibirMensaje(msj) {
      if (!this.$refs.modalempleado.modalVisible) {
        this.setIndicadorMensajes(msj.emisor._id, 1);
      }
      return msj;
    },
  },
};
</script>

<style lang="scss">
@import "../../sass/base/colores";
.colorEmpleado{
  display: inline-block;
  height: 10px;
  width: 10px;
}
.indicadorMensajes {
  float: right;
  background: $rojo;
  color: $blanco;
  border-radius: 40%;
  padding: .2em .5em;
  font-weight: bold;
  position: relative;
  bottom: 2px;
}
</style>
