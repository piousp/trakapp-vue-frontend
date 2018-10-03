<template>
  <section>
    <div class="botones-pagina">
      <router-link tag="button"
                   class="boton boton--nuevo"
                   :to="{name: 'clienteform'}"/>
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
            <router-link tag="td"
                         :to="{name: 'clienteform', params: {id: cliente._id}}">
              {{ cliente.cedula }}
            </router-link>
            <router-link tag="td"
                         :to="{name: 'clienteform', params: {id: cliente._id}}">
              {{ cliente.nombre }}
            </router-link>
            <router-link tag="td"
                         :to="{name: 'clienteform', params: {id: cliente._id}}">
              <span v-if="cliente.direccion">{{ cliente.direccion }}</span>
              <span v-else>N/A</span>
            </router-link>
            <td>
              <ul class="tabla__opciones">
                <router-link tag="li"
                             class="tabla__opciones__elem"
                             tooltip="Editar"
                             :to="{name: 'clienteform', params: {id: cliente._id, edit: true}}">
                  <i class="text--cyan fa fa-fw fa-edit"/>
                </router-link>
                <li class="tabla__opciones__elem" tooltip="Eliminar" @click="eliminar(cliente)">
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
        <span>No hay clientes registrados.</span>
      </p>
    </div>
  </section>
</template>
<script>//
import reject from "lodash/reject";
import noop from "lodash/noop";
import swal from "sweetalert2";
import clienteApi from "./clienteApi.js";

export default {
  name: "ClienteList",
  data,
  methods: {
    eliminar,
  },
  beforeRouteEnter,
};

function data() {
  return {
    clientes: [],
  };
}

function eliminar(cliente) {
  swal({
    title: "Confirmación",
    text: "¿Está seguro que desea eliminar este cliente?",
    type: "warning",
    showCancelButton: true,
  }).then((resp) => {
    if (resp && !resp.dismiss) {
      return clienteApi
        .eliminar(cliente._id)
        .then(() => {
          this.$toastr("success", "El cliente ha sido eliminado", "Éxito");
          this.clientes.docs = reject(this.clientes.docs, ["_id", cliente._id]);
          this.clientes.cant -= 1;
          return this.clientes;
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
  clienteApi.listar(0, 10)
    .then(resp => next((vm) => {
      vm.clientes = resp;
    }))
    .catch((err) => {
      this.$toastr("error", err, "Error");
    });
}
</script>
