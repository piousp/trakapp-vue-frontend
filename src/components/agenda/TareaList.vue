<template>
  <section>
    <div class="botones-pagina">
      <button class="boton boton--nuevo" @click="abrirModal"/>
    </div>
    <div v-if="tareas.cant > 0">
      <table class="tabla tabla--responsive">
        <thead class="tabla__header">
          <tr>
            <th>Título</th>
            <th>Fecha inicio</th>
            <th>Fecha fin</th>
            <th>Cliente</th>
            <th>Asignado a</th>
            <th>Finalizada</th>
            <th/>
          </tr>
        </thead>
        <tbody class="tabla__body tabla__body--clickable tabla__body--striped">
          <tr v-for="tarea in tareas.docs" :key="tarea._id">
            <td @click="abrir(tarea)">{{ tarea.title }}</td>
            <td @click="abrir(tarea)">{{ tarea.start | fecha('DD/MM/YYYY hh:mm a') }}</td>
            <td @click="abrir(tarea)">{{ tarea.end | fecha('DD/MM/YYYY hh:mm a') }}</td>
            <td @click="abrir(tarea)">
              <span v-if="tarea.cliente">
                {{ tarea.cliente.nombre }} {{ tarea.cliente.apellidos }}
              </span>
              <span v-else>N/A</span>
            </td>
            <td @click="abrir(tarea)">
              {{ tarea.empleado.nombre }} {{ tarea.empleado.apellidos }}
            </td>
            <td @click="abrir(tarea)">
              <i class="fa fa-fw fa-times text--rojo" v-if="tarea.activa"/>
              <i class="fa fa-fw fa-check text--verde" v-else/>
            </td>
            <td/>
            <td>
              <ul class="tabla__opciones">
                <li class="tabla__opciones__elem" tooltip="Editar" @click="abrir(tarea)">
                  <i class="text--cyan fa fa-fw fa-edit"/>
                </li>
                <li class="tabla__opciones__elem" tooltip="Eliminar" @click="eliminar(tarea)">
                  <i class="text--tomate fa fa-fw fa-trash"/>
                </li>
              </ul>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div v-else>
      <p class="no-results text--center">
        <i class="fa fa-fw fa-list"/>
        <span>No hay tareas registradas.</span>
      </p>
    </div>
  </section>
</template>
<script>//
import reject from "lodash/reject";
import noop from "lodash/noop";
import cloneDeep from "lodash/cloneDeep";
import findIndex from "lodash/findIndex";
import swal from "sweetalert2";
import agendaApi from "./agendaApi.js";

export default {
  name: "TareaList",
  data,
  methods: {
    eliminar,
    abrir,
    abrirModal,
    aceptar,
  },
  beforeRouteEnter,
};

function data() {
  return {
    tareas: [],
  };
}

function abrirModal(tarea) {
  return this.$store.commit("modal/showModal", {
    componentName: "ModalTarea",
    params: {
      evt: tarea,
      aceptar: this.aceptar,
      eliminar: this.eliminar,
      grande: true,
    },
  });
}

function abrir(tarea) {
  const copy = cloneDeep(tarea);
  copy.empleado = tarea.empleado._id;
  return this.abrirModal(copy);
}

function aceptar(tarea) {
  return agendaApi.guardar(tarea).then((resp) => {
    const index = findIndex(this.tareas.docs, { _id: resp._id });
    resp.empleado = tarea.empleado;
    resp.cliente = tarea.cliente;
    this.tareas.docs.splice(index, 1, resp);
    return resp;
  });
}

function eliminar(tarea) {
  swal({
    title: "Confirmación",
    text: "¿Está seguro que desea eliminar este tarea?",
    type: "warning",
    showCancelButton: true,
  }).then((resp) => {
    if (resp && !resp.dismiss) {
      return agendaApi
        .eliminar(tarea._id)
        .then(() => {
          this.$toastr("success", "La tarea ha sido eliminado", "Éxito");
          this.tareas.docs = reject(this.tareas.docs, ["_id", tarea._id]);
          this.tareas.cant -= 1;
          return this.tareas;
        })
        .catch((err) => {
          this.$toastr("error", err, "Error");
        });
    }
    return noop;
  })
    .catch((err) => {
      this.$toastr("error", err, "Error");
    });
}

function beforeRouteEnter(to, from, next) {
  return agendaApi.getTareas(0, 10)
    .then(resp => next((vm) => {
      vm.tareas = resp;
    }))
    .catch((err) => {
      this.$toastr("error", err, "Error");
    });
}
</script>
