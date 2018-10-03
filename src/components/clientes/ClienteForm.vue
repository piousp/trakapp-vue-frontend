<template>
  <section>
    <form class="form" novalidate>
      <div class="botones-pagina">
        <router-link :to="{name: 'clientelist'}" class="boton boton--volver"/>
        <button
          type="button"
          class="boton boton--cancelar"
          v-if="cliente._id && editando"
          @click="cancelar"/>
        <button
          type="button"
          class="boton boton--editar"
          v-if="cliente._id && !editando"
          @click="editar(cliente)"/>
        <button
          type="button"
          class="boton boton--guardar"
          v-if="editando"
          @click="guardar(cliente)"/>
      </div>
      <section class="grid">
        <div class="col-md-6">
          <h1 class="h1"><strong class="text--bold">Info</strong>rmación básica</h1>

          <div class="checkbox">
            <input type="checkbox" id="ckbxEmpresa" v-model="cliente.esEmpresa">
            <label class="form__label" for="ckbxEmpresa">Es una empresa</label>
          </div>

          <form-group :error="errors.has('nombre') && submitted">
            <input
              name="nombre"
              class="form__input"
              v-model="cliente.nombre"
              :disabled="!editando"
              required
              v-validate="'required'" >
            <label class="form__label">Nombre</label>
          </form-group>
          <form-group v-if="!cliente.esEmpresa">
            <input class="form__input"
                   v-model="cliente.apellidos"
                   :disabled="!editando">
            <label class="form__label">Apellidos</label>
          </form-group>

          <form-group v-if="cliente.esEmpresa" :error="errors.has('cedula') && submitted">
            <the-mask
              class="form__input"
              v-model="cliente.cedula"
              :disabled="!editando"
              :masked="true"
              mask="#-###-######"
              name="cedula"
              required
              v-validate="'required'"/>
            <label class="form__label">Cédula</label>
          </form-group>

          <form-group v-else>
            <the-mask
              class="form__input"
              v-model="cliente.cedula"
              :disabled="!editando"
              :masked="true"
              mask="#-####-####"
              name="cedula"/>
            <label class="form__label">Cédula</label>
          </form-group>

          <form-group v-if="cliente.esEmpresa" :error="errors.has('correo') && submitted">
            <input class="form__input"
                   v-model="cliente.correo"
                   :disabled="!editando"
                   required
                   name="correo"
                   v-validate="'required'">
            <label class="form__label">Correo de contacto</label>
          </form-group>

        </div>
        <div class="col-md-6">
          <h1 class="h1"><strong class="text--bold">Ubic</strong>ación</h1>
          <form-group :error="errors.has('direccion') && submitted">
            <textarea class="form__input"
                      v-model="cliente.direccion"
                      :disabled="!editando"
                      name="direccion"/>
            <label class="form__label">Dirección</label>
          </form-group>
          <form-group v-show="editando">
            <label class="form__label">Ubicación</label>
            <gmap-autocomplete class="form__input"
                               :disabled="!editando"
                               :options="{componentRestrictions: {country: 'cr'}}"
                               @place_changed="buscarLugar"/>
          </form-group>
          <gmap-map
            class="mapa-cliente"
            ref="mapCliente"
            :center="{
              lat: cliente.ubicacion.coordinates[1] || 9.93,
              lng: cliente.ubicacion.coordinates[0] || -84.07
            }"
            :zoom="14"
            :options="{ disableDefaultUI : true }"
            map-type-id="terrain">
            <gmap-marker
              :draggable="editando"
              :position="{
                lat: cliente.ubicacion.coordinates[1],
                lng: cliente.ubicacion.coordinates[0]
              }
            "/>
          </gmap-map>
        </div>
      </section>
    </form>
  </section>
</template>

<script>
import D from "debug";
import cloneDeep from "lodash/cloneDeep";
import clienteApi from "./clienteApi.js";

const debug = D("ciris:ClienteForm.vue");

function data() {
  return {
    cliente: { ubicacion: { coordinates: [0, 0] } },
    copia: {},
    editando: true,
    submitted: false,
  };
}

function guardar(cliente) {
  this.submitted = true;
  this.$validator.validateAll().then((valido) => {
    if (valido) {
      return clienteApi
        .guardar(cliente)
        .then((resp) => {
          this.$toastr("success", "Cliente guardado exitosamente", "Éxito");
          this.$router.push({ name: "clienteform", params: { id: resp._id } });
          this.cliente._id = resp._id;
          this.editando = false;
          return resp;
        })
        .catch((err) => {
          this.$toastr("error", err, "Error");
        });
    }
    return this.$toastr("error", "Hay campos requeridos sin completar", "Error");
  })
    .catch((err) => {
      this.$toastr("error", err, "Error");
    });
}

function editar(cliente) {
  this.editando = true;
  this.copia = cloneDeep(cliente);
}

function cancelar() {
  this.editando = false;
  this.cliente = this.copia;
}

function buscarLugar(lugar) {
  this.cliente.ubicacion = {
    type: "Point",
    coordinates: [lugar.geometry.location.lng(), lugar.geometry.location.lat()],
  };
  this.$refs.mapCliente.panTo({
    lat: this.cliente.ubicacion.coordinates[1],
    lng: this.cliente.ubicacion.coordinates[0],
  });
}

function beforeRouteEnter(to, from, next) {
  const self = this;
  if (to.params.id) {
    return clienteApi.obtener(to.params.id)
      .then(resp => next((vm) => {
        vm.cliente = resp;
        vm.copia = cloneDeep(resp);
        vm.editando = to.params.edit;
      }))
      .catch((err) => {
        debug(err);
        self.$toastr("error", err, "Error");
      });
  }
  return next();
}

export default {
  name: "ClienteForm",
  data,
  methods: {
    guardar,
    editar,
    cancelar,
    buscarLugar,
  },
  beforeRouteEnter,
};
</script>

<style>
.mapa-cliente{
  height: 400px;
  width: 100%;
}
</style>
