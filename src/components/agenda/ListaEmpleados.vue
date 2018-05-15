<template>
  <div class="modal-empleado">
    <div class="boton boton--blanco boton--s"
         @click="abrirEmpleado(emp)"
         v-for="emp in empleados" :key="emp._id">
      <i :style="{background:obtenerColor(emp._id).fondo}" class="colorEmpleado"/>
      <span class="text">{{ emp.nombre }}</span>
    </div>
    <modal-empleado ref="modalempleado"/>
  </div>
</template>

<script>
import ModalEmpleado from "./ModalEmpleado.vue";
import empleadoApi from "../empleados/empleadoApi";
import obtenerColor from "./colores.js";

function mounted() {
  return empleadoApi.listar().then((empleados) => {
    this.empleados = empleados.docs;
    return null;
  });
}

function abrirEmpleado(emp) {
  this.empleado = emp;
  this.$refs.modalempleado.abrirModal();
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
  },
};
</script>

<style lang="scss">
.colorEmpleado{
  display: inline-block;
  height: 10px;
  width: 10px;
}
</style>
