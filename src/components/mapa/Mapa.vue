<template>
  <section>
    <gmap-map
      class="map-container"
      ref="map"
      :center="center"
      :zoom="15"
      map-type-id="terrain">
      <gmap-marker
        :key="index"
        v-for="(e, index) in empleados"
        :position="e.position"
        :clickable="true"
        @click="e.opened=!e.opened">
        <info-window :opened="e.opened">{{ e.nombre }} {{ e.apellidos }}</info-window>
      </gmap-marker>
    </gmap-map>
  </section>
</template>

<script>
import _ from "lodash";
import empleadoApi from "../empleados/empleadoApi";

function data() {
  return {
    center: { lat: 0, lng: 0 },
    empleados: [],
  };
}

function beforeRouteEnter(to, from, next) {
  next((vm) => {
    empleadoApi.listar(0, 0).then((empleados) => {
      vm.empleados = _.map(empleados.docs, (e) => {
        e.opened = false;
        return e;
      });
    });
  });
}

function actualizarPosicion(e) {
  const i = _.findIndex(this.empleados, {_id: e._id});
  this.empleados[i].position = generarCoords(e.position.lat, e.position.lng);
  this.centrarMapa();
}

function generarCoords(lat, lng) {
  return new google.maps.LatLng(lat, lng);
}

function centrarMapa() {
  const bounds = new google.maps.LatLngBounds();
  for (let i=0; i<this.empleados.length; i=i+1) {
    bounds.extend(this.empleados[i].position);
  }
  this.$refs.map.fitBounds(bounds);
}

export default {
  data,
  beforeRouteEnter,
  socket: {
    events: {
      actualizarPosicion,
    },
  },
  methods: {
    centrarMapa,
  },
  mounted() {
    setTimeout(() => {
      this.centrarMapa();
    }, 100);
  }
};
</script>

<style lang="scss">
.map-container {
  height: 500px;
  margin-top: 2em;
}
</style>
