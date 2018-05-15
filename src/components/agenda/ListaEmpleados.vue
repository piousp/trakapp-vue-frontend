<template>
  <div class="">
    <div class="boton boton--blanco boton--s"
         @click="$emit('abrir', emp)"
         v-for="emp in empleados" :key="emp._id">
      <i :style="{background:obtenerColor(emp._id).fondo}" class="colorEmpleado"/>
      <span class="text">{{ emp.nombre }}</span>
    </div>
  </div>
</template>

<script>
import empleadoApi from "../empleados/empleadoApi";
import obtenerColor from "./colores.js";

function mounted() {
  return empleadoApi.listar().then((empleados) => {
    this.empleados = empleados.docs;
    return null;
  });
}

export default {
  store: ["empleados"],
  mounted,
  methods: {
    obtenerColor,
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
