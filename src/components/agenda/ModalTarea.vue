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
      <div class="modal__body">
        <form>
          <div class="grid">
            <div class="col-6">
              <form-group>
                <label class="form__label">Título</label>
                <input class="form__input" v-model="tarea.title"
                       :disabled="tarea.activa === false">
              </form-group>
              <div class="form-group">
                <label class="form__label">Asignar a</label>
                <select class="form__input" v-model="tarea.empleado"
                        :disabled="tarea.activa === false">
                  <option v-for="emp in empleados" :value="emp._id" :key="emp._id">
                    {{ emp.nombre }} {{ emp.apellidos }}
                  </option>
                </select>
              </div>
              <form-group>
                <label class="form__label">Descripción</label>
                <textarea class="form__input" rows="3"
                          v-model="tarea.descripcion"
                          :disabled="tarea.activa === false"/>
              </form-group>
              <div class="grid grid--bleed">
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
              <form-group>
                <label class="form__label">Ubicación</label>
                <gmap-autocomplete class="form__input"
                                   :disabled="tarea.activa === false"
                                   :options="{componentRestrictions: {country: 'cr'}}"
                                   @place_changed="buscarLugar"/>
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
        </form>
      </div>
      <div class="modal__footer">
        <button type="button" class="boton boton--cancelar" @click="cerrarModal"/>
        <button type="button" class="boton boton--guardar" @click="$emit('aceptar', tarea)"/>
        <button type="button"
                class="boton boton--eliminar"
                @click="$emit('eliminar', tarea)"
                v-show="tarea._id"/>
      </div>
    </div>
  </div>
</template>

<script>

function data() {
  return {
    mapCenter: { lat: 9.93, lng: -84.07 },
    modalVisible: false,
  };
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
  this.tarea = {};
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
  },
};
</script>

<style lang="scss">
.mapa-agenda{
  height: 300px;
  width: 100%;
}
</style>
