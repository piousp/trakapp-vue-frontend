<template>
  <section>
    <div class="botones-pagina">
      <router-link tag="button"
                   class="boton boton--nuevo"
                   :to="{name: 'clienteform', params: { edit: true }}"/>
    </div>
    <div v-if="clientes.cant > 0">
      <table class="tabla tabla--responsive">
        <thead class="tabla__header">
          <tr>
            <th>Cédula</th>
            <th>Nombre</th>
            <th>Dirección</th>
            <th/>
          </tr>
        </thead>
        <tbody class="tabla__body tabla__body--clickable tabla__body--striped">
          <tr v-for="cliente in clientes.docs" :key="cliente._id">
            <td @click="irACliente(cliente, false)">
              {{ cliente.cedula }}
            </td>
            <td @click="irACliente(cliente, false)">
              {{ cliente.nombre }}
            </td>
            <td @click="irACliente(cliente, false)">
              <span v-if="cliente.direccion">{{ cliente.direccion }}</span>
              <span v-else>N/A</span>
            </td>
            <td>
              <ul class="tabla__opciones">
                <li class="tabla__opciones__elem"
                    tooltip="Editar" @click="irACliente(cliente, true)">
                  <i class="text--cyan fa fa-fw fa-edit"/>
                </li>
                <li class="tabla__opciones__elem" tooltip="Eliminar" @click="eliminar(cliente)">
                  <i class="text--tomate fa fa-fw fa-trash"/>
                </li>
              </ul>
            </td>
          </tr>
        </tbody>
      </table>
      <pagination
      :records="clientes.cant"
      :page="pagina"
      :per-page="cantidad"
      @paginate="fetchData"/>
    </div>
    <div v-else>
      <p class="no-results text--center">
        <i class="fa fa-fw fa-list"/>
        <span>No hay clientes registrados.</span>
      </p>
    </div>
  </section>
</template>
<script>
import noop from "lodash/noop";
import swal from "sweetalert2";

export default {
  name: "ClienteList",
  data,
  computed: {
    clientes() {
      return this.$store.state.cliente.clientes;
    },
  },
  created() {
    return this.fetchData(this.pagina);
  },
  methods: {
    eliminar,
    irACliente,
    fetchData,
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
  this.$store.dispatch(this.$actions.getBaseCliente, paginacion);
}

function irACliente(cliente, edit) {
  this.$store.commit(this.$actions.setCliente, cliente);
  this.$router.push({ name: "clienteform", params: { edit } });
}

function eliminar(cliente) {
  swal({
    title: "Confirmación",
    text: "¿Está seguro que desea eliminar este cliente?",
    type: "warning",
    showCancelButton: true,
  }).then((resp) => {
    if (resp && !resp.dismiss) {
      this.$store.dispatch(this.$actions.deleteIDCliente, {
        cliente, delLocal: true, deLista: true,
      });
    }
    return noop;
  })
    .catch((err) => {
      this.$toastr("error", err, "Error");
    });
}
</script>
