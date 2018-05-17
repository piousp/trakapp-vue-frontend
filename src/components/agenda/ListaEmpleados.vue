<template>
  <section>
    <ul class="lista lista--clickeable">
      <li class="lista__item"
          @click="abrirEmpleado(emp)"
          v-for="emp in empleados"
          :key="emp._id">
        <i :style="{background:obtenerColor(emp._id).fondo}" class="colorEmpleado"/>
        <span class="text">{{ emp.nombre }} {{ emp.apellidos }}</span>
        <span class="badge badge--rosado" v-if="false">7</span>
      </li>
    </ul>
    <modal-empleado ref="modalempleado"/>
  </section>
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

<style lang="scss" scoped="true">
.colorEmpleado{
  display: inline-block;
  height: 10px;
  width: 10px;
}

.lista__item {
  position: relative;
}

.badge{
  position: absolute;
  right: .5em;
}
</style>
