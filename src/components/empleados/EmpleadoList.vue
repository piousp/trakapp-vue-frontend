<template>
  <section id="seccion-empleados">
    <div class="botones-pagina">
      <router-link tag="button"
                   class="boton boton--nuevo"
                   :to="{name: 'empleadoform'}"/>
    </div>
    <div v-if="empleados.docs.length > 0">
      <table class="tabla tabla--responsive">
        <thead class="tabla__header">
          <tr>
            <th>Nombre</th>
            <th>Apellidos</th>
            <th>Correo</th>
            <th/>
          </tr>
        </thead>
        <tbody class="tabla__body tabla__body--clickable tabla__body--striped">
          <tr v-for="empleado in empleados.docs" :key="empleado._id">
            <router-link tag="td"
                         :to="{name: 'empleadoform', params: {id: empleado._id}}">
              {{ empleado.nombre }}
            </router-link>
            <router-link tag="td"
                         :to="{name: 'empleadoform', params: {id: empleado._id}}">
              {{ empleado.apellidos }}
            </router-link>
            <router-link tag="td"
                         :to="{name: 'empleadoform', params: {id: empleado._id}}">
              {{ empleado.correo }}
              <span class="badge badge--verde" v-show="!empleado.ubicacion">Nuevo</span>
            </router-link>
            <td>
              <ul class="tabla__opciones">
                <router-link tag="li"
                             class="tabla__opciones__elem"
                             tooltip="Editar"
                             :to="{name: 'empleadoform', params: {id: empleado._id, edit: true}}">
                  <i class="text--cyan fa fa-fw fa-edit"/>
                </router-link>
                <li class="tabla__opciones__elem" tooltip="Eliminar" @click="eliminar(empleado)">
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
        <span>No hay empleados registrados.</span>
      </p>
    </div>
  </section>
</template>
<script>//
import noop from "lodash/noop";
import swal from "sweetalert2";

export default {
  computed: {
    empleados() {
      return this.$store.state.empleados.listado;
    },
  },
  methods: {
    eliminar,
  },
};

function eliminar(empleado) {
  swal({
    title: "Confirmación",
    text: "¿Está seguro que desea eliminar este empleado?",
    type: "warning",
    showCancelButton: true,
  }).then((resp) => {
    if (resp && !resp.dismiss) {
      return this.$store.dispatch("empleados/eliminarEmpleado", empleado)
        .then(() => this.$toastr("success", "El empleado ha sido eliminado", "Éxito"))
        .catch(err => this.$toastr("error", err, "Error"));
    }
    return noop;
  }).catch(err => this.$toastr("error", err, "Error"));
}
</script>
