<template>
  <section>
    <form class="form" novalidate>
      <div class="botones-pagina">
        <router-link :to="{name: 'rutalist'}" class="boton boton--volver"/>
        <button
          type="button"
          class="boton boton--cancelar"
          v-if="copia._id && editando"
          @click="cancelar"/>
        <button
          type="button"
          class="boton boton--editar"
          v-if="copia._id && !editando"
          @click="editar(copia)"/>
        <button
          type="button"
          class="boton boton--guardar"
          v-if="editando"
          @click="guardar(copia)"/>
      </div>
      <section class="grid">
        <div class="col-md-6">
          <h1 class="h1"><strong class="text--bold">Info</strong>rmación básica</h1>
          <form-group :error="errors.has('nombre') && submitted">
            <input
              name="nombre"
              class="form__input"
              v-model="copia.nombre"
              :disabled="!editando"
              required
              v-validate="'required'" >
            <label class="form__label">Nombre</label>
          </form-group>
          <form-group :error="errors.has('descripcion') && submitted">
            <input
              name="descripcion"
              class="form__input"
              v-model="copia.descripcion"
              :disabled="!editando"
              required
              v-validate="'required'" >
            <label class="form__label">Descripción</label>
          </form-group>
          <h1 class="h1"><strong class="text--bold">Ubic</strong>aciones</h1>
          <form-group v-show="editando">
            <label class="form__label">Agregar ubicación</label>
            <gmap-autocomplete class="form__input"
                               ref="autoComplete"
                               :disabled="!editando"
                               :options="{componentRestrictions: {country: 'cr'}}"
                               @place_changed="buscarLugar"/>
          </form-group>
          <small v-if="copia.ubicaciones.length > 1">
            Puede arrastrar y reacomodar el orden de los puntos de la ruta
          </small>
          <draggable v-model="copia.ubicaciones" :options="{disabled:!editando}">
             <div v-for="(e, index) in copia.ubicaciones" :key="index" class="draggable">
               <div class="inner__cont">
                 <span class="fa-stack" style="font-size: 0.5rem;">
                   <i class="fa fa-circle fa-stack-2x" style="color: lightgrey" aria-hidden="true"/>
                   <span class="fa-stack-1x">{{index+1}}</span>
                 </span>
                 <i class="text--tomate fa fa-fw fa-bars"/>
               </div>
               <div class="ubicacion__info">
                 <p>{{e.nombre}}</p>
                 <small v-if="e.direccion">Dirección: {{e.direccion}}</small>
                 <br v-if="e.direccion && e.telefono">
                 <small v-if="e.telefono">Teléfono: {{e.telefono}}</small>
               </div>
               <div class="inner__cont">
                 <i class="text--tomate fa fa-fw fa-trash" @click="eliminarDeLista(index)"/>
               </div>
             </div>
          </draggable>
        </div>
        <div class="col-md-6">
          <gmap-map
            class="mapa-ruta"
            ref="mapRuta"
            :center="mapParams.center"
            :zoom="mapParams.zoom"
            :options="mapParams.options"
            map-type-id="terrain">
            <gmap-marker
              :key="index"
              v-if="copia.ubicaciones[0].pos"
              v-for="(e, index) in copia.ubicaciones"
              :position="{
                lng: e.pos.coordinates[0],
                lat: e.pos.coordinates[1]
              }"
              :draggable="editando"/>
          </gmap-map>
        </div>
      </section>
    </form>
  </section>
</template>

<script>
import D from "debug";
import draggable from "vuedraggable";
import cloneDeep from "lodash/cloneDeep";
import get from "lodash/get";

const debug = D("ciris:RutaForm.vue");

export default {
  name: "RutaForm",
  components: {
    draggable,
  },
  data,
  computed: {
    ruta() {
      return this.$store.state.ruta.ruta;
    },
  },
  watch: {
    ruta: {
      handler(newV) {
        this.copia = cloneDeep(newV);
      },
      immediate: true,
      deep: true,
    },
  },
  beforeDestroy() {
    this.$store.commit("ruta/resetRuta");
  },
  mounted,
  methods: {
    guardar,
    editar,
    cancelar,
    buscarLugar,
    eliminarDeLista,
    extenderMapa,
  },
  beforeRouteEnter,
};

function data() {
  return {
    copia: { ubicaciones: [] },
    editando: true,
    submitted: false,
    mapParams: {
      center: {
        lng: -84.079500,
        lat: 9.932883,
      },
      zoom: 17,
      options: { disableDefaultUI: true },
    },
  };
}

function eliminarDeLista(indice) {
  this.copia.ubicaciones.splice(indice, 1);
  this.extenderMapa();
}

function guardar(ruta) {
  debug("Guardando");
  this.submitted = true;
  this.$validator.validateAll()
    .then((valido) => {
      if (valido) {
        debug(ruta);
        return this.$store.dispatch("ruta/guardar", { ruta, conservar: true })
          .then((resp) => {
            debug("Guardado exitoso");
            this.$toastr("success", "Ruta guardado exitosamente", "Éxito");
            this.editando = false;
            return resp;
          })
          .catch((err) => {
            debug(err);
            this.$toastr("error", err, "Error");
          });
      }
      debug("Hay campos requeridos sin completar");
      return this.$toastr("error", "Hay campos requeridos sin completar", "Error");
    })
    .catch((err) => {
      debug(err);
      this.$toastr("error", err, "Error");
    });
}

function editar() {
  this.editando = true;
}

function cancelar() {
  this.editando = false;
}

function buscarLugar(lugar) {
  const coordinates = [lugar.geometry.location.lng(), lugar.geometry.location.lat()];
  this.copia.ubicaciones.push({
    pos: {
      type: "Point",
      coordinates,
    },
    nombre: lugar.name,
    direccion: lugar.formatted_address,
    telefono: lugar.formatted_phone_number,
  });
  this.$refs.autoComplete.$el.value = "";
  this.extenderMapa();
}

function extenderMapa() {
  const bounds = new google.maps.LatLngBounds();
  this.copia.ubicaciones.forEach((a) => {
    if (get(a, "pos.coordinates", null)) {
      bounds.extend(generarCoords(a.pos.coordinates));
    }
  });
  this.$refs.mapRuta.fitBounds(bounds);
}

function generarCoords(coordinates) {
  return new google.maps.LatLng(coordinates[1], coordinates[0]);
}

function mounted() {
  this.$refs.mapRuta.$mapPromise
    .then((objMapa) => {
      const trafficLayer = new google.maps.TrafficLayer();
      trafficLayer.setMap(objMapa);
      this.extenderMapa();
      return null;
    })
    .catch((err) => {
      this.$toastr("error", err, "Error");
    });
}

function beforeRouteEnter(to, from, next) {
  next((vm) => {
    vm.editando = to.params.edit;
  });
}
</script>

<style>
.mapa-ruta{
  height: 400px;
  width: 100%;
}

.ubicacion__info {
  min-width: 80%;
}

.draggable {
  display: flex;
  background-color: white;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  align-content: center;
  border: 1px solid grey;
  border-radius: 5px;
  padding-top: 10px;
  padding-bottom: 10px;
  margin-bottom: 3px;
}

.inner__cont {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  align-content: space-around;
  min-width: 10%;
  height: 50px;
}
</style>
