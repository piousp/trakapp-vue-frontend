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
  mounted,
  computed: {
    sEmpleado() { return this.$store.state.empleado.empleado; },
  },
  watch: {
    sEmpleado: {
      handler(newV) {
        this.empleado = cloneDeep(newV);
      },
      immediate: true,
      deep: true,
    },
  },
  methods: {
    cerrarModal,
    generarCoords,
  },
  sockets: {
    actualizar,
  },
};

function data() {
  return {
    empleado: {},
    center: { lat: 9.93, lng: -84.07 },
    estilos,
    mensajes: [],
    mensaje: {},
  };
}

function actualizar(e) {
  debug("actualizarPosicion", e);
  this.empleado.ubicacion = {
    lastUpdate: e.ubicacion.lastUpdate,
    pos: this.generarCoords(e.ubicacion.pos.coordinates),
  };
  this.$refs.map.panTo(this.empleado.ubicacion.pos);
}

function generarCoords(coordinates) {
  debug("generarCoords", coordinates);
  return new google.maps.LatLng(coordinates[1], coordinates[0]);
}

function mounted() {
  debug("mounted");
  this.$refs.map.$mapPromise
    .then((objMapa) => {
      const params = {
        cargados: 0,
        cantidad: this.$refs.chat.limiteItems,
        emisor: this.$store.state.usuario.usuarioActivo._id,
        receptor: this.empleado._id,
      };
      this.$store.dispatch(this.$actions.listarMensajePrivado, params);
      if (get(this.empleado.ubicacion, "pos.coordinates", null)) {
        this.empleado.ubicacion.pos = this.generarCoords(this.empleado.ubicacion.pos.coordinates);
      }
      const trafficLayer = new google.maps.TrafficLayer();
      const bounds = new google.maps.LatLngBounds();
      trafficLayer.setMap(objMapa);
      bounds.extend(this.empleado.ubicacion.pos);
      objMapa.fitBounds(bounds);
      objMapa.panTo(this.empleado.ubicacion.pos);
      return objMapa;
    })
    .catch((err) => {
      this.$toastr("error", err, "Error");
    });
}

function cerrarModal() {
  this.$store.commit(this.$actions.resetEmpleado);
  return this.$store.commit(this.$actions.hideModal);
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
