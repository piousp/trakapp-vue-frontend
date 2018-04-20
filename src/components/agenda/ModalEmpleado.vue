<template lang="html">
  <div class="backdrop" v-if="modalVisible">
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
              :zoom="15"
              map-type-id="terrain">
              <gmap-marker
                :position="empleado.position"
                :clickable="false"/>
            </gmap-map>
          </div>
          <div class="col-6"/>
        </div>
      </div>
      <div class="modal__footer">
        <button type="button" class="boton boton--cancelar" @click="cerrarModal"/>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data,
  ready,
  methods: {
    abrirModal,
    cerrarModal,
  },
  sockets: {
    actualizarPosicion,
  },
};

function ready() {

}

function data() {
  return {
    empleado: {},
    modalVisible: false,
  };
}

function actualizarPosicion(e) {
  this.empleado.position = generarCoords(e.position.lat, e.position.lng);
}

function generarCoords(lat, lng) {
  return new google.maps.LatLng(lat, lng);
}

function abrirModal(empleado) {
  this.modalVisible = true;
  this.empleado = empleado;
  this.$refs.map.$mapCreated
    .then((objMapa) => {
      const mapaCargado = objMapa.addListener("tilesloaded", () => {
        mapaCargado.remove();
        const bounds = new google.maps.LatLngBounds();
        bounds.extend(this.position);
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
