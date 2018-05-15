<template lang="html">
  <div class="backdrop" v-show="modalVisible">
    <div class="modal modal--l">
      <div class="modal__header text--center">
        <div class="modal__header__titulo">
          {{ empleado.nombre + ' ' + empleado.apellidos }}
        </div>
      </div>
      <div class="modal__body">
        <div class="grid">
          <div class="col-6">
            <p class="text">
              Última vez: {{ empleado.ubicacion.lastUpdate | fecha("DD/MM/YYYY HH:mm") }}
            </p>
            <gmap-map
              class="map-container"
              ref="map"
              :center="center"
              :zoom="15"
              :options="{ disableDefaultUI : true }"
              map-type-id="terrain">
              <gmap-marker
                :if="empleado"
                :position="empleado.ubicacion.pos"
                :clickable="false"/>
            </gmap-map>
          </div>
          <div class="col-6" ng-if="empleado">
            <chat-individuo ref="chat" :privado="true"/>
          </div>
        </div>
      </div>
      <div class="modal__footer">
        <button type="button" class="boton boton--cancelar" @click="cerrarModal"/>
      </div>
    </div>
  </div>
</template>

<script>
import D from "debug";
import get from "lodash/get";

const debug = D("ciris:ModalEmpleado.vue");
export default {
  data,
  methods: {
    abrirModal,
    cerrarModal,
  },
  sockets: {
    actualizarPosicion,
  },
  store: ["empleado"],
};

function data() {
  return {
    center: { lat: 9.93, lng: -84.07 },
    modalVisible: false,
    mensajes: [],
    mensaje: {},
  };
}

function actualizarPosicion(e) {
  debug("actualizarPosicion", e);
  this.empleado.ubicacion = {
    lastUpdate: e.ubicacion.lastUpdate,
    pos: generarCoords(e.ubicacion.pos.coordinates),
  };
  this.$refs.map.panTo(this.empleado.ubicacion.pos);
}

function generarCoords(coordinates) {
  return new google.maps.LatLng(coordinates[1], coordinates[0]);
}

function abrirModal() {
  this.modalVisible = true;
  if (get(this.empleado.ubicacion, "pos.coordinates", null)) {
    this.empleado.ubicacion.pos = generarCoords(this.empleado.ubicacion.pos.coordinates);
  }
  debug("Abriendo el modal del empleado", this.empleado);
  this.$refs.chat.cargarMensajes(this.empleado._id);
  this.$refs.map.$mapCreated
    .then((objMapa) => {
      const bounds = new google.maps.LatLngBounds();
      bounds.extend(this.empleado.ubicacion.pos);
      objMapa.fitBounds(bounds);
      objMapa.panTo(this.empleado.ubicacion.pos);
      return objMapa;
    })
    .catch((err) => {
      debug(err);
      this.$toastr("error", err, "Error");
    });
}


function cerrarModal() {
  this.modalVisible = false;
}
</script>

<style scoped lang="scss">
.map-container {
  height: 300px;
}
</style>
