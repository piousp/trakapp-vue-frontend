<template>
  <section id="chat-empleados">
    <h1 class="h5 text--blanco text--center">Chat empleados</h1>
    <ul class="lista-empleados">
      <li class="text--center text--grisa text--small" v-show="!empleados.length">
        No hay empleados.
      </li>
      <li class="lista-empleados__item"
          @click="abrirEmpleado(emp)"
          v-for="emp in empleados"
          :key="emp._id">
        <i :style="{background:obtenerColor(emp._id).fondo}" class="colorEmpleado"/>
        <span class="text">{{ emp.nombre }} {{ emp.apellidos }}</span>
        <span class="badge badge--rosado" v-if="emp.cantMensajesNoVistos > 0">
          {{ emp.cantMensajesNoVistos }}
        </span>
      </li>
    </ul>
    <modal-empleado ref="modalempleado"/>
  </section>
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

<style lang="scss" scoped="true">
@import "../../sass/tema/globales";
@import "../../sass/base/colores";
@import "../../sass/tema/colores";
@import "../../sass/base/fondos";
@import "../../sass/base/helpers";
@import "../../sass/base/tipografia";
.lista-empleados{
  @extend %sans;
  outline:none;
  list-style: none;
}

.lista-empleados__item{
  @extend .text--blanco;
  box-shadow: inset 0 -1px 0 $negro2;
  display: block;
  text-align: justify;
  line-height: 35px;
  padding: 0 1em;
  cursor: pointer;
  position: relative;
  transition: all ease .5s;

  &:hover{
    @extend .text--negro4;
    background: $cyan-tema;
  }

}

.colorEmpleado{
  display: inline-block;
  height: 10px;
  width: 10px;
}

.badge{
  position: absolute;
  right: .5em;
  top: 8px;
}
</style>
