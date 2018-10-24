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
import noop from "lodash/noop";
import cloneDeep from "lodash/cloneDeep";
import swal from "sweetalert2";

export default {
  name: "TareaList",
  created() {
    return this.$store.dispatch(this.$actions.getTareasPopuladas);
  },
  computed: {
    tareas() {
      return this.$store.state.tarea.tareas;
    },
  },
  methods: {
    eliminar,
    abrir,
    abrirModal,
    aceptar,
  },
};

function abrirModal(tarea) {
  this.$store.commit(this.$actions.setTarea, tarea);
  return this.$store.commit(this.$actions.showModal, {
    componentName: "modalTarea",
    params: {
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
  return this.$store.dispatch(this.$actions.guardarTarea, {
    tarea, conservar: false, actualizarLista: true,
  });
}

function eliminar(tarea) {
  swal({
    title: "Confirmación",
    text: "¿Está seguro que desea eliminar este tarea?",
    type: "warning",
    showCancelButton: true,
  })
    .then((resp) => {
      if (resp && !resp.dismiss) {
        return this.$store.dispatch(this.$actions.deleteIDTarea, {
          tarea, delLocal: true, deLista: true,
        });
      }
      return noop;
    })
    .catch((err) => {
      this.$toastr("error", err, "Error");
    });
}
</script>
