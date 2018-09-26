<template>
  <section>
    <h4 class="h4"><strong>Sub</strong>tareas</h4>
    <ul class="subtareas">
      <li class="subtareas__item" v-for="(item, i) in lista" :key="i">
        <div v-if="item.editando">
          <input class="form__input" v-model="subtareaEdit">
          <button
            type="button"
            class="boton boton--verde boton--xs"
            @click="guardar(item, subtareaEdit)">
            Guardar
          </button>
          <i class="cerrar" @click="item.editando = false">&times;</i>
        </div>
        <div class="checkbox" v-else>
          <input type="checkbox" :id="`checkSub${i}`">
          <label :for="`checkSub${i}`">{{ item.texto }}</label>
          <div class="subtareas__item__acciones">
            <i class="fa fa-fw fa-edit" @click="editar(item)"/>
            <i class="fa fa-fw fa-trash" @click="eliminar(i)"/>
          </div>
        </div>
      </li>
      <li v-if="!lista.length">
        <span class="text--center">No hay subtareas</span>
      </li>
    </ul>
    <br>
    <div>
      <input
        class="form__input"
        v-model="subtareaNva"
        placeholder="Agregar subtarea"
        @keyup.enter="agregar(subtareaNva)">
      <button
        style="margin-top: 5px;"
        class="boton boton--xs"
        type="button"
        @click="agregar(subtareaNva)">+ Agregar</button>
    </div>
  </section>
</template>

<script>
import noop from "lodash/noop";

function data() {
  return {
    subtareaNva: null,
    subtareaEdit: null,
  };
}

function editar(item) {
  item.editando = true;
  this.subtareaEdit = item.texto;
}

function guardar(item, valorNvo) {
  item.editando = false;
  item.texto = valorNvo;
}

function agregar(str) {
  this.lista.push({
    texto: str,
    completado: false,
    editando: false,
  });
  this.subtareaNva = null;
}

function eliminar(index) {
  this.lista.splice(index, 1);
}

export default {
  props: {
    lista: {
      type: Array,
      default: noop,
    },
  },
  data,
  methods: {
    editar,
    guardar,
    eliminar,
    agregar,
  },
};
</script>

<style lang="scss">
.subtareas {
  list-style: none;
  i {
    cursor: pointer;
  }
}
.subtareas__item {
  .subtareas__item__acciones {
    visibility: hidden;
    float: right;
  }
  .checkbox {
    padding: .2em 0 .6em 0;
    &:hover {
      background: #eeeeee;
      .subtareas__item__acciones {
        visibility: visible;
      }
    }
  }
}
.cerrar {
  font-style: normal;
  font-size: 20px;
  font-weight: bold;
}
</style>
