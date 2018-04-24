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
            <gmap-map
              class="map-container"
              ref="map"
              :center="center"
              :zoom="15"
              map-type-id="terrain">
              <gmap-marker
                :if="empleado"
                :position="empleado.ubicacion"
                :clickable="false"/>
            </gmap-map>
          </div>
          <div class="col-6" ng-if="empleado">
            <chat-individuo ref="chat"/>
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
};

function data() {
  return {
    empleado: {},
    center: { lat: 9.93, lng: -84.07 },
    modalVisible: false,
    mensajes: [],
    mensaje: {},
  };
}

function actualizarPosicion(e) {
  debug("actualizarPosicion", e);
  this.empleado.ubicacion = generarCoords(e.ubicacion.pos.coordinates);
}

function generarCoords(coordinates) {
  return new google.maps.LatLng(coordinates[1], coordinates[0]);
}

function abrirModal(empleado) {
  debug("Abriendo el modal del empleado", empleado);
  this.modalVisible = true;
  this.empleado = empleado;
  debug(this.$refs.chat);
  this.$refs.chat.cargarMensajes(empleado._id);
  this.$refs.map.$mapCreated
    .then((objMapa) => {
      const mapaCargado = objMapa.addListener("tilesloaded", () => {
        mapaCargado.remove();
        const bounds = new google.maps.LatLngBounds();
        if (get(this.ubicacion, "pos.coordinates", null)) {
          bounds.extend(generarCoords(this.empleado.ubicacion.pos.coordinates));
        }
        objMapa.fitBounds(bounds);
      });
      return mapaCargado;
    })
    .catch((err) => {
      this.$toastr("error", err, "Error");
    });
}


function cerrarModal() {
  this.modalVisible = false;
}
</script>

<style lang="scss">
.map-container {
  height: 300px;
}
</style>
