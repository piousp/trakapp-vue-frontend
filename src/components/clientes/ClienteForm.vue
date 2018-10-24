<template>
  <section>
    <form class="form" novalidate>
      <div class="botones-pagina">
        <router-link :to="{name: 'clientelist'}" class="boton boton--volver"/>
        <button
          type="button"
          class="boton boton--cancelar"
          v-if="copia._id && editando"
          @click="cancelar"/>
        <button
          type="button"
          class="boton boton--editar"
          v-if="copia._id && !editando"
          @click="editar(copia)"/>
        <button
          type="button"
          class="boton boton--guardar"
          v-if="editando"
          @click="guardar(copia)"/>
      </div>
      <section class="grid">
        <div class="col-md-6">
          <h1 class="h1"><strong class="text--bold">Info</strong>rmación básica</h1>

          <div class="checkbox">
            <input type="checkbox" id="ckbxEmpresa" v-model="copia.esEmpresa">
            <label class="form__label" for="ckbxEmpresa">Es una empresa</label>
          </div>

          <form-group :error="errors.has('nombre') && submitted">
            <input
              name="nombre"
              class="form__input"
              v-model="copia.nombre"
              :disabled="!editando"
              required
              v-validate="'required'" >
            <label class="form__label">Nombre</label>
          </form-group>
          <form-group v-if="!copia.esEmpresa">
            <input class="form__input"
                   v-model="copia.apellidos"
                   :disabled="!editando">
            <label class="form__label">Apellidos</label>
          </form-group>

          <form-group v-if="copia.esEmpresa" :error="errors.has('cedula') && submitted">
            <the-mask
              class="form__input"
              v-model="copia.cedula"
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
              v-model="copia.cedula"
              :disabled="!editando"
              :masked="true"
              mask="#-####-####"
              name="cedula"/>
            <label class="form__label">Cédula</label>
          </form-group>

          <form-group v-if="copia.esEmpresa" :error="errors.has('correo') && submitted">
            <input class="form__input"
                   v-model="copia.correo"
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
                      v-model="copia.direccion"
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
              lat: copia.ubicacion.coordinates[1] || 9.93,
              lng: copia.ubicacion.coordinates[0] || -84.07
            }"
            :zoom="14"
            :options="{ disableDefaultUI : true }"
            map-type-id="terrain">
            <gmap-marker
              :draggable="editando"
              :position="{
                lat: copia.ubicacion.coordinates[1],
                lng: copia.ubicacion.coordinates[0]
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

const debug = D("ciris:ClienteForm.vue");

export default {
  name: "ClienteForm",
  data,
  computed: {
    cliente() {
      return this.$store.state.cliente.cliente;
    },
  },
  watch: {
    cliente: {
      handler(newV) {
        this.copia = cloneDeep(newV);
      },
      immediate: true,
      deep: true,
    },
  },
  beforeDestroy() {
    this.$store.commit(this.$actions.resetCliente);
  },
  methods: {
    guardar,
    editar,
    cancelar,
    buscarLugar,
  },
  beforeRouteEnter,
};

function data() {
  return {
    copia: { ubicacion: { coordinates: [-84.0483781, 9.9281102] } },
    editando: true,
    submitted: false,
  };
}

function guardar(cliente) {
  debug("Guardando");
  this.submitted = true;
  this.$validator.validateAll()
    .then((valido) => {
      if (valido) {
        return this.$store.dispatch(this.$actions.guardarCliente, { cliente, conservar: true })
          .then((resp) => {
            debug("Guardado exitoso");
            this.$toastr("success", "Cliente guardado exitosamente", "Éxito");
            this.editando = false;
            return resp;
          })
          .catch((err) => {
            debug(err);
            this.$toastr("error", err, "Error");
          });
      }
      debug("Hay campos requeridos sin completar");
      return this.$toastr("error", "Hay campos requeridos sin completar", "Error");
    })
    .catch((err) => {
      debug(err);
      this.$toastr("error", err, "Error");
    });
}

function editar() {
  this.editando = true;
}

function cancelar() {
  this.editando = false;
}

function buscarLugar(lugar) {
  this.copia.ubicacion = {
    type: "Point",
    coordinates: [lugar.geometry.location.lng(), lugar.geometry.location.lat()],
  };
  this.$refs.mapCliente.panTo({
    lat: this.copia.ubicacion.coordinates[1],
    lng: this.copia.ubicacion.coordinates[0],
  });
}

function beforeRouteEnter(to, from, next) {
  next((vm) => {
    vm.editando = to.params.edit;
  });
}
</script>

<style>
.mapa-cliente{
  height: 400px;
  width: 100%;
}
</style>
