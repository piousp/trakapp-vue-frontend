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
              :center="center"
              :zoom="15"
              map-type-id="terrain">
              <gmap-marker
                :position="empleado.position"
                :clickable="false"/>
            </gmap-map>
          </div>
          <div class="col-6">
            <div class="chat">
              <div class="chat__dialogo">
                <div :class="{'chat__dialogo__msj--yo': msj.emisor === idEmisor}"
                     v-for="msj in mensajes" :key="msj._id">
                  <div class="chat__dialogo__msj text">
                    <p>{{ msj.texto }}</p>
                  </div>
                  <p class="text text--small chat__dialogo__hora">
                    {{ msj.fechaEnvio | fecha('DD/MM/YYYY HH:mm') }}
                  </p>
                </div>
              </div>
              <div class="chat__input">
                <textarea class="form__input" placeholder="Escriba un mensaje..."
                          v-model="mensaje.texto" @keyup.enter="enviar(mensaje.texto)"/>
              </div>
            </div>
          </div>
        </div>
        <div class="modal__footer">
          <button type="button" class="boton boton--cancelar" @click="cerrarModal"/>
        </div>
      </div>
    </div>
</div></template>

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
    center: { lat: 0, lng: 0 },
    modalVisible: false,
    mensajes: [],
    mensaje: {},
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
