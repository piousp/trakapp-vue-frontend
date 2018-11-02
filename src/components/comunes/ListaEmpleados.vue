<template>
  <section id="chat-empleados">
    <h1 class="h4 text--negro4 text--center">Chat empleados</h1>
    <ul class="lista-empleados">
      <li class="lista-empleados__item">
        <input
        type="text"
        class="form__input"
        placeholder="Buscar más..."
        v-model="buscador"
        @input="buscarEmpleados(buscador)">
      </li>
      <li class="text--center text--grisa text--small" v-show="!empleados.docs.length">
        Sin resultados.
      </li>
      <li class="lista-empleados__item"
          @click="abrirEmpleado(emp)"
          v-for="emp in empleados.docs"
          :key="emp._id">
        <i :style="{background:obtenerColor(emp._id).fondo}" class="colorEmpleado"/>
        <span class="text">{{ emp.nombre }} {{ emp.apellidos }}</span>
        <span class="badge badge--rosado" v-if="emp.cantMensajesNoVistos > 0">
          {{ emp.cantMensajesNoVistos }}
        </span>
      </li>
    </ul>
  </section>
</template>

<script>
import cloneDeep from "lodash/cloneDeep";
import debounce from "lodash/debounce";
import obtenerColor from "./colores.js";

export default {
  name: "ListaEmpleados",
  data() {
    return {
      buscador: null,
    };
  },
  computed: {
    empleados() {
      return this.$store.state.empleado.empleadosCMensajes;
    },
  },
  methods: {
    obtenerColor,
    abrirEmpleado,
    setIndicadorMensajes,
    buscarEmpleados: debounce(buscarEmpleadosChat, 500),
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

function abrirEmpleado(emp) {
  if (emp.cantMensajesNoVistos > 0) {
    this.$store.dispatch(this.$actions.marcarMensajesComoVistos, { emisor: emp._id });
    this.setIndicadorMensajes(emp._id, 0);
  }
  this.$store.commit(this.$actions.setEmpleado, emp);
  return this.$store.commit(this.$actions.showModal, {
    componentName: "modalEmpleado",
    params: {
      grande: true,
    },
  });
}

function setIndicadorMensajes(id, val) {
  const emisor = cloneDeep(this.empleados.docs.find(e => e._id === id));
  emisor.cantMensajesNoVistos = val ? emisor.cantMensajesNoVistos + val : val;
  this.$store.commit(this.$actions.modificarEmpleado, emisor);
}

function buscarEmpleadosChat(param) {
  if (param) {
    return this.$store.dispatch(this.$actions.buscarEmpleadosChat, param);
  }
  return this.$store.dispatch(this.$actions.cargarEmpleadosCMsjs, { pagina: 0, cantidad: 10 });
}
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
