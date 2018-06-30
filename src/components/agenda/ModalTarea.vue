<template>
  <div class="backdrop" v-show="modalVisible">
    <div class="modal modal--l">
      <div class="modal__header text--center">
        <div class="modal__header__titulo">
          <i class="fal fa-fw fa-calendar"/>
          {{ tarea.title || 'Nueva tarea' }}
          <span class="text--italic text--gris8" v-if="tarea.activa === false">Finalizada</span>
        </div>
      </div>
      <form ref="form" novalidate>
        <div class="modal__body">
          <div class="grid">
            <div class="col-6">
              <form-group id="title" :error="errors.has('title') && submitted">
                <input class="form__input"
                       name="title"
                       v-model="tarea.title"
                       :disabled="tarea.activa === false"
                       required
                       v-validate="'required'">
                <label class="form__label">Título</label>
              </form-group>
              <form-group>
                <label class="form__label">Cliente dueño</label>
                <multiselect
                  v-model="tarea.cliente"
                  :options="clientes"
                  :disabled="tarea.activa === false"
                  label="nombreCompleto"
                  placeholder="Buscar por nombre..."
                  @search-change="buscarClientes"
                />
              </form-group>
              <form-group id="asignar-tarea" :error="errors.has('empleado') && submitted">
                <select class="form__input"
                        name="empleado"
                        v-model="tarea.empleado"
                        required
                        :disabled="tarea.activa === false"
                        v-validate="'required'">
                  <option v-for="emp in empleados" :value="emp._id" :key="emp._id">
                    {{ emp.nombre }} {{ emp.apellidos }}
                  </option>
                </select>
                <label class="form__label">Asignar a</label>
              </form-group>
              <form-group>
                <textarea class="form__input" rows="3"
                          v-model="tarea.descripcion"
                          :disabled="tarea.activa === false"/>
                <label class="form__label">Descripción</label>
              </form-group>
              <div class="grid grid--bleed" id="fecha-tarea">
                <div class="col-6">
                  <form-group>
                    <label class="form__label form__label--required">Desde</label>
                    <datepicker
                      v-if="tarea.activa"
                      language="es"
                      input-class="form__input"
                      v-model="tarea.start"/>
                    <p v-else class="form__input">
                      {{ tarea.start | fecha("DD MMM YYYY hh:mm a") }}
                    </p>
                  </form-group>
                </div>
                <div class="col-6">
                  <form-group>
                    <label class="form__label form__label--required">Hasta</label>
                    <datepicker
                      v-if="tarea.activa"
                      language="es"
                      input-class="form__input"
                      v-model="tarea.end"/>
                    <p v-else class="form__input">
                      {{ tarea.end | fecha("DD MMM YYYY hh:mm a") }}
                    </p>
                  </form-group>
                </div>
              </div>
              <div class="grid" v-if="!isEmpty(tarea.post)">
                <div class="col-md-6 form__group">
                  <label class="form__label">Firma</label><br>
                  <img :src="`data:image/svg+xml;base64,${tarea.post.firma}`" height="100px">
                </div>
                <div class="col-md-6 form__group">
                  <label class="form__label">Apuntes</label>
                  <p class="text text--gris8">{{ tarea.post.apuntes }}</p>
                </div>
              </div>
            </div>
            <div class="col-6">
              <form-group id="ubicacion-tarea">
                <gmap-autocomplete class="form__input" ref="gmapAutocomplete"
                                   :disabled="tarea.activa === false"
                                   required
                                   :options="{componentRestrictions: {country: 'cr'}}"
                                   @place_changed="buscarLugar"
                                   placeholder=""/>
                <label class="form__label form__label--required">Ubicación</label>
              </form-group>
              <gmap-map
                class="mapa-agenda"
                ref="map"
                :center="mapCenter"
                :zoom="14"
                :options="{ disableDefaultUI : true }"
                map-type-id="terrain">
                <gmap-marker
                  v-if="tarea.ubicacion && tarea.ubicacion.coordinates"
                  :draggable="tarea.activa !== false"
                  :position="{
                    lat: tarea.ubicacion.coordinates[1],
                    lng: tarea.ubicacion.coordinates[0]
                  }
                "/>
              </gmap-map>
            </div>
          </div>
        </div>
        <div class="modal__footer">
          <button type="button" class="boton boton--cancelar" @click="cerrarModal"/>
          <button type="button" class="boton boton--guardar" @click="verificarYAceptar()"/>
          <button type="button"
                  class="boton boton--eliminar"
                  @click="$emit('eliminar', tarea)"
                  v-show="tarea._id"/>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import isEmpty from "lodash/isEmpty";
import clienteApi from "../clientes/clienteApi";

function data() {
  return {
    mapCenter: { lat: 9.93, lng: -84.07 },
    modalVisible: false,
    clientes: [],
    submitted: false,
  };
}

function verificarYAceptar() {
  this.submitted = true;
  return this.$validator.validateAll().then((valido) => {
    if (valido && this.tarea.ubicacion.coordinates) {
      return this.$emit("aceptar", this.tarea);
    } else if (!valido) {
      this.$toastr("error", "Falta información por llenar", "Campos vacios");
    } else if (!this.tarea.ubicacion.coordinates) {
      this.$toastr("error", "La tarea tiene que tener una ubicación", "Campos vacios");
    }
    return null;
  });
}

function abrirModal(evt) {
  this.tarea = {
    start: evt.start,
    end: evt.end,
    ubicacion: {},
    post: {},
    activa: true,
  };
  this.modalVisible = true;
}

function cerrarModal() {
  this.submitted = false;
  this.tarea = { post: {} };
  this.$refs.gmapAutocomplete.$el.value = null;
  this.clienteBuscado = null;
  this.modalVisible = false;
}

function editarModal(tarea) {
  if (this.tarea) {
    tarea.cliente.nombreCompleto = `${tarea.cliente.nombre} ${tarea.cliente.apellidos}`;
  }
  this.tarea = tarea;
  this.modalVisible = true;
  // Hay que esperar a que el mapa cargue. No hay forma de hacer un watch sobre $refs.
  setTimeout(() => {
    this.$refs.map.panTo({
      lat: this.tarea.ubicacion.coordinates[1],
      lng: this.tarea.ubicacion.coordinates[0],
    });
  }, 1000);
}

function buscarLugar(lugar) {
  this.tarea.ubicacion = {
    type: "Point",
    coordinates: [lugar.geometry.location.lng(), lugar.geometry.location.lat()],
  };
  this.$refs.map.panTo({
    lat: this.tarea.ubicacion.coordinates[1],
    lng: this.tarea.ubicacion.coordinates[0],
  });
}

function buscarClientes(txt) {
  if (!txt) {
    return [];
  }
  return clienteApi.buscar(txt, 0, 10).then((resp) => {
    this.clientes = resp;
    return resp;
  });
}

export default {
  data,
  store: ["tarea", "empleados"],
  methods: {
    buscarLugar,
    abrirModal,
    cerrarModal,
    editarModal,
    buscarClientes,
    verificarYAceptar,
    isEmpty,
  },
};
</script>

<style lang="scss">
.mapa-agenda{
  height: 300px;
  width: 100%;
}
#fecha-tarea {
  .col-6 {
    padding-top: 0;
    padding-bottom: 0;
    .form__group {
      margin-top: 0;
      margin-bottom: 0;
    }
  }
}
</style>
