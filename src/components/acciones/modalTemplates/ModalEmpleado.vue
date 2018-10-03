<template lang="html">
  <section>
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
            :zoom="14"
            :options="{ disableDefaultUI : true, styles: estilos }"
            map-type-id="terrain">
            <gmap-marker
              :if="empleado"
              :position="empleado.ubicacion.pos"
              :clickable="false"/>
          </gmap-map>
        </div>
        <div class="col-6">
          <chat-individuo ref="chat" :privado="true"/>
        </div>
      </div>
    </div>
    <div class="modal__footer">
      <button type="button" class="boton boton--negro" @click="cerrarModal">
        <i class="far fa-times-circle rojo"/>
        Cerrar chat
      </button>
    </div>
  </section>
</template>

<script>
import D from "debug";
import get from "lodash/get";
import cloneDeep from "lodash/cloneDeep";
import estilos from "../../comunes/estilosMapa";

const debug = D("ciris:ModalEmpleado.vue");

export default {
  name: "ModalEmpleado",
  data,
  props: ["params"],
  mounted() {
    return this.$refs.map.$mapPromise
      .then(objMapa => this.abrirModal(this.params.emp, objMapa));
  },
  methods: {
    abrirModal,
    cerrarModal,
    generarCoords,
  },
  sockets: {
    actualizar,
  },
};

function data() {
  return {
    center: { lat: 9.93, lng: -84.07 },
    estilos,
    mensajes: [],
    mensaje: {},
    empleado: {
      ubicacion: {},
    },
  };
}

function actualizar(e) {
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

function abrirModal(empleado, objMapa) {
  const copiaEmpleado = cloneDeep(empleado);
  debug("Abriendo el modal del empleado", copiaEmpleado);
  this.$refs.chat.cargarMensajes(copiaEmpleado._id);
  if (get(copiaEmpleado.ubicacion, "pos.coordinates", null)) {
    copiaEmpleado.ubicacion.pos = this.generarCoords(copiaEmpleado.ubicacion.pos.coordinates);
  }
  const trafficLayer = new google.maps.TrafficLayer();
  trafficLayer.setMap(objMapa);
  const bounds = new google.maps.LatLngBounds();
  bounds.extend(copiaEmpleado.ubicacion.pos);
  objMapa.fitBounds(bounds);
  objMapa.panTo(copiaEmpleado.ubicacion.pos);
  this.empleado = copiaEmpleado;
  return objMapa;
}


function cerrarModal() {
  return this.$store.commit("modal/hideModal");
}
</script>

<style scoped lang="scss">
.map-container {
  height: 300px;
}
.rojo {
  color: red;
}
</style>
