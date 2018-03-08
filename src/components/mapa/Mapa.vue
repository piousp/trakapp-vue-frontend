<template>
  <section>
    <gmap-map
      class="mapa"
      :center="center"
      :zoom="7"
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
import empleadoApi from "../empleados/empleadoApi";

function data() {
  return {
    center: { lat: 10.0, lng: 10.0 },
    empleados: [],
  };
}

function beforeRouteEnter(to, from, next) {
  next((vm) => {
    empleadoApi.listar(0, 0).then((empleados) => {
      vm.empleados = empleados.docs.map((e) => {
        e.opened = false;
        return e;
      });
    });
  });
}

export default {
  data,
  beforeRouteEnter,
};
</script>

<style lang="scss">
.mapa {
  height: 500px;
  margin-top: 2em;
}
</style>
