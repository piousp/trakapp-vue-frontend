<template>
  <gmap-map
    class="map-container full-height"
    ref="map"
    :center="center"
    :zoom="13"
    :options="{ disableDefaultUI : true, styles: estilos }"
    map-type-id="terrain">
    <gmap-marker
      :key="index"
      v-for="(e, index) in empleados"
      :position="e.ubicacion.pos"
      :clickable="true"
      @click="e.opened=!e.opened">
      <info-window :opened="e.opened">
        <p class="text--bold">{{ `${e.nombre} ${e.apellidos}` }}</p>
        <small>Últ. vez: {{ e.ubicacion.lastUpdate | fecha("DD/MM/YYYY HH:mm") }}</small>
      </info-window>
    </gmap-marker>
  </gmap-map>
</template>

<script>
import D from "debug";
import map from "lodash/map";
import compact from "lodash/compact";
import get from "lodash/get";
import findIndex from "lodash/findIndex";
import cloneDeep from "lodash/cloneDeep";
import estilos from "../comunes/estilosMapa";

const debug = D("ciris:Mapa.vue");

export default {
  name: "Mapa",
  data,
  computed: {
    sEmpleados() {
      return this.$store.state.storeEmpleado.empleados;
    },
  },
  sockets: {
    actualizar,
  },
  mounted,
};

function data() {
  return {
    center: { lat: 9.93, lng: -84.07 },
    estilos,
    empleados: [],
  };
}

function actualizar(e) {
  debug("actualizarPosicion", e);
  const i = findIndex(this.empleados, { _id: e._id });
  this.empleados[i].ubicacion = {
    lastUpdate: e.ubicacion.lastUpdate,
    pos: generarCoords(e.ubicacion.pos.coordinates),
  };
}

function generarCoords(coordinates) {
  return new google.maps.LatLng(coordinates[1], coordinates[0]);
}

function mounted() {
  this.$refs.map.$mapPromise
    .then((objMapa) => {
      const bounds = new google.maps.LatLngBounds();
      const trafficLayer = new google.maps.TrafficLayer();
      trafficLayer.setMap(objMapa);
      const copiaSEmpleados = cloneDeep(this.sEmpleados);
      const empMapeados = map(copiaSEmpleados.docs, (e) => {
        if (get(e.ubicacion, "pos.coordinates", null)) {
          e.opened = false;
          e.ubicacion.pos = generarCoords(e.ubicacion.pos.coordinates);
          bounds.extend(e.ubicacion.pos);
          return e;
        }
        return null;
      });
      objMapa.fitBounds(bounds);
      this.empleados = compact(empMapeados);
      return null;
    })
    .catch((err) => {
      this.$toastr("error", err, "Error");
    });
}
</script>

<style lang="scss" scoped="true">
.map-container {
  min-height: 300px;
}
</style>
