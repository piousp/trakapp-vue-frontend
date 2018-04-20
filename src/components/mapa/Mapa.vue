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
import map from "lodash/map";
import findIndex from "lodash/findIndex";
import empleadoApi from "../empleados/empleadoApi";

export default {
  data,
  beforeRouteEnter,
  sockets: {
    actualizarPosicion,
  },
  mounted,
};

function data() {
  return {
    center: { lat: 0, lng: 0 },
    empleados: [],
  };
}

function beforeRouteEnter(to, from, next) {
  next((vm) => {
    empleadoApi.listar(0, 0)
      .then((empleados) => {
        vm.empleados = map(empleados.docs, (e) => {
          e.opened = false;
          return e;
        });
        return vm.empleados;
      })
      .catch((err) => {
        this.$toastr("error", err, "Error");
      });
  });
}

function actualizarPosicion(e) {
  const i = findIndex(this.empleados, { _id: e._id });
  this.empleados[i].position = generarCoords(e.position.lat, e.position.lng);
}

function generarCoords(lat, lng) {
  return new google.maps.LatLng(lat, lng);
}

function mounted() {
  this.$refs.map.$mapCreated
    .then((objMapa) => {
      const mapaCargado = objMapa.addListener("tilesloaded", () => {
        mapaCargado.remove();
        const bounds = new google.maps.LatLngBounds();
        this.empleados.forEach((emp) => {
          bounds.extend(emp.position);
        });
        objMapa.fitBounds(bounds);
      });
      return mapaCargado;
    })
    .catch((err) => {
      this.$toastr("error", err, "Error");
    });
}
</script>

<style lang="scss">
.map-container {
  height: 500px;
  margin-top: 2em;
}
</style>
