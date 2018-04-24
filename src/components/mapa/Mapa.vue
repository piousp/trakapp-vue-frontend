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
        :position="e.ubicacion"
        :clickable="true"
        @click="e.opened=!e.opened">
        <info-window :opened="e.opened">{{ e.nombre }} {{ e.apellidos }}</info-window>
      </gmap-marker>
    </gmap-map>
  </section>
</template>

<script>
import D from "debug";
import map from "lodash/map";
import compact from "lodash/compact";
import get from "lodash/get";
import findIndex from "lodash/findIndex";
import empleadoApi from "../empleados/empleadoApi";

const debug = D("ciris:Mapa.vue");

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
  const self = this;
  debug("beforeRouteEnter");
  next((vm) => {
    empleadoApi.listar(0, 0)
      .then((empleados) => {
        vm.empleados = map(empleados.docs, (e) => {
          if (get(e.ubicacion, "pos.coordinates", null)) {
            e.opened = false;
            e.ubicacion = generarCoords(e.ubicacion.pos.coordinates);
            return e;
          }
          return null;
        });
        vm.empleados = compact(vm.empleados);
        debug("empleados", vm.empleados);
        return vm.empleados;
      })
      .catch((err) => {
        self.$toastr("error", err, "Error");
      });
  });
}

function actualizarPosicion(e) {
  debug("actualizarPosicion", e);
  const i = findIndex(this.empleados, { _id: e._id });
  this.empleados[i].ubicacion = generarCoords(e.ubicacion.pos.coordinates);
}

function generarCoords(coordinates) {
  return new google.maps.LatLng(coordinates[1], coordinates[0]);
}

function mounted() {
  const self = this;
  this.$refs.map.$mapCreated
    .then((objMapa) => {
      const mapaCargado = objMapa.addListener("tilesloaded", () => {
        mapaCargado.remove();
        const bounds = new google.maps.LatLngBounds();
        self.empleados.forEach((emp) => {
          bounds.extend(emp.ubicacion);
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
