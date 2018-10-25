<template>
  <section id="seccion-empleados">
    <div class="botones-pagina">
      <router-link tag="button"
                   class="boton boton--nuevo"
                   :to="{name: 'empleadoform', params: { edit: true }}"/>
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
            <td @click="irAEmpleado(empleado, false)">
              {{ empleado.nombre }}
            </td>
            <td @click="irAEmpleado(empleado, false)">
              {{ empleado.apellidos }}
            </td>
            <td @click="irAEmpleado(empleado, false)">
              {{ empleado.correo }}
              <span class="badge badge--verde" v-show="!empleado.ubicacion">Nuevo</span>
            </td>
            <td>
              <ul class="tabla__opciones">
                <li @click="irAEmpleado(empleado, true)"
                    class="tabla__opciones__elem"
                    tooltip="Editar">
                  <i class="text--cyan fa fa-fw fa-edit"/>
                </li>
                <li class="tabla__opciones__elem" tooltip="Eliminar" @click="eliminar(empleado)">
                  <i class="text--tomate fa fa-fw fa-trash"/>
                </li>
              </ul>
            </td>
          </tr>
        </tbody>
      </table>
      <pagination
      :records="empleados.cant"
      :page="pagina"
      :per-page="cantidad"
      @paginate="fetchData"/>
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
  name: "EmpleadoList",
  data,
  computed: {
    empleados() {
      return this.$store.state.empleado.empleados;
    },
  },
  methods: {
    irAEmpleado,
    eliminar,
    fetchData,
  },
  created() {
    return this.fetchData(this.pagina);
  },
};

function data() {
  return {
    pagina: 1,
    cantidad: this.$store.state.app.cantPorPagina,
  };
}

function fetchData(pagina) {
  const paginacion = { pagina: pagina - 1, cantidad: this.cantidad };
  this.pagina = pagina;
  this.$store.dispatch(this.$actions.getBaseEmpleado, paginacion);
}

function irAEmpleado(empleado, edit) {
  this.$store.commit(this.$actions.setEmpleado, empleado);
  return this.$router.push({ name: "empleadoform", params: { edit } });
}

function eliminar(empleado) {
  swal({
    title: "Confirmación",
    text: "¿Está seguro que desea eliminar este empleado?",
    type: "warning",
    showCancelButton: true,
  }).then((resp) => {
    if (resp && !resp.dismiss) {
      return this.$store.dispatch(this.$actions.eliminarEmpleado, empleado)
        .then(() => this.$toastr("success", "El empleado ha sido eliminado", "Éxito"))
        .catch(err => this.$toastr("error", err, "Error"));
    }
    return noop;
  }).catch(err => this.$toastr("error", err, "Error"));
}
</script>
