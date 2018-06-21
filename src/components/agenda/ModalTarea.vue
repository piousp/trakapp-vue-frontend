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
              <form-group :error="errors.has('title') && submitted">
                <input class="form__input" v-model="tarea.title"
                       :disabled="tarea.activa === false"
                       v-validate="'required'" name="title">
                <label class="form__label">Título</label>
              </form-group>
              <form-group id="asignar-tarea" :error="errors.has('empleado') && submitted">
                <select class="form__input" v-model="tarea.empleado"
                        :disabled="tarea.activa === false" name="empleado" v-validate="'required'">
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
                    <label class="form__label">Desde</label>
                    <p class="form__input">{{ tarea.start | fecha("LLL") }}</p>
                  </form-group>
                </div>
                <div class="col-6">
                  <form-group>
                    <label class="form__label">Hasta</label>
                    <p class="form__input">{{ tarea.end | fecha("LLL") }}</p>
                  </form-group>
                </div>
              </div>
            </div>
            <div class="col-6">
              <form-group id="ubicacion-tarea">
                <gmap-autocomplete class="form__input" ref="gmapAutocomplete"
                                   :disabled="tarea.activa === false"
                                   :options="{componentRestrictions: {country: 'cr'}}"
                                   @place_changed="buscarLugar"
                                   placeholder=""/>
                <label class="form__label">Ubicación</label>
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

function data() {
  return {
    mapCenter: { lat: 9.93, lng: -84.07 },
    modalVisible: false,
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
  };
  this.modalVisible = true;
}

function cerrarModal() {
  this.submitted = false;
  this.tarea = {};
  this.$refs.gmapAutocomplete.$el.value = null;
  this.modalVisible = false;
}

function editarModal(tarea) {
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

export default {
  data,
  store: ["tarea", "empleados"],
  methods: {
    buscarLugar,
    abrirModal,
    cerrarModal,
    editarModal,
    verificarYAceptar,
  },
};
</script>

<style lang="scss">
.mapa-agenda{
  height: 300px;
  width: 100%;
}
</style>
