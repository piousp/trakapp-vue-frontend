<template>
  <section>
    <gmap-map
      class="mapa"
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
    center: { lat: 9.934739, lng: -84.087502 },
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
  this.empleados[i].position = generarCoords(e.position.lat+1, e.position.lng+1);
}

function generarCoords(lat, lng) {
  return new google.maps.LatLng(lat, lng);
}

export default {
  data,
  beforeRouteEnter,
  socket: {
    events: {
      actualizarPosicion,
    },
  },
};
</script>

<style lang="scss">
.mapa {
  height: 500px;
  margin-top: 2em;
}
</style>
