<template>
  <section id="seccion-rutas">
    <div class="botones-pagina">
      <router-link tag="button"
                   class="boton boton--nuevo"
                   :to="{name: 'rutaform', params: { edit: true }}"/>
    </div>
    <div v-if="rutas.docs.length > 0">
      <table class="tabla tabla--responsive">
        <thead class="tabla__header">
          <tr>
            <th>Nombre</th>
            <th>Descripción</th>
            <th/>
          </tr>
        </thead>
        <tbody class="tabla__body tabla__body--clickable tabla__body--striped">
          <tr v-for="ruta in rutas.docs" :key="ruta._id">
            <td @click="irARuta(ruta, false)">
              {{ ruta.nombre }}
            </td>
            <td @click="irARuta(ruta, false)">
              {{ ruta.descripcion }}
            </td>
            <td>
              <ul class="tabla__opciones">
                <li @click="irARuta(ruta, true)"
                    class="tabla__opciones__elem"
                    tooltip="Editar">
                  <i class="text--cyan fa fa-fw fa-edit"/>
                </li>
                <li class="tabla__opciones__elem" tooltip="Eliminar" @click="eliminar(ruta)">
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
        <span>No hay rutas registrados.</span>
      </p>
    </div>
  </section>
</template>
<script>//
import noop from "lodash/noop";
import swal from "sweetalert2";

export default {
  name: "RutaList",
  computed: {
    rutas() {
      return this.$store.state.ruta.rutas;
    },
  },
  methods: {
    irARuta,
    eliminar,
  },
  created() {
    return this.$store.dispatch("ruta/getBase", { pagina: 0, cantidad: 10 });
  },
};

function irARuta(ruta, edit) {
  this.$store.commit("ruta/setRuta", ruta);
  return this.$router.push({ name: "rutaform", params: { edit } });
}

function eliminar(ruta) {
  swal({
    title: "Confirmación",
    text: "¿Está seguro que desea eliminar esta ruta?",
    type: "warning",
    showCancelButton: true,
  }).then((resp) => {
    if (resp && !resp.dismiss) {
      return this.$store.dispatch("ruta/eliminarRuta", { ruta, deLista: true })
        .then(() => this.$toastr("success", "El ruta ha sido eliminado", "Éxito"))
        .catch(err => this.$toastr("error", err, "Error"));
    }
    return noop;
  }).catch(err => this.$toastr("error", err, "Error"));
}
</script>
